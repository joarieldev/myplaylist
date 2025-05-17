import { getStream } from "@/actions/get-stream";
import { ITrack } from "@/interfaces/Track";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useModalVisualizerStore } from "@/store/modal-visualizer-store";
import { useTracksStore } from "@/store/tracks-store";
import { useWindowStore } from "@/store/window-store";
import { toast } from "sonner";

export const usePlayTrack = () => {
  const audioElement = useAudioContextStore((state) => state.audioElement);
  const audioContext = useAudioContextStore((state) => state.audioContext);
  const setAudioElement = useAudioContextStore((state) => state.setAudioElement);
  const setAudioContext = useAudioContextStore((state) => state.setAudioContext);
  const setSourceNode = useAudioContextStore((state) => state.setSourceNode);
  const setIsPaused = useAudioContextStore((state) => state.setIsPaused);
  const setCurrentTime = useAudioContextStore((state) => state.setCurrentTime);
  const setDuration = useAudioContextStore((state) => state.setDuration);
  const reset = useAudioContextStore((state) => state.reset);
  const tracks = useTracksStore((state) => state.tracks);
  const setSelectedTrack = useWindowStore((state) => state.setSelectedTrack);
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const setSelectedTrackLocal = useWindowStore((state) => state.setSelectedTrackLocal);
  const visualizer = useModalVisualizerStore((state) => state.visualizer);
  const setAnalyserNode = useAudioContextStore((state) => state.setAnalyserNode);
  const isMuted = useAudioContextStore((state) => state.isMuted);
  const volume = useAudioContextStore((state) => state.volume);

  const playTrack = async (track: ITrack, index: number) => {
    if (audioContext && audioContext.state !== "closed") {
      await audioContext.close();
      setAudioContext(null);
    }

    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
      audioElement.load();
      setAudioElement(null);
      setSelectedTrackLocal(null);
    }

    setSelectedTrack(track);
    reset()

    const url = await getStream(track.id);
    const newAudioElement = new Audio(url);
    newAudioElement.crossOrigin = "anonymous";
    setAudioElement(newAudioElement)

    newAudioElement.onloadedmetadata = () => {
      setDuration(newAudioElement.duration);
      if (isMuted) newAudioElement.muted = true;
      newAudioElement.volume = volume / 100;
    }

    newAudioElement.ontimeupdate = () => {
      setCurrentTime(newAudioElement.currentTime);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(newAudioContext);

    const newSourceNode = newAudioContext.createMediaElementSource(newAudioElement);
    setSourceNode(newSourceNode);
    newSourceNode.connect(newAudioContext.destination);

    if (visualizer !== "none") analyserVisualizer(newAudioContext, newSourceNode);

    newAudioContext.resume()
    newAudioElement.play();

    newAudioElement.onended = () => {
      playNextTrack(index, newAudioContext, newAudioElement);
    }
  };

  const playNextTrack = async (i: number, auxAudioContext: AudioContext, auxAudioElement: HTMLAudioElement) => {
    const nextTrackIndex = i + 1;
    if (nextTrackIndex < tracks.length) {
      playTrack(tracks[nextTrackIndex], nextTrackIndex);
    } else {
      if (auxAudioContext && auxAudioContext.state !== "closed") {
        await auxAudioContext.close();
        setAudioContext(null);
        setIsPaused(true);
      }
      if (auxAudioElement) {
        auxAudioElement.pause();
        auxAudioElement.src = '';
        auxAudioElement.load();
        setAudioElement(null);
      }
      toast.info("Lista finalizada");
    }
  }

  const pause = () => {
    if (!audioElement) return;
    audioElement.pause();
    setIsPaused(true);
  }

  const play = () => {
    if (!audioElement) {
      if (selectedTrack) playTrack(selectedTrack, tracks.findIndex((track) => track.id === selectedTrack.id));
      return
    };
    audioElement.play();
    setIsPaused(false);
  }

  const prev = (i: number) => {
    const prevTrackIndex = i - 1;
    if (prevTrackIndex >= 0) {
      playTrack(tracks[prevTrackIndex], prevTrackIndex);
    } else {
      toast.info("Inicio de la lista");
    }
  }

  const next = (i: number) => {
    const nextTrackIndex = i + 1;
    if (nextTrackIndex < tracks.length) {
      playTrack(tracks[nextTrackIndex], nextTrackIndex);
    } else {
      toast.info("Fin de la lista");
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const analyserVisualizer = (audio: AudioContext, source: MediaElementAudioSourceNode) => {
    const analyserNode = audio.createAnalyser();
    analyserNode.fftSize = 256;
    source.connect(analyserNode);
    setAnalyserNode(analyserNode)
  }

  return {
    playTrack,
    pause,
    play,
    prev,
    next,
    formatTime,
  };
};  
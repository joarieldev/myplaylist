import { getStream } from "@/actions/get-stream";
import { ITrack } from "@/interfaces/Track";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useVisualizerStore } from "@/store/visualizer-store";
import { useTracksPlayingStore } from "@/store/tracks-playing-store";
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
  const tracks = useTracksPlayingStore((state) => state.tracks);
  const setSelectedTrack = useWindowStore((state) => state.setSelectedTrack);
  const visualizer = useVisualizerStore((state) => state.visualizer);
  const setAnalyserNode = useAudioContextStore((state) => state.setAnalyserNode);
  const isMuted = useAudioContextStore((state) => state.isMuted);
  const volume = useAudioContextStore((state) => state.volume);
  const setGainNode = useAudioContextStore((state) => state.setGainNode);

  const playTrack = async (track: ITrack) => {
    if (audioContext && audioContext.state !== "closed") {
      await audioContext.close();
    }

    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
    }

    setAudioContext(null);
    setAudioElement(null);
    reset()

    setSelectedTrack(track);

    const url = track.tags === "local" ? track.orig_filename : await getStream(track.id);
    const newAudioElement = new Audio(url);
    newAudioElement.crossOrigin = "anonymous";
    setAudioElement(newAudioElement)

    newAudioElement.ontimeupdate = () => {
      setCurrentTime(newAudioElement.currentTime);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    const gainNode = new GainNode(newAudioContext);
    gainNode.gain.value = volume;

    newAudioElement.onloadedmetadata = async () => {
      try {
        setDuration(newAudioElement.duration);
        if (isMuted.muted) gainNode.gain.value = 0;

        setAudioContext(newAudioContext);
        setGainNode(gainNode);

        const newSourceNode = newAudioContext.createMediaElementSource(newAudioElement);
        setSourceNode(newSourceNode);
        newSourceNode.connect(gainNode).connect(newAudioContext.destination);

        if (visualizer !== "none") {
          const analyserNode = newAudioContext.createAnalyser();
          analyserNode.fftSize = 256;
          newSourceNode.connect(analyserNode);
          setAnalyserNode(analyserNode)
        }

        await newAudioContext.resume()
        await newAudioElement.play();
      } catch (error) {
        console.error('Error al reproducir audio:', error);
      }
    }

    newAudioElement.onended = () => {
      playNextTrack();
    }
  };

  const playNextTrack = async () => {
    //obtener valores acutales con getState() y evitar closures en js con .onended
    const currentTracks = useTracksPlayingStore.getState().tracks;
    const currentSelectedTrack = useWindowStore.getState().selectedTrack;

    const nextTrackIndex = currentTracks.findIndex((track) => track.id === currentSelectedTrack?.id) + 1;

    if (nextTrackIndex < currentTracks.length) {
      playTrack(currentTracks[nextTrackIndex]);
    } else {
      toast.info("Lista finalizada");
      setIsPaused(true);
    }
  }

  const pause = () => {
    if (!audioElement) return;
    audioElement.pause();
    setIsPaused(true);
  }

  const play = () => {
    if (!audioElement) return;
    audioElement.play();
    setIsPaused(false);
  }

  const prev = (i: number) => {
    const prevTrackIndex = i - 1;
    if (prevTrackIndex >= 0) {
      playTrack(tracks[prevTrackIndex]);
    } else {
      toast.info("Inicio de la lista");
    }
  }

  const next = (i: number) => {
    const nextTrackIndex = i + 1;
    if (nextTrackIndex < tracks.length) {
      playTrack(tracks[nextTrackIndex]);
    } else {
      toast.info("Fin de la lista");
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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

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
  const loading = useAudioContextStore((state) => state.loading)
  const setLoading = useAudioContextStore((state) => state.setLoading)
  const setBufferTime = useAudioContextStore((state) => state.setBufferTime)

  const playTrack = async (track: ITrack) => {
    await cleanupAudio();
    setSelectedTrack(track);
    setLoading(true)

    const url = track.tags === "local" ? track.orig_filename : await getStream(track.id);

    const newAudioElement = new Audio(url);
    newAudioElement.crossOrigin = "anonymous";

    newAudioElement.addEventListener("progress", () => {
      updateBuffer(newAudioElement)
    })

    //debounce para handleSeek()
    let loadingTimeout: NodeJS.Timeout | null = null;

    newAudioElement.addEventListener("playing", () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
      }
      setLoading(false)
    })

    newAudioElement.addEventListener("waiting", () => {
      if (loadingTimeout) clearTimeout(loadingTimeout);
      loadingTimeout = setTimeout(() => {
        setLoading(true);
        loadingTimeout = null;
      }, 300);
    })

    newAudioElement.addEventListener("error", () => {
      //Ignorar audio abortado (cambio de pista)
      if (newAudioElement.error?.message === 'MEDIA_ELEMENT_ERROR: Empty src attribute') {
        return;
      }
      const pista = track.title.length > 16 ? `${track.title.slice(0, 16)}...`: track.title
      toast.warning(`Error al reproducir pista - ${pista}`)
      playNextTrack();
    })

    newAudioElement.ontimeupdate = () => {
      setCurrentTime(newAudioElement.currentTime);
    };

    newAudioElement.onloadedmetadata = async () => {
      const newAudioContext = new AudioContext
      const gainNode = new GainNode(newAudioContext);
      gainNode.gain.value = isMuted.muted ? 0 : volume;
      
      const newSourceNode = newAudioContext.createMediaElementSource(newAudioElement);
      newSourceNode.connect(gainNode).connect(newAudioContext.destination);
      
      setAudioElement(newAudioElement)
      setAudioContext(newAudioContext);
      setGainNode(gainNode);
      setSourceNode(newSourceNode);
      setDuration(newAudioElement.duration);
      
      await newAudioContext.resume()
      await newAudioElement.play()

      if (visualizer !== "none") {
        const analyserNode = new AnalyserNode(newAudioContext);
        analyserNode.fftSize = 256;
        newSourceNode.connect(analyserNode);
        setAnalyserNode(analyserNode)
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

  const cleanupAudio = async () => {
    if (audioContext && audioContext.state !== "closed") {
      await audioContext.close();
    }

    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
    }

    reset()
  }

  const updateBuffer = (audio: HTMLAudioElement) => {
    const currentTime = audio.currentTime;
    const buffered = audio.buffered;

    let bufferedEnd = 0;

    for (let i = 0; i < buffered.length; i++) {
      const start = buffered.start(i);
      const end = buffered.end(i);

      // Si el currentTime está dentro de este rango
      if (currentTime >= start && currentTime <= end) {
        bufferedEnd = end;
        break;
      }

      // Si el currentTime está antes de este rango, usar el inicio
      if (currentTime < start) {
        bufferedEnd = currentTime;
        break;
      }
    }

    // Si no encontramos ningún rango, usar currentTime
    if (bufferedEnd === 0 && buffered.length > 0) {
      bufferedEnd = currentTime;
    }

    setBufferTime(bufferedEnd);
  };

  return {
    playTrack,
    pause,
    play,
    prev,
    next,
    formatTime,
    loading,
  };
};

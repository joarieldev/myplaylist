import { getStream } from "@/actions/get-stream";
import { ITrack } from "@/interfaces/Track";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useVisualizerStore } from "@/store/visualizer-store";
import { useTracksPlayingStore } from "@/store/tracks-playing-store";
import { useWindowStore } from "@/store/window-store";
import { toast } from "sonner";
import { useRef } from "react";

export const usePlayTrack = () => {
  const audioElement = useAudioContextStore((state) => state.audioElement);
  const setAudioElement = useAudioContextStore((state) => state.setAudioElement);
  const setAudioContext = useAudioContextStore((state) => state.setAudioContext);
  const setSourceNode = useAudioContextStore((state) => state.setSourceNode);
  const setIsPaused = useAudioContextStore((state) => state.setIsPaused);
  const setCurrentTime = useAudioContextStore((state) => state.setCurrentTime);
  const setDuration = useAudioContextStore((state) => state.setDuration);
  const reset = useAudioContextStore((state) => state.reset);
  const tracks = useTracksPlayingStore((state) => state.tracks);
  const setSelectedTrack = useWindowStore((state) => state.setSelectedTrack);
  const setAnalyserNode = useAudioContextStore((state) => state.setAnalyserNode);
  const setGainNode = useAudioContextStore((state) => state.setGainNode);
  const loading = useAudioContextStore((state) => state.loading)
  const setLoading = useAudioContextStore((state) => state.setLoading)
  const setBufferTime = useAudioContextStore((state) => state.setBufferTime)

  const audioIdRef = useRef(0);
  const lastCreatedAudioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = async (track: ITrack) => {
    const currentAudioId = ++audioIdRef.current; //ID único para esta instancia

    await cleanupAudio();

    setSelectedTrack(track);
    setLoading(true)

    const url = track.tags === "local" ? track.orig_filename : await getStream(track.id);

    const newAudioElement = new Audio(url);
    newAudioElement.crossOrigin = "anonymous";

    lastCreatedAudioRef.current = newAudioElement; //Guardar referencia
    let loadingTimeout: NodeJS.Timeout | null = null; //debounce para handleSeek()
    let hasErrorHandled = false // para .onerror

    newAudioElement.onprogress = () => {
      if (audioIdRef.current !== currentAudioId) return;
      updateBuffer(newAudioElement)
    }

    newAudioElement.onplaying = () => {
      if (audioIdRef.current !== currentAudioId) return;
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
      }
      setLoading(false)
    }

    newAudioElement.onwaiting = () => {
      if (audioIdRef.current !== currentAudioId) return;
      if (loadingTimeout) clearTimeout(loadingTimeout);
      loadingTimeout = setTimeout(() => {
        setLoading(true);
        loadingTimeout = null;
      }, 300);

      if(!navigator.onLine) {
        toast.dismiss()
        toast.error(
          "Error de red. Verifica tu conexión a internet.",
          {duration: Infinity}
        )
      }
    }

    newAudioElement.onerror = () => {
      if (audioIdRef.current !== currentAudioId) return;
      if (hasErrorHandled) return
      //Ignorar audio abortado (cambio de pista)
      if (newAudioElement.error?.message === 'MEDIA_ELEMENT_ERROR: Empty src attribute') return
      if(!navigator.onLine) {
        toast.dismiss()
        toast.error(
          "Error de red. Verifica tu conexión a internet.",
          {duration: Infinity}
        )
        return
      }

      hasErrorHandled = true

      if (loadingTimeout) {
        clearTimeout(loadingTimeout)
        loadingTimeout = null
      }

      const pista = track.title.length > 16 ? `${track.title.slice(0, 16)}...`: track.title
      toast.warning(`Error al reproducir pista - ${pista}`)

      playNextTrack();
    }

    newAudioElement.ontimeupdate = () => {
      if (audioIdRef.current !== currentAudioId) return;
      setCurrentTime(newAudioElement.currentTime);
    };

    newAudioElement.onloadedmetadata = async () => {
      if (audioIdRef.current !== currentAudioId) { //Verificar que sigue siendo el audio actual
        newAudioElement.pause();
        newAudioElement.src = '';
        return;
      }

      const newAudioContext = new AudioContext
      const gainNode = new GainNode(newAudioContext);
      const currentMuted = useAudioContextStore.getState().isMuted
      const currentVolume = useAudioContextStore.getState().volume
      gainNode.gain.value = currentMuted.muted ? 0 : currentVolume;

      const newSourceNode = newAudioContext.createMediaElementSource(newAudioElement);
      newSourceNode.connect(gainNode).connect(newAudioContext.destination);

      setAudioElement(newAudioElement)
      setAudioContext(newAudioContext);
      setGainNode(gainNode);
      setSourceNode(newSourceNode);
      setDuration(newAudioElement.duration);

      const currentIsPaused = useAudioContextStore.getState().isPaused

      if (currentIsPaused) {
        newAudioElement.pause()
      }else{
        toast.dismiss() //toast infinity en !navigator.onLine
        await newAudioContext.resume()
        await newAudioElement.play()
      }

      const currentVisualizer = useVisualizerStore.getState().visualizer
      if (currentVisualizer !== "none") {
        const analyserNode = new AnalyserNode(newAudioContext);
        analyserNode.fftSize = 256;
        newSourceNode.connect(analyserNode);
        setAnalyserNode(analyserNode)
      }
    }

    newAudioElement.onended = () => {
      if (audioIdRef.current !== currentAudioId) return;
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
      }
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
    audioElement?.pause();
    setIsPaused(true);
  }

  const play = () => {
    audioElement?.play();
    setIsPaused(false);
  }

  const prev = (i: number) => {
    const prevTrackIndex = i - 1;
    if (prevTrackIndex >= 0) {
      setIsPaused(false);
      playTrack(tracks[prevTrackIndex]);
    } else {
      toast.info("Inicio de la lista");
    }
  }

  const next = (i: number) => {
    const nextTrackIndex = i + 1;
    if (nextTrackIndex < tracks.length) {
      setIsPaused(false);
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
    if (lastCreatedAudioRef.current) {
      lastCreatedAudioRef.current.pause();
      lastCreatedAudioRef.current.src = '';
      lastCreatedAudioRef.current.onloadedmetadata = null;
      lastCreatedAudioRef.current.ontimeupdate = null;
      lastCreatedAudioRef.current.onended = null;
      lastCreatedAudioRef.current.onerror = null;
      lastCreatedAudioRef.current.onwaiting = null;
      lastCreatedAudioRef.current.onplaying = null;
      lastCreatedAudioRef.current.onprogress = null;
    }

    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
      audioElement.onloadedmetadata = null;
      audioElement.ontimeupdate = null;
      audioElement.onended = null;
      audioElement.onerror = null;
      audioElement.onwaiting = null;
      audioElement.onplaying = null;
      audioElement.onprogress = null;
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

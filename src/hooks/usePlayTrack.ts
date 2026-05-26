import { getStream } from "@/actions/get-stream";
import { ITrack } from "@/interfaces/Track";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useAudioStore } from "@/store/audio-store";
import { useUiStore } from "@/store/ui-store";
import { toast } from "sonner";
import { useRef } from "react";

export const usePlayTrack = () => {
  const audioContext = useAudioContextStore((state) => state.audioContext);
  const stopCurrentAudio = useAudioContextStore((state) => state.stopCurrentAudio);
  const gainNode = useAudioContextStore((state) => state.gainNode);
  const audioElement = useAudioContextStore((state) => state.audioElement);
  const setAudioElement = useAudioContextStore((state) => state.setAudioElement);
  const setSourceNode = useAudioContextStore((state) => state.setSourceNode);
  const setAnalyserNode = useAudioContextStore((state) => state.setAnalyserNode);

  const tracks = useAudioStore((state) => state.tracks);
  const loading = useAudioStore((state) => state.loading)
  const setLoading = useAudioStore((state) => state.setLoading)
  const setBuffer = useAudioStore((state) => state.setBuffer)
  const setIsPlaying = useAudioStore((state) => state.setIsPlaying)
  const volume = useAudioStore((state) => state.volume)
  const isMuted = useAudioStore((state) => state.isMuted)
  const setCurrentTime = useAudioStore((state) => state.setCurrentTime)
  const setDuration = useAudioStore((state) => state.setDuration)
  const setSelectedTrack = useUiStore((state) => state.setSelectedTrack);

  const onLineRef = useRef<boolean>(true);

  const playTrack = (track: ITrack) => {
    if(!audioContext || !gainNode) return

    stopCurrentAudio()
    setSelectedTrack(track);
    setLoading(true)

    const url = track.tags === "local" ? track.orig_filename : getStream(track.id);

    const newAudio = new Audio(url)
    newAudio.crossOrigin = "anonymous";

    const newSource = audioContext.createMediaElementSource(newAudio)
    newSource.connect(gainNode)
    gainNode.gain.value = isMuted.muted ? 0 : volume;

    newAudio.onprogress = () => {
      updateBuffer(newAudio)
    }

    newAudio.onplaying = () => {
      setLoading(false)
    }

    newAudio.onwaiting = () => {
      setLoading(true)
    }

    newAudio.ontimeupdate = () => {
      const isSeeking = useAudioStore.getState().isSeeking;
      if (!isSeeking) setCurrentTime(newAudio.currentTime);
    }

    newAudio.onloadeddata = () => {
      setDuration(newAudio.duration)
      const currentIsPlaying = useAudioStore.getState().isPlaying
      if(!currentIsPlaying){
        newAudio.pause()
      }else{
        audioContext.resume();
        newAudio.play()
      }
      const currentVisualizer = useUiStore.getState().visualizer
      if (currentVisualizer !== "none") {
        const analyserNode = new AnalyserNode(audioContext);
        analyserNode.fftSize = 256;
        newSource.connect(analyserNode);
        setAnalyserNode(analyserNode)
      }
    }

    newAudio.onended = () => {
      playNextTrack()
    };

    newAudio.onerror = () => {
      //Ignorar audio abortado (cambio de pista)
      if (newAudio.error?.message === 'MEDIA_ELEMENT_ERROR: Empty src attribute') return

      if(!navigator.onLine) {
        toast.dismiss()
        toast.error(
          "Error de red. Verifica tu conexión a internet.",
          {duration: Infinity}
        )
        onLineRef.current = false
        setIsPlaying(false)
        return
      }

      const pista = track.title.length > 16 ? `${track.title.slice(0, 16)}...`: track.title
      toast.warning(`Error al reproducir pista - ${pista}`, {duration: Infinity})
      pause()
    }

    setSourceNode(newSource)
    setAudioElement(newAudio)
  }

  const playNextTrack = () => {
    //obtener valores acutales con getState() y evitar closures en js con .onended
    const currentTracks = useAudioStore.getState().tracks;
    const currentSelectedTrack = useUiStore.getState().selectedTrack;

    const nextTrackIndex = currentTracks.findIndex((track) => track.id === currentSelectedTrack?.id) + 1;

    if (nextTrackIndex < currentTracks.length) {
      playTrack(currentTracks[nextTrackIndex]);
    } else {
      toast.info("Lista finalizada");
      setIsPlaying(false);
    }
  }

  const pause = () => {
    audioElement?.pause();
    setIsPlaying(false)
  }

  const play = () => {
    if(!onLineRef.current) {
      const currentSelectedTrack = useUiStore.getState().selectedTrack;
      playTrack(currentSelectedTrack!)
      setIsPlaying(true)
      onLineRef.current = true
      toast.dismiss()
    }else{
      audioContext?.resume();
      audioElement?.play();
      setIsPlaying(true)
    }
  }

  const prev = (i: number) => {
    const prevTrackIndex = i - 1;
    if (prevTrackIndex >= 0) {
      setIsPlaying(true)
      playTrack(tracks[prevTrackIndex]);
    } else {
      toast.info("Inicio de la lista");
    }
  }

  const next = (i: number) => {
    const nextTrackIndex = i + 1;
    if (nextTrackIndex < tracks.length) {
      setIsPlaying(true)
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

    setBuffer(bufferedEnd);
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

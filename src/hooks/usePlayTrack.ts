import { getStream } from "@/actions/get-stream";
import { ITrack } from "@/interfaces/Track";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useVisualizerStore } from "@/store/visualizer-store";
import { useTracksPlayingStore } from "@/store/tracks-playing-store";
import { useWindowStore } from "@/store/window-store";
import { toast } from "sonner";
import { useRef } from "react";

export const usePlayTrack = () => {
  const audioContext = useAudioContextStore((state) => state.audioContext);
  const stopCurrentAudio = useAudioContextStore((state) => state.stopCurrentAudio);
  const gainNode = useAudioContextStore((state) => state.gainNode);
  const audioElement = useAudioContextStore((state) => state.audioElement);
  const setAudioElement = useAudioContextStore((state) => state.setAudioElement);
  const setSourceNode = useAudioContextStore((state) => state.setSourceNode);
  const tracks = useTracksPlayingStore((state) => state.tracks);
  const setSelectedTrack = useWindowStore((state) => state.setSelectedTrack);
  const setAnalyserNode = useAudioContextStore((state) => state.setAnalyserNode);
  const loading = useAudioContextStore((state) => state.loading)
  const setLoading = useAudioContextStore((state) => state.setLoading)
  const setBuffer = useAudioContextStore((state) => state.setBuffer)
  const setIsPlaying = useAudioContextStore((state) => state.setIsPlaying)
  const volume = useAudioContextStore((state) => state.volume)
  const isMuted = useAudioContextStore((state) => state.isMuted)
  const setCurrentTime = useAudioContextStore((state) => state.setCurrentTime)
  const setDuration = useAudioContextStore((state) => state.setDuration)

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
      setCurrentTime(newAudio.currentTime);
    }

    newAudio.onloadeddata = () => {
      setDuration(newAudio.duration)
      const currentIsPlaying = useAudioContextStore.getState().isPlaying
      if(!currentIsPlaying){
        newAudio.pause()
      }else{
        audioContext.resume();
        newAudio.play()
      }
      const currentVisualizer = useVisualizerStore.getState().visualizer
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
    const currentTracks = useTracksPlayingStore.getState().tracks;
    const currentSelectedTrack = useWindowStore.getState().selectedTrack;

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
      const currentSelectedTrack = useWindowStore.getState().selectedTrack;
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

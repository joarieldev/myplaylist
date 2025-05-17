import { useAudioContextStore } from "@/store/audio-context-store";

export const useVisualizer = () => {

  const audioContext = useAudioContextStore((state) => state.audioContext);
  const sourceNode = useAudioContextStore((state) => state.sourceNode);
  const analyserNode = useAudioContextStore((state) => state.analyserNode);
  const setAnalyserNode = useAudioContextStore((state) => state.setAnalyserNode);

  const sendAnalyser = () => {
    if (!audioContext || !sourceNode) return;
    const analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 256;
    sourceNode.connect(analyserNode);
    setAnalyserNode(analyserNode)
  }

  const removeAnalyser = () => {
    if (!audioContext || !analyserNode) return;
    analyserNode.disconnect();
    setAnalyserNode(null);
  }

  return {
    sendAnalyser,
    removeAnalyser,
  }
}
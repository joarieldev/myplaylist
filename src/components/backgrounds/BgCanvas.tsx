import { useEffect, useRef } from "react";
import {
  circleSpectrum,
  circleSpectrumSpring,
  type IVisualizer,
  lineWave,
  lineWaveChill,
  spectrumCenter,
  spectrumPlain,
  spectrumWide,
  snowflake,
} from "@/utils/visualizer";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useBgVisualizerStore } from "@/store/bg-visualizer-store";
import { motion } from "motion/react";

const visualizers: Record<string, (vis: IVisualizer) => void> = {
  "line-wave": lineWave,
  "line-wave-chill": lineWaveChill,
  "spectrum-center": spectrumCenter,
  "spectrum-plain": spectrumPlain,
  "spectrum-wide": spectrumWide,
  "circle-spectrum": circleSpectrum,
  "circle-spectrum-spring": circleSpectrumSpring,
  "snowflake": snowflake,
};

export const BgCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);
  const analyserNode = useAudioContextStore((state) => state.analyserNode);
  const mode = useBgVisualizerStore((state) => state.mode);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [mode]);

  useEffect(() => {
    if (!canvasRef.current || !analyserNode) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const capPositions = new Array(bufferLength).fill(0);

    const vis: IVisualizer = {
      canvas,
      ctx,
      analyserNode,
      bufferLength,
      dataArray,
      capPositions,
    };

    const draw = () => {
      visualizers[mode](vis);
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
    };
  }, [mode, analyserNode]);

  return (
    <motion.canvas
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  );
};

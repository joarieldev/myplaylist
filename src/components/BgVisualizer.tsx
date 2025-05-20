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
} from "@/utils/visualizer";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useBgVisualizerStore } from "@/store/bg-visualizer-store";
import { motion } from "motion/react";

export const BgVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);
  const { analyserNode } = useAudioContextStore();
  const { mode } = useBgVisualizerStore();

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
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !analyserNode) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const capPositions = new Array(bufferLength).fill(0);

    if (!ctx) return;
    const vis: IVisualizer = {
      canvas,
      ctx,
      analyserNode,
      bufferLength,
      dataArray,
      capPositions,
    };

    const drawChoose = {
      "line-wave": () => lineWave(vis),
      "line-wave-chill": () => lineWaveChill(vis),
      "spectrum-center": () => spectrumCenter(vis),
      "spectrum-plain": () => spectrumPlain(vis),
      "spectrum-wide": () => spectrumWide(vis),
      "circle-spectrum": () => circleSpectrum(vis),
      "circle-spectrum-spring": () => circleSpectrumSpring(vis),
    };

    function draw() {
      drawChoose[mode]();
      animationRef.current = requestAnimationFrame(draw);
    }

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
      className="absolute -z-10"
    ></motion.canvas>
  );
};

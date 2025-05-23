import { useAudioContextStore } from "@/store/audio-context-store";
import { useBgVisualizerStore } from "@/store/bg-visualizer-store";
import { useEffect, useRef, useState } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import * as THREE from "three";
import { motion } from "motion/react";

export const BgVanta = () => {
  const animationRef = useRef<number>(null);
  const analyserNode = useAudioContextStore((state) => state.analyserNode);
  const mode = useBgVisualizerStore((state) => state.mode);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode !== "vantajs-birds" || !vantaRef.current) return;

    const vantaBirds = BIRDS({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: false,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      separation: 20.0,
      speedLimit: 1.0,
      cohesion: 40.0,
      backgroundColor: 0x0,
    });

    setVantaEffect(vantaBirds);

    return () => {
      if (vantaBirds) {
        vantaBirds.destroy();
      }
    };
  }, [mode]);

  useEffect(() => {
    if (!vantaEffect || !analyserNode || mode !== "vantajs-birds") return;

    const bufferLength = analyserNode.frequencyBinCount;
    const freqData = new Uint8Array(bufferLength);

    function animate() {
      analyserNode?.getByteFrequencyData(freqData);

      const lowFreqs = freqData.slice(0, 10);
      const avgBass = lowFreqs.reduce((a, b) => a + b, 0) / lowFreqs.length;
      const norm = avgBass / 255;

      let mappedBass;
      const THRESHOLD = 0.8;

      if (norm < THRESHOLD) {
        mappedBass = Math.round((norm / THRESHOLD) * 39 + 1);
      } else {
        mappedBass = Math.round(
          ((norm - THRESHOLD) / (1 - THRESHOLD)) * 40 + 60
        );
      }

      vantaEffect.velocityUniforms.separationDistance.value =
        Math.round(mappedBass);

      const avgVolume = freqData.reduce((a, b) => a + b, 0) / freqData.length;
      const normVolume = avgVolume > 5 ? 2.5 : 1.0;
      vantaEffect.velocityUniforms.speedLimit.value = normVolume;

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
    };
  }, [analyserNode, vantaEffect, mode]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={vantaRef}
      className="absolute top-0 left-0 h-screen w-screen -z-10"
    />
  );
};

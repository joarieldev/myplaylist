import { useAudioContextStore } from "@/store/audio-context-store";
import { useBgVisualizerStore } from "@/store/bg-visualizer-store";
import { useEffect, useRef, useState } from "react";
import CELLS from "vanta/dist/vanta.cells.min";
import * as THREE from "three";
import { motion } from "motion/react";
import { useWindowStore } from "@/store/window-store";
import { Vibrant } from "node-vibrant/browser";
import { useCellsColorsStore } from "@/store/cells-colors-store";

export const BgVantaCells = () => {
  const animationRef = useRef<number>(null);
  const analyserNode = useAudioContextStore((state) => state.analyserNode);
  const mode = useBgVisualizerStore((state) => state.mode);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  const colors = useCellsColorsStore((state)=> state.colors);
  const setColor = useCellsColorsStore((state)=> state.setColor);
  const selectedTrack = useWindowStore((state) => state.selectedTrack);

  useEffect(() => {
    if (!selectedTrack) return;

    const color = colors[selectedTrack.id];

    if (color) return;
    
    Vibrant.from(selectedTrack.artwork["150x150"])
      .getPalette()
      .then((palette) => {
        if (palette.LightVibrant) {
          const newColors = {
            r: palette.LightVibrant.r / 255,
            g: palette.LightVibrant.g / 255,
            b: palette.LightVibrant.b / 255,
          };

          setColor(selectedTrack.id, newColors);
        }
      });
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrack]);

  useEffect(() => {
    if (mode !== "vantajs-cells" || !vantaRef.current) return;

    const vantaCells = CELLS({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      size: 0.2,
      color1: 0x0,
      color2: "#364153",
    });

    setVantaEffect(vantaCells);

    return () => {
      if (vantaCells) {
        vantaCells.destroy();
      }
    };
  }, [mode]);

  useEffect(() => {
    if (!vantaEffect || !analyserNode || mode !== "vantajs-cells") return;

    const bufferLength = analyserNode.frequencyBinCount;
    const freqData = new Uint8Array(bufferLength);

    const color = selectedTrack ? colors[selectedTrack.id] : null;
    if(color){
      vantaEffect.uniforms.color2.value.x = color.r;
      vantaEffect.uniforms.color2.value.y = color.g;
      vantaEffect.uniforms.color2.value.z = color.b;
    }else{
      vantaEffect.uniforms.color2.value.x = 54/255;
      vantaEffect.uniforms.color2.value.y = 65/255;
      vantaEffect.uniforms.color2.value.z = 83/255;
    }

    function animate() {
      analyserNode?.getByteFrequencyData(freqData);

      const lowFreqs = freqData.slice(0, 10);
      const avgBass = lowFreqs.reduce((a, b) => a + b, 0) / lowFreqs.length;
      const norm = avgBass / 255;

      const mappedBass = norm * 5;

      vantaEffect.options.speed = mappedBass;

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analyserNode, vantaEffect, mode, colors]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={vantaRef}
      className="fixed inset-0 -z-10"
    />
  );
};

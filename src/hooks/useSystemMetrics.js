import { useState, useEffect, useRef, use } from "react";

export default function useSystemMetrics(pollMs = 1000) {
  const [metrics, setMetrics] = useState({ cpu: 0, mem: null });
  const lastTickRef = useRef(performance.now());
  const lagSamples = useRef([]);

  useEffect(() => {
    let mounted = true;
    const expected = pollMs;
    const timer = setInterval(() => {
      const now = performance.now();
      const delta = now - lastTickRef.current;
      const lag = Math.max(0, delta - expected);
      lastTickRef.current = now;

      lagSamples.current.push(lag);
      if (lagSamples.current.length > 10) lagSamples.current.shift();

      const avgLag =
        lagSamples.current.reduce((a, b) => a + b, 0) / lagSamples.current.length;
      
      let cpuEstimate = Math.min(1, avgLag / (expected * 0.9));
      cpuEstimate = Math.round(cpuEstimate * 100);

      let memPct = null;
      if (performance && performance.memory) {
        const { usedJSHeapSize, totalJSHeapSize } = performance.memory;
        memPct = Math.round((usedJSHeapSize / totalJSHeapSize) * 100);
      }

      if (mounted) setMetrics({ cpu: cpuEstimate, mem: memPct });
    }, pollMs);

    return () => {
        mounted= false;
        clearInterval(timer);
    };
  }, [pollMs]);

  return metrics;
};

import { useEffect, useState } from "react";

interface UseParallaxOptions {
  speed?: number; // 0.1 = slow, 0.5 = medium, 1 = same as scroll
  direction?: "up" | "down";
  maxOffset?: number;
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.3, direction = "up", maxOffset = 150 } = options;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rawOffset = scrollY * speed;
      const clampedOffset = Math.min(rawOffset, maxOffset);
      setOffset(direction === "up" ? -clampedOffset : clampedOffset);
    };

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction, maxOffset]);

  return { offset, transform: `translateY(${offset}px)` };
}

import { useState, useRef, useEffect } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/**
 * Image component that uses native lazy loading + decoding="async"
 * for below-fold images to improve LCP and reduce main-thread work.
 */
export function LazyImage({ src, alt, className, ...props }: LazyImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      {...props}
    />
  );
}

/**
 * Deferred iframe that only loads when near the viewport.
 */
export function LazyIframe(props: React.IframeHTMLAttributes<HTMLIFrameElement>) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      {isVisible ? (
        <iframe {...props} />
      ) : (
        <div className="w-full h-full bg-gray-800 animate-pulse rounded-2xl" />
      )}
    </div>
  );
}

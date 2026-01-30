import { useState, ImgHTMLAttributes } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MentoriaImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  showSkeleton?: boolean;
  skeletonClassName?: string;
}

export default function MentoriaImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  showSkeleton = true,
  skeletonClassName,
  className,
  ...props
}: MentoriaImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const imageSrc = hasError ? fallbackSrc : src;

  return (
    <div className="relative">
      {showSkeleton && isLoading && (
        <Skeleton 
          className={cn(
            "absolute inset-0 bg-muted/50",
            skeletonClassName
          )} 
        />
      )}
      <img
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        {...props}
      />
    </div>
  );
}

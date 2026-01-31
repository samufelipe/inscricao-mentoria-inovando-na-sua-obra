import React from 'react';

interface VimeoPlayerProps {
  vimeoId: string;
  title: string;
  className?: string;
}

const VimeoPlayer: React.FC<VimeoPlayerProps> = ({ vimeoId, title, className = '' }) => {
  const src = `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&color=9ACD32`;

  return (
    <div className={`relative w-full aspect-video rounded-xl overflow-hidden shadow-xl ${className}`}>
      <iframe
        src={src}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full border-0"
      ></iframe>
    </div>
  );
};

export default VimeoPlayer;

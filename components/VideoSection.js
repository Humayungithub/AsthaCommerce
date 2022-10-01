import React from 'react';

function VideoSection() {
  return (
    <div className="container flex md:flex-row flex-col justify-center space-x-7 py-20 px-1">
      <iframe
        width={480}
        height={315}
        src={`https://www.youtube.com/embed/3TMRq0Uz-Qs`}
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-[16/9] h-full p-0"
      />
      <iframe
        width={480}
        height={315}
        src={`https://www.youtube.com/embed/1NjBATlIsjQ`}
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-[16/9] h-full p-0"
      />
      <iframe
        width={480}
        height={315}
        src={`https://www.youtube.com/embed/m_P3WOQ0GoI`}
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-[16/9] h-full p-0"
      />
    </div>
  );
}

export default VideoSection;

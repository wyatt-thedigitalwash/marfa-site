"use client";

import { useState } from "react";
import Image from "next/image";

interface Video {
  title: string;
  id: string;
}

function PlayIcon() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
    >
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "rgba(33, 31, 33, 0.6)" }}
      >
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          className="ml-1"
          aria-hidden="true"
        >
          <polygon
            points="0,0 20,12 0,24"
            fill="var(--color-cream)"
          />
        </svg>
      </div>
    </div>
  );
}

function VideoCell({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div>
        <div className="relative w-full aspect-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <h2
          className="font-[family-name:var(--font-display)] text-xs md:text-sm uppercase tracking-[0.18em] text-center mt-4 md:mt-5"
          style={{ color: "var(--color-black)" }}
        >
          {video.title}
        </h2>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setPlaying(true)}
        className="relative w-full aspect-video overflow-hidden group cursor-pointer"
        aria-label={`Play ${video.title}`}
      >
        <Image
          src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
          alt={video.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          loading="lazy"
          className="object-cover transition-[filter] duration-300 group-hover:brightness-75"
        />
        <PlayIcon />
      </button>
      <h2
        className="font-[family-name:var(--font-display)] text-xs md:text-sm uppercase tracking-[0.18em] text-center mt-4 md:mt-5"
        style={{ color: "var(--color-black)" }}
      >
        {video.title}
      </h2>
    </div>
  );
}

export default function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {videos.map((video) => (
        <VideoCell key={video.id} video={video} />
      ))}
    </div>
  );
}

"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const CLIPS = [
  "/video/Marfa_IfItAintYou.mp4",
  "/video/Marfa_AmericanBlues.mp4",
  "/video/Marfa_AMillionWays.mp4",
  "/video/Marfa_Daisy.mp4",
  "/video/Marfa_AmericanLonely.mp4",
  "/video/Marfa_LittleMissTwoTime.mp4",
];

const CLIP_COUNT = CLIPS.length;

export default function FilmReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const lastPlayingRef = useRef<Set<number>>(new Set());
  const isVisibleRef = useRef(false);
  const [offsets, setOffsets] = useState<number[]>(() =>
    Array(CLIP_COUNT).fill(0)
  );

  const syncPlayback = useCallback((visibleSet: Set<number>) => {
    const prev = lastPlayingRef.current;
    if (
      visibleSet.size === prev.size &&
      [...visibleSet].every((i) => prev.has(i))
    )
      return;
    lastPlayingRef.current = visibleSet;
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (visibleSet.has(i)) {
        video.muted = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, []);

  const pauseAll = useCallback(() => {
    lastPlayingRef.current = new Set();
    videoRefs.current.forEach((video) => video?.pause());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          pauseAll();
        }
      },
      { threshold: 0 }
    );
    observer.observe(section);

    function onScroll() {
      if (!section || !isVisibleRef.current) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const scrollRange = sectionHeight - viewportHeight;

      if (scrolled < 0 || scrolled > scrollRange) return;

      const progress = scrolled / scrollRange;
      const totalTransitions = CLIP_COUNT - 1;

      const next: number[] = [];
      for (let i = 0; i < CLIP_COUNT; i++) {
        const transitionStart = i / totalTransitions;
        const transitionEnd = (i + 1) / totalTransitions;
        const clipProgress =
          (progress - transitionStart) / (transitionEnd - transitionStart);
        const clamped = Math.max(0, Math.min(1, clipProgress));
        next.push(clamped * -100);
      }

      const visible = new Set<number>();
      for (let i = 0; i < CLIP_COUNT; i++) {
        if (next[i] > -100) {
          visible.add(i);
          if (next[i] < 0 && i + 1 < CLIP_COUNT) {
            visible.add(i + 1);
          }
          break;
        }
      }

      setOffsets(next);
      syncPlayback(visible);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [syncPlayback, pauseAll]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${CLIP_COUNT * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="relative w-full h-[240px] md:h-0 md:pb-[28.09%]">
          {CLIPS.map((src, i) => (
            <div
              key={i}
              className="absolute inset-0 will-change-transform overflow-hidden"
              style={{
                transform: `translateX(${offsets[i]}%)`,
                zIndex: CLIP_COUNT - i,
              }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                  if (el) el.muted = true;
                }}
                src={src}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

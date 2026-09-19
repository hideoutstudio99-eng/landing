"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { BedMark } from "./Mark";
import type { Photo } from "@/lib/photos";

/** Sticky arch that opens into a full photo as the section scrolls. Progress is written to
    --p on the section (see styles/reveal.css) without going through React state. */
export function ScrollReveal({ photo, caption }: { photo: Photo; caption: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.style.setProperty("--p", "1");
      return;
    }

    let frame = 0;
    const paint = () => {
      frame = 0;
      const travel = section.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const raw = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / travel));
      section.style.setProperty("--p", (1 - Math.pow(1 - raw, 1.6)).toFixed(4));
      if (hintRef.current) hintRef.current.style.opacity = String(Math.max(0, 1 - raw * 4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    paint();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} id="reveal" className="reveal">
      <div className="reveal-stage">
        <div className="arch-wrap">
          <div className="hanger" />
          <div className="arch">
            <div className="arch-art">
              <BedMark />
            </div>
            <div className="arch-shot">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1068px) 940px, 88vw"
                className="object-cover"
              />
            </div>
            <div className="arch-caption">{caption}</div>
          </div>
        </div>
        <div ref={hintRef} className="reveal-hint">
          Scroll
        </div>
      </div>
    </section>
  );
}

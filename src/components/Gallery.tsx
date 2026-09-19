import Image from "next/image";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { gallery } from "@/lib/photos";

export function Gallery() {
  return (
    <section id="gallery" className="py-section">
      <Container className="flex flex-col gap-[26px]">
        <SectionHeader title="The whole studio">
          Shot as it actually is, on an ordinary evening.
        </SectionHeader>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3">
          {gallery.map((photo) => (
            <figure
              key={photo.src}
              className="relative m-0 overflow-hidden rounded-md bg-surface"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1080px) 260px, (min-width: 540px) 50vw, 100vw"
                className={`h-full w-full object-cover ${photo.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3.5 pt-[34px] pb-[11px] font-display text-[.74rem] font-medium uppercase tracking-[.16em] text-white">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

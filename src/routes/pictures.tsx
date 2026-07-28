import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import pic1 from "@/assets/pic-1.jpg";
import pic2 from "@/assets/pic-2.jpg";
import pic3 from "@/assets/pic-3.jpg";
import pic4 from "@/assets/pic-4.jpg";
import pic5 from "@/assets/pic-5.jpg";
import pic6 from "@/assets/pic-6.jpg";
import pic7 from "@/assets/pic-7.jpg";
import pic8 from "@/assets/pic-8.jpg";
import pondi from "@/assets/pondi.mp4";
import heyjude from "@/assets/heyjude ending.mp4";

export const Route = createFileRoute("/pictures")({
  head: () => ({
    meta: [
      { title: "Pictures — Glenn Braggs" },
      {
        name: "description",
        content: "A small, quiet selection of photographs — mornings, mountains, rooms.",
      },
      { property: "og:title", content: "Pictures — Glenn Braggs" },
      {
        property: "og:description",
        content: "A small, quiet selection of photographs — mornings, mountains, rooms.",
      },
    ],
  }),
  component: Pictures,
});

const images = [
  { 
    src: pic1, 
    type: "image",
    alt: "A thin crescent moon in a deep purple and red sunset sky over a quiet street",
    tagline: "Taken near the sankey tank road, the traffic makes it better" 
  },
  { 
    src: pic2, 
    type: "image",
    alt: "A dirt path through dense green forest foliage with sunrays filtering through the trees",
    tagline: "KP walking along the etheral stairs that lead up to a waterfall in Gokarna" 
  },
  { 
    src: pondi, 
    type: "video",
    alt: "A video of scenic seasets in pondicherry",
    tagline: "seasets in pondicherry" 
  },
  { 
    src: heyjude, 
    type: "video",
    alt: "A video showing the ending of a choir rendition of hey jude by the beatles",
    tagline: "the ending of a choir rendition of hey jude by the beatles" 
  },
  { 
    src: pic5, 
    type: "image",
    alt: "Mural of a large fish with red roses inside it on a restaurant wall under bamboo ceiling",
    tagline: "restaurant in pondicherry" 
  },
  { 
    src: pic4, 
    type: "image",
    alt: "Cows grazing in a wide green field with rolling hills and a cloudy sky",
    tagline: "somewhere on the way to mangalore" 
  },
  { 
    src: pic6, 
    type: "image",
    alt: "Five motorcycles parked on a grassy field near a body of water under a cloudy sky",
    tagline: "5 bikes in one frame - KRS" 
  },
  { 
    src: pic7, 
    type: "image",
    alt: "Three motorcyclists on a green field overlooking a lake with a Triumph Scrambler 400X in the foreground",
    tagline: "scram, dad, me" 
  },
  { 
    src: pic8, 
    type: "image",
    alt: "A black and white printed poster of a nun giving the middle finger with the text: FUCKS I GIVE NUN!",
    tagline: "should've bought this" 
  },
  { 
    src: pic3, 
    type: "image",
    alt: "A black laundry hamper with the text: Laundry Today or Naked Tomorrow",
    tagline: "my friends room" 
  },
];

function Pictures() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="px-6 pt-10 pb-32 md:px-16 md:pt-28 lg:px-24">
      <div className="max-w-[640px]">
        <h1 className="font-serif text-[2.35rem] leading-[1.15] font-normal tracking-[-0.015em] md:text-[3rem]">
          Pictures
        </h1>
        <p className="mt-4 text-slate-muted">
          A roll a month, mostly before eight in the morning.
        </p>
      </div>

      <div className="mt-16 grid max-w-[1100px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            className="block cursor-zoom-in opacity-100 transition-opacity duration-300 hover:opacity-80 w-full text-left"
            aria-label={`View larger: ${img.alt}`}
          >
            {img.type === "video" ? (
              <video
                src={img.src}
                muted
                playsInline
                loop
                autoPlay
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={img.src}
                alt={img.alt}
                width={800}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            )}
          </button>
        ))}
      </div>

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[open].alt}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-background/95 p-6 md:p-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-h-full max-w-[90vw]">
            {images[open].type === "video" ? (
              <video
                src={images[open].src}
                controls
                autoPlay
                className="max-h-[70vh] md:max-h-[80vh] w-auto object-contain shrink"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={images[open].src}
                alt={images[open].alt}
                className="max-h-[70vh] md:max-h-[80vh] w-auto object-contain shrink"
              />
            )}
            {images[open].tagline ? (
              <div 
                className="w-full md:w-64 text-center md:text-left shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-sans text-xs md:text-sm font-light text-slate-muted/90 italic tracking-wide leading-relaxed">
                  {images[open].tagline}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

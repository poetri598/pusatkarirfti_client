import React from "react";

// Components
import SectionCarouselAuth from "./SectionCarouselAuth";
type Props = {
  className?: string;
};

export default function SectionRight(props: Props) {
  const { className } = props;
  return (
    <>
      <>
        <section className={className}>
          {/* Kotak-kotak grid */}
          <div className="absolute h-full inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] xs:bg-[size:32px_32px] md:bg-[size:128px_128px] z-0" />
          {/* Konten kanan */}
          <div className="relative z-10">
            <SectionCarouselAuth />
          </div>
        </section>
      </>
    </>
  );
}

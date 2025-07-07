// Iconsax
import { QuoteUp } from "iconsax-react";

// NextJS
import Image from "next/image";

export default function HeroKarir() {
  return (
    <>
      <section className="mx-auto xs:py-8 md:py-32 gradient-style overflow-hidden ">
        <div className="xs:w-11/12 sm:w-8/12 mx-auto relative flex flex-col justify-center xs:gap-2 md:gap-8 ">
          <div className="relative xs:px-4 xl:px-16 h-fit w-fit">
            <QuoteUp color="currentColor" variant="Bulk" className="xs:w-4 md:w-16 text-background-primary absolute xs:-top-4 xs:left-0 xl:-top-8 xl:left-0" />
            <span className="xs:text-base md:text-4xl text-center text-background-primary font-bold "> Jangan menunggu kesempatan datang, ciptakan kesempatan itu.</span>
          </div>

          <span className="xs:text-base md:text-4xl text-justify text-background-primary font-bold">– George Bernard Shaw</span>
        </div>
        <Image src="/bg-kutipan-1.png" alt="hero" width={1440} height={1440} className="absolute top-0 right-0   !w-1/2 !h-fit" />
        <Image src="/bg-kutipan-2.png" alt="hero" width={1440} height={1440} className="absolute top-0 left-0  !w-1/2 !h-fit  " />
      </section>
    </>
  );
}

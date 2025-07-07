// Iconsax
import { ArrowRight2 } from "iconsax-react";

// NextJS
import Link from "next/link";

type TitleSectionType = {
  label: string;
  href?: string;
};

export default function TitleSection(props: TitleSectionType) {
  const { label, href } = props;
  return (
    <>
      <div className="flex justify-between items-center w-full group">
        <div className="relative">
          <p className=" relative z-10 xs:text-base md:text-xl text-primary-primary font-bold ">{label}</p>
          <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
        </div>
        <div>
          <Link href={href || "#"} className="login  flex items-center gap-1  hover:text-secondary-primary group">
            <span className="text-xs">Lebih Banyak</span>
            <ArrowRight2 className={`text-background-primary htransition-colors group-hover:text-secondary-primary`} color="currentColor" size="20" />
          </Link>
        </div>
      </div>
    </>
  );
}

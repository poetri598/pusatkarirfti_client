// Iconsax
import { ArrowRight2 } from "iconsax-react";

// NextJS
import Link from "next/link";

type TitleSectionType = {
  label: string;
};

export default function TitleSection2(props: TitleSectionType) {
  const { label } = props;
  return (
    <>
      <div className="relative xs:w-11/12 lg:w-4/12 flex flex-col justify-center  items-center mx-auto py-8 ">
        <span className="xs:text-base md:text-4xl text-center text-primary-primary font-bold ">{label}</span>
        <div className="absolute h-4 w-4/6 bottom-0 rounded-full bg-secondary-primary"></div>
      </div>
    </>
  );
}

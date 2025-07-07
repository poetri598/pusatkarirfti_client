import React from "react";

// Iconsax
import { AddCircle } from "iconsax-react";

// NextJS
import { usePathname } from "next/navigation";
import Link from "next/link";

type TitleSectionType = {
  label: string;
  href?: string;
};

export default function TitleSectionAdmin(props: TitleSectionType) {
  const { label, href } = props;

  if (!href)
    return (
      <section className="flex justify-between items-center">
        <span className="text-xl font-bold">{label}</span>
      </section>
    );

  if (href)
    return (
      <section className="flex justify-between items-center">
        <span className="text-xl font-bold">{label}</span>
        <Link href={href} className="login  flex items-center gap-1  hover:text-secondary-primary group">
          <span className="text-xs">Tambah</span>
          <AddCircle className={`text-background-primary htransition-colors group-hover:text-secondary-primary`} color="currentColor" size="20" />
        </Link>
      </section>
    );
}

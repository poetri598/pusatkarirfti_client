import React from "react";

// NextJS
import Image from "next/image";
import Link from "next/link";

// Types
import { NewsItem } from "@/types/news";

export default function CardBerita4(props: NewsItem) {
  const { news_name, news_img, news_slug, tag_names } = props;
  return (
    <>
      <>
        <Link href={`/kegiatan-cdc-fti/${news_slug}`} className="rounded-medium xs:p-2 md:p-8 hover:bg-default-200 bg-background-primary overflow-hidden">
          <div className="relative flex justify-center">
            <Image
              src={news_img}
              alt=""
              width={1280}
              height={720}
              loading="lazy"
              className="w-full h-96 rounded-md
             object-cover"
            />
            <div className="absolute top-0  w-full h-full  gradient-style-3 opacity-30"></div>
            <div className="absolute top-0  w-10/12 h-full flex flex-col justify-center gap-4">
              <div className="bg-background-primary h-2 w-1/4 rounded-full"></div>
              <div className="flex gap-2">
                {((tag_names as string) || "").split(",").map((tag, index) => (
                  <span key={index} className="xs:text-xs lg:text-sm p-1 rounded-full w-fit text-background-primary border border-primary-surface">
                    {tag.trim()}
                  </span>
                ))}
              </div>

              <span className="xs:text-sm sm:text-xl font-bold text-background-primary">{news_name}</span>
            </div>
          </div>
        </Link>
      </>
    </>
  );
}

"use client";

// Iconsax
import { ArrowRight2, Teacher, Star1, Clock } from "iconsax-react";

// NextJS
import Image from "next/image";
import Link from "next/link";

// Components
import { Button, useDisclosure, Tooltip } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw } from "@/utils/time";
import ModalGuest from "@/components/Custom/ModalGuest";
import RichTextDisplay from "../Custom/RichTextDisplay";

// Types
import { NewsItem } from "@/types/news";

// Authentication Context
import { useAuth } from "@/context/AuthContext";

export default function CardBerita2(props: NewsItem) {
  const { news_slug, news_name, news_img, news_desc, news_type_name, news_created_at } = props;
  const relativeDate = getRelativeTimeRaw(news_created_at);
  const fullDate = getFullTimeRaw(news_created_at);

  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full h-full p-4 grid grid-cols-3 xs:gap-2 md:gap-4 border border-default-200 bg-background-primary shadow shadow-cyan-200 text-xs rounded-medium overflow-hidden">
      <div className="relative">
        <Image src={news_img} alt={news_img} width={720} height={1280} className="w-full h-full rounded-medium object-cover" />
        <Star1 size={32} color="currentColor" variant="Outline" className="absolute top-2 right-2 bg-background-primary rounded-full p-2 cursor-pointer hover:bg-primary-hover hover:text-background-primary transition-all hover:rotate-180" />
      </div>
      <div className="flex flex-col justify-between xs:gap-2 md:gap-4 col-span-2">
        <div className="w-full flex xs:flex-col sm:flex-row lg:flex-col 2xl:flex-row gap-2 justify-between">
          <div className="flex items-center gap-1">
            <Teacher size={20} color="currentColor" variant="Bulk" className="text-primary-primary" />
            <span className="text-text-secondary text-xs">{news_type_name}</span>
          </div>
          <div className="flex items-center gap-1">
            {" "}
            <Clock size={20} color="currentColor" variant="Bulk" className="text-primary-primary" />
            <Tooltip
              content={fullDate}
              placement="top"
              classNames={{
                content: "text-xs text-background-primary bg-primary-primary",
              }}
            >
              <span className="text-xs text-text-secondary cursor-help">{relativeDate}</span>
            </Tooltip>
          </div>
        </div>
        <span className="font-bold w-full xs:text-sm md:text-lg">{news_name}</span>
        <RichTextDisplay html={news_desc} className="text-xs line-clamp-3 " />
        <div className="flex justify-end">
          {user ? (
            <Link href={`/berita/${news_slug}`} className="login flex items-center gap-1 transition-colors hover:text-secondary-primary group">
              <span className="text-xs">Selengkapnya</span>
              <ArrowRight2 size={20} color="currentColor" className="text-background-primary transition-colors group-hover:text-secondary-primary" />
            </Link>
          ) : (
            <Button className="login flex items-center gap-1 transition-colors hover:text-secondary-primary group" onPress={onOpen}>
              <span className="text-xs">Selengkapnya</span>
              <ArrowRight2 size={20} color="currentColor" className="text-background-primary transition-colors group-hover:text-secondary-primary" />
            </Button>
          )}
        </div>
      </div>

      {/* Modal Guest */}
      <ModalGuest isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

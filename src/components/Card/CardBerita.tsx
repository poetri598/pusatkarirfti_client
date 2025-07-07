"use client";

// Iconsax
import { ArrowRight2, Star1, Eye } from "iconsax-react";

// NextJS
import Image from "next/image";
import Link from "next/link";

// Components
import { Button, useDisclosure, Tooltip } from "@heroui/react";
import { formatViews } from "@/utils/view";
import ModalGuest from "@/components/Custom/ModalGuest";
import RichTextDisplay from "@/components/Custom/RichTextDisplay";

// Types
import { NewsItem } from "@/types/news";

// Authentication Context
import { useAuth } from "@/context/AuthContext";

export default function CardBerita(props: NewsItem) {
  const { news_slug, news_img, news_name, news_desc, news_views } = props;
  const { user } = useAuth(); // Ambil user dari AuthContext
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full p-4 flex flex-col justify-between gap-4 border border-default-200 bg-background-primary shadow shadow-cyan-200 group rounded-medium overflow-hidden">
      <div className="relative">
        <Image src={news_img} alt={news_img} width={1280} height={720} className="aspect-video object-cover w-full h-full rounded-medium" />
        <Star1 size={48} color="currentColor" variant="Outline" className="absolute top-2 right-2 bg-background-primary rounded-full p-2 cursor-pointer hover:bg-primary-hover hover:text-background-primary transition-all hover:rotate-180" />
      </div>
      <span className="font-bold xs:text-base md:text-4xl w-full">{news_name}</span>
      <RichTextDisplay html={news_desc} className="text-xs line-clamp-6" />
      <div className="flex justify-between gap-1">
        <Tooltip
          content={news_views.toLocaleString("id-ID")}
          placement="top"
          classNames={{
            content: "text-xs text-background-primary bg-primary-primary",
          }}
        >
          <div className="flex items-center gap-1">
            <Eye size={20} color="currentColor" variant="Bold" className="text-primary-primary" />
            <span className="text-xs text-text-secondary">{formatViews(news_views)} kali dilihat</span>
          </div>
        </Tooltip>
        <div>
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

// NextJS
import Image from "next/image";
import Link from "next/link";

// Types
import { NewsItem } from "@/types/news";
export default function CardBerita2(props: NewsItem) {
  const { news_name, news_img, news_type_name, news_slug, news_created_at, user_fullname } = props;
  return (
    <>
      <>
        <div className="w-full flex flex-col gap-2 group text-lg rounded-medium overflow-hidden">
          <div className="relative inline-block">
            <Image src={news_img} alt="" width={360} height={360} className="w-full rounded-medium object-cover" />
            <div className="absolute bottom-1/4 -left-1 bg-secondary-primary text-primary-primary text-sm px-3 py-1 rounded-br-lg">{news_type_name}</div>
          </div>
          <Link href={`/berita/${news_slug}`} className="font-bold w-full line-clamp-2 hover:text-primary-primary">
            {news_name}
          </Link>
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center text-sm gap-2">
              <span className="w-4 h-4 rounded-full bg-primary-primary"></span>
              <span className="text-text-secondary">{user_fullname}</span>
            </div>
            <div className="flex items-center text-sm gap-2">
              <span className="w-4 h-4 rounded-full bg-primary-primary"></span>
              <span className="text-text-secondary">{news_created_at}</span>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

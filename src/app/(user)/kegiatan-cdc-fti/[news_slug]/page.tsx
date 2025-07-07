import { use } from "react";
import SectionKegiatanCDCFTIClient from "@/components/User/KegiatanCDCFTI/SectionKegiatanCDCFTIClient";

export default function page({ params }: { params: Promise<{ news_slug: string }> }) {
  const { news_slug } = use(params);
  return <SectionKegiatanCDCFTIClient news_slug={news_slug} />;
}

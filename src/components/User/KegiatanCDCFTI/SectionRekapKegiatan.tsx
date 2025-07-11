"use client";
import React, { useState, useEffect } from "react";
// Components
import CardBerita4 from "@/components/Card/CardBerita4";
import TitleSection2 from "@/components/Custom/TitleSection2";
import { Button, Pagination, Spinner } from "@heroui/react";

// Iconsax
import { ArrowRight2 } from "iconsax-react";

// types
import type { NewsItem } from "@/types/news";

// Services
import { getNewsAllByTypeNameKegiatanPusatKarirFTI } from "@/services/news";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function SectionRekapKegiatan() {
  const [allKegiatanPusatKarirFTI, setAllKegiatanPusatKarirFTI] = useState<NewsItem[]>([]);
  const [isLoadingAllKegiatanPusatKarirFTI, setIsLoadingAllKegiatanPusatKarirFTI] = useState(true);
  const [apiErrorAllKegiatanPusatKarirFTI, setApiErrorAllKegiatanPusatKarirFTI] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getNewsAllByTypeNameKegiatanPusatKarirFTI, setAllKegiatanPusatKarirFTI, setApiErrorAllKegiatanPusatKarirFTI, setIsLoadingAllKegiatanPusatKarirFTI)];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [amount, setAmount] = useState(4);
  const maxValue = allKegiatanPusatKarirFTI.length;
  const currentItems = allKegiatanPusatKarirFTI.slice((currentPage - 1) * amount, currentPage * amount);
  const totalPage = Math.ceil(maxValue / amount);
  return (
    <>
      <>
        <section className="xs:w-11/12 md:10/12 mx-auto flex flex-col gap-8 py-8">
          <TitleSection2 label="Rekap Kegiatan" />
          <div className="grid xs:grid-cols-1 lg:grid-cols-2 w-full gap-8 py-8">
            {isLoadingAllKegiatanPusatKarirFTI ? (
              <div className="w-full flex justify-center items-center py-8">
                <Spinner
                  label="Sedang memuat data..."
                  labelColor="primary"
                  variant="dots"
                  classNames={{
                    label: "text-primary-primary mt-4",
                    dots: "border-5 border-primary-primary",
                  }}
                />
              </div>
            ) : apiErrorAllKegiatanPusatKarirFTI ? (
              <p className="text-start text-xs text-danger-primary">{apiErrorAllKegiatanPusatKarirFTI}</p>
            ) : allKegiatanPusatKarirFTI.length === 0 ? (
              <p className="text-start text-xs text-text-secondary w-full">Data belum tersedia</p>
            ) : (
              currentItems.map((item) => <CardBerita4 key={item.news_id} {...item} />)
            )}
          </div>
          {/* Pagination */}
          <div className="w-full  flex justify-end item-center">
            <div className="flex items-center">
              {/* Sebelumnya */}
              <Button size="sm" variant="light" className="text-primary-primary gap-0 font-semibold px-4 py-2 text-xs " onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))} isDisabled={currentPage === 1}>
                <ArrowRight2 size={16} color="currentColor" className="rotate-180 mr-1" />
                <span className="xs:hidden md:block">Sebelumnya</span>
              </Button>

              {/* Pagination */}
              <Pagination
                page={currentPage}
                total={totalPage} // Ganti sesuai total halaman kamu
                onChange={(page) => setCurrentPage(page)}
                classNames={{
                  base: "overflow-hidden ",
                  wrapper: "",
                  prev: "",
                  next: "",
                  item: "text-text-secondary data-[active=true]:text-primary-primary data-[active=true]:border data-[active=true]:border-primary-primary data-[active=true]:font-medium bg-backbround-secondary text-xs",
                  cursor: "rounded-md text-xs w-8 h-8 text-primary-primary",
                  forwardIcon: "text-primary-primary",
                  ellipsis: "text-primary-primary",
                  chevronNext: "text-primary-primary",
                }}
              />

              {/* Selanjutnya */}
              <Button size="sm" variant="light" className="text-primary-primary font-semibold px-4 py-2 gap-0 text-xs " onPress={() => setCurrentPage((prev) => (prev < totalPage ? prev + 1 : prev))} isDisabled={currentPage === totalPage}>
                <span className="xs:hidden md:block">Selanjutnya</span>
                <ArrowRight2 size={16} color="currentColor" className="ml-1" />
              </Button>
            </div>
          </div>
        </section>
      </>
    </>
  );
}

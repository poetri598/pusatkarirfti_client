"use client";
import React, { useState, useEffect } from "react";

// Iconsax
import { SearchNormal1, ArrowRight2, FilterEdit, Sort } from "iconsax-react";

// Components
import TitleKarir from "@/components/Custom/TitleKarir";
import { Button, Input, Select, SelectItem, Selection, Pagination, Spinner } from "@heroui/react";
import CardBerita2 from "@/components/Card/CardBerita2";

// Types
import { NewsItem } from "@/types/news";
import { NewsTypeItem } from "@/types/newsType";

// Services
import { searchNewsActive } from "@/services/news";
import { getNewsTypeAll } from "@/services/newsType";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function Berita() {
  // newsTypes
  const [newsTypes, setNewsTypes] = useState<NewsTypeItem[]>([]);
  const [news_type_id, setNewsTypeId] = useState<Selection>(new Set([]));
  const [isLoadingNewsTypes, setIsLoadingNewsTypes] = useState(true);
  const [apiErrorNewsTypes, setApiErrorNewsTypes] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getNewsTypeAll, setNewsTypes, setApiErrorNewsTypes, setIsLoadingNewsTypes)];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };
    fetchAll();
  }, []);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [sort, setSort] = useState<string>("");
  const [filters, setFilters] = useState<{ [key: string]: string | number }>({});

  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoadingAllNews, setIsLoadingAllNews] = useState(true);
  const [apiErrorAllNews, setApiErrorAllNews] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [amount, setAmount] = useState(8);

  const maxValue = news.length;
  const minValue = 1;
  const currentItems = news.slice((currentPage - 1) * amount, currentPage * amount);
  const totalPage = Math.ceil(maxValue / amount);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoadingAllNews(true);
      setApiErrorAllNews(null);

      try {
        const queryParams: Record<string, any> = {
          ...(searchKeyword && { search: searchKeyword }),
          ...(sort && { sort }),
          ...filters,
        };

        const { success, data, error } = await searchNewsActive(queryParams);

        if (success) {
          setNews(data || []);
        } else {
          setApiErrorAllNews(error || "Terjadi kesalahan");
        }
      } catch (err: any) {
        setApiErrorAllNews(err.message || "Terjadi kesalahan");
      } finally {
        setIsLoadingAllNews(false);
      }
    };

    fetchNews();
  }, [searchKeyword, sort, filters]);

  const selecItem = [{ key: "news_type_id", label: "Tipe" }];

  const sortOptions = [
    { key: "", label: "— Tidak diurutkan —" },
    { key: "news_views:desc", label: "Paling Banyak Dilihat" },
    { key: "news_views:asc", label: "Paling Sedikit Dilihat" },
    { key: "news_created_at:desc", label: "Terbaru" },
    { key: "news_created_at:asc", label: "Terlama" },
  ];

  return (
    <>
      <>
        <main className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 py-8">
          <TitleKarir label="Berita dan Sosialisasi" />

          {/* Section Search, Filter & Sort */}
          <section className="flex xs:flex-col xs:justify-start xs:items-start md:flex-row md:justify-between md:items-center gap-2 border-b border-border-primary pb-4">
            {/* Search */}
            <Input
              startContent={<SearchNormal1 size={16} color="currentColor" className="text-text-secondary transition-colors  rounded-lg " />}
              label="Cari informasi Berita"
              labelPlacement="outside"
              placeholder="Masukkan kata kunci"
              variant="bordered"
              type="search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
              }}
              className="w-64"
            />

            <div className="flex xs:flex-col xs:justify-start xs:items-start md:flex-row md:justify-center md:items-center gap-2">
              {" "}
              {/* Filter */}
              <Select
                label="Tambahkan filter"
                labelPlacement="outside"
                placeholder="Pilih Filter"
                variant="bordered"
                selectionMode="multiple"
                selectorIcon={<FilterEdit size={16} color="currentColor" className="text-text-secondary transition-colors" />}
                selectedKeys={selectedFilters}
                onSelectionChange={(keys) => {
                  const value = new Set(Array.from(keys as Iterable<string>));
                  setSelectedFilters(value);
                }}
                classNames={{
                  base: "w-64",
                  label: "after:text-danger-primary text-xs text-text-secondary ",
                  trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                  value: "text-xs",
                  errorMessage: "text-danger-primary text-xs",
                }}
              >
                {selecItem.map((item) => (
                  <SelectItem
                    key={item.key}
                    classNames={{
                      title: "text-xs hover:!text-primary-primary",
                      selectedIcon: "text-primary-primary",
                    }}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              {/* Sort */}
              <Select
                label="Urutkan"
                labelPlacement="outside"
                placeholder="Pilih Urutan"
                variant="bordered"
                selectedKeys={new Set([sort])}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (typeof selected === "string") {
                    setSort(selected);
                  }
                }}
                selectorIcon={<Sort size={16} color="currentColor" className="text-text-secondary" />}
                classNames={{
                  base: "w-64",
                  label: "after:text-danger-primary text-xs text-text-secondary ",
                  trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                  value: "text-xs",
                  errorMessage: "text-danger-primary text-xs",
                }}
              >
                {sortOptions.map((item) => (
                  <SelectItem
                    key={item.key}
                    classNames={{
                      title: "text-xs hover:!text-primary-primary",
                      selectedIcon: "text-primary-primary",
                    }}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </section>

          <section className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4  w-full">
            {/* news_type_id */}
            {selectedFilters.has("news_type_id") && (
              <Select
                label="Pilih tipe"
                labelPlacement="outside"
                variant="bordered"
                name="news_type_id"
                selectedKeys={new Set([filters.news_type_id || ""])}
                onSelectionChange={(key) => {
                  const value = Array.from(key)[0];
                  setFilters((prev) => ({ ...prev, news_type_id: value }));
                }}
                classNames={{
                  label: "after:text-danger-primary text-xs text-text-secondary",
                  trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                  value: "text-xs",
                  errorMessage: "text-danger-primary text-xs",
                }}
              >
                {newsTypes.length === 0 ? (
                  <SelectItem key="nodata" isDisabled>
                    Data belum tersedia
                  </SelectItem>
                ) : (
                  newsTypes.map((item) => (
                    <SelectItem
                      key={item.news_type_id}
                      classNames={{
                        title: "text-xs hover:!text-primary-primary",
                        selectedIcon: "text-primary-primary",
                      }}
                    >
                      {item.news_type_name}
                    </SelectItem>
                  ))
                )}
              </Select>
            )}
          </section>

          {/* Hasil */}
          <div className="flex flex-col gap-2">
            {(searchKeyword || Object.keys(filters).length > 0) && (
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary">
                  Kata kunci{" "}
                  <span className="text-primary-primary">
                    {searchKeyword || "..."} {filters?.city && `di ${filters.city}`}
                  </span>
                </span>
                <span className="text-xs text-text-secondary">
                  Kami menemukan <span className="font-bold text-primary-primary">{news.length}</span> Berita
                </span>
              </div>
            )}
          </div>

          {/* Section Card */}
          <section className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoadingAllNews ? (
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
            ) : apiErrorAllNews ? (
              <p className="text-start text-xs text-danger-primary">{apiErrorAllNews}</p>
            ) : currentItems.length === 0 ? (
              <p className="text-center text-xs text-gray-500 col-span-full py-8">Data belum tersedia</p>
            ) : (
              currentItems.map((item) => <CardBerita2 key={item.news_id} {...item} />)
            )}
          </section>
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
        </main>
      </>
    </>
  );
}

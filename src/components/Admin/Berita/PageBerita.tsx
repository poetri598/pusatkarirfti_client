"use client";
import { useState, useEffect } from "react";

// Iconsax
import { SearchNormal1, ArrowRight2, FilterEdit, Sort, Element3, Firstline, Eye, Edit, Trash } from "iconsax-react";

// Components
import {
  Breadcrumbs,
  BreadcrumbItem,
  Input,
  NumberInput,
  Pagination,
  Button,
  Spinner,
  Select,
  SelectItem,
  Selection,
  Tooltip,
  Link,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Avatar,
} from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import CardBeritaAdmin from "@/components/Card/CardBeritaAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { NewsItem } from "@/types/news";
import { NewsTypeItem } from "@/types/newsType";
import { UserItem } from "@/types/user";
import { StatusItem } from "@/types/status";

// Services
import { searchNews, deleteNewsById } from "@/services/news";
import { getNewsTypeAll } from "@/services/newsType";
import { getUserAllAdmin } from "@/services/user";
import { getStatusAll } from "@/services/status";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { getRelativeTimeRaw } from "@/utils/time";
import { formatViews } from "@/utils/view";

export default function PageBerita() {
  // newsTypes
  const [newsTypes, setNewsTypes] = useState<NewsTypeItem[]>([]);
  const [news_type_id, setNewsTypeId] = useState<Selection>(new Set([]));
  const [isLoadingNewsTypes, setIsLoadingNewsTypes] = useState(true);
  const [apiErrorNewsTypes, setApiErrorNewsTypes] = useState<string | null>(null);
  // users
  const [users, setUsers] = useState<UserItem[]>([]);
  const [user_id, setUserId] = useState<Selection>(new Set([]));
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [apiErrorUsers, setApiErrorUsers] = useState<string | null>(null);
  // statuses
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [status_id, setStatusId] = useState<Selection>(new Set([]));
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);
  const [apiErrorStatuses, setApiErrorStatuses] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [
        createServiceFetcher(getNewsTypeAll, setNewsTypes, setApiErrorNewsTypes, setIsLoadingNewsTypes),
        createServiceFetcher(getUserAllAdmin, setUsers, setApiErrorUsers, setIsLoadingUsers),
        createServiceFetcher(getStatusAll, setStatuses, setApiErrorStatuses, setIsLoadingStatuses),
      ];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };
    fetchAll();
  }, []);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [sort, setSort] = useState<string>("");
  const [filters, setFilters] = useState<{ [key: string]: string | number }>({});

  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const [News, setNews] = useState<NewsItem[]>([]);
  const [isLoadingAllNews, setIsLoadingAllNews] = useState(true);
  const [apiErrorAllNews, setApiErrorAllNews] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [amount, setAmount] = useState(8);

  const maxValue = News.length;
  const minValue = 1;
  const currentItems = News.slice((currentPage - 1) * amount, currentPage * amount);
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

        const { success, data, error } = await searchNews(queryParams);

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

  const selecItem = [
    { key: "news_type_id", label: "Tipe" },
    { key: "user_id", label: "Penulis" },
    { key: "status_id", label: "Status Publikasi" },
  ];

  const sortOptions = [
    { key: "", label: "— Tidak diurutkan —" },
    { key: "news_views:desc", label: "Paling Banyak Dilihat" },
    { key: "news_views:asc", label: "Paling Sedikit Dilihat" },
    { key: "news_created_at:desc", label: "Terbaru" },
    { key: "news_created_at:asc", label: "Terlama" },
  ];

  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  // Ambil data dari props atau state
  const columns = [
    { key: "no", label: "#" },
    { key: "news_name", label: "Judul" },
    { key: "news_created_at", label: "Tanggal Dibuat" },
    { key: "news_views", label: "Dilihat" },
    { key: "actions", label: "Aksi" },
  ];

  // Format data jadi bentuk table-ready
  const tableItems = currentItems.map((news, index) => ({
    key: news.news_id,
    no: index + 1,
    news_name: news.news_name.length > 30 ? news.news_name.slice(0, 30) + "..." : news.news_name,
    news_created_at: getRelativeTimeRaw(news.news_created_at),
    news_views: formatViews(news.news_views),
    actions: news, // kirim full job object untuk keperluan aksi
  }));

  return (
    <main className="w-full mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
      {/* Breadcrumb */}
      <Breadcrumbs
        className="text-xs text-text-secondary"
        itemClasses={{
          item: "data-[current=true]:text-primary-primary cursor-pointer text-xs",
        }}
      >
        <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
        <BreadcrumbItem href="/berita">Berita</BreadcrumbItem>
      </Breadcrumbs>

      {/* Section Title */}
      <TitleSectionAdmin label="Berita" href="/berita/tambah" />

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

        <div className="flex xs:flex-col xs:justify-start xs:items-start md:flex-row md:justify-center md:items-end gap-2">
          {/* Toggle View */}
          <Button isIconOnly onPress={() => setViewMode(viewMode === "card" ? "table" : "card")} className="text-text-primary bg-transparent active:bg-default-200" aria-label="Tombol Toggle Tampilan">
            {viewMode === "card" ? (
              <Firstline size={24} variant="Bold" color="currentColor" /> // icon table
            ) : (
              <Element3 size={24} variant="Bold" color="currentColor" /> // icon card
            )}
          </Button>
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
        {/* user_id */}
        {selectedFilters.has("user_id") && (
          <Select
            isMultiline={true}
            items={users}
            label="Pilih nama peserta"
            labelPlacement="outside"
            variant="bordered"
            name="user_id"
            renderValue={(items) => (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <div key={item.data?.user_id} className="flex items-center gap-2">
                    <Avatar alt={item.data?.user_fullname} className="w-6 h-6" src={item.data?.user_img} classNames={{ img: "object-contain bg-background-primary" }} />
                    <div className="flex flex-col">
                      <span className="text-xs">{item.data?.user_fullname}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            selectedKeys={new Set([filters.user_id || ""])}
            onSelectionChange={(key) => {
              const value = Array.from(key)[0];
              setFilters((prev) => ({ ...prev, user_id: value }));
            }}
            classNames={{
              label: "after:text-danger-primary text-xs",
              trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
              value: "text-xs",
              errorMessage: "text-danger-primary",
            }}
          >
            {(user) => (
              <SelectItem
                key={user.user_id}
                textValue={user.user_name}
                classNames={{
                  title: "text-xs hover:!text-primary-primary",
                  selectedIcon: "text-primary-primary",
                }}
              >
                <div className="flex items-center gap-2">
                  <Avatar alt={user.user_fullname} className="w-6 h-6" src={user.user_img} classNames={{ img: "object-contain bg-background-primary" }} />
                  <div className="flex flex-col">
                    <span className="text-xs">{user.user_fullname}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        )}

        {/* status_id */}
        {selectedFilters.has("status_id") && (
          <Select
            label="Pilih status publikasi"
            labelPlacement="outside"
            variant="bordered"
            name="status_id"
            selectedKeys={new Set([filters.status_id || ""])}
            onSelectionChange={(key) => {
              const value = Array.from(key)[0];
              setFilters((prev) => ({ ...prev, status_id: value }));
            }}
            classNames={{
              label: "after:text-danger-primary text-xs text-text-secondary",
              trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
              value: "text-xs",
              errorMessage: "text-danger-primary text-xs",
            }}
          >
            {statuses.length === 0 ? (
              <SelectItem key="nodata" isDisabled>
                Data belum tersedia
              </SelectItem>
            ) : (
              statuses.map((item) => (
                <SelectItem
                  key={item.status_id}
                  classNames={{
                    title: "text-xs hover:!text-primary-primary",
                    selectedIcon: "text-primary-primary",
                  }}
                >
                  {item.status_name}
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
              Kami menemukan <span className="font-bold text-primary-primary">{News.length}</span> Berita
            </span>
          </div>
        )}
      </div>

      {/* Section Tampilan Card / Table */}
      {viewMode === "card" ? (
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
            <div className="w-full col-span-full text-center py-8">
              <p className="text-sm text-gray-500">Data belum tersedia.</p>
            </div>
          ) : (
            currentItems.map((item) => <CardBeritaAdmin key={item.news_id} {...item} />)
          )}
        </section>
      ) : (
        <Table
          isHeaderSticky
          aria-label="Tabel Lowongan Kerja"
          classNames={{
            base: "xs:w-fit xl:w-full",
            table: "min-w-[640px] text-xs",
            wrapper: "overflow-x-auto rounded-lg border border-default-200",
            th: "bg-gray-100 text-gray-700 uppercase whitespace-nowrap text-center",
            td: "whitespace-nowrap text-xs",
          }}
        >
          <TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>

          <TableBody items={tableItems} emptyContent="Data belum tersedia.">
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => {
                  if (columnKey === "actions") {
                    const news = item.actions;
                    return (
                      <TableCell>
                        <div className="flex justify-center items-center gap-2">
                          <Tooltip content="Lihat detail" placement="top" className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                            <Button as={Link} isIconOnly variant="light" size="sm" href={`/berita/${news.news_slug}`}>
                              <Eye size={20} className="text-yellow-500" variant="Bold" color="currentColor" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Edit data" placement="top" className="bg-primary-primary text-white text-xs px-2 py-1 rounded">
                            <Button as={Link} isIconOnly variant="light" size="sm" href={`/berita/edit/${news.news_slug}`}>
                              <Edit size={20} className="text-primary-primary" variant="Bold" color="currentColor" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Hapus data" placement="top" className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                            <Button
                              isIconOnly
                              variant="light"
                              size="sm"
                              onPress={async () => {
                                const confirm = await showConfirmationDialog();
                                if (confirm.isConfirmed) {
                                  const result = await deleteNewsById(news.news_id);
                                  if (result.success) {
                                    await showSuccessDialog();
                                    window.location.reload();
                                  } else {
                                    await showErrorDialog(result.error);
                                  }
                                }
                              }}
                            >
                              <Trash size={20} className="text-danger-primary" variant="Bold" color="currentColor" />
                            </Button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    );
                  }

                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Section Input Number & Pagination */}
      <section className="flex flex-wrap gap-4 justify-between items-center xs:flex-col md:flex-row">
        {/* Input Number */}
        <NumberInput
          radius="md"
          size="sm"
          className="xs:w-full md:w-20"
          minValue={minValue}
          maxValue={maxValue}
          value={amount}
          inputMode="numeric"
          onValueChange={setAmount}
          aria-label="Pagination"
          classNames={{
            inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary border border-default-200",
            input: "placeholder:text-primary-primary !text-primary-primary focus:!border-primary-primary xs:text-xs md:text-sm text-center",
            stepperButton: "text-primary-primary",
          }}
        />

        {/* Pagination Controls */}
        <div className="flex flex-wrap justify-center items-center gap-2 w-full md:w-auto">
          {/* Previous */}
          <Button size="sm" variant="light" className="text-primary-primary gap-0 font-semibold px-4 py-2 xs:text-xs md:text-sm" onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))} isDisabled={currentPage === 1}>
            <ArrowRight2 size={16} color="currentColor" className="rotate-180 mr-1" />
            <span className="xs:hidden md:block">Sebelumnya</span>
          </Button>

          {/* Pagination */}
          <Pagination
            page={currentPage}
            total={totalPage}
            onChange={(page) => setCurrentPage(page)}
            classNames={{
              base: "overflow-hidden",
              wrapper: "flex flex-wrap justify-center gap-1",
              item: "text-text-secondary data-[active=true]:text-primary-primary data-[active=true]:border data-[active=true]:border-primary-primary data-[active=true]:font-medium bg-backbround-secondary xs:text-xs md:text-sm",
              cursor: "rounded-md xs:text-xs md:text-sm w-8 h-8 text-primary-primary",
              forwardIcon: "text-primary-primary",
              ellipsis: "text-primary-primary",
              chevronNext: "text-primary-primary",
            }}
          />

          {/* Next */}
          <Button
            size="sm"
            variant="light"
            className="text-primary-primary font-semibold px-4 py-2 gap-0 xs:text-xs md:text-sm"
            onPress={() => setCurrentPage((prev) => (prev < totalPage ? prev + 1 : prev))}
            isDisabled={currentPage === totalPage}
          >
            <span className="xs:hidden md:block">Selanjutnya</span>
            <ArrowRight2 size={16} color="currentColor" className="ml-1" />
          </Button>
        </div>
      </section>
    </main>
  );
}

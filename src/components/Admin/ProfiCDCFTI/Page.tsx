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
import CardProfilCdcFti from "@/components/Card/CardProfilCDCFTI";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";
import RichTextDisplay from "@/components/Custom/RichTextDisplay";

// Types
import { ProfilCdcFtiItem } from "@/types/profilCdcFti";

// Services
import { searchProfilCdcFti, deleteProfilCdcFtiById } from "@/services/profilCdcFti";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { getRelativeTimeRaw } from "@/utils/time";
import { formatViews } from "@/utils/view";

export default function PageBerita() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sort, setSort] = useState<string>("");
  const [filters, setFilters] = useState<{ [key: string]: string | number }>({});

  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const [data, setData] = useState<ProfilCdcFtiItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [apiErrorData, setApiErrorData] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [amount, setAmount] = useState(8);

  const maxValue = data.length;
  const minValue = 1;
  const currentItems = data.slice((currentPage - 1) * amount, currentPage * amount);
  const totalPage = Math.ceil(maxValue / amount);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      setApiErrorData(null);

      try {
        const queryParams: Record<string, any> = {
          ...(searchKeyword && { search: searchKeyword }),
          ...(sort && { sort }),
          ...filters,
        };

        const { success, data, error } = await searchProfilCdcFti(queryParams);

        if (success) {
          setData(data || []);
        } else {
          setApiErrorData(error || "Terjadi kesalahan");
        }
      } catch (err: any) {
        setApiErrorData(err.message || "Terjadi kesalahan");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, [searchKeyword, sort, filters]);

  const selecItem = [{ key: "", label: "— Tidak dapat melakukan filter —" }];

  const sortOptions = [
    { key: "", label: "— Tidak diurutkan —" },
    { key: "profil_cdc_fti_updated_at:desc", label: "Terbaru Diubah" },
    { key: "profil_cdc_fti_updated_at:asc", label: "Terlama Diubah" },
    { key: "profil_cdc_fti_created_at:desc", label: "Terbaru Dibuat" },
    { key: "profil_cdc_fti_created_at:asc", label: "Terlama Dibuat" },
  ];

  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  // Ambil data dari props atau state
  const columns = [
    { key: "no", label: "#" },
    { key: "profil_cdc_fti_firstname", label: "Judul" },
    { key: "profil_cdc_fti_created_at", label: "Tanggal Dibuat" },
    { key: "actions", label: "Aksi" },
  ];

  // Format data jadi bentuk table-ready
  const tableItems = currentItems.map((data, index) => ({
    key: data.profil_cdc_fti_id,
    no: index + 1,
    profil_cdc_fti_firstname: <RichTextDisplay className="text-text-primary" html={data.profil_cdc_fti_firstname.length > 30 ? data.profil_cdc_fti_firstname.slice(0, 30) + "..." : data.profil_cdc_fti_firstname} />,
    profil_cdc_fti_created_at: getRelativeTimeRaw(data.profil_cdc_fti_created_at),
    actions: data, // kirim full job object untuk keperluan aksi
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
        <BreadcrumbItem href="/profil-cdc-fti">Profil CDC FTI</BreadcrumbItem>
      </Breadcrumbs>

      {/* Section Title */}
      <TitleSectionAdmin label="Profil CDC FTI" href="/profil-cdc-fti/tambah" />

      {/* Section Search, Filter & Sort */}
      <section className="flex xs:flex-col xs:justify-start xs:items-start md:flex-row md:justify-between md:items-center gap-2 border-b border-border-primary pb-4">
        {/* Search */}
        <Input
          startContent={<SearchNormal1 size={16} color="currentColor" className="text-text-secondary transition-colors  rounded-lg " />}
          label="Cari informasi"
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

      {/* Hasil */}
      <div className="flex flex-col gap-2">
        {(searchKeyword || Object.keys(filters).length > 0) && (
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary">
              Kata kunci <span className="text-primary-primary">{searchKeyword || "..."}</span>
            </span>
            <span className="text-xs text-text-secondary">
              Kami menemukan <span className="font-bold text-primary-primary">{data.length}</span> data
            </span>
          </div>
        )}
      </div>

      {/* Section Tampilan Card / Table */}
      {viewMode === "card" ? (
        <section className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoadingData ? (
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
          ) : apiErrorData ? (
            <p className="text-start text-xs text-danger-primary">{apiErrorData}</p>
          ) : currentItems.length === 0 ? (
            <div className="w-full col-span-full text-center py-8">
              <p className="text-sm text-gray-500">Data belum tersedia.</p>
            </div>
          ) : (
            currentItems.map((item) => <CardProfilCdcFti key={item.profil_cdc_fti_id} {...item} />)
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
                    const data = item.actions;
                    return (
                      <TableCell>
                        <div className="flex justify-center items-center gap-2">
                          <Tooltip content="Lihat detail" placement="top" className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                            <Button as={Link} isIconOnly variant="light" size="sm" href={`/profil-cdc-fti/${data.profil_cdc_fti_id}`}>
                              <Eye size={20} className="text-yellow-500" variant="Bold" color="currentColor" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Edit data" placement="top" className="bg-primary-primary text-white text-xs px-2 py-1 rounded">
                            <Button as={Link} isIconOnly variant="light" size="sm" href={`/profil-cdc-fti/edit/${data.profil_cdc_fti_id}`}>
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
                                  const result = await deleteProfilCdcFtiById(data.profil_cdc_fti_id);
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

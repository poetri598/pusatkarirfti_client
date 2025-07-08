"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { Camera } from "iconsax-react";

// Components
import { Breadcrumbs, BreadcrumbItem, Form, Input, Button, Select, SelectItem, Selection, Spinner } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";
import RichTextEditor from "@/components/Custom/RichTextEditor";

// Context
import { useAuth } from "@/context/AuthContext";

// Types
import { NewsTypeItem } from "@/types/newsType";
import { StatusItem } from "@/types/status";

// Services
import { getNewsBySlug, updateNewsById } from "@/services/news";
import { getNewsTypeAll } from "@/services/newsType";
import { getStatusAll } from "@/services/status";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { appendSingle } from "@/utils/formDataHelpers";

export default function page({ news_slug }: { news_slug: string }) {
  const router = useRouter();
  const { user } = useAuth();
  // newsTypes
  const [newsTypes, setNewsTypes] = useState<NewsTypeItem[]>([]);
  const [news_type_id, setNewsTypeId] = useState<Selection>(new Set([]));
  const [isLoadingNewsTypes, setIsLoadingNewsTypes] = useState(true);
  const [apiErrorNewsTypes, setApiErrorNewsTypes] = useState<string | null>(null);
  // statuses
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [status_id, setStatusId] = useState<Selection>(new Set([]));
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);
  const [apiErrorStatuses, setApiErrorStatuses] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [news_id, setNewsId] = useState<number>(0);
  const [news_img, setNewsImg] = useState<string>("/tambah-bg.png"); // preview
  const [news_img_file, setNewsImgFile] = useState<File | null>(null); // file asli
  const [news_name, setNewsName] = useState<string>("");
  const [news_desc, setNewsDesc] = useState<string>("");
  const [news_tags, setNewsTags] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getNewsTypeAll, setNewsTypes, setApiErrorNewsTypes, setIsLoadingNewsTypes), createServiceFetcher(getStatusAll, setStatuses, setApiErrorStatuses, setIsLoadingStatuses)];
      await Promise.all(fetchers.map((fetch) => fetch()));
      const { success, data, error } = await getNewsBySlug(news_slug);
      if (!success || !data) {
        await showErrorDialog(error || "Gagal mengambil data berita.");
        return;
      }
      setNewsId(data.news_id);
      setNewsName(data.news_name);
      if (data.news_img) setNewsImg(data.news_img);
      setNewsDesc(data.news_desc);
      setNewsTags(data.news_tags);
      setNewsTypeId(new Set([String(data.news_type_id)]));
      setStatusId(new Set([String(data.status_id)]));
      setLoading(false);
    };

    fetchAll();
  }, [news_slug]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      showErrorDialog("Ukuran gambar tidak boleh lebih dari 5MB.");
      return;
    }
    setNewsImgFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewsImg(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setUpdateLoading(true);
    const formData = new FormData();
    formData.append("news_name", news_name);
    if (news_img_file) formData.append("news_img", news_img_file);
    formData.append("news_desc", news_desc);
    formData.append("news_tags", news_tags);
    appendSingle(formData, "news_type_id", news_type_id);
    formData.append("user_id", String(user?.user_id));
    appendSingle(formData, "status_id", status_id);
    const { success, error } = await updateNewsById(news_id, formData);
    if (success) {
      setUpdateLoading(false);
      await showSuccessDialog();
      router.push("/berita");
    } else {
      await showErrorDialog(error);
    }
  };

  return (
    <>
      <>
        <main className="xs:p-0 md:p-8  flex flex-col xs:gap-2 md:gap-8 overflow-hidden">
          {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
              <Spinner
                label="Loading..."
                variant="wave"
                classNames={{
                  label: "text-primary-primary mt-4",
                  dots: "border-5 border-primary-primary",
                }}
              />
            </div>
          )}

          {updateLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
              <Spinner
                label="Loading..."
                variant="wave"
                classNames={{
                  label: "text-primary-primary mt-4",
                  dots: "border-5 border-primary-primary",
                }}
              />
            </div>
          )}
          {/*  Breadcrumb */}
          <Breadcrumbs
            className="text-xs text-text-secondary"
            itemClasses={{
              item: "data-[current=true]:text-primary-primary cursor-pointer text-xs",
            }}
          >
            <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
            <BreadcrumbItem href="/berita">Berita</BreadcrumbItem>
            <BreadcrumbItem href={`/berita/edit/${news_slug}`}>Ubah Data Berita</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Ubah data berita" />

          {/* Form */}
          <Form className="flex flex-col items-end gap-4" onSubmit={handleSubmit}>
            {/* news_img */}
            <div className="flex flex-col items-center gap-1 w-full">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md group aspect-square">
                <div className="w-full h-full rounded-medium border-2 border-dashed border-black overflow-hidden relative">
                  {news_img ? (
                    <img src={news_img} alt="Preview" className="w-full h-full object-contain rounded-medium" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm rounded-medium">Belum ada gambar</div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-medium transition">
                    <p className="text-white text-sm">{news_img ? "Ubah gambar" : "Pilih gambar"}</p>
                  </div>
                </div>

                <button onClick={handleIconClick} type="button" className="absolute bottom-0 right-0 bg-white p-2 rounded-medium shadow-md hover:scale-105 transition">
                  <Camera variant="Bold" color="currentColor" size={20} className="text-primary-primary" />
                </button>

                {/* Input tersembunyi */}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" name="news_img" />
              </div>

              {/* Keterangan maksimal ukuran */}
              <p className="text-[11px] text-gray-500 mt-1 text-center">
                Ukuran gambar maksimal <span className="font-semibold text-gray-600">5MB</span>
              </p>
            </div>

            {/* news_name  */}
            <Input
              isRequired
              label="Masukkan judul"
              labelPlacement="outside"
              name="news_name"
              value={news_name}
              onValueChange={setNewsName}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            {/* news_desc  */}
            <RichTextEditor key={news_desc} value={news_desc} onChange={setNewsDesc} placeholder="Tulis berita" />

            {/* news_tags  */}
            <Input
              label="Masukkan tagar misalkan #tag1, #tag2, #tag3 (opsional)"
              labelPlacement="outside"
              name="news_tags"
              value={news_tags}
              onValueChange={setNewsTags}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            {/* news_type_id */}
            {isLoadingNewsTypes ? (
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
            ) : apiErrorNewsTypes ? (
              <p className="text-start text-xs text-danger-primary">{apiErrorNewsTypes}</p>
            ) : (
              <Select
                isRequired
                label="Pilih tipe news"
                labelPlacement="outside"
                variant="bordered"
                name="news_type_id"
                selectedKeys={news_type_id}
                onSelectionChange={setNewsTypeId}
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

            {/* status_id */}
            {isLoadingStatuses ? (
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
            ) : apiErrorStatuses ? (
              <p className="text-start text-xs text-danger-primary">{apiErrorStatuses}</p>
            ) : (
              <Select
                isRequired
                label="Pilih status publikasi"
                labelPlacement="outside"
                variant="bordered"
                name="status_id"
                selectedKeys={status_id}
                onSelectionChange={setStatusId}
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
            <Button type="submit" className="login">
              Simpan Perubahan
            </Button>
          </Form>
        </main>
      </>
    </>
  );
}

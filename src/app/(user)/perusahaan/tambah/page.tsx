"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { Camera, Building, Link21 } from "iconsax-react";

// Components
import { Breadcrumbs, BreadcrumbItem, Form, Input, Button, Select, SelectItem, Selection, NumberInput, DatePicker, Avatar, Spinner, Textarea, Switch } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";
// Types
import { StatusItem } from "@/types/status";
import { IndustryItem } from "@/types/industry";

// Services
import { getIndustryAll } from "@/services/industry";
import { getStatusAll } from "@/services/status";
import { createCompany } from "@/services/company";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { appendSingle, appendMultiple } from "@/utils/formDataHelpers";

export default function page() {
  const router = useRouter();

  // statuses
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [status_id, setStatusId] = useState<Selection>(new Set(["1"]));
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);
  const [apiErrorStatuses, setApiErrorStatuses] = useState<string | null>(null);
  // industries
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [industry_ids, setIndustryIds] = useState<Selection>(new Set([]));
  const [isLoadingIndustries, setIsLoadingIndustries] = useState(true);
  const [apiErrorIndustries, setApiErrorIndustries] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getStatusAll, setStatuses, setApiErrorStatuses, setIsLoadingStatuses), createServiceFetcher(getIndustryAll, setIndustries, setApiErrorIndustries, setIsLoadingIndustries)];

      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  // Image
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [company_img, setTrainingImg] = useState<string>("/tambah-bg.png"); // preview
  const [company_img_file, setTrainingImgFile] = useState<File | null>(null); // file asli
  const [company_name, setCompanyName] = useState<string>("");
  const [company_desc, setCompanyDesc] = useState<string>("");
  const [company_link, setCompanyLink] = useState<string>("");
  const [company_is_partner, setCompanyIsPartner] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      showErrorDialog("Ukuran gambar tidak boleh lebih dari 5MB.");
      return;
    }
    setTrainingImgFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setTrainingImg(reader.result as string);
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
    setLoading(true);
    const formData = new FormData();
    formData.append("company_name", company_name);
    if (company_img_file) formData.append("company_img", company_img_file);
    formData.append("company_desc", company_desc);
    formData.append("company_link", company_link);
    formData.append("company_is_partner", String(Number(company_is_partner)));
    appendSingle(formData, "status_id", status_id);
    appendMultiple(formData, "industry_ids", industry_ids);
    const { success, error } = await createCompany(formData);
    if (success) {
      await showSuccessDialog();
      router.push("/perusahaan");
    } else {
      await showErrorDialog(error);
    }
    setLoading(false);
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
          {/*  Breadcrumb */}
          <Breadcrumbs
            className="text-xs text-text-secondary"
            itemClasses={{
              item: "data-[current=true]:text-primary-primary cursor-pointer text-xs",
            }}
          >
            <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
            <BreadcrumbItem href="/perusahaan">Perusahaan</BreadcrumbItem>
            <BreadcrumbItem href="/perusahaan/tambah">Tambah Perusahaan</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Tambah Perusahaan" />

          {/* Form */}
          <Form className="flex flex-col items-end gap-4" onSubmit={handleSubmit}>
            {/* company_img */}
            <div className="flex flex-col items-center gap-1 w-full">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md group aspect-square">
                <div className="w-full h-full rounded-medium border-2 border-dashed border-black overflow-hidden relative">
                  {company_img ? (
                    <img src={company_img} alt="Preview" className="w-full h-full object-contain rounded-medium" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm rounded-medium">Belum ada gambar</div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-medium transition">
                    <p className="text-white text-sm">{company_img ? "Ubah gambar" : "Pilih gambar"}</p>
                  </div>
                </div>

                <button onClick={handleIconClick} type="button" className="absolute bottom-0 right-0 bg-white p-2 rounded-medium shadow-md hover:scale-105 transition">
                  <Camera variant="Bold" color="currentColor" size={20} className="text-primary-primary" />
                </button>

                {/* Input tersembunyi */}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" name="company_img" />
              </div>

              {/* Keterangan maksimal ukuran */}
              <p className="text-[11px] text-gray-500 mt-1 text-center">
                Ukuran gambar maksimal <span className="font-semibold text-gray-600">5MB</span>
              </p>
            </div>

            {/* company_name  */}
            <Input
              isRequired
              label="Masukkan nama perusahaan"
              labelPlacement="outside"
              name="company_name"
              value={company_name}
              onValueChange={setCompanyName}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            {/* company desc  */}
            <Textarea
              isRequired
              label="Deskripsi singkat perusahaan"
              labelPlacement="outside"
              name="company_desc"
              value={company_desc}
              onValueChange={setCompanyDesc}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            {/* company_link */}
            <Input
              isRequired
              label="Masukkan link perusahaan"
              labelPlacement="outside"
              name="company_link"
              value={company_link}
              onValueChange={setCompanyLink}
              type="text"
              variant="bordered"
              startContent={<Link21 size={20} variant="Bold" color="currentColor" className="text-primary-primary" />}
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            <div className="flex items-center gap-1 w-full">
              {" "}
              <Switch isSelected={company_is_partner} onValueChange={setCompanyIsPartner} classNames={{ thumb: "bg-primary-primary", label: "text-xs" }}>
                {company_is_partner ? "Partnertship" : "Non-Partnertship"}
              </Switch>
            </div>

            {/* industry_ids */}
            {isLoadingIndustries ? (
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
            ) : apiErrorIndustries ? (
              <p className="text-start text-xs text-danger-primary">{apiErrorIndustries}</p>
            ) : (
              <Select
                isRequired
                label="Pilih industri perusahaan"
                labelPlacement="outside"
                variant="bordered"
                name="industry_ids"
                selectionMode="multiple"
                selectedKeys={industry_ids}
                onSelectionChange={setIndustryIds}
                classNames={{
                  label: "after:text-danger-primary text-xs text-text-secondary",
                  trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                  value: "text-xs",
                  errorMessage: "text-danger-primary text-xs",
                }}
              >
                {industries.length === 0 ? (
                  <SelectItem key="nodata" isDisabled>
                    Data belum tersedia
                  </SelectItem>
                ) : (
                  industries.map((item) => (
                    <SelectItem
                      key={item.industry_id}
                      classNames={{
                        title: "text-xs hover:!text-primary-primary",
                        selectedIcon: "text-primary-primary",
                      }}
                    >
                      {item.industry_name}
                    </SelectItem>
                  ))
                )}
              </Select>
            )}

            {/* Status */}
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
                  base: "hidden",
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
              Simpan
            </Button>
          </Form>
        </main>
      </>
    </>
  );
}

"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { Camera, Building, Link21 } from "iconsax-react";

// Components
import { Breadcrumbs, BreadcrumbItem, Form, Input, Button, Select, SelectItem, Selection, NumberInput, DatePicker, Avatar, Spinner, Textarea, Switch } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Services
import { getPlatformById, updatePlatformById } from "@/services/platform";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function page({ platform_id }: { platform_id: number }) {
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      const { success, data, error } = await getPlatformById(platform_id);
      if (success && data) {
        if (data.platform_img) setTrainingImg(data.platform_img);
        setPlatformName(data.platform_name);
      }
      setLoading(false);
    };

    fetchAll();
  }, [platform_id]);

  // Image
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [platform_img, setTrainingImg] = useState<string>("/tambah-bg.png"); // preview
  const [platform_img_file, setTrainingImgFile] = useState<File | null>(null); // file asli
  const [platform_name, setPlatformName] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

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
    setUpdateLoading(true);
    const formData = new FormData();
    formData.append("platform_name", platform_name);
    if (platform_img_file) formData.append("platform_img", platform_img_file);
    const { success, error } = await updatePlatformById(platform_id, formData);
    if (success) {
      await showSuccessDialog();
      router.push("/platform");
    } else {
      await showErrorDialog(error);
    }
    setUpdateLoading(false);
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
            <BreadcrumbItem href="/platform">Platform</BreadcrumbItem>
            <BreadcrumbItem href={`/platform/edit/${platform_id}`}>Ubah Data Platform</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Ubah Data Platform" />

          {/* Form */}
          <Form className="flex flex-col items-end gap-4" onSubmit={handleSubmit}>
            {/* platform_img */}
            <div className="flex flex-col items-center gap-1 w-full">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md group aspect-square">
                <div className="w-full h-full rounded-medium border-2 border-dashed border-black overflow-hidden relative">
                  {platform_img ? (
                    <img src={platform_img} alt="Preview" className="w-full h-full object-contain rounded-medium" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm rounded-medium">Belum ada gambar</div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-medium transition">
                    <p className="text-white text-sm">{platform_img ? "Ubah gambar" : "Pilih gambar"}</p>
                  </div>
                </div>

                <button onClick={handleIconClick} type="button" className="absolute bottom-0 right-0 bg-white p-2 rounded-medium shadow-md hover:scale-105 transition">
                  <Camera variant="Bold" color="currentColor" size={20} className="text-primary-primary" />
                </button>

                {/* Input tersembunyi */}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" name="platform_img" />
              </div>

              {/* Keterangan maksimal ukuran */}
              <p className="text-[11px] text-gray-500 mt-1 text-center">
                Ukuran gambar maksimal <span className="font-semibold text-gray-600">5MB</span>
              </p>
            </div>

            {/* platform_name  */}
            <Input
              isRequired
              label="Masukkan nama platform"
              labelPlacement="outside"
              name="platform_name"
              value={platform_name}
              onValueChange={setPlatformName}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            <Button type="submit" className="login">
              Simpan Perubahan
            </Button>
          </Form>
        </main>
      </>
    </>
  );
}

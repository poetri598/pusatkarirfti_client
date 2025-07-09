"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Components
import { Breadcrumbs, BreadcrumbItem, Form, Button, Spinner, Input } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Services
import { getCityById, updateCityById } from "@/services/city";

export default function Edit({ city_id }: { city_id: number }) {
  const router = useRouter();
  const [city_name, setCityName] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      const { success, data, error } = await getCityById(city_id);
      setCityName(data?.city_name || "");
      if (!success || !data) {
        await showErrorDialog(error || "Gagal mengambil data profil");
        return;
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city_id) {
      await showErrorDialog("Data ID tidak ditemukan.");
      return;
    }
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setUpdateLoading(true);
    const formData = new FormData();
    formData.append("city_name", city_name);
    const { success, error } = await updateCityById(city_id, formData);
    if (success) {
      await showSuccessDialog();
      router.push("/kota");
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
            <BreadcrumbItem href="/umur">Umur</BreadcrumbItem>
            <BreadcrumbItem href={`/umur/edit/${city_id}`}>Ubah Data Umur</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Ubah Data Umur" />

          <Form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 ">
            {/* Nama Lengkap  */}
            <Input
              isRequired
              label="Masukkan nama kota"
              labelPlacement="outside"
              name="city_name"
              value={city_name}
              onValueChange={setCityName}
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            <div className="w-full flex flex-col items-end gap-2">
              <Button type="submit" className="login">
                Simpan Perubahan
              </Button>
            </div>
          </Form>
        </main>
      </>
    </>
  );
}

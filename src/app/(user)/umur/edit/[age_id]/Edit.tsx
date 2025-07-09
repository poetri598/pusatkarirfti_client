"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Components
import { Breadcrumbs, BreadcrumbItem, Form, Button, Spinner, NumberInput } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Services
import { getAgeById, updateAgeById } from "@/services/age";

export default function Edit({ age_id }: { age_id: number }) {
  const router = useRouter();
  const [age_no, setAgeNo] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      const { success, data, error } = await getAgeById(age_id);
      setAgeNo(data?.age_no || 0);
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
    if (!age_id) {
      await showErrorDialog("Data ID tidak ditemukan.");
      return;
    }
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setUpdateLoading(true);
    const formData = new FormData();
    formData.append("age_no", String(age_no));
    const { success, error } = await updateAgeById(age_id, formData);
    if (success) {
      await showSuccessDialog();
      router.push("/umur");
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
            <BreadcrumbItem href={`/umur/edit/${age_id}`}>Ubah Data Umur</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Ubah Data Umur" />

          <Form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 ">
            {/* Nama Lengkap  */}
            <NumberInput
              isRequired
              label="Masukkan nomor umur"
              labelPlacement="outside"
              name="age_no"
              value={age_no}
              onValueChange={setAgeNo}
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

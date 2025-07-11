"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Components
import { Breadcrumbs, BreadcrumbItem, Form, Button, Spinner, Input, Textarea } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Services
import { getExperienceById, updateExperienceById } from "@/services/experience";

export default function Edit({ experience_id }: { experience_id: number }) {
  const router = useRouter();
  const [experience_name, setExperienceName] = useState("");
  const [experience_desc, setExperienceDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      const { success, data, error } = await getExperienceById(experience_id);
      setExperienceName(data?.experience_name || "");
      setExperienceDesc(data?.experience_desc || "");
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
    if (!experience_id) {
      await showErrorDialog("Data ID tidak ditemukan.");
      return;
    }
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setUpdateLoading(true);
    const formData = new FormData();
    formData.append("experience_name", experience_name);
    formData.append("experience_desc", experience_desc);
    const { success, error } = await updateExperienceById(experience_id, formData);
    if (success) {
      await showSuccessDialog();
      router.push("/pengalaman");
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
            <BreadcrumbItem href="/pengalaman">Pengalaman</BreadcrumbItem>
            <BreadcrumbItem href={`/pengalaman/edit/${experience_id}`}>Ubah Data Pengalaman</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Ubah Data Pengalaman" />

          <Form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 ">
            <Input
              isRequired
              label="Masukkan nama pengalaman"
              labelPlacement="outside"
              name="experience_name"
              value={experience_name}
              onValueChange={setExperienceName}
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />
            {/* experience_desc  */}
            <Textarea
              isRequired
              label="Masukkan deskripsi pengalaman"
              labelPlacement="outside"
              name="experience_desc"
              value={experience_desc}
              onValueChange={setExperienceDesc}
              type="text"
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

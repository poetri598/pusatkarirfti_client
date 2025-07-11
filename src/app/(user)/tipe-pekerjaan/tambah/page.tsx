"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import { Breadcrumbs, BreadcrumbItem, Form, Button, Spinner, Input } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Services
import { createJobType } from "@/services/jobType";

export default function page() {
  const router = useRouter();
  const [job_type_name, setJobTypeName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("job_type_name", job_type_name);
    const { success, error } = await createJobType(formData);
    if (success) {
      await showSuccessDialog();
      router.push("/tipe-pekerjaan");
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
            <BreadcrumbItem href="/tipe-pekerjaan">Tipe Pekerjaan</BreadcrumbItem>
            <BreadcrumbItem href="/tipe-pekerjaan/tambah">Tambah Tipe Pekerjaan</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Tambah Tipe Pekerjaan" />

          <Form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 ">
            <Input
              isRequired
              label="Masukkan nama tipe pekerjaan"
              labelPlacement="outside"
              name="job_type_name"
              value={job_type_name}
              onValueChange={setJobTypeName}
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
                Simpan
              </Button>
            </div>
          </Form>
        </main>
      </>
    </>
  );
}

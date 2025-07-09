"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Components
import { Breadcrumbs, BreadcrumbItem, Form, Button, Spinner, NumberInput } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Services
import { createAge } from "@/services/age";

export default function page() {
  const router = useRouter();
  const [age_no, setAge_no] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("age_no", String(age_no));
    const { success, error } = await createAge(formData);
    if (success) {
      await showSuccessDialog();
      router.push("/umur");
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
            <BreadcrumbItem href="/umur">Umur</BreadcrumbItem>
            <BreadcrumbItem href="/umur/tambah">Tambah Umur</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Tambah Umur" />

          <Form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 ">
            <NumberInput
              isRequired
              label="Masukkan nomor umur"
              labelPlacement="outside"
              name="age_no"
              value={age_no}
              minValue={0}
              onValueChange={setAge_no}
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

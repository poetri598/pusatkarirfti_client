"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import { Breadcrumbs, BreadcrumbItem, Form, Button, Spinner, NumberInput } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Services
import { createWeight } from "@/services/weight";

export default function page() {
  const router = useRouter();
  const [weight_no, setweight_no] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("weight_no", String(weight_no));
    const { success, error } = await createWeight(formData);
    if (success) {
      await showSuccessDialog();
      router.push("/berat-badan");
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
            <BreadcrumbItem href="/berat-badan">Berat Badan</BreadcrumbItem>
            <BreadcrumbItem href="/berat-badan/tambah">Tambah Berat Badan</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Tambah Berat Badan" />

          <Form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 ">
            <NumberInput
              isRequired
              label="Masukkan nomor berat badan"
              labelPlacement="outside"
              name="weight_no"
              value={weight_no}
              minValue={0}
              onValueChange={setweight_no}
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

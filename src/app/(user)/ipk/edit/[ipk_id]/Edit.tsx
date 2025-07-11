"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Components
import { Breadcrumbs, BreadcrumbItem, Form, Button, Spinner, NumberInput } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Services
import { getIpkById, updateIpkById } from "@/services/ipk";

export default function Edit({ ipk_id }: { ipk_id: number }) {
  const router = useRouter();
  const [ipk_no, setIpkNo] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      const { success, data, error } = await getIpkById(ipk_id);
      setIpkNo(data?.ipk_no || 0);
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
    if (!ipk_id) {
      await showErrorDialog("Data ID tidak ditemukan.");
      return;
    }
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setUpdateLoading(true);
    const formData = new FormData();
    formData.append("ipk_no", String(ipk_no));
    const { success, error } = await updateIpkById(ipk_id, formData);
    if (success) {
      await showSuccessDialog();
      router.push("/ipk");
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
            <BreadcrumbItem href="/ipk">Ipk</BreadcrumbItem>
            <BreadcrumbItem href={`/ipk/edit/${ipk_id}`}>Ubah Data Ipk</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Ubah Data Ipk" />

          <Form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 ">
            <NumberInput
              isRequired
              label="Masukkan nomor Ipk"
              labelPlacement="outside"
              name="ipk_no"
              value={ipk_no}
              onValueChange={setIpkNo}
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

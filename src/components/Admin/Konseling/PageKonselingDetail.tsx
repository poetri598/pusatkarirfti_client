"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Components
import { Breadcrumbs, BreadcrumbItem, Input, Spinner, DatePicker, Form, Textarea, Button } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { CounselingItem } from "@/types/counseling";

// Services
import { getCounselingById, updateCounselingIsReadById, updateCounselingStatusById } from "@/services/counseling";

// Utils
import { ZonedDateTime, parseAbsoluteToLocal } from "@internationalized/date";

export default function PageKonselingDetail({ counseling_id }: { counseling_id: number }) {
  const router = useRouter();
  const [counseling, setCounseling] = useState<CounselingItem | null>(null);
  const [counseling_date, setCounselingDate] = useState<ZonedDateTime | null>(null);

  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      try {
        await updateCounselingIsReadById(counseling_id);
        const { success, data, error } = await getCounselingById(counseling_id);
        if (success && data) {
          setCounseling(data);
          if (data.counseling_date) setCounselingDate(parseAbsoluteToLocal(data.counseling_date));
        } else {
          console.error("Gagal mendapatkan data:", error);
        }
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
      setLoading(false);
    };
    fetchAll();
    router.refresh();
  }, [counseling_id]);

  const handleApprove = async () => {
    const confirmed = await showConfirmationDialog();
    if (!confirmed) return;
    setUpdateLoading(true);
    try {
      const { success, error } = await updateCounselingStatusById(counseling_id);
      if (success) {
        await showSuccessDialog();
      } else {
        await showErrorDialog(error);
      }
    } catch (err) {
      await showErrorDialog("Terjadi kesalahan saat menyetujui konseling.");
    }
    router.push("/konseling");
    setUpdateLoading(false);
  };

  if (loading)
    return (
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
    );

  if (!counseling) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
        <p>Data tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <>
      <>
        <main className="xs:p-0 md:p-8  flex flex-col xs:gap-2 md:gap-8 overflow-hidden">
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
          {/* Breadcrumb */}
          <Breadcrumbs
            itemClasses={{
              item: "data-[current=true]:text-primary-primary text-xs",
            }}
          >
            <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
            <BreadcrumbItem href="/konseling">Konseling</BreadcrumbItem>
            <BreadcrumbItem href={`/konseling/${counseling_id}`}>Detail Counseling</BreadcrumbItem>
          </Breadcrumbs>

          <TitleSectionAdmin label="Detail Counseling" />

          <Form className="flex flex-col gap-8 w-full ">
            <div className="flex flex-col gap-2 w-full">
              <div className="grid xs:grid-cols-1 md:grid-cols-2 xs:gap-2 md:gap-8 overflow-hidden">
                {/* Nama Lengkap  */}
                <Input
                  isReadOnly
                  isRequired
                  label="Nama Lengkap"
                  labelPlacement="outside"
                  name="user_fullname"
                  value={counseling.user_fullname}
                  type="text"
                  variant="bordered"
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    input: "focus:!border-primary-primary text-xs ",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  }}
                />

                {/* Nomor HP  */}
                <Input
                  isReadOnly
                  isRequired
                  label="Nomor HP"
                  labelPlacement="outside"
                  type="text"
                  name="user_phone"
                  value={counseling.user_phone}
                  variant="bordered"
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    input: "focus:!border-primary-primary text-xs ",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  }}
                />
                {/* Nim  */}
                <Input
                  isReadOnly
                  isRequired
                  label="NIM"
                  labelPlacement="outside"
                  name="user_nim"
                  value={counseling.user_nim}
                  type="text"
                  variant="bordered"
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    input: "focus:!border-primary-primary text-xs uppercase",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  }}
                />

                {/* Counseling Type  */}
                <Input
                  isReadOnly
                  isRequired
                  label="NIM"
                  labelPlacement="outside"
                  name="counseling_type_name"
                  value={counseling.counseling_type_name}
                  type="text"
                  variant="bordered"
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    input: "focus:!border-primary-primary text-xs uppercase",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  }}
                />

                {/* Program Study name  */}
                <Input
                  isReadOnly
                  isRequired
                  label="Program Studi"
                  labelPlacement="outside"
                  name="program_study_name"
                  value={counseling.program_study_name}
                  type="text"
                  variant="bordered"
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    input: "focus:!border-primary-primary text-xs uppercase",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  }}
                />

                {/* Tanggal Konseling */}
                <DatePicker
                  isReadOnly
                  hideTimeZone
                  name="counseling_date"
                  showMonthAndYearPickers
                  value={counseling_date}
                  onChange={setCounselingDate}
                  label="Jadwal Konseling"
                  labelPlacement="outside"
                  variant="bordered"
                  classNames={{
                    label: "after:text-danger-primary text-xs",
                    selectorIcon: "text-primary-primary",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary focus:!border-primary-primary",
                    errorMessage: "text-danger-primary",
                    calendarContent: "bg-primary-primary text-xs text-white",
                    segment: "text-xs ",
                  }}
                />
              </div>
              {/* Counseling Desc */}
              <Textarea
                isRequired
                label="Beri tahu kami secara singkat mengenai konseling anda"
                labelPlacement="outside"
                name="counseling_desc"
                value={counseling.counseling_desc}
                type="text"
                variant="bordered"
                classNames={{
                  label: "after:text-danger-primary text-xs text-text-secondary",
                  input: "focus:!border-primary-primary text-xs ",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  errorMessage: "text-danger-primary text-xs",
                }}
              />
            </div>
            <div className="w-full flex justify-end ">
              {" "}
              <Button className="login" onPress={handleApprove}>
                Setujui
              </Button>
            </div>
          </Form>
        </main>
      </>
    </>
  );
}

"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { createFetcher } from "@/utils/createFetcher";
import { useRouter } from "next/navigation";

// Iconsax
import { Profile } from "iconsax-react";

// Components
import { Breadcrumbs, BreadcrumbItem, Input, Selection, Select, SelectItem, Button, Spinner, DatePicker, Form, Textarea } from "@heroui/react";
import { ZonedDateTime, now, getLocalTimeZone } from "@internationalized/date";
import { showConfirmationDialog, showErrorDialog, showSuccessDialog } from "@/components/Custom/AlertButton";

// Context
import { useAuth } from "@/context/AuthContext";

// Types
import { ProgramStudyItem } from "@/types/programStudy";
import { CounselingTypeItem } from "@/types/counselingType";
import { StatusItem } from "@/types/status";

// Services
import { getProgramStudyAll } from "@/services/programStudy";
import { getCounselingTypeAll } from "@/services/counselingType";
import { getStatusAll } from "@/services/status";
import { createCounseling } from "@/services/counseling";

// Utils
import { appendSingle } from "@/utils/formDataHelpers";
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function Counseling1On1() {
  const { user } = useAuth();
  const router = useRouter();
  // Program Study
  const [programStudies, setProgramStudies] = useState<ProgramStudyItem[]>([]);
  const [program_study_id, setProgramStudyId] = useState<Selection>(new Set([]));
  const [isLoadingProgramStudies, setIsLoadingProgramStudies] = useState(true);
  const [apiErrorProgramStudies, setApiErrorProgramStudies] = useState<string | null>(null);
  // Counseling Type
  const [counselingTypes, setCounselingTypes] = useState<CounselingTypeItem[]>([]);
  const [counseling_type_id, setCounselingTypeId] = useState<Selection>(new Set(["1"]));
  const [isLoadingCounselingTypes, setIsLoadingCounselingTypes] = useState(true);
  const [apiErrorCounselingTypes, setApiErrorCounselingTypes] = useState<string | null>(null);
  // Statuses
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [status_id, setStatusId] = useState<Selection>(new Set(["2"]));
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);
  const [apiErrorStatuses, setApiErrorStatuses] = useState<string | null>(null);

  const user_fullname = user?.user_fullname || "";
  const user_phone = user?.user_phone || "";
  const user_nim = user?.user_nim || "";
  const [counseling_date, setCounselingDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [counseling_desc, setCounselingDesc] = useState("");
  const [counseling_is_read, setCounselingIsRead] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.program_study_id) setProgramStudyId(new Set([String(user.program_study_id)]));
  }, [user?.program_study_id]);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [
        createServiceFetcher(getCounselingTypeAll, setCounselingTypes, setApiErrorCounselingTypes, setIsLoadingCounselingTypes),
        createServiceFetcher(getStatusAll, setStatuses, setApiErrorStatuses, setIsLoadingStatuses),
        createServiceFetcher(getProgramStudyAll, setProgramStudies, setApiErrorProgramStudies, setIsLoadingProgramStudies),
      ];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("user_id", String(user?.user_id));
    if (counseling_date) formData.append("counseling_date", counseling_date.toAbsoluteString());
    formData.append("counseling_desc", counseling_desc);
    formData.append("counseling_is_read", String(Number(counseling_is_read)));
    appendSingle(formData, "counseling_type_id", counseling_type_id);
    appendSingle(formData, "status_id", status_id);
    const { success, error } = await createCounseling(formData);
    if (success) {
      await showSuccessDialog();
      router.push("/konseling");
    } else {
      await showErrorDialog(error);
    }
    setLoading(false);
  };

  return (
    <>
      <>
        <main className="xs:w-11/12 lg:w-10/12 bg-background-primary mx-auto flex flex-col py-8 gap-8">
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
          {/* Breadcrumb */}
          <Breadcrumbs
            itemClasses={{
              item: "data-[current=true]:text-primary-primary text-xs",
            }}
          >
            <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
            <BreadcrumbItem href="/konseling">Konseling</BreadcrumbItem>
            <BreadcrumbItem href="/konseling/counseling-1on1">Counseling 1 On 1</BreadcrumbItem>
          </Breadcrumbs>
          <Form onSubmit={handleSubmit} className="flex flex-col bg-background-primary rounded-md xs:shadow-none md:shadow-lg gap-8 xs:p-0 md:p-8">
            <div className="flex flex-col gap-2">
              {" "}
              <div className="flex items-center gap-2">
                <p className="xs:text-base md:text-4xl text-primary-primary font-bold">Counseling 1 On 1</p>
                <Profile size={8} color="currentColor" variant="Bulk" className="text-primary-primary xs:w-8 xs:h-8" />
              </div>
              <p className="text-xs text-text-primary">
                Diskusikan masalah karier Anda dengan konselor profesional dari Pusat Karir Fakultas Teknologi Informasi Universitas Sebelas April! Layanan konseling karier satu-satu ini memungkinkan Anda untuk membicarakan wawancara kerja,
                konflik di kantor, atau persiapan lainnya di dunia kerja.
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <p className="xs:text-sm md:text-2xl font-bold text-primary-primary">Periksa data diri anda</p>
              <div className="grid xs:grid-cols-1 md:grid-cols-2 xs:gap-2 md:gap-8 overflow-hidden">
                {/* Nama Lengkap  */}
                <Input
                  isReadOnly
                  isRequired
                  label="Masukkan nama lengkap anda"
                  labelPlacement="outside"
                  name="user_fullname"
                  value={user_fullname}
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
                  label="Masukkan nomor hp anda"
                  labelPlacement="outside"
                  type="text"
                  name="user_phone"
                  value={user_phone}
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
                  label="Masukkan NIM anda"
                  labelPlacement="outside"
                  name="user_nim"
                  value={user_nim}
                  type="text"
                  variant="bordered"
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    input: "focus:!border-primary-primary text-xs uppercase",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  }}
                />

                {/* Program Study */}
                {isLoadingProgramStudies ? (
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
                ) : apiErrorProgramStudies ? (
                  <p className="text-start text-xs text-danger-primary">{apiErrorProgramStudies}</p>
                ) : (
                  <Select
                    isDisabled
                    isRequired
                    label="Pilih program study anda"
                    labelPlacement="outside"
                    variant="bordered"
                    name="program_study_id"
                    selectedKeys={program_study_id}
                    onSelectionChange={setProgramStudyId}
                    classNames={{
                      label: "after:text-danger-primary text-xs text-text-secondary",
                      trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                      value: "text-xs",
                      errorMessage: "text-danger-primary text-xs",
                    }}
                  >
                    {programStudies.length === 0 ? (
                      <SelectItem key="nodata" isDisabled>
                        Data belum tersedia
                      </SelectItem>
                    ) : (
                      programStudies.map((item) => (
                        <SelectItem
                          key={item.program_study_id}
                          classNames={{
                            title: "text-xs hover:!text-primary-primary",
                            selectedIcon: "text-primary-primary",
                          }}
                        >
                          {item.program_study_name}
                        </SelectItem>
                      ))
                    )}
                  </Select>
                )}

                {/* Counseling Type */}
                {isLoadingCounselingTypes ? (
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
                ) : apiErrorCounselingTypes ? (
                  <p className="text-start text-xs text-danger-primary">{apiErrorCounselingTypes}</p>
                ) : (
                  <Select
                    isDisabled
                    isRequired
                    label="Pilih jenis konseling yang ingin anda dilakukan"
                    labelPlacement="outside"
                    variant="bordered"
                    name="counseling_type_id"
                    selectedKeys={counseling_type_id}
                    onSelectionChange={setCounselingTypeId}
                    classNames={{
                      label: "after:text-danger-primary text-xs text-text-secondary",
                      trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                      value: "text-xs",
                      errorMessage: "text-danger-primary text-xs",
                    }}
                  >
                    {counselingTypes.length === 0 ? (
                      <SelectItem key="nodata" isDisabled>
                        Data belum tersedia
                      </SelectItem>
                    ) : (
                      counselingTypes.map((item) => (
                        <SelectItem
                          key={item.counseling_type_id}
                          classNames={{
                            title: "text-xs hover:!text-primary-primary",
                            selectedIcon: "text-primary-primary",
                          }}
                        >
                          {item.counseling_type_name}
                        </SelectItem>
                      ))
                    )}
                  </Select>
                )}

                {/* Tanggal Konseling */}
                <DatePicker
                  isRequired
                  hideTimeZone
                  name="counseling_date"
                  showMonthAndYearPickers
                  value={counseling_date}
                  onChange={setCounselingDate}
                  label="Pilih waktu konseling anda"
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
                value={counseling_desc}
                onValueChange={setCounselingDesc}
                type="text"
                variant="bordered"
                classNames={{
                  label: "after:text-danger-primary text-xs text-text-secondary",
                  input: "focus:!border-primary-primary text-xs ",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  errorMessage: "text-danger-primary text-xs",
                }}
              />

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
            </div>

            <div className="flex xs:flex-col xs:items-start md:flex-row md:justify-between md:items-center gap-8">
              <p className="text-xs text-text-tertiary rounded-lg border border-border-main bg-gray-50 p-2">
                Catatan : Selanjutnya, Anda akan dihubungi oleh admin untuk menjadwalkan sesi dengan konselor karier. Anda dapat berkonsultasi melalui telepon, obrolan WhatsApp, atau pertemuan Zoom. Sampai jumpa!
              </p>
              <div className="flex justify-end xs:w-full md:w-auto">
                <Button type="submit" className="login" isDisabled={!user || !user.user_id}>
                  Kirim
                </Button>
              </div>
            </div>
          </Form>
        </main>
      </>
    </>
  );
}

"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Breadcrumbs, BreadcrumbItem, Form, Button, Select, SelectItem, Selection, DatePicker, Avatar, Spinner, Textarea } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { ZonedDateTime, now, getLocalTimeZone } from "@internationalized/date";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { CounselingTypeItem } from "@/types/counselingType";
import { StatusItem } from "@/types/status";
import { UserItem } from "@/types/user";

// Services
import { getCounselingTypeAll } from "@/services/counselingType";
import { getUserAll } from "@/services/user";
import { getStatusAll } from "@/services/status";
import { createCounseling } from "@/services/counseling";

// Utils
import { appendSingle } from "@/utils/formDataHelpers";
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function page() {
  const router = useRouter();
  // counseling Type
  const [counselingTypes, setCounselingTypes] = useState<CounselingTypeItem[]>([]);
  const [counseling_type_id, setCounselingTypeId] = useState<Selection>(new Set(["1"]));
  const [isLoadingCounselingTypes, setIsLoadingCounselingTypes] = useState(true);
  const [apiErrorCounselingTypes, setApiErrorCounselingTypes] = useState<string | null>(null);
  // users
  const [users, setUsers] = useState<UserItem[]>([]);
  const [user_id, setUserId] = useState<Selection>(new Set([]));
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [apiErrorUsers, setApiErrorUsers] = useState<string | null>(null);
  // statuses
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [status_id, setStatusId] = useState<Selection>(new Set(["2"]));
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);
  const [apiErrorStatuses, setApiErrorStatuses] = useState<string | null>(null);

  const [counseling_desc, setCounselingDesc] = useState<string>("");
  const [counseling_date, setCounselingDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [counseling_is_read, setCounselingIsRead] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [
        createServiceFetcher(getCounselingTypeAll, setCounselingTypes, setApiErrorCounselingTypes, setIsLoadingCounselingTypes),
        createServiceFetcher(getStatusAll, setStatuses, setApiErrorStatuses, setIsLoadingStatuses),
        createServiceFetcher(getUserAll, setUsers, setApiErrorUsers, setIsLoadingUsers),
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
    if (counseling_date) formData.append("counseling_date", counseling_date.toAbsoluteString());
    formData.append("counseling_desc", counseling_desc);
    formData.append("counseling_is_read", String(Number(counseling_is_read)));
    appendSingle(formData, "user_id", user_id);
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
        <main className="xs:p-0 md:p-8  flex flex-col xs:gap-2 md:gap-8 overflow-hidden">
          {/*  Breadcrumb */}
          <Breadcrumbs
            className="text-xs text-text-secondary"
            itemClasses={{
              item: "data-[current=true]:text-primary-primary cursor-pointer text-xs",
            }}
          >
            <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
            <BreadcrumbItem href="/konseling">Konseling</BreadcrumbItem>
            <BreadcrumbItem href="/konseling/tambah">Tambah Konseling</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Tambah Konseling" />

          {/* Form */}
          <Form className="flex flex-col items-end xs:gap-2 md:gap-8" onSubmit={handleSubmit}>
            {/* user_id */}
            {isLoadingUsers ? (
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
            ) : apiErrorUsers ? (
              <p className="text-start text-xs text-danger-primary">{apiErrorUsers}</p>
            ) : users.length === 0 ? (
              <p className="text-start text-xs text-text-secondary">Data belum tersedia</p>
            ) : (
              <Select
                isRequired
                isMultiline={true}
                items={users}
                label="Pilih nama peserta"
                labelPlacement="outside"
                variant="bordered"
                name="user_id"
                renderValue={(items) => (
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <div key={item.data?.user_id} className="flex items-center gap-2">
                        <Avatar alt={item.data?.user_fullname} className="w-6 h-6" src={item.data?.user_img} classNames={{ img: "object-contain bg-background-primary" }} />
                        <div className="flex flex-col">
                          <span className="text-xs">{item.data?.user_fullname}</span>
                          <div>
                            <span className="text-xs text-text-secondary">{item.data?.program_study_name}</span> | <span className="text-xs text-text-secondary">{item.data?.user_nim}</span> |{" "}
                            <span className="text-xs text-text-secondary">{item.data?.user_phone}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                selectedKeys={user_id}
                onSelectionChange={setUserId}
                classNames={{
                  label: "after:text-danger-primary text-xs",
                  trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                  value: "text-xs",
                  errorMessage: "text-danger-primary",
                }}
              >
                {(user) => (
                  <SelectItem
                    key={user.user_id}
                    textValue={user.user_name}
                    classNames={{
                      title: "text-xs hover:!text-primary-primary",
                      selectedIcon: "text-primary-primary",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar alt={user.user_fullname} className="w-6 h-6" src={user.user_img} classNames={{ img: "object-contain bg-background-primary" }} />
                      <div className="flex flex-col">
                        <span className="text-xs">{user.user_fullname}</span>
                        <div>
                          <span className="text-xs text-text-secondary">{user.program_study_name}</span> | <span className="text-xs text-text-secondary">{user.user_nim}</span> |{" "}
                          <span className="text-xs text-text-secondary">{user.user_phone}</span>
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
            )}

            {/* counseling_type_id */}
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
                isRequired
                label="Pilih jenis konseling"
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

            {/* counseling_date */}
            <DatePicker
              isRequired
              hideTimeZone
              name="counseling_date"
              showMonthAndYearPickers
              value={counseling_date}
              onChange={setCounselingDate}
              label="Pilih jadwal konseling"
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

            {/* counseling_desc  */}
            <Textarea
              isRequired
              label="Beritahu kami secara singkat tentang konseling Anda"
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

            <Button type="submit" className="login">
              Simpan
            </Button>
          </Form>
        </main>
      </>
    </>
  );
}

"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { Camera } from "iconsax-react";

// Components
import { Breadcrumbs, BreadcrumbItem, Form, Input, Button, Select, SelectItem, Selection, Avatar, Spinner, Textarea } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { UserItem } from "@/types/user";
import { StatusItem } from "@/types/status";

// Services
import { getUserAllIsEmployed } from "@/services/user";
import { getStatusAll } from "@/services/status";
import { getStudentRoomById, updateStudentRoomById } from "@/services/studentRoom";
// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { appendSingle } from "@/utils/formDataHelpers";

export default function page({ student_room_id }: { student_room_id: number }) {
  const router = useRouter();
  // users
  const [users, setUsers] = useState<UserItem[]>([]);
  const [user_id, setUserId] = useState<Selection>(new Set([]));
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [apiErrorUsers, setApiErrorUsers] = useState<string | null>(null);
  // statuses
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [status_id, setStatusId] = useState<Selection>(new Set([]));
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);
  const [apiErrorStatuses, setApiErrorStatuses] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const fetchers = [createServiceFetcher(getUserAllIsEmployed, setUsers, setApiErrorUsers, setIsLoadingUsers), createServiceFetcher(getStatusAll, setStatuses, setApiErrorStatuses, setIsLoadingStatuses)];

      await Promise.all(fetchers.map((fetch) => fetch()));

      const { success, data, error } = await getStudentRoomById(student_room_id);
      if (success && data) {
        if (data.student_room_img) setStudentRoomImg(data.student_room_img);
        setStudentRoomName(data.student_room_name);
        setStudentRoomDesc(data.student_room_desc);
        setUserId(new Set([String(data.user_id)]));
        setStatusId(new Set([String(data.status_id)]));
      }
      setLoading(false);
    };

    fetchAll();
  }, [student_room_id]);

  // Image
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [student_room_img, setStudentRoomImg] = useState<string>("/tambah-bg.png"); // preview
  const [student_room_img_file, setStudentRoomImgFile] = useState<File | null>(null); // file asli
  const [student_room_name, setStudentRoomName] = useState<string>("");
  const [student_room_desc, setStudentRoomDesc] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      showErrorDialog("Ukuran gambar tidak boleh lebih dari 5MB.");
      return;
    }
    setStudentRoomImgFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setStudentRoomImg(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setUpdateLoading(true);
    const formData = new FormData();
    if (student_room_img_file) formData.append("student_room_img", student_room_img_file);
    formData.append("student_room_name", student_room_name);
    formData.append("student_room_desc", student_room_desc);
    appendSingle(formData, "user_id", user_id);
    appendSingle(formData, "status_id", status_id);
    const { success, error } = await updateStudentRoomById(student_room_id, formData);
    if (success) {
      await showSuccessDialog();
      router.push("/ruang-mahasiswa");
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
            <BreadcrumbItem href="/ruang-mahasiswa">Ruang Mahasiswa</BreadcrumbItem>
            <BreadcrumbItem href="/ruang-mahasiswa/tambah">Tambah Ruang Mahasiswa</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Tambah Ruang Mahasiswa" />

          {/* Form */}
          <Form className="flex flex-col items-end gap-4" onSubmit={handleSubmit}>
            {/* student_room_img */}
            <div className="flex flex-col items-center gap-1 w-full">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md group aspect-square">
                <div className="w-full h-full rounded-medium border-2 border-dashed border-black overflow-hidden relative">
                  {student_room_img ? (
                    <img src={student_room_img} alt="Preview" className="w-full h-full object-contain rounded-medium" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm rounded-medium">Belum ada gambar</div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-medium transition">
                    <p className="text-white text-sm">{student_room_img ? "Ubah gambar" : "Pilih gambar"}</p>
                  </div>
                </div>

                <button onClick={handleIconClick} type="button" className="absolute bottom-0 right-0 bg-white p-2 rounded-medium shadow-md hover:scale-105 transition">
                  <Camera variant="Bold" color="currentColor" size={20} className="text-primary-primary" />
                </button>

                {/* Input tersembunyi */}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" name="student_room_img" />
              </div>

              {/* Keterangan maksimal ukuran */}
              <p className="text-[11px] text-gray-500 mt-1 text-center">
                Ukuran gambar maksimal <span className="font-semibold text-gray-600">5MB</span>
              </p>
            </div>

            {/* student_room_name  */}
            <Input
              isRequired
              label="Masukkan judul"
              labelPlacement="outside"
              name="student_room_name"
              value={student_room_name}
              onValueChange={setStudentRoomName}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            {/* student_room_desc  */}
            <Textarea
              isRequired
              label="Beritahu kami secara singkat tentang konseling Anda"
              labelPlacement="outside"
              name="student_room_desc"
              value={student_room_desc}
              onValueChange={setStudentRoomDesc}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

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
              Simpan Perubahan
            </Button>
          </Form>
        </main>
      </>
    </>
  );
}

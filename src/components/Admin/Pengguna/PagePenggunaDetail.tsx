"use client";
import React, { useState, useEffect } from "react";
import { Breadcrumbs, BreadcrumbItem, Form, Input, DatePicker, Spinner, Switch, Textarea } from "@heroui/react";
import { UserItem } from "@/types/user";
import { getUserByUsername } from "@/services/user";
import { parseAbsoluteToLocal, ZonedDateTime } from "@internationalized/date";

export default function PagePenggunaDetail({ user_name }: { user_name: string }) {
  const [user, setUser] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [user_birthdate, setUserBirthDate] = useState<ZonedDateTime | null>(null);
  const [user_admission_date, setUserAdmissionDate] = useState<ZonedDateTime | null>(null);
  const [user_graduation_date, setUserGraduationDate] = useState<ZonedDateTime | null>(null);
  const [user_is_employed, setUserIsEmployed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user_name) return;

        const userRes = await getUserByUsername(user_name);
        if (userRes.success && userRes.data) {
          setUser(userRes.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user_name]);

  useEffect(() => {
    if (!user) return;
    if (user.user_birthdate) setUserBirthDate(parseAbsoluteToLocal(user.user_birthdate));
    if (user.user_admission_date) setUserAdmissionDate(parseAbsoluteToLocal(user.user_admission_date));
    if (user.user_graduation_date) setUserGraduationDate(parseAbsoluteToLocal(user.user_graduation_date));
    setUserIsEmployed(Boolean(user.user_is_employed));
  }, [user]);

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
  return (
    <main className="xs:p-0 md:p-8  flex flex-col xs:gap-2 md:gap-8 overflow-hidden">
      <section className="flex flex-col xs:gap-2">
        {/* Breadcrumb */}
        <Breadcrumbs
          itemClasses={{
            item: "data-[current=true]:text-primary-primary text-xs text-text-secondary",
          }}
        >
          <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
          <BreadcrumbItem href="/pengguna">Pengguna</BreadcrumbItem>
          <BreadcrumbItem href={`/pengguna/${user_name}`}>Detail Pengguna</BreadcrumbItem>
        </Breadcrumbs>

        <section className="flex flex-col xs:gap-4 md:gap-8">
          {/* Form Profil */}
          <Form className="w-full flex flex-col justify-center gap-8 ">
            {/* Foto Profil */}
            <div className="flex justify-center w-full">
              <div className="relative w-32 h-32 group">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-black overflow-hidden relative">
                  {user?.user_img ? (
                    <img src={user?.user_img} alt="User Avatar" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm rounded-full">Belum ada gambar</div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition">
                    <p className="text-white text-sm">Foto Profil</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Input */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-4 md:gap-8 w-full">
              {/* Nama Lengkap  */}
              <Input isReadOnly label="Nama Lengkap" labelPlacement="outside" type="text" value={user?.user_fullname} classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs focus:border-primary-primary" }} />
              {/* Jenis Kemalin & Religion */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2 md:gap-8">
                {/* Jenis Kelamin  */}
                <Input isReadOnly label="Jenis Kelamin" labelPlacement="outside" type="text" value={user?.gender_name} classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }} />
                {/* Religion  */}
                <Input isReadOnly label="Agama" labelPlacement="outside" type="text" value={user?.religion_name} classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }} />
              </div>

              {/* Tempat dan Tanggal Lahir */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2 md:gap-8">
                {/* Tanggal Lahir */}
                <DatePicker
                  isReadOnly
                  isRequired
                  hideTimeZone
                  showMonthAndYearPickers
                  disableAnimation
                  value={user_birthdate}
                  onChange={setUserBirthDate}
                  name="user_birth_date"
                  label="Tanggal lahir"
                  labelPlacement="outside"
                  classNames={{
                    label: "after:text-danger-primary text-xs",
                    selectorIcon: "text-primary-primary",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary focus:!border-primary-primary",
                    errorMessage: "text-danger-primary",
                    calendarContent: "bg-primary-primary text-xs text-white",
                    segment: "text-xs ",
                  }}
                />
                {/* Tempat Kelahiran  */}
                <Input isReadOnly label="Kota Tempat Tinggal" labelPlacement="outside" type="text" value={user?.city_name} classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }} />
              </div>

              {/* Provinsi dan Negara Tempat tinggal */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2 md:gap-8">
                {/* Provinsi  */}
                <Input
                  isReadOnly
                  label="Provinsi Tempat Tinggal"
                  labelPlacement="outside"
                  type="text"
                  value={user?.province_name}
                  classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }}
                />
                {/* Negara  */}
                <Input
                  isReadOnly
                  label="Negara Tempat Tinggal"
                  labelPlacement="outside"
                  type="text"
                  value={user?.country_name}
                  classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }}
                />
              </div>

              {/* Umur dan Berat Badan */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2 md:gap-8">
                {/* Umur  */}
                <Input
                  isReadOnly
                  label="Umur"
                  labelPlacement="outside"
                  type="text"
                  value={String(user?.age_no) + " Tahun"}
                  classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }}
                />
                {/* Berat Badan  */}
                <Input
                  isReadOnly
                  label="Berat Badan"
                  labelPlacement="outside"
                  type="text"
                  value={String(user?.weight_no) + " kg"}
                  classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }}
                />
              </div>

              {/* Tinggi Badan dan Status Perkawinan */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2 md:gap-8">
                {/* Tinggi Badan  */}
                <Input
                  isReadOnly
                  label="Tinggi Badan"
                  labelPlacement="outside"
                  type="text"
                  value={String(user?.height_no) + " cm"}
                  classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }}
                />
                {/* Status Perkawinan  */}
                <Input
                  isReadOnly
                  label="Status Perkawinan"
                  labelPlacement="outside"
                  type="text"
                  value={user?.marital_status_name}
                  classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }}
                />
              </div>

              {/* Nomor HP & NIM */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2 md:gap-8">
                {/* Nomor HP  */}
                <Input isReadOnly label="Nomor HP" labelPlacement="outside" type="text" value={user?.user_phone} classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }} />
                {/* NIM  */}
                <Input isReadOnly label="NIM" labelPlacement="outside" type="text" value={user?.user_nim} classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary uppercase" }} />
              </div>

              {/* Education & Program Studi */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2 md:gap-8">
                {/* Education  */}
                <Input
                  isReadOnly
                  label="Jenjang Pendidikan"
                  labelPlacement="outside"
                  type="text"
                  value={user?.education_name}
                  classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }}
                />
                {/* Program Studi  */}
                <Input
                  isReadOnly
                  label="Program Studi"
                  labelPlacement="outside"
                  type="text"
                  value={user?.program_study_name}
                  classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }}
                />
              </div>

              {/* Semester & IPK  */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2 md:gap-8">
                {/* Semester */}
                <Input isReadOnly label="Semester" labelPlacement="outside" type="text" value={user?.semester_no} classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }} />
                {/* IPK  */}
                <Input isReadOnly label="IPK" labelPlacement="outside" type="text" value={user?.ipk_no} classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }} />
              </div>

              {/* Tanggal Masuk & Tanggal Lulus */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2 md:gap-8">
                {/* Tanggal Masuk */}
                <DatePicker
                  isRequired
                  isReadOnly
                  hideTimeZone
                  disableAnimation
                  showMonthAndYearPickers
                  value={user_admission_date}
                  onChange={setUserAdmissionDate}
                  name="user_admission_date"
                  label="Tanggal masuk satuan pendidikan"
                  labelPlacement="outside"
                  classNames={{
                    label: "after:text-danger-primary text-xs",
                    selectorIcon: "text-primary-primary",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary focus:!border-primary-primary",
                    errorMessage: "text-danger-primary",
                    calendarContent: "bg-primary-primary text-xs text-white",
                    segment: "text-xs ",
                  }}
                />
                {/* Tanggal Lulus */}
                <DatePicker
                  isRequired
                  isReadOnly
                  disableAnimation
                  hideTimeZone
                  showMonthAndYearPickers
                  value={user_graduation_date}
                  onChange={setUserGraduationDate}
                  name="user_graduation_date"
                  label="Tanggal lulus satuan pendidikan"
                  labelPlacement="outside"
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

              {/* Posisi Impian  */}
              <Input
                isReadOnly
                label="Pekerjaan Impian"
                labelPlacement="outside"
                type="text"
                value={user?.dream_position_name}
                classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }}
              />
              {/* Perusahaan Impian  */}
              <Input
                isReadOnly
                label="Perusahaan Impian"
                labelPlacement="outside"
                type="text"
                startContent={user?.dream_company_img ? <img src={user?.dream_company_img} alt="Company Icon" className="w-8 h-8 object-contain" /> : null}
                value={user?.dream_company_name}
                classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }}
              />
            </div>

            <Switch isReadOnly isSelected={user_is_employed} onValueChange={setUserIsEmployed} classNames={{ thumb: "bg-primary-primary", label: "text-xs" }}>
              {user_is_employed ? "Bekerja" : "Belum Bekerja"}
            </Switch>
            {user_is_employed === true ? (
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2 md:gap-8 w-full">
                <Input
                  isReadOnly
                  label="Pekerjaan Sekarang"
                  labelPlacement="outside"
                  type="text"
                  value={user?.current_position_name}
                  classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }}
                />
                <Input
                  isReadOnly
                  label="Perusahaan Sekarang"
                  labelPlacement="outside"
                  type="text"
                  startContent={user?.current_company_img ? <img src={user?.current_company_img} alt="Company Icon" className="w-8 h-8 object-contain" /> : null}
                  value={user?.current_company_name}
                  classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }}
                />
              </div>
            ) : null}

            {/* User Desc */}
            <Textarea
              readOnly
              label="Ceritakan diri anda"
              labelPlacement="outside"
              value={user?.user_desc}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />
          </Form>
        </section>
      </section>
    </main>
  );
}

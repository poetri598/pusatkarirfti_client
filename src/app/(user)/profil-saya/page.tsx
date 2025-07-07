"use client";
import React, { useState, useEffect } from "react";

// Iconsax
import { User, Sms } from "iconsax-react";

// Components
import { Form, Breadcrumbs, BreadcrumbItem, Avatar, Link, Input, DatePicker, Switch, avatar } from "@heroui/react";

// Context
import { useAuth } from "@/context/AuthContext";

// Utils
import { parseAbsoluteToLocal, ZonedDateTime } from "@internationalized/date";

export default function ProfilSaya() {
  const { user } = useAuth();
  const [user_birthdate, setUserBirthDate] = useState<ZonedDateTime | null>(null);
  const [user_admission_date, setUserAdmissionDate] = useState<ZonedDateTime | null>(null);
  const [user_graduation_date, setUserGraduationDate] = useState<ZonedDateTime | null>(null);

  const [user_is_employed, setUserIsEmployed] = useState(false);

  useEffect(() => {
    if (user?.user_birthdate) setUserBirthDate(parseAbsoluteToLocal(user?.user_birthdate));
    if (user?.user_admission_date) setUserAdmissionDate(parseAbsoluteToLocal(user?.user_admission_date));
    if (user?.user_graduation_date) setUserGraduationDate(parseAbsoluteToLocal(user?.user_graduation_date));
    if (user?.user_is_employed) setUserIsEmployed(Boolean(user?.user_is_employed));
  }, [user]);

  return (
    <>
      <>
        <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 pb-16 bg-background-primary py-8">
          {/* Breadcrumb */}
          <Breadcrumbs
            itemClasses={{
              item: "data-[current=true]:text-primary-primary text-xs text-text-secondary",
            }}
          >
            <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
            <BreadcrumbItem href="/profil-saya" className="text-primary-primary">
              Profil Saya
            </BreadcrumbItem>
          </Breadcrumbs>

          {/* Profil */}
          <div className="flex xs:flex-col xs:items-start gap-2">
            <Avatar className="xs:w-16 xs:h-16 aspect-square object-cover" src={user?.user_img} />
            <div className="flex flex-col gap-2">
              <p className="text-xs text-text-secondary">{user?.user_name}</p>
              <div className="flex items-center gap-2">
                <User size={20} variant="Linear" color="currentColor" className="text-primary-primary" />
                <p className="text-text-secondary">-</p>
                <Sms size={20} variant="Bold" color="currentColor" className="text-primary-primary" />
                <p className="text-xs text-text-secondary">{user?.user_email}</p>
              </div>
            </div>
          </div>

          {/* Form Profil */}
          <Form className="w-full flex flex-col justify-center gap-8 xs:p-0 md:p-8  rounded-medium xs:shadow-none md:shadow-2xl md:shadow-primary-border">
            {/* Profil Saya dan Tombol Ubah */}
            <div className="w-full flex justify-between">
              <div className="relative w-fit">
                <p className=" relative z-10 xs:text-sm md:text-2xl text-primary-primary font-bold ">Profil Saya</p>
                <div className="absolute top-1/2 w-5/6 h-1/4 bg-secondary-primary"></div>
              </div>
              <Link href={`/profil-saya/${user?.user_name}`} className="login">
                Ubah
              </Link>
            </div>

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
                {/* Tempat Kelahiran  */}
                <Input isReadOnly label="Tempat Kelahiran" labelPlacement="outside" type="text" value={user?.city_name} classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary" }} />
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
                <Input
                  isReadOnly
                  label="Semester"
                  labelPlacement="outside"
                  type="text"
                  value={user?.semester_no}
                  classNames={{ label: "text-xs", input: "placeholder:!text-text-secondary text-xs  focus:border-primary-primary uppercase" }}
                />
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

              {/* Posisi impian dan perusahaaan impian */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2 md:gap-8">
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
          </Form>
        </section>
      </>
    </>
  );
}

"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Camera, Building, Link21 } from "iconsax-react";

import { Breadcrumbs, BreadcrumbItem, Form, Input, Button, Select, SelectItem, Selection, NumberInput, DatePicker, Avatar, Spinner } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { ZonedDateTime, now, getLocalTimeZone } from "@internationalized/date";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";
import RichTextEditor from "@/components/Custom/RichTextEditor";

import { createFetcher } from "@/utils/createFetcher";
import { appendSingle, appendMultiple } from "@/utils/formDataHelpers";
import { CityItem } from "@/types/city";
import { CompanyItem } from "@/types/company";
import { CountryItem } from "@/types/country";
import { ExpoTypeItem } from "@/types/expoType";
import { EducationItem } from "@/types/education";
import { ModeItem } from "@/types/mode";
import { PositionItem } from "@/types/position";
import { ProgramStudyItem } from "@/types/programStudy";
import { ProvinceItem } from "@/types/province";
import { ExpoItem } from "@/types/expo";

import { createExpo } from "@/services/expo";
import { useAuth } from "@/context/AuthContext";

export default function page() {
  const router = useRouter();
  const { user } = useAuth();
  // cities
  const [cities, setCities] = useState<CityItem[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [apiErrorCities, setApiErrorCities] = useState<string | null>(null);
  // companies
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [apiErrorCompanies, setApiErrorCompanies] = useState<string | null>(null);
  // countries
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [apiErrorCountries, setApiErrorCountries] = useState<string | null>(null);
  // expoTypes
  const [expoTypes, setExpoTypes] = useState<ExpoTypeItem[]>([]);
  const [isLoadingExpoTypes, setIsLoadingExpoTypes] = useState(true);
  const [apiErrorExpoTypes, setApiErrorExpoTypes] = useState<string | null>(null);
  // educations
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [isLoadingEducations, setIsLoadingEducations] = useState(true);
  const [apiErrorEducations, setApiErrorEducations] = useState<string | null>(null);
  // modes
  const [modes, setModes] = useState<ModeItem[]>([]);
  const [isLoadingModes, setIsLoadingModes] = useState(true);
  const [apiErrorModes, setApiErrorModes] = useState<string | null>(null);
  // position
  const [positions, setPositions] = useState<PositionItem[]>([]);
  const [isLoadingPositions, setIsLoadingPositions] = useState(true);
  const [apiErrorPositions, setApiErrorPositions] = useState<string | null>(null);
  // programStudies
  const [programStudies, setProgramStudies] = useState<ProgramStudyItem[]>([]);
  const [isLoadingProgramStudies, setIsLoadingProgramStudies] = useState(true);
  const [apiErrorProgramStudies, setApiErrorProgramStudies] = useState<string | null>(null);
  // provinces
  const [provinces, setProvinces] = useState<ProvinceItem[]>([]);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
  const [apiErrorProvinces, setApiErrorProvinces] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [
        createFetcher<CityItem[]>("/cities", setCities, setApiErrorCities, setIsLoadingCities),
        createFetcher<CompanyItem[]>("/companies", setCompanies, setApiErrorCompanies, setIsLoadingCompanies),
        createFetcher<CountryItem[]>("/countries", setCountries, setApiErrorCountries, setIsLoadingCountries),
        createFetcher<ExpoTypeItem[]>("/expo-types", setExpoTypes, setApiErrorExpoTypes, setIsLoadingExpoTypes),
        createFetcher<EducationItem[]>("/educations", setEducations, setApiErrorEducations, setIsLoadingEducations),
        createFetcher<ModeItem[]>("/modes", setModes, setApiErrorModes, setIsLoadingModes),
        createFetcher<PositionItem[]>("/positions", setPositions, setApiErrorPositions, setIsLoadingPositions),
        createFetcher<ProgramStudyItem[]>("/program-studies", setProgramStudies, setApiErrorProgramStudies, setIsLoadingProgramStudies),
        createFetcher<ProvinceItem[]>("/provinces", setProvinces, setApiErrorProvinces, setIsLoadingProvinces),
      ];

      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  // Image
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [expo_img, setExpoImg] = useState<string>("/tambah-bg.png"); // preview
  const [expo_img_file, setExpoImgFile] = useState<File | null>(null); // file asli
  const [expo_name, setExpoName] = useState<string>("");
  const [expo_desc, setExpoDesc] = useState<string>("");
  const [expo_price, setExpoPrice] = useState<number>(0);
  const [expo_location, setExpoLocation] = useState<string>("");
  const [expo_link, setExpoLink] = useState<string>("");
  const [expo_date, setExpoDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [expo_open_date, setExpoOpenDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [expo_close_date, setExpoCloseDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [city_ids, setCityIds] = useState<Selection>(new Set([]));
  const [company_ids, setCompanyIds] = useState<Selection>(new Set([]));
  const [country_ids, setCountryIds] = useState<Selection>(new Set([]));
  const [expo_type_ids, setExpoTypeIds] = useState<Selection>(new Set([]));
  const [education_ids, setEducationIds] = useState<Selection>(new Set([]));
  const [mode_ids, setModeIds] = useState<Selection>(new Set([]));
  const [position_ids, setPositionIds] = useState<Selection>(new Set([]));
  const [program_study_ids, setProgramStudyIds] = useState<Selection>(new Set([]));
  const [province_ids, setProvinceIds] = useState<Selection>(new Set([]));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      showErrorDialog("Ukuran gambar tidak boleh lebih dari 5MB.");
      return;
    }
    // Simpan file untuk dikirim
    setExpoImgFile(file);
    // Simpan preview (string base64)
    const reader = new FileReader();
    reader.onloadend = () => {
      setExpoImg(reader.result as string);
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

    const formData = new FormData();

    // Form values
    formData.append("user_id", String(user?.user_id));
    formData.append("expo_name", expo_name);
    formData.append("expo_desc", expo_desc);
    formData.append("expo_location", expo_location);
    formData.append("expo_link", expo_link);
    formData.append("expo_price", String(expo_price));

    // Dates
    if (expo_date) {
      formData.append("expo_date", expo_date.toAbsoluteString());
    }
    if (expo_open_date) {
      formData.append("expo_open_date", expo_open_date.toAbsoluteString());
    }
    if (expo_close_date) {
      formData.append("expo_close_date", expo_close_date.toAbsoluteString());
    }

    if (city_ids instanceof Set) {
      Array.from(city_ids).forEach((id) => formData.append("city_ids[]", String(id)));
    }

    if (company_ids instanceof Set) {
      Array.from(company_ids).forEach((id) => formData.append("company_ids[]", String(id)));
    }

    if (country_ids instanceof Set) {
      Array.from(country_ids).forEach((id) => formData.append("country_ids[]", String(id)));
    }

    if (expo_type_ids instanceof Set) {
      Array.from(expo_type_ids).forEach((id) => formData.append("expo_type_ids[]", String(id)));
    }

    if (education_ids instanceof Set) {
      Array.from(education_ids).forEach((id) => formData.append("education_ids[]", String(id)));
    }

    if (mode_ids instanceof Set) {
      Array.from(mode_ids).forEach((id) => formData.append("mode_ids[]", String(id)));
    }

    if (position_ids instanceof Set) {
      Array.from(position_ids).forEach((id) => formData.append("position_ids[]", String(id)));
    }

    if (program_study_ids instanceof Set) {
      Array.from(program_study_ids).forEach((id) => formData.append("program_study_ids[]", String(id)));
    }

    if (province_ids instanceof Set) {
      Array.from(province_ids).forEach((id) => formData.append("province_ids[]", String(id)));
    }

    // File
    if (expo_img_file) {
      formData.append("expo_img", expo_img_file);
    }

    // Kirim ke server
    const { success, error } = await createExpo(formData);

    if (success) {
      await showSuccessDialog();
      router.push("/expo");
    } else {
      await showErrorDialog(error);
    }
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
            <BreadcrumbItem href="/expo">Expo</BreadcrumbItem>
            <BreadcrumbItem href="/expo/tambah">Tambah Expo</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Tambah Expo" />

          {/* Form */}
          <Form className="flex flex-col items-end gap-4" onSubmit={handleSubmit}>
            {/* expo_img */}
            <div className="flex flex-col items-center gap-1 w-full">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md group aspect-square">
                <div className="w-full h-full rounded-medium border-2 border-dashed border-black overflow-hidden relative">
                  {expo_img ? (
                    <img src={expo_img} alt="Preview" className="w-full h-full object-contain rounded-medium" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm rounded-medium">Belum ada gambar</div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-medium transition">
                    <p className="text-white text-sm">{expo_img ? "Ubah gambar" : "Pilih gambar"}</p>
                  </div>
                </div>

                <button onClick={handleIconClick} type="button" className="absolute bottom-0 right-0 bg-white p-2 rounded-medium shadow-md hover:scale-105 transition">
                  <Camera variant="Bold" color="currentColor" size={20} className="text-primary-primary" />
                </button>

                {/* Input tersembunyi */}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" name="expo_img" />
              </div>

              {/* Keterangan maksimal ukuran */}
              <p className="text-[11px] text-gray-500 mt-1 text-center">
                Ukuran gambar maksimal <span className="font-semibold text-gray-600">5MB</span>
              </p>
            </div>

            {/* expo_name  */}
            <Input
              isRequired
              label="Masukkan judul"
              labelPlacement="outside"
              name="expo_name"
              value={expo_name}
              onValueChange={setExpoName}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            {/* expo_desc  */}
            <RichTextEditor key={expo_desc} value={expo_desc} onChange={setExpoDesc} placeholder="Masukkan deskripsi magang" />

            {/* Cost Information */}
            <div className="grid xs:grid-cols-1   gap-4 w-full">
              {/* expo_price*/}
              <NumberInput
                isRequired
                label="Masukkan harga pendaftaran"
                name="expo_price"
                value={expo_price}
                onValueChange={setExpoPrice}
                minValue={0}
                labelPlacement="outside"
                variant="bordered"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">Rp.</span>
                  </div>
                }
                classNames={{
                  label: "after:text-danger-primary text-xs text-text-secondary",
                  input: "focus:!border-primary-primary text-xs ",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  errorMessage: "text-danger-primary text-xs",
                }}
              />
            </div>

            {/* Place Information */}
            <div className="grid xs:grid-cols-1 gap-4 w-full">
              {/* expo_location  */}
              <Input
                isRequired
                label="Masukkan lokasi pendaftaran"
                labelPlacement="outside"
                name="expo_location"
                value={expo_location}
                onValueChange={setExpoLocation}
                startContent={<Building size={20} variant="Bold" color="currentColor" className="text-primary-primary" />}
                type="text"
                variant="bordered"
                classNames={{
                  label: "after:text-danger-primary text-xs text-text-secondary",
                  input: "focus:!border-primary-primary text-xs ",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  errorMessage: "text-danger-primary text-xs",
                }}
              />
              {/* expo_link  */}
              <Input
                isRequired
                label="Masukkan link pendaftaran"
                labelPlacement="outside"
                name="expo_link"
                value={expo_link}
                onValueChange={setExpoLink}
                type="text"
                variant="bordered"
                startContent={<Link21 size={20} variant="Bold" color="currentColor" className="text-primary-primary" />}
                classNames={{
                  label: "after:text-danger-primary text-xs text-text-secondary",
                  input: "focus:!border-primary-primary text-xs ",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  errorMessage: "text-danger-primary text-xs",
                }}
              />
            </div>

            {/* Date Information */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {/* expo_date */}
              <DatePicker
                isRequired
                hideTimeZone
                name="expo_date"
                showMonthAndYearPickers
                value={expo_date}
                onChange={setExpoDate}
                label="Pilih waktu pelaksanaan"
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
              {/* expo_open_date */}
              <DatePicker
                isRequired
                hideTimeZone
                name="expo_open_date"
                showMonthAndYearPickers
                value={expo_open_date}
                onChange={setExpoOpenDate}
                label="Pilih waktu pendaftaran dibuka"
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
              {/* expo_close_date */}
              <DatePicker
                isRequired
                hideTimeZone
                name="expo_close_date"
                showMonthAndYearPickers
                value={expo_close_date}
                onChange={setExpoCloseDate}
                label="Pilih waktu pendaftaran ditutup"
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

            {/* Location Information */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {/* city_ids */}
              {isLoadingCities ? (
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
              ) : apiErrorCities ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorCities}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih kota pelaksanaan"
                  labelPlacement="outside"
                  variant="bordered"
                  name="city_ids"
                  selectionMode="multiple"
                  selectedKeys={city_ids}
                  onSelectionChange={setCityIds}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {cities.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    cities.map((item) => (
                      <SelectItem
                        key={item.city_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.city_name}
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}

              {/* province_ids */}
              {isLoadingProvinces ? (
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
              ) : apiErrorProvinces ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorProvinces}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih provinsi pelaksanaan"
                  labelPlacement="outside"
                  variant="bordered"
                  name="province_ids"
                  selectionMode="multiple"
                  selectedKeys={province_ids}
                  onSelectionChange={setProvinceIds}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {provinces.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    provinces.map((item) => (
                      <SelectItem
                        key={item.province_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.province_name}
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}

              {/* country_ids */}
              {isLoadingCountries ? (
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
              ) : apiErrorCountries ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorCountries}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih negara pelaksaaan"
                  labelPlacement="outside"
                  variant="bordered"
                  name="country_ids"
                  selectionMode="multiple"
                  selectedKeys={country_ids}
                  onSelectionChange={setCountryIds}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {countries.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    countries.map((item) => (
                      <SelectItem
                        key={item.country_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.country_name}
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}
            </div>

            {/* School Information */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {/* education_ids */}
              {isLoadingEducations ? (
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
              ) : apiErrorEducations ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorEducations}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih persyaratan jenjang pendidikan"
                  labelPlacement="outside"
                  variant="bordered"
                  name="education_ids"
                  selectionMode="multiple"
                  selectedKeys={education_ids}
                  onSelectionChange={setEducationIds}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {educations.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    educations.map((item) => (
                      <SelectItem
                        key={item.education_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.education_name}
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}

              {/* program_study_ids */}
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
                  isRequired
                  label="Pilih persyaratan program studi"
                  labelPlacement="outside"
                  variant="bordered"
                  name="program_study_ids"
                  selectionMode="multiple"
                  selectedKeys={program_study_ids}
                  onSelectionChange={setProgramStudyIds}
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
            </div>

            {/* position_ids */}
            {isLoadingPositions ? (
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
            ) : apiErrorPositions ? (
              <p className="text-start text-xs text-danger-primary">{apiErrorPositions}</p>
            ) : (
              <Select
                isRequired
                label="Pilih posisi expo"
                labelPlacement="outside"
                variant="bordered"
                name="position_ids"
                selectionMode="multiple"
                selectedKeys={position_ids}
                onSelectionChange={setPositionIds}
                classNames={{
                  label: "after:text-danger-primary text-xs text-text-secondary",
                  trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                  value: "text-xs",
                  errorMessage: "text-danger-primary text-xs",
                }}
              >
                {positions.length === 0 ? (
                  <SelectItem key="nodata" isDisabled>
                    Data belum tersedia
                  </SelectItem>
                ) : (
                  positions.map((item) => (
                    <SelectItem
                      key={item.position_id}
                      classNames={{
                        title: "text-xs hover:!text-primary-primary",
                        selectedIcon: "text-primary-primary",
                      }}
                    >
                      {item.position_name}
                    </SelectItem>
                  ))
                )}
              </Select>
            )}

            {/* company_ids */}
            {isLoadingCompanies ? (
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
            ) : apiErrorCompanies ? (
              <p className="text-start text-xs text-danger-primary">{apiErrorCompanies}</p>
            ) : companies.length === 0 ? (
              <p className="text-start text-xs text-text-secondary">Data perusahaan belum tersedia</p>
            ) : (
              <Select
                isRequired
                isMultiline={true}
                items={companies}
                label="Pilih perusahaan penyelenggara"
                labelPlacement="outside"
                variant="bordered"
                name="company_ids"
                selectionMode="multiple"
                renderValue={(items) => (
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <div key={item.data?.company_id} className="flex items-center gap-2">
                        <Avatar alt={item.data?.company_name} className="w-6 h-6" src={item.data?.company_img} classNames={{ img: "object-contain bg-background-primary" }} />
                        <span className="text-xs">{item.data?.company_name}</span>
                      </div>
                    ))}
                  </div>
                )}
                selectedKeys={company_ids}
                onSelectionChange={setCompanyIds}
                classNames={{
                  label: "after:text-danger-primary text-xs",
                  trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                  value: "text-xs",
                  errorMessage: "text-danger-primary",
                }}
              >
                {(company) => (
                  <SelectItem
                    key={company.company_id}
                    textValue={company.company_name}
                    startContent={<Avatar alt={company.company_name} className="w-6 h-6" src={company.company_img} classNames={{ img: "object-contain bg-background-primary" }} />}
                    classNames={{
                      title: "text-xs hover:!text-primary-primary",
                      selectedIcon: "text-primary-primary",
                    }}
                  >
                    {company.company_name}
                  </SelectItem>
                )}
              </Select>
            )}

            {/* Other information */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2  gap-4 w-full">
              {/* expo_type_id */}
              {isLoadingExpoTypes ? (
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
              ) : apiErrorExpoTypes ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorExpoTypes}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih tipe expo"
                  labelPlacement="outside"
                  variant="bordered"
                  name="expo_type_ids"
                  selectionMode="multiple"
                  selectedKeys={expo_type_ids}
                  onSelectionChange={setExpoTypeIds}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {expoTypes.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    expoTypes.map((item) => (
                      <SelectItem
                        key={item.expo_type_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.expo_type_name}
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}

              {/* mode_ids */}
              {isLoadingModes ? (
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
              ) : apiErrorModes ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorModes}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih mode pelaksanaan"
                  labelPlacement="outside"
                  variant="bordered"
                  name="mode_ids"
                  selectionMode="multiple"
                  selectedKeys={mode_ids}
                  onSelectionChange={setModeIds}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {modes.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    modes.map((item) => (
                      <SelectItem
                        key={item.mode_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.mode_name}
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}
            </div>

            <Button type="submit" className="login">
              Simpan
            </Button>
          </Form>
        </main>
      </>
    </>
  );
}

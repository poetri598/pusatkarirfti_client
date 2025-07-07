"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { Camera, Building, Link21 } from "iconsax-react";

// Components
import { Breadcrumbs, BreadcrumbItem, Form, Input, Button, Select, SelectItem, Selection, NumberInput, DatePicker, Avatar, Spinner } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";
import RichTextEditor from "@/components/Custom/RichTextEditor";

// Context
import { useAuth } from "@/context/AuthContext";

// Types
import { StatusItem } from "@/types/status";
import { CityItem } from "@/types/city";
import { CompanyItem } from "@/types/company";
import { CountryItem } from "@/types/country";
import { EducationItem } from "@/types/education";
import { ExpoTypeItem } from "@/types/expoType";
import { ModeItem } from "@/types/mode";
import { PositionItem } from "@/types/position";
import { ProgramStudyItem } from "@/types/programStudy";
import { ProvinceItem } from "@/types/province";

// Services
import { getExpoBySlug, updateExpoById } from "@/services/expo";
import { getStatusAll } from "@/services/status";
import { getCityAll } from "@/services/city";
import { getCompanyAll } from "@/services/company";
import { getCountryAll } from "@/services/country";
import { getEducationAll } from "@/services/education";
import { getExpoTypeAll } from "@/services/expoType";
import { getModeAll } from "@/services/mode";
import { getPositionAll } from "@/services/position";
import { getProgramStudyAll } from "@/services/programStudy";
import { getProvinceAll } from "@/services/province";

// Utils
import { ZonedDateTime, now, getLocalTimeZone, parseAbsoluteToLocal } from "@internationalized/date";
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { appendSingle, appendMultiple } from "@/utils/formDataHelpers";

export default function page({ expo_slug }: { expo_slug: string }) {
  const router = useRouter();
  const { user } = useAuth();
  // statuses
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [status_id, setStatusId] = useState<Selection>(new Set(["1"]));
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);
  const [apiErrorStatuses, setApiErrorStatuses] = useState<string | null>(null);
  // cities
  const [cities, setCities] = useState<CityItem[]>([]);
  const [city_ids, setCityIds] = useState<Selection>(new Set([]));
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [apiErrorCities, setApiErrorCities] = useState<string | null>(null);
  // companies
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [company_ids, setCompanyIds] = useState<Selection>(new Set([]));
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [apiErrorCompanies, setApiErrorCompanies] = useState<string | null>(null);
  // countries
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [country_ids, setCountryIds] = useState<Selection>(new Set([]));
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [apiErrorCountries, setApiErrorCountries] = useState<string | null>(null);
  // expoTypes
  const [expoTypes, setExpoTypes] = useState<ExpoTypeItem[]>([]);
  const [expo_type_ids, setExpoTypeIds] = useState<Selection>(new Set([]));
  const [isLoadingExpoTypes, setIsLoadingExpoTypes] = useState(true);
  const [apiErrorExpoTypes, setApiErrorExpoTypes] = useState<string | null>(null);
  // educations
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [education_ids, setEducationIds] = useState<Selection>(new Set([]));
  const [isLoadingEducations, setIsLoadingEducations] = useState(true);
  const [apiErrorEducations, setApiErrorEducations] = useState<string | null>(null);
  // modes
  const [modes, setModes] = useState<ModeItem[]>([]);
  const [mode_ids, setModeIds] = useState<Selection>(new Set([]));
  const [isLoadingModes, setIsLoadingModes] = useState(true);
  const [apiErrorModes, setApiErrorModes] = useState<string | null>(null);
  // position
  const [positions, setPositions] = useState<PositionItem[]>([]);
  const [position_ids, setPositionIds] = useState<Selection>(new Set([]));
  const [isLoadingPositions, setIsLoadingPositions] = useState(true);
  const [apiErrorPositions, setApiErrorPositions] = useState<string | null>(null);
  // programStudies
  const [programStudies, setProgramStudies] = useState<ProgramStudyItem[]>([]);
  const [program_study_ids, setProgramStudyIds] = useState<Selection>(new Set([]));
  const [isLoadingProgramStudies, setIsLoadingProgramStudies] = useState(true);
  const [apiErrorProgramStudies, setApiErrorProgramStudies] = useState<string | null>(null);
  // provinces
  const [provinces, setProvinces] = useState<ProvinceItem[]>([]);
  const [province_ids, setProvinceIds] = useState<Selection>(new Set([]));
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
  const [apiErrorProvinces, setApiErrorProvinces] = useState<string | null>(null);

  // Image
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [expo_id, setExpoId] = useState<number>(0);
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

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      const fetchers = [
        createServiceFetcher(getStatusAll, setStatuses, setApiErrorStatuses, setIsLoadingStatuses),
        createServiceFetcher(getCityAll, setCities, setApiErrorCities, setIsLoadingCities),
        createServiceFetcher(getCompanyAll, setCompanies, setApiErrorCompanies, setIsLoadingCompanies),
        createServiceFetcher(getCountryAll, setCountries, setApiErrorCountries, setIsLoadingCountries),
        createServiceFetcher(getEducationAll, setEducations, setApiErrorEducations, setIsLoadingEducations),
        createServiceFetcher(getExpoTypeAll, setExpoTypes, setApiErrorExpoTypes, setIsLoadingExpoTypes),
        createServiceFetcher(getModeAll, setModes, setApiErrorModes, setIsLoadingModes),
        createServiceFetcher(getPositionAll, setPositions, setApiErrorPositions, setIsLoadingPositions),
        createServiceFetcher(getProgramStudyAll, setProgramStudies, setApiErrorProgramStudies, setIsLoadingProgramStudies),
        createServiceFetcher(getProvinceAll, setProvinces, setApiErrorProvinces, setIsLoadingProvinces),
      ];

      await Promise.all(fetchers.map((fetch) => fetch()));

      const { success, data, error } = await getExpoBySlug(expo_slug);
      if (!success || !data) {
        await showErrorDialog(error || "Gagal mengambil data magang.");
        return;
      }
      setExpoId(data.expo_id);
      if (data.expo_img) setExpoImg(data.expo_img);
      setExpoName(data.expo_name);
      setExpoDesc(data.expo_desc);
      setExpoPrice(data.expo_price);
      setExpoLocation(data.expo_location);
      setExpoLink(data.expo_link);
      if (data.expo_date) setExpoDate(parseAbsoluteToLocal(data.expo_date));
      if (data.expo_open_date) setExpoOpenDate(parseAbsoluteToLocal(data.expo_open_date));
      if (data.expo_close_date) setExpoCloseDate(parseAbsoluteToLocal(data.expo_close_date));
      setStatusId(new Set([String(data.status_id)]));
      setCityIds(new Set(String(data.city_ids).split(",")));
      setCompanyIds(new Set(String(data.company_ids).split(",")));
      setCountryIds(new Set(String(data.country_ids).split(",")));
      setEducationIds(new Set(String(data.education_ids).split(",")));
      setExpoTypeIds(new Set(String(data.expo_type_ids).split(",")));
      setModeIds(new Set(String(data.mode_ids).split(",")));
      setPositionIds(new Set(String(data.position_ids).split(",")));
      setProgramStudyIds(new Set(String(data.program_study_ids).split(",")));
      setProvinceIds(new Set(String(data.province_ids).split(",")));
      setLoading(false);
    };

    fetchAll();
  }, [expo_slug]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      showErrorDialog("Ukuran gambar tidak boleh lebih dari 5MB.");
      return;
    }
    setExpoImgFile(file);
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
    setUpdateLoading(true);
    const formData = new FormData();
    formData.append("user_id", String(user?.user_id));
    if (expo_img_file) formData.append("expo_img", expo_img_file);
    formData.append("expo_name", expo_name);
    formData.append("expo_desc", expo_desc);
    formData.append("expo_location", expo_location);
    formData.append("expo_link", expo_link);
    formData.append("expo_price", String(expo_price));
    if (expo_date) formData.append("expo_date", expo_date.toAbsoluteString());
    if (expo_open_date) formData.append("expo_open_date", expo_open_date.toAbsoluteString());
    if (expo_close_date) formData.append("expo_close_date", expo_close_date.toAbsoluteString());
    appendSingle(formData, "status_id", status_id);
    appendMultiple(formData, "city_ids", city_ids);
    appendMultiple(formData, "company_ids", company_ids);
    appendMultiple(formData, "country_ids", country_ids);
    appendMultiple(formData, "education_ids", education_ids);
    appendMultiple(formData, "expo_type_ids", expo_type_ids);
    appendMultiple(formData, "mode_ids", mode_ids);
    appendMultiple(formData, "position_ids", position_ids);
    appendMultiple(formData, "program_study_ids", program_study_ids);
    appendMultiple(formData, "province_ids", province_ids);
    const { success, error } = await updateExpoById(expo_id, formData);
    if (success) {
      setUpdateLoading(false);
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
            <BreadcrumbItem href="/expo">Expo</BreadcrumbItem>
            <BreadcrumbItem href={`/expo/edit/${expo_slug}`}>Ubah Expo</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Ubah data expo" />

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
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 w-full">
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

              {/* status_id */}
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
            </div>

            <Button type="submit" className="login">
              Simpan Perubahan
            </Button>
          </Form>
        </main>
      </>
    </>
  );
}

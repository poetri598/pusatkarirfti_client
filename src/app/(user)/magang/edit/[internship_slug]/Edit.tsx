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
import { InternshipTypeItem } from "@/types/internshipType";
import { IpkItem } from "@/types/ipk";
import { CompanyItem } from "@/types/company";
import { StatusItem } from "@/types/status";
import { CityItem } from "@/types/city";
import { CountryItem } from "@/types/country";
import { EducationItem } from "@/types/education";
import { GenderItem } from "@/types/gender";
import { ModeItem } from "@/types/mode";
import { PositionItem } from "@/types/position";
import { ProgramStudyItem } from "@/types/programStudy";
import { ProvinceItem } from "@/types/province";
import { ReligionItem } from "@/types/religion";
import { SemesterItem } from "@/types/semester";

// Services
import { getInternshipTypeAll } from "@/services/internshipType";
import { getIpkAll } from "@/services/ipk";
import { getCompanyAll } from "@/services/company";
import { getStatusAll } from "@/services/status";
import { getCityAll } from "@/services/city";
import { getCountryAll } from "@/services/country";
import { getEducationAll } from "@/services/education";
import { getGenderAll } from "@/services/gender";
import { getModeAll } from "@/services/mode";
import { getPositionAll } from "@/services/position";
import { getProgramStudyAll } from "@/services/programStudy";
import { getProvinceAll } from "@/services/province";
import { getReligionAll } from "@/services/religion";
import { getSemesterAll } from "@/services/semester";
import { getInternshipBySlug, updateInternshipById } from "@/services/internship";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { ZonedDateTime, parseAbsoluteToLocal, now, getLocalTimeZone } from "@internationalized/date";
import { appendSingle, appendMultiple } from "@/utils/formDataHelpers";

export default function Edit({ internship_slug }: { internship_slug: string }) {
  const router = useRouter();
  const { user } = useAuth();
  // internshipTypes
  const [internshipTypes, setInternshipTypes] = useState<InternshipTypeItem[]>([]);
  const [internship_type_id, setInternshipTypeId] = useState<Selection>(new Set([]));
  const [isLoadingInternshipTypes, setIsLoadingInternshipTypes] = useState(true);
  const [apiErrorInternshipTypes, setApiErrorInternshipTypes] = useState<string | null>(null);
  // ipks
  const [ipks, setIpks] = useState<IpkItem[]>([]);
  const [ipk_id, setIpkId] = useState<Selection>(new Set([]));
  const [isLoadingIpks, setIsLoadingIpks] = useState(true);
  const [apiErrorIpks, setApiErrorIpks] = useState<string | null>(null);
  // companies
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [company_id, setCompanyId] = useState<Selection>(new Set([]));
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [apiErrorCompanies, setApiErrorCompanies] = useState<string | null>(null);
  // statuses
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [status_id, setStatusId] = useState<Selection>(new Set([]));
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);
  const [apiErrorStatuses, setApiErrorStatuses] = useState<string | null>(null);
  // cities
  const [cities, setCities] = useState<CityItem[]>([]);
  const [city_ids, setCityIds] = useState<Selection>(new Set([]));
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [apiErrorCities, setApiErrorCities] = useState<string | null>(null);
  // countries
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [country_ids, setCountryIds] = useState<Selection>(new Set([]));
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [apiErrorCountries, setApiErrorCountries] = useState<string | null>(null);
  // educations
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [education_ids, setEducationIds] = useState<Selection>(new Set([]));
  const [isLoadingEducations, setIsLoadingEducations] = useState(true);
  const [apiErrorEducations, setApiErrorEducations] = useState<string | null>(null);
  // genders
  const [genders, setGenders] = useState<GenderItem[]>([]);
  const [gender_ids, setGenderIds] = useState<Selection>(new Set([]));
  const [isLoadingGenders, setIsLoadingGenders] = useState(true);
  const [apiErrorGenders, setApiErrorGenders] = useState<string | null>(null);
  // modes
  const [modes, setModes] = useState<ModeItem[]>([]);
  const [mode_ids, setModeIds] = useState<Selection>(new Set([]));
  const [isLoadingModes, setIsLoadingModes] = useState(true);
  const [apiErrorModes, setApiErrorModes] = useState<string | null>(null);
  // positions
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
  // religions
  const [religions, setReligions] = useState<ReligionItem[]>([]);
  const [religion_ids, setReligionIds] = useState<Selection>(new Set([]));
  const [isLoadingReligions, setIsLoadingReligions] = useState(true);
  const [apiErrorReligions, setApiErrorReligions] = useState<string | null>(null);
  // semesters
  const [semesters, setSemesters] = useState<SemesterItem[]>([]);
  const [semester_ids, setSemesterIds] = useState<Selection>(new Set([]));
  const [isLoadingSemesters, setIsLoadingSemesters] = useState(true);
  const [apiErrorSemesters, setApiErrorSemesters] = useState<string | null>(null);

  // Image
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [internship_id, setInternshipId] = useState<number>(0);
  const [internship_img, setInternshipImg] = useState<string>("/tambah-bg.png"); // preview
  const [internship_img_file, setInternshipImgFile] = useState<File | null>(null); // file asli
  const [internship_name, setInternshipName] = useState<string>("");
  const [internship_desc, setInternshipDesc] = useState<string>("");
  const [internship_location, setInternshipLocation] = useState<string>("");
  const [internship_link, setInternshipLink] = useState<string>("");
  const [internship_start_date, setInternshipStartDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [internship_end_date, setInternshipEndDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [internship_open_date, setInternshipOpenDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [internship_close_date, setInternshipCloseDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));

  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const fetchers = [
        createServiceFetcher(getInternshipTypeAll, setInternshipTypes, setApiErrorInternshipTypes, setIsLoadingInternshipTypes),
        createServiceFetcher(getIpkAll, setIpks, setApiErrorIpks, setIsLoadingIpks),
        createServiceFetcher(getCompanyAll, setCompanies, setApiErrorCompanies, setIsLoadingCompanies),
        createServiceFetcher(getStatusAll, setStatuses, setApiErrorStatuses, setIsLoadingStatuses),
        createServiceFetcher(getCityAll, setCities, setApiErrorCities, setIsLoadingCities),
        createServiceFetcher(getCountryAll, setCountries, setApiErrorCountries, setIsLoadingCountries),
        createServiceFetcher(getEducationAll, setEducations, setApiErrorEducations, setIsLoadingEducations),
        createServiceFetcher(getGenderAll, setGenders, setApiErrorGenders, setIsLoadingGenders),
        createServiceFetcher(getModeAll, setModes, setApiErrorModes, setIsLoadingModes),
        createServiceFetcher(getPositionAll, setPositions, setApiErrorPositions, setIsLoadingPositions),
        createServiceFetcher(getProgramStudyAll, setProgramStudies, setApiErrorProgramStudies, setIsLoadingProgramStudies),
        createServiceFetcher(getProvinceAll, setProvinces, setApiErrorProvinces, setIsLoadingProvinces),
        createServiceFetcher(getReligionAll, setReligions, setApiErrorReligions, setIsLoadingReligions),
        createServiceFetcher(getSemesterAll, setSemesters, setApiErrorSemesters, setIsLoadingSemesters),
      ];

      await Promise.all(fetchers.map((fetch) => fetch()));

      const { success, data, error } = await getInternshipBySlug(internship_slug);
      if (!success || !data) {
        await showErrorDialog(error || "Gagal mengambil data magang.");
        return;
      }
      setInternshipId(data.internship_id);
      setInternshipName(data.internship_name);
      if (data.internship_img) setInternshipImg(data.internship_img);
      setInternshipDesc(data.internship_desc);
      setInternshipLocation(data.internship_location);
      setInternshipLink(data.internship_link);
      if (data.internship_start_date) setInternshipStartDate(parseAbsoluteToLocal(data.internship_start_date));
      if (data.internship_end_date) setInternshipEndDate(parseAbsoluteToLocal(data.internship_end_date));
      if (data.internship_open_date) setInternshipOpenDate(parseAbsoluteToLocal(data.internship_open_date));
      if (data.internship_close_date) setInternshipCloseDate(parseAbsoluteToLocal(data.internship_close_date));
      setInternshipTypeId(new Set([String(data.internship_type_id)]));
      setIpkId(new Set([String(data.ipk_id)]));
      setCompanyId(new Set([String(data.company_id)]));
      setStatusId(new Set([String(data.status_id)]));
      setCityIds(new Set(String(data.city_ids).split(",")));
      setCountryIds(new Set(String(data.country_ids).split(",")));
      setEducationIds(new Set(String(data.education_ids).split(",")));
      setGenderIds(new Set(String(data.gender_ids).split(",")));
      setModeIds(new Set(String(data.mode_ids).split(",")));
      setPositionIds(new Set(String(data.position_ids).split(",")));
      setProgramStudyIds(new Set(String(data.program_study_ids).split(",")));
      setProvinceIds(new Set(String(data.province_ids).split(",")));
      setReligionIds(new Set(String(data.religion_ids).split(",")));
      setSemesterIds(new Set(String(data.semester_ids).split(",")));
      setLoading(false);
    };

    fetchAll();
  }, [internship_slug]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      showErrorDialog("Ukuran gambar tidak boleh lebih dari 5MB.");
      return;
    }
    setInternshipImgFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setInternshipImg(reader.result as string);
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
    formData.append("internship_name", internship_name);
    if (internship_img_file) formData.append("internship_img", internship_img_file);
    formData.append("internship_desc", internship_desc);
    formData.append("internship_location", internship_location);
    formData.append("internship_link", internship_link);
    if (internship_start_date) formData.append("internship_start_date", internship_start_date.toAbsoluteString());
    if (internship_end_date) formData.append("internship_end_date", internship_end_date.toAbsoluteString());
    if (internship_open_date) formData.append("internship_open_date", internship_open_date.toAbsoluteString());
    if (internship_close_date) formData.append("internship_close_date", internship_close_date.toAbsoluteString());
    appendSingle(formData, "internship_type_id", internship_type_id);
    appendSingle(formData, "company_id", company_id);
    appendSingle(formData, "ipk_id", ipk_id);
    formData.append("user_id", String(user?.user_id));
    appendSingle(formData, "status_id", status_id);
    appendMultiple(formData, "city_ids", city_ids);
    appendMultiple(formData, "country_ids", country_ids);
    appendMultiple(formData, "education_ids", education_ids);
    appendMultiple(formData, "gender_ids", gender_ids);
    appendMultiple(formData, "mode_ids", mode_ids);
    appendMultiple(formData, "position_ids", position_ids);
    appendMultiple(formData, "program_study_ids", program_study_ids);
    appendMultiple(formData, "province_ids", province_ids);
    appendMultiple(formData, "religion_ids", religion_ids);
    appendMultiple(formData, "semester_ids", semester_ids);
    const { success, error } = await updateInternshipById(internship_id, formData);
    if (success) {
      await showSuccessDialog();
      router.push("/magang");
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
            <BreadcrumbItem href="/magang">Magang</BreadcrumbItem>
            <BreadcrumbItem href="/magang/ubah">Ubah Data magang</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Ubah data magang" />

          {/* Form */}
          <Form className="flex flex-col items-end gap-4" onSubmit={handleSubmit}>
            {/* internship_img */}
            <div className="flex flex-col items-center gap-1 w-full">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md group aspect-square">
                <div className="w-full h-full rounded-medium border-2 border-dashed border-black overflow-hidden relative">
                  {internship_img ? (
                    <img src={internship_img} alt="Preview" className="w-full h-full object-contain rounded-medium" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm rounded-medium">Belum ada gambar</div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-medium transition">
                    <p className="text-white text-sm">{internship_img ? "Ubah gambar" : "Pilih gambar"}</p>
                  </div>
                </div>

                <button onClick={handleIconClick} type="button" className="absolute bottom-0 right-0 bg-white p-2 rounded-medium shadow-md hover:scale-105 transition">
                  <Camera variant="Bold" color="currentColor" size={20} className="text-primary-primary" />
                </button>

                {/* Input tersembunyi */}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" name="internship_img" />
              </div>

              {/* Keterangan maksimal ukuran */}
              <p className="text-[11px] text-gray-500 mt-1 text-center">
                Ukuran gambar maksimal <span className="font-semibold text-gray-600">5MB</span>
              </p>
            </div>

            {/* internship_name  */}
            <Input
              isRequired
              label="Masukkan judul"
              labelPlacement="outside"
              name="internship_name"
              value={internship_name}
              onValueChange={setInternshipName}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            {/* internship_desc  */}
            <RichTextEditor value={internship_desc} onChange={setInternshipDesc} placeholder="Masukkan deskripsi magang" />

            {/* Place Information */}
            <div className="grid xs:grid-cols-1 gap-4 w-full">
              {" "}
              {/* internship_location  */}
              <Input
                isRequired
                label="Masukkan lokasi pendaftaran"
                labelPlacement="outside"
                name="internship_location"
                value={internship_location}
                onValueChange={setInternshipLocation}
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
              {/* internship_link  */}
              <Input
                isRequired
                label="Masukkan link pendaftaran"
                labelPlacement="outside"
                name="internship_link"
                value={internship_link}
                onValueChange={setInternshipLink}
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
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {" "}
              {/* internship_start_date */}
              <DatePicker
                isRequired
                hideTimeZone
                name="internship_start_date"
                showMonthAndYearPickers
                value={internship_start_date}
                onChange={setInternshipStartDate}
                label="Pilih waktu mulai magang"
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
              {/* internship_end_date */}
              <DatePicker
                isRequired
                hideTimeZone
                name="internship_end_date"
                showMonthAndYearPickers
                value={internship_end_date}
                onChange={setInternshipEndDate}
                label="Pilih waktu akhir magang"
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
              {/* internship_open_date */}
              <DatePicker
                isRequired
                hideTimeZone
                name="internship_open_date"
                showMonthAndYearPickers
                value={internship_open_date}
                onChange={setInternshipOpenDate}
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
              {/* internship_close_date */}
              <DatePicker
                isRequired
                hideTimeZone
                name="internship_close_date"
                showMonthAndYearPickers
                value={internship_close_date}
                onChange={setInternshipCloseDate}
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
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
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

              {/* semester_ids */}
              {isLoadingSemesters ? (
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
              ) : apiErrorIpks ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorSemesters}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih persyaratan semester"
                  labelPlacement="outside"
                  variant="bordered"
                  name="semester_ids"
                  selectionMode="multiple"
                  selectedKeys={semester_ids}
                  onSelectionChange={setSemesterIds}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {semesters.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    semesters.map((item) => (
                      <SelectItem
                        key={item.semester_id.toString()}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.semester_no}
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}

              {/* Ipk */}
              {isLoadingIpks ? (
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
              ) : apiErrorIpks ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorIpks}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih persyaratan ipk minimal"
                  labelPlacement="outside"
                  variant="bordered"
                  name="ipk_id"
                  selectedKeys={ipk_id}
                  onSelectionChange={setIpkId}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {ipks.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    ipks.map((item) => (
                      <SelectItem
                        key={item.ipk_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.ipk_no}
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}
            </div>

            {/* Biography Information */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {/* gender_ids */}
              {isLoadingGenders ? (
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
              ) : apiErrorGenders ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorGenders}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih persyaratan jenis kelamin"
                  labelPlacement="outside"
                  variant="bordered"
                  name="gender_ids"
                  selectionMode="multiple"
                  selectedKeys={gender_ids}
                  onSelectionChange={setGenderIds}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {genders.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    genders.map((item) => (
                      <SelectItem
                        key={item.gender_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.gender_name}
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}

              {/* religion_ids */}
              {isLoadingReligions ? (
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
              ) : apiErrorReligions ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorReligions}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih persyaratan agama"
                  labelPlacement="outside"
                  variant="bordered"
                  name="religion_ids"
                  selectionMode="multiple"
                  selectedKeys={religion_ids}
                  onSelectionChange={setReligionIds}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {religions.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    religions.map((item) => (
                      <SelectItem
                        key={item.religion_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.religion_name}
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}
            </div>

            {/* Profession Information */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {/* company_id */}
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
                  name="company_id"
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
                  selectedKeys={company_id}
                  onSelectionChange={setCompanyId}
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
                  label="Pilih posisi yang dibutuhkan"
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
            </div>

            {/* Other information */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 w-full">
              {/* internship_type_id */}
              {isLoadingInternshipTypes ? (
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
              ) : apiErrorInternshipTypes ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorInternshipTypes}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih informasi tipe magang"
                  labelPlacement="outside"
                  variant="bordered"
                  name="internship_type_id"
                  selectedKeys={internship_type_id}
                  onSelectionChange={setInternshipTypeId}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {internshipTypes.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    internshipTypes.map((item) => (
                      <SelectItem
                        key={item.internship_type_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.internship_type_name}
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
                  label="Pilih mode magang"
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

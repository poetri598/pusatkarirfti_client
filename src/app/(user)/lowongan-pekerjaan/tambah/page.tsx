"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { Camera, Building, Link21 } from "iconsax-react";

import { Breadcrumbs, BreadcrumbItem, Form, Input, Button, Select, SelectItem, Selection, NumberInput, DatePicker, Avatar, Spinner } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";
import RichTextEditor from "@/components/Custom/RichTextEditor";

// Context
import { useAuth } from "@/context/AuthContext";

// Types
import { AgeItem } from "@/types/age";
import { WeightItem } from "@/types/weight";
import { HeightItem } from "@/types/height";
import { JobTypeItem } from "@/types/jobType";
import { IpkItem } from "@/types/ipk";
import { CompanyItem } from "@/types/company";
import { StatusItem } from "@/types/status";
import { CityItem } from "@/types/city";
import { CountryItem } from "@/types/country";
import { EducationItem } from "@/types/education";
import { ExperienceItem } from "@/types/experience";
import { GenderItem } from "@/types/gender";
import { MaritalStatusItem } from "@/types/maritalStatus";
import { ModeItem } from "@/types/mode";
import { PositionItem } from "@/types/position";
import { ProgramStudyItem } from "@/types/programStudy";
import { ProvinceItem } from "@/types/province";
import { ReligionItem } from "@/types/religion";

// Services
import { getAgeAll } from "@/services/age";
import { getWeightAll } from "@/services/weight";
import { getHeightAll } from "@/services/height";
import { getJobTypeAll } from "@/services/jobType";
import { getIpkAll } from "@/services/ipk";
import { getCompanyAll } from "@/services/company";
import { getStatusAll } from "@/services/status";
import { getCityAll } from "@/services/city";
import { getCountryAll } from "@/services/country";
import { getEducationAll } from "@/services/education";
import { getExperienceAll } from "@/services/experience";
import { getGenderAll } from "@/services/gender";
import { getMaritalStatusAll } from "@/services/maritalStatus";
import { getModeAll } from "@/services/mode";
import { getPositionAll } from "@/services/position";
import { getProgramStudyAll } from "@/services/programStudy";
import { getProvinceAll } from "@/services/province";
import { getReligionAll } from "@/services/religion";
import { createJob } from "@/services/job";

// Utils
import { ZonedDateTime, now, getLocalTimeZone } from "@internationalized/date";
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { appendSingle, appendMultiple } from "@/utils/formDataHelpers";
import { formatZonedDateTime } from "@/utils/time";

export default function page() {
  const router = useRouter();
  const { user } = useAuth();
  // ages
  const [ages, setAges] = useState<AgeItem[]>([]);
  const [age_min_id, setAgeMinId] = useState<Selection>(new Set([]));
  const [age_max_id, setAgeMaxId] = useState<Selection>(new Set([]));
  const [isLoadingAges, setIsLoadingAges] = useState(true);
  const [apiErrorAges, setApiErrorAges] = useState<string | null>(null);
  // weights
  const [weights, setWeights] = useState<WeightItem[]>([]);
  const [weight_min_id, setWeightMinId] = useState<Selection>(new Set([]));
  const [weight_max_id, setWeightMaxId] = useState<Selection>(new Set([]));
  const [isLoadingWeights, setIsLoadingWeights] = useState(true);
  const [apiErrorWeights, setApiErrorWeights] = useState<string | null>(null);
  // heights
  const [heights, setHeights] = useState<HeightItem[]>([]);
  const [height_min_id, setHeightMinId] = useState<Selection>(new Set([]));
  const [height_max_id, setHeightMaxId] = useState<Selection>(new Set([]));
  const [isLoadingHeights, setIsLoadingHeights] = useState(true);
  const [apiErrorHeights, setApiErrorHeights] = useState<string | null>(null);
  // jobTypes
  const [jobTypes, setJobTypes] = useState<JobTypeItem[]>([]);
  const [job_type_id, setJobTypeId] = useState<Selection>(new Set([]));
  const [isLoadingJobTypes, setIsLoadingJobTypes] = useState(true);
  const [apiErrorJobTypes, setApiErrorJobTypes] = useState<string | null>(null);
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
  const [status_id, setStatusId] = useState<Selection>(new Set(["1"]));
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
  // experiences
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [experience_ids, setExperienceIds] = useState<Selection>(new Set([]));
  const [isLoadingExperiences, setIsLoadingExperiences] = useState(true);
  const [apiErrorExperiences, setApiErrorExperiences] = useState<string | null>(null);
  // genders
  const [genders, setGenders] = useState<GenderItem[]>([]);
  const [gender_ids, setGenderIds] = useState<Selection>(new Set([]));
  const [isLoadingGenders, setIsLoadingGenders] = useState(true);
  const [apiErrorGenders, setApiErrorGenders] = useState<string | null>(null);
  // maritalStatuses
  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatusItem[]>([]);
  const [marital_status_ids, setMaritalStatusIds] = useState<Selection>(new Set([]));
  const [isLoadingMaritalStatuses, setIsLoadingMaritalStatuses] = useState(true);
  const [apiErrorMaritalStatuses, setApiErrorMaritalStatuses] = useState<string | null>(null);
  // modes
  const [modes, setModes] = useState<ModeItem[]>([]);
  const [position_ids, setPositionIds] = useState<Selection>(new Set([]));
  const [mode_ids, setModeIds] = useState<Selection>(new Set([]));
  const [isLoadingModes, setIsLoadingModes] = useState(true);
  const [apiErrorModes, setApiErrorModes] = useState<string | null>(null);
  // positions
  const [positions, setPositions] = useState<PositionItem[]>([]);
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

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [
        createServiceFetcher(getAgeAll, setAges, setApiErrorAges, setIsLoadingAges),
        createServiceFetcher(getHeightAll, setHeights, setApiErrorHeights, setIsLoadingHeights),
        createServiceFetcher(getWeightAll, setWeights, setApiErrorWeights, setIsLoadingWeights),
        createServiceFetcher(getJobTypeAll, setJobTypes, setApiErrorJobTypes, setIsLoadingJobTypes),
        createServiceFetcher(getIpkAll, setIpks, setApiErrorIpks, setIsLoadingIpks),
        createServiceFetcher(getCompanyAll, setCompanies, setApiErrorCompanies, setIsLoadingCompanies),
        createServiceFetcher(getStatusAll, setStatuses, setApiErrorStatuses, setIsLoadingStatuses),
        createServiceFetcher(getCityAll, setCities, setApiErrorCities, setIsLoadingCities),
        createServiceFetcher(getCountryAll, setCountries, setApiErrorCountries, setIsLoadingCountries),
        createServiceFetcher(getEducationAll, setEducations, setApiErrorEducations, setIsLoadingEducations),
        createServiceFetcher(getExperienceAll, setExperiences, setApiErrorExperiences, setIsLoadingExperiences),
        createServiceFetcher(getGenderAll, setGenders, setApiErrorGenders, setIsLoadingGenders),
        createServiceFetcher(getMaritalStatusAll, setMaritalStatuses, setApiErrorMaritalStatuses, setIsLoadingMaritalStatuses),
        createServiceFetcher(getModeAll, setModes, setApiErrorModes, setIsLoadingModes),
        createServiceFetcher(getPositionAll, setPositions, setApiErrorPositions, setIsLoadingPositions),
        createServiceFetcher(getProgramStudyAll, setProgramStudies, setApiErrorProgramStudies, setIsLoadingProgramStudies),
        createServiceFetcher(getProvinceAll, setProvinces, setApiErrorProvinces, setIsLoadingProvinces),
        createServiceFetcher(getReligionAll, setReligions, setApiErrorReligions, setIsLoadingReligions),
      ];

      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  // Image
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [job_img, setJobImg] = useState<string>("/tambah-bg.png"); // preview
  const [job_img_file, setJobImgFile] = useState<File | null>(null); // file asli
  const [job_name, setJobName] = useState<string>("");
  const [job_desc, setJobDesc] = useState<string>("");
  const [job_salary_min, setJobSalaryMin] = useState<number>(0);
  const [job_salary_max, setJobSalaryMax] = useState<number>(0);
  const [job_location, setJobLocation] = useState<string>("");
  const [job_link, setJobLink] = useState<string>("");
  const [job_open_date, setJobOpenDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [job_close_date, setJobCloseDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [loading, setLoading] = useState(false);

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
    setJobImgFile(file);
    // Simpan preview (string base64)
    const reader = new FileReader();
    reader.onloadend = () => {
      setJobImg(reader.result as string);
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
    setLoading(true);
    const formData = new FormData();
    if (job_img_file) formData.append("job_img", job_img_file);
    formData.append("user_id", String(user?.user_id));
    formData.append("job_name", job_name);
    formData.append("job_desc", job_desc);
    formData.append("job_salary_min", String(job_salary_min));
    formData.append("job_salary_max", String(job_salary_max));
    formData.append("job_location", job_location);
    formData.append("job_link", job_link);
    if (job_open_date) formData.append("job_open_date", formatZonedDateTime(job_open_date));
    if (job_close_date) formData.append("job_close_date", formatZonedDateTime(job_close_date));
    appendSingle(formData, "age_min_id", age_min_id);
    appendSingle(formData, "age_max_id", age_max_id);
    appendSingle(formData, "weight_min_id", weight_min_id);
    appendSingle(formData, "weight_max_id", weight_max_id);
    appendSingle(formData, "height_min_id", height_min_id);
    appendSingle(formData, "height_max_id", height_max_id);
    appendSingle(formData, "job_type_id", job_type_id);
    appendSingle(formData, "ipk_id", ipk_id);
    appendSingle(formData, "company_id", company_id);
    appendSingle(formData, "status_id", status_id);
    appendMultiple(formData, "city_ids", city_ids);
    appendMultiple(formData, "country_ids", country_ids);
    appendMultiple(formData, "education_ids", education_ids);
    appendMultiple(formData, "experience_ids", experience_ids);
    appendMultiple(formData, "gender_ids", gender_ids);
    appendMultiple(formData, "marital_status_ids", marital_status_ids);
    appendMultiple(formData, "mode_ids", mode_ids);
    appendMultiple(formData, "position_ids", position_ids);
    appendMultiple(formData, "program_study_ids", program_study_ids);
    appendMultiple(formData, "province_ids", province_ids);
    appendMultiple(formData, "religion_ids", religion_ids);
    const { success, error } = await createJob(formData);
    if (success) {
      await showSuccessDialog();
      router.push("/lowongan-pekerjaan");
    } else {
      await showErrorDialog(error);
    }

    setLoading(false);
  };

  return (
    <>
      <>
        <main className="xs:p-0 md:p-8  flex flex-col xs:gap-2 md:gap-8 overflow-hidden">
          {" "}
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
          {/*  Breadcrumb */}
          <Breadcrumbs
            className="text-xs text-text-secondary"
            itemClasses={{
              item: "data-[current=true]:text-primary-primary cursor-pointer text-xs",
            }}
          >
            <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
            <BreadcrumbItem href="/lowongan-pekerjaan">Lowongan Pekerjaan</BreadcrumbItem>
            <BreadcrumbItem href="/lowongan-pekerjaan/tambah">Tambah lowongan Pekerjaan</BreadcrumbItem>
          </Breadcrumbs>
          {/* Section Title */}
          <TitleSectionAdmin label="Tambah lowongan pekerjaan" />
          {/* Form */}
          <Form className="flex flex-col items-end xs:gap-2 md:gap-8" onSubmit={handleSubmit}>
            {/* job_img */}
            <div className="flex flex-col items-center gap-1 w-full">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md group aspect-square">
                <div className="w-full h-full rounded-medium border-2 border-dashed border-black overflow-hidden relative">
                  {job_img ? (
                    <img src={job_img} alt="Preview" className="w-full h-full object-contain rounded-medium" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm rounded-medium">Belum ada gambar</div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-medium transition">
                    <p className="text-white text-sm">{job_img ? "Ubah gambar" : "Pilih gambar"}</p>
                  </div>
                </div>

                <button onClick={handleIconClick} type="button" className="absolute bottom-0 right-0 bg-white p-2 rounded-medium shadow-md hover:scale-105 transition">
                  <Camera variant="Bold" color="currentColor" size={20} className="text-primary-primary" />
                </button>

                {/* Input tersembunyi */}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" name="job_img" />
              </div>

              {/* Keterangan maksimal ukuran */}
              <p className="text-[11px] text-gray-500 mt-1 text-center">
                Ukuran gambar maksimal <span className="font-semibold text-gray-600">5MB</span>
              </p>
            </div>

            {/* job_name  */}
            <Input
              isRequired
              label="Masukkan judul"
              labelPlacement="outside"
              name="job_name"
              value={job_name}
              onValueChange={setJobName}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            {/* job_desc  */}
            <RichTextEditor value={job_desc} onChange={setJobDesc} placeholder="Masukkan deskripsi pekerjaan" />

            {/* Number Information */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 w-full">
              {/* age_min_id */}
              {isLoadingAges ? (
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
              ) : apiErrorAges ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorAges}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih persyaratan umur minimum"
                  labelPlacement="outside"
                  variant="bordered"
                  name="age_min_id"
                  selectedKeys={age_min_id}
                  onSelectionChange={setAgeMinId}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {ages.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    ages.map((item) => (
                      <SelectItem
                        key={item.age_id}
                        textValue={`${item.age_no} Tahun`}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.age_no} Tahun
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}

              {/* age_max_id */}
              {isLoadingAges ? (
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
              ) : apiErrorAges ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorAges}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih persyaratan umur maksimum"
                  labelPlacement="outside"
                  variant="bordered"
                  name="age_max_id"
                  selectedKeys={age_max_id}
                  onSelectionChange={setAgeMaxId}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {ages.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    ages.map((item) => (
                      <SelectItem
                        key={item.age_id}
                        textValue={`${item.age_no} Tahun`}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.age_no} Tahun
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}

              {/* weight_min_id */}
              {isLoadingWeights ? (
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
              ) : apiErrorWeights ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorWeights}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih persyaratan berat badan minimum"
                  labelPlacement="outside"
                  variant="bordered"
                  name="weight_min_id"
                  selectedKeys={weight_min_id}
                  onSelectionChange={setWeightMinId}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {weights.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    weights.map((item) => (
                      <SelectItem
                        key={item.weight_id}
                        textValue={`${item.weight_no} kg`}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.weight_no} kg
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}

              {/* weight_max_id */}
              {isLoadingWeights ? (
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
              ) : apiErrorWeights ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorWeights}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih persyaratan berat badan maksimum"
                  labelPlacement="outside"
                  variant="bordered"
                  name="weight_max_id"
                  selectedKeys={weight_max_id}
                  onSelectionChange={setWeightMaxId}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {weights.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    weights.map((item) => (
                      <SelectItem
                        key={item.weight_id}
                        textValue={`${item.weight_no} kg`}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.weight_no} kg
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}

              {/* height_min_id */}
              {isLoadingHeights ? (
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
              ) : apiErrorHeights ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorHeights}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih persyaratan tinggi badan minimum"
                  labelPlacement="outside"
                  variant="bordered"
                  name="height_min_id"
                  selectedKeys={height_min_id}
                  onSelectionChange={setHeightMinId}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {heights.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    heights.map((item) => (
                      <SelectItem
                        key={item.height_id}
                        textValue={`${item.height_no} cm`}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.height_no} cm
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}

              {/* height_max_id */}
              {isLoadingHeights ? (
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
              ) : apiErrorHeights ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorHeights}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih persyaratan tinggi badan maksimum"
                  labelPlacement="outside"
                  variant="bordered"
                  name="height_max_id"
                  selectedKeys={height_max_id}
                  onSelectionChange={setHeightMaxId}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {heights.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    heights.map((item) => (
                      <SelectItem
                        key={item.height_id}
                        textValue={`${item.height_no} cm`}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.height_no} cm
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}
            </div>

            {/* Cost Information */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2  gap-4 w-full">
              {/* job_salary_min */}
              <NumberInput
                isRequired
                label="Masukkan upah minimum"
                name="job_salary_min"
                value={job_salary_min}
                onValueChange={setJobSalaryMin}
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

              {/* job_salary_max */}
              <NumberInput
                isRequired
                label="Masukkan upah maksimum"
                name="job_salary_max"
                value={job_salary_max}
                onValueChange={setJobSalaryMax}
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
              {" "}
              {/* job_location  */}
              <Input
                isRequired
                label="Masukkan lokasi pendaftaran"
                labelPlacement="outside"
                name="job_location"
                value={job_location}
                onValueChange={setJobLocation}
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
              {/* job_link  */}
              <Input
                isRequired
                label="Masukkan link pendaftaran"
                labelPlacement="outside"
                name="job_link"
                value={job_link}
                onValueChange={setJobLink}
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
              {/* job_open_at */}
              <DatePicker
                isRequired
                hideTimeZone
                name="job_open_date"
                showMonthAndYearPickers
                value={job_open_date}
                onChange={setJobOpenDate}
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
              {/* job_close_at */}
              <DatePicker
                isRequired
                hideTimeZone
                name="job_close_date"
                showMonthAndYearPickers
                value={job_close_date}
                onChange={setJobCloseDate}
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
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
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
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 w-full">
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

              {/* marital_status_ids */}
              {isLoadingMaritalStatuses ? (
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
              ) : apiErrorMaritalStatuses ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorMaritalStatuses}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih persyaratan status perkawinan"
                  labelPlacement="outside"
                  variant="bordered"
                  name="marital_status_ids"
                  selectionMode="multiple"
                  selectedKeys={marital_status_ids}
                  onSelectionChange={setMaritalStatusIds}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {maritalStatuses.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    maritalStatuses.map((item) => (
                      <SelectItem
                        key={item.marital_status_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.marital_status_name}
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}

              {/* experience_ids */}
              {isLoadingExperiences ? (
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
              ) : apiErrorExperiences ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorExperiences}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih persyaratan pengalaman"
                  labelPlacement="outside"
                  variant="bordered"
                  name="experience_ids"
                  selectionMode="multiple"
                  selectedKeys={experience_ids}
                  onSelectionChange={setExperienceIds}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {experiences.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    experiences.map((item) => (
                      <SelectItem
                        key={item.experience_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.experience_name}
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
            <div className="grid xs:grid-cols-1 sm:grid-cols-2  gap-4 w-full">
              {/* job_type_id */}
              {isLoadingJobTypes ? (
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
              ) : apiErrorJobTypes ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorJobTypes}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih informasi tipe pekerjaan"
                  labelPlacement="outside"
                  variant="bordered"
                  name="job_type_id"
                  selectedKeys={job_type_id}
                  onSelectionChange={setJobTypeId}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {jobTypes.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    jobTypes.map((item) => (
                      <SelectItem
                        key={item.job_type_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.job_type_name}
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
                  label="Pilih mode pekerjaan"
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

            <Button type="submit" className="login">
              Simpan
            </Button>
          </Form>
        </main>
      </>
    </>
  );
}

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
import { TrainingTypeItem } from "@/types/trainingType";
import { CompanyItem } from "@/types/company";
import { StatusItem } from "@/types/status";
import { CityItem } from "@/types/city";
import { CountryItem } from "@/types/country";
import { EducationItem } from "@/types/education";
import { ModeItem } from "@/types/mode";
import { ProgramStudyItem } from "@/types/programStudy";
import { ProvinceItem } from "@/types/province";
import { SemesterItem } from "@/types/semester";
import { SkillItem } from "@/types/skill";

// Services
import { getTrainingTypeAll } from "@/services/trainingType";
import { getCompanyAll } from "@/services/company";
import { getStatusAll } from "@/services/status";
import { getCityAll } from "@/services/city";
import { getCountryAll } from "@/services/country";
import { getEducationAll } from "@/services/education";
import { getModeAll } from "@/services/mode";
import { getProgramStudyAll } from "@/services/programStudy";
import { getProvinceAll } from "@/services/province";
import { getSemesterAll } from "@/services/semester";
import { getSkillAll } from "@/services/skill";
import { createTraining } from "@/services/training";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { appendSingle, appendMultiple } from "@/utils/formDataHelpers";
import { ZonedDateTime, now, getLocalTimeZone } from "@internationalized/date";

export default function page() {
  const router = useRouter();
  const { user } = useAuth();
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
  // modes
  const [modes, setModes] = useState<ModeItem[]>([]);
  const [mode_ids, setModeIds] = useState<Selection>(new Set([]));
  const [isLoadingModes, setIsLoadingModes] = useState(true);
  const [apiErrorModes, setApiErrorModes] = useState<string | null>(null);
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
  // semesters
  const [semesters, setSemesters] = useState<SemesterItem[]>([]);
  const [semester_ids, setSemesterIds] = useState<Selection>(new Set([]));
  const [isLoadingSemesters, setIsLoadingSemesters] = useState(true);
  const [apiErrorSemesters, setApiErrorSemesters] = useState<string | null>(null);
  // skills
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [skill_ids, setSkillIds] = useState<Selection>(new Set([]));
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [apiErrorSkills, setApiErrorSkills] = useState<string | null>(null);
  // trainingTypes
  const [trainingTypes, setTrainingTypes] = useState<TrainingTypeItem[]>([]);
  const [training_type_ids, setTrainingTypeIds] = useState<Selection>(new Set([]));
  const [isLoadingTrainingTypes, setIsLoadingTrainingTypes] = useState(true);
  const [apiErrorTrainingTypes, setApiErrorTrainingTypes] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [
        createServiceFetcher(getCompanyAll, setCompanies, setApiErrorCompanies, setIsLoadingCompanies),
        createServiceFetcher(getStatusAll, setStatuses, setApiErrorStatuses, setIsLoadingStatuses),
        createServiceFetcher(getCityAll, setCities, setApiErrorCities, setIsLoadingCities),
        createServiceFetcher(getCountryAll, setCountries, setApiErrorCountries, setIsLoadingCountries),
        createServiceFetcher(getEducationAll, setEducations, setApiErrorEducations, setIsLoadingEducations),
        createServiceFetcher(getModeAll, setModes, setApiErrorModes, setIsLoadingModes),
        createServiceFetcher(getProgramStudyAll, setProgramStudies, setApiErrorProgramStudies, setIsLoadingProgramStudies),
        createServiceFetcher(getProvinceAll, setProvinces, setApiErrorProvinces, setIsLoadingProvinces),
        createServiceFetcher(getSemesterAll, setSemesters, setApiErrorSemesters, setIsLoadingSemesters),
        createServiceFetcher(getSkillAll, setSkills, setApiErrorSkills, setIsLoadingSkills),
        createServiceFetcher(getTrainingTypeAll, setTrainingTypes, setApiErrorTrainingTypes, setIsLoadingTrainingTypes),
      ];

      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  // Image
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [training_img, setTrainingImg] = useState<string>("/tambah-bg.png"); // preview
  const [training_img_file, setTrainingImgFile] = useState<File | null>(null); // file asli
  const [training_name, setTrainingName] = useState<string>("");
  const [training_desc, setTrainingDesc] = useState<string>("");
  const [training_price, setTrainingPrice] = useState<number>(0);
  const [training_location, setTrainingLocation] = useState<string>("");
  const [training_link, setTrainingLink] = useState<string>("");
  const [training_date, setTrainingDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [training_open_date, setTrainingOpenDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [training_close_date, setTrainingCloseDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));

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
    setTrainingImgFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setTrainingImg(reader.result as string);
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
    formData.append("training_name", training_name);
    if (training_img_file) formData.append("training_img", training_img_file);
    formData.append("training_desc", training_desc);
    formData.append("training_location", training_location);
    formData.append("training_link", training_link);
    if (training_date) formData.append("training_date", training_date.toAbsoluteString());
    if (training_open_date) formData.append("training_open_date", training_open_date.toAbsoluteString());
    if (training_close_date) formData.append("training_close_date", training_close_date.toAbsoluteString());
    formData.append("training_price", String(training_price));
    appendSingle(formData, "company_id", company_id);
    formData.append("user_id", String(user?.user_id));
    appendSingle(formData, "status_id", status_id);
    appendMultiple(formData, "city_ids", city_ids);
    appendMultiple(formData, "country_ids", country_ids);
    appendMultiple(formData, "education_ids", education_ids);
    appendMultiple(formData, "mode_ids", mode_ids);
    appendMultiple(formData, "program_study_ids", program_study_ids);
    appendMultiple(formData, "province_ids", province_ids);
    appendMultiple(formData, "semester_ids", semester_ids);
    appendMultiple(formData, "skill_ids", skill_ids);
    appendMultiple(formData, "training_type_ids", training_type_ids);
    const { success, error } = await createTraining(formData);
    setLoading(true);
    if (success) {
      await showSuccessDialog();
      router.push("/pelatihan");
    } else {
      await showErrorDialog(error);
    }
    setLoading(false);
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
          {/*  Breadcrumb */}
          <Breadcrumbs
            className="text-xs text-text-secondary"
            itemClasses={{
              item: "data-[current=true]:text-primary-primary cursor-pointer text-xs",
            }}
          >
            <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
            <BreadcrumbItem href="/pelatihan">Pelatihan</BreadcrumbItem>
            <BreadcrumbItem href="/pelatihan/tambah">Tambah Pelatihan</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Tambah Pelatihan" />

          {/* Form */}
          <Form className="flex flex-col items-end gap-4" onSubmit={handleSubmit}>
            {/* training_img */}
            <div className="flex flex-col items-center gap-1 w-full">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md group aspect-square">
                <div className="w-full h-full rounded-medium border-2 border-dashed border-black overflow-hidden relative">
                  {training_img ? (
                    <img src={training_img} alt="Preview" className="w-full h-full object-contain rounded-medium" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm rounded-medium">Belum ada gambar</div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-medium transition">
                    <p className="text-white text-sm">{training_img ? "Ubah gambar" : "Pilih gambar"}</p>
                  </div>
                </div>

                <button onClick={handleIconClick} type="button" className="absolute bottom-0 right-0 bg-white p-2 rounded-medium shadow-md hover:scale-105 transition">
                  <Camera variant="Bold" color="currentColor" size={20} className="text-primary-primary" />
                </button>

                {/* Input tersembunyi */}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" name="training_img" />
              </div>

              {/* Keterangan maksimal ukuran */}
              <p className="text-[11px] text-gray-500 mt-1 text-center">
                Ukuran gambar maksimal <span className="font-semibold text-gray-600">5MB</span>
              </p>
            </div>

            {/* training_name  */}
            <Input
              isRequired
              label="Masukkan judul"
              labelPlacement="outside"
              name="training_name"
              value={training_name}
              onValueChange={setTrainingName}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            {/* training_desc  */}
            <RichTextEditor key={training_desc} value={training_desc} onChange={setTrainingDesc} placeholder="Masukkan deskripsi magang" />

            {/* Cost Information */}
            <div className="grid xs:grid-cols-1   gap-4 w-full">
              {/* training_price*/}
              <NumberInput
                isRequired
                label="Masukkan biaya mengikuti pelatihan"
                name="training_price"
                value={training_price}
                onValueChange={setTrainingPrice}
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
              {/* training_location  */}
              <Input
                isRequired
                label="Masukkan lokasi pendaftaran"
                labelPlacement="outside"
                name="training_location"
                value={training_location}
                onValueChange={setTrainingLocation}
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
              {/* training_link  */}
              <Input
                isRequired
                label="Masukkan link pendaftaran"
                labelPlacement="outside"
                name="training_link"
                value={training_link}
                onValueChange={setTrainingLink}
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
              {/* training_date */}
              <DatePicker
                isRequired
                hideTimeZone
                name="training_date"
                showMonthAndYearPickers
                value={training_date}
                onChange={setTrainingDate}
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
              {/* training_open_date */}
              <DatePicker
                isRequired
                hideTimeZone
                name="training_open_date"
                showMonthAndYearPickers
                value={training_open_date}
                onChange={setTrainingOpenDate}
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
              {/* training_close_date */}
              <DatePicker
                isRequired
                hideTimeZone
                name="training_close_date"
                showMonthAndYearPickers
                value={training_close_date}
                onChange={setTrainingCloseDate}
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
              ) : apiErrorSemesters ? (
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

              {/* skill_ids */}
              {isLoadingSkills ? (
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
              ) : apiErrorSkills ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorSkills}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih skill"
                  labelPlacement="outside"
                  variant="bordered"
                  name="skill_ids"
                  selectionMode="multiple"
                  selectedKeys={skill_ids}
                  onSelectionChange={setSkillIds}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {skills.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    skills.map((item) => (
                      <SelectItem
                        key={item.skill_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.skill_name}
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}
            </div>

            {/* Other information */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2  gap-4 w-full">
              {/* training_type_id */}
              {isLoadingTrainingTypes ? (
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
              ) : apiErrorTrainingTypes ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorTrainingTypes}</p>
              ) : (
                <Select
                  isRequired
                  label="Pilih tipe pelatihan"
                  labelPlacement="outside"
                  variant="bordered"
                  name="training_type_id"
                  selectionMode="multiple"
                  selectedKeys={training_type_ids}
                  onSelectionChange={setTrainingTypeIds}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {trainingTypes.length === 0 ? (
                    <SelectItem key="nodata" isDisabled>
                      Data belum tersedia
                    </SelectItem>
                  ) : (
                    trainingTypes.map((item) => (
                      <SelectItem
                        key={item.training_type_id}
                        classNames={{
                          title: "text-xs hover:!text-primary-primary",
                          selectedIcon: "text-primary-primary",
                        }}
                      >
                        {item.training_type_name}
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

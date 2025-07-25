"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Components
import { Sms, Eye, EyeSlash } from "iconsax-react";
import Logo from "@/components/HeaderFooter/Logo";
import { Form, Link, Avatar, Button, Input, DatePicker, Select, SelectItem, Selection, Switch, Spinner } from "@heroui/react";
import { ZonedDateTime, now, getLocalTimeZone } from "@internationalized/date";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { AgeItem } from "@/types/age";
import { WeightItem } from "@/types/weight";
import { HeightItem } from "@/types/height";
import { EducationItem } from "@/types/education";
import { ProgramStudyItem } from "@/types/programStudy";
import { SemesterItem } from "@/types/semester";
import { IpkItem } from "@/types/ipk";
import { CityItem } from "@/types/city";
import { ProvinceItem } from "@/types/province";
import { CountryItem } from "@/types/country";
import { GenderItem } from "@/types/gender";
import { ReligionItem } from "@/types/religion";
import { MaritalStatusItem } from "@/types/maritalStatus";
import { PositionItem } from "@/types/position";
import { CompanyItem } from "@/types/company";
import { RoleItem } from "@/types/role";
import { StatusItem } from "@/types/status";

// Services
import { getAgeAll } from "@/services/age";
import { getWeightAll } from "@/services/weight";
import { getHeightAll } from "@/services/height";
import { getEducationAll } from "@/services/education";
import { getProgramStudyAll } from "@/services/programStudy";
import { getSemesterAll } from "@/services/semester";
import { getIpkAll } from "@/services/ipk";
import { getCityAll } from "@/services/city";
import { getProvinceAll } from "@/services/province";
import { getCountryAll } from "@/services/country";
import { getGenderAll } from "@/services/gender";
import { getReligionAll } from "@/services/religion";
import { getMaritalStatusAll } from "@/services/maritalStatus";
import { getPositionAll, createPosition } from "@/services/position";
import { getCompanyAll, createCompany } from "@/services/company";
import { getRoleAll } from "@/services/role";
import { getStatusAll } from "@/services/status";
import { createUser } from "@/services/user";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { appendSingle } from "@/utils/formDataHelpers";

type Props = {
  className?: string;
};

export default function SectionLeft(props: Props) {
  const { className } = props;
  const router = useRouter();
  // Age
  const [ages, setAges] = useState<AgeItem[]>([]);
  const [age_id, setAgeId] = useState<Selection>(new Set([]));
  const [isLoadingAges, setIsLoadingAges] = useState(true);
  const [apiErrorAges, setApiErrorAges] = useState<string | null>(null);
  // City
  const [cities, setCities] = useState<CityItem[]>([]);
  const [city_id, setCityId] = useState<Selection>(new Set([]));
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [apiErrorCities, setApiErrorCities] = useState<string | null>(null);
  // Province
  const [provinces, setProvinces] = useState<ProvinceItem[]>([]);
  const [province_id, setProvinceId] = useState<Selection>(new Set([]));
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
  const [apiErrorProvinces, setApiErrorProvinces] = useState<string | null>(null);
  // Country
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [country_id, setCountryId] = useState<Selection>(new Set([]));
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [apiErrorCountries, setApiErrorCountries] = useState<string | null>(null);
  // Company (dream + current)
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [dream_company_id, setDreamCompanyId] = useState<Selection>(new Set([]));
  const [current_company_id, setCurrentCompanyId] = useState<Selection>(new Set([]));
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [apiErrorCompanies, setApiErrorCompanies] = useState<string | null>(null);
  // Education
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [education_id, setEducationId] = useState<Selection>(new Set([]));
  const [isLoadingEducations, setIsLoadingEducations] = useState(true);
  const [apiErrorEducations, setApiErrorEducations] = useState<string | null>(null);
  // Gender
  const [genders, setGenders] = useState<GenderItem[]>([]);
  const [gender_id, setGenderId] = useState<Selection>(new Set([]));
  const [isLoadingGenders, setIsLoadingGenders] = useState(true);
  const [apiErrorGenders, setApiErrorGenders] = useState<string | null>(null);
  // Height
  const [heights, setHeights] = useState<HeightItem[]>([]);
  const [height_id, setHeightId] = useState<Selection>(new Set([]));
  const [isLoadingHeights, setIsLoadingHeights] = useState(true);
  const [apiErrorHeights, setApiErrorHeights] = useState<string | null>(null);
  // IPK
  const [ipks, setIpks] = useState<IpkItem[]>([]);
  const [ipk_id, setIpkId] = useState<Selection>(new Set([]));
  const [isLoadingIpks, setIsLoadingIpks] = useState(true);
  const [apiErrorIpks, setApiErrorIpks] = useState<string | null>(null);
  // Marital Status
  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatusItem[]>([]);
  const [marital_status_id, setMaritalStatusId] = useState<Selection>(new Set([]));
  const [isLoadingMaritalStatuses, setIsLoadingMaritalStatuses] = useState(true);
  const [apiErrorMaritalStatuses, setApiErrorMaritalStatuses] = useState<string | null>(null);
  // Position (dream + current)
  const [positions, setPositions] = useState<PositionItem[]>([]);
  const [dream_position_id, setDreamPositionId] = useState<Selection>(new Set([]));
  const [current_position_id, setCurrentPositionId] = useState<Selection>(new Set([]));
  const [isLoadingPositions, setIsLoadingPositions] = useState(true);
  const [apiErrorPositions, setApiErrorPositions] = useState<string | null>(null);
  // Program Study
  const [programStudies, setProgramStudies] = useState<ProgramStudyItem[]>([]);
  const [program_study_id, setProgramStudyId] = useState<Selection>(new Set([]));
  const [isLoadingProgramStudies, setIsLoadingProgramStudies] = useState(true);
  const [apiErrorProgramStudies, setApiErrorProgramStudies] = useState<string | null>(null);
  // Religion
  const [religions, setReligions] = useState<ReligionItem[]>([]);
  const [religion_id, setReligionId] = useState<Selection>(new Set([]));
  const [isLoadingReligions, setIsLoadingReligions] = useState(true);
  const [apiErrorReligions, setApiErrorReligions] = useState<string | null>(null);
  // Role
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [role_id, setRoleId] = useState<Selection>(new Set(["3"]));
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  const [apiErrorRoles, setApiErrorRoles] = useState<string | null>(null);
  // Semester
  const [semesters, setSemesters] = useState<SemesterItem[]>([]);
  const [semester_id, setSemesterId] = useState<Selection>(new Set([]));
  const [isLoadingSemesters, setIsLoadingSemesters] = useState(true);
  const [apiErrorSemesters, setApiErrorSemesters] = useState<string | null>(null);
  // Status
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [status_id, setStatusId] = useState<Selection>(new Set(["1"]));
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);
  const [apiErrorStatuses, setApiErrorStatuses] = useState<string | null>(null);
  // Weight
  const [weights, setWeights] = useState<WeightItem[]>([]);
  const [weight_id, setWeightId] = useState<Selection>(new Set([]));
  const [isLoadingWeights, setIsLoadingWeights] = useState(true);
  const [apiErrorWeights, setApiErrorWeights] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [
        createServiceFetcher(getAgeAll, setAges, setApiErrorAges, setIsLoadingAges),
        createServiceFetcher(getCityAll, setCities, setApiErrorCities, setIsLoadingCities),
        createServiceFetcher(getProvinceAll, setProvinces, setApiErrorProvinces, setIsLoadingProvinces),
        createServiceFetcher(getCountryAll, setCountries, setApiErrorCountries, setIsLoadingCountries),
        createServiceFetcher(getCompanyAll, setCompanies, setApiErrorCompanies, setIsLoadingCompanies),
        createServiceFetcher(getEducationAll, setEducations, setApiErrorEducations, setIsLoadingEducations),
        createServiceFetcher(getGenderAll, setGenders, setApiErrorGenders, setIsLoadingGenders),
        createServiceFetcher(getHeightAll, setHeights, setApiErrorHeights, setIsLoadingHeights),
        createServiceFetcher(getIpkAll, setIpks, setApiErrorIpks, setIsLoadingIpks),
        createServiceFetcher(getPositionAll, setPositions, setApiErrorPositions, setIsLoadingPositions),
        createServiceFetcher(getMaritalStatusAll, setMaritalStatuses, setApiErrorMaritalStatuses, setIsLoadingMaritalStatuses),
        createServiceFetcher(getProgramStudyAll, setProgramStudies, setApiErrorProgramStudies, setIsLoadingProgramStudies),
        createServiceFetcher(getReligionAll, setReligions, setApiErrorReligions, setIsLoadingReligions),
        createServiceFetcher(getRoleAll, setRoles, setApiErrorRoles, setIsLoadingRoles),
        createServiceFetcher(getSemesterAll, setSemesters, setApiErrorSemesters, setIsLoadingSemesters),
        createServiceFetcher(getStatusAll, setStatuses, setApiErrorStatuses, setIsLoadingStatuses),
        createServiceFetcher(getWeightAll, setWeights, setApiErrorWeights, setIsLoadingWeights),
      ];

      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  const [user_fullname, setUserFullname] = useState("");
  const [user_name, setUserName] = useState("");
  const [user_nim, setUserNim] = useState("");
  const [user_phone, setUserPhone] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [user_birthdate, setUserBirthDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [user_admission_date, setUserAdmissionDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [user_graduation_date, setUserGraduationDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [user_is_employed, setUserIsEmployed] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [user_password_confirm, setUserPasswordConfirm] = useState("");

  const [isAddingNewDreamCompany, setIsAddingNewDreamCompany] = useState(false);
  const [newDreamCompanyName, setNewDreamCompanyName] = useState("");

  const [isAddingNewCurrentCompany, setIsAddingNewCurrentCompany] = useState(false);
  const [newCurrentCompanyName, setNewCurrentCompanyName] = useState("");

  const [isAddingNewDreamPosition, setIsAddingNewDreamPosition] = useState(false);
  const [newDreamPositionName, setNewDreamPositionName] = useState("");

  const [isAddingNewCurrentPosition, setIsAddingNewCurrentPosition] = useState(false);
  const [newCurrentPositionName, setNewCurrentPositionName] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);

    let finalDreamPositionId = "";
    let finalCurrentPositionId = "";
    let finalDreamCompanyId = "";
    let finalCurrentCompanyId = "";

    if (isAddingNewDreamPosition && newDreamPositionName) {
      const formData = new FormData();
      formData.append("position_name", newDreamPositionName);
      const { success, data, error } = await createPosition(formData);
      if (success && data) {
        finalDreamPositionId = String(data.position_id);
        setDreamPositionId(new Set([String(data.position_id)]));
        setIsAddingNewDreamPosition(false);
        setNewDreamPositionName("");
        const refreshed = await getPositionAll();
        if (refreshed.success) setPositions(refreshed.data || []);
      } else {
        showErrorDialog(error || "Gagal menambahkan data");
      }
    }

    if (isAddingNewDreamCompany && newDreamCompanyName) {
      const formData = new FormData();
      formData.append("company_name", newDreamCompanyName);
      formData.append("company_desc", "-");
      formData.append("company_link", "-");
      formData.append("company_is_partner", "0");
      formData.append("status_id", "1");

      const { success, data, error } = await createCompany(formData);
      if (success && data) {
        finalDreamCompanyId = String(data.company_id);
        setDreamCompanyId(new Set([String(data.company_id)]));
        setIsAddingNewDreamCompany(false);
        setNewDreamCompanyName("");
        const refreshed = await getCompanyAll();
        if (refreshed.success) setCompanies(refreshed.data || []);
      } else {
        showErrorDialog(error || "Gagal menambahkan data");
      }
    }

    if (isAddingNewCurrentPosition && newCurrentPositionName) {
      const formData = new FormData();
      formData.append("position_name", newCurrentPositionName);
      const { success, data, error } = await createPosition(formData);
      if (success && data) {
        finalCurrentPositionId = String(data.position_id);
        setCurrentPositionId(new Set([String(data.position_id)]));
        setIsAddingNewCurrentPosition(false);
        setNewCurrentPositionName("");
        const refreshed = await getPositionAll();
        if (refreshed.success) setPositions(refreshed.data || []);
      } else {
        showErrorDialog(error || "Gagal menambahkan data");
      }
    }

    if (isAddingNewCurrentCompany && newCurrentCompanyName) {
      const formData = new FormData();
      formData.append("company_name", newCurrentCompanyName);
      formData.append("company_desc", "-");
      formData.append("company_link", "-");
      formData.append("company_is_partner", "0");
      formData.append("status_id", "1");

      const { success, data, error } = await createCompany(formData);
      if (success && data) {
        finalCurrentCompanyId = String(data.company_id);
        setCurrentCompanyId(new Set([String(data.company_id)]));
        setIsAddingNewCurrentCompany(false);
        setNewCurrentCompanyName("");
        const refreshed = await getCompanyAll();
        if (refreshed.success) setCompanies(refreshed.data || []);
      } else {
        showErrorDialog(error || "Gagal menambahkan data");
      }
    }

    const formData = new FormData();
    formData.append("user_fullname", user_fullname);
    formData.append("user_name", user_name);
    formData.append("user_nim", user_nim);
    formData.append("user_phone", user_phone);
    formData.append("user_email", user_email);
    formData.append("user_password", user_password);
    formData.append("user_password_confirm", user_password_confirm);
    if (user_birthdate) formData.append("user_birthdate", user_birthdate.toAbsoluteString());
    if (user_admission_date) formData.append("user_admission_date", user_admission_date.toAbsoluteString());
    if (user_graduation_date) formData.append("user_graduation_date", user_graduation_date.toAbsoluteString());
    appendSingle(formData, "age_id", age_id);
    appendSingle(formData, "weight_id", weight_id);
    appendSingle(formData, "height_id", height_id);
    appendSingle(formData, "education_id", education_id);
    appendSingle(formData, "program_study_id", program_study_id);
    appendSingle(formData, "semester_id", semester_id);
    appendSingle(formData, "ipk_id", ipk_id);
    appendSingle(formData, "city_id", city_id);
    appendSingle(formData, "province_id", province_id);
    appendSingle(formData, "country_id", country_id);
    appendSingle(formData, "gender_id", gender_id);
    appendSingle(formData, "religion_id", religion_id);
    appendSingle(formData, "marital_status_id", marital_status_id);
    if (finalDreamPositionId) {
      formData.append("dream_position_id", finalDreamPositionId);
    } else {
      appendSingle(formData, "dream_position_id", dream_position_id);
    }
    if (finalDreamCompanyId) {
      formData.append("dream_company_id", finalDreamCompanyId);
    } else {
      appendSingle(formData, "dream_company_id", dream_company_id);
    }
    formData.append("user_is_employed", user_is_employed ? "1" : "0");
    if (finalCurrentPositionId) {
      formData.append("current_position_id", finalCurrentPositionId);
    } else {
      appendSingle(formData, "current_position_id", current_position_id);
    }
    if (finalCurrentCompanyId) {
      formData.append("current_company_id", finalCurrentCompanyId);
    } else {
      appendSingle(formData, "current_company_id", current_company_id);
    }
    appendSingle(formData, "role_id", role_id);
    appendSingle(formData, "status_id", status_id);

    const { success, error } = await createUser(formData);
    if (success) {
      await showSuccessDialog();
      router.replace("/masuk");
    } else {
      await showErrorDialog(error);
    }
    setLoading(false);
  };

  return (
    <section className={className}>
      <div className="xs:w-11/12 lg:w-10/12 h-full  mx-auto flex flex-col xs:justify-center xs:items-center md:justify-start md:items-start xs:gap-8 md:gap-8 py-8 ">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <Spinner
              label="Memproses pendaftaran..."
              variant="wave"
              classNames={{
                label: "text-primary-primary mt-4",
                dots: "border-5 border-primary-primary",
              }}
            />
          </div>
        )}
        <Logo />
        <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 ">
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <span className="xs:text-base md:text-4xl font-bold">Selamat Bergabung</span>
            <span className="text-xs text-text-secondary">Isi beberapa kolom dibawah agar dapat terhubung bersama kami Pusat Karir Fakultas Teknologi Universitas Sebelas April</span>
          </div>
          <div className="grid xs:grid-cols-1 xs:gap-2 md:gap-8 w-full">
            {/* Nama Lengkap  */}
            <Input
              isRequired
              label="Masukkan nama lengkap anda"
              labelPlacement="outside"
              name="user_fullname"
              value={user_fullname}
              onValueChange={setUserFullname}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />
            {/* Jenis Kelamin & Religion */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2 md:gap-8">
              {/* Jenis Kelamin */}
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
                  label="Pilih jenis kelamin anda"
                  labelPlacement="outside"
                  variant="bordered"
                  name="gender_id"
                  selectedKeys={gender_id}
                  onSelectionChange={setGenderId}
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
                        key={String(item.gender_id)}
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

              {/* Religion */}
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
                  label="Pilih agama anda"
                  labelPlacement="outside"
                  variant="bordered"
                  name="religion_id"
                  selectedKeys={religion_id}
                  onSelectionChange={setReligionId}
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

            {/* Kota Tinggal dan Tanggal Lahir */}
            <div className="grid xs:grid-cols-1 md:grid-cols-2 items-center xs:gap-2 md:gap-8">
              {/* Tanggal Lahir */}
              <DatePicker
                isRequired
                hideTimeZone
                showMonthAndYearPickers
                granularity="minute"
                value={user_birthdate}
                onChange={setUserBirthDate}
                label="Tanggal Lahir"
                name="user_birthdate"
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
              {/* City */}
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
                  label="Pilih kota tempat tinggal"
                  labelPlacement="outside"
                  variant="bordered"
                  name="city_id"
                  selectedKeys={city_id}
                  onSelectionChange={setCityId}
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
            </div>

            {/* Provinsi dan Negara Tinggal */}
            <div className="grid xs:grid-cols-1 md:grid-cols-2 items-center xs:gap-2 md:gap-8">
              {/* Provinsi */}
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
                  label="Pilih provinsi tempat tinggal"
                  labelPlacement="outside"
                  variant="bordered"
                  name="province_id"
                  selectedKeys={province_id}
                  onSelectionChange={setProvinceId}
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

              {/* Negara */}
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
                  label="Pilih negara tempat tinggal"
                  labelPlacement="outside"
                  variant="bordered"
                  name="country_id"
                  selectedKeys={country_id}
                  onSelectionChange={setCountryId}
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

            {/* Umur & Berat Badan */}
            <div className="grid xs:grid-cols-1 md:grid-cols-2 items-center xs:gap-2 md:gap-8">
              {/* Age */}
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
                  label="Pilih umur anda"
                  labelPlacement="outside"
                  variant="bordered"
                  name="age_id"
                  selectedKeys={age_id}
                  onSelectionChange={setAgeId}
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

              {/* Weight */}
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
                  label="Pilih berat badan"
                  labelPlacement="outside"
                  variant="bordered"
                  name="weight_id"
                  selectedKeys={weight_id}
                  onSelectionChange={setWeightId}
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
            </div>

            {/* Tinggi Badan & Status Perkawinan */}
            <div className="grid xs:grid-cols-1 md:grid-cols-2 items-center xs:gap-2 md:gap-8">
              {/* Height */}
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
                  label="Pilih tinggi badan"
                  labelPlacement="outside"
                  variant="bordered"
                  name="height_id"
                  selectedKeys={height_id}
                  onSelectionChange={setHeightId}
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

              {/* Marital Status */}
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
                  label="Pilih status perkawinan anda"
                  labelPlacement="outside"
                  variant="bordered"
                  name="marital_status_id"
                  selectedKeys={marital_status_id}
                  onSelectionChange={setMaritalStatusId}
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
            </div>

            {/* Nomor HP  */}
            <Input
              isRequired
              label="Masukkan nomor hp anda"
              labelPlacement="outside"
              type="text"
              name="user_phone"
              value={user_phone}
              onValueChange={setUserPhone}
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />
            {/*NIM & IPK */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2 md:gap-8">
              {/* Nim  */}
              <Input
                isRequired
                label="Masukkan NIM anda"
                labelPlacement="outside"
                name="user_nim"
                value={user_nim}
                onValueChange={setUserNim}
                type="text"
                variant="bordered"
                classNames={{
                  label: "after:text-danger-primary text-xs text-text-secondary",
                  input: "focus:!border-primary-primary text-xs uppercase",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  errorMessage: "text-danger-primary text-xs",
                }}
              />
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
                  label="Pilih ipk anda"
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

            {/* Education */}
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
                label="Pilih jenjang pendidikan anda"
                labelPlacement="outside"
                variant="bordered"
                name="education_id"
                selectedKeys={education_id}
                onSelectionChange={setEducationId}
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
                isRequired
                label="Pilih program studi anda"
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

            {/* Semester */}
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
                label="Pilih semester"
                labelPlacement="outside"
                variant="bordered"
                name="semester_id"
                selectedKeys={semester_id}
                onSelectionChange={setSemesterId}
                classNames={{
                  label: "after:text-danger-primary text-xs text-text-secondary",
                  trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                  value: "text-xs",
                }}
              >
                {semesters.length === 0 ? (
                  <SelectItem key="nodata" isDisabled>
                    Data belum tersedia
                  </SelectItem>
                ) : (
                  semesters.map((item) => (
                    <SelectItem
                      key={item.semester_id}
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

            {/* Tanggal Masuk & Tanggal Lulus */}
            <div className="grid xs:grid-cols-1 md:grid-cols-2 items-center xs:gap-2 md:gap-8">
              {/* Masuk */}
              <DatePicker
                isRequired
                hideTimeZone
                name="user_admission_date"
                granularity="minute"
                showMonthAndYearPickers
                value={user_admission_date}
                onChange={setUserAdmissionDate}
                label="Tanggal Masuk"
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
              {/* Lulus */}
              <DatePicker
                isRequired
                hideTimeZone
                name="user_graduation_date"
                showMonthAndYearPickers
                granularity="minute"
                value={user_graduation_date}
                onChange={setUserGraduationDate}
                label="Tanggal Lulus"
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

            {/* Posisi & Perusahaan Impian */}
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 justify-center items-start xs:gap-2">
              <div className="flex flex-col">
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
                    label="Pilih posisi/jabatan impian anda"
                    placeholder="Pilih posisi/jabatan impian anda"
                    labelPlacement="outside"
                    variant="bordered"
                    name="dream_position_id"
                    selectedKeys={dream_position_id}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      if (selected === "-1") {
                        setIsAddingNewDreamPosition(true);
                        setDreamPositionId(new Set());
                      } else {
                        setIsAddingNewDreamPosition(false);
                        setDreamPositionId(new Set([selected]));
                      }
                    }}
                    classNames={{
                      label: "after:text-danger-primary text-xs text-text-secondary",
                      trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary",
                      value: "text-xs",
                      errorMessage: "text-danger-primary text-xs",
                    }}
                  >
                    {positions.length === 0 ? (
                      <SelectItem key="nodata" isDisabled>
                        Data belum tersedia
                      </SelectItem>
                    ) : (
                      [
                        {
                          position_id: -1,
                          position_name: "+ Tambah Posisi Baru",
                        },
                        ...positions,
                      ].map((item) => (
                        <SelectItem
                          key={item.position_id}
                          textValue={item.position_name}
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
                {isAddingNewDreamPosition && (
                  <div className="flex flex-col gap-4 mt-2">
                    <Input
                      label="Masukkan nama posisi/jabatan"
                      placeholder="Masukkan nama posisi/jabatan"
                      labelPlacement="outside"
                      value={newDreamPositionName}
                      onValueChange={setNewDreamPositionName}
                      variant="bordered"
                      classNames={{
                        label: "after:text-danger-primary text-xs text-text-secondary",
                        input: "focus:!border-primary-primary text-xs",
                        inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
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
                  <p className="text-start text-xs text-text-secondary">Data belum tersedia</p>
                ) : (
                  <Select
                    isMultiline={true}
                    items={[
                      {
                        company_id: -1,
                        company_name: "+ Tambah perusahaan/instansi",
                        company_img: "",
                        company_desc: "",
                        company_link: "",
                        company_is_partner: false,
                        status_id: 1,
                        industry_ids: [],
                      },
                      ...companies,
                    ]}
                    label="Pilih perusahaan/instansi impian"
                    placeholder="Pilih perusahaan/instansi impian"
                    labelPlacement="outside"
                    variant="bordered"
                    name="dream_company_id"
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
                    selectedKeys={dream_company_id}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      if (selected === "-1") {
                        setIsAddingNewDreamCompany(true);
                        setDreamCompanyId(new Set());
                      } else {
                        setIsAddingNewDreamCompany(false);
                        setDreamCompanyId(new Set([selected]));
                      }
                    }}
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

                {isAddingNewDreamCompany && (
                  <div className="flex flex-col gap-4 mt-2">
                    <Input
                      isRequired
                      label="Masukkan nama perusahaan/instansi"
                      placeholder="Masukkan nama perusahaan/instansi"
                      labelPlacement="outside"
                      value={newDreamCompanyName}
                      onValueChange={setNewDreamCompanyName}
                      variant="bordered"
                      classNames={{
                        label: "after:text-danger-primary text-xs text-text-secondary",
                        input: "focus:!border-primary-primary text-xs",
                        inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Is Employed */}
          <div className="grid grid-cols-1 xs:gap-2 md:gap-8 w-full">
            <Switch isSelected={user_is_employed} onValueChange={setUserIsEmployed} classNames={{ thumb: "bg-primary-primary", label: "text-xs" }}>
              {user_is_employed ? "Bekerja" : "Belum Bekerja"}
            </Switch>

            {user_is_employed === true ? (
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 justify-center items-start xs:gap-2">
                <div className="flex flex-col">
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
                      label="Pilih posisi/jabatan anda sekarang"
                      placeholder="Pilih posisi/jabatan anda sekarang"
                      labelPlacement="outside"
                      variant="bordered"
                      name="current_position_id"
                      selectedKeys={current_position_id}
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0];
                        if (selected === "-1") {
                          setIsAddingNewCurrentPosition(true);
                          setCurrentPositionId(new Set());
                        } else {
                          setIsAddingNewCurrentPosition(false);
                          setCurrentPositionId(new Set([selected]));
                        }
                      }}
                      classNames={{
                        label: "after:text-danger-primary text-xs text-text-secondary",
                        trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary",
                        value: "text-xs",
                        errorMessage: "text-danger-primary text-xs",
                      }}
                    >
                      {positions.length === 0 ? (
                        <SelectItem key="nodata" isDisabled>
                          Data belum tersedia
                        </SelectItem>
                      ) : (
                        [
                          {
                            position_id: -1,
                            position_name: "+ Tambah Posisi Baru",
                          },
                          ...positions,
                        ].map((item) => (
                          <SelectItem
                            key={item.position_id}
                            textValue={item.position_name}
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
                  {isAddingNewCurrentPosition && (
                    <div className="flex flex-col gap-4 mt-2">
                      <Input
                        label="Masukkan nama posisi/jabatan"
                        placeholder="Masukkan nama posisi/jabatan"
                        labelPlacement="outside"
                        value={newCurrentPositionName}
                        onValueChange={setNewCurrentPositionName}
                        variant="bordered"
                        classNames={{
                          label: "after:text-danger-primary text-xs text-text-secondary",
                          input: "focus:!border-primary-primary text-xs",
                          inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
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
                    <p className="text-start text-xs text-text-secondary">Data belum tersedia</p>
                  ) : (
                    <Select
                      isMultiline={true}
                      items={[
                        {
                          company_id: -1,
                          company_name: "+ Tambah perusahaan/instansi",
                          company_img: "",
                          company_desc: "",
                          company_link: "",
                          company_is_partner: false,
                          status_id: 1,
                          industry_ids: [],
                        },
                        ...companies,
                      ]}
                      label="Pilih perusahaan/instansi anda"
                      placeholder="Pilih perusahaan/instansi anda"
                      labelPlacement="outside"
                      variant="bordered"
                      name="current_company_id"
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
                      selectedKeys={current_company_id}
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0];
                        if (selected === "-1") {
                          setIsAddingNewCurrentCompany(true);
                          setCurrentCompanyId(new Set());
                        } else {
                          setIsAddingNewCurrentCompany(false);
                          setCurrentCompanyId(new Set([selected]));
                        }
                      }}
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

                  {isAddingNewCurrentCompany && (
                    <div className="flex flex-col gap-4 mt-2">
                      <Input
                        isRequired
                        label="Masukkan nama perusahaan/instansi"
                        placeholder="Masukkan nama perusahaan/instansi"
                        labelPlacement="outside"
                        value={newCurrentCompanyName}
                        onValueChange={setNewCurrentCompanyName}
                        variant="bordered"
                        classNames={{
                          label: "after:text-danger-primary text-xs text-text-secondary",
                          input: "focus:!border-primary-primary text-xs",
                          inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/*Username */}
          <div className="grid xs:grid-cols-1 md:grid-cols-2 xs:gap-2 md:gap-8 w-full">
            {/* Username  */}
            <Input
              isRequired
              label="Masukkan username anda"
              labelPlacement="outside"
              name="user_name"
              value={user_name}
              onValueChange={setUserName}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            {/* Email */}
            <Input
              startContent={<Sms size={20} variant="Bold" color="currentColor" className="text-primary-primary" />}
              label="Masukkan email anda"
              labelPlacement="outside"
              value={user_email}
              onValueChange={setUserEmail}
              name="user_email"
              variant="bordered"
              type="email"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            {/* Password*/}
            <Input
              isRequired
              endContent={
                <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? <EyeSlash size={16} color="currentColor" variant="Bold" className="text-text-secondary " /> : <Eye size={16} color="currentColor" variant="Bold" className="text-primary-primary " />}
                </button>
              }
              label="Masukkan password anda"
              name="user_password"
              value={user_password}
              onValueChange={setUserPassword}
              labelPlacement="outside"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              classNames={{
                label: "text-xs after:text-danger-primary",
                input: "text-xs focus:!border-primary-primary",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            {/* Password Confirm */}
            <Input
              isRequired
              endContent={
                <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? <EyeSlash size={16} color="currentColor" variant="Bold" className="text-text-secondary " /> : <Eye size={16} color="currentColor" variant="Bold" className="text-primary-primary " />}
                </button>
              }
              label="Konfirmasi password anda"
              name="user_password_confirm"
              value={user_password_confirm}
              onValueChange={setUserPasswordConfirm}
              labelPlacement="outside"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              classNames={{
                label: "text-xs after:text-danger-primary",
                input: "text-xs focus:!border-primary-primary",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />
          </div>

          {/* Role */}
          {isLoadingRoles ? (
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
          ) : apiErrorRoles ? (
            <p className="text-start text-xs text-danger-primary">{apiErrorRoles}</p>
          ) : (
            <Select
              isRequired
              label="Pilih role"
              labelPlacement="outside"
              variant="bordered"
              name="role_id"
              selectedKeys={role_id}
              onSelectionChange={setRoleId}
              classNames={{
                base: "hidden",
                label: "after:text-danger-primary text-xs text-text-secondary",
                trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                value: "text-xs",
                errorMessage: "text-danger-primary text-xs",
              }}
            >
              {roles.length === 0 ? (
                <SelectItem key="nodata" isDisabled>
                  Data belum tersedia
                </SelectItem>
              ) : (
                roles.map((item) => (
                  <SelectItem
                    key={item.role_id}
                    classNames={{
                      title: "text-xs hover:!text-primary-primary",
                      selectedIcon: "text-primary-primary",
                    }}
                  >
                    {item.role_name}
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
              label="Pilih status"
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

          <div className="w-full flex flex-col gap-2">
            <Button type="submit" className="login w-full">
              Daftar
            </Button>
            <div className="w-full flex justify-center gap-2">
              <span className="text-xs text-text-secondary">Sudah punya akun?</span>
              <Link href="/masuk" className="text-xs text-primary-primary hover:text-text-secondary">
                Masuk
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
}

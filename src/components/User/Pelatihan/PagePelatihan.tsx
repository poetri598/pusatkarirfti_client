"use client";
import { useState, useEffect } from "react";
// Iconsax
import { SearchNormal1, ArrowRight2, FilterEdit, Sort } from "iconsax-react";

// Components
import { Input, Pagination, Button, Spinner, Select, SelectItem, Selection, Avatar } from "@heroui/react";
import TitleKarir from "@/components/Custom/TitleKarir";
import CardPelatihan from "@/components/Card/CardPelatihan";
import HeroKarir from "@/components/Custom/HeroKarir";

// Types
import { TrainingItem } from "@/types/training";
import { TrainingTypeItem } from "@/types/trainingType";
import { CompanyItem } from "@/types/company";
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
import { getCityAll } from "@/services/city";
import { getCountryAll } from "@/services/country";
import { getEducationAll } from "@/services/education";
import { getModeAll } from "@/services/mode";
import { getProgramStudyAll } from "@/services/programStudy";
import { getProvinceAll } from "@/services/province";
import { getSemesterAll } from "@/services/semester";
import { getSkillAll } from "@/services/skill";
import { searchTrainingsActive } from "@/services/training";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function Pelatihan() {
  // companies
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [company_id, setCompanyId] = useState<Selection>(new Set([]));
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [apiErrorCompanies, setApiErrorCompanies] = useState<string | null>(null);
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

  const [searchKeyword, setSearchKeyword] = useState("");
  const [sort, setSort] = useState<string>("");
  const [filters, setFilters] = useState<{ [key: string]: string | number }>({});

  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const [trainings, setTrainings] = useState<TrainingItem[]>([]);
  const [isLoadingAllTrainings, setIsLoadingAllTrainings] = useState(true);
  const [apiErrorAllTrainings, setApiErrorAllTrainings] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [amount, setAmount] = useState(8);

  const maxValue = trainings.length;
  const minValue = 1;
  const currentItems = trainings.slice((currentPage - 1) * amount, currentPage * amount);
  const totalPage = Math.ceil(maxValue / amount);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [
        createServiceFetcher(getCompanyAll, setCompanies, setApiErrorCompanies, setIsLoadingCompanies),
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

  useEffect(() => {
    const fetchTrainings = async () => {
      setIsLoadingAllTrainings(true);
      setApiErrorAllTrainings(null);
      try {
        const queryParams: Record<string, any> = {
          ...(searchKeyword && { search: searchKeyword }),
          ...(sort && { sort }),
          ...filters,
        };
        const { success, data, error } = await searchTrainingsActive(queryParams);
        if (success) {
          setTrainings(data || []);
        } else {
          setApiErrorAllTrainings(error || "Terjadi kesalahan");
        }
      } catch (err: any) {
        setApiErrorAllTrainings(err.message || "Terjadi kesalahan");
      } finally {
        setIsLoadingAllTrainings(false);
      }
    };

    fetchTrainings();
  }, [searchKeyword, sort, filters]);

  const selecItem = [
    { key: "company_id", label: "Perusahaan" },
    { key: "city_id", label: "Kota" },
    { key: "country_id", label: "Negara" },
    { key: "education_id", label: "Jenjang Pendidikan" },
    { key: "mode_id", label: "Mode" },
    { key: "program_study_id", label: "Program Studi" },
    { key: "province_id", label: "Provinsi" },
    { key: "semester_id", label: "Semester" },
    { key: "skill_id", label: "Skill" },
    { key: "training_type_id", label: "Tipe" },
  ];

  const sortOptions = [
    { key: "", label: "— Tidak diurutkan —" },
    { key: "training_price:desc", label: "Termahal" },
    { key: "training_price:asc", label: "Termurah" },
    { key: "training_views:desc", label: "Paling Banyak Dilihat" },
    { key: "training_views:asc", label: "Paling Sedikit Dilihat" },
    { key: "training_created_at:desc", label: "Terbaru" },
    { key: "training_created_at:asc", label: "Terlama" },
  ];

  return (
    <>
      <>
        <main>
          {/* Hero Karir */}
          <HeroKarir />

          <div className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 pt-16 pb-32">
            {/* Title Kari */}
            <TitleKarir label="Pelatihan" />

            {/* Section Search, Filter & Sort */}
            <section className="flex xs:flex-col xs:justify-start xs:items-start md:flex-row md:justify-between md:items-center gap-2 border-b border-border-primary pb-4">
              {/* Search */}
              <Input
                startContent={<SearchNormal1 size={16} color="currentColor" className="text-text-secondary transition-colors  rounded-lg " />}
                label="Cari informasi pelatihan"
                labelPlacement="outside"
                placeholder="Masukkan kata kunci"
                variant="bordered"
                type="search"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                classNames={{
                  label: "after:text-danger-primary text-xs text-text-secondary",
                  input: "focus:!border-primary-primary text-xs ",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                }}
                className="w-64"
              />

              <div className="flex xs:flex-col xs:justify-start xs:items-start md:flex-row md:justify-center md:items-center gap-2">
                {" "}
                {/* Filter */}
                <Select
                  label="Tambahkan filter"
                  labelPlacement="outside"
                  placeholder="Pilih Filter"
                  variant="bordered"
                  selectionMode="multiple"
                  selectorIcon={<FilterEdit size={16} color="currentColor" className="text-text-secondary transition-colors" />}
                  selectedKeys={selectedFilters}
                  onSelectionChange={(keys) => {
                    const value = new Set(Array.from(keys as Iterable<string>));
                    setSelectedFilters(value);
                  }}
                  classNames={{
                    base: "w-64",
                    label: "after:text-danger-primary text-xs text-text-secondary ",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {selecItem.map((item) => (
                    <SelectItem
                      key={item.key}
                      classNames={{
                        title: "text-xs hover:!text-primary-primary",
                        selectedIcon: "text-primary-primary",
                      }}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                {/* Sort */}
                <Select
                  label="Urutkan"
                  labelPlacement="outside"
                  placeholder="Pilih Urutan"
                  variant="bordered"
                  selectedKeys={new Set([sort])}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0];
                    if (typeof selected === "string") {
                      setSort(selected);
                    }
                  }}
                  selectorIcon={<Sort size={16} color="currentColor" className="text-text-secondary" />}
                  classNames={{
                    base: "w-64",
                    label: "after:text-danger-primary text-xs text-text-secondary ",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                >
                  {sortOptions.map((item) => (
                    <SelectItem
                      key={item.key}
                      classNames={{
                        title: "text-xs hover:!text-primary-primary",
                        selectedIcon: "text-primary-primary",
                      }}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </section>

            <section className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4  w-full">
              {/* company_id */}
              {selectedFilters.has("company_id") && (
                <Select
                  isMultiline={true}
                  items={companies}
                  label="Pilih perusahaan"
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
                  selectedKeys={new Set([filters.company_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, company_id: value }));
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

              {/* city_id */}
              {selectedFilters.has("city_id") && (
                <Select
                  label="Pilih kota"
                  labelPlacement="outside"
                  variant="bordered"
                  name="city_id"
                  selectedKeys={new Set([filters.city_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, city_id: value }));
                  }}
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

              {/* country_id */}
              {selectedFilters.has("country_id") && (
                <Select
                  label="Pilih negara"
                  labelPlacement="outside"
                  variant="bordered"
                  name="country_id"
                  selectedKeys={new Set([filters.country_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, country_id: value }));
                  }}
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

              {/* education_id */}
              {selectedFilters.has("education_id") && (
                <Select
                  label="Pilih jenjang pendidikan"
                  labelPlacement="outside"
                  variant="bordered"
                  name="education_id"
                  selectedKeys={new Set([filters.education_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, education_id: value }));
                  }}
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

              {/* mode_id */}
              {selectedFilters.has("mode_id") && (
                <Select
                  label="Pilih mode"
                  labelPlacement="outside"
                  variant="bordered"
                  name="mode_id"
                  selectedKeys={new Set([filters.mode_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, mode_id: value }));
                  }}
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

              {/* program_study_id */}
              {selectedFilters.has("program_study_id") && (
                <Select
                  label="Pilih program study"
                  labelPlacement="outside"
                  variant="bordered"
                  name="program_study_id"
                  selectedKeys={new Set([filters.program_study_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, program_study_id: value }));
                  }}
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

              {/* province_id */}
              {selectedFilters.has("province_id") && (
                <Select
                  label="Pilih provinsi"
                  labelPlacement="outside"
                  variant="bordered"
                  name="province_id"
                  selectedKeys={new Set([filters.province_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, province_id: value }));
                  }}
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

              {/* semester_id */}
              {selectedFilters.has("semester_id") && (
                <Select
                  label="Pilih semester"
                  labelPlacement="outside"
                  variant="bordered"
                  name="semester_id"
                  selectedKeys={new Set([filters.semester_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, semester_id: value }));
                  }}
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
                        {`Semester ${item.semester_no}`}
                      </SelectItem>
                    ))
                  )}
                </Select>
              )}

              {/* skill_id */}
              {selectedFilters.has("skill_id") && (
                <Select
                  label="Pilih skill"
                  labelPlacement="outside"
                  variant="bordered"
                  name="skill_id"
                  selectedKeys={new Set([filters.skill_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, skill_id: value }));
                  }}
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

              {/* training_type_id */}
              {selectedFilters.has("training_type_id") && (
                <Select
                  label="Pilih tipe"
                  labelPlacement="outside"
                  variant="bordered"
                  name="training_type_id"
                  selectedKeys={new Set([filters.training_type_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, training_type_id: value }));
                  }}
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
            </section>

            {/* Hasil */}
            <div className="flex flex-col gap-2">
              {(searchKeyword || Object.keys(filters).length > 0) && (
                <div className="flex flex-col">
                  <span className="text-xs text-text-secondary">
                    Kata kunci{" "}
                    <span className="text-primary-primary">
                      {searchKeyword || "..."} {filters?.city && `di ${filters.city}`}
                    </span>
                  </span>
                  <span className="text-xs text-text-secondary">
                    Kami menemukan <span className="font-bold text-primary-primary">{trainings.length}</span> tempat magang
                  </span>
                </div>
              )}
            </div>

            {/* Section Card */}
            <section className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoadingAllTrainings ? (
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
              ) : apiErrorAllTrainings ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorAllTrainings}</p>
              ) : currentItems.length === 0 ? (
                <p className="text-center text-xs text-gray-500 col-span-full py-8">Data belum tersedia</p>
              ) : (
                currentItems.map((item) => <CardPelatihan key={item.training_id} {...item} />)
              )}
            </section>

            {/* Pagination */}
            <div className="w-full  flex justify-end item-center">
              <div className="flex items-center">
                {/* Sebelumnya */}
                <Button size="sm" variant="light" className="text-primary-primary gap-0 font-semibold px-4 py-2 text-xs " onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))} isDisabled={currentPage === 1}>
                  <ArrowRight2 size={16} color="currentColor" className="rotate-180 mr-1" />
                  <span className="xs:hidden md:block">Sebelumnya</span>
                </Button>

                {/* Pagination */}
                <Pagination
                  page={currentPage}
                  total={totalPage} // Ganti sesuai total halaman kamu
                  onChange={(page) => setCurrentPage(page)}
                  classNames={{
                    base: "overflow-hidden ",
                    wrapper: "",
                    prev: "",
                    next: "",
                    item: "text-text-secondary data-[active=true]:text-primary-primary data-[active=true]:border data-[active=true]:border-primary-primary data-[active=true]:font-medium bg-backbround-secondary text-xs",
                    cursor: "rounded-md text-xs w-8 h-8 text-primary-primary",
                    forwardIcon: "text-primary-primary",
                    ellipsis: "text-primary-primary",
                    chevronNext: "text-primary-primary",
                  }}
                />

                {/* Selanjutnya */}
                <Button size="sm" variant="light" className="text-primary-primary font-semibold px-4 py-2 gap-0 text-xs " onPress={() => setCurrentPage((prev) => (prev < totalPage ? prev + 1 : prev))} isDisabled={currentPage === totalPage}>
                  <span className="xs:hidden md:block">Selanjutnya</span>
                  <ArrowRight2 size={16} color="currentColor" className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </>
    </>
  );
}

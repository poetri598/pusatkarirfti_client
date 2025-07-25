"use client";
import { useState, useEffect } from "react";
// Iconsax
import { SearchNormal1, ArrowRight2, FilterEdit, Sort } from "iconsax-react";

// Components
import { Input, Pagination, Button, Spinner, Select, SelectItem, Selection, Avatar } from "@heroui/react";
import HeroKarir from "@/components/Custom/HeroKarir";
import TitleKarir from "@/components/Custom/TitleKarir";
import CardLowonganPekerjaan from "@/components/Card/CardLowonganPekerjaan";

// Types
import type { JobItem } from "@/types/job";
import { AgeItem } from "@/types/age";
import { WeightItem } from "@/types/weight";
import { HeightItem } from "@/types/height";
import { JobTypeItem } from "@/types/jobType";
import { IpkItem } from "@/types/ipk";
import { CompanyItem } from "@/types/company";
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
import { searchJobsActive } from "@/services/job";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function PageLowonganPekerjaan() {
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

  const [searchKeyword, setSearchKeyword] = useState("");
  const [sort, setSort] = useState<string>("");
  const [filters, setFilters] = useState<{ [key: string]: string | number }>({});

  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [isLoadingAllJob, setIsLoadingAllJob] = useState(true);
  const [apiErrorAllJob, setApiErrorAllJob] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [amount, setAmount] = useState(8);

  const maxValue = jobs.length;
  const minValue = 1;
  const currentItems = jobs.slice((currentPage - 1) * amount, currentPage * amount);
  const totalPage = Math.ceil(maxValue / amount);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoadingAllJob(true);
      setApiErrorAllJob(null);

      try {
        const queryParams: Record<string, any> = {
          ...(searchKeyword && { search: searchKeyword }),
          ...(sort && { sort }),
          ...filters,
        };

        const { success, data, error } = await searchJobsActive(queryParams);

        if (success) {
          setJobs(data || []);
        } else {
          setApiErrorAllJob(error || "Terjadi kesalahan");
        }
      } catch (err: any) {
        setApiErrorAllJob(err.message || "Terjadi kesalahan");
      } finally {
        setIsLoadingAllJob(false);
      }
    };

    fetchJobs();
  }, [searchKeyword, sort, filters]);

  const selecItem = [
    { key: "age_min_id", label: "Umur Min" },
    { key: "age_max_id", label: "Umur Max" },
    { key: "height_min_id", label: "Tinggi Badan Min" },
    { key: "height_max_id", label: "Tinggi badan Max" },
    { key: "weight_min_id", label: "Berat Badan Min" },
    { key: "weight_max_id", label: "Berat Badan Max" },
    { key: "job_type_id", label: "Tipe" },
    { key: "company_id", label: "Perusahaan" },
    { key: "ipk_id", label: "Ipk" },
    { key: "city_id", label: "Kota" },
    { key: "country_id", label: "Negara" },
    { key: "education_id", label: "Jenjang Pendidikan" },
    { key: "experience_id", label: "Pengalaman Kerja" },
    { key: "gender_id", label: "Jenis Kelamin" },
    { key: "marital_status_id", label: "Status Perkawinan" },
    { key: "mode_id", label: "Mode" },
    { key: "position_id", label: "Posisi" },
    { key: "program_study_id", label: "Program Studi" },
    { key: "province_id", label: "Provinsi" },
    { key: "religion_id", label: "Agama" },
  ];

  const sortOptions = [
    { key: "", label: "— Tidak diurutkan —" },
    { key: "age_min_id:asc", label: "Umur Minimum Terkecil" },
    { key: "age_min_id:desc", label: "Umur Minimum Terbesar" },
    { key: "age_max_id:asc", label: "Umur Maksimum Terkecil" },
    { key: "age_max_id:desc", label: "Umur Maksimum Terbesar" },
    { key: "height_min_id:asc", label: "Tinggi Badan Minimum Terkecil" },
    { key: "height_min_id:desc", label: "Tinggi Badan Maksimum Terbesar" },
    { key: "height_max_id:asc", label: "Tinggi Badan Minimum Terkecil" },
    { key: "height_max_id:desc", label: "Tinggi Badan Maksimum Terbesar" },
    { key: "weight_min_id:asc", label: "Berat Badan Minimum Terkecil" },
    { key: "weight_min_id:desc", label: "Berat Badan Maksimum Terbesar" },
    { key: "weight_max_id:asc", label: "Berat Badan Minimum Terkecil" },
    { key: "weight_max_id:desc", label: "Berat Badan Maksimum Terbesar" },
    { key: "job_salary_min:asc", label: "Gaji Minimum Terendah" },
    { key: "job_salary_min:desc", label: "Gaji Minimum Tertinggi" },
    { key: "job_salary_max:asc", label: "Gaji Maximum Terendah" },
    { key: "job_salary_max:desc", label: "Gaji Maximum Tertinggi" },
    { key: "job_views:desc", label: "Paling Banyak Dilihat" },
    { key: "job_views:asc", label: "Paling Sedikit Dilihat" },
    { key: "job_created_at:desc", label: "Terbaru" },
    { key: "job_created_at:asc", label: "Terlama" },
  ];
  return (
    <>
      <>
        <main>
          {/* Hero Karir */}
          <HeroKarir />

          <div className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 pt-16 pb-32">
            {/* Title Karir */}
            <TitleKarir label="Lowongan Pekerjaan" />

            {/* Section Search, Filter & Sort */}
            <section
              className="w-full flex xs:flex-col md:flex-row xs:justify-start md:justify-between xs:items-start md:items-center border-b border-border-primary pb-4 gap-2
            "
            >
              {/* Search */}
              <Input
                startContent={<SearchNormal1 size={16} color="currentColor" className="text-text-secondary transition-colors  rounded-lg " />}
                label="Cari lowongan pekerjaan"
                labelPlacement="outside"
                placeholder="Masukkan kata kunci"
                variant="bordered"
                type="search"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                classNames={{
                  base: "max-w-xs",
                  label: "after:text-danger-primary text-xs text-text-secondary",
                  input: "focus:!border-primary-primary text-xs ",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                }}
              />

              <div className="w-full flex xs:flex-col md:flex-row xs:justify-start md:justify-end xs:items-start md:items-center gap-2">
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
                    base: "max-w-xs",
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
                    base: "max-w-xs",
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

            <section className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2  w-full">
              {/* age_min_id */}
              {selectedFilters.has("age_min_id") && (
                <Select
                  label="Pilih persyaratan umur minimum"
                  labelPlacement="outside"
                  variant="bordered"
                  name="age_min_id"
                  selectedKeys={new Set([filters.age_min_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, age_min_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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
              {selectedFilters.has("age_max_id") && (
                <Select
                  label="Pilih persyaratan umur maksimum"
                  labelPlacement="outside"
                  variant="bordered"
                  name="age_max_id"
                  selectedKeys={new Set([filters.age_max_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, age_max_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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
              {selectedFilters.has("weight_min_id") && (
                <Select
                  label="Pilih persyaratan berat badan minimum"
                  labelPlacement="outside"
                  variant="bordered"
                  name="weight_min_id"
                  selectedKeys={new Set([filters.weight_min_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, weight_min_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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
              {selectedFilters.has("weight_max_id") && (
                <Select
                  label="Pilih persyaratan berat badan maksimum"
                  labelPlacement="outside"
                  variant="bordered"
                  name="weight_max_id"
                  selectedKeys={new Set([filters.weight_max_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, weight_max_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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
              {selectedFilters.has("height_min_id") && (
                <Select
                  label="Pilih persyaratan tinggi badan minimum"
                  labelPlacement="outside"
                  variant="bordered"
                  name="height_min_id"
                  selectedKeys={new Set([filters.height_min_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, height_min_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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
              {selectedFilters.has("height_max_id") && (
                <Select
                  label="Pilih persyaratan tinggi badan maksimum"
                  labelPlacement="outside"
                  variant="bordered"
                  name="height_max_id"
                  selectedKeys={new Set([filters.height_max_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, height_max_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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

              {/* job_type_id */}
              {selectedFilters.has("job_type_id") && (
                <Select
                  label="Pilih tipe"
                  labelPlacement="outside"
                  variant="bordered"
                  name="job_type_id"
                  selectedKeys={new Set([filters.job_type_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, job_type_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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

              {/* ipk_id */}
              {selectedFilters.has("ipk_id") && (
                <Select
                  label="Pilih ipk minimal"
                  labelPlacement="outside"
                  variant="bordered"
                  name="ipk_id"
                  selectedKeys={new Set([filters.ipk_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, ipk_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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
                    base: "max-w-xs",
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
                    base: "max-w-xs",
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
                    base: "max-w-xs",
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
                    base: "max-w-xs",
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

              {/* experience_id */}
              {selectedFilters.has("experience_id") && (
                <Select
                  label="Pilih pengalaman"
                  labelPlacement="outside"
                  variant="bordered"
                  name="experience_id"
                  selectedKeys={new Set([filters.excperience_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, excperience_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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

              {/* gender_id */}
              {selectedFilters.has("gender_id") && (
                <Select
                  label="Pilih jenis kelamin"
                  labelPlacement="outside"
                  variant="bordered"
                  name="gender_id"
                  selectedKeys={new Set([filters.gender_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, gender_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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

              {/* marital_status_id */}
              {selectedFilters.has("marital_status_id") && (
                <Select
                  label="Pilih status perkawinan"
                  labelPlacement="outside"
                  variant="bordered"
                  name="marital_status_id"
                  selectedKeys={new Set([filters.marital_status_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, marital_status_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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
                    base: "max-w-xs",
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

              {/* position_id */}
              {selectedFilters.has("position_id") && (
                <Select
                  label="Pilih posisi"
                  labelPlacement="outside"
                  variant="bordered"
                  name="position_id"
                  selectedKeys={new Set([filters.position_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, position_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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
                    base: "max-w-xs",
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
                    base: "max-w-xs",
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

              {/* religion_id */}
              {selectedFilters.has("religion_id") && (
                <Select
                  label="Pilih agama"
                  labelPlacement="outside"
                  variant="bordered"
                  name="religion_id"
                  selectedKeys={new Set([filters.religion_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, religion_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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
            </section>

            {/* Pekerjaan */}
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
                    Kami menemukan <span className="font-bold text-primary-primary">{jobs.length}</span> lowongan pekerjaan terkait
                  </span>
                </div>
              )}
            </div>

            {/* Section Card */}
            <section className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoadingAllJob ? (
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
              ) : apiErrorAllJob ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorAllJob}</p>
              ) : currentItems.length === 0 ? (
                <p className="text-center text-xs text-gray-500 col-span-full py-8">Data belum tersedia</p>
              ) : (
                currentItems.map((item) => <CardLowonganPekerjaan key={item.job_id} {...item} />)
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

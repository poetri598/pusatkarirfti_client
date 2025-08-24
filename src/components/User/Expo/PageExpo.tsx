"use client";
import { useState, useEffect } from "react";
// Iconsax
import { SearchNormal1, ArrowRight2, FilterEdit, Sort } from "iconsax-react";

// Components
import TitleKarir from "@/components/Custom/TitleKarir";
import CardExpo from "@/components/Card/CardExpo";
import HeroKarir from "@/components/Custom/HeroKarir";
import { Button, Input, Select, SelectItem, Selection, Pagination, Spinner, Avatar } from "@heroui/react";

// Types
import { ExpoItem } from "@/types/expo";
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
import { searchExposActive } from "@/services/expo";
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
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function PageMagang() {
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

  const [searchKeyword, setSearchKeyword] = useState("");
  const [sort, setSort] = useState<string>("");
  const [filters, setFilters] = useState<{ [key: string]: string | number }>({});

  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const [expos, setExpos] = useState<ExpoItem[]>([]);
  const [isLoadingAllExpos, setIsLoadingAllExpos] = useState(true);
  const [apiErrorAllExpos, setApiErrorAllExpos] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [amount, setAmount] = useState(8);

  const maxValue = expos.length;
  const minValue = 1;
  const currentItems = expos.slice((currentPage - 1) * amount, currentPage * amount);
  const totalPage = Math.ceil(maxValue / amount);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [
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
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const fetchExpos = async () => {
      setIsLoadingAllExpos(true);
      setApiErrorAllExpos(null);
      try {
        const queryParams: Record<string, any> = {
          ...(searchKeyword && { search: searchKeyword }),
          ...(sort && { sort }),
          ...filters,
        };
        const { success, data, error } = await searchExposActive(queryParams);
        if (success) {
          setExpos(data || []);
        } else {
          setApiErrorAllExpos(error || "Terjadi kesalahan");
        }
      } catch (err: any) {
        setApiErrorAllExpos(err.message || "Terjadi kesalahan");
      } finally {
        setIsLoadingAllExpos(false);
      }
    };

    fetchExpos();
  }, [searchKeyword, sort, filters]);

  const selecItem = [
    { key: "city_id", label: "Kota" },
    { key: "company_id", label: "Perusahaan" },
    { key: "country_id", label: "Negara" },
    { key: "education_id", label: "Jenjang Pendidikan" },
    { key: "expo_type_id", label: "Tipe" },
    { key: "mode_id", label: "Mode" },
    { key: "position_id", label: "Posisi" },
    { key: "program_study_id", label: "Program Studi" },
    { key: "province_id", label: "Provinsi" },
  ];

  const sortOptions = [
    { key: "", label: "— Tidak diurutkan —" },
    { key: "expo_price:desc", label: "Termahal" },
    { key: "expo_price:asc", label: "Termurah" },
    { key: "expo_views:desc", label: "Paling Banyak Dilihat" },
    { key: "expo_views:asc", label: "Paling Sedikit Dilihat" },
    { key: "expo_created_at:desc", label: "Terbaru" },
    { key: "expo_created_at:asc", label: "Terlama" },
  ];

  return (
    <>
      <>
        <main>
          {/* Hero Karir */}
          <HeroKarir />

          <div className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 pt-16 pb-32">
            {/* Title Karir */}
            <TitleKarir label="Expo" />

            {/* Section Search, Filter & Sort */}
            <section className="w-full flex xs:flex-col md:flex-row xs:justify-start md:justify-between xs:items-start md:items-center border-b border-border-primary pb-4 gap-2">
              {/* Search */}
              <Input
                startContent={<SearchNormal1 size={16} color="currentColor" className="text-text-secondary transition-colors  rounded-lg " />}
                label="Cari informasi expo"
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

              {/* expo_type_id */}
              {selectedFilters.has("expo_type_id") && (
                <Select
                  label="Pilih tipe"
                  labelPlacement="outside"
                  variant="bordered"
                  name="expo_type_id"
                  selectedKeys={new Set([filters.expo_type_id || ""])}
                  onSelectionChange={(key) => {
                    const value = Array.from(key)[0];
                    setFilters((prev) => ({ ...prev, expo_type_id: value }));
                  }}
                  classNames={{
                    base: "max-w-xs",
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
                  label="Pilih program studi"
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
                    Kami menemukan <span className="font-bold text-primary-primary">{expos.length}</span> kegiatan
                  </span>
                </div>
              )}
            </div>

            {/* Section Card */}
            <section className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoadingAllExpos ? (
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
              ) : apiErrorAllExpos ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorAllExpos}</p>
              ) : currentItems.length === 0 ? (
                <p className="text-center text-xs text-gray-500 col-span-full py-8">Data belum tersedia</p>
              ) : (
                currentItems.map((item) => <CardExpo key={item.expo_id} {...item} />)
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

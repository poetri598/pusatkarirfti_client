"use client";
import { useState, useEffect } from "react";
// Iconsax
import { SearchNormal1, ArrowRight2, FilterEdit, Sort, Element3, Firstline, Eye, Edit, Trash } from "iconsax-react";

// Components
import {
  Breadcrumbs,
  BreadcrumbItem,
  Input,
  NumberInput,
  Pagination,
  Button,
  Spinner,
  Select,
  SelectItem,
  Selection,
  Avatar,
  Tooltip,
  Link,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import CardPelatihanAdmin from "@/components/Card/CardPelatihanAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { TrainingItem } from "@/types/training";
import { TrainingTypeItem } from "@/types/trainingType";
import { CompanyItem } from "@/types/company";
import { UserItem } from "@/types/user";
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
import { getUserAllAdmin } from "@/services/user";
import { getStatusAll } from "@/services/status";
import { getCityAll } from "@/services/city";
import { getCountryAll } from "@/services/country";
import { getEducationAll } from "@/services/education";
import { getModeAll } from "@/services/mode";
import { getProgramStudyAll } from "@/services/programStudy";
import { getProvinceAll } from "@/services/province";
import { getSemesterAll } from "@/services/semester";
import { getSkillAll } from "@/services/skill";
import { searchTrainings, deleteTrainingById } from "@/services/training";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { formatViews } from "@/utils/view";
import { getRelativeTimeRaw } from "@/utils/time";

export default function PagePelatihan() {
  // companies
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [company_id, setCompanyId] = useState<Selection>(new Set([]));
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [apiErrorCompanies, setApiErrorCompanies] = useState<string | null>(null);
  // users
  const [users, setUsers] = useState<UserItem[]>([]);
  const [user_id, setUserId] = useState<Selection>(new Set([]));
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [apiErrorUsers, setApiErrorUsers] = useState<string | null>(null);
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
        createServiceFetcher(getUserAllAdmin, setUsers, setApiErrorUsers, setIsLoadingUsers),
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
        const { success, data, error } = await searchTrainings(queryParams);
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
    { key: "user_id", label: "Penulis" },
    { key: "status_id", label: "Status" },
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

  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  const columns = [
    { key: "no", label: "#" },
    { key: "training_name", label: "Judul" },
    { key: "training_created_at", label: "Tanggal Dibuat" },
    { key: "training_views", label: "Dilihat" },
    { key: "actions", label: "Aksi" },
  ];

  const tableItems = currentItems.map((training, index) => ({
    key: training.training_id,
    no: index + 1,
    training_name: training.training_name.length > 30 ? training.training_name.slice(0, 30) + "..." : training.training_name,
    training_created_at: getRelativeTimeRaw(training.training_created_at),
    training_views: formatViews(training.training_views),
    actions: training,
  }));

  return (
    <main className="w-full mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
      {/* Breadcrumb */}
      <Breadcrumbs
        className="text-xs text-text-secondary"
        itemClasses={{
          item: "data-[current=true]:text-primary-primary cursor-pointer text-xs",
        }}
      >
        <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
        <BreadcrumbItem href="/pelatihan">Pelatihan</BreadcrumbItem>
      </Breadcrumbs>

      {/* Section Title */}
      <TitleSectionAdmin label="Pelatihan" href="/pelatihan/tambah" />

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

        <div className="flex xs:flex-col xs:justify-start xs:items-start md:flex-row md:justify-center md:items-end gap-2">
          {/* Toggle View */}
          <Button isIconOnly onPress={() => setViewMode(viewMode === "card" ? "table" : "card")} className="text-text-primary bg-transparent active:bg-default-200" aria-label="Tombol Toggle Tampilan">
            {viewMode === "card" ? (
              <Firstline size={24} variant="Bold" color="currentColor" /> // icon table
            ) : (
              <Element3 size={24} variant="Bold" color="currentColor" /> // icon card
            )}
          </Button>

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

        {/* user_id */}
        {selectedFilters.has("user_id") && (
          <Select
            isMultiline={true}
            items={users}
            label="Pilih nama peserta"
            labelPlacement="outside"
            variant="bordered"
            name="user_id"
            renderValue={(items) => (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <div key={item.data?.user_id} className="flex items-center gap-2">
                    <Avatar alt={item.data?.user_fullname} className="w-6 h-6" src={item.data?.user_img} classNames={{ img: "object-contain bg-background-primary" }} />
                    <div className="flex flex-col">
                      <span className="text-xs">{item.data?.user_fullname}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            selectedKeys={new Set([filters.user_id || ""])}
            onSelectionChange={(key) => {
              const value = Array.from(key)[0];
              setFilters((prev) => ({ ...prev, user_id: value }));
            }}
            classNames={{
              label: "after:text-danger-primary text-xs",
              trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
              value: "text-xs",
              errorMessage: "text-danger-primary",
            }}
          >
            {(user) => (
              <SelectItem
                key={user.user_id}
                textValue={user.user_name}
                classNames={{
                  title: "text-xs hover:!text-primary-primary",
                  selectedIcon: "text-primary-primary",
                }}
              >
                <div className="flex items-center gap-2">
                  <Avatar alt={user.user_fullname} className="w-6 h-6" src={user.user_img} classNames={{ img: "object-contain bg-background-primary" }} />
                  <div className="flex flex-col">
                    <span className="text-xs">{user.user_fullname}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        )}

        {/* status_id */}
        {selectedFilters.has("status_id") && (
          <Select
            label="Pilih status publikasi"
            labelPlacement="outside"
            variant="bordered"
            name="status_id"
            selectedKeys={new Set([filters.status_id || ""])}
            onSelectionChange={(key) => {
              const value = Array.from(key)[0];
              setFilters((prev) => ({ ...prev, status_id: value }));
            }}
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

      {/* Section Tampilan Card / Table */}
      {viewMode === "card" ? (
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
            <div className="w-full col-span-full text-center py-8">
              <p className="text-sm text-gray-500">Data belum tersedia.</p>
            </div>
          ) : (
            currentItems.map((item) => <CardPelatihanAdmin key={item.training_id} {...item} />)
          )}
        </section>
      ) : (
        <Table
          isHeaderSticky
          aria-label="Tabel Lowongan Kerja"
          classNames={{
            base: "xs:w-fit xl:w-full",
            table: "min-w-[640px] text-xs",
            wrapper: "overflow-x-auto rounded-lg border border-default-200",
            th: "bg-gray-100 text-gray-700 uppercase whitespace-nowrap text-center",
            td: "whitespace-nowrap text-xs",
          }}
        >
          <TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>

          <TableBody items={tableItems} emptyContent="Data belum tersedia.">
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => {
                  if (columnKey === "actions") {
                    const training = item.actions;
                    return (
                      <TableCell>
                        <div className="flex justify-center items-center gap-2">
                          <Tooltip content="Lihat detail" placement="top" className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                            <Button as={Link} isIconOnly variant="light" size="sm" href={`/pelatihan/${training.training_slug}`}>
                              <Eye size={20} className="text-yellow-500" variant="Bold" color="currentColor" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Edit data" placement="top" className="bg-primary-primary text-white text-xs px-2 py-1 rounded">
                            <Button as={Link} isIconOnly variant="light" size="sm" href={`/pelatihan/edit/${training.training_slug}`}>
                              <Edit size={20} className="text-primary-primary" variant="Bold" color="currentColor" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Hapus data" placement="top" className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                            <Button
                              isIconOnly
                              variant="light"
                              size="sm"
                              onPress={async () => {
                                const confirm = await showConfirmationDialog();
                                if (confirm.isConfirmed) {
                                  const result = await deleteTrainingById(training.training_id);
                                  if (result.success) {
                                    await showSuccessDialog();
                                    window.location.reload();
                                  } else {
                                    await showErrorDialog(result.error);
                                  }
                                }
                              }}
                            >
                              <Trash size={20} className="text-danger-primary" variant="Bold" color="currentColor" />
                            </Button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    );
                  }

                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Section Input Number & Pagination */}
      <section className="flex flex-wrap gap-4 justify-between items-center xs:flex-col md:flex-row">
        {/* Input Number */}
        <NumberInput
          radius="md"
          size="sm"
          className="xs:w-full md:w-20"
          minValue={minValue}
          maxValue={maxValue}
          value={amount}
          inputMode="numeric"
          onValueChange={setAmount}
          aria-label="Pagination"
          classNames={{
            inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary border border-default-200",
            input: "placeholder:text-primary-primary !text-primary-primary focus:!border-primary-primary xs:text-xs md:text-sm text-center",
            stepperButton: "text-primary-primary",
          }}
        />

        {/* Pagination Controls */}
        <div className="flex flex-wrap justify-center items-center gap-2 w-full md:w-auto">
          {/* Previous */}
          <Button size="sm" variant="light" className="text-primary-primary gap-0 font-semibold px-4 py-2 xs:text-xs md:text-sm" onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))} isDisabled={currentPage === 1}>
            <ArrowRight2 size={16} color="currentColor" className="rotate-180 mr-1" />
            <span className="xs:hidden md:block">Sebelumnya</span>
          </Button>

          {/* Pagination */}
          <Pagination
            page={currentPage}
            total={totalPage}
            onChange={(page) => setCurrentPage(page)}
            classNames={{
              base: "overflow-hidden",
              wrapper: "flex flex-wrap justify-center gap-1",
              item: "text-text-secondary data-[active=true]:text-primary-primary data-[active=true]:border data-[active=true]:border-primary-primary data-[active=true]:font-medium bg-backbround-secondary xs:text-xs md:text-sm",
              cursor: "rounded-md xs:text-xs md:text-sm w-8 h-8 text-primary-primary",
              forwardIcon: "text-primary-primary",
              ellipsis: "text-primary-primary",
              chevronNext: "text-primary-primary",
            }}
          />

          {/* Next */}
          <Button
            size="sm"
            variant="light"
            className="text-primary-primary font-semibold px-4 py-2 gap-0 xs:text-xs md:text-sm"
            onPress={() => setCurrentPage((prev) => (prev < totalPage ? prev + 1 : prev))}
            isDisabled={currentPage === totalPage}
          >
            <span className="xs:hidden md:block">Selanjutnya</span>
            <ArrowRight2 size={16} color="currentColor" className="ml-1" />
          </Button>
        </div>
      </section>
    </main>
  );
}

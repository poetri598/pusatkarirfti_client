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
import CardPengguna from "@/components/Card/CardPengguna";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { UserItem } from "@/types/user";
import { AgeItem } from "@/types/age";
import { WeightItem } from "@/types/weight";
import { HeightItem } from "@/types/height";
import { EducationItem } from "@/types/education";
import { ProgramStudyItem } from "@/types/programStudy";
import { SemesterItem } from "@/types/semester";
import { IpkItem } from "@/types/ipk";
import { CityItem } from "@/types/city";
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
import { getGenderAll } from "@/services/gender";
import { getReligionAll } from "@/services/religion";
import { getMaritalStatusAll } from "@/services/maritalStatus";
import { getPositionAll } from "@/services/position";
import { getCompanyAll } from "@/services/company";
import { getRoleAll } from "@/services/role";
import { getStatusAll } from "@/services/status";
import { searchUsers, deleteUserById } from "@/services/user";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { getRelativeTimeRaw } from "@/utils/time";

export default function PagePengguna() {
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
  const [role_id, setRoleId] = useState<Selection>(new Set(["2"]));
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

  const [searchKeyword, setSearchKeyword] = useState("");
  const [sort, setSort] = useState<string>("");
  const [filters, setFilters] = useState<{ [key: string]: string | number }>({});

  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [apiErrorUsers, setApiErrorUsers] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [amount, setAmount] = useState(8);

  const maxValue = users.length;
  const minValue = 1;
  const currentItems = users.slice((currentPage - 1) * amount, currentPage * amount);
  const totalPage = Math.ceil(maxValue / amount);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [
        createServiceFetcher(getAgeAll, setAges, setApiErrorAges, setIsLoadingAges),
        createServiceFetcher(getCityAll, setCities, setApiErrorCities, setIsLoadingCities),
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

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      setApiErrorUsers(null);
      try {
        const queryParams: Record<string, any> = {
          ...(searchKeyword && { search: searchKeyword }),
          ...(sort && { sort }),
          ...filters,
        };
        const { success, data, error } = await searchUsers(queryParams);
        if (success) {
          setUsers(data || []);
        } else {
          setApiErrorUsers(error || "Terjadi kesalahan");
        }
      } catch (err: any) {
        setApiErrorUsers(err.message || "Terjadi kesalahan");
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [searchKeyword, sort, filters]);

  const selecItem = [
    { key: "age_id", label: "Umur" },
    { key: "weight_id", label: "Berat Badan" },
    { key: "height_id", label: "Tinggi Badan" },
    { key: "education_id", label: "Jenjang Pendidikan" },
    { key: "program_study_id", label: "Program Studi" },
    { key: "ipk_id", label: "IPK" },
    { key: "city_id", label: "Kota Kelahiran" },
    { key: "gender_id", label: "Jenis Kelamin" },
    { key: "religion_id", label: "Agama" },
    { key: "marital_status_id", label: "Status Perkawinan" },
    { key: "dream_position_id", label: "Pekerjaan Impian" },
    { key: "dream_company_id", label: "Perusahaan Impian" },
    { key: "user_is_employed", label: "Status Bekerja" },
    { key: "current_position_id", label: "Pekerjaan Sekarang" },
    { key: "curent_company_id", label: "Perusahaan Sekarang" },
    { key: "role_id", label: "Peran Pengguna" },
    { key: "status_id", label: "Status Pengguna" },
  ];

  const sortOptions = [
    { key: "", label: "— Tidak diurutkan —" },
    { key: "age_no:desc", label: "Termuda" },
    { key: "age_no:asc", label: "Tertua" },
    { key: "weight_no:desc", label: "Berat Badan Terbesar" },
    { key: "weight_no:asc", label: "Berat Badan Terkecil" },
    { key: "height_no:desc", label: "Tinggi Badan Tertinggi" },
    { key: "height_no:asc", label: "Tinggi Badan Terendah" },
    { key: "semester_no:desc", label: "Semester Terakhir" },
    { key: "semester_no:asc", label: "Baru Masuk" },
    { key: "ipk_no:desc", label: "IPK Tertinggi" },
    { key: "ipk_no:asc", label: "IPK Terendah" },
    { key: "user_created_at:desc", label: "Pengguna Terbaru" },
    { key: "user_created_at:asc", label: "Pengguna Terlama" },
    { key: "user_updated_at:desc", label: "Paling terakhir diubah" },
    { key: "user_updated_at:asc", label: "Paling terlama diubah" },
  ];

  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  const columns = [
    { key: "no", label: "#" },
    { key: "user_fullname", label: "Nama Lengkap" },
    { key: "role_name", label: "Peran Pengguna" },
    { key: "user_created_at", label: "Tanggal Dibuat" },
    { key: "actions", label: "Aksi" },
  ];

  const tableItems = currentItems.map((user, index) => ({
    key: user.user_id,
    no: index + 1,
    user_fullname: user.user_fullname.length > 30 ? user.user_fullname.slice(0, 30) + "..." : user.user_fullname,
    role_name: user.role_name,
    user_created_at: getRelativeTimeRaw(user.user_created_at),
    actions: user,
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
        <BreadcrumbItem href="/pengguna">Pengguna</BreadcrumbItem>
      </Breadcrumbs>

      {/* Section Title */}
      <TitleSectionAdmin label="Pengguna" href="/pengguna/tambah" />

      {/* Section Search, Filter & Sort */}
      <section className="flex xs:flex-col xs:justify-start xs:items-start md:flex-row md:justify-between md:items-center gap-2 border-b border-border-primary pb-4">
        {/* Search */}
        <Input
          startContent={<SearchNormal1 size={16} color="currentColor" className="text-text-secondary transition-colors  rounded-lg " />}
          label="Cari pengguna"
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
        {/* age_id */}
        {selectedFilters.has("age_id") && (
          <Select
            label="Pilih persyaratan umur minimum"
            labelPlacement="outside"
            variant="bordered"
            name="age_id"
            selectedKeys={new Set([filters.age_id || ""])}
            onSelectionChange={(key) => {
              const value = Array.from(key)[0];
              setFilters((prev) => ({ ...prev, age_id: value }));
            }}
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

        {/* weight_id */}
        {selectedFilters.has("weight_id") && (
          <Select
            label="Pilih persyaratan berat badan minimum"
            labelPlacement="outside"
            variant="bordered"
            name="weight_id"
            selectedKeys={new Set([filters.weight_id || ""])}
            onSelectionChange={(key) => {
              const value = Array.from(key)[0];
              setFilters((prev) => ({ ...prev, weight_id: value }));
            }}
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

        {/* height_id */}
        {selectedFilters.has("height_id") && (
          <Select
            label="Pilih persyaratan tinggi badan minimum"
            labelPlacement="outside"
            variant="bordered"
            name="height_id"
            selectedKeys={new Set([filters.height_id || ""])}
            onSelectionChange={(key) => {
              const value = Array.from(key)[0];
              setFilters((prev) => ({ ...prev, height_id: value }));
            }}
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

        {/* dream_position_id */}
        {selectedFilters.has("dream_position_id") && (
          <Select
            label="Pilih pekerjaan impian"
            labelPlacement="outside"
            variant="bordered"
            name="dream_position_id"
            selectedKeys={new Set([filters.dream_position_id || ""])}
            onSelectionChange={(key) => {
              const value = Array.from(key)[0];
              setFilters((prev) => ({ ...prev, dream_position_id: value }));
            }}
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

        {/* dream_company_id */}
        {selectedFilters.has("dream_company_id") && (
          <Select
            isMultiline={true}
            items={companies}
            label="Pilih perusahaan impian"
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
            selectedKeys={new Set([filters.dream_company_id || ""])}
            onSelectionChange={(key) => {
              const value = Array.from(key)[0];
              setFilters((prev) => ({ ...prev, dream_company_id: value }));
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

        {/* user_is_employed */}
        {selectedFilters.has("user_is_employed") && (
          <Select
            label="Pilih status pekerjaan"
            labelPlacement="outside"
            variant="bordered"
            name="user_is_employed"
            selectedKeys={new Set([filters.user_is_employed !== undefined ? String(filters.user_is_employed) : ""])}
            onSelectionChange={(key) => {
              const value = Array.from(key)[0];
              setFilters((prev) => ({ ...prev, user_is_employed: value }));
            }}
            classNames={{
              label: "after:text-danger-primary text-xs text-text-secondary",
              trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
              value: "text-xs",
              errorMessage: "text-danger-primary text-xs",
            }}
          >
            <SelectItem
              key="1"
              classNames={{
                title: "text-xs hover:!text-primary-primary",
                selectedIcon: "text-primary-primary",
              }}
            >
              Bekerja
            </SelectItem>
            <SelectItem
              key="0"
              classNames={{
                title: "text-xs hover:!text-primary-primary",
                selectedIcon: "text-primary-primary",
              }}
            >
              Belum Bekerja
            </SelectItem>
          </Select>
        )}

        {/* current_position_id */}
        {selectedFilters.has("current_position_id") && (
          <Select
            label="Pilih pekerjaan sekarang impian"
            labelPlacement="outside"
            variant="bordered"
            name="current_position_id"
            selectedKeys={new Set([filters.current_position_id || ""])}
            onSelectionChange={(key) => {
              const value = Array.from(key)[0];
              setFilters((prev) => ({ ...prev, current_position_id: value }));
            }}
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

        {/* current_company_id */}
        {selectedFilters.has("current_company_id") && (
          <Select
            isMultiline={true}
            items={companies}
            label="Pilih perusahaan impian"
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
            selectedKeys={new Set([filters.current_company_id || ""])}
            onSelectionChange={(key) => {
              const value = Array.from(key)[0];
              setFilters((prev) => ({ ...prev, current_company_id: value }));
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

        {/* role_id */}
        {selectedFilters.has("role_id") && (
          <Select
            label="Pilih peran pengguna"
            labelPlacement="outside"
            variant="bordered"
            name="role_id"
            selectedKeys={new Set([filters.role_id || ""])}
            onSelectionChange={(key) => {
              const value = Array.from(key)[0];
              setFilters((prev) => ({ ...prev, role_id: value }));
            }}
            classNames={{
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
      </section>

      {/* Hasil */}
      <div className="flex flex-col gap-2">
        {(searchKeyword || Object.keys(filters).length > 0) && (
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary">
              Kata kunci <span className="text-primary-primary">{searchKeyword || "..."}</span>
            </span>
            <span className="text-xs text-text-secondary">
              Kami menemukan <span className="font-bold text-primary-primary">{users.length}</span> pengguna
            </span>
          </div>
        )}
      </div>

      {/* Section Tampilan Card / Table */}
      {viewMode === "card" ? (
        <section className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoadingUsers ? (
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
          ) : apiErrorUsers ? (
            <p className="text-start text-xs text-danger-primary">{apiErrorUsers}</p>
          ) : currentItems.length === 0 ? (
            <div className="w-full col-span-full text-center py-8">
              <p className="text-sm text-gray-500">Data belum tersedia.</p>
            </div>
          ) : (
            currentItems.map((item) => <CardPengguna key={item.user_id} {...item} />)
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
                    const user = item.actions;
                    return (
                      <TableCell>
                        <div className="flex justify-center items-center gap-2">
                          <Tooltip content="Lihat detail" placement="top" className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                            <Button as={Link} isIconOnly variant="light" size="sm" href={`/pengguna/${user.user_name}`}>
                              <Eye size={20} className="text-yellow-500" variant="Bold" color="currentColor" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Edit data" placement="top" className="bg-primary-primary text-white text-xs px-2 py-1 rounded">
                            <Button as={Link} isIconOnly variant="light" size="sm" href={`/pengguna/edit/${user.user_name}`}>
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
                                  const result = await deleteUserById(user.user_id);
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

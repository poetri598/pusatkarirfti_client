import React, { useState, useEffect } from "react";

// Components
import { Form, Avatar, Input, Select, SelectItem, Spinner, Switch, DatePicker, Link, Button } from "@heroui/react";
import { showSuccessDialog, showErrorDialog, showConfirmationDialog } from "@/components/Custom/AlertButton";

// Context
import { useAuth } from "@/context/AuthContext";

// Types
import { CompanyItem } from "@/types/company";
import { PositionItem } from "@/types/position";
import { UserWorkExperienceItem } from "@/types/userWorkExperience";
interface WorkExperienceInput {
  company_id: number;
  position_id: number;
  user_work_experience_start_date: string;
  user_work_experience_end_date: string;
  user_work_experience_is_current: boolean;
  user_work_experience_descriptions: string[];
}

// Services
import { getCompanyAll } from "@/services/company";
import { getPositionAll } from "@/services/position";
import { getWorkExperiencesByUsername, deleteWorkExperiencesByUsername } from "@/services/userWorkExperience";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { CalendarDate } from "@internationalized/date";

function parseISOStringToCalendarDate(isoString: string | null): CalendarDate | null {
  if (!isoString) return null;
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return null;
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export default function Page() {
  const { user } = useAuth();

  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [apiErrorCompanies, setApiErrorCompanies] = useState<string | null>(null);

  const [positions, setPositions] = useState<PositionItem[]>([]);
  const [isLoadingPositions, setIsLoadingPositions] = useState(true);
  const [apiErrorPositions, setApiErrorPositions] = useState<string | null>(null);

  const [experiences, setExperiences] = useState<WorkExperienceInput[]>([]);
  const [isLoadingExperiences, setIsLoadingExperiences] = useState(true);
  const [apiErrorExperiences, setApiErrorExperiences] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getCompanyAll, setCompanies, setApiErrorCompanies, setIsLoadingCompanies), createServiceFetcher(getPositionAll, setPositions, setApiErrorPositions, setIsLoadingPositions)];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const fetchExperiences = async () => {
      if (!user?.user_name) return;
      setIsLoadingExperiences(true);
      const { success, data, error } = await getWorkExperiencesByUsername(user.user_name);

      if (success && data) {
        const mapped = data.map((exp: UserWorkExperienceItem) => ({
          company_id: exp.company_id,
          position_id: exp.position_id,
          user_work_experience_start_date: exp.user_work_experience_start_date,
          user_work_experience_end_date: exp.user_work_experience_end_date || "",
          user_work_experience_is_current: Boolean(exp.user_work_experience_is_current),
          user_work_experience_descriptions:
            typeof exp.user_work_experience_descriptions === "string"
              ? (exp.user_work_experience_descriptions as string).split("@")
              : exp.user_work_experience_descriptions?.map((desc: any) => desc.user_work_experience_description_name) ?? [""],
        }));

        setExperiences(
          mapped.length > 0
            ? mapped
            : [
                {
                  company_id: 0,
                  position_id: 0,
                  user_work_experience_start_date: "",
                  user_work_experience_end_date: "",
                  user_work_experience_is_current: false,
                  user_work_experience_descriptions: [""],
                },
              ]
        );
      } else {
        setApiErrorExperiences(error || "Gagal mengambil data");
      }

      setIsLoadingExperiences(false);
    };

    fetchExperiences();
  }, [user?.user_name]);

  const handleChange = <K extends keyof WorkExperienceInput>(expIndex: number, key: K, value: WorkExperienceInput[K]) => {
    const updated = [...experiences];
    updated[expIndex][key] = value;
    setExperiences(updated);
  };

  const handleDescChange = (expIndex: number, descIndex: number, value: string) => {
    const updated = [...experiences];
    updated[expIndex].user_work_experience_descriptions[descIndex] = value;
    setExperiences(updated);
  };

  if (isLoadingExperiences) {
    return (
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
    );
  }

  if (apiErrorExperiences) {
    return <p className="text-center text-danger-primary">{apiErrorExperiences}</p>;
  }

  return (
    <Form className="w-full flex flex-col gap-4">
      <div className="w-full justify-end flex xs:flex-col md:flex-row gap-2">
        <Button
          className="delete"
          onPress={async () => {
            const confirm = await showConfirmationDialog();
            if (!confirm.isConfirmed) return null;
            const result = await deleteWorkExperiencesByUsername(user?.user_name || "");
            if (result.success) {
              await showSuccessDialog();
              window.location.reload();
            } else {
              await showErrorDialog(result.error);
            }
          }}
        >
          Hapus Pengalaman Kerja
        </Button>
        <Link className="login" href={`/buat-cv/ubah-pengalaman-kerja/${user?.user_name}`}>
          Ubah Pengalaman Kerja
        </Link>
      </div>
      {experiences.map((exp, i) => (
        <div key={i} className="relative w-full border border-default-200 rounded-medium p-4 flex flex-col gap-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              {/* Perusahaan & Posisi */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2">
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
                    isDisabled
                    isMultiline={true}
                    items={companies}
                    label="Pilih perusahaan/instansi"
                    placeholder="Pilih perusahaan/instansi"
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
                    selectedKeys={exp.company_id && companies.some((c) => c.company_id === exp.company_id) ? new Set([String(exp.company_id)]) : new Set()}
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0];
                      handleChange(i, "company_id", Number(selectedKey));
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
                    isDisabled
                    label="Pilih jabatan"
                    labelPlacement="outside"
                    variant="bordered"
                    name="position_id"
                    selectedKeys={exp.position_id && positions.some((p) => p.position_id === exp.position_id) ? new Set([String(exp.position_id)]) : new Set()}
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0];
                      handleChange(i, "position_id", Number(selectedKey));
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
                      positions.map((item) => (
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
              </div>

              {/* Deskripsi */}
              <div className="flex flex-col gap-2">
                {exp.user_work_experience_descriptions.map((desc, j) => (
                  <div key={j} className="flex xs:flex-col md:flex-row gap-2 xs:items-start md:items-end">
                    <Input
                      isReadOnly
                      label="Masukkan deskripsi pekerjaan"
                      labelPlacement="outside"
                      name="experience_description"
                      value={desc}
                      onValueChange={(val) => handleDescChange(i, j, val)}
                      type="text"
                      variant="bordered"
                      classNames={{
                        label: "after:text-danger-primary text-xs text-text-secondary",
                        input: "focus:!border-primary-primary text-xs",
                        inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                        errorMessage: "text-danger-primary text-xs",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Waktu */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2">
                <DatePicker
                  isReadOnly
                  hideTimeZone
                  granularity="day"
                  showMonthAndYearPickers
                  label="Waktu mulai menjabat"
                  name="user_work_experience_start_date"
                  labelPlacement="outside"
                  variant="bordered"
                  value={parseISOStringToCalendarDate(exp.user_work_experience_start_date)}
                  onChange={(val) => {
                    const dateOnly = val?.toString() ?? "";
                    handleChange(i, "user_work_experience_start_date", dateOnly);
                  }}
                  classNames={{
                    label: "after:text-danger-primary text-xs",
                    selectorIcon: "text-primary-primary",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary focus:!border-primary-primary",
                    errorMessage: "text-danger-primary",
                    calendarContent: "bg-primary-primary text-xs text-white",
                    segment: "text-xs",
                  }}
                />

                <DatePicker
                  isRequired
                  hideTimeZone
                  granularity="day"
                  showMonthAndYearPickers
                  label="Waktu berakhir menjabat"
                  name="user_work_experience_end_date"
                  labelPlacement="outside"
                  variant="bordered"
                  isDisabled={exp.user_work_experience_is_current}
                  value={parseISOStringToCalendarDate(exp.user_work_experience_end_date)}
                  onChange={(val) => {
                    const dateOnly = val?.toString() ?? "";
                    handleChange(i, "user_work_experience_end_date", dateOnly);
                  }}
                  classNames={{
                    label: "after:text-danger-primary text-xs",
                    selectorIcon: "text-primary-primary",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary focus:!border-primary-primary",
                    errorMessage: "text-danger-primary",
                    calendarContent: "bg-primary-primary text-xs text-white",
                    segment: "text-xs",
                  }}
                />
              </div>

              {/* Current */}
              <Switch
                isReadOnly
                isSelected={exp.user_work_experience_is_current}
                onValueChange={(val) => handleChange(i, "user_work_experience_is_current", val)}
                classNames={{
                  thumb: "bg-primary-primary",
                  label: "text-xs font-medium text-text-primary",
                }}
              >
                {exp.user_work_experience_is_current ? "Masih menjabat" : "Sudah tidak menjabat"}
              </Switch>
            </div>
            <div className="w-full h-full flex flex-col justify-center gradient-style-2 items-center p-8 gap-4">
              <span className="xs:text-sm md:text-2xl text-background-primary">Contoh bagian data diri</span>
              <img src="/data-diri-img.png" alt="contoh-cv" className="w-full" />
            </div>
          </div>
        </div>
      ))}
    </Form>
  );
}

import React, { useState, useEffect } from "react";

// Components
import { Form, Avatar, Input, Select, SelectItem, Spinner, Switch, DatePicker, Link, Button, NumberInput } from "@heroui/react";
import { showSuccessDialog, showErrorDialog, showConfirmationDialog } from "@/components/Custom/AlertButton";

// Context
import { useAuth } from "@/context/AuthContext";

// Types
import { CompanyItem } from "@/types/company";
import { EducationItem } from "@/types/education";
import { ProgramStudyItem } from "@/types/programStudy";
import { UserEducationItem } from "@/types/userEducation";
interface UserEducationInput {
  program_study_id: number;
  education_id: number;
  company_id: number;
  user_education_admission_date: string;
  user_education_graduation_date: string | null;
  user_education_is_current: boolean;
  user_education_final_score: number;
}

// Services
import { getCompanyAll } from "@/services/company";
import { getEducationAll } from "@/services/education";
import { getProgramStudyAll } from "@/services/programStudy";
import { getUserEducationsByUsername, deleteUserEducationsByUsername } from "@/services/userEducation";

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

  const [education, setEducation] = useState<EducationItem[]>([]);
  const [isLoadingEducation, setIsLoadingEducation] = useState(true);
  const [apiErrorEducation, setApiErrorEducation] = useState<string | null>(null);

  const [programStudy, setProgramStudy] = useState<ProgramStudyItem[]>([]);
  const [isLoadingProgramStudy, setIsLoadingProgramStudy] = useState(true);
  const [apiErrorProgramStudy, setApiErrorProgramStudy] = useState<string | null>(null);

  const [educations, setEducations] = useState<UserEducationInput[]>([]);
  const [isLoadingEducations, setIsLoadingEducations] = useState(true);
  const [apiErrorEducations, setApiErrorEducations] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [
        createServiceFetcher(getCompanyAll, setCompanies, setApiErrorCompanies, setIsLoadingCompanies),
        createServiceFetcher(getEducationAll, setEducation, setApiErrorEducation, setIsLoadingEducation),
        createServiceFetcher(getProgramStudyAll, setProgramStudy, setApiErrorProgramStudy, setIsLoadingProgramStudy),
      ];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const fetchEducations = async () => {
      if (!user?.user_name) return;
      setIsLoadingEducations(true);
      const { success, data, error } = await getUserEducationsByUsername(user.user_name);

      if (success && data) {
        const mapped = data.map((edu: UserEducationItem) => ({
          program_study_id: edu.program_study_id,
          education_id: edu.education_id,
          company_id: edu.company_id,
          user_education_admission_date: edu.user_education_admission_date,
          user_education_graduation_date: edu.user_education_graduation_date || "",
          user_education_is_current: Boolean(edu.user_education_is_current),
          user_education_final_score: edu.user_education_final_score,
        }));

        setEducations(
          mapped.length > 0
            ? mapped
            : [
                {
                  program_study_id: 0,
                  education_id: 0,
                  company_id: 0,
                  user_education_admission_date: "",
                  user_education_graduation_date: "",
                  user_education_is_current: false,
                  user_education_final_score: 0,
                },
              ]
        );
      } else {
        setApiErrorEducation(error || "Gagal mengambil data");
      }

      setIsLoadingEducations(false);
    };

    fetchEducations();
  }, [user?.user_name]);

  const handleChange = <K extends keyof UserEducationInput>(eduIndex: number, key: K, value: UserEducationInput[K]) => {
    const updated = [...educations];
    updated[eduIndex][key] = value;
    setEducations(updated);
  };

  if (isLoadingEducations) {
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

  if (apiErrorEducations) {
    return <p className="text-center text-danger-primary">{apiErrorEducations}</p>;
  }

  return (
    <Form className="w-full flex flex-col gap-4">
      <div className="w-full justify-end flex xs:flex-col md:flex-row gap-2">
        <Button
          className="delete"
          onPress={async () => {
            const confirm = await showConfirmationDialog();
            if (!confirm.isConfirmed) return null;
            const result = await deleteUserEducationsByUsername(user?.user_name || "");
            if (result.success) {
              await showSuccessDialog();
              window.location.reload();
            } else {
              await showErrorDialog(result.error);
            }
          }}
        >
          Hapus Riwayat Pendidikan
        </Button>
        <Link className="login" href={`/buat-cv/ubah-riwayat-pendidikan/${user?.user_name}`}>
          Ubah Riwayat Pendidikan
        </Link>
      </div>
      {educations.map((edu, i) => (
        <div key={i} className="relative w-full border border-default-200 rounded-medium p-4 flex flex-col gap-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              {/* Jenjang Pendidikan */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2">
                {isLoadingEducation ? (
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
                ) : apiErrorEducation ? (
                  <p className="text-start text-xs text-danger-primary">{apiErrorEducations}</p>
                ) : (
                  <Select
                    isDisabled
                    label="Jenjang pendidikan"
                    placeholder="Jenjang pendidikan"
                    labelPlacement="outside"
                    name="education_id"
                    selectedKeys={edu.education_id && education.some((p) => p.education_id === edu.education_id) ? new Set([String(edu.education_id)]) : new Set()}
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0];
                      handleChange(i, "education_id", Number(selectedKey));
                    }}
                    classNames={{
                      label: "after:text-danger-primary text-xs text-text-secondary",
                      trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary",
                      value: "text-xs",
                      errorMessage: "text-danger-primary text-xs",
                    }}
                  >
                    {education.length === 0 ? (
                      <SelectItem key="nodata" isDisabled>
                        Data belum tersedia
                      </SelectItem>
                    ) : (
                      education.map((item) => (
                        <SelectItem
                          key={item.education_id}
                          textValue={item.education_name}
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
                    label="Perusahaan/instansi"
                    placeholder="Perusahaan/instansi"
                    labelPlacement="outside"
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
                    selectedKeys={edu.company_id && companies.some((c) => c.company_id === edu.company_id) ? new Set([String(edu.company_id)]) : new Set()}
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
              </div>

              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2">
                {isLoadingProgramStudy ? (
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
                ) : apiErrorProgramStudy ? (
                  <p className="text-start text-xs text-danger-primary">{apiErrorProgramStudy}</p>
                ) : (
                  <Select
                    isDisabled
                    label="Program Studi/Jurusan"
                    placeholder="Program Studi/Jurusan"
                    labelPlacement="outside"
                    name="program_study_id"
                    selectedKeys={edu.program_study_id && programStudy.some((p) => p.program_study_id === edu.program_study_id) ? new Set([String(edu.program_study_id)]) : new Set()}
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0];
                      handleChange(i, "program_study_id", Number(selectedKey));
                    }}
                    classNames={{
                      label: "after:text-danger-primary text-xs text-text-secondary",
                      trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary",
                      value: "text-xs",
                      errorMessage: "text-danger-primary text-xs",
                    }}
                  >
                    {programStudy.length === 0 ? (
                      <SelectItem key="nodata" isDisabled>
                        Data belum tersedia
                      </SelectItem>
                    ) : (
                      programStudy.map((item) => (
                        <SelectItem
                          key={item.program_study_id}
                          textValue={item.program_study_name}
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

                <NumberInput
                  isReadOnly
                  label="Nilai akhir"
                  placeholder="Nilai akhir"
                  labelPlacement="outside"
                  name="user_education_final_score"
                  value={Number(edu.user_education_final_score)}
                  onValueChange={(val) => handleChange(i, "user_education_final_score", val)}
                  step={0.01}
                  minValue={0}
                  max={100}
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    input: "focus:!border-primary-primary text-xs",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                />
              </div>

              {/* Waktu */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2">
                <DatePicker
                  isReadOnly
                  hideTimeZone
                  granularity="day"
                  showMonthAndYearPickers
                  label="Waktu masuk"
                  name="user_education_admission_date"
                  labelPlacement="outside"
                  value={parseISOStringToCalendarDate(edu.user_education_admission_date)}
                  onChange={(val) => {
                    const dateOnly = val?.toString() ?? "";
                    handleChange(i, "user_education_admission_date", dateOnly);
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
                  label="Waktu lulus"
                  name="user_education_graduation_date"
                  labelPlacement="outside"
                  isDisabled={edu.user_education_is_current}
                  value={parseISOStringToCalendarDate(edu.user_education_graduation_date)}
                  onChange={(val) => {
                    const dateOnly = val?.toString() ?? "";
                    handleChange(i, "user_education_graduation_date", dateOnly);
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
                isSelected={edu.user_education_is_current}
                onValueChange={(val) => handleChange(i, "user_education_is_current", val)}
                classNames={{
                  thumb: "bg-primary-primary",
                  label: "text-xs font-medium text-text-primary",
                }}
              >
                {edu.user_education_is_current ? "Belum Lulus" : "Lulus"}
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

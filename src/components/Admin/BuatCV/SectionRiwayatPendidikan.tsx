import React, { useState, useEffect } from "react";

// Components
import { Form, Avatar, Input, Select, SelectItem, Spinner, Switch, DatePicker, Link, Button, NumberInput } from "@heroui/react";
import { showSuccessDialog, showErrorDialog, showConfirmationDialog } from "@/components/Custom/AlertButton";

// Context
import { useAuth } from "@/context/AuthContext";

// Types
import { EducationItem } from "@/types/education";
import { UserEducationItem } from "@/types/userEducation";
interface UserEducationInput {
  education_id: number;
  user_education_name: string;
  user_education_subject: string;
  user_education_admission_date: string;
  user_education_graduation_date: string | null;
  user_education_is_current: boolean;
  user_education_final_score: number;
}

// Services
import { getEducationAll } from "@/services/education";
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

  const [education, setEducation] = useState<EducationItem[]>([]);
  const [isLoadingEducation, setIsLoadingEducation] = useState(true);
  const [apiErrorEducation, setApiErrorEducation] = useState<string | null>(null);

  const [educations, setEducations] = useState<UserEducationInput[]>([]);
  const [isLoadingEducations, setIsLoadingEducations] = useState(true);
  const [apiErrorEducations, setApiErrorEducations] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getEducationAll, setEducation, setApiErrorEducation, setIsLoadingEducation)];
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
          education_id: edu.education_id,
          user_education_admission_date: edu.user_education_admission_date,
          user_education_graduation_date: edu.user_education_graduation_date || "",
          user_education_is_current: Boolean(edu.user_education_is_current),
          user_education_name: edu.user_education_name,
          user_education_subject: edu.user_education_subject,
          user_education_final_score: edu.user_education_final_score,
        }));

        setEducations(
          mapped.length > 0
            ? mapped
            : [
                {
                  education_id: 0,
                  user_education_admission_date: "",
                  user_education_graduation_date: "",
                  user_education_is_current: false,
                  user_education_name: "",
                  user_education_subject: "",
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
              {/* Perusahaan & Posisi */}
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2">
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
                    isDisabled
                    label="Pilih jenjang pendidikan"
                    labelPlacement="outside"
                    variant="bordered"
                    name="education_id"
                    selectedKeys={edu.education_id && educations.some((p) => p.education_id === edu.education_id) ? new Set([String(edu.education_id)]) : new Set()}
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

                <Input
                  isReadOnly
                  label="Masukkan nama sekolah"
                  labelPlacement="outside"
                  name="user_education_name"
                  value={edu.user_education_name}
                  onValueChange={(val) => handleChange(i, "user_education_name", val)}
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

              <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2">
                <Input
                  isReadOnly
                  label="Masukkan nama jurusan"
                  labelPlacement="outside"
                  name="user_education_subject"
                  value={edu.user_education_subject}
                  onValueChange={(val) => handleChange(i, "user_education_subject", val)}
                  type="text"
                  variant="bordered"
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    input: "focus:!border-primary-primary text-xs",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                />

                <NumberInput
                  isReadOnly
                  label="Masukkan nilai akhir"
                  labelPlacement="outside"
                  name="user_education_final_score"
                  value={Number(edu.user_education_final_score)}
                  onValueChange={(val) => handleChange(i, "user_education_final_score", val)}
                  step={0.01}
                  minValue={0}
                  max={100}
                  variant="bordered"
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
                  variant="bordered"
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
                  variant="bordered"
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

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { AddCircle, Trash } from "iconsax-react";

// Components
import { Form, Breadcrumbs, BreadcrumbItem, Avatar, Button, Accordion, AccordionItem, ScrollShadow, Input, Select, SelectItem, Selection, Spinner, Switch, DatePicker, NumberInput } from "@heroui/react";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

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
import { getUserByUsername } from "@/services/user";
import { getUserEducationsByUsername, updateUserEducationsByUsername } from "@/services/userEducation";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { CalendarDate } from "@internationalized/date";

function parseISOStringToCalendarDate(isoString: string | null): CalendarDate | null {
  if (!isoString) return null;
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return null;
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export default function Page({ user_name }: { user_name: string }) {
  const router = useRouter();
  const [user_id, setUserId] = useState<number>(1);

  const [education, setEducation] = useState<EducationItem[]>([]);
  const [education_id, setEducationId] = useState<Selection>(new Set([]));
  const [isLoadingEducation, setIsLoadingEducation] = useState(false);
  const [apiErrorEducation, setApiErrorEducation] = useState<string | null>(null);

  const [educations, setEducations] = useState<UserEducationInput[]>([]);
  const [isLoadingEducations, setIsLoadingEducations] = useState(true);
  const [apiErrorEducations, setApiErrorEducations] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getEducationAll, setEducation, setApiErrorEducations, setIsLoadingEducations)];
      await Promise.all(fetchers.map((fetch) => fetch()));

      const { success: userSuccess, data: userData } = await getUserByUsername(user_name);
      if (userSuccess && userData) {
        setUserId(userData.user_id);
      }

      const { success, data, error } = await getUserEducationsByUsername(user_name);
      if (success && data) {
        const mapped: UserEducationInput[] = data.map((edu: UserEducationItem) => ({
          education_id: edu.education_id,
          user_education_admission_date: edu.user_education_admission_date,
          user_education_graduation_date: edu.user_education_graduation_date || "",
          user_education_is_current: Boolean(edu.user_education_is_current),
          user_education_name: edu.user_education_name,
          user_education_subject: edu.user_education_subject,
          user_education_final_score: edu.user_education_final_score,
        }));

        setEducations(mapped.length ? mapped : [defaultEducation()]);
      } else {
        setApiErrorEducations(error || "Gagal mengambil data");
      }

      setIsLoadingEducations(false);
    };

    fetchAll();
  }, [user_name]);

  const defaultEducation = (): UserEducationInput => ({
    education_id: 0,
    user_education_admission_date: "",
    user_education_graduation_date: "",
    user_education_is_current: false,
    user_education_name: "",
    user_education_subject: "",
    user_education_final_score: 0,
  });

  const handleChange = <K extends keyof UserEducationInput>(expIndex: number, key: K, value: UserEducationInput[K]) => {
    const updated = [...educations];
    updated[expIndex][key] = value;
    setEducations(updated);
  };

  const addExperience = () => {
    setEducations([
      ...educations,
      {
        education_id: 0,
        user_education_admission_date: "",
        user_education_graduation_date: "",
        user_education_is_current: false,
        user_education_name: "",
        user_education_subject: "",
        user_education_final_score: 0,
      },
    ]);
  };

  const removeExperience = (index: number) => {
    const updated = educations.filter((_, i) => i !== index);
    setEducations(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("user_id", user_id.toString());
    educations.forEach((edu, i) => {
      formData.append(`educations[${i}][education_id]`, edu.education_id.toString());
      formData.append(`educations[${i}][user_education_name]`, edu.user_education_name);
      formData.append(`educations[${i}][user_education_subject]`, edu.user_education_subject);
      formData.append(`educations[${i}][user_education_final_score]`, edu.user_education_final_score.toString());
      formData.append(`educations[${i}][user_education_admission_date]`, edu.user_education_admission_date);
      formData.append(`educations[${i}][user_education_graduation_date]`, edu.user_education_graduation_date || "");
      formData.append(`educations[${i}][user_education_is_current]`, edu.user_education_is_current ? "1" : "0");
    });

    const { success, data, error } = await updateUserEducationsByUsername(user_name, formData);
    if (success) {
      await showSuccessDialog();
      router.push(`/buat-cv`);
    } else {
      await showErrorDialog(error || "Terjadi kesalahan");
    }
    setLoading(false);
  };

  return (
    <section className="w-full bg-background-primary py-8">
      <div className="xs:w-11/12 lg:w-10/12 min-h-screen mx-auto flex flex-col xs:gap-4 md:gap-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          className="text-xs text-text-secondary"
          itemClasses={{
            item: "data-[current=true]:text-primary-primary",
          }}
        >
          <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
          <BreadcrumbItem href="/buat-cv" className="text-primary-primary">
            Buat CV
          </BreadcrumbItem>
          <BreadcrumbItem href={`/buat-cv/ubah-riwayat-pendidikan/${user_name}`} className="text-primary-primary">
            Ubah Riwayat Pendidikan
          </BreadcrumbItem>
        </Breadcrumbs>

        <Accordion variant="splitted" className="gap-8" isCompact>
          <AccordionItem
            key="riwayat-pendidikan"
            textValue="Riwayat Pendidikan"
            title={
              <div className="relative w-fit">
                <p className=" relative z-10 xs:text-base md:text-xl text-primary-primary font-bold ">Riwayat Pendidikan</p>
                <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
              </div>
            }
            classNames={{ indicator: "py-4" }}
          >
            <ScrollShadow className="w-full min-h-screen xs:py-8 md:p-8" hideScrollBar>
              <Form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                {educations.map((edu, i) => (
                  <div key={i} className="relative w-full border border-default-200 rounded-medium p-4 flex flex-col gap-4">
                    <div className="w-full xs:justify-start md:justify-end flex ">
                      <Button type="button" className="delete" onPress={() => removeExperience(i)}>
                        Hapus Riwayat Pendidikan <Trash size={20} color="currentColor" className="text-white" />
                      </Button>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-4">
                        {/* Perusahaan & Posisi */}
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
                            <p className="text-start text-xs text-danger-primary">{apiErrorEducation}</p>
                          ) : (
                            <Select
                              isRequired
                              label="Pilih jenjang pendidikan"
                              labelPlacement="outside"
                              variant="bordered"
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

                          <Input
                            isRequired
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
                            isRequired
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
                            isRequired
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

                <div className="w-full justify-start flex ">
                  <Button className="login" type="button" onPress={addExperience}>
                    Tambah Riwayat Pendidikan <AddCircle size={20} color="currentColor" className="text-white" />
                  </Button>
                </div>

                <div className="w-full justify-end flex ">
                  <Button className="login" type="submit">
                    Simpan Perubahan
                  </Button>
                </div>
              </Form>
            </ScrollShadow>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

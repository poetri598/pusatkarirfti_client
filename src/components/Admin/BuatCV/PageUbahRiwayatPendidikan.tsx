import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { AddCircle, Trash } from "iconsax-react";

// Components
import { Form, Breadcrumbs, BreadcrumbItem, Avatar, Button, Accordion, AccordionItem, ScrollShadow, Input, Select, SelectItem, Selection, Spinner, Switch, DatePicker, NumberInput } from "@heroui/react";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";
import { ZonedDateTime, now, getLocalTimeZone, parseAbsoluteToLocal } from "@internationalized/date";

// Types
import { CompanyItem } from "@/types/company";
import { EducationItem } from "@/types/education";
import { ProgramStudyItem } from "@/types/programStudy";
import { UserEducationItem } from "@/types/userEducation";
interface UserEducationInput {
  program_study_id: number;
  education_id: number;
  company_id: number;
  user_education_admission_date: ZonedDateTime | null;
  user_education_graduation_date: ZonedDateTime | null;
  user_education_is_current: boolean;
  user_education_final_score: number;
}

// Services
import { getCompanyAll, createCompany } from "@/services/company";
import { getEducationAll } from "@/services/education";
import { getProgramStudyAll, createProgramStudy } from "@/services/programStudy";
import { getUserByUsername } from "@/services/user";
import { getUserEducationsByUsername, updateUserEducationsByUsername } from "@/services/userEducation";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { formatZonedDateTime } from "@/utils/time";

export default function Page({ user_name }: { user_name: string }) {
  const router = useRouter();
  const [user_id, setUserId] = useState<number>(1);

  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [company_id, setCompanyId] = useState<Selection>(new Set([]));
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
  const [apiErrorCompanies, setApiErrorCompanies] = useState<string | null>(null);

  const [education, setEducation] = useState<EducationItem[]>([]);
  const [education_id, setEducationId] = useState<Selection>(new Set([]));
  const [isLoadingEducation, setIsLoadingEducation] = useState(false);
  const [apiErrorEducation, setApiErrorEducation] = useState<string | null>(null);

  const [programStudy, setProgramStudy] = useState<ProgramStudyItem[]>([]);
  const [isLoadingProgramStudy, setIsLoadingProgramStudy] = useState(false);
  const [apiErrorProgramStudy, setApiErrorProgramStudy] = useState<string | null>(null);

  const [educations, setEducations] = useState<UserEducationInput[]>([]);
  const [isLoadingEducations, setIsLoadingEducations] = useState(true);
  const [apiErrorEducations, setApiErrorEducations] = useState<string | null>(null);

  const [isAddingNewProgramStudy, setIsAddingNewProgramStudy] = useState<boolean[]>([]);
  const [newProgramStudyNames, setNewProgramStudyNames] = useState<string[]>([]);

  const [isAddingNewCompany, setIsAddingNewCompany] = useState<boolean[]>([]);
  const [newCompanyNames, setNewCompanyNames] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [
        createServiceFetcher(getCompanyAll, setCompanies, setApiErrorCompanies, setIsLoadingCompanies),
        createServiceFetcher(getEducationAll, setEducation, setApiErrorEducations, setIsLoadingEducations),
        createServiceFetcher(getProgramStudyAll, setProgramStudy, setApiErrorProgramStudy, setIsLoadingProgramStudy),
      ];
      await Promise.all(fetchers.map((fetch) => fetch()));

      const { success: userSuccess, data: userData } = await getUserByUsername(user_name);
      if (userSuccess && userData) {
        setUserId(userData.user_id);
      }

      const { success, data, error } = await getUserEducationsByUsername(user_name);
      if (success && data) {
        const mapped: UserEducationInput[] = data.map((edu: UserEducationItem) => ({
          program_study_id: edu.program_study_id,
          education_id: edu.education_id,
          company_id: edu.company_id,
          user_education_admission_date: edu.user_education_admission_date ? parseAbsoluteToLocal(edu.user_education_admission_date) : null,
          user_education_graduation_date: edu.user_education_graduation_date ? parseAbsoluteToLocal(edu.user_education_graduation_date) : null,
          user_education_is_current: Boolean(edu.user_education_is_current),
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
    program_study_id: 0,
    education_id: 0,
    company_id: 0,
    user_education_admission_date: now(getLocalTimeZone()),
    user_education_graduation_date: null,
    user_education_is_current: false,
    user_education_final_score: 0,
  });

  const handleChange = <K extends keyof UserEducationInput>(eduIndex: number, key: K, value: UserEducationInput[K]) => {
    const updated = [...educations];
    updated[eduIndex][key] = value;
    setEducations(updated);
  };

  const addEducation = () => {
    setEducations([...educations, defaultEducation()]);
    setIsAddingNewProgramStudy([...isAddingNewProgramStudy, false]);
    setNewProgramStudyNames([...newProgramStudyNames, ""]);
    setIsAddingNewCompany([...isAddingNewCompany, false]);
    setNewCompanyNames([...newCompanyNames, ""]);
  };

  const removeeduerience = (index: number) => {
    const updated = educations.filter((_, i) => i !== index);
    setEducations(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);

    for (let i = 0; i < educations.length; i++) {
      if (isAddingNewCompany[i] && newCompanyNames[i]) {
        const formData = new FormData();
        formData.append("company_name", newCompanyNames[i]);
        formData.append("company_desc", "-");
        formData.append("company_link", "-");
        formData.append("company_is_partner", "0");
        formData.append("status_id", "1");

        const { success, data, error } = await createCompany(formData);
        if (success && data) {
          const newCompanyId = data.company_id;
          handleChange(i, "company_id", newCompanyId);
        } else {
          await showErrorDialog(error || `Gagal menambahkan perusahaan baru di baris ke-${i + 1}`);
          setLoading(false);
          return;
        }
      }
    }
    const refreshed = await getCompanyAll();
    if (refreshed.success) setCompanies(refreshed.data || []);
    setIsAddingNewCompany(new Array(educations.length).fill(false));
    setNewCompanyNames(new Array(educations.length).fill(""));

    for (let i = 0; i < educations.length; i++) {
      if (isAddingNewProgramStudy[i] && newProgramStudyNames[i]) {
        const formData = new FormData();
        formData.append("program_study_name", newProgramStudyNames[i]);
        const { success, data, error } = await createProgramStudy(formData);
        if (success && data) {
          const newProgramStudyId = data.program_study_id;
          handleChange(i, "program_study_id", newProgramStudyId);
        } else {
          await showErrorDialog(error || `Gagal menambahkan program studi baru di baris ke-${i + 1}`);
          setLoading(false);
          return;
        }
      }
    }
    const refreshedProgramStudy = await getProgramStudyAll();
    if (refreshedProgramStudy.success) setProgramStudy(refreshedProgramStudy.data || []);
    setIsAddingNewProgramStudy(new Array(educations.length).fill(false));
    setNewProgramStudyNames(new Array(educations.length).fill(""));

    const formData = new FormData();
    formData.append("user_id", user_id.toString());
    educations.forEach((edu, i) => {
      formData.append(`educations[${i}][program_study_id]`, edu.program_study_id.toString());
      formData.append(`educations[${i}][education_id]`, edu.education_id.toString());
      formData.append(`educations[${i}][company_id]`, edu.company_id.toString());
      formData.append(`educations[${i}][user_education_final_score]`, edu.user_education_final_score.toString());
      if (edu.user_education_admission_date) formData.append(`educations[${i}][user_education_admission_date]`, formatZonedDateTime(edu.user_education_admission_date));
      if (edu.user_education_graduation_date) formData.append(`educations[${i}][user_education_graduation_date]`, formatZonedDateTime(edu.user_education_graduation_date));
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
      <div className="w-full min-h-screen mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
        {" "}
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <Spinner
              label="Loading..."
              variant="wave"
              classNames={{
                label: "text-primary-primary mt-4",
                dots: "border-5 border-primary-primary",
              }}
            />
          </div>
        )}
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
                      <Button type="button" className="delete" onPress={() => removeeduerience(i)}>
                        Hapus Riwayat Pendidikan <Trash size={20} color="currentColor" className="text-white" />
                      </Button>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-4">
                        {/* Jenjang pendidikan & Perusahaan */}
                        <div className="grid xs:grid-cols-1 sm:grid-cols-2 justify-center items-start xs:gap-2">
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
                                selectedKeys={edu.company_id && companies.some((c) => c.company_id === edu.company_id) ? new Set([String(edu.company_id)]) : new Set()}
                                onSelectionChange={(keys) => {
                                  const selectedKey = Array.from(keys)[0];
                                  const newIsAdding = [...isAddingNewCompany];
                                  const newNames = [...newCompanyNames];

                                  if (selectedKey === "-1") {
                                    newIsAdding[i] = true;
                                    newNames[i] = "";
                                    handleChange(i, "company_id", 0);
                                  } else {
                                    newIsAdding[i] = false;
                                    newNames[i] = "";
                                    handleChange(i, "company_id", Number(selectedKey));
                                  }

                                  setIsAddingNewCompany(newIsAdding);
                                  setNewCompanyNames(newNames);
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
                            {isAddingNewCompany[i] && (
                              <div className="flex flex-col gap-4 mt-2">
                                <Input
                                  isRequired
                                  label="Masukkan nama perusahaan/instansi"
                                  placeholder="Masukkan nama perusahaan/instansi"
                                  labelPlacement="outside"
                                  value={newCompanyNames[i]}
                                  onValueChange={(val) => {
                                    const updatedNames = [...newCompanyNames];
                                    updatedNames[i] = val;
                                    setNewCompanyNames(updatedNames);
                                  }}
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

                        <div className="grid xs:grid-cols-1 sm:grid-cols-2 justify-center items-start xs:gap-2">
                          <div className="flex flex-col">
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
                                label="Pilih program studi/jurusan"
                                placeholder="Pilih program studi/jurusan"
                                labelPlacement="outside"
                                variant="bordered"
                                name="program_study_id"
                                selectedKeys={edu.program_study_id && programStudy.some((p) => p.program_study_id === edu.program_study_id) ? new Set([String(edu.program_study_id)]) : new Set()}
                                onSelectionChange={(keys) => {
                                  const selectedKey = Array.from(keys)[0];
                                  const newIsAdding = [...isAddingNewProgramStudy];
                                  const newNames = [...newProgramStudyNames];

                                  if (selectedKey === "-1") {
                                    newIsAdding[i] = true;
                                    newNames[i] = "";
                                    handleChange(i, "program_study_id", 0);
                                  } else {
                                    newIsAdding[i] = false;
                                    newNames[i] = "";
                                    handleChange(i, "program_study_id", Number(selectedKey));
                                  }

                                  setIsAddingNewProgramStudy(newIsAdding);
                                  setNewProgramStudyNames(newNames);
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
                                  [
                                    {
                                      program_study_id: -1,
                                      program_study_name: "+ Tambah program studi/jurusan",
                                    },
                                    ...programStudy,
                                  ].map((item) => (
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
                            {isAddingNewProgramStudy[i] && (
                              <div className="flex flex-col gap-4 mt-2">
                                <Input
                                  label="Masukkan nama program studi/jurusan"
                                  placeholder="Masukkan nama program studi/jurusan"
                                  labelPlacement="outside"
                                  value={newProgramStudyNames[i]}
                                  onValueChange={(val) => {
                                    const updatedNames = [...newProgramStudyNames];
                                    updatedNames[i] = val;
                                    setNewProgramStudyNames(updatedNames);
                                  }}
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
                            value={edu.user_education_admission_date}
                            onChange={(val) => {
                              handleChange(i, "user_education_admission_date", val);
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
                            value={edu.user_education_graduation_date}
                            onChange={(val) => {
                              handleChange(i, "user_education_graduation_date", val);
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
                  <Button className="login" type="button" onPress={addEducation}>
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

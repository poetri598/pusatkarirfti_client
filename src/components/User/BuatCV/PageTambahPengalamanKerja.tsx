import React, { useState, useEffect } from "react";

// Iconsax
import { AddCircle, Trash } from "iconsax-react";

// Components
import { Form, Breadcrumbs, BreadcrumbItem, Avatar, Button, Accordion, AccordionItem, ScrollShadow, Input, Select, SelectItem, Selection, Spinner, Switch, DatePicker } from "@heroui/react";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { CompanyItem } from "@/types/company";
import { PositionItem } from "@/types/position";
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
import { getUserByUsername } from "@/services/user";
import { createWorkExperiences } from "@/services/userWorkExperience";

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
  const [user_id, setUserId] = useState<number>(1);
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [company_id, setCompanyId] = useState<Selection>(new Set([]));
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [apiErrorCompanies, setApiErrorCompanies] = useState<string | null>(null);

  const [positions, setPositions] = useState<PositionItem[]>([]);
  const [position_id, setPositionId] = useState<Selection>(new Set([]));
  const [isLoadingPositions, setIsLoadingPositions] = useState(true);
  const [apiErrorPositions, setApiErrorPositions] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getCompanyAll, setCompanies, setApiErrorCompanies, setIsLoadingCompanies), createServiceFetcher(getPositionAll, setPositions, setApiErrorPositions, setIsLoadingPositions)];
      await Promise.all(fetchers.map((fetch) => fetch()));
      const { success, data, error } = await getUserByUsername(user_name);
      if (!success || !data) {
        await showErrorDialog(error || "Gagal mengambil data");
        return;
      }
      setUserId(data.user_id);
    };

    fetchAll();
  }, [user_name]);

  const [experiences, setExperiences] = useState<WorkExperienceInput[]>([
    {
      company_id: 0,
      position_id: 0,
      user_work_experience_start_date: "",
      user_work_experience_end_date: "",
      user_work_experience_is_current: false,
      user_work_experience_descriptions: [""],
    },
  ]);

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

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company_id: 0,
        position_id: 0,
        user_work_experience_start_date: "",
        user_work_experience_end_date: "",
        user_work_experience_is_current: false,
        user_work_experience_descriptions: [""],
      },
    ]);
  };

  const removeExperience = (index: number) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };

  const addDescription = (expIndex: number) => {
    const updated = [...experiences];
    updated[expIndex].user_work_experience_descriptions.push("");
    setExperiences(updated);
  };

  const removeDescription = (expIndex: number, descIndex: number) => {
    const updated = [...experiences];
    updated[expIndex].user_work_experience_descriptions.splice(descIndex, 1);
    setExperiences(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("user_id", user_id.toString());
    experiences.forEach((exp, i) => {
      formData.append(`experiences[${i}][company_id]`, exp.company_id.toString());
      formData.append(`experiences[${i}][position_id]`, exp.position_id.toString());
      formData.append(`experiences[${i}][user_work_experience_start_date]`, exp.user_work_experience_start_date);
      formData.append(`experiences[${i}][user_work_experience_end_date]`, exp.user_work_experience_end_date);
      formData.append(`experiences[${i}][user_work_experience_is_current]`, exp.user_work_experience_is_current ? "1" : "0");
      exp.user_work_experience_descriptions.forEach((desc, j) => {
        formData.append(`experiences[${i}][user_work_experience_descriptions][${j}]`, desc);
      });
    });

    const { success, data, error } = await createWorkExperiences(formData);
    if (success) {
      await showSuccessDialog();
    } else {
      await showErrorDialog(error || "Terjadi kesalahan");
    }
    setLoading(false);
  };

  return (
    <section className="w-full bg-background-primary py-8">
      <div className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col xs:gap-4 md:gap-8">
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
          <BreadcrumbItem href={`/buat-cv/ubah-pengalaman-kerja/${user_name}`} className="text-primary-primary">
            Ubah Pengalaman Kerja
          </BreadcrumbItem>
        </Breadcrumbs>

        <Accordion variant="splitted" className="gap-8" isCompact>
          <AccordionItem
            key="pengalaman_kerja"
            textValue="Pengalaman Kerja"
            title={
              <div className="relative w-fit">
                <p className=" relative z-10 text-xl text-primary-primary font-bold ">Pengalaman Kerja</p>
                <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
              </div>
            }
            classNames={{ indicator: "py-4" }}
          >
            <ScrollShadow className="w-full min-h-screen py-8" hideScrollBar>
              <Form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                {experiences.map((exp, i) => (
                  <div key={i} className="relative w-full border border-default-200 rounded-medium p-4 flex flex-col gap-4">
                    <div className="w-full xs:justify-start md:justify-end flex ">
                      <Button type="button" className="delete" onPress={() => removeExperience(i)}>
                        Hapus Pengalaman Kerja <Trash size={20} color="currentColor" className="text-white" />
                      </Button>
                    </div>

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
                            <p className="text-start text-xs text-text-secondary">Data perusahaan belum tersedia</p>
                          ) : (
                            <Select
                              isRequired
                              isMultiline={true}
                              items={companies}
                              label="Pilih perusahaan"
                              placeholder="Pilih perusahaan"
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
                              isRequired
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
                                isRequired
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
                              <div className="flex ">
                                <Button type="button" className="delete" onPress={() => removeDescription(i, j)}>
                                  Hapus Deskripsi Pekerjaan <Trash size={20} color="currentColor" className="text-white" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          <div className="w-full justify-start flex ">
                            <Button className="login" type="button" onPress={() => addDescription(i)}>
                              Tambah Deskripsi Pekerjaan <AddCircle size={20} color="currentColor" className="text-white" />
                            </Button>
                          </div>
                        </div>

                        {/* Waktu */}
                        <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2">
                          <DatePicker
                            isRequired
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
                            label="Waktu selesai menjabat"
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
                        <span className="text-2xl text-background-primary">Contoh bagian data diri</span>
                        <img src="/data-diri-img.png" alt="contoh-cv" className="w-full" />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="w-full justify-start flex ">
                  <Button className="login" type="button" onPress={addExperience}>
                    Tambah Pengalaman Kerja <AddCircle size={20} color="currentColor" className="text-white" />
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

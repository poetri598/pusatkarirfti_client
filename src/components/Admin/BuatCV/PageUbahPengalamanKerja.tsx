import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { AddCircle, Trash } from "iconsax-react";

// Components
import { Form, Breadcrumbs, BreadcrumbItem, Avatar, Button, Accordion, AccordionItem, ScrollShadow, Input, Select, SelectItem, Selection, Spinner, Switch, DatePicker } from "@heroui/react";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";
import { ZonedDateTime, now, getLocalTimeZone, parseAbsoluteToLocal } from "@internationalized/date";

// Types
import { CompanyItem } from "@/types/company";
import { PositionItem } from "@/types/position";
import { UserWorkExperienceItem } from "@/types/userWorkExperience";
interface WorkExperienceInput {
  company_id: number;
  position_id: number;
  user_work_experience_start_date: ZonedDateTime | null;
  user_work_experience_end_date: ZonedDateTime | null;
  user_work_experience_is_current: boolean;
  user_work_experience_descriptions: string[];
}

// Services
import { getCompanyAll, createCompany } from "@/services/company";
import { getPositionAll, createPosition } from "@/services/position";
import { getUserByUsername } from "@/services/user";
import { getWorkExperiencesByUsername, updateWorkExperiencesByUsername } from "@/services/userWorkExperience";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { formatZonedDateTime } from "@/utils/time";

export default function Page({ user_name }: { user_name: string }) {
  const router = useRouter();
  const [user_id, setUserId] = useState<number>(1);
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [company_id, setCompanyId] = useState<Selection>(new Set([]));
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [apiErrorCompanies, setApiErrorCompanies] = useState<string | null>(null);

  const [positions, setPositions] = useState<PositionItem[]>([]);
  const [position_id, setPositionId] = useState<Selection>(new Set([]));
  const [isLoadingPositions, setIsLoadingPositions] = useState(true);
  const [apiErrorPositions, setApiErrorPositions] = useState<string | null>(null);

  const [experiences, setExperiences] = useState<WorkExperienceInput[]>([]);
  const [isLoadingExperiences, setIsLoadingExperiences] = useState(true);
  const [apiErrorExperiences, setApiErrorExperiences] = useState<string | null>(null);

  const [isAddingNewCompany, setIsAddingNewCompany] = useState<boolean[]>([]);
  const [newCompanyNames, setNewCompanyNames] = useState<string[]>([]);

  const [isAddingNewPosition, setIsAddingNewPosition] = useState<boolean[]>([]);
  const [newPositionNames, setNewPositionNames] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getCompanyAll, setCompanies, setApiErrorCompanies, setIsLoadingCompanies), createServiceFetcher(getPositionAll, setPositions, setApiErrorPositions, setIsLoadingPositions)];
      await Promise.all(fetchers.map((fetch) => fetch()));

      const { success: userSuccess, data: userData } = await getUserByUsername(user_name);
      if (userSuccess && userData) {
        setUserId(userData.user_id);
      }

      const { success, data, error } = await getWorkExperiencesByUsername(user_name);
      if (success && data) {
        const mapped: WorkExperienceInput[] = data.map((exp: UserWorkExperienceItem) => ({
          company_id: exp.company_id,
          position_id: exp.position_id,
          user_work_experience_start_date: exp.user_work_experience_start_date ? parseAbsoluteToLocal(exp.user_work_experience_start_date) : null,
          user_work_experience_end_date: exp.user_work_experience_end_date ? parseAbsoluteToLocal(exp.user_work_experience_end_date) : null,
          user_work_experience_is_current: Boolean(exp.user_work_experience_is_current),
          user_work_experience_descriptions:
            typeof exp.user_work_experience_descriptions === "string"
              ? (exp.user_work_experience_descriptions as string).split("@")
              : exp.user_work_experience_descriptions?.map((desc: any) => desc.user_work_experience_description_name) ?? [""],
        }));

        setExperiences(mapped.length ? mapped : [defaultExperience()]);
      } else {
        setApiErrorExperiences(error || "Gagal mengambil data");
      }

      setIsLoadingExperiences(false);
    };

    fetchAll();
  }, [user_name]);

  const defaultExperience = (): WorkExperienceInput => ({
    company_id: 0,
    position_id: 0,
    user_work_experience_start_date: now(getLocalTimeZone()),
    user_work_experience_end_date: null,
    user_work_experience_is_current: false,
    user_work_experience_descriptions: [""],
  });

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
    setExperiences([...experiences, defaultExperience()]);
    setIsAddingNewCompany([...isAddingNewCompany, false]);
    setNewCompanyNames([...newCompanyNames, ""]);
    setIsAddingNewPosition([...isAddingNewPosition, false]);
    setNewPositionNames([...newPositionNames, ""]);
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
    for (let i = 0; i < experiences.length; i++) {
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
    setIsAddingNewCompany(new Array(experiences.length).fill(false));
    setNewCompanyNames(new Array(experiences.length).fill(""));

    for (let i = 0; i < experiences.length; i++) {
      if (isAddingNewPosition[i] && newPositionNames[i]) {
        const formData = new FormData();
        formData.append("position_name", newPositionNames[i]);
        const { success, data, error } = await createPosition(formData);
        if (success && data) {
          const newPositionId = data.position_id;
          handleChange(i, "position_id", newPositionId);
        } else {
          await showErrorDialog(error || `Gagal menambahkan posisi baru di baris ke-${i + 1}`);
          setLoading(false);
          return;
        }
      }
    }
    const refreshedPos = await getPositionAll();
    if (refreshedPos.success) setPositions(refreshedPos.data || []);
    setIsAddingNewPosition(new Array(experiences.length).fill(false));
    setNewPositionNames(new Array(experiences.length).fill(""));

    const formData = new FormData();
    formData.append("user_id", user_id.toString());
    experiences.forEach((exp, i) => {
      formData.append(`experiences[${i}][company_id]`, exp.company_id.toString());
      formData.append(`experiences[${i}][position_id]`, exp.position_id.toString());
      if (exp.user_work_experience_start_date) formData.append(`experiences[${i}][user_work_experience_start_date]`, formatZonedDateTime(exp.user_work_experience_start_date));
      if (exp.user_work_experience_end_date) formData.append(`experiences[${i}][user_work_experience_end_date]`, formatZonedDateTime(exp.user_work_experience_end_date));
      formData.append(`experiences[${i}][user_work_experience_is_current]`, exp.user_work_experience_is_current ? "1" : "0");
      exp.user_work_experience_descriptions.forEach((desc, j) => {
        formData.append(`experiences[${i}][user_work_experience_descriptions][${j}]`, desc);
      });
    });

    const { success, data, error } = await updateWorkExperiencesByUsername(user_name, formData);
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
                <p className=" relative z-10 xs:text-base md:text-xl text-primary-primary font-bold ">Pengalaman Kerja</p>
                <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
              </div>
            }
            classNames={{ indicator: "py-4" }}
          >
            <ScrollShadow className="w-full xs:py-8 md:p-8" hideScrollBar>
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
                        <div className="grid xs:grid-cols-1 sm:grid-cols-2 justify-center items-start xs:gap-2">
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
                                selectedKeys={exp.company_id && companies.some((c) => c.company_id === exp.company_id) ? new Set([String(exp.company_id)]) : new Set()}
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
                          <div className="flex flex-col">
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
                                label="Pilih posisi/jabatan"
                                placeholder="Pilih posisi/jabatan"
                                labelPlacement="outside"
                                variant="bordered"
                                name="position_id"
                                selectedKeys={exp.position_id && positions.some((p) => p.position_id === exp.position_id) ? new Set([String(exp.position_id)]) : new Set()}
                                onSelectionChange={(keys) => {
                                  const selectedKey = Array.from(keys)[0];
                                  const newIsAdding = [...isAddingNewPosition];
                                  const newNames = [...newPositionNames];

                                  if (selectedKey === "-1") {
                                    newIsAdding[i] = true;
                                    newNames[i] = "";
                                    handleChange(i, "position_id", 0);
                                  } else {
                                    newIsAdding[i] = false;
                                    newNames[i] = "";
                                    handleChange(i, "position_id", Number(selectedKey));
                                  }

                                  setIsAddingNewPosition(newIsAdding);
                                  setNewPositionNames(newNames);
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
                                  [
                                    {
                                      position_id: -1,
                                      position_name: "+ Tambah Posisi Baru",
                                    },
                                    ...positions,
                                  ].map((item) => (
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
                            {isAddingNewPosition[i] && (
                              <div className="flex flex-col gap-4 mt-2">
                                <Input
                                  label="Masukkan nama posisi/jabatan"
                                  placeholder="Masukkan nama posisi/jabatan"
                                  labelPlacement="outside"
                                  value={newPositionNames[i]}
                                  onValueChange={(val) => {
                                    const updatedNames = [...newPositionNames];
                                    updatedNames[i] = val;
                                    setNewPositionNames(updatedNames);
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
                              <div className="flex w-full">
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
                            value={exp.user_work_experience_start_date}
                            onChange={(val) => {
                              handleChange(i, "user_work_experience_start_date", val);
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
                            value={exp.user_work_experience_end_date}
                            onChange={(val) => {
                              handleChange(i, "user_work_experience_end_date", val);
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
                        <span className="xs:text-sm md:text-2xl text-background-primary">Contoh bagian data diri</span>
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

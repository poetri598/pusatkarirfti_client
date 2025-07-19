import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { AddCircle, Trash } from "iconsax-react";

// Components
import { Form, Breadcrumbs, BreadcrumbItem, Avatar, Button, Accordion, AccordionItem, ScrollShadow, Input, Select, SelectItem, Selection, Spinner, Switch, DatePicker } from "@heroui/react";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { CompanyItem } from "@/types/company";
import { UserAchievementItem } from "@/types/userAchievement";
interface UserAchievementInput {
  user_achievement_name: string;
  user_achievement_date: string;
  company_id: number;
}

// Services
import { getCompanyAll } from "@/services/company";
import { getUserByUsername } from "@/services/user";
import { getUserAchievementsByUsername, updateUserAchievementsByUsername } from "@/services/userAchievement";

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
  const [user_id, setUserId] = useState<number>(0);

  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [company_id, setCompanyId] = useState<Selection>(new Set([]));
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [apiErrorCompanies, setApiErrorCompanies] = useState<string | null>(null);

  const [achievements, setAchievements] = useState<UserAchievementInput[]>([]);
  const [isLoadingAchievements, setIsLoadingAchievements] = useState(true);
  const [apiErrorAchievements, setApiErrorAchievements] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getCompanyAll, setCompanies, setApiErrorCompanies, setIsLoadingCompanies)];
      await Promise.all(fetchers.map((fetch) => fetch()));

      const { success: userSuccess, data: userData } = await getUserByUsername(user_name);
      if (userSuccess && userData) {
        setUserId(userData.user_id);
      }

      const { success, data, error } = await getUserAchievementsByUsername(user_name);
      if (success && data) {
        const mapped: UserAchievementInput[] = data.map((exp: UserAchievementItem) => ({
          user_achievement_name: exp.user_achievement_name,
          user_achievement_date: exp.user_achievement_date,
          company_id: exp.company_id,
        }));

        setAchievements(mapped.length ? mapped : [defaultExperience()]);
      } else {
        setApiErrorAchievements(error || "Gagal mengambil data");
      }

      setIsLoadingAchievements(false);
    };

    fetchAll();
  }, [user_name]);

  const defaultExperience = (): UserAchievementInput => ({
    user_achievement_name: "",
    user_achievement_date: "",
    company_id: 0,
  });

  const handleChange = <K extends keyof UserAchievementInput>(expIndex: number, key: K, value: UserAchievementInput[K]) => {
    const updated = [...achievements];
    updated[expIndex][key] = value;
    setAchievements(updated);
  };

  const addAchievement = () => {
    setAchievements([
      ...achievements,
      {
        user_achievement_name: "",
        user_achievement_date: "",
        company_id: 0,
      },
    ]);
  };

  const removeAchievement = (index: number) => {
    const updated = achievements.filter((_, i) => i !== index);
    setAchievements(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("user_id", user_id.toString());
    achievements.forEach((exp, i) => {
      formData.append(`achievements[${i}][user_achievement_name]`, exp.user_achievement_name);
      formData.append(`achievements[${i}][user_achievement_date]`, exp.user_achievement_date);
      formData.append(`achievements[${i}][company_id]`, exp.company_id.toString());
    });

    const { success, data, error } = await updateUserAchievementsByUsername(user_name, formData);
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
      <div className="w-full mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
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
          <BreadcrumbItem href={`/buat-cv/ubah-penghargaan/${user_name}`} className="text-primary-primary">
            Ubah Penghargaan
          </BreadcrumbItem>
        </Breadcrumbs>

        <Accordion variant="splitted" className="gap-8" isCompact>
          <AccordionItem
            key="penghargaan"
            textValue="Penghargaan"
            title={
              <div className="relative w-fit">
                <p className=" relative z-10 xs:text-base md:text-xl text-primary-primary font-bold ">Penghargaan</p>
                <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
              </div>
            }
            classNames={{ indicator: "py-4" }}
          >
            <ScrollShadow className="w-full min-h-screen xs:py-8 md:p-8" hideScrollBar>
              <Form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                {achievements.map((achie, i) => (
                  <div key={i} className="relative w-full border border-default-200 rounded-medium p-4 flex flex-col gap-4">
                    <div className="w-full xs:justify-start md:justify-end flex ">
                      <Button type="button" className="delete" onPress={() => removeAchievement(i)}>
                        Hapus Penghargaan <Trash size={20} color="currentColor" className="text-white" />
                      </Button>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-4">
                        <Input
                          isRequired
                          label="Masukkan nama penghargaan"
                          labelPlacement="outside"
                          name="user_achievement_name"
                          value={achie.user_achievement_name}
                          onValueChange={(val) => handleChange(i, "user_achievement_name", val)}
                          type="text"
                          variant="bordered"
                          classNames={{
                            label: "after:text-danger-primary text-xs text-text-secondary",
                            input: "focus:!border-primary-primary text-xs",
                            inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                            errorMessage: "text-danger-primary text-xs",
                          }}
                        />

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
                            isRequired
                            isMultiline={true}
                            items={companies}
                            label="Pilih perusahaan/instansi penerbit"
                            placeholder="Pilih perusahaan/instansi penerbit"
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
                            selectedKeys={achie.company_id && companies.some((c) => c.company_id === achie.company_id) ? new Set([String(achie.company_id)]) : new Set()}
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

                        <DatePicker
                          isRequired
                          hideTimeZone
                          granularity="day"
                          showMonthAndYearPickers
                          label="Tanggal diterbitkan"
                          name="user_achievement_date"
                          labelPlacement="outside"
                          variant="bordered"
                          value={parseISOStringToCalendarDate(achie.user_achievement_date)}
                          onChange={(val) => {
                            const dateOnly = val?.toString() ?? "";
                            handleChange(i, "user_achievement_date", dateOnly);
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
                      <div className="w-full h-full flex flex-col justify-center gradient-style-2 items-center p-8 gap-4">
                        <span className="xs:text-sm md:text-2xl text-background-primary">Contoh bagian data diri</span>
                        <img src="/data-diri-img.png" alt="contoh-cv" className="w-full" />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="w-full justify-start flex ">
                  <Button className="login" type="button" onPress={addAchievement}>
                    Tambah Penghargaan <AddCircle size={20} color="currentColor" className="text-white" />
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

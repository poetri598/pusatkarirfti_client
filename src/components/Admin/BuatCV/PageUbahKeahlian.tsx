import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { AddCircle, Trash } from "iconsax-react";

// Components
import { Form, Breadcrumbs, BreadcrumbItem, Avatar, Button, Accordion, AccordionItem, ScrollShadow, Input, Select, SelectItem, Selection, Spinner, Switch, DatePicker } from "@heroui/react";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { SkillItem } from "@/types/skill";
import { SkillLevelItem } from "@/types/skillLevel";
import { UserSkillItem } from "@/types/userSkill";
interface UserSkillInput {
  skill_id: number;
  skill_level_id: number;
}

// Services
import { getSkillAll } from "@/services/skill";
import { getSkillLevelAll } from "@/services/skillLevel";
import { getUserByUsername } from "@/services/user";
import { getUserSkillsByUsername, updateUserSkillsByUsername } from "@/services/userSkill";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function Page({ user_name }: { user_name: string }) {
  const router = useRouter();
  const [user_id, setUserId] = useState<number>(0);

  const [skill, setSkill] = useState<SkillItem[]>([]);
  const [isLoadingSkill, setIsLoadingSkill] = useState(true);
  const [apiErrorSkill, setApiErrorSkill] = useState<string | null>(null);

  const [skillLevel, setSkillLevel] = useState<SkillLevelItem[]>([]);
  const [isLoadingSkillLevel, setIsLoadingSkillLevel] = useState(true);
  const [apiErrorSkillLevel, setApiErrorSkillLevel] = useState<string | null>(null);

  const [skills, setSkills] = useState<UserSkillInput[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [apiErrorSkills, setApiErrorSkills] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getSkillAll, setSkill, setApiErrorSkill, setIsLoadingSkill), createServiceFetcher(getSkillLevelAll, setSkillLevel, setApiErrorSkillLevel, setIsLoadingSkillLevel)];
      await Promise.all(fetchers.map((fetch) => fetch()));

      const { success: userSuccess, data: userData } = await getUserByUsername(user_name);
      if (userSuccess && userData) {
        setUserId(userData.user_id);
      }

      const { success, data, error } = await getUserSkillsByUsername(user_name);
      if (success && data) {
        const mapped: UserSkillInput[] = data.map((sk: UserSkillItem) => ({
          skill_id: sk.skill_id,
          skill_level_id: sk.skill_level_id,
        }));

        setSkills(mapped.length ? mapped : [defaultExperience()]);
      } else {
        setApiErrorSkills(error || "Gagal mengambil data");
      }

      setIsLoadingSkills(false);
    };

    fetchAll();
  }, [user_name]);

  const defaultExperience = (): UserSkillInput => ({
    skill_id: 0,
    skill_level_id: 0,
  });

  const handleChange = <K extends keyof UserSkillInput>(expIndex: number, key: K, value: UserSkillInput[K]) => {
    const updated = [...skills];
    updated[expIndex][key] = value;
    setSkills(updated);
  };

  const addAchievement = () => {
    setSkills([
      ...skills,
      {
        skill_id: 0,
        skill_level_id: 0,
      },
    ]);
  };

  const removeAchievement = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("user_id", user_id.toString());
    skills.forEach((sk, i) => {
      formData.append(`skills[${i}][skill_id]`, sk.skill_id.toString());
      formData.append(`skills[${i}][skill_level_id]`, sk.skill_level_id.toString());
    });

    const { success, data, error } = await updateUserSkillsByUsername(user_name, formData);
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
          <BreadcrumbItem href={`/buat-cv/ubah-keahlian/${user_name}`} className="text-primary-primary">
            Ubah Keahlian
          </BreadcrumbItem>
        </Breadcrumbs>

        <Accordion variant="splitted" className="gap-8" isCompact>
          <AccordionItem
            key="keahlian"
            textValue="Keahlian"
            title={
              <div className="relative w-fit">
                <p className=" relative z-10 xs:text-base md:text-xl text-primary-primary font-bold ">Keahlian</p>
                <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
              </div>
            }
            classNames={{ indicator: "py-4" }}
          >
            <ScrollShadow className="w-full min-h-screen xs:py-8 md:p-8" hideScrollBar>
              <Form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                {skills.map((sk, i) => (
                  <div key={i} className="relative w-full border border-default-200 rounded-medium p-4 flex flex-col gap-4">
                    <div className="w-full xs:justify-start md:justify-end flex ">
                      <Button type="button" className="delete" onPress={() => removeAchievement(i)}>
                        Hapus Keahlian <Trash size={20} color="currentColor" className="text-white" />
                      </Button>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-4">
                        {isLoadingSkill ? (
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
                        ) : apiErrorSkill ? (
                          <p className="text-start text-xs text-danger-primary">{apiErrorSkill}</p>
                        ) : (
                          <Select
                            isRequired
                            label="Pilih keahlian"
                            labelPlacement="outside"
                            variant="bordered"
                            name="skill_id"
                            selectedKeys={sk.skill_id && skill.some((p) => p.skill_id === sk.skill_id) ? new Set([String(sk.skill_id)]) : new Set()}
                            onSelectionChange={(keys) => {
                              const selectedKey = Array.from(keys)[0];
                              handleChange(i, "skill_id", Number(selectedKey));
                            }}
                            classNames={{
                              label: "after:text-danger-primary text-xs text-text-secondary",
                              trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary",
                              value: "text-xs",
                              errorMessage: "text-danger-primary text-xs",
                            }}
                          >
                            {skill.length === 0 ? (
                              <SelectItem key="nodata" isDisabled>
                                Data belum tersedia
                              </SelectItem>
                            ) : (
                              skill.map((item) => (
                                <SelectItem
                                  key={item.skill_id}
                                  textValue={item.skill_name}
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

                        {isLoadingSkillLevel ? (
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
                        ) : apiErrorSkillLevel ? (
                          <p className="text-start text-xs text-danger-primary">{apiErrorSkillLevel}</p>
                        ) : (
                          <Select
                            isRequired
                            label="Pilih level keahlian"
                            labelPlacement="outside"
                            variant="bordered"
                            name="skill_level_id"
                            selectedKeys={sk.skill_level_id && skillLevel.some((p) => p.skill_level_id === sk.skill_level_id) ? new Set([String(sk.skill_level_id)]) : new Set()}
                            onSelectionChange={(keys) => {
                              const selectedKey = Array.from(keys)[0];
                              handleChange(i, "skill_level_id", Number(selectedKey));
                            }}
                            classNames={{
                              label: "after:text-danger-primary text-xs text-text-secondary",
                              trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary",
                              value: "text-xs",
                              errorMessage: "text-danger-primary text-xs",
                            }}
                          >
                            {skillLevel.length === 0 ? (
                              <SelectItem key="nodata" isDisabled>
                                Data belum tersedia
                              </SelectItem>
                            ) : (
                              skillLevel.map((item) => (
                                <SelectItem
                                  key={item.skill_level_id}
                                  textValue={item.skill_level_name}
                                  classNames={{
                                    title: "text-xs hover:!text-primary-primary",
                                    selectedIcon: "text-primary-primary",
                                  }}
                                >
                                  {item.skill_level_name}
                                </SelectItem>
                              ))
                            )}
                          </Select>
                        )}
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
                    Tambah Keahlian <AddCircle size={20} color="currentColor" className="text-white" />
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

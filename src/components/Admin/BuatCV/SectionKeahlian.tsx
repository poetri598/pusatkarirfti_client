import React, { useState, useEffect } from "react";

// Components
import { Form, Avatar, Input, Select, SelectItem, Spinner, DatePicker, Link, Button } from "@heroui/react";
import { showSuccessDialog, showErrorDialog, showConfirmationDialog } from "@/components/Custom/AlertButton";

// Context
import { useAuth } from "@/context/AuthContext";

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
import { getUserSkillsByUsername, deleteUserSkillsByUsername } from "@/services/userSkill";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function Page() {
  const { user } = useAuth();

  const [skill, setSkill] = useState<SkillItem[]>([]);
  const [isLoadingSkill, setIsLoadingSkill] = useState(true);
  const [apiErrorSkill, setApiErrorSkill] = useState<string | null>(null);

  const [skillLevel, setSkillLevel] = useState<SkillLevelItem[]>([]);
  const [isLoadingSkillLevel, setIsLoadingSkillLevel] = useState(true);
  const [apiErrorSkillLevel, setApiErrorSkillLevel] = useState<string | null>(null);

  const [skills, setSkills] = useState<UserSkillInput[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [apiErrorSkills, setApiErrorSkills] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getSkillAll, setSkill, setApiErrorSkill, setIsLoadingSkill), createServiceFetcher(getSkillLevelAll, setSkillLevel, setApiErrorSkillLevel, setIsLoadingSkillLevel)];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!user?.user_name) return;
      setIsLoadingSkill(true);
      const { success, data, error } = await getUserSkillsByUsername(user.user_name);

      if (success && data) {
        const mapped = data.map((sk: UserSkillItem) => ({
          skill_id: sk.skill_id,
          skill_level_id: sk.skill_level_id,
        }));

        setSkills(
          mapped.length > 0
            ? mapped
            : [
                {
                  skill_id: 0,
                  skill_level_id: 0,
                },
              ]
        );
      } else {
        setApiErrorSkills(error || "Gagal mengambil data");
      }

      setIsLoadingSkills(false);
    };

    fetchSkills();
  }, [user?.user_name]);

  const handleChange = <K extends keyof UserSkillInput>(expIndex: number, key: K, value: UserSkillInput[K]) => {
    const updated = [...skills];
    updated[expIndex][key] = value;
    setSkills(updated);
  };

  if (isLoadingSkills) {
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

  if (apiErrorSkills) {
    return <p className="text-center text-danger-primary">{apiErrorSkills}</p>;
  }

  return (
    <Form className="w-full flex flex-col gap-4">
      <div className="w-full justify-end flex xs:flex-col md:flex-row gap-2">
        <Button
          className="delete"
          onPress={async () => {
            const confirm = await showConfirmationDialog();
            if (!confirm.isConfirmed) return null;
            const result = await deleteUserSkillsByUsername(user?.user_name || "");
            if (result.success) {
              await showSuccessDialog();
              window.location.reload();
            } else {
              await showErrorDialog(result.error);
            }
          }}
        >
          Hapus Keahlian
        </Button>
        <Link className="login" href={`/buat-cv/ubah-keahlian/${user?.user_name}`}>
          Ubah Keahlian
        </Link>
      </div>
      {skills.map((sk, i) => (
        <div key={i} className="relative w-full border border-default-200 rounded-medium p-4 flex flex-col gap-4">
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
                  isDisabled
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
                  isDisabled
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
    </Form>
  );
}

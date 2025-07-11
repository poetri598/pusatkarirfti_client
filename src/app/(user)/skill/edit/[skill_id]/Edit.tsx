"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Components
import { Breadcrumbs, BreadcrumbItem, Form, Button, Spinner, Input, Textarea } from "@heroui/react";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Services
import { getSkillById, updateSkillById } from "@/services/skill";

export default function Edit({ skill_id }: { skill_id: number }) {
  const router = useRouter();
  const [skill_name, setSkillName] = useState("");
  const [skill_desc, setSkillDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      const { success, data, error } = await getSkillById(skill_id);
      setSkillName(data?.skill_name || "");
      setSkillDesc(data?.skill_desc || "");
      if (!success || !data) {
        await showErrorDialog(error || "Gagal mengambil data profil");
        return;
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skill_id) {
      await showErrorDialog("Data ID tidak ditemukan.");
      return;
    }
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setUpdateLoading(true);
    const formData = new FormData();
    formData.append("skill_name", skill_name);
    formData.append("skill_desc", skill_desc);
    const { success, error } = await updateSkillById(skill_id, formData);
    if (success) {
      await showSuccessDialog();
      router.push("/skill");
    } else {
      await showErrorDialog(error);
    }
    setUpdateLoading(false);
  };

  return (
    <>
      <>
        <main className="xs:p-0 md:p-8  flex flex-col xs:gap-2 md:gap-8 overflow-hidden">
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

          {updateLoading && (
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
          {/*  Breadcrumb */}
          <Breadcrumbs
            className="text-xs text-text-secondary"
            itemClasses={{
              item: "data-[current=true]:text-primary-primary cursor-pointer text-xs",
            }}
          >
            <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
            <BreadcrumbItem href="/skill">Skill</BreadcrumbItem>
            <BreadcrumbItem href={`/skill/edit/${skill_id}`}>Ubah Data Skill</BreadcrumbItem>
          </Breadcrumbs>

          {/* Section Title */}
          <TitleSectionAdmin label="Ubah Data Skill" />

          <Form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 ">
            <Input
              isRequired
              label="Masukkan nama skill"
              labelPlacement="outside"
              name="skill_name"
              value={skill_name}
              onValueChange={setSkillName}
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />
            {/* skill_desc  */}
            <Textarea
              isRequired
              label="Masukkan deskripsi Skill"
              labelPlacement="outside"
              name="skill_desc"
              value={skill_desc}
              onValueChange={setSkillDesc}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />

            <div className="w-full flex flex-col items-end gap-2">
              <Button type="submit" className="login">
                Simpan Perubahan
              </Button>
            </div>
          </Form>
        </main>
      </>
    </>
  );
}

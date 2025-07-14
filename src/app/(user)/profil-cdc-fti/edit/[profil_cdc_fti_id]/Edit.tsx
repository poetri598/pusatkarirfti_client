"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "iconsax-react";
import { Breadcrumbs, BreadcrumbItem, Form, Input, Button, Spinner } from "@heroui/react";

import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";
import RichTextEditor from "@/components/Custom/RichTextEditor";

// Types
import { ProfilCdcFtiItem } from "@/types/profilCdcFti";

// Services
import { getProfilCdcFtiById, updateProfilCdcFtiById } from "@/services/profilCdcFti";

export default function page({ profil_cdc_fti_id }: { profil_cdc_fti_id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { success, data, error } = await getProfilCdcFtiById(profil_cdc_fti_id);
        if (success && data) {
          if (data.profil_cdc_fti_img) setImgPreview(data.profil_cdc_fti_img);
          if (data.profil_cdc_fti_vision_img) setVisionImgPreview(data.profil_cdc_fti_vision_img);
          if (data.profil_cdc_fti_mission_img) setMissionImgPreview(data.profil_cdc_fti_mission_img);
          if (data.profil_cdc_fti_goal_img) setGoalImgPreview(data.profil_cdc_fti_goal_img);
          if (data.profil_cdc_fti_benefit_img) setBenefitImgPreview(data.profil_cdc_fti_benefit_img);

          setFirstname(data.profil_cdc_fti_firstname);
          setLastname(data.profil_cdc_fti_lastname);
          setVision(data.profil_cdc_fti_vision_name);
          setMission(data.profil_cdc_fti_mission_name);
          setGoal(data.profil_cdc_fti_goal_name);
          setBenefit(data.profil_cdc_fti_benefit_name);
          setEmail(data.profil_cdc_fti_email);
          setInstagram(data.profil_cdc_fti_instagram);
          setFacebook(data.profil_cdc_fti_facebook);
          setYoutube(data.profil_cdc_fti_youtube);
          setWhatsapp(data.profil_cdc_fti_whatsapp);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [profil_cdc_fti_id]);

  // refs
  const imgRef = useRef<HTMLInputElement>(null!);
  const visionImgRef = useRef<HTMLInputElement>(null!);
  const missionImgRef = useRef<HTMLInputElement>(null!);
  const goalImgRef = useRef<HTMLInputElement>(null!);
  const benefitImgRef = useRef<HTMLInputElement>(null!);

  // image state
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState("/tambah-bg.png");

  const [visionImgFile, setVisionImgFile] = useState<File | null>(null);
  const [visionImgPreview, setVisionImgPreview] = useState("/tambah-bg.png");

  const [missionImgFile, setMissionImgFile] = useState<File | null>(null);
  const [missionImgPreview, setMissionImgPreview] = useState("/tambah-bg.png");

  const [goalImgFile, setGoalImgFile] = useState<File | null>(null);
  const [goalImgPreview, setGoalImgPreview] = useState("/tambah-bg.png");

  const [benefitImgFile, setBenefitImgFile] = useState<File | null>(null);
  const [benefitImgPreview, setBenefitImgPreview] = useState("/tambah-bg.png");

  // text fields
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState("");
  const [goal, setGoal] = useState("");
  const [benefit, setBenefit] = useState("");

  // sosmed
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [updateLoading, setUpdateLoading] = useState(false);

  const handleImageChange = (file: File, setPreview: (val: string) => void, setFile: (f: File) => void) => {
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      showErrorDialog("Ukuran gambar tidak boleh lebih dari 5MB.");
      return;
    }

    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imgPreview || !visionImgPreview || !missionImgPreview || !goalImgPreview || !benefitImgPreview) {
      showErrorDialog("Semua gambar wajib diunggah.");
      setUpdateLoading(false);
      return;
    }

    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;

    setUpdateLoading(true);
    const formData = new FormData();

    // image
    if (imgFile) formData.append("profil_cdc_fti_img", imgFile);
    if (visionImgFile) formData.append("profil_cdc_fti_vision_img", visionImgFile);
    if (missionImgFile) formData.append("profil_cdc_fti_mission_img", missionImgFile);
    if (goalImgFile) formData.append("profil_cdc_fti_goal_img", goalImgFile);
    if (benefitImgFile) formData.append("profil_cdc_fti_benefit_img", benefitImgFile);

    // rich text
    formData.append("profil_cdc_fti_firstname", firstname);
    formData.append("profil_cdc_fti_lastname", lastname);
    formData.append("profil_cdc_fti_vision_name", vision);
    formData.append("profil_cdc_fti_mission_name", mission);
    formData.append("profil_cdc_fti_goal_name", goal);
    formData.append("profil_cdc_fti_benefit_name", benefit);

    // sosial media
    formData.append("profil_cdc_fti_email", email);
    formData.append("profil_cdc_fti_instagram", instagram);
    formData.append("profil_cdc_fti_facebook", facebook);
    formData.append("profil_cdc_fti_youtube", youtube);
    formData.append("profil_cdc_fti_whatsapp", whatsapp);

    const { success, error } = await updateProfilCdcFtiById(profil_cdc_fti_id, formData);
    if (success) {
      await showSuccessDialog();
      router.push("/profil-cdc-fti");
    } else {
      await showErrorDialog(error);
    }

    setUpdateLoading(false);
  };

  if (loading) {
    return (
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
    );
  }

  const renderImageInput = (label: string, ref: React.RefObject<HTMLInputElement>, preview: string, setPreview: (v: string) => void, setFile: (f: File) => void) => (
    <div className="flex flex-col items-center gap-1 ">
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md group aspect-square">
        <div className="w-full h-full rounded-medium border-2 border-dashed border-black overflow-hidden relative">
          <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-medium" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-medium transition">
            <p className="text-white text-sm">Ubah gambar {label}</p>
          </div>
        </div>

        <button onClick={() => ref.current?.click()} type="button" className="absolute bottom-0 right-0 bg-white p-2 rounded-medium shadow-md hover:scale-105 transition">
          <Camera variant="Bold" color="currentColor" size={20} className="text-primary-primary" />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={ref}
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (file) handleImageChange(file, setPreview, setFile);
          }}
          className="hidden"
        />
      </div>
      <p className="text-[11px] text-gray-500 mt-1 text-center">
        Ukuran gambar maksimal <span className="font-semibold text-gray-600">5MB</span>
      </p>
    </div>
  );

  return (
    <main className="xs:p-0 md:p-8 flex flex-col xs:gap-2 md:gap-8 overflow-hidden">
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

      <Breadcrumbs
        className="text-xs text-text-secondary"
        itemClasses={{
          item: "data-[current=true]:text-primary-primary cursor-pointer text-xs",
        }}
      >
        <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
        <BreadcrumbItem href="/profil-cdc-fti">Profil CDC FTI</BreadcrumbItem>
        <BreadcrumbItem href={`/profil-cdc-fti/edit/${profil_cdc_fti_id}`}>Ubah Profil CDC FTI</BreadcrumbItem>
      </Breadcrumbs>

      <TitleSectionAdmin label="Ubah Profil CDC FTI" />

      <Form className="flex flex-col items-end gap-4" onSubmit={handleSubmit}>
        <div className="grid xs:grid-cols-1 md:grid-cols-5 gap-4 w-full">
          {renderImageInput("utama", imgRef, imgPreview, setImgPreview, setImgFile)}
          {renderImageInput("visi", visionImgRef, visionImgPreview, setVisionImgPreview, setVisionImgFile)}
          {renderImageInput("misi", missionImgRef, missionImgPreview, setMissionImgPreview, setMissionImgFile)}
          {renderImageInput("tujuan", goalImgRef, goalImgPreview, setGoalImgPreview, setGoalImgFile)}
          {renderImageInput("manfaat", benefitImgRef, benefitImgPreview, setBenefitImgPreview, setBenefitImgFile)}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-text-primary">Masukkan deskripsi pertama</span>
          <RichTextEditor value={firstname} onChange={setFirstname} placeholder="Masukkan deskripsi pertama" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-text-primary">Masukkan deskripsi kedua</span>
          <RichTextEditor value={lastname} onChange={setLastname} placeholder="Masukkan deskripsi kedua" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-text-primary">Masukkan visi</span>
          <RichTextEditor value={vision} onChange={setVision} placeholder="Masukkan visi" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-text-primary">Masukkan misi</span>
          <RichTextEditor value={mission} onChange={setMission} placeholder="Masukkan misi" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-text-primary">Masukkan tujuan</span>
          <RichTextEditor value={goal} onChange={setGoal} placeholder="Masukkan tujuan" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-text-primary">Masukkan manfaat</span>
          <RichTextEditor value={benefit} onChange={setBenefit} placeholder="Masukkan manfaat" />{" "}
        </div>

        <Input
          label="Email"
          labelPlacement="outside"
          value={email}
          onValueChange={setEmail}
          type="text"
          variant="bordered"
          classNames={{
            label: "after:text-danger-primary text-xs text-text-secondary",
            input: "focus:!border-primary-primary text-xs ",
            inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
            errorMessage: "text-danger-primary text-xs",
          }}
        />
        <Input
          label="Instagram"
          labelPlacement="outside"
          value={instagram}
          onValueChange={setInstagram}
          type="text"
          variant="bordered"
          classNames={{
            label: "after:text-danger-primary text-xs text-text-secondary",
            input: "focus:!border-primary-primary text-xs ",
            inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
            errorMessage: "text-danger-primary text-xs",
          }}
        />
        <Input
          label="Facebook"
          labelPlacement="outside"
          value={facebook}
          onValueChange={setFacebook}
          type="text"
          variant="bordered"
          classNames={{
            label: "after:text-danger-primary text-xs text-text-secondary",
            input: "focus:!border-primary-primary text-xs ",
            inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
            errorMessage: "text-danger-primary text-xs",
          }}
        />
        <Input
          label="YouTube"
          labelPlacement="outside"
          value={youtube}
          onValueChange={setYoutube}
          type="text"
          variant="bordered"
          classNames={{
            label: "after:text-danger-primary text-xs text-text-secondary",
            input: "focus:!border-primary-primary text-xs ",
            inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
            errorMessage: "text-danger-primary text-xs",
          }}
        />
        <Input
          label="WhatsApp"
          labelPlacement="outside"
          value={whatsapp}
          onValueChange={setWhatsapp}
          type="text"
          variant="bordered"
          classNames={{
            label: "after:text-danger-primary text-xs text-text-secondary",
            input: "focus:!border-primary-primary text-xs ",
            inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
            errorMessage: "text-danger-primary text-xs",
          }}
        />
        <Button type="submit" className="login">
          Simpan Perubahan
        </Button>
      </Form>
    </main>
  );
}

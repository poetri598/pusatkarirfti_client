"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { Eye, EyeSlash } from "iconsax-react";

// Components
import Logo from "@/components/HeaderFooter/Logo";
import { Form, Input, Button, Spinner } from "@heroui/react";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Services
import { updateUserPasswordByUsername } from "@/services/user";

export default function SectionLeft({ className }: { className: string }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const router = useRouter();
  const [user_name, setUserName] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [user_password, setUserPassword] = useState("");
  const [user_password_confirm, setUserPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("user_name", user_name);
    formData.append("user_password", user_password);
    formData.append("user_password_confirm", user_password_confirm);
    const { success, error } = await updateUserPasswordByUsername(user_name, formData);
    setLoading(false);
    if (success) {
      await showSuccessDialog();
      router.replace("/masuk");
    } else {
      await showErrorDialog(error);
    }
  };

  return (
    <section className={className}>
      <div className="xs:w-11/12 lg:w-6/12 h-full  mx-auto flex flex-col xs:justify-center xs:items-center md:justify-start md:items-start xs:gap-8 md:gap-16 py-8 ">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <Spinner
              label="Mengubah password..."
              variant="wave"
              classNames={{
                label: "text-primary-primary mt-4",
                dots: "border-5 border-primary-primary",
              }}
            />
          </div>
        )}
        <Logo />
        <Form onSubmit={handleSubmit} className="w-fit flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-center">
            <span className="xs:text-base md:text-4xl font-bold">Buat password baru</span>
            <span className="text-xs text-text-secondary">Mari tumbuh dan berkembang bersama dengan Pusat Karir Fakultas Teknologi Universitas Sebelas April</span>
          </div>
          {/* Email */}
          <Input
            isRequired
            label="Masukkan username anda"
            labelPlacement="outside"
            type="text"
            variant="bordered"
            name="user_name"
            value={user_name}
            onChange={(e) => setUserName(e.target.value)}
            classNames={{
              label: "text-xs after:text-danger-primary",
              input: "text-xs focus:!border-primary-primary",
              inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
              errorMessage: "text-danger-primary",
            }}
          />

          {/* Password */}
          <Input
            isRequired
            name="user_password"
            type={isPasswordVisible ? "text" : "password"}
            label="Masukkan password baru anda"
            labelPlacement="outside"
            variant="bordered"
            value={user_password}
            onChange={(e) => setUserPassword(e.target.value)}
            endContent={
              <button aria-label="Toggle password visibility" type="button" onClick={togglePasswordVisibility} className="focus:outline-none">
                {isPasswordVisible ? <EyeSlash size={16} color="currentColor" variant="Bold" className="text-text-secondary" /> : <Eye size={16} color="currentColor" variant="Bold" className="text-primary-primary" />}
              </button>
            }
            classNames={{
              label: "text-xs after:text-danger-primary",
              input: "text-xs focus:!border-primary-primary",
              inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
              errorMessage: "text-danger-primary",
            }}
          />

          {/* Konfirmasi Password */}
          <Input
            isRequired
            endContent={
              <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? <EyeSlash size={16} color="currentColor" variant="Bold" className="text-text-secondary" /> : <Eye size={16} color="currentColor" variant="Bold" className="text-primary-primary" />}
              </button>
            }
            label="Konfirmasi password baru"
            labelPlacement="outside"
            name="user_password_confirm"
            value={user_password_confirm}
            onValueChange={setUserPasswordConfirm}
            type={isVisible ? "text" : "password"}
            variant="bordered"
            classNames={{
              label: "text-xs after:text-danger-primary",
              input: "text-xs focus:!border-primary-primary",
              inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
            }}
          />

          <Button type="submit" className="login w-full">
            Simpan
          </Button>
        </Form>
      </div>
    </section>
  );
}

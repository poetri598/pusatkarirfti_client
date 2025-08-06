"use client";
import React, { useState } from "react";

// Iconsax
import { Eye, EyeSlash } from "iconsax-react";

// Components
import { Form, Breadcrumbs, BreadcrumbItem, Button, Input, Spinner } from "@heroui/react";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";

// Context
import { useAuth } from "@/context/AuthContext";

// Services
import { updateUserPasswordByUsername } from "@/services/user";

export default function PasswordReset() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [user_password, setUserPassword] = useState("");
  const [user_password_confirm, setUserPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.user_name) {
      await showErrorDialog("Username tidak ditemukan.");
      return;
    }
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("user_password", user_password);
    formData.append("user_password_confirm", user_password_confirm);
    const result = await updateUserPasswordByUsername(user.user_name, formData);
    setLoading(false);
    if (result.success) {
      await showSuccessDialog();
      window.location.reload();
    } else {
      await showErrorDialog(result.error || "Gagal memperbarui password.");
    }
  };
  return (
    <>
      <>
        <section className="w-full mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
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
          <Breadcrumbs
            itemClasses={{
              item: "data-[current=true]:text-primary-primary text-xs text-text-secondary",
            }}
          >
            <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
            <BreadcrumbItem href="/pengaturan">Pengaturan</BreadcrumbItem>
            <BreadcrumbItem href="/pengaturan/ubah-password" className="text-primary-primary">
              Ubah Password
            </BreadcrumbItem>
          </Breadcrumbs>
          {/* Section Title */}
          <TitleSectionAdmin label="Ubah password" />
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-4">
              {/* Password Baru & Konfirmasi Password */}
              <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
                {/* Password Baru*/}
                <Input
                  isRequired
                  endContent={
                    <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? <EyeSlash size={16} color="currentColor" variant="Bold" className="text-text-secondary " /> : <Eye size={16} color="currentColor" variant="Bold" className="text-primary-primary " />}
                    </button>
                  }
                  label="Masukkan password baru"
                  name="user_password"
                  value={user_password}
                  onValueChange={setUserPassword}
                  labelPlacement="outside"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  classNames={{
                    label: "text-xs after:text-danger-primary",
                    input: "text-xs focus:!border-primary-primary",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                    errorMessage: "text-xs text-danger-primary",
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
                    errorMessage: "text-xs text-danger-primary",
                  }}
                />
              </div>
            </div>

            <div className="w-full flex justify-end">
              <Button type="submit" className="login">
                Simpan Perubahan
              </Button>
            </div>
          </Form>
        </section>
      </>
    </>
  );
}

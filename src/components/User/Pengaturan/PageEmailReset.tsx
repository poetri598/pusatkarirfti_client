"use client";
import React, { useState } from "react";

// Iconsax
import { Sms, Eye, EyeSlash } from "iconsax-react";

// Components
import { Form, Breadcrumbs, BreadcrumbItem, Input, Button, Spinner } from "@heroui/react";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Context
import { useAuth } from "@/context/AuthContext";

// Services
import { updateUserEmailByUsername } from "@/services/user";

export default function EmailReset() {
  const { user } = useAuth();
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.user_name) {
      await showErrorDialog("Username tidak ditemukan.");
      return;
    }
    if (!user_email || !user_password) {
      await showErrorDialog("Email dan password wajib diisi.");
      return;
    }
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("user_email", user_email);
    formData.append("user_password", user_password);
    const result = await updateUserEmailByUsername(user.user_name, formData);
    setLoading(false);
    if (result.success) {
      await showSuccessDialog();
      window.location.reload();
    } else {
      await showErrorDialog(result.error);
    }
  };

  return (
    <>
      <>
        <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 pt-8 pb-48 bg-background-primary">
          {" "}
          {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
              <Spinner
                label="Updating..."
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
            <BreadcrumbItem href="/pengaturan/ubah-email" className="text-primary-primary">
              Ubah Email
            </BreadcrumbItem>
          </Breadcrumbs>
          <Form onSubmit={handleUpdateEmail} className="flex flex-col xs:gap-4 md:gap-8">
            <div className="w-full flex flex-col xs:gap-4 md:gap-8 xs:p-0 md:p-8 bg-background-primary rounded-md xs:shadow-none md:shadow-2xl shadow-primary-border">
              {/* Ubahan Email */}
              <div className="flex justify-between">
                <div className="relative w-fit">
                  <p className=" relative z-10 xs:text-sm md:text-2xl text-primary-primary font-bold ">Ubah Email</p>
                  <div className="absolute top-1/2 w-5/6 h-1/4 bg-secondary-primary"></div>
                </div>
              </div>

              {/* Email */}
              <Input
                startContent={<Sms size={20} variant="Bold" color="currentColor" className="text-primary-primary" />}
                isReadOnly
                label="Email saat ini"
                labelPlacement="outside"
                value={user?.user_email}
                type="email"
                classNames={{
                  label: "text-xs text-text-secondary",
                  input: "placeholder:text-text-secondary text-xs !text-text-secondary focus:!border-primary-primary",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  errorMessage: "text-danger-primary text-xs",
                }}
              />

              {/* Email Baru & Password */}
              <div className="grid xs:grid-cols-1 md:grid-cols-2 xs:gap-4 md:gap-8">
                {/* Email Baru*/}
                <Input
                  isRequired
                  label="Masukkan email baru anda"
                  labelPlacement="outside"
                  name="user_email"
                  value={user_email}
                  onValueChange={setUserEmail}
                  type="email"
                  variant="bordered"
                  classNames={{
                    label: "text-xs after:text-danger-primary",
                    input: "text-xs  focus:!border-primary-primary",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                />

                {/* Password */}
                <Input
                  isRequired
                  endContent={
                    <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? <EyeSlash size={16} color="currentColor" variant="Bold" className="text-text-secondary" /> : <Eye size={16} color="currentColor" variant="Bold" className="text-primary-primary" />}
                    </button>
                  }
                  label="Masukkan password anda"
                  labelPlacement="outside"
                  name="user_password"
                  value={user_password}
                  onValueChange={setUserPassword}
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  classNames={{
                    label: "text-xs after:text-danger-primary",
                    input: "text-xs focus:!border-primary-primary",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                />
              </div>
            </div>

            <div className="w-full flex justify-end">
              <Button type="submit" className="login active:opacity-100">
                Simpan Perubahan
              </Button>
            </div>
          </Form>
        </section>
      </>
    </>
  );
}

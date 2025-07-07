"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { Eye, EyeSlash, Google } from "iconsax-react";

// Components
import { Form, Input, Button, Checkbox, Link, Spinner, useDisclosure } from "@heroui/react";
import Logo from "@/components/HeaderFooter/Logo";
import ModalGuest from "@/components/Custom/ModalGuest";
import { showConfirmationDialog, showSuccessLoginDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// context
import { useAuth } from "@/context/AuthContext";

export default function SectionLeft({ className }: { className: string }) {
  const router = useRouter();
  const { login } = useAuth();
  const [user_name, setUserName] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);
    const result = await login(user_name, user_password, rememberMe);
    if (result.success) {
      const ok = await showSuccessLoginDialog();
      if (ok.isConfirmed) {
        router.replace("/");
      }
    } else {
      await showErrorDialog(result.error || "Login gagal. Periksa kembali username dan password.");
    }
    setLoading(false);
  };

  return (
    <section className={className}>
      <div className="xs:w-11/12 lg:w-6/12 h-full mx-auto flex flex-col xs:justify-center xs:items-center md:justify-start md:items-start xs:gap-8 md:gap-16 py-8">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <Spinner
              label="Logging in..."
              variant="wave"
              classNames={{
                label: "text-primary-primary mt-4",
                dots: "border-5 border-primary-primary",
              }}
            />
          </div>
        )}
        <Logo />

        <Form onSubmit={handleLogin} className="w-fit flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-center">
            <span className="xs:text-base md:text-4xl font-bold">Selamat Datang</span>
            <span className="text-xs text-text-secondary">Mari tumbuh dan berkembang bersama dengan Pusat Karir Fakultas Teknologi Universitas Sebelas April</span>
          </div>

          {/* Username */}
          <Input
            isRequired
            label="Masukkan username anda"
            labelPlacement="outside"
            type="text"
            name="user_name"
            value={user_name}
            onValueChange={setUserName}
            variant="bordered"
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
            label="Masukkan password anda"
            labelPlacement="outside"
            variant="bordered"
            value={user_password}
            onValueChange={setUserPassword}
            endContent={
              <button type="button" aria-label="Toggle password visibility" onClick={togglePasswordVisibility}>
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

          {/* Remember me */}
          <div className="w-full flex justify-between">
            <Checkbox name="user_remember" isSelected={rememberMe} onValueChange={setRememberMe} classNames={{ label: "text-xs", icon: "text-primary-primary" }}>
              Ingatkan saya
            </Checkbox>
            <Link href="/lupa-password" className="text-xs text-primary-primary hover:text-text-secondary">
              Lupa password?
            </Link>
          </div>

          {/* Login Button */}
          <Button type="submit" className="login w-full">
            Masuk
          </Button>

          {/* Google Login */}
          <Button type="button" className="signup w-full">
            Masuk dengan akun Google <Google size={16} color="currentColor" className="text-primary-primary" />
          </Button>

          {/* Modal Daftar */}
          <div className="w-full flex justify-center gap-2">
            <span className="text-xs text-text-secondary">Belum punya akun?</span>
            <Link className="text-xs text-primary-primary hover:text-text-secondary cursor-pointer" onPress={onOpen}>
              Daftar
            </Link>
          </div>
        </Form>

        <ModalGuest isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </section>
  );
}

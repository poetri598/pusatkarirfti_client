"use client";
import React from "react";

import LayoutUser from "@/components/User/LayoutUser";
import LayoutAdmin from "@/components/Admin/LayoutAdmin";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@heroui/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading)
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

  const LayoutComponent = user?.role_name === "Admin" ? LayoutAdmin : LayoutUser;

  return <LayoutComponent>{children}</LayoutComponent>;
}

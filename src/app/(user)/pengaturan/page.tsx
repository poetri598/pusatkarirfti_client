"use client";
import React, { useEffect } from "react";

// Iconsax
import { Sms } from "iconsax-react";

// Components
import { Form, Breadcrumbs, BreadcrumbItem, Link, Input } from "@heroui/react";

// Context
import { useAuth } from "@/context/AuthContext";

export default function Settings() {
  const { user } = useAuth();

  return (
    <>
      <>
        <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 pt-8 pb-48 bg-background-primary ">
          <Breadcrumbs
            itemClasses={{
              item: "data-[current=true]:text-primary-primary text-xs text-text-secondary",
            }}
          >
            <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
            <BreadcrumbItem href="/pengaturan" className="text-primary-primary">
              Pengaturan
            </BreadcrumbItem>
          </Breadcrumbs>

          <div className="bg-background-primary flex flex-col xs:gap-4 xs:p-0 md:gap-8 md:p-8 rounded-md xs:shadow-none md:shadow-2xl shadow-primary-border">
            {/* Pengaturan */}
            <div className="flex justify-between">
              <div className="relative w-fit">
                <p className=" relative z-10 xs:text-sm md:text-2xl text-primary-primary font-bold ">Pengaturan</p>
                <div className="absolute top-1/2 w-5/6 h-1/4 bg-secondary-primary"></div>
              </div>
            </div>

            {/* Email */}
            <Form className="flex xs:flex-col md:flex-row items-end justify-between gap-4">
              <Input
                startContent={<Sms size={20} variant="Bold" color="currentColor" className="text-primary-primary" />}
                isReadOnly
                label="Email anda"
                labelPlacement="outside"
                value={user?.user_email}
                type="email"
                variant="bordered"
                classNames={{
                  label: "text-xs text-text-secondary",
                  input: "placeholder:text-text-secondary text-xs !text-text-secondary focus:!border-primary-primary",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                }}
              />
              <Link href="/pengaturan/email-reset" className="basis-1/6 login active:opacity-100">
                Ubah Email
              </Link>
            </Form>

            {/* Password */}
            <Form className="flex xs:flex-col md:flex-row items-end justify-between gap-4">
              <Input
                isReadOnly
                label="Password anda"
                labelPlacement="outside"
                value={user?.user_email}
                type="password"
                variant="bordered"
                classNames={{
                  label: "text-xs text-text-secondary",
                  input: "placeholder:text-text-secondary text-xs !text-text-secondary focus:!border-primary-primary",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                }}
              />

              <Link href="/pengaturan/password-reset" className="basis-1/6 login active:opacity-100">
                Ubah password
              </Link>
            </Form>
          </div>
        </section>
      </>
    </>
  );
}

"use client";
import React from "react";
// Iconsax
import { Profile, People } from "iconsax-react";

// NextJS
import Link from "next/link";

// Components
import { Button, useDisclosure } from "@heroui/react";
import ModalGuest from "@/components/Custom/ModalGuest";

import CounselingTable from "./TableSectionKonseling";

// Authentication Context
import { useAuth } from "@/context/AuthContext";

export default function SectionDaftarKonseling() {
  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <>
        <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 py-8 min-h-screen">
          {" "}
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 xs:gap-2">
            {/* Counseling 1 On 1 */}
            <div className="bg-background-primary rounded-lg shadow-lg xs:p-4 xs:gap-2 md:p-8 md:gap-8 flex flex-col ">
              <div className="flex justify-between items-center">
                <span className="xs:text-sm md:text-2xl text-primary-primary font-bold">Counseling 1 On 1</span>
                <Profile size="32" color="#008BA5" variant="Bulk" />
              </div>
              <div className="flex justify-between items-center">
                <span className="xs:text-xs md:text-sm text-primary-primary font-bold ">Konseling</span>
                <span className="xs:text-xs md:text-sm text-primary-primary font-bold">Mahasiswa/Alumni</span>
              </div>
              <div className="flex justify-end items-center">
                {user ? (
                  <Link href={"konseling/counseling-1on1"} className="login">
                    Daftar
                  </Link>
                ) : (
                  <Button className="login" onPress={onOpen}>
                    Daftar
                  </Button>
                )}
              </div>
            </div>
            {/* Counseling Group */}
            <div className="bg-background-primary rounded-lg shadow-lg xs:p-4 xs:gap-2 md:p-8  md:gap-8 flex flex-col">
              <div className="flex justify-between items-center">
                <span className="xs:text-sm md:text-2xl text-primary-primary font-bold">Counseling Group</span>
                <People size="32" color="#008BA5" variant="Bulk" />
              </div>
              <div className="flex justify-between items-center">
                <span className="xs:text-xs md:text-sm text-primary-primary font-bold ">Konseling</span>
                <span className="xs:text-xs md:text-sm text-primary-primary font-bold">Mahasiswa/Alumni</span>
              </div>
              <div className="flex justify-end items-center">
                {user ? (
                  <Link href={"konseling/counseling-group"} className="login">
                    Daftar
                  </Link>
                ) : (
                  <Button className="login" onPress={onOpen}>
                    Daftar
                  </Button>
                )}
              </div>
            </div>
          </div>
          <CounselingTable />
          {/* Modal Guest */}
          <ModalGuest isOpen={isOpen} onOpenChange={onOpenChange} />
        </section>
      </>
    </>
  );
}

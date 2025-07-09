"use client";

// Iconsax
import { Location, PresentionChart, ArrowRight2, Clock } from "iconsax-react";

// NextJS
import Image from "next/image";
import Link from "next/link";

// Components
import { Button, useDisclosure, Tooltip } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw } from "@/utils/time";
import ModalGuest from "../Custom/ModalGuest";

// AuthContext
import { useAuth } from "@/context/AuthContext";

// Types
import { JobItem } from "@/types/job";

export default function CardLowonganPekerjaan(props: JobItem) {
  const { job_slug, job_img, job_name, province_names, city_names, country_names, job_type_name, job_salary_min, job_salary_max, job_created_at } = props;

  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const relativeDate = getRelativeTimeRaw(job_created_at);
  const fullDate = getFullTimeRaw(job_created_at);

  const CardContent = (
    <>
      <Image src={job_img} alt={job_img} width={1280} height={720} className="w-full h-full aspect-video rounded-md object-cover" />
      <span className="text-xs font-bold w-full">{job_name}</span>
      <div className="flex justify-between items-center text-text-secondary">
        <div className="flex items-center gap-1">
          <Location size={20} color="currentColor" className="text-text-secondary" />
          {((city_names as string) || "").split(",").map((city, index, arr) => (
            <span key={index} className="text-xs text-text-secondary">
              {city.trim()}
              {index < arr.length - 1 && ", "}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <PresentionChart size={20} color="currentColor" className="text-text-secondary" />
          <span className="text-xs">{job_type_name}</span>
        </div>
      </div>
      <div className="flex justify-between items-end gap-1">
        <div className="flex flex-col">
          {job_salary_min === "0.00" && job_salary_max === "0.00" ? (
            <span className="text-xs font-bold text-primary-primary">Tidak ada informasi gaji</span>
          ) : (
            <span className="text-xs font-bold text-primary-primary w-full">
              {`Rp. ${Number(job_salary_min).toLocaleString("id-ID")}`} - {`Rp. ${Number(job_salary_max).toLocaleString("id-ID")}`}
            </span>
          )}
          {/* Tanggal */}
          <div className="flex items-center gap-1">
            {" "}
            <Clock size={20} color="currentColor" variant="Bulk" className="text-primary-primary" />
            <Tooltip
              content={fullDate}
              placement="top"
              classNames={{
                content: "text-xs text-background-primary bg-primary-primary",
              }}
            >
              <span className="text-xs text-text-secondary cursor-help">{relativeDate}</span>
            </Tooltip>
          </div>
        </div>
        {user ? (
          <Link href={`/lowongan-pekerjaan/${job_slug}`} className="login flex items-center gap-2 transition-colors hover:text-secondary-primary group">
            <span className="text-xs">Detail</span>
            <ArrowRight2 size={20} color="currentColor" className="text-background-primary transition-colors group-hover:text-secondary-primary" />
          </Link>
        ) : (
          <Button className="login flex justify-center items-center gap-1 transition-colors hover:text-secondary-primary cursor-pointer" onPress={onOpen}>
            <span className="text-xs">Detail</span>
            <ArrowRight2 size={20} color="currentColor" className="text-background-primary transition-colors" />
          </Button>
        )}
      </div>
    </>
  );

  return (
    <>
      <div className="w-full p-4 flex flex-col gap-4 border border-default-200 group rounded-medium overflow-hidden bg-background-primary shadow shadow-cyan-200">{CardContent}</div>
      {!user && <ModalGuest isOpen={isOpen} onOpenChange={onOpenChange} />}
    </>
  );
}

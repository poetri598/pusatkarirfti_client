"use client";

// Iconsax
import { Location, PresentionChart, ArrowRight2 } from "iconsax-react";

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
import { InternshipItem } from "@/types/internship";

export default function CardMagang(props: InternshipItem) {
  const { internship_slug, internship_img, internship_name, province_names, city_names, country_names, mode_names, internship_type_name, internship_created_at } = props;

  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const relativeDate = getRelativeTimeRaw(internship_created_at);
  const fullDate = getFullTimeRaw(internship_created_at);

  const CardContent = (
    <>
      <Image src={internship_img} alt={internship_img} width={1280} height={720} className="w-full h-full aspect-video rounded-md object-cover" />
      <span className="text-xs font-bold w-full">{internship_name}</span>
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
          <span className="text-xs">{mode_names}</span>
        </div>
      </div>
      <div className="flex justify-between items-end gap-1">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-primary-primary w-full">{internship_type_name}</span>
          <Tooltip content={fullDate} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
            <span className="text-xs text-text-secondary cursor-help">{relativeDate}</span>
          </Tooltip>
        </div>
        {user ? (
          <Link href={`/magang/${internship_slug}`} className="login flex items-center gap-1 transition-colors hover:text-secondary-primary group">
            <span className="text-xs">Detail</span>
            <ArrowRight2 size={20} color="currentColor" className="text-background-primary transition-colors group-hover:text-secondary-primary" />
          </Link>
        ) : (
          <Button className="login flex items-center gap-1 transition-colors hover:text-secondary-primary group" onPress={onOpen}>
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

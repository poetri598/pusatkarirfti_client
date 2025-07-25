"use client";

// Iconsax
import { Location, Clock } from "iconsax-react";

// NextJS
import Image from "next/image";
import Link from "next/link";

// Components
import { useDisclosure, Tooltip } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw } from "@/utils/time";
import ModalGuest from "../Custom/ModalGuest";

// AuthContext
import { useAuth } from "@/context/AuthContext";

// Types
import { ExpoItem } from "@/types/expo";

export default function page(props: ExpoItem) {
  const { expo_slug, expo_name, expo_img, expo_created_at, mode_names, expo_price, expo_type_names } = props;

  const { user } = useAuth();
  const relativeDate = getRelativeTimeRaw(expo_created_at);
  const fullDate = getFullTimeRaw(expo_created_at);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const CardContent = (
    <>
      <Image src={expo_img} alt={expo_img} width={1280} height={720} className="w-full h-full aspect-video rounded-medium object-cover" />
      <span className="text-xs font-bold">{expo_name}</span>
      <div className="flex justify-between items-center text-text-secondary">
        <div className="flex justify-between items-center gap-1 ">
          <Location size={20} color="currentColor" className="text-text-secondary" />
          {((mode_names as string) || "").split(",").map((mode, index, arr) => (
            <span key={index} className="text-xs">
              {mode.trim()}
              {index < arr.length - 1 && ", "}
            </span>
          ))}
        </div>
        {/* Tanggal */}
        <div className="flex items-center gap-1">
          {" "}
          <Clock size={20} color="currentColor" variant="Bold" className="text-primary-primary" />
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
      <div className="flex justify-between">
        <div>
          {((expo_type_names as string) || "").split(",").map((expo_type, index, arr) => (
            <span key={index} className="text-xs font-bold text-primary-primary">
              {expo_type.trim()}
              {index < arr.length - 1 && ", "}
            </span>
          ))}
        </div>
        {Number(expo_price) === 0 ? <span className="text-xs font-bold text-primary-primary">Gratis</span> : <span className="text-xs font-bold text-primary-primary">{`Rp. ${Number(expo_price).toLocaleString("id-ID")}`}</span>}
      </div>
    </>
  );

  return user ? (
    <Link href={`/expo/${expo_slug}`} className="w-full p-4 flex flex-col gap-4 border border-default-200 bg-background-primary shadow shadow-cyan-200 group hover:bg-default-200 rounded-medium cursor-pointer overflow-hidden">
      {CardContent}
    </Link>
  ) : (
    <>
      <div onClick={onOpen} className="w-full p-4 flex flex-col gap-4 border border-default-200 bg-background-primary shadow shadow-cyan-200 group hover:bg-default-200 rounded-medium cursor-pointer overflow-hidden">
        {CardContent}
      </div>
      <ModalGuest isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

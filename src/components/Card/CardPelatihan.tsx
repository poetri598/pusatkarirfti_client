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
import { TrainingItem } from "@/types/training";

export default function page(props: TrainingItem) {
  const { training_slug, training_name, training_img, training_type_names, training_price, training_created_at, mode_names } = props;

  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const relativeDate = getRelativeTimeRaw(training_created_at);
  const fullDate = getFullTimeRaw(training_created_at);

  const CardContent = (
    <>
      <Image src={training_img} alt={training_img} width={1280} height={720} className="w-full h-full aspect-video rounded-md object-cover" />
      <span className="text-xs font-bold">{training_name}</span>
      <div className="flex justify-between items-center text-text-secondary">
        <div className="flex items-center gap-1">
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
          {((training_type_names as string) || "").split(",").map((type, index, arr) => (
            <span key={index} className="text-xs font-bold text-primary-primary">
              {type.trim()}
              {index < arr.length - 1 && ", "}
            </span>
          ))}
        </div>
        <span className="text-xs font-bold text-primary-primary">{Number(training_price) === 0 ? "Gratis" : `Rp. ${Number(training_price).toLocaleString("id-ID", { minimumFractionDigits: 0 })}`}</span>
      </div>
    </>
  );

  return (
    <>
      {user ? (
        <Link href={`/pelatihan/${training_slug}`} className="w-full p-4 flex flex-col gap-4 border border-default-200 bg-background-primary shadow shadow-cyan-200 group hover:bg-default-200 rounded-medium cursor-pointer overflow-hidden">
          {CardContent}
        </Link>
      ) : (
        <>
          <div className="w-full p-4 flex flex-col gap-4 border border-default-200 bg-background-primary shadow shadow-cyan-200 group hover:bg-default-200 rounded-medium cursor-pointer overflow-hidden" onClick={onOpen}>
            {CardContent}
          </div>
          <ModalGuest isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
      )}
    </>
  );
}

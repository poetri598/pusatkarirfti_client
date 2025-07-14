"use client";
import React, { useState, useEffect } from "react";
import { Clock } from "iconsax-react";
import { Breadcrumbs, BreadcrumbItem, Image, Snippet, Spinner, Chip, Tooltip } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw, getDateOnlyRaw, getDurationRaw } from "@/utils/time";
import { PlatformItem } from "@/types/platform";

import { getPlatformById } from "@/services/platform";

export default function page({ platform_id }: { platform_id: number }) {
  const [Platform, setPlatform] = useState<PlatformItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { success, data, error } = await getPlatformById(platform_id);
        if (success && data) {
          setPlatform(data);
        } else {
          setPlatform(null);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [platform_id]);

  if (loading)
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
  if (!Platform)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
        <p>Data tidak ditemukan.</p>
      </div>
    );

  return (
    <main className="xs:p-0 md:p-8  flex flex-col xs:gap-2 md:gap-8 overflow-hidden">
      <section className="flex flex-col xs:gap-2">
        {/* Breadcrumb */}
        <Breadcrumbs
          itemClasses={{
            item: "data-[current=true]:text-primary-primary text-xs text-text-secondary",
          }}
        >
          <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
          <BreadcrumbItem href="/platform">Platform</BreadcrumbItem>
          <BreadcrumbItem href={`/platform/${Platform.platform_id}`}>Detail Platform</BreadcrumbItem>
        </Breadcrumbs>

        <section className="flex flex-col justify-center items-center xs:gap-2 md:gap-4">
          <Image
            alt={Platform.platform_img}
            src={Platform.platform_img}
            width={640}
            height={640}
            loading="lazy"
            classNames={{ img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md ", wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary" }}
          />
          <span className="xs:text-sm md:text-2xl font-bold text-text-primary">{Platform.platform_name}</span>
          {/* Tanggal */}
          <div className="flex items-center justify-center gap-1 w-full">
            {" "}
            <Clock size={20} color="currentColor" variant="Bulk" className="text-primary-primary" />
            <Tooltip
              content={getFullTimeRaw(Platform.platform_created_at)}
              placement="top"
              classNames={{
                content: "text-xs text-background-primary bg-primary-primary",
              }}
            >
              <span className="text-xs text-text-secondary cursor-help">{getRelativeTimeRaw(Platform.platform_created_at)}</span>
            </Tooltip>
          </div>
        </section>
      </section>
    </main>
  );
}

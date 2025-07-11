"use client";
import React, { useState, useEffect } from "react";
import { Clock } from "iconsax-react";
import { Breadcrumbs, BreadcrumbItem, Spinner, Tooltip } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw } from "@/utils/time";
import { SkillItem } from "@/types/skill";

import { getSkillById } from "@/services/skill";

export default function page({ skill_id }: { skill_id: number }) {
  const [data, setData] = useState<SkillItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { success, data, error } = await getSkillById(skill_id);
        if (success && data) {
          setData(data);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [skill_id]);

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
  if (!data)
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
          <BreadcrumbItem href="/skill">Skill</BreadcrumbItem>
          <BreadcrumbItem href={`/skill/${skill_id}`}>Detail Skill</BreadcrumbItem>
        </Breadcrumbs>

        <section className="flex flex-col items-center justify-center xs:gap-2 min-h-screen">
          <span className="xs:text-xs md:text-9xl font-bold text-text-primary">{data.skill_name}</span>
          <span className="text-xs text-text-secondary">{data.skill_desc}</span>
          {/* Tanggal */}
          <div className="flex items-center">
            {" "}
            <Clock size={20} color="currentColor" variant="Bulk" className="text-primary-primary" />
            <Tooltip
              content={getFullTimeRaw(data.skill_created_at)}
              placement="top"
              classNames={{
                content: "text-xs text-background-primary bg-primary-primary",
              }}
            >
              <span className="text-xs text-text-secondary cursor-help">{getRelativeTimeRaw(data.skill_created_at)}</span>
            </Tooltip>
          </div>
        </section>
      </section>
    </main>
  );
}

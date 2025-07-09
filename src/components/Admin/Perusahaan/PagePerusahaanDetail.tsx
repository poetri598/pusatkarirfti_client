"use client";
import React, { useState, useEffect } from "react";
import { Clock } from "iconsax-react";
import { Breadcrumbs, BreadcrumbItem, Image, Snippet, Spinner, Chip, Tooltip } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw, getDateOnlyRaw, getDurationRaw } from "@/utils/time";
import { CompanyItem } from "@/types/company";

import { getCompanyById } from "@/services/company";

export default function PageLowonganMagangDetail({ company_id }: { company_id: number }) {
  const [company, setCompany] = useState<CompanyItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { success, data, error } = await getCompanyById(company_id);
        if (success && data) {
          setCompany(data);
        } else {
          setCompany(null);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [company_id]);

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
  if (!company)
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
          <BreadcrumbItem href="/perusahaan">Perusahaan</BreadcrumbItem>
          <BreadcrumbItem href={`/perusahaan/${company.company_id}`}>Detail Perusahaan</BreadcrumbItem>
        </Breadcrumbs>

        <section className="grid xs:grid-cols-1 md:grid-cols-2 xs:gap-2 md:gap-8">
          <div className="relative border border-default-200 rounded-medium">
            {" "}
            <Image
              alt={company.company_img}
              src={company.company_img}
              width={640}
              height={640}
              loading="lazy"
              classNames={{ img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md ", wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary" }}
            />
            {Number(company.company_is_partner) ? (
              <Chip className="text-xs font-medium px-3 py-0.5 rounded-full bg-primary-primary text-white absolute -top-2 right-2" variant="flat" size="sm">
                Partner
              </Chip>
            ) : null}
          </div>

          <div className="flex flex-col justify-between gap-2">
            <div className="flex flex-col gap-2">
              {" "}
              <span className="xs:text-sm md:text-2xl font-bold text-text-primary">{company.company_name}</span>
              <span className="text-xs text-text-secondary">{company.company_desc}</span>
            </div>
            <div className="flex flex-col gap-2">
              {/* Tanggal */}
              <div className="flex items-center justify-end gap-1 w-full">
                {" "}
                <Clock size={20} color="currentColor" variant="Bulk" className="text-primary-primary" />
                <Tooltip
                  content={getFullTimeRaw(company.company_created_at)}
                  placement="top"
                  classNames={{
                    content: "text-xs text-background-primary bg-primary-primary",
                  }}
                >
                  <span className="text-xs text-text-secondary cursor-help">{getRelativeTimeRaw(company.company_created_at)}</span>
                </Tooltip>
              </div>

              <Snippet size="sm" hideSymbol disableTooltip classNames={{ base: "w-full", pre: "text-xs text-text-secondary" }}>
                {company.company_link}
              </Snippet>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

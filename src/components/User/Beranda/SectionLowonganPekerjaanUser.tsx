"use client";
import React, { useEffect, useState } from "react";

// Components
import TitleSection from "@/components/Custom/TitleSection";
import CardLowonganPekerjaan from "@/components/Card/CardLowonganPekerjaan";

// Types
import { JobItem } from "@/types/job";
import { Spinner } from "@heroui/react";

// utils
import { createFetcher } from "@/utils/createFetcher";

export default function SectionLowonganPekerjaanUser() {
  const [threeLatestJob, setThreeLatestJob] = useState<JobItem[]>([]);
  const [isLoadingThreeLatestJob, setIsLoadingThreeLatestJob] = useState(true);
  const [apiErrorThreeLatestJob, setApiErrorThreeLatestJob] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createFetcher<JobItem[]>("/jobs/three-latest", setThreeLatestJob, setApiErrorThreeLatestJob, setIsLoadingThreeLatestJob)];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);
  return (
    <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 py-8 overflow-hidden">
      <TitleSection label="Lowongan Pekerjaan" href="/lowongan-pekerjaan" />
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xs:gap-2 lg:gap-8">
        {isLoadingThreeLatestJob ? (
          <div className="w-full flex justify-center items-center py-8">
            <Spinner
              label="Sedang memuat data..."
              labelColor="primary"
              variant="dots"
              classNames={{
                label: "text-primary-primary mt-4",
                dots: "border-5 border-primary-primary",
              }}
            />
          </div>
        ) : apiErrorThreeLatestJob ? (
          <p className="text-start text-xs text-danger-primary">{apiErrorThreeLatestJob}</p>
        ) : threeLatestJob.length === 0 ? (
          <p className="text-start text-xs text-text-secondary">Data belum tersedia</p>
        ) : (
          threeLatestJob.map((item) => <CardLowonganPekerjaan key={item.job_id} {...item} />)
        )}
      </div>
    </section>
  );
}

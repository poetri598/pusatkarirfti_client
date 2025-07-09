"use client";
import React, { useEffect, useState } from "react";

// Components
import TitleSection from "@/components/Custom/TitleSection";
import CardMagang from "@/components/Card/CardMagang";
import { Spinner } from "@heroui/react";

// Types
import { InternshipItem } from "@/types/internship";

// Services
import { getThreeLatestInternships } from "@/services/internship";

// utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function SectionMagangUser() {
  const [threeLatestInternship, setThreeLatestInternship] = useState<InternshipItem[]>([]);
  const [isLoadingThreeLatestInternship, setIsLoadingThreeLatestInternship] = useState(true);
  const [apiErrorThreeLatestInternship, setApiErrorThreeLatestInternship] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getThreeLatestInternships, setThreeLatestInternship, setApiErrorThreeLatestInternship, setIsLoadingThreeLatestInternship)];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);
  return (
    <>
      <>
        <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 py-8 overflow-hidden ">
          <TitleSection label="Magang" href="/magang" />
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xs:gap-2 lg:gap-8">
            {isLoadingThreeLatestInternship ? (
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
            ) : apiErrorThreeLatestInternship ? (
              <p className="text-start text-xs text-danger-primary">{apiErrorThreeLatestInternship}</p>
            ) : threeLatestInternship.length === 0 ? (
              <p className="text-start text-xs text-text-secondary">Data belum tersedia</p>
            ) : (
              threeLatestInternship.map((item) => <CardMagang key={item.internship_id} {...item} />)
            )}
          </div>
        </section>
      </>
    </>
  );
}

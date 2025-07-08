"use client";
import React, { useEffect, useState } from "react";

// Components
import TitleSection from "@/components/Custom/TitleSection";
import CardPelatihan from "@/components/Card/CardPelatihan";
import { createFetcher } from "@/utils/createFetcher";

// types
import type { TrainingItem } from "@/types/training";
import { Spinner } from "@heroui/react";

export default function SectionPelatihanUser() {
  const [threeLatest, setThreeLatest] = useState<TrainingItem[]>([]);
  const [isLoadingThreeLatest, setIsLoadingThreeLatest] = useState(true);
  const [apiErrorThreeLatest, setApiErrorThreeLatest] = useState<string | null>(null);
  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createFetcher<TrainingItem[]>("/trainings/three-latest", setThreeLatest, setApiErrorThreeLatest, setIsLoadingThreeLatest)];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);
  return (
    <>
      <>
        <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 py-8 overflow-hidden ">
          <TitleSection label="Pelatihan" href="/pelatihan" />
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xs:gap-2 lg:gap-8">
            {isLoadingThreeLatest ? (
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
            ) : apiErrorThreeLatest ? (
              <p className="text-center py-8 text-red-500">{apiErrorThreeLatest}</p>
            ) : threeLatest.length === 0 ? (
              <p className="text-start text-xs text-text-secondary">Data belum tersedia</p>
            ) : (
              threeLatest.map((item) => <CardPelatihan key={item.training_id} {...item} />)
            )}
          </div>
        </section>
      </>
    </>
  );
}

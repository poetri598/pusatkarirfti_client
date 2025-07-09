"use client";
import { useEffect, useState } from "react";
// Components
import CardPelatihan from "@/components/Card/CardPelatihan";
import { Spinner } from "@heroui/react";

// Types
import { TrainingItem } from "@/types/training";
// Services
import { searchTrainingsActive } from "@/services/training";

interface Props {
  keyword: string;
}

export default function SectionHasilPencarianUser({ keyword }: Props) {
  const [trainings, setTrainings] = useState<TrainingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!keyword.trim()) {
        setTrainings([]);
        setHasSearched(false);
        return;
      }
      setLoading(true);
      try {
        const { success, data, error } = await searchTrainingsActive({ keyword });
        if (success) {
          setTrainings(data ?? []);
        } else {
          setTrainings([]);
        }
      } catch (error) {
        console.error("Gagal mencari pelatihan:", error);
        setTrainings([]);
      } finally {
        setLoading(false);
        setHasSearched(true);
      }
    };

    fetchData();
  }, [keyword]);

  if (!keyword.trim()) return null;

  return (
    <section className="px-4 py-8 flex flex-col gap-4">
      <div className="text-center flex flex-col gap-1">
        <span className="text-xs text-text-secondary">
          Kata kunci: <span className="text-primary-primary font-medium">{keyword}</span>
        </span>
        <span className="text-xs text-text-secondary">
          Kami menemukan <span className="font-bold text-primary-primary">{trainings.length}</span> pelatihan
        </span>
      </div>

      {loading ? (
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
      ) : trainings.length > 0 ? (
        <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 py-8 overflow-hidden ">
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xs:gap-2 lg:gap-8">
            {trainings.map((item) => (
              <CardPelatihan key={item.training_id} {...item} />
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}

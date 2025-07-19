"use client";

import React, { useEffect, useState } from "react";
import { getCVByUsername } from "@/services/cv";
import { CVItem } from "@/types/cv";
import CVPreview from "@/components/Custom/CVPreviews";
import { Spinner, Button, Link } from "@heroui/react";

// Iconsax
import { DocumentDownload, ArrowLeft } from "iconsax-react";

export default function CVPreviewPage({ user_name }: { user_name: string }) {
  const [cvData, setCVData] = useState<CVItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCV = async () => {
      if (!user_name) return;
      setLoading(true);
      const res = await getCVByUsername(user_name);
      setLoading(false);
      if (res.success) setCVData(res.data ?? null);
    };

    fetchCV();
  }, [user_name]);

  if (loading) {
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
  }

  if (!cvData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-gray-500">Data tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-2">
      {/* Download */}
      <div className="w-full justify-end items-center flex gap-2 h-12 print:hidden p-8">
        <Button startContent={<ArrowLeft size={16} variant="Bulk" color="currentColor" className="text-background-primary" />} color="default" variant="solid" className="login" as={Link} href="/buat-cv">
          Kembali
        </Button>
        <Button endContent={<DocumentDownload size={16} variant="Bulk" color="currentColor" className="text-background-primary" />} color="default" variant="solid" className="login" onPress={() => window.print()}>
          Download
        </Button>
      </div>

      {/* CV Preview */}
      <CVPreview data={cvData} />
    </div>
  );
}

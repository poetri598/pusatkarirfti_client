"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { getJobSummary } from "@/services/job"; // Pastikan path ini sesuai

export default function Page() {
  const [summary, setSummary] = useState<{
    total_all: number;
    total_status_1: number;
    total_status_2: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSummary() {
      const result = await getJobSummary();
      if (result.success) {
        setSummary(result.data || null);
      } else {
        setError(result.error || "Gagal mengambil data ringkasan");
      }
      setLoading(false);
    }

    fetchSummary();
  }, []);

  return (
    <main className="w-full mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
      {/* Breadcrumb */}
      <Breadcrumbs
        itemClasses={{
          item: "data-[current=true]:text-primary-primary text-xs text-text-secondary",
        }}
      >
        <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
      </Breadcrumbs>

      {/* 1 Card berisi 3 informasi */}
      <div className="bg-white rounded-xl shadow p-6 w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Ringkasan Lowongan Pekerjaan</h2>

        {loading ? (
          <p className="text-sm text-gray-500">Memuat data...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : summary ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Total Semua */}
            <div className="transition duration-300 transform hover:scale-105 bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-gray-100">
              <p className="text-sm text-gray-600 mb-1">Total Semua</p>
              <p className="text-3xl font-bold text-gray-800">{summary.total_all}</p>
            </div>

            {/* Lowongan Aktif */}
            <div className="transition duration-300 transform hover:scale-105 bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-green-100">
              <p className="text-sm text-green-700 mb-1">Lowongan Aktif</p>
              <p className="text-3xl font-bold text-green-800">{summary.total_status_1}</p>
            </div>

            {/* Lowongan Tidak Aktif */}
            <div className="transition duration-300 transform hover:scale-105 bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-red-100">
              <p className="text-sm text-red-700 mb-1">Lowongan Tidak Aktif</p>
              <p className="text-3xl font-bold text-red-800">{summary.total_status_2}</p>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

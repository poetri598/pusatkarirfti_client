"use client";

import React, { useEffect, useState } from "react";
import { getSummary } from "@/services/user";

export default function Page() {
  const [summary, setSummary] = useState<{
    total_all: number;
    total_status_1: number;
    total_status_2: number;
    total_admin: number;
    total_mahasiswa: number;
    total_alumni: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSummary() {
      const result = await getSummary();
      if (result.success) {
        setSummary(result.data ?? null);
      } else {
        setError(result.error || "Gagal mengambil data");
      }
      setLoading(false);
    }

    fetchSummary();
  }, []);

  return (
    <section className="grid xs:grid-cols-1 gap-2 border border-default-200 p-2 rounded-medium ">
      <span className="font-bold xs:text-sm md:text-base">Pengguna</span>
      <div className="flex flex-col items-center gap-2 border border-default-200 p-2 rounded-medium bg-default-200 transition-colors duration-300 hover:bg-default-300 transform hover:scale-105">
        <span className="text-xs ">Total Semua</span>
        <span className="font-bold">{summary?.total_all}</span>
      </div>
      <div className="grid xs:grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-2">
        <div className="flex flex-col items-center gap-2 border border-default-200 p-2 rounded-medium bg-primary-border transition-colors  duration-300 hover:bg-primary-hover transform hover:scale-105">
          <span className="text-xs text-white ">Total Aktif</span>
          <span className="font-bold text-white">{summary?.total_status_1}</span>
        </div>
        <div className="flex flex-col items-center gap-2 border border-default-200 p-2 rounded-medium bg-cyan-500 transition-colors  duration-300 hover:bg-cyan-600 transform hover:scale-105">
          <span className="text-xs text-white">Total Admin</span>
          <span className="font-bold text-white">{summary?.total_admin}</span>
        </div>
        <div className="flex flex-col items-center gap-2 border border-default-200 p-2 rounded-medium bg-green-500 transition-colors  duration-300 hover:bg-green-600 transform hover:scale-105">
          <span className="text-xs text-white">Total Mahasiswa</span>
          <span className="font-bold text-white">{summary?.total_mahasiswa}</span>
        </div>
        <div className="flex flex-col items-center gap-2 border border-default-200 p-2 rounded-medium bg-orange-400 transition-colors  duration-300 hover:bg-orange-500 transform hover:scale-105">
          <span className="text-xs text-white">Total Alumni</span>
          <span className="font-bold text-white">{summary?.total_alumni}</span>
        </div>
        <div className="flex flex-col items-center gap-2 border border-default-200 p-2 rounded-medium bg-danger-primary transition-colors  duration-300 hover:bg-danger-hover transform hover:scale-105">
          <span className="text-xs text-white">Total Tidak Aktif</span>
          <span className="font-bold text-white">{summary?.total_status_2}</span>
        </div>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import { Pagination, Button } from "@heroui/react";
import { ArrowRight2 } from "iconsax-react";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="flex items-center gap-2">
      {/* Sebelumnya */}
      <Button size="sm" variant="light" className="text-primary-primary font-bold px-4 py-2 text-sm" onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))} isDisabled={currentPage === 1}>
        <ArrowRight2 size={16} color="currentColor" className="rotate-180 mr-1" />
        Sebelumnya
      </Button>

      {/* Pagination */}
      <Pagination
        page={currentPage}
        total={10} // Ganti sesuai total halaman kamu
        onChange={setCurrentPage}
        classNames={{
          base: "overflow-hidden",
          cursor: "rounded-md text-sm w-8 h-8 text-primary-primary",
          item: ["text-text-secondary", "data-[active=true]:text-primary-primary", "data-[active=true]:border", "data-[active=true]:border-primary-primary", "data-[active=true]:font-medium", "bg-backbround-secondary"],
        }}
      />

      {/* Selanjutnya */}
      <Button size="sm" variant="light" className="text-primary-primary font-bold px-4 py-2 text-sm" onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))} isDisabled={currentPage === 10}>
        Selanjutnya
        <ArrowRight2 size={16} color="currentColor" className="ml-1" />
      </Button>
    </div>
  );
}

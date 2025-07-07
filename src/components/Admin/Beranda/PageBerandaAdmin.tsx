"use client";

// Components
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

export default function PageBerandaAdmin() {
  return (
    <>
      <>
        <main className="p-8">
          {" "}
          {/* Breadcrumb */}
          <Breadcrumbs
            itemClasses={{
              item: "data-[current=true]:text-primary-primary text-xs text-text-secondary",
            }}
          >
            <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
          </Breadcrumbs>
        </main>
      </>
    </>
  );
}

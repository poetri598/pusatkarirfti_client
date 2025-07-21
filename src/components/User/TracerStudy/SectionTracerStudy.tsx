"use client";
import React from "react";

import { Stickynote } from "iconsax-react";

import { Button, Link } from "@heroui/react";

export default function SectionTracerStudy() {
  return (
    <>
      <>
        <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col justify-center items-center gap-8 pb-16 bg-background-primary py-8 min-h-screen">
          <div className="grid xs:grid-cols-1 md:grid-cols-2 justify-center items-center gap-8">
            <img src="/tracer-study-img.png" alt="" />
            <div className="flex flex-col gap-4 items-center justify-center">
              {" "}
              <span className="text-xs text-text-secondary text-justify">
                Tracer Study merupakan upaya dalam menjalin komunikasi berkelanjutan dengan para alumni, sekaligus memperoleh informasi mengenai perjalanan karier setelah lulus. Melalui partisipasi Anda, kami dapat mengevaluasi relevansi
                kurikulum dengan kebutuhan dunia kerja serta meningkatkan mutu pendidikan di masa mendatang. Kehadiran dan kontribusi Anda sangat berarti bagi kemajuan institusi dan generasi penerus.
              </span>
              <div className="w-full flex justify-start">
                {" "}
                <Button startContent={<Stickynote size={16} variant="Bulk" color="currentColor" className="text-background-primary" />} color="default" variant="solid" className="login" as={Link} href="https://tracer.unsap.ac.id/">
                  Isi Kuesioner
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}

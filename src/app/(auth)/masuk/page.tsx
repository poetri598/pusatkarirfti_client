"use client";
import SectionLeft from "@/components/Auth/Masuk/SectionLeft";
import SectionRight from "@/components/Auth/SectionRight";
export default function page() {
  return (
    <>
      <>
        <main className="min-h-screen mx-auto w-full grid xs:grid-cols-1 md:grid-cols-12 xs:gap-2 md:gap-8">
          <SectionLeft className="xs:col-span-1 md:col-span-7 flex flex-col justify-center items-center" />
          <SectionRight className="xs:col-span-1 md:col-span-5 gradient-style relative" />
        </main>
      </>
    </>
  );
}

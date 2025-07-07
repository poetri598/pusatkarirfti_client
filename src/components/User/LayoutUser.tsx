"use client";
import React, { useRef } from "react";

import "@/styles/globals.css";

// // Iconsax
import { ArrowRight } from "iconsax-react";

// Components
import { Button } from "@heroui/react";
import Footer from "@/components/HeaderFooter/Footer";
import Navbar from "@/components/HeaderFooter/Navbar";

export default function LayoutUser({ children }: { children: React.ReactNode }) {
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="relative flex flex-col" ref={topRef}>
      <Navbar />
      {children}
      <Footer />
      <Button
        onPress={scrollToTop}
        className="fixed z-50 bottom-4 right-4 bg-primary-primary text-background-primary px-4 py-2 rounded-full shadow-lg hover:bg-default-200 hover:text-primary-primary hover:border hover:border-primary-primary trasition duration-300 ease-in-out"
      >
        <ArrowRight size="20" color="currentColor" className="-rotate-90" />
      </Button>
    </section>
  );
}

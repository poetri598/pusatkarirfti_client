"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/beranda");
  }, [router]);

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <Spinner label="Redirecting" labelColor="primary" variant="wave" classNames={{ label: "text-primary-primary mt-4", dots: "border-5 border-primary-primary" }} />
      </div>
    </>
  );
}

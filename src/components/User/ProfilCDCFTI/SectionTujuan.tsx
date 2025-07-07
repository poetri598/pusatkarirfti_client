"use client";
import React from "react";

// NextJS
import Image from "next/image";

export default function SectionTujuan() {
  return (
    <>
      <>
        <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 py-8">
          <div className="flex flex-col gap-4 items-start">
            <div className="relative z-10 w-fit">
              <p className=" relative z-10 xs:text-xl sm:text-4xl text-primary-primary font-bold ">Tujuan</p>
              <div className="absolute top-1/2  w-3/5 h-1/2 bg-secondary-primary"></div>
            </div>
            <div className=" grid xs:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <Image src={`/tentang.png`} alt={`/tentang.png`} width={1280} height={720} className="w-full h-full aspect-video rounded-md object-cover" />
              <p className="text-sm text-justify text-text-secondary ">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam veniam quis laudantium veritatis magnam, vitae fugiat officia et vel ex aperiam cupiditate neque aspernatur possimus porro sit quos quae laborum nihil illum
                nemo omnis corporis? Nobis labore, a libero modi exercitationem provident. Rerum nulla maiores laboriosam nihil quia, beatae tempora inventore, asperiores modi quos quam ipsam sit necessitatibus quo officiis assumenda
                repellendus quae unde eaque fugit sunt quisquam sed eos! Architecto inventore impedit laborum, autem itaque alias laudantium voluptatum saepe deleniti iusto, minus atque asperiores at quia veritatis quaerat? Eos distinctio
                soluta veniam magni. Sequi culpa ab atque! Deleniti, modi!
              </p>
            </div>
          </div>
        </section>
      </>
    </>
  );
}

"use client";
import React from "react";

// NextJS
import Image from "next/image";

// Components
import HeroTentangKami from "@/components/Custom/HeroTentangKami";
import PartnershipSection from "@/components/User/Beranda/SectionPartnershipUser";
import SectionMisi from "@/components/User/ProfilCDCFTI/SectionMisi";
import SectionVisi from "@/components/User/ProfilCDCFTI/SectionVisi";
import SectionTujuan from "@/components/User/ProfilCDCFTI/SectionTujuan";
import SectionManfaat from "@/components/User/ProfilCDCFTI/SectionManfaat";

const titleTentangKamiItems = [
  {
    label: "Profil Pusat Karir FTI",
    text: "Website Pusat Karir Fakultas Teknologi Informasi Universitas Sebelas April adalah platform yang menyediakan informasi terkait peluang karir bagi mahasiswa dan lulusan di bidang teknologi informasi. Website ini dirancang untuk membantu mahasiswa dalam mempersiapkan diri menghadapi dunia kerja melalui berbagai fitur, seperti informasi lowongan kerja, magang, seminar, serta pelatihan pengembangan keterampilan. Selain itu, website ini juga menawarkan bimbingan karir dan tips dalam menyusun CV, surat lamaran, serta panduan menghadapi wawancara. Tujuannya adalah mendukung para lulusan dalam mengembangkan karir dan memperluas jaringan profesional di industri teknologi informasi.",
  },
];
export default function ProfilCDCFTI() {
  return (
    <>
      <main>
        {/* Title Tentang */}
        <HeroTentangKami titleTentangKamiItems={titleTentangKamiItems} />

        {/* Section Tentang */}
        <div className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 py-8">
          {""}
          <div className=" grid xs:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="group flex flex-col gap-2 text-3xl font-bold">
              <span className="xs:text-xl sm:text-4xl">Tempat terbaik Untuk</span>
              <div className="flex gap-2">
                {" "}
                <div className="relative z-10 w-fit">
                  <span className=" relative z-10 xs:text-xl sm:text-4xl  text-primary-primary font-bold ">Berkembang</span>
                  <div className="absolute top-1/2 w-3/5 h-1/2 bg-secondary-primary"></div>
                </div>
                &
                <div className="relative z-10 w-fit">
                  <span className=" relative xs:text-xl sm:text-4xl z-10  text-primary-primary font-bold ">Tumbuh</span>
                  <div className="absolute top-1/2 right-0 w-3/5 h-1/2 bg-secondary-primary"></div>
                </div>
              </div>
            </div>
            <span className="text-xs xs:text-justify md:text-center text-text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi inventore porro neque blanditiis beatae natus repudiandae at accusantium. Ratione impedit cupiditate, quas illum alias tempore totam quam atque exercitationem
              excepturi nihil magnam, provident laboriosam incidunt aliquid architecto vel voluptatum rerum. Doloribus cumque odit molestias natus neque. Consequatur nisi autem aliquid!
            </span>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <Image src={`/tentang.png`} alt={`/tentang.png`} width={1280} height={720} className="w-full h-full aspect-video rounded-md object-cover" />
            <span className="text-xs text-text-secondary xs:text-justify md:text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae deleniti modi molestiae magnam fuga cupiditate odit laudantium, reprehenderit, aspernatur quasi dolor corporis molestias consectetur in possimus dolorem,
              earum perspiciatis delectus iure eum doloremque praesentium nemo provident! Praesentium molestiae nihil, quaerat facilis sit quos! Placeat quae quos quam vero. Vel, quidem iure ducimus quam omnis, et nisi, saepe eum expedita
              dolore quibusdam. Velit voluptate blanditiis eum voluptatem sint aperiam veniam ex, quo odit. Ipsum, accusantium quam ipsa tempore reprehenderit quos consectetur maxime! Dolores sit at veniam in! Quam possimus veritatis vitae
              debitis expedita. Cumque eius mollitia iure quod officiis aliquam!
            </span>
          </div>
        </div>

        {/* Section Visi */}
        <SectionVisi />

        {/* Section Misi */}
        <SectionMisi />

        {/* Section Manfaat */}
        <SectionTujuan />

        {/* Section Tujuan */}
        <SectionManfaat />

        {/* Section Partnership */}
        <PartnershipSection />
      </main>
    </>
  );
}

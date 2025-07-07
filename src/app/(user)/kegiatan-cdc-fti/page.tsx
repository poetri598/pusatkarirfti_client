// NextJS
import Image from "next/image";
import Link from "next/link";

// Components
import HeroTentangKami from "@/components/Custom/HeroTentangKami";
import SectionRekapKegiatan from "@/components/User/KegiatanCDCFTI/SectionRekapKegiatan";
import SectionContactUs from "@/components/User/KegiatanCDCFTI/SectionContactUs";

const titleTentangKamiItems = [
  {
    label: "Kegiatan Pusat Karir FTI",
    text: "Tidak hanya memberikan informasi terkait pengembangan karir, kami juga selalu berkomitmen untuk mengadakan kegiatan pengembangan karir dengan menjalin kerjasama dengan berbagai  pihak ataupun intansi baik swasta maupun pemerintah guna memberikan inovasi bagi mahasiswa/alumni kami. ",
  },
];

export default function KegiatanCDCFTI() {
  return (
    <>
      <>
        <main>
          {/* Title Tentang */}
          <HeroTentangKami titleTentangKamiItems={titleTentangKamiItems} />

          {/* Section Rekap Kegiatan */}
          <SectionRekapKegiatan />

          {/* Section Contact Us */}
          <SectionContactUs />
        </main>
      </>
    </>
  );
}

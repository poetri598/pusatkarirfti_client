// Iconsax
import { Sms, Instagram, Facebook, Youtube, Whatsapp } from "iconsax-react";

// NextJS
import Image from "next/image";
import Link from "next/link";

// Components
import Logo from "./Logo";

export default function Footer() {
  return (
    <>
      <footer className="w-full mx-auto flex flex-col gradient-style group overflow-hidden">
        {/* Footer Desktop */}
        <div className="xs:hidden md:flex flex-col group text-background-primary text-xs gap-6 py-32 xs:w-11/12 lg:w-10/12 mx-auto">
          <div className="grid grid-cols-2 xs:gap-2 xl:gap-8 ">
            {/* Kotak Kiri */}

            <div className="h-full  flex flex-col xs:gap-2 xl:gap-6">
              <Logo />
              <span className="flex flex-col">
                <p>Alamat: Jl. Angkrek Situ No.19, Situ, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat 45621 </p>
                <p>Fakultas Teknologi Informasi</p>
                <p>Universitas Sebelas April</p>
              </span>
              <Link href={"/"} className="flex items-center gap-1 hover:text-primary-border">
                <Sms size={16} color="currentColor" variant="Bold" className="text-background-primary " />
                <p>fti@unsap.ac.id</p>
              </Link>
              <Image src="/kampusmerdeka.png" alt="Kampus Merdeka" width={150} height={80} />
            </div>

            {/* Kotak Kanan */}
            <div className="h-full flex justify-end xs:gap-4 xl:gap-8 ">
              <div className="flex flex-col justify-start xs:gap-2 xl:gap-6 font-bold">
                <Link href={"/"} className="hover:text-primary-border">
                  Beranda
                </Link>
                <Link href={"/berita"} className="hover:text-primary-border">
                  Berita
                </Link>
                <Link href={"/tracer-study"} className="hover:text-primary-border">
                  Tracer Study
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <Link href={"/lowongan-pekerjaan"} className="hover:text-primary-border font-bold">
                  Karir
                </Link>
                <span className="flex flex-col gap-3">
                  <Link href={"/lowongan-pekerjaan"} className="hover:text-primary-border">
                    Lowongan Kerja
                  </Link>
                  <Link href={"/magang"} className="hover:text-primary-border">
                    Magang
                  </Link>
                  <Link href={"/pelatihan"} className="hover:text-primary-border">
                    Pelatihan
                  </Link>
                  <Link href={"/expo"} className="hover:text-primary-border">
                    Expo
                  </Link>
                  <Link href={"/konseling"} className="hover:text-primary-border">
                    Konseling
                  </Link>
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <Link href={"/profil-cdc-fti"} className="hover:text-primary-border font-bold">
                  Tentang Kami
                </Link>
                <span className="flex flex-col gap-3">
                  <Link href={"/profil-cdc-fti"} className="hover:text-primary-border">
                    Profil CDC FTI
                  </Link>
                  <Link href={"/kegiatan-cdc-fti"} className="hover:text-primary-border">
                    Kegiatan CDC FTI
                  </Link>
                  <Link href={"/hubungi-kami"} className="hover:text-primary-border">
                    Hubungi Kami
                  </Link>
                </span>
              </div>
            </div>
          </div>

          {/* Garis */}
          <div className="border-t-2 border-solid border-white"></div>

          {/* Bawah garis */}
          <div className="flex justify-between items-center">
            <p>@2024. Fakultas Teknologi Informasi - Universitas Sebelas April.</p>
            <div className="flex gap-3">
              <Link href={"/"} className="px-2 py-2 bg-primary-primary rounded-lg hover:bg-primary-hover ">
                <Instagram size={16} color="currentColor" variant="Bold" className="text-background-primary " />
              </Link>
              <Link href={"/"} className="px-2 py-2 bg-primary-primary rounded-lg hover:bg-primary-hover ">
                <Facebook size={16} color="currentColor" variant="Bold" className="text-background-primary " />
              </Link>
              <Link href={"/"} className="px-2 py-2 bg-primary-primary rounded-lg hover:bg-primary-hover ">
                <Youtube size={16} color="currentColor" variant="Bold" className="text-background-primary " />
              </Link>
              <Link href={"/"} className="px-2 py-2 bg-primary-primary rounded-lg hover:bg-primary-hover ">
                <Whatsapp size={16} color="currentColor" variant="Bold" className="text-background-primary " />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Mobile */}
        <div className="xs:flex md:hidden justify-center items-center py-4">
          <span className="text-xs text-center text-background-primary">@2024. Fakultas Teknologi Informasi - Universitas Sebelas April</span>
        </div>
      </footer>
    </>
  );
}

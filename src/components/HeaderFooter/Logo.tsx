import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/beranda" className="flex items-center gap-2 text-xs hover:text-primary-border group/logo">
      <Image src="/logofti.png" alt="Logo Fakultas Teknologi Informasi Universitas Sebelas April" width={40} height={40} className="object-cover group-hover/logo:-rotate-12" />
      <div className="xs:hidden md:block font-poppins leading-tight">
        <p className="font-bold">PUSAT KARIR</p>
        <p className="font-bold">FAKULTAS TEKNOLOGI INFORMASI</p>
        <p>UNIVERSITAS SEBELAS APRIL</p>
      </div>
    </Link>
  );
}

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import Link from "next/link";

const signup = [
  { label: "Mahasiswa", href: "/daftar-mahasiswa" },
  { label: "Alumni", href: "/daftar-alumni" },
  { label: "Perusahaan", href: "/daftar-perusahaan" },
];

interface ModalGuestProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ModalGuest({ isOpen, onOpenChange }: ModalGuestProps) {
  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange} classNames={{ footer: "flex flex-col gap-2 text-center" }}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader />
            <ModalBody>
              <span className="xs:text-xs md:text-xl text-center font-bold text-primary-primary">Selamat datang di Pusat Karir FTI UNSAP</span>
              <span className="text-xs text-center font-bold">Ayooo, daftar sekarang untuk akses lengkap informasi terkait lowongan pekerjaan, magang, pelatihan dan program lainnya!</span>
            </ModalBody>
            <ModalFooter>
              <Link href="/masuk" className="login">
                Sudah Punya Akun
              </Link>
              <Dropdown classNames={{ base: "bg-transparent gap-4 w-full", content: "bg-transparent shadow-none", trigger: "px-0" }}>
                <DropdownTrigger>
                  <Button disableRipple className="!w-full" radius="md" variant="light">
                    <span className="signup w-full"> Daftar Sekarang</span>
                  </Button>
                </DropdownTrigger>

                <DropdownMenu classNames={{ list: "gap-2" }}>
                  {signup.map((item, index) => (
                    <DropdownItem key={index} href={item.href} className="signup data-[hover=true]:bg-background-primary data-[hover=true]:text-primary-primary">
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

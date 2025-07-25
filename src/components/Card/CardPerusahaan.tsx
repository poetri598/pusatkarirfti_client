import React from "react";

// Iconsax
import { More, Eye, Trash, Edit, Clock } from "iconsax-react";

// Components
import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Image, Tooltip, Chip } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw } from "@/utils/time";

import { deleteCompanyById } from "@/services/company";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { CompanyItem } from "@/types/company";

export default function page(props: CompanyItem) {
  const { company_id, company_name, company_img, company_is_partner, company_updated_at } = props;
  const relativeDate = getRelativeTimeRaw(company_updated_at);
  const fullDate = getFullTimeRaw(company_updated_at);

  return (
    <>
      <div className="w-full relative flex flex-col gap-4 p-4 mb-8 border border-default-200 rounded-medium hover:bg-default-200">
        <div className="flex justify-end w-full">
          {/* More Button */}
          <Dropdown
            classNames={{
              base: "!w-fit ",
              content: "!w-fit min-w-16",
              trigger: "p-2 cursor-pointer",
            }}
          >
            <DropdownTrigger>
              <More size={40} color="currentColor" className="rotate-90 text-text-secondary" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions" classNames={{ base: "w-fit" }}>
              <DropdownItem href={`/perusahaan/${company_id}`} key="lihat" classNames={{ base: "!w-fit" }}>
                <Tooltip content="Lihat detail" placement="right-end" className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-none">
                  <Button isIconOnly variant="light" size="sm">
                    <Eye size={20} color="currentColor" variant="Bold" className="text-yellow-500" />
                  </Button>
                </Tooltip>
              </DropdownItem>

              <DropdownItem href={`/perusahaan/edit/${company_id}`} key="edit" classNames={{ base: "!w-fit" }}>
                <Tooltip content="Edit data" placement="right-end" className="bg-primary-primary text-white text-xs px-2 py-1 rounded">
                  <Button isIconOnly variant="light" size="sm">
                    <Edit size={20} color="currentColor" variant="Bold" className="text-primary-primary" />
                  </Button>
                </Tooltip>
              </DropdownItem>

              <DropdownItem
                key="hapus"
                classNames={{
                  base: "!w-fit  data-[hover=true]:bg-danger-primary data-[hover=true]:text-white group/hapus",
                }}
              >
                <Tooltip content="Hapus data" placement="right-end" className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    color="danger"
                    onPress={async () => {
                      const confirm = await showConfirmationDialog();
                      if (confirm.isConfirmed) {
                        const result = await deleteCompanyById(company_id);
                        if (result.success) {
                          await showSuccessDialog();
                          window.location.reload();
                        } else {
                          await showErrorDialog(result.error);
                        }
                      }
                    }}
                  >
                    <Trash size={20} color="currentColor" variant="Bold" className="text-danger-primary group-hover/hapus:text-white" />
                  </Button>
                </Tooltip>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Image*/}
        <Image src={company_img} alt={company_img} width={1280} height={720} className="w-full !h-48 aspect-video rounded-md object-contain" />

        <p className="text-xs font-semibold text-text-primary">{company_name}</p>

        {/* Tanggal & View Count */}
        <div className="flex xs:flex-col md:flex-row xs:items-start md:items-center justify-between gap-2">
          {/* Tanggal */}
          <div className="flex items-center gap-1">
            {" "}
            <Clock size={20} color="currentColor" variant="Bold" className="text-primary-primary" />
            <Tooltip
              content={fullDate}
              placement="top"
              classNames={{
                content: "text-xs text-background-primary bg-primary-primary",
              }}
            >
              <span className="text-xs text-text-secondary cursor-help">{relativeDate}</span>
            </Tooltip>
          </div>
        </div>

        {Number(company_is_partner) ? (
          <Chip className="text-xs font-medium px-3 py-0.5 rounded-full bg-primary-primary text-white absolute -top-2 right-2" variant="flat" size="sm">
            Partner
          </Chip>
        ) : null}
      </div>
    </>
  );
}

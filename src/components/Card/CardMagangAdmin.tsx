import React from "react";

// Iconsax
import { More, Calendar, Eye, Trash, Edit, Clock } from "iconsax-react";

// Components
import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Image, Tooltip } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw } from "@/utils/time";
import { formatViews } from "@/utils/view";

import { deleteInternshipById } from "@/services/internship";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { InternshipItem } from "@/types/internship";

export default function CardLowonganMagangAdmin(props: InternshipItem) {
  const { internship_id, internship_slug, user_img, user_fullname, internship_img, internship_name, internship_created_at, internship_views } = props;
  const relativeDate = getRelativeTimeRaw(internship_created_at);
  const fullDate = getFullTimeRaw(internship_created_at);

  return (
    <>
      <div className="w-full flex flex-col gap-4 p-4 mb-8 border border-default-200 rounded-medium hover:bg-default-200 overflow-hidden">
        {/* User & More */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-text-secondary">
            <Avatar src={user_img} size="sm" />
            <span className="text-xs">{user_fullname}</span>
          </div>

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
              <DropdownItem href={`/magang/${internship_slug}`} key="lihat" classNames={{ base: "!w-fit" }}>
                <Tooltip content="Lihat detail" placement="right-end" className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-none">
                  <Button isIconOnly variant="light" size="sm">
                    <Eye size={20} color="currentColor" variant="Bold" className="text-yellow-500" />
                  </Button>
                </Tooltip>
              </DropdownItem>

              <DropdownItem href={`/magang/edit/${internship_slug}`} key="edit" classNames={{ base: "!w-fit" }}>
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
                        const result = await deleteInternshipById(internship_id);
                        if (result.success) {
                          await showSuccessDialog();
                          window.location.reload(); // atau trigger re-fetch state
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
        <Image src={internship_img} alt={internship_img} width={1280} height={720} className="w-full !h-48 aspect-video rounded-md object-contain" />

        {/* Nama */}
        <span className="text-text-primary text-xs font-bold">{internship_name}</span>

        {/* Tanggal & View Count */}
        <div className="flex xs:flex-col md:flex-row xs:items-start md:items-center justify-between gap-2">
          {/* Tanggal */}
          <div className="flex items-center gap-1">
            {" "}
            <Clock size={20} color="currentColor" variant="Bulk" className="text-primary-primary" />
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

          {/* View */}
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <Tooltip
              content={internship_views.toLocaleString("id-ID")}
              placement="top"
              classNames={{
                content: "text-xs text-background-primary bg-primary-primary",
              }}
            >
              <div className="flex items-center gap-1">
                <Eye size="20" color="currentColor" variant="Bold" className="text-primary-primary" />
                <span className="text-xs text-text-secondary">{formatViews(internship_views)} kali dilihat</span>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

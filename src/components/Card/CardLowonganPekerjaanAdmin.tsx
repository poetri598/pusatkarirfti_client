import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

// Iconsax
import { More, Calendar, Eye, Trash, Edit, Clock } from "iconsax-react";

// Components
import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Image, Tooltip } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw } from "@/utils/time";
import { formatViews } from "@/utils/view";

import { deleteJobById } from "@/services/job";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { JobItem } from "@/types/job";

export default function CardLowonganPekerjaanAdmin(props: JobItem) {
  const { job_id, job_slug, user_img, user_fullname, job_img, job_name, job_created_at, job_views } = props;

  const relativeDate = getRelativeTimeRaw(job_created_at);
  const fullDate = getFullTimeRaw(job_created_at);

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
              <DropdownItem href={`/lowongan-pekerjaan/${job_slug}`} key="lihat" classNames={{ base: "!w-fit" }}>
                <Tooltip content="Lihat detail" placement="right-end" className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-none">
                  <Button isIconOnly variant="light" size="sm" typeof="link" href={`/lowongan/${job_slug}`}>
                    <Eye size={20} color="currentColor" variant="Bold" className="text-yellow-500" />
                  </Button>
                </Tooltip>
              </DropdownItem>

              <DropdownItem href={`/lowongan-pekerjaan/edit/${job_slug}`} key="edit" classNames={{ base: "!w-fit" }}>
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
                        const result = await deleteJobById(job_id);
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

        {/* Image Lowongan */}
        <Image src={job_img} alt={job_img} width={1280} height={720} className="w-full !h-48 aspect-video rounded-md object-contain" />

        {/* Nama Job */}
        <span className="text-text-primary text-xs font-bold">{job_name}</span>

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
              content={job_views.toLocaleString("id-ID")}
              placement="top"
              classNames={{
                content: "text-xs text-background-primary bg-primary-primary",
              }}
            >
              <div className="flex items-center gap-1">
                <Eye size="20" color="currentColor" variant="Bold" className="text-primary-primary" />
                <span className="text-xs text-text-secondary">{formatViews(job_views)} kali dilihat</span>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

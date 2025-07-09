import React from "react";

// Iconsax
import { More, Calendar, Eye, Trash, Edit, Clock } from "iconsax-react";

// Components
import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip, Chip } from "@heroui/react";

import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { CounselingItem } from "@/types/counseling";

// Services
import { deleteCounselingById } from "@/services/counseling";

// Utils
import { getRelativeTimeRaw, getFullTimeRaw } from "@/utils/time";
import { parseAbsoluteToLocal, ZonedDateTime } from "@internationalized/date";

export default function CardCounseling(props: CounselingItem) {
  const { counseling_id, user_img, user_fullname, user_phone, user_nim, program_study_name, counseling_date, counseling_is_read, status_id, counseling_created_at } = props;
  const relativeDate = getRelativeTimeRaw(counseling_created_at);
  const fullDate = getFullTimeRaw(counseling_created_at);

  const localDate = parseAbsoluteToLocal(counseling_date);
  const parsed_counseling_date = `${localDate.year}-${String(localDate.month).padStart(2, "0")}-${String(localDate.day).padStart(2, "0")}T${String(localDate.hour).padStart(2, "0")}:${String(localDate.minute).padStart(2, "0")}:${String(
    localDate.second
  ).padStart(2, "0")}.${String(localDate.millisecond).padStart(3, "0")}Z`;

  return (
    <>
      <div className="relative w-full flex flex-col gap-4 p-4 mb-8 border border-default-200 rounded-medium hover:bg-default-200">
        {/* User & More */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-text-secondary">
            <Avatar src={user_img} size="sm" />
            <div className="flex flex-col">
              {" "}
              <span className="text-xs text-text-primary">{user_fullname}</span>
              <div>
                <span className="text-xs text-text-secondary">{user_phone}</span> | <span className="text-xs text-text-secondary">{user_nim}</span>
              </div>
              <span className="text-xs text-text-secondary">{program_study_name}</span>
            </div>
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
              <DropdownItem href={`/konseling/${counseling_id}`} key="lihat" classNames={{ base: "!w-fit" }}>
                <Tooltip content="Lihat detail" placement="right-end" className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-none">
                  <Button isIconOnly variant="light" size="sm">
                    <Eye size={20} color="currentColor" variant="Bold" className="text-yellow-500" />
                  </Button>
                </Tooltip>
              </DropdownItem>

              <DropdownItem href={`/konseling/edit/${counseling_id}`} key="edit" classNames={{ base: "!w-fit" }}>
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
                        const result = await deleteCounselingById(counseling_id);
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

        {/* Tanggal */}
        <div className="flex flex-col items-start gap-1 text-xs text-text-secondary">
          <div className="flex items-center gap-1">
            {" "}
            <Calendar size={20} color="currentColor" variant="Bulk" className="text-primary-primary" />
            <Tooltip
              content={getRelativeTimeRaw(parsed_counseling_date)}
              placement="top"
              classNames={{
                content: "text-xs text-background-primary bg-primary-primary",
              }}
            >
              <span className="text-xs text-text-secondary cursor-help">{getFullTimeRaw(parsed_counseling_date)}</span>
            </Tooltip>
          </div>
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
        </div>

        <div className="flex items-center gap-1 absolute -top-2 right-0">
          {Number(counseling_is_read) === 0 ? (
            <Chip className="text-xs font-medium px-3 py-0.5 rounded-full bg-primary-primary text-white" variant="flat" size="sm">
              Belum Dibaca
            </Chip>
          ) : null}
          {status_id !== 1 ? (
            <Chip className="text-xs font-medium px-3 py-0.5 rounded-full bg-primary-primary text-white" variant="flat" size="sm">
              Menunggu
            </Chip>
          ) : null}
        </div>
      </div>
    </>
  );
}

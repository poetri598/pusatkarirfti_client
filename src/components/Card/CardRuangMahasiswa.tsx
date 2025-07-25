import React from "react";

// Iconsax
import { More, Eye, Trash, Edit, Clock } from "iconsax-react";

// Components
import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Image, Tooltip } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw } from "@/utils/time";

import { deleteStudentRoomById } from "@/services/studentRoom";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { StudentRoomItem } from "@/types/studentRoom";

export default function page(props: StudentRoomItem) {
  const { student_room_id, student_room_img, user_img, user_fullname, student_room_updated_at } = props;
  const relativeDate = getRelativeTimeRaw(student_room_updated_at);
  const fullDate = getFullTimeRaw(student_room_updated_at);

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
              <DropdownItem href={`/ruang-mahasiswa/${student_room_id}`} key="lihat" classNames={{ base: "!w-fit" }}>
                <Tooltip content="Lihat detail" placement="right-end" className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-none">
                  <Button isIconOnly variant="light" size="sm">
                    <Eye size={20} color="currentColor" variant="Bold" className="text-yellow-500" />
                  </Button>
                </Tooltip>
              </DropdownItem>

              <DropdownItem href={`/ruang-mahasiswa/edit/${student_room_id}`} key="edit" classNames={{ base: "!w-fit" }}>
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
                        const result = await deleteStudentRoomById(student_room_id);
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
        <Image src={student_room_img} alt={student_room_img} width={1280} height={720} className="w-full !h-48 aspect-video rounded-md object-contain" />

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
      </div>
    </>
  );
}

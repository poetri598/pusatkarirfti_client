import React from "react";

// Iconsax
import { More, Eye, Trash, Edit, Clock } from "iconsax-react";

// Components
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@heroui/react";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Types
import { EducationItem } from "@/types/education";

// Services
import { deleteEducationById } from "@/services/education";

// Utils
import { getRelativeTimeRaw, getFullTimeRaw } from "@/utils/time";

export default function page(props: EducationItem) {
  const { education_id, education_name, education_created_at } = props;
  const relativeDate = getRelativeTimeRaw(education_created_at);
  const fullDate = getFullTimeRaw(education_created_at);

  return (
    <>
      <div className="w-full flex flex-col gap-4 p-4 mb-8 border border-default-200 rounded-medium hover:bg-default-200 overflow-hidden">
        <div className="flex items-center justify-end gap-2 w-full">
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
              <DropdownItem href={`/pendidikan/${education_id}`} key="lihat" classNames={{ base: "!w-fit" }}>
                <Tooltip content="Lihat detail" placement="right-end" className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-none">
                  <Button isIconOnly variant="light" size="sm">
                    <Eye size={20} color="currentColor" variant="Bold" className="text-yellow-500" />
                  </Button>
                </Tooltip>
              </DropdownItem>

              <DropdownItem href={`/pendidikan/edit/${education_id}`} key="edit" classNames={{ base: "!w-fit" }}>
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
                        const result = await deleteEducationById(education_id);
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

        <span className="text-xl font-bold">{education_name}</span>
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
    </>
  );
}

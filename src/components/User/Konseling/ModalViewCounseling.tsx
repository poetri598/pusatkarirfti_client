"use client";

// Components
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem, Selection, DatePicker, Button, Textarea, Chip } from "@heroui/react";
import { useEffect, useState } from "react";

// Types
import { CounselingTypeItem } from "@/types/counselingType";
import { StatusItem } from "@/types/status";
import { CounselingItem } from "@/types/counseling";

// Services
import { getCounselingTypeAll } from "@/services/counselingType";
import { getStatusAll } from "@/services/status";

// Utils
import { ZonedDateTime, parseAbsoluteToLocal } from "@internationalized/date";
import { createServiceFetcher } from "@/utils/createServiceFetcher";

interface ModalViewCounselingProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedItem: CounselingItem | null;
}

export default function ModalViewCounseling({ isOpen, onOpenChange, selectedItem }: ModalViewCounselingProps) {
  // counseling types
  const [counselingTypes, setCounselingTypes] = useState<CounselingTypeItem[]>([]);
  const [counseling_type_id, setCounselingTypeId] = useState<Selection>(new Set([]));
  const [isLoadingCounselingTypes, setIsLoadingCounselingTypes] = useState(true);
  const [apiErrorCounselingTypes, setApiErrorCounselingTypes] = useState<string | null>(null);
  // statuses
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [status_id, setStatusId] = useState<number>(0);
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);
  const [apiErrorStatuses, setApiErrorStatuses] = useState<string | null>(null);

  const [counseling_date, setCounselingDate] = useState<ZonedDateTime | null>(null);
  const [counseling_desc, setCounselingDesc] = useState("");
  const [counseling_is_read, setCounselingIsRead] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getCounselingTypeAll, setCounselingTypes, setApiErrorCounselingTypes, setIsLoadingCounselingTypes), createServiceFetcher(getStatusAll, setStatuses, setApiErrorStatuses, setIsLoadingStatuses)];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setCounselingDesc(selectedItem.counseling_desc);
      if (selectedItem.counseling_date) setCounselingDate(parseAbsoluteToLocal(selectedItem.counseling_date));
      setCounselingTypeId(new Set([String(selectedItem.counseling_type_id)]));
      setCounselingIsRead(Boolean(selectedItem.counseling_is_read));
      setStatusId(selectedItem.status_id);
    }
  }, [selectedItem]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="md">
      <ModalContent>
        <ModalHeader className="text-lg text-primary-primary font-bold">Detail Konseling</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          {isLoadingCounselingTypes ? (
            <p className="text-xs text-center py-4">Memuat data...</p>
          ) : apiErrorCounselingTypes ? (
            <p className="text-danger-primary text-xs">{apiErrorCounselingTypes}</p>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Jenis Konseling */}
              <Select
                label="Jenis Konseling"
                variant="bordered"
                name="counseling_type_id"
                selectedKeys={counseling_type_id}
                onSelectionChange={setCounselingTypeId}
                isDisabled
                classNames={{
                  label: "text-xs",
                  trigger: "text-xs",
                  value: "text-xs",
                }}
              >
                {counselingTypes.map((item) => (
                  <SelectItem key={item.counseling_type_id}>{item.counseling_type_name}</SelectItem>
                ))}
              </Select>
            </div>
          )}
          {/* Jadwal Konseling */}
          <DatePicker
            isReadOnly
            label="Jadwal Konseling"
            hideTimeZone
            name="counseling_date"
            value={counseling_date}
            showMonthAndYearPickers
            variant="bordered"
            classNames={{
              label: "after:text-danger-primary text-xs",
              selectorIcon: "text-primary-primary",
              inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary focus:!border-primary-primary",
              errorMessage: "text-danger-primary",
              calendarContent: "bg-primary-primary text-xs text-white",
              segment: "text-xs ",
            }}
          />
          {/* Counseling Desc */}
          <Textarea
            readOnly
            isRequired
            label="Beri tahu kami secara singkat mengenai konseling anda"
            labelPlacement="outside"
            name="counseling_desc"
            value={counseling_desc}
            onValueChange={setCounselingDesc}
            type="text"
            variant="bordered"
            classNames={{
              label: "after:text-danger-primary text-xs text-text-secondary",
              input: "focus:!border-primary-primary text-xs ",
              inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
              errorMessage: "text-danger-primary text-xs",
            }}
          />
          <div className="flex flex-row gap-2">
            {" "}
            {counseling_is_read === false ? (
              <Chip className="text-xs font-medium px-3 py-0.5 rounded-full bg-default-200 text-text-primary" variant="flat" size="sm">
                Belum Dibaca
              </Chip>
            ) : (
              <Chip className="text-xs font-medium px-3 py-0.5 rounded-full bg-primary-primary text-white" variant="flat" size="sm">
                Dibaca
              </Chip>
            )}
            {status_id === 2 ? (
              <Chip className="text-xs font-medium px-3 py-0.5 rounded-full bg-default-200 text-text-primary" variant="flat" size="sm">
                Menunggu Persetujuan
              </Chip>
            ) : (
              status_id === 1 && (
                <Chip className="text-xs font-medium px-3 py-0.5 rounded-full bg-primary-primary text-white" variant="flat" size="sm">
                  Disetujui
                </Chip>
              )
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="login" onPress={onOpenChange}>
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

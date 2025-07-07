"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem, DatePicker, Button } from "@heroui/react";
import { ZonedDateTime, parseAbsoluteToLocal } from "@internationalized/date";
import { useEffect, useState } from "react";
import { CounselingTypeItem } from "@/types/counselingType";
import { createFetcher } from "@/utils/createFetcher";

interface ModalViewCounselingProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedItem: {
    counseling_id: number;
    counseling_type_id: number;
    counseling_type_name: string;
    counseling_date: string;
  } | null;
}

export default function ModalViewCounseling({ isOpen, onOpenChange, selectedItem }: ModalViewCounselingProps) {
  const [counselingTypes, setCounselingTypes] = useState<CounselingTypeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const [counseling_type_id, setCounselingTypeId] = useState<string>("");
  const [counseling_date, setCounselingDate] = useState<ZonedDateTime | null>(null);

  useEffect(() => {
    const fetchTypes = createFetcher<CounselingTypeItem>("/counseling-types", setCounselingTypes, setApiError, setIsLoading);
    fetchTypes();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setCounselingTypeId(String(selectedItem.counseling_type_id));
      setCounselingDate(parseAbsoluteToLocal(selectedItem.counseling_date));
    }
  }, [selectedItem]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="md">
      <ModalContent>
        <ModalHeader className="text-lg text-primary-primary font-bold">Detail Konseling</ModalHeader>
        <ModalBody>
          {isLoading ? (
            <p className="text-xs text-center py-4">Memuat data...</p>
          ) : apiError ? (
            <p className="text-danger-primary text-xs">{apiError}</p>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Jenis Konseling */}
              <Select
                label="Jenis Konseling"
                variant="bordered"
                selectedKeys={new Set([counseling_type_id])}
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

              {/* Jadwal Konseling */}
              <DatePicker
                label="Jadwal Konseling"
                hideTimeZone
                name="counseling_date"
                value={counseling_date}
                isDisabled
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
            </div>
          )}
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

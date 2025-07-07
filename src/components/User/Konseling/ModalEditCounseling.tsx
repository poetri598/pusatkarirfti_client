"use client";

import { useEffect, useState, FormEvent } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem, DatePicker, Button, Spinner, Selection, Form } from "@heroui/react";
import { ZonedDateTime, parseAbsoluteToLocal } from "@internationalized/date";

import { CounselingTypeItem } from "@/types/counselingType";
import { createFetcher } from "@/utils/createFetcher";
import { showConfirmationDialog, showErrorDialog, showSuccessDialog } from "@/components/Custom/AlertButton";
import { updateCounselingById } from "@/services/counseling";

interface ModalEditCounselingProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedItem: {
    counseling_id: number;
    counseling_type_id: number;
    counseling_type_name: string;
    counseling_date: string;
  } | null;
}

export default function ModalEditCounseling({ isOpen, onOpenChange, selectedItem }: ModalEditCounselingProps) {
  // API state
  const [counselingTypes, setCounselingTypes] = useState<CounselingTypeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Form state
  const [counselingType, setCounselingType] = useState<Selection>(new Set([]));
  const [counselingDate, setCounselingDate] = useState<ZonedDateTime | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchTypes = createFetcher<CounselingTypeItem[]>("/counseling-types", setCounselingTypes, setApiError, setIsLoading);
    fetchTypes();
  }, []);

  // Set default values
  useEffect(() => {
    if (selectedItem) {
      setCounselingType(new Set([String(selectedItem.counseling_type_id)]));
      setCounselingDate(parseAbsoluteToLocal(selectedItem.counseling_date));
    }
  }, [selectedItem]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedItem || !counselingDate || !(counselingType instanceof Set) || counselingType.size === 0) {
      await showErrorDialog("Harap lengkapi semua data terlebih dahulu.");
      return;
    }

    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;

    const formData = new FormData();
    formData.append("counseling_type_id", String([...counselingType][0]));
    formData.append("counseling_date", counselingDate.toAbsoluteString());

    setIsSubmitting(true);
    const result = await updateCounselingById(selectedItem.counseling_id, formData);
    setIsSubmitting(false);

    if (result.success) {
      await showSuccessDialog();
      onOpenChange();
      window.location.reload();
    } else {
      await showErrorDialog(result.error || "Gagal memperbarui data.");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="md" classNames={{ body: "w-full", footer: "w-full" }}>
      <ModalContent>
        {(onClose) => (
          <Form onSubmit={handleSubmit}>
            <ModalHeader className="text-lg text-primary-primary font-bold">Edit Data Konseling</ModalHeader>
            <ModalBody>
              {isLoading ? (
                <div className="w-full flex justify-center items-center py-8">
                  <Spinner label="Memuat..." labelColor="primary" variant="dots" />
                </div>
              ) : apiError ? (
                <p className="text-danger-primary text-xs">{apiError}</p>
              ) : (
                <div className="flex flex-col gap-4 ">
                  {/* Jenis Konseling */}
                  <Select
                    label="Pilih jenis konseling"
                    isRequired
                    selectedKeys={counselingType}
                    onSelectionChange={setCounselingType}
                    variant="bordered"
                    classNames={{
                      label: "after:text-danger-primary text-xs text-text-secondary",
                      trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary",
                      value: "text-xs",
                    }}
                  >
                    {counselingTypes.length === 0 ? (
                      <SelectItem key="nodata" isDisabled>
                        Data belum tersedia
                      </SelectItem>
                    ) : (
                      counselingTypes.map((item) => (
                        <SelectItem
                          key={item.counseling_type_id}
                          classNames={{
                            title: "text-xs hover:!text-primary-primary",
                            selectedIcon: "text-primary-primary",
                          }}
                        >
                          {item.counseling_type_name}
                        </SelectItem>
                      ))
                    )}
                  </Select>

                  {/* Tanggal Konseling */}
                  <DatePicker
                    label="Pilih jadwal konseling"
                    hideTimeZone
                    name="counseling_date"
                    value={counselingDate}
                    onChange={setCounselingDate}
                    isRequired
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
              <Button variant="light" onPress={onOpenChange}>
                Batal
              </Button>
              <Button type="submit" className="login" isLoading={isSubmitting}>
                Simpan
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  );
}

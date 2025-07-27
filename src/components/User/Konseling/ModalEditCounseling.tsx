"use client";

// Components
import { useEffect, useState, FormEvent } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem, DatePicker, Button, Spinner, Selection, Form, Textarea } from "@heroui/react";
import { showConfirmationDialog, showErrorDialog, showSuccessDialog } from "@/components/Custom/AlertButton";

// Types
import { CounselingTypeItem } from "@/types/counselingType";
import { StatusItem } from "@/types/status";
import { CounselingItem } from "@/types/counseling";

// Services
import { getCounselingTypeAll } from "@/services/counselingType";
import { getStatusAll } from "@/services/status";
import { updateCounselingById } from "@/services/counseling";

// Utils
import { ZonedDateTime, parseAbsoluteToLocal } from "@internationalized/date";
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { appendSingle } from "@/utils/formDataHelpers";
import { formatZonedDateTime } from "@/utils/time";

interface ModalEditCounselingProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedItem: CounselingItem | null;
}

export default function ModalEditCounseling({ isOpen, onOpenChange, selectedItem }: ModalEditCounselingProps) {
  // Counseling types
  const [counselingTypes, setCounselingTypes] = useState<CounselingTypeItem[]>([]);
  const [counseling_type_id, setCounselingTypeId] = useState<Selection>(new Set([]));
  const [isLoadingCounselingTypes, setIsLoadingCounselingTypes] = useState(true);
  const [apiErrorCounselingTypes, setApiErrorCounselingTypes] = useState<string | null>(null);
  // Statuses
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [status_id, setStatusId] = useState<Selection>(new Set([]));
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);
  const [apiErrorStatuses, setApiErrorStatuses] = useState<string | null>(null);

  const [counseling_date, setCounselingDate] = useState<ZonedDateTime | null>(null);
  const [counseling_desc, setCounselingDesc] = useState("");
  const [counseling_is_read, setCounselingIsRead] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getCounselingTypeAll, setCounselingTypes, setApiErrorCounselingTypes, setIsLoadingCounselingTypes), createServiceFetcher(getStatusAll, setStatuses, setApiErrorStatuses, setIsLoadingStatuses)];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      if (selectedItem.counseling_date) setCounselingDate(parseAbsoluteToLocal(selectedItem.counseling_date));
      setCounselingDesc(selectedItem.counseling_desc);
      setCounselingIsRead(selectedItem.counseling_is_read);
      setCounselingTypeId(new Set([String(selectedItem.counseling_type_id)]));
      setStatusId(new Set([String(selectedItem.status_id)]));
    }
  }, [selectedItem]);

  const handleSubmitModal = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setLoading(true);
    const formData = new FormData();
    if (counseling_date) formData.append("counseling_date", formatZonedDateTime(counseling_date));
    formData.append("counseling_desc", counseling_desc);
    formData.append("counseling_is_read", String(Number(counseling_is_read)));
    appendSingle(formData, "counseling_type_id", counseling_type_id);
    appendSingle(formData, "status_id", status_id);
    const result = await updateCounselingById(selectedItem.counseling_id, formData);
    if (result.success) {
      await showSuccessDialog();
      onOpenChange();
      window.location.reload();
    } else {
      await showErrorDialog(result.error || "Gagal memperbarui data.");
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="md" classNames={{ body: "w-full", footer: "w-full" }}>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <Spinner
            label="Loading..."
            variant="wave"
            classNames={{
              label: "text-primary-primary mt-4",
              dots: "border-5 border-primary-primary",
            }}
          />
        </div>
      )}
      <ModalContent>
        {(onClose) => (
          <Form onSubmit={handleSubmitModal}>
            <ModalHeader className="text-lg text-primary-primary font-bold">Edit Data Konseling</ModalHeader>
            <ModalBody>
              {isLoadingCounselingTypes ? (
                <div className="w-full flex justify-center items-center py-8">
                  <Spinner label="Memuat..." labelColor="primary" variant="dots" />
                </div>
              ) : apiErrorCounselingTypes ? (
                <p className="text-danger-primary text-xs">{apiErrorCounselingTypes}</p>
              ) : (
                <div className="flex flex-col gap-4 ">
                  {/* Jenis Konseling */}
                  <Select
                    isDisabled={[...status_id][0] === "1"}
                    label="Pilih jenis konseling"
                    isRequired
                    selectedKeys={counseling_type_id}
                    onSelectionChange={setCounselingTypeId}
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
                </div>
              )}

              {/* Tanggal Konseling */}
              <DatePicker
                isReadOnly={[...status_id][0] === "1"}
                label="Pilih jadwal konseling"
                hideTimeZone
                name="counseling_date"
                value={counseling_date}
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

              {/* Counseling Desc */}
              <Textarea
                isReadOnly={[...status_id][0] === "1"}
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
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onOpenChange}>
                Batal
              </Button>
              <Button type="submit" className="login :disabled" disabled={[...status_id][0] === "1"}>
                Simpan Perubahan
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  );
}

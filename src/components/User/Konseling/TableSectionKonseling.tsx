"use client";

import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button, Spinner, Tooltip, useDisclosure, getKeyValue } from "@heroui/react";
import { Eye, Edit, Trash } from "iconsax-react";

import { showConfirmationDialog, showErrorDialog, showSuccessDialog } from "@/components/Custom/AlertButton";
import { getCounselingsByUserId, deleteCounselingById } from "@/services/counseling";
import { CounselingItem } from "@/types/counseling";
import { useAuth } from "@/context/AuthContext";
import { getFullTimeRaw } from "@/utils/time";
import { parseAbsoluteToLocal } from "@internationalized/date";
import ModalEditCounseling from "@/components/User/Konseling/ModalEditCounseling";
import ModalViewCounseling from "@/components/User/Konseling/ModalViewCounseling";

const columns = [
  { key: "no", label: "#" },
  { key: "date", label: "Jadwal Konseling" },
  { key: "type", label: "Jenis Konseling" },
  { key: "is_read", label: "Status Terbaca" },
  { key: "status", label: "Status Diterima" },
  { key: "actions", label: "Aksi" },
];

export default function CounselingTable() {
  const { user } = useAuth();
  const [data, setData] = useState<CounselingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CounselingItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.user_id) return;
      setLoading(true);
      const { success, data, error } = await getCounselingsByUserId(user.user_id);
      if (success) {
        setData(data ?? []);
      } else {
        setError(error || "Unable to fetch data");
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const tableItems = data.map((item, index) => {
    return {
      key: item.counseling_id,
      no: index + 1,
      date: getFullTimeRaw(item.counseling_date),
      type: item.counseling_type_name,
      is_read: item.counseling_is_read ? (
        <Chip className="text-xs font-medium px-3 py-0.5 rounded-full bg-primary-primary text-white" variant="flat" size="sm">
          Dibaca
        </Chip>
      ) : (
        <Chip className="text-xs font-medium px-3 py-0.5 rounded-full bg-default-200 text-text-primary" variant="flat" size="sm">
          Belum Dibaca
        </Chip>
      ),
      status:
        item.status_id === 1 ? (
          <Chip className="text-xs font-medium px-3 py-0.5 rounded-full bg-primary-primary text-white" variant="flat" size="sm">
            Diterima
          </Chip>
        ) : (
          <Chip className="text-xs font-medium px-3 py-0.5 rounded-full bg-default-200 text-text-primary" variant="flat" size="sm">
            Menunggu
          </Chip>
        ),
      actions: item,
    };
  });

  const handleEdit = (item: CounselingItem) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleDelete = async (id: number) => {
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;
    setDeleteLoading(true);
    const result = await deleteCounselingById(id);
    if (result.success) {
      await showSuccessDialog();
      window.location.reload();
    } else {
      await showErrorDialog(result.error || "Gagal menghapus data konseling.");
    }
    setDeleteLoading(false);
  };

  if (!user?.user_id) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <p className="text-xs text-text-secondary">Silakan login terlebih dahulu untuk melihat data konseling anda.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <Spinner
          label="Sedang memuat data..."
          labelColor="primary"
          variant="dots"
          classNames={{
            label: "text-primary-primary mt-4",
            dots: "border-5 border-primary-primary",
          }}
        />
      </div>
    );
  }

  if (deleteLoading) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <Spinner
          label="Sedang memuat data..."
          labelColor="primary"
          variant="dots"
          classNames={{
            label: "text-primary-primary mt-4",
            dots: "border-5 border-primary-primary",
          }}
        />
      </div>
    );
  }

  if (error) {
    return <p className="text-danger-primary text-sm text-center">{error}</p>;
  }

  return (
    <>
      {deleteLoading && (
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
      <Table
        isHeaderSticky
        aria-label="Tabel Konseling"
        classNames={{
          base: "xs:w-fit xl:w-full",
          table: "min-w-[640px] text-xs",
          wrapper: "overflow-x-auto rounded-lg border border-default-200",
          th: "bg-gray-100 text-gray-700 uppercase whitespace-nowrap text-center",
          td: "whitespace-nowrap text-xs",
        }}
      >
        <TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>

        <TableBody items={tableItems} emptyContent={<span className="text-xs text-text-secondary">Anda belum melakukan konseling</span>}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => {
                if (columnKey === "actions") {
                  const counseling = item.actions;
                  return (
                    <TableCell>
                      <div className="flex justify-center items-center gap-2">
                        <Tooltip content="Lihat detail" placement="top" className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            onPress={() => {
                              setSelectedItem(counseling);
                              setIsViewOpen(true);
                            }}
                          >
                            <Eye size={20} className="text-yellow-500" variant="Bold" color="currentColor" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Edit data" placement="top" className="bg-primary-primary text-white text-xs px-2 py-1 rounded">
                          <Button isIconOnly variant="light" size="sm" onPress={() => handleEdit(counseling)}>
                            <Edit size={20} className="text-primary-primary" variant="Bold" color="currentColor" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Hapus data" placement="top" className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                          <Button isIconOnly variant="light" size="sm" onPress={() => handleDelete(counseling.counseling_id)}>
                            <Trash size={20} className="text-danger-primary" variant="Bold" color="currentColor" />
                          </Button>
                        </Tooltip>
                      </div>
                    </TableCell>
                  );
                }

                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ModalViewCounseling isOpen={isViewOpen} onOpenChange={() => setIsViewOpen(false)} selectedItem={selectedItem} />
      <ModalEditCounseling isOpen={isOpen} onOpenChange={onOpenChange} selectedItem={selectedItem} />
    </>
  );
}

import React, { useState, useEffect } from "react";

// Components
import { Form, Avatar, Input, Select, SelectItem, Spinner, DatePicker, Link, Button } from "@heroui/react";
import { showSuccessDialog, showErrorDialog, showConfirmationDialog } from "@/components/Custom/AlertButton";

// Context
import { useAuth } from "@/context/AuthContext";

// Types
import { CompanyItem } from "@/types/company";
import { UserAchievementItem } from "@/types/userAchievement";
interface UserAchievementInput {
  user_achievement_name: string;
  user_achievement_date: string;
  company_id: number;
}

// Services
import { getCompanyAll } from "@/services/company";
import { getUserAchievementsByUsername, deleteUserAchievementsByUsername } from "@/services/userAchievement";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { CalendarDate } from "@internationalized/date";

function parseISOStringToCalendarDate(isoString: string | null): CalendarDate | null {
  if (!isoString) return null;
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return null;
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export default function Page() {
  const { user } = useAuth();

  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [apiErrorCompanies, setApiErrorCompanies] = useState<string | null>(null);

  const [achievements, setAchievements] = useState<UserAchievementInput[]>([]);
  const [isLoadingAchievements, setIsLoadingAchievements] = useState(true);
  const [apiErrorAchievements, setApiErrorAchievements] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getCompanyAll, setCompanies, setApiErrorCompanies, setIsLoadingCompanies)];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!user?.user_name) return;
      setIsLoadingAchievements(true);
      const { success, data, error } = await getUserAchievementsByUsername(user.user_name);

      if (success && data) {
        const mapped = data.map((achie: UserAchievementItem) => ({
          user_achievement_name: achie.user_achievement_name,
          user_achievement_date: achie.user_achievement_date,
          company_id: achie.company_id,
        }));

        setAchievements(
          mapped.length > 0
            ? mapped
            : [
                {
                  user_achievement_name: "",
                  user_achievement_date: "",
                  company_id: 0,
                },
              ]
        );
      } else {
        setApiErrorAchievements(error || "Gagal mengambil data");
      }

      setIsLoadingAchievements(false);
    };

    fetchAchievements();
  }, [user?.user_name]);

  const handleChange = <K extends keyof UserAchievementInput>(expIndex: number, key: K, value: UserAchievementInput[K]) => {
    const updated = [...achievements];
    updated[expIndex][key] = value;
    setAchievements(updated);
  };

  if (isLoadingAchievements) {
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

  if (apiErrorAchievements) {
    return <p className="text-center text-danger-primary">{apiErrorAchievements}</p>;
  }

  return (
    <Form className="w-full flex flex-col gap-4">
      <div className="w-full justify-end flex xs:flex-col md:flex-row gap-2">
        <Button
          className="delete"
          onPress={async () => {
            const confirm = await showConfirmationDialog();
            if (!confirm.isConfirmed) return null;
            const result = await deleteUserAchievementsByUsername(user?.user_name || "");
            if (result.success) {
              await showSuccessDialog();
              window.location.reload();
            } else {
              await showErrorDialog(result.error);
            }
          }}
        >
          Hapus Penghargaan
        </Button>
        <Link className="login" href={`/buat-cv/ubah-penghargaan/${user?.user_name}`}>
          Ubah Penghargaan
        </Link>
      </div>
      {achievements.map((achie, i) => (
        <div key={i} className="relative w-full border border-default-200 rounded-medium p-4 flex flex-col gap-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <Input
                isReadOnly
                label="Masukkan nama penghargaan"
                labelPlacement="outside"
                name="user_achievement_name"
                value={achie.user_achievement_name}
                onValueChange={(val) => handleChange(i, "user_achievement_name", val)}
                type="text"
                variant="bordered"
                classNames={{
                  label: "after:text-danger-primary text-xs text-text-secondary",
                  input: "focus:!border-primary-primary text-xs",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                  errorMessage: "text-danger-primary text-xs",
                }}
              />

              {/* company_id */}
              {isLoadingCompanies ? (
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
              ) : apiErrorCompanies ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorCompanies}</p>
              ) : companies.length === 0 ? (
                <p className="text-start text-xs text-text-secondary">Data belum tersedia</p>
              ) : (
                <Select
                  isDisabled
                  isMultiline={true}
                  items={companies}
                  label="Pilih perusahaan/instansi penerbit"
                  placeholder="Pilih perusahaan/instansi penerbit"
                  labelPlacement="outside"
                  variant="bordered"
                  name="company_id"
                  renderValue={(items) => (
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <div key={item.data?.company_id} className="flex items-center gap-2">
                          <Avatar alt={item.data?.company_name} className="w-6 h-6" src={item.data?.company_img} classNames={{ img: "object-contain bg-background-primary" }} />
                          <span className="text-xs">{item.data?.company_name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  selectedKeys={achie.company_id && companies.some((c) => c.company_id === achie.company_id) ? new Set([String(achie.company_id)]) : new Set()}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0];
                    handleChange(i, "company_id", Number(selectedKey));
                  }}
                  classNames={{
                    label: "after:text-danger-primary text-xs",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary",
                  }}
                >
                  {(company) => (
                    <SelectItem
                      key={company.company_id}
                      textValue={company.company_name}
                      startContent={<Avatar alt={company.company_name} className="w-6 h-6" src={company.company_img} classNames={{ img: "object-contain bg-background-primary" }} />}
                      classNames={{
                        title: "text-xs hover:!text-primary-primary",
                        selectedIcon: "text-primary-primary",
                      }}
                    >
                      {company.company_name}
                    </SelectItem>
                  )}
                </Select>
              )}

              <DatePicker
                isReadOnly
                hideTimeZone
                granularity="day"
                showMonthAndYearPickers
                label="Tanggal diterbitkan"
                name="user_achievement_date"
                labelPlacement="outside"
                variant="bordered"
                value={parseISOStringToCalendarDate(achie.user_achievement_date)}
                onChange={(val) => {
                  const dateOnly = val?.toString() ?? "";
                  handleChange(i, "user_achievement_date", dateOnly);
                }}
                classNames={{
                  label: "after:text-danger-primary text-xs",
                  selectorIcon: "text-primary-primary",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary focus:!border-primary-primary",
                  errorMessage: "text-danger-primary",
                  calendarContent: "bg-primary-primary text-xs text-white",
                  segment: "text-xs",
                }}
              />
            </div>
            <div className="w-full h-full flex flex-col justify-center gradient-style-2 items-center p-8 gap-4">
              <span className="xs:text-sm md:text-2xl text-background-primary">Contoh bagian data diri</span>
              <img src="/data-diri-img.png" alt="contoh-cv" className="w-full" />
            </div>
          </div>
        </div>
      ))}
    </Form>
  );
}

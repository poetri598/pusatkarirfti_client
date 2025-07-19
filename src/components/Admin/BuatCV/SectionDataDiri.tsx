"use client";
import React, { useEffect, useState } from "react";

// Iconsax
import { Sms } from "iconsax-react";

// Components
import { Form, Avatar, Button, Input, Select, SelectItem, Selection, Spinner, Textarea, Link } from "@heroui/react";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

// Context
import { useAuth } from "@/context/AuthContext";

// Types
import { CityItem } from "@/types/city";
import { ProvinceItem } from "@/types/province";
import { CountryItem } from "@/types/country";
import { PlatformItem } from "@/types/platform";

// Services
import { getCityAll } from "@/services/city";
import { getProvinceAll } from "@/services/province";
import { getCountryAll } from "@/services/country";
import { getPlatformAll } from "@/services/platform";
import { getUserByUsername } from "@/services/user";
import { getUserPlatformsByUsername, deleteUserPlatformsByUsername } from "@/services/userPlatform";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function Page() {
  const { user } = useAuth();

  // City
  const [cities, setCities] = useState<CityItem[]>([]);
  const [city_id, setCityId] = useState<Selection>(new Set([]));
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [apiErrorCities, setApiErrorCities] = useState<string | null>(null);
  // Province
  const [provinces, setProvinces] = useState<ProvinceItem[]>([]);
  const [province_id, setProvinceId] = useState<Selection>(new Set([]));
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
  const [apiErrorProvinces, setApiErrorProvinces] = useState<string | null>(null);
  // Country
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [country_id, setCountryId] = useState<Selection>(new Set([]));
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [apiErrorCountries, setApiErrorCountries] = useState<string | null>(null);
  // Platform
  const [platforms, setPlatforms] = useState<PlatformItem[]>([]);
  const [platform_id, setPlatformId] = useState<Selection>(new Set([]));
  const [isLoadingPlatforms, setIsLoadingPlatforms] = useState(true);
  const [apiErrorPlatforms, setApiErrorPlatforms] = useState<string | null>(null);

  const [user_id, setUserid] = useState(0);
  const [user_fullname, setUserFullname] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [user_phone, setUserPhone] = useState("");
  const [user_desc, setUserDesc] = useState("");
  const [user_platform_name, setUserPlatformName] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      const fetchers = [
        createServiceFetcher(getCityAll, setCities, setApiErrorCities, setIsLoadingCities),
        createServiceFetcher(getProvinceAll, setProvinces, setApiErrorProvinces, setIsLoadingProvinces),
        createServiceFetcher(getCountryAll, setCountries, setApiErrorCountries, setIsLoadingCountries),
        createServiceFetcher(getPlatformAll, setPlatforms, setApiErrorPlatforms, setIsLoadingPlatforms),
      ];
      await Promise.all(fetchers.map((fetch) => fetch()));

      // Get user data
      const { success, data, error } = await getUserByUsername(user?.user_name || "");
      if (!success || !data) {
        await showErrorDialog(error || "Gagal mengambil data");
        setLoading(false);
        return;
      }

      setUserid(data.user_id);
      setUserFullname(data.user_fullname);
      setUserEmail(data.user_email);
      setUserPhone(data.user_phone);
      setUserDesc(data.user_desc);
      setCityId(new Set([String(data.city_id)]));
      setProvinceId(new Set([String(data.province_id)]));
      setCountryId(new Set([String(data.country_id)]));

      // Get user platform data
      const resPlatform = await getUserPlatformsByUsername(user?.user_name || "");
      if (resPlatform.success && Array.isArray(resPlatform.data)) {
        const ids = new Set<string>();
        const names: Record<string, string> = {};
        for (const item of resPlatform.data) {
          ids.add(String(item.platform_id));
          names[item.platform_id] = item.user_platform_name;
        }
        setPlatformId(ids);
        setUserPlatformName(names);
      }

      setLoading(false);
    };

    fetchAll();
  }, []);

  return (
    <>
      <>
        <Form className="w-full flex flex-col gap-4">
          <div className="w-full justify-end flex xs:flex-col md:flex-row gap-2">
            <Button
              className="delete"
              onPress={async () => {
                const confirm = await showConfirmationDialog();
                if (!confirm.isConfirmed) return null;
                const result = await deleteUserPlatformsByUsername(user?.user_name || "");
                if (result.success) {
                  await showSuccessDialog();
                  window.location.reload();
                } else {
                  await showErrorDialog(result.error);
                }
              }}
            >
              Hapus Media Sosial
            </Button>
            <Link className="login" href={`/buat-cv/ubah-data-diri/${user?.user_name}`}>
              Ubah Data Diri
            </Link>
          </div>
          <div className="relative w-full border border-default-200 rounded-medium p-4 flex flex-col gap-4">
            <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-4">
                {/* Nama Lengkap  */}
                <Input
                  isReadOnly
                  label="Masukkan nama lengkap anda"
                  labelPlacement="outside"
                  name="user_fullname"
                  value={user_fullname}
                  onValueChange={setUserFullname}
                  type="text"
                  variant="bordered"
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    input: "focus:!border-primary-primary text-xs ",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                />
                {/* City */}
                {isLoadingCities ? (
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
                ) : apiErrorCities ? (
                  <p className="text-start text-xs text-danger-primary">{apiErrorCities}</p>
                ) : (
                  <Select
                    isDisabled
                    label="Pilih kota tempat tinggal"
                    labelPlacement="outside"
                    variant="bordered"
                    name="city_id"
                    selectedKeys={city_id}
                    onSelectionChange={setCityId}
                    classNames={{
                      label: "after:text-danger-primary text-xs text-text-secondary",
                      trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                      value: "text-xs",
                    }}
                  >
                    {cities.length === 0 ? (
                      <SelectItem key="nodata" isDisabled>
                        Data belum tersedia
                      </SelectItem>
                    ) : (
                      cities.map((item) => (
                        <SelectItem
                          key={item.city_id}
                          classNames={{
                            title: "text-xs hover:!text-primary-primary",
                            selectedIcon: "text-primary-primary",
                          }}
                        >
                          {item.city_name}
                        </SelectItem>
                      ))
                    )}
                  </Select>
                )}

                {/* Provinsi */}
                {isLoadingProvinces ? (
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
                ) : apiErrorProvinces ? (
                  <p className="text-start text-xs text-danger-primary">{apiErrorProvinces}</p>
                ) : (
                  <Select
                    isDisabled
                    label="Pilih provinsi tempat tinggal"
                    labelPlacement="outside"
                    variant="bordered"
                    name="province_id"
                    selectedKeys={province_id}
                    onSelectionChange={setProvinceId}
                    classNames={{
                      label: "after:text-danger-primary text-xs text-text-secondary",
                      trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                      value: "text-xs",
                      errorMessage: "text-danger-primary text-xs",
                    }}
                  >
                    {provinces.length === 0 ? (
                      <SelectItem key="nodata" isDisabled>
                        Data belum tersedia
                      </SelectItem>
                    ) : (
                      provinces.map((item) => (
                        <SelectItem
                          key={item.province_id}
                          classNames={{
                            title: "text-xs hover:!text-primary-primary",
                            selectedIcon: "text-primary-primary",
                          }}
                        >
                          {item.province_name}
                        </SelectItem>
                      ))
                    )}
                  </Select>
                )}

                {/* Negara */}
                {isLoadingCountries ? (
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
                ) : apiErrorCountries ? (
                  <p className="text-start text-xs text-danger-primary">{apiErrorCountries}</p>
                ) : (
                  <Select
                    isDisabled
                    label="Pilih negara tempat tinggal"
                    labelPlacement="outside"
                    variant="bordered"
                    name="country_id"
                    selectedKeys={country_id}
                    onSelectionChange={setCountryId}
                    classNames={{
                      label: "after:text-danger-primary text-xs text-text-secondary",
                      trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                      value: "text-xs",
                      errorMessage: "text-danger-primary text-xs",
                    }}
                  >
                    {countries.length === 0 ? (
                      <SelectItem key="nodata" isDisabled>
                        Data belum tersedia
                      </SelectItem>
                    ) : (
                      countries.map((item) => (
                        <SelectItem
                          key={item.country_id}
                          classNames={{
                            title: "text-xs hover:!text-primary-primary",
                            selectedIcon: "text-primary-primary",
                          }}
                        >
                          {item.country_name}
                        </SelectItem>
                      ))
                    )}
                  </Select>
                )}

                {/* Nomor HP  */}
                <Input
                  isReadOnly
                  label="Masukkan nomor hp anda"
                  labelPlacement="outside"
                  type="text"
                  name="user_phone"
                  value={user_phone}
                  onValueChange={setUserPhone}
                  variant="bordered"
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    input: "focus:!border-primary-primary text-xs ",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                />

                {/* Email */}
                <Input
                  isReadOnly
                  startContent={<Sms size={20} variant="Bold" color="currentColor" className="text-primary-primary" />}
                  label="Masukkan email anda"
                  labelPlacement="outside"
                  value={user_email}
                  onValueChange={setUserEmail}
                  name="user_email"
                  variant="bordered"
                  type="email"
                  classNames={{
                    label: "after:text-danger-primary text-xs text-text-secondary",
                    input: "focus:!border-primary-primary text-xs ",
                    inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                    errorMessage: "text-danger-primary text-xs",
                  }}
                />
              </div>
              <div className="w-full h-full flex flex-col justify-center gradient-style-2 items-center p-8 gap-4">
                <span className="xs:text-sm md:text-2xl text-background-primary">Contoh bagian data diri</span>
                <img src="/data-diri-img.png" alt="contoh-cv" className="w-full" />
              </div>
            </div>
            {/* User Desc */}
            <Textarea
              isReadOnly
              label="Ceritakan diri anda"
              labelPlacement="outside"
              value={user_desc}
              onValueChange={setUserDesc}
              type="text"
              variant="bordered"
              classNames={{
                label: "after:text-danger-primary text-xs text-text-secondary",
                input: "focus:!border-primary-primary text-xs ",
                inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                errorMessage: "text-danger-primary text-xs",
              }}
            />
            <div className="w-full flex flex-wrap gap-4">
              {/* platform_id */}
              {isLoadingPlatforms ? (
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
              ) : apiErrorPlatforms ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorPlatforms}</p>
              ) : platforms.length === 0 ? (
                <p className="text-start text-xs text-text-secondary">Data perusahaan belum tersedia</p>
              ) : (
                <Select
                  isDisabled
                  isMultiline={true}
                  items={platforms}
                  selectionMode="multiple"
                  label="Tambah sosial media anda"
                  labelPlacement="outside"
                  variant="bordered"
                  name="platform_id"
                  placeholder="Pilih sosial media"
                  renderValue={(items) => (
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <div key={item.data?.platform_id} className="flex items-center gap-2">
                          <Avatar alt={item.data?.platform_name} className="w-6 h-6" src={item.data?.platform_img} classNames={{ img: "object-contain bg-background-primary" }} />
                          <span className="text-xs">{item.data?.platform_name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  selectedKeys={platform_id}
                  onSelectionChange={setPlatformId}
                  classNames={{
                    base: "max-w-xs",
                    label: "after:text-danger-primary text-xs",
                    trigger: "text-text-secondary hover:!border-primary-primary data-[focus=true]:border-primary-primary data-[open=true]:border-primary-primary ",
                    value: "text-xs",
                    errorMessage: "text-danger-primary",
                  }}
                >
                  {(platform) => (
                    <SelectItem
                      key={platform.platform_id}
                      textValue={platform.platform_name}
                      startContent={<Avatar alt={platform.platform_name} className="w-6 h-6" src={platform.platform_img} classNames={{ img: "object-contain bg-background-primary" }} />}
                      classNames={{
                        title: "text-xs hover:!text-primary-primary",
                        selectedIcon: "text-primary-primary",
                      }}
                    >
                      {platform.platform_name}
                    </SelectItem>
                  )}
                </Select>
              )}
            </div>
            <div className="w-full flex xs:flex-col md:flex-row gap-4">
              {Array.from(platform_id).map((id) => {
                const platform = platforms.find((p) => String(p.platform_id) === id);
                if (!platform) return null;
                return (
                  <Input
                    key={id}
                    isReadOnly
                    label={`Masukkan ${platform.platform_name === "Website" ? "link website" : "username"} ${platform.platform_name} anda `}
                    labelPlacement="outside"
                    value={user_platform_name[id]}
                    onValueChange={(value) => setUserPlatformName((prev) => ({ ...prev, [id]: value }))}
                    variant="bordered"
                    classNames={{
                      base: "max-w-xs",
                      label: "after:text-danger-primary text-xs text-text-secondary",
                      input: "focus:!border-primary-primary text-xs ",
                      inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                      errorMessage: "text-danger-primary text-xs",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </Form>
      </>
    </>
  );
}

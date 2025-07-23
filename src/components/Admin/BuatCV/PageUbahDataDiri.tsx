"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Iconsax
import { Sms } from "iconsax-react";

// Components
import { Form, Breadcrumbs, BreadcrumbItem, Avatar, Button, Accordion, AccordionItem, ScrollShadow, Input, Select, SelectItem, Selection, Spinner, Textarea } from "@heroui/react";
import { showConfirmationDialog, showSuccessDialog, showErrorDialog } from "@/components/Custom/AlertButton";

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
import { getUserPlatformsByUsername, updateUserPlatformsByUsername } from "@/services/userPlatform";
import { getUserByUsername, updateUserForCV } from "@/services/user";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";
import { appendSingle } from "@/utils/formDataHelpers";

export default function Page({ user_name }: { user_name: string }) {
  const router = useRouter();
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

  const [loading, setLoading] = useState(true);

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
      const { success, data, error } = await getUserByUsername(user_name);
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
      const resPlatform = await getUserPlatformsByUsername(user_name);
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
  }, [user_name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirm = await showConfirmationDialog();
    if (!confirm.isConfirmed) return;

    setLoading(true);

    // 1. Kirim data user (data diri) ke updateUserForCV
    const formUser = new FormData();
    formUser.append("user_fullname", user_fullname);
    formUser.append("user_email", user_email);
    formUser.append("user_phone", user_phone);
    formUser.append("user_desc", user_desc);
    appendSingle(formUser, "city_id", city_id);
    appendSingle(formUser, "province_id", province_id);
    appendSingle(formUser, "country_id", country_id);

    const resUser = await updateUserForCV(user_name, formUser);
    if (!resUser.success) {
      await showErrorDialog(resUser.error || "Gagal memperbarui data diri");
      setLoading(false);
      return;
    }

    // 2. Kirim data platform ke updateUserPlatformsByUsername
    const formPlatform = new FormData();
    const platformData = Array.from(platform_id).map((id) => ({
      user_platform_name: user_platform_name[id],
      platform_id: Number(id),
    }));
    formPlatform.append("platforms", JSON.stringify(platformData));

    const resPlatform = await updateUserPlatformsByUsername(user_name, formPlatform);
    if (!resPlatform.success) {
      await showErrorDialog(resPlatform.error || "Gagal memperbarui data sosial media");
      setLoading(false);
      return;
    }

    await showSuccessDialog();
    router.push("/buat-cv");
    setLoading(false);
  };

  return (
    <>
      <>
        <section className="w-full  bg-background-primary py-8">
          <div className="w-full min-h-screen mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
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
            {/* Breadcrumb */}
            <Breadcrumbs
              className="text-xs text-text-secondary"
              itemClasses={{
                item: "data-[current=true]:text-primary-primary",
              }}
            >
              <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
              <BreadcrumbItem href="/buat-cv" className="text-primary-primary">
                Buat CV
              </BreadcrumbItem>
              <BreadcrumbItem href={`/buat-cv/ubah-data-diri/${user_name}`} className="text-primary-primary">
                Ubah Data Diri
              </BreadcrumbItem>
            </Breadcrumbs>

            <Accordion variant="splitted" className="gap-8" isCompact>
              <AccordionItem
                key="data_diri"
                textValue="Data Diri"
                title={
                  <div className="relative w-fit">
                    <p className=" relative z-10 xs:text-base md:text-xl text-primary-primary font-bold ">Data Diri</p>
                    <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
                  </div>
                }
                classNames={{ indicator: "py-4" }}
              >
                <ScrollShadow className="w-full h-96 xs:py-8 md:p-8" hideScrollBar>
                  <Form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      <div className="flex flex-col gap-4">
                        {/* Nama Lengkap  */}
                        <Input
                          isRequired
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
                            isRequired
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
                            isRequired
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
                            isRequired
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
                          isRequired
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
                          isRequired
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
                      isRequired
                      label="Ceritakan tentang diri anda"
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
                      {" "}
                      {Array.from(platform_id).map((id) => {
                        const platform = platforms.find((p) => String(p.platform_id) === id);
                        if (!platform) return null;
                        return (
                          <Input
                            key={id}
                            isRequired
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

                    <div className="w-full justify-end flex ">
                      <Button className="login" type="submit">
                        Simpan Perubahan
                      </Button>
                    </div>
                  </Form>
                </ScrollShadow>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </>
    </>
  );
}

"use client";
import React, { useEffect, useState } from "react";

// Iconsax
import { User, Sms, Discover, DocumentDownload } from "iconsax-react";

// Components
import { Form, Breadcrumbs, BreadcrumbItem, Avatar, Link, Button, Accordion, AccordionItem, ScrollShadow, Input, Select, SelectItem, Selection, Spinner, Image, Textarea } from "@heroui/react";
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
import { getUserById } from "@/services/user";

// Utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function page() {
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

  const [user_fullname, setUserFullname] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [user_phone, setUserPhone] = useState("");
  const [user_desc, setUserDesc] = useState("");

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

      const { success, data, error } = await getUserById(user?.user_id || "");
      if (!success || !data) {
        await showErrorDialog(error || "Gagal mengambil data profil");
        return;
      }

      setUserFullname(data.user_fullname);
      setUserEmail(data.user_email);
      setUserPhone(data.user_phone);
      setUserDesc(data.user_desc);
      setCityId(new Set([String(data.city_id)]));
      setProvinceId(new Set([String(data.province_id)]));
      setCountryId(new Set([String(data.country_id)]));
      setLoading(false);
    };

    fetchAll();
  }, []);

  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [website, setWebsite] = useState("");

  const isPlatformSelected = (name: string) => {
    const selectedIds = Array.from(platform_id);
    const platform = platforms.find((p) => p.platform_name.toLowerCase() === name.toLowerCase());
    return platform ? selectedIds.includes(String(platform.platform_id)) : false;
  };

  console.log("platform_id", platform_id);

  return (
    <>
      <>
        <section className="w-full bg-background-primary py-8">
          <div className="w-10/12 mx-auto flex flex-col gap-8">
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
            </Breadcrumbs>

            <div className="flex flex-row items-center p-8 gap-8 justify-between rounded-medium">
              <div className="flex items-center gap-8">
                <Avatar className="w-20 h-20" src={user?.user_img} />
                <div className="flex flex-col gap-4">
                  <p className="text-xs text-text-secondary">{user?.user_fullname}</p>
                  <div className="flex items-center gap-2">
                    <User size={16} variant="Linear" color="currentColor" className="text-primary-primary" />
                    <p className="text-text-secondary">-</p>
                    <Sms size={16} variant="Bold" color="currentColor" className="text-primary-primary" />
                    <p className="text-xs text-text-secondary">{user?.user_email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button endContent={<Discover size={16} variant="Bulk" color="currentColor" className="text-background-primary" />} as={Link} color="default" href="https://github.com/heroui-inc/heroui" variant="solid" className="login">
                  Preview
                </Button>
                <Button
                  endContent={<DocumentDownload size={16} variant="Bulk" color="currentColor" className="text-background-primary" />}
                  as={Link}
                  color="default"
                  href="https://github.com/heroui-inc/heroui"
                  variant="solid"
                  className="login"
                >
                  Download
                </Button>
              </div>
            </div>

            <Accordion variant="splitted" className="gap-8" isCompact>
              <AccordionItem
                key="data_diri"
                textValue="Data Diri"
                title={
                  <div className="relative w-fit">
                    <p className=" relative z-10 text-xl text-primary-primary font-bold ">Data Diri</p>
                    <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
                  </div>
                }
                classNames={{ indicator: "py-4" }}
              >
                <ScrollShadow className="w-full h-96 py-8">
                  <Form className="w-full flex flex-col gap-4">
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
                        <span className="text-2xl text-background-primary">Contoh bagian data diri</span>
                        <img src="/data-diri-img.png" alt="contoh-cv" className="w-full" />
                      </div>
                    </div>
                    {/* User Desc */}
                    <Textarea
                      isRequired
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
                          isMultiline={true}
                          items={platforms}
                          selectionMode="multiple"
                          label="Tambah sosial media anda"
                          labelPlacement="outside"
                          variant="bordered"
                          name="platform_id"
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

                      {isPlatformSelected("Website") && (
                        <Input
                          isRequired
                          label="Website"
                          labelPlacement="outside"
                          value={website}
                          onValueChange={setWebsite}
                          placeholder="https://example.com"
                          variant="bordered"
                          classNames={{
                            base: "max-w-xs",
                            label: "after:text-danger-primary text-xs text-text-secondary",
                            input: "focus:!border-primary-primary text-xs ",
                            inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                          }}
                        />
                      )}

                      {isPlatformSelected("Github") && (
                        <Input
                          isRequired
                          label="GitHub"
                          labelPlacement="outside"
                          value={githubLink}
                          onValueChange={setGithubLink}
                          placeholder="username"
                          variant="bordered"
                          classNames={{
                            base: "max-w-xs",
                            label: "after:text-danger-primary text-xs text-text-secondary",
                            input: "focus:!border-primary-primary text-xs ",
                            inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                          }}
                        />
                      )}

                      {isPlatformSelected("Linkedin") && (
                        <Input
                          isRequired
                          label="LinkedIn"
                          labelPlacement="outside"
                          value={linkedinLink}
                          onValueChange={setLinkedinLink}
                          placeholder="username"
                          variant="bordered"
                          classNames={{
                            base: "max-w-xs",
                            label: "after:text-danger-primary text-xs text-text-secondary",
                            input: "focus:!border-primary-primary text-xs ",
                            inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                          }}
                        />
                      )}
                    </div>

                    <div className="w-full justify-end flex ">
                      <Button className="login">Simpan</Button>
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

"use client";
import React from "react";
import type { CVItem } from "@/types/cv";
import { getDateOnly } from "@/utils/time";

interface Props {
  data: CVItem;
}

export default function CVPreview({ data }: Props) {
  return (
    <div id="cv-preview" className="bg-white text-black md:w-[794px] md:h-[1123px] xs:w-full xs:min-h-screen xs:p-2 md:p-0 mx-auto  rounded-lg font-sans ">
      <h1 className="text-2xl font-bold text-center">{data.user?.user_fullname?.toUpperCase()}</h1>
      <p className="flex flex-col text-sm text-center">
        <span>
          {" "}
          {data.user?.user_email} · {data.user?.user_phone} · {data.platforms.map((item) => item.user_platform_name).join(", ")}
        </span>
        <span>
          {" "}
          {data.user?.city_name}, {data.user?.province_name}, {data.user?.country_name}
        </span>
      </p>

      {/* Deskripsi */}
      <p className="text-sm mt-6 text-justify">{data.user?.user_desc}</p>

      {/* Pengalaman Kerja */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Work Experiences</h2>
        <hr className="my-1 border border-black w-full" />
        {data.work_experiences?.map((item, idx) => (
          <span key={idx}>
            <span className="flex justify-between">
              {/* Posisi & Perusahaan */}
              <span className="font-semibold text-sm">
                {item.position_name} - {item.company_name}
              </span>

              {/* Tanggal */}
              <span className="text-sm italic">
                {getDateOnly(item.user_work_experience_start_date)} - {item.user_work_experience_end_date ? getDateOnly(item.user_work_experience_end_date) : "Now"}
              </span>
            </span>

            {/* Deskripsi */}
            {typeof item.user_work_experience_descriptions === "string" && item.user_work_experience_descriptions.trim() !== "" && (
              <ul className="list-none ">
                {item.user_work_experience_descriptions
                  .split("@")
                  .filter((desc) => desc.trim() !== "")
                  .map((desc, i) => (
                    <li key={i} className="flex gap-1 items-start text-sm  ">
                      <span>•</span>
                      <span className="flex-1">{desc.trim()}</span>
                    </li>
                  ))}
              </ul>
            )}
          </span>
        ))}
      </section>

      {/* Pengalaman Organisasi */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Organizational Experiences</h2>
        <hr className="my-1 border border-black w-full" />
        {data.organization_experiences?.map((item, idx) => (
          <span key={idx}>
            <span className="flex justify-between">
              {/* Posisi & Perusahaan */}
              <span className="font-semibold text-sm">
                {item.position_name} - {item.company_name}
              </span>

              {/* Tanggal */}
              <span className="text-sm italic">
                {getDateOnly(item.user_organization_experience_start_date)} - {item.user_organization_experience_end_date ? getDateOnly(item.user_organization_experience_end_date) : "Now"}
              </span>
            </span>

            {/* Deskripsi */}
            {typeof item.user_organization_experience_descriptions === "string" && item.user_organization_experience_descriptions.trim() !== "" && (
              <ul className="list-none ">
                {item.user_organization_experience_descriptions
                  .split("@")
                  .filter((desc) => desc.trim() !== "")
                  .map((desc, i) => (
                    <li key={i} className="flex gap-1 items-start text-sm  ">
                      <span>•</span>
                      <span className="flex-1">{desc.trim()}</span>
                    </li>
                  ))}
              </ul>
            )}
          </span>
        ))}
      </section>

      {/* Riwayat Pendidikan */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Educations</h2>
        <hr className="my-1 border border-black w-full" />
        {data.educations?.map((item, idx) => (
          <span key={idx}>
            <span className="flex justify-between">
              {/* Posisi & Perusahaan */}
              <span className="font-semibold text-sm">{item.user_education_name}</span>

              {/* Tanggal */}
              <span className="text-sm italic">
                {getDateOnly(item.user_education_admission_date)} - {item.user_education_graduation_date ? getDateOnly(item.user_education_graduation_date) : "Now"}
              </span>
            </span>

            <span className="flex flex-col  items-start text-sm ">
              {item.user_education_subject && <span>• {item.user_education_subject}</span>}
              <span>• {item.user_education_final_score}</span>
            </span>
          </span>
        ))}
      </section>

      {/* Penghargaan */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Achievements</h2>
        <hr className="my-1 border border-black w-full" />
        {data.achievements?.map((item, idx) => (
          <span key={idx}>
            <span className="flex justify-between">
              {/* Posisi & Perusahaan */}
              <span className="font-semibold text-sm">
                {" "}
                {item.user_achievement_name} - {item.company_name}
              </span>

              {/* Tanggal */}
              <span className="text-sm italic">{getDateOnly(item.user_achievement_date)}</span>
            </span>
          </span>
        ))}
      </section>

      {/* Keahlian */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Skills</h2>
        <hr className="my-1 border border-black w-full" />
        {data.skills?.map((item, idx) => (
          <span key={idx}>
            <span className="flex justify-between">
              {/* skill */}
              <span className="font-semibold text-sm"> {item.skill_name}</span>

              {/* skill level */}
              <span className="italic text-sm"> {item.skill_level_name}</span>
            </span>
          </span>
        ))}
      </section>
    </div>
  );
}

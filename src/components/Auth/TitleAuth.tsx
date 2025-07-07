import React from "react";

type Props = {
  title: string;
  desc: string;
};

export default function TitleAuth(props: Props) {
  const { title, desc } = props;
  return (
    <>
      <>
        <div className="flex flex-col justify-center items-center gap-2">
          {" "}
          <span className="xs:text-base md:text-4xl font-bold text-background-primary">{title}</span>
          <span className="text-xs text-background-primary">{desc}</span>
        </div>
      </>
    </>
  );
}

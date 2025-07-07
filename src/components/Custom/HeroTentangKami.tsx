// NextJS
import Image from "next/image";

type TitleTentangKamiType = {
  label?: string;
  text?: string;
};

type TitleTentangKamiProps = {
  titleTentangKamiItems: TitleTentangKamiType[];
};

export default function HeroTentangKami(props: TitleTentangKamiProps) {
  const { titleTentangKamiItems } = props;
  return (
    <div className="w-full">
      {titleTentangKamiItems.map((item, index) => (
        <section key={index} className="w-full bg-hero-gradient overflow-hidden">
          <div className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col justify-center items-center xs:gap-4 md:gap-8 xs:py-16 md:py-32">
            <Image src="/logofti.png" alt="Logo FTI" width={48} height={48} className="group-hover:origin-bottom group-hover:-rotate-12 transition-all object-cover" />
            <span className="xs:text-base md:text-4xl text-center text-background-primary font-bold">{item.label}</span>
            <span className="text-xs text-center text-background-primary">{item.text}</span>
          </div>
        </section>
      ))}
    </div>
  );
}

type TitlePageProps = {
  label: string;
};
export default function TitleKarir(props: TitlePageProps) {
  const { label } = props;
  return (
    <>
      <>
        <div className="group text-primary-primary flex flex-col gap-2 overflow-hidden">
          <p className="xs:text-sm md:text-2xl font-bold ">{label}</p>
          <div className="flex gap-2">
            <div className="flex gap-12 bg-primary-primary rounded-full ">
              <span className="xs:w-2 xs:h-2 md:w-4  md:h-4 rounded-full bg-primary-primary"></span>
              <span className="xs:w-2 xs:h-2 md:w-4  md:h-4 rounded-full bg-primary-primary"></span>
            </div>
            <span className="xs:w-2 xs:h-2 md:w-4 md:h-4 rounded-full bg-primary-primary"></span>
            <span className="xs:w-2 xs:h-2 md:w-4  md:h-4 rounded-full bg-primary-primary"></span>
          </div>
        </div>
      </>
    </>
  );
}

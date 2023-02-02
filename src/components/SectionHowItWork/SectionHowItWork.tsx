import React, { FC } from "react";
import NcImage from "components/shared/NcImage/NcImage";
import HIW1img from "assets/images/temp/HIW1img.png";
import HIW2img from "assets/images/temp/HIW2img.png";
import HIW3img from "assets/images/temp/HIW3img.png";
import HIW4img from "assets/images/temp/HIW4img.png";
import VectorImg from "assets/images/temp/VectorHIW.svg";
import Badge from "components/shared/Badge/Badge";

export interface SectionHowItWorkProps {
  className?: string;
  data?: typeof DEMO_DATA[0][];
}

const DEMO_DATA = [
  {
    id: 1,
    img: HIW1img,
    imgDark: HIW1img,
    title: "بررسی و انتخاب",
    desc: "با بررسی و فیلتر گزینه ها کتونی مد نظرتان را انتخاب کنید",
  },
  {
    id: 2,
    img: HIW2img,
    imgDark: HIW2img,
    title: "اضافه کردن به سبد خرید",
    desc: "پس از اطمینان انتخاب خود را به سبد خریدتان اضافه کنید",
  },
  {
    id: 3,
    img: HIW3img,
    imgDark: HIW3img,
    title: "تحویل سریع",
    desc: "در صورت ثبت سفارش تا ساعت ۱۴ سفارش را در همان روز تحویل بگیرید",
  },
  {
    id: 4,
    img: HIW4img,
    imgDark: HIW4img,
    title: "طمع شیرین خرید",
    desc: "می توانید درب منزل پرو کنید و مناسب ترین سایز را انتخاب کنید",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
        <img
          className="hidden md:block absolute inset-x-0 top-5"
          src={VectorImg}
          alt="vector"
        />
        {data.map((item: typeof DEMO_DATA[number], index: number) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            <NcImage
              containerClassName="mb-4 sm:mb-10 max-w-[140px] mx-auto"
              className="rounded-3xl"
              src={item.img}
            />
            <div className="text-center mt-auto space-y-5">
              <Badge
                name={`مرحله ${index + 1}`}
                color={
                  !index
                    ? "red"
                    : index === 1
                    ? "indigo"
                    : index === 2
                    ? "yellow"
                    : "purple"
                }
              />
              <h3 className="text-base font-semibold">{item.title}</h3>
              <span className="block text-slate-600 dark:text-slate-400 text-sm leading-6">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;

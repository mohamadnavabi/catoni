import React, { FC, useEffect, useId } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import CardCategory2 from "components/CardCategories/CardCategory2";
import department1Png from "assets/images/temp/collections/department1.png";
import department2Png from "assets/images/temp/collections/department2.png";
import department3Png from "assets/images/temp/collections/department3.png";
import department4Png from "assets/images/temp/collections/department4.png";
import { Link } from "react-router-dom";

export interface CardBrandData {
  name: string;
  desc: string;
  img: string;
  color?: string;
}
const BRANDS: CardBrandData[] = [
  {
    name: "نایکی",
    desc: "20+ محصول",
    img: department1Png,
    color: "bg-indigo-100",
  },
  {
    name: "آدیداس",
    desc: "10+ محصول",
    img: department2Png,
    color: "bg-slate-100",
  },
  {
    name: "آندر آمور",
    desc: "34+ محصول",
    img: department3Png,
    color: "bg-sky-100",
  },
  {
    name: "نیوبالانس",
    desc: "12+ محصول",
    img: department4Png,
    color: "bg-orange-100",
  },
];
export interface SectionSliderBrandsProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  data?: CardBrandData[];
}

const SectionSliderBrands: FC<SectionSliderBrandsProps> = ({
  heading = "برند ها",
  subHeading = "",
  className = "",
  itemClassName = "",
  data = BRANDS,
}) => {
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    // @ts-ignore
    const OPTIONS: Glide.Options = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4,
        },
        1024: {
          gap: 20,
          perView: 3.4,
        },
        768: {
          gap: 20,
          perView: 3,
        },
        640: {
          gap: 20,
          perView: 2.3,
        },
        500: {
          gap: 20,
          perView: 1.4,
        },
      },
      direction: "rtl",
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    return () => {
      slider.destroy();
    };
  }, [UNIQUE_CLASS]);

  return (
    <div className={`nc-SectionSliderBrands ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`}>
        <Heading desc={subHeading} hasNextPrev>
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {data.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <CardCategory2
                  featuredImage={item.img}
                  name={item.name}
                  desc={item.desc}
                  bgClass={item.color}
                />
              </li>
            ))}
            <li className={`glide__slide ${itemClassName}`}>
              <div
                className={`flex-1 relative w-full h-0 rounded-2xl overflow-hidden group aspect-w-1 aspect-h-1 bg-slate-100`}
              >
                <div>
                  <div className="absolute inset-y-6 inset-x-10 flex flex-col sm:items-center justify-center">
                    <div className="flex relative text-slate-900">
                      <span className="text-lg font-semibold ">بیشتر</span>
                      <svg
                        className="absolute left-full w-5 h-5 ml-2 rotate-45 group-hover:scale-110 transition-transform"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M12 20.4999V3.66992"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-sm mt-1 text-slate-800">
                      برند های بیشتر
                    </span>
                  </div>
                </div>
                <Link
                  to={"/"}
                  className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"
                ></Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderBrands;

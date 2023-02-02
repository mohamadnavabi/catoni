import React, { FC, useEffect, useId, useMemo, useRef } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import ProductCard from "./ProductCard";
import { Product, PRODUCTS } from "data/data";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "",
  data,
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    if (!sliderRef.current) {
      return () => {};
    }

    // @ts-ignore
    const OPTIONS: Glide.Options = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
        },
        640: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
      direction: "rtl",
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    return () => {
      slider.destroy();
    };
  }, [sliderRef, UNIQUE_CLASS]);

  const renderItems = useMemo(() => {
    if (data?.length)
      return (
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {data.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <ProductCard data={item} />
              </li>
            ))}
          </ul>
        </div>
      );
    else
      return (
        <div className="animate-pulse glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {new Array(5).fill(undefined).map((_, index) => (
              <li key={index} className={`glide__slide`}>
                <div
                  className="bg-slate-100 dark:bg-slate-100 rounded-3xl"
                  style={{ width: 296, height: 323 }}
                />
                <div
                  className="bg-slate-100 dark:bg-slate-100 rounded-3xl mt-3"
                  style={{ width: 296, height: 25 }}
                />
                <div className="flex justify-between items-end  mt-3">
                  <div
                    className="bg-slate-100 dark:bg-slate-100 rounded-3xl"
                    style={{ width: 75, height: 25 }}
                  />
                  <div
                    className="bg-slate-100 dark:bg-slate-100 rounded-3xl"
                    style={{ width: 75, height: 25 }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
  }, [data]);

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `جدیدترین ها`}
        </Heading>
        {renderItems}
      </div>
    </div>
  );
};

export default SectionSliderProductCard;

import React, { useEffect, useId } from "react";
import Heading from "./Heading/Heading";
import img1 from "assets/images/temp/collections/1.png";
import img2 from "assets/images/temp/collections/5.png";
import img3 from "assets/images/temp/collections/4.png";
import img4 from "assets/images/temp/collections/3.png";
import CardCategory3, {
  CardCategory3Props,
} from "./CardCategories/CardCategory3";
import Glide from "@glidejs/glide";

export const CATS_DISCOVER: CardCategory3Props[] = [
  {
    name: "ست بپوشید",
    desc: "از بین کتونی های<br />دخترانه و پسرانه",
    featuredImage: img1,
    color: "bg-yellow-50",
  },
  {
    name: "ورزشی ها",
    desc: "با کیفیت های <br /> مناسب ورزش",
    featuredImage: img2,
    color: "bg-red-50",
  },
  {
    name: "روزمره ها",
    desc: "با کیفیت های <br /> مناسب استفاده روزمره",
    featuredImage: img3,
    color: "bg-blue-50",
  },
  {
    name: "تک سایز ها",
    desc: "تک سایز ها <br /> با تخفیف بالا",
    featuredImage: img4,
    color: "bg-green-50",
  },
];

const DiscoverMoreSlider = () => {
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    // @ts-ignore
    const OPTIONS: Glide.Options = {
      perView: 2.8,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1279: {
          gap: 20,
          perView: 2.15,
        },
        1023: {
          gap: 20,
          perView: 1.6,
        },
        768: {
          gap: 20,
          perView: 1.2,
        },
        500: {
          gap: 20,
          perView: 1,
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
    <div className={`nc-DiscoverMoreSlider nc-p-l-container ${UNIQUE_CLASS} `}>
      <Heading
        className="mb-4 lg:mb-8 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
        desc=""
        rightDescText=""
        hasNextPrev
      >
        پیشنهادات ویژه
      </Heading>
      <div className="" data-glide-el="track">
        <ul className="glide__slides">
          {CATS_DISCOVER.map((item, index) => (
            <li key={index} className={`glide__slide`}>
              <CardCategory3
                name={item.name}
                desc={item.desc}
                featuredImage={item.featuredImage}
                color={item.color}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscoverMoreSlider;

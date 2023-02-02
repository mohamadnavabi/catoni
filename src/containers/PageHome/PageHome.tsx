import React from "react";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "components/SectionPromo1";
import { Helmet } from "react-helmet";
import SectionHero2 from "components/SectionHero/SectionHero2";
import SectionSliderLargeProduct from "components/SectionSliderLargeProduct";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import DiscoverMoreSlider from "components/DiscoverMoreSlider";
import SectionGridMoreExplore from "components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "components/SectionPromo2";
import SectionGridFeatureItems from "./SectionGridFeatureItems";
import SectionPromo3 from "components/SectionPromo3";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import SectionMagazine5 from "containers/BlogPage/SectionMagazine5";
import Heading from "components/Heading/Heading";
import ButtonSecondary from "components/shared/Button/ButtonSecondary";
import { PRODUCTS, SPORT_PRODUCTS } from "data/data";
import SectionSliderBrands from "components/SectionSliderBrands/SectionSliderBrands";

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <Helmet>
        <title>فروشگاه اینترنتی کفش و کتونی</title>
      </Helmet>

      {/* SECTION HERO */}
      <div className="mb-8 lg:mb-12">
        <SectionHero2 />
      </div>

      <DiscoverMoreSlider />

      <div className="container relative space-y-14 my-14 lg:space-y-16 lg:my-16">
        {/* SECTION */}
        <SectionSliderProductCard
          data={[
            PRODUCTS[4],
            SPORT_PRODUCTS[5],
            PRODUCTS[7],
            SPORT_PRODUCTS[1],
            PRODUCTS[6],
          ]}
        />

        {/* SECTION */}
        {/* <SectionPromo1 /> */}

        {/* SECTION */}
        {/* <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div> */}

        <div className="py-14 lg:py-16 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>

        <SectionSliderProductCard heading="پرفروش ها" />

        {/*  */}
        {/* <SectionPromo2 /> */}

        {/* SECTION 3 */}
        <SectionSliderLargeProduct cardStyle="style2" />

        {/*  */}
        <div className="pb-16">
          <SectionSliderBrands />
        </div>

        {/* SECTION */}
        <SectionPromo3 />

        {/* SECTION */}
        {/* <SectionGridFeatureItems /> */}

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading>آخرین مقالات و خبرها</Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>نمایش تمام مقالات و خبرها</ButtonSecondary>
            </div>
          </div>
        </div>

        {/*  */}
        {/* <SectionClientSay /> */}
      </div>
    </div>
  );
}

export default PageHome;

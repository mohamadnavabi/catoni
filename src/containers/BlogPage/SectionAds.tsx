import React, { FC } from "react";
import NcImage from "components/shared/NcImage/NcImage";
import imgAds from "assets/images/temp/ads.png";

export interface SectionAdsProps {
  className?: string;
}

const SectionAds: FC<SectionAdsProps> = ({ className = "" }) => {
  return (
    <a href="/#" className={`nc-SectionAds block w-full ${className}`}>
      <NcImage className="w-full" src={imgAds} />
    </a>
  );
};

export default SectionAds;

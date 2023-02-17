import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: number;
  contentClass?: string;
  priceClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price = 0,
  contentClass = " border-2 rounded-lg border-green-500 py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
  priceClass = "text-green-500 !leading-none",
}) => {
  return (
    <div className={`${className}`}>
      <div className={`flex items-center ${contentClass}`}>
        <span className={priceClass}>
          {`${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
            price > 0 ? "ریال" : ""
          }`}
        </span>
      </div>
    </div>
  );
};

export default Prices;

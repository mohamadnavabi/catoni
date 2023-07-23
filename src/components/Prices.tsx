import React, { FC } from "react";
import { currencyFormat } from "utils/number";

export interface PricesProps {
  className?: string;
  sale_price?: number;
  price?: number;
  contentClass?: string;
  priceClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = " flex-col justify-center items-center",
  sale_price = 0,
  price = 0,
  contentClass = " border-2 rounded-lg border-green-500 py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
  priceClass = "text-green-500 !leading-none",
}) => {
  return (
    <div className={`${className}`}>
      {sale_price > 0 && (
        <s className="text-gray-400 text-sm mr-3">{currencyFormat(price)}</s>
      )}

      <div className={`flex items-center ${contentClass}`}>
        <span className={priceClass}>
          {`${currencyFormat(sale_price > 0 ? sale_price : price)} ${
            price !== 0 ? "ریال" : ""
          }`}
        </span>
      </div>
    </div>
  );
};

export default Prices;

import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Product } from "data/data";
import React, { FC } from "react";
import IconDiscount from "./IconDiscount";

interface Props {
  status: any;
  className?: string;
}

const ProductStatus: FC<Props> = ({
  status,
  className = "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300",
}) => {
  return null;
  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES = `nc-shadow-lg rounded-full flex items-center justify-center ${className}`;
    if (status === "جدید") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="mr-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "50% تخفیف") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="mr-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "تمام شد") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="mr-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "تعداد محدود") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="mr-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  return renderStatus();
};

export default ProductStatus;

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import twFocusClass from "utils/twFocusClass";

export interface ButtonCloseProps {
  className?: string;
  IconclassName?: string;
  onClick?: () => void;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({
  className = "",
  IconclassName = "w-6 h-6",
  onClick = () => {},
}) => {
  return (
    <button
      className={
        `w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 ${className} ` +
        twFocusClass()
      }
      onClick={onClick}
    >
      <span className="sr-only">بستن</span>
      <XMarkIcon className={IconclassName} />
    </button>
  );
};

export default ButtonClose;

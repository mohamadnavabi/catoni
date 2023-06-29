import React from "react";

type Props = {
  isTouched: boolean | undefined;
  error: string | undefined;
};

export default function InputError({ isTouched, error }: Props) {
  return isTouched && error ? (
    <span className="pr-3 text-red-500 text-xs italic">{error}</span>
  ) : null;
}

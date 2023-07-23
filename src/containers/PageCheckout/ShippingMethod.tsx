import React, { FC, useEffect, useMemo, useState } from "react";
import ButtonSecondary from "components/shared/Button/ButtonSecondary";
import Radio from "components/shared/Radio/Radio";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { checkoutSlice } from "store/slices";
import { CubeIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { isAddressCovered } from "utils/location";

const ShippingMethod: FC = () => {
  const { shippingMethods, selectedShippingMethod, selectedAddress } =
    useAppSelector((state) => state.checkout);

  const [openChangeMode, setOpenChangeMode] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (shippingMethods.length)
      dispatch(
        checkoutSlice.actions.setSelectedShippingMethod(shippingMethods[0])
      );
  }, [shippingMethods, selectedAddress]);

  const renderOnlineShipping = useMemo(() => {
    return React.Children.toArray(
      shippingMethods.map((item: any) => {
        const active = selectedShippingMethod.id === item.id;
        const zonesLength = item.zones.length;
        const isCovered = isAddressCovered(selectedAddress, item.zones);

        return (
          <div
            className={`flex items-start space-x-4 sm:space-x-6 space-x-reverse mb-7 ${
              !isCovered && "opacity-30"
            }`}
          >
            <Radio
              disabled={!isCovered}
              className="pl-3"
              name="shipping-method"
              id={item.id}
              defaultChecked={active}
              onChange={(e) =>
                checkoutSlice.actions.setSelectedShippingMethod(item)
              }
            />
            <div className="flex-1">
              <label
                htmlFor="Credit-Card"
                className="flex items-center space-x-4 sm:space-x-6 space-x-reverse"
              >
                <div>
                  {item.title === "پست" ? (
                    <CubeIcon className="w-6 h-6 sm:w-5 sm:h-5 ml-2" />
                  ) : (
                    <RocketLaunchIcon className="w-6 h-6 sm:w-5 sm:h-5 ml-2" />
                  )}
                </div>
                <p className="font-medium">
                  {item.title}

                  {zonesLength > 0 && (
                    <span className="text-sm text-slate-500 pr-1">
                      {"("}
                      {React.Children.toArray(
                        item.zones.map(
                          (zone: any, index: number) =>
                            `${zone.title}${
                              index < zonesLength - 1 ? "، " : ""
                            }`
                        )
                      )}
                      {")"}
                    </span>
                  )}
                </p>
              </label>
            </div>
          </div>
        );
      })
    );
  }, [shippingMethods, selectedShippingMethod, selectedAddress]);

  if (!Object.keys(selectedShippingMethod).length) return null;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
      <div className="p-6 flex flex-col sm:flex-row items-start">
        <span className="hidden sm:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
        </span>
        <div className="sm:mr-8">
          <h3 className=" text-slate-700 dark:text-slate-400 flex ">
            <span className="uppercase tracking-tight">روش ارسال</span>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-5 h-5 mr-3 text-slate-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </h3>
          <div className="font-semibold mt-1 text-sm">
            <span className="">{selectedShippingMethod.title}</span>
            {selectedShippingMethod.title === "پرداخت آنلاین" && (
              <span className="mr-1 text-xs">(درگاه پرداخت سامان)</span>
            )}
          </div>
        </div>
        <ButtonSecondary
          // disabled
          sizeClass="py-2 px-4 "
          fontSize="text-sm font-medium"
          className="bg-slate-50 dark:bg-slate-800 mt-5 sm:mt-0 sm:mr-auto !rounded-lg"
          onClick={() => setOpenChangeMode(!openChangeMode)}
        >
          {openChangeMode ? "بستن" : "تغییر"}
        </ButtonSecondary>
      </div>

      <div
        className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-6 ${
          openChangeMode ? "block" : "hidden"
        }`}
      >
        <div>{renderOnlineShipping}</div>
      </div>
    </div>
  );
};

export default ShippingMethod;

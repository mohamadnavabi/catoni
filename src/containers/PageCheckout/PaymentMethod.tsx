import React, { FC, useEffect, useMemo, useState } from "react";
import ButtonSecondary from "components/shared/Button/ButtonSecondary";
import Radio from "components/shared/Radio/Radio";
import { useAppDispatch, useAppSelector } from "store/hooks";
import OnlinePaymentSVG from "assets/svg/OnlinePaymentSVG";
import PaymentUponReceiptSVG from "assets/svg/PaymentUponReceiptSVG";
import { checkoutSlice } from "store/slices";
import { isAddressCovered } from "utils/location";

const PaymentMethod: FC = () => {
  const { paymentMethods, selectedPaymentMethod, selectedAddress } =
    useAppSelector((state) => state.checkout);

  const [openChangeMode, setOpenChangeMode] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (paymentMethods.length)
      dispatch(
        checkoutSlice.actions.setSelectedPaymentMethod(paymentMethods[0])
      );
  }, [paymentMethods, selectedAddress]);

  const renderOnlinePayment = useMemo(() => {
    return React.Children.toArray(
      paymentMethods.map((item: any) => {
        const active = selectedPaymentMethod.id === item.id;
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
              name="payment-method"
              id={item.id}
              defaultChecked={active}
              onChange={(e) =>
                dispatch(checkoutSlice.actions.setSelectedPaymentMethod(item))
              }
            />
            <div className="flex-1">
              <label
                htmlFor="Credit-Card"
                className="flex items-center space-x-4 sm:space-x-6 space-x-reverse"
              >
                <div>
                  {item.title === "پرداخت آنلاین" ? (
                    <OnlinePaymentSVG />
                  ) : (
                    <PaymentUponReceiptSVG />
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
  }, [paymentMethods, selectedPaymentMethod, selectedAddress]);

  if (!Object.keys(selectedPaymentMethod).length) return null;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
      <div className="p-6 flex flex-col sm:flex-row items-start">
        <span className="hidden sm:block">
          <svg
            className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.92969 15.8792L15.8797 3.9292"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.1013 18.2791L12.3013 17.0791"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.793 15.5887L16.183 13.1987"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.60127 10.239L10.2413 3.599C12.3613 1.479 13.4213 1.469 15.5213 3.569L20.4313 8.479C22.5313 10.579 22.5213 11.639 20.4013 13.759L13.7613 20.399C11.6413 22.519 10.5813 22.529 8.48127 20.429L3.57127 15.519C1.47127 13.419 1.47127 12.369 3.60127 10.239Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 21.9985H22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="sm:mr-8">
          <h3 className=" text-slate-700 dark:text-slate-400 flex ">
            <span className="uppercase tracking-tight">روش پرداخت</span>
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
            <span className="">{selectedPaymentMethod.title}</span>
            {selectedPaymentMethod.title === "پرداخت آنلاین" && (
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
        <div>{renderOnlinePayment}</div>
      </div>
    </div>
  );
};

export default PaymentMethod;

import React, { useEffect } from "react";
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import NcInputNumber from "components/NcInputNumber";
import Prices from "components/Prices";
import { AttributeTypes } from "data/data";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { BASE_URL } from "contains/contants";
import { CartItem, removeFromCart, updateQty } from "store/slices";

const CartPage = () => {
  const { items, tax, shipping, discount, total } = useAppSelector(
    (state) => state.cart
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO:
    // update cart
  }, [items]);

  const renderStatusSoldout = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <NoSymbolIcon className="w-3.5 h-3.5" />
        <span className="mr-1 leading-none">تمام شد</span>
      </div>
    );
  };

  const renderStatusInstock = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="mr-1 leading-none">موجود</span>
      </div>
    );
  };

  const renderVariantIcon = (type: AttributeTypes) => {
    switch (type) {
      case "color":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.35 1.94995L9.69 3.28992"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.07 11.92L17.19 11.26"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 22H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "size":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 9V3H15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 15V21H9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 3L13.5 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 13.5L3 21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderProduct = (item: CartItem, index: number) => {
    const { media, price, title, variants, quantity } = item;
    const image =
      media && media.length
        ? BASE_URL + media[0].path + "/" + JSON.parse(media[0].files)[3]
        : "";

    return (
      <div
        key={index}
        className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
      >
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain object-center"
          />
          <Link to="/product-detail" className="absolute inset-0"></Link>
        </div>

        <div className="mr-3 sm:mr-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link to="/product-detail">{title}</Link>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  {variants.length > 0 &&
                    React.Children.toArray(
                      variants[0].attribute_items.map((attibuteItem, index) => {
                        const icon = renderVariantIcon(
                          attibuteItem.attribute.type
                        );

                        return index > 0 ? (
                          <>
                            <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                            <div className="flex items-center space-x-1.5 space-x-reverse">
                              {icon}

                              <span>
                                {`${attibuteItem.attribute.name}: ${attibuteItem.name} `}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center space-x-1.5 space-x-reverse">
                            {icon}

                            <span>{`${attibuteItem.attribute.name}: ${attibuteItem.name} `}</span>
                          </div>
                        );
                      })
                    )}
                </div>

                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <select
                    name="qty"
                    id="qty"
                    className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                  <Prices
                    contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                    price={price}
                  />
                </div>
              </div>

              <div className="hidden sm:block text-center relative">
                <NcInputNumber
                  className="relative z-10"
                  defaultValue={quantity}
                  onChange={(quantity) =>
                    dispatch(updateQty({ ...item, quantity }))
                  }
                />
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices price={price} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {item.stock_status === "out_of_stock"
              ? renderStatusSoldout()
              : renderStatusInstock()}

            <button
              type="button"
              className="font-medium text-primary-6000 dark:text-primary-500 "
              onClick={() => dispatch(removeFromCart(item))}
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CartPage">
      <Helmet>
        <title>سبد خرید | فروشگاه اینترنتی کفش و کتونی</title>
      </Helmet>

      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-12 sm:mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            سبد خرید
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link to={"/#"} className="">
              خانه
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">سبد خرید</span>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">
            {items.length > 0 ? (
              items.map(renderProduct)
            ) : (
              <div className="h-full flex-1 flex-col items-center justify-center">
                <span className="text-center block text-black">
                  سبد خرید شما خالی است!
                </span>
                <span className="text-center block text-gray-500 text-sm mt-3">
                  جهت ادامه خرید محصولی به سبد اضافه کنید
                </span>
              </div>
            )}
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="sticky top-28">
              <h3 className="text-lg font-semibold ">صورتحساب</h3>
              <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                <div className="flex justify-between pb-4">
                  <span>جمع سبد</span>
                  <Prices
                    price={total}
                    priceClass="font-semibold text-slate-900 dark:text-slate-200"
                    contentClass=""
                  />
                </div>
                <div className="flex justify-between py-4">
                  <span>مالیات</span>
                  <Prices
                    price={tax}
                    priceClass="font-semibold text-slate-900 dark:text-slate-200"
                    contentClass=""
                  />
                </div>
                <div className="flex justify-between py-4">
                  <span>هزینه ارسال</span>
                  <Prices
                    price={shipping}
                    priceClass="font-semibold text-slate-900 dark:text-slate-200"
                    contentClass=""
                  />
                </div>
                <div className="flex justify-between py-4">
                  <span>تخفیف</span>
                  <Prices
                    price={discount}
                    priceClass="font-semibold text-slate-900 dark:text-slate-200"
                    contentClass=""
                  />
                </div>
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>جمع پرداختی</span>
                  <Prices price={total} priceClass="" contentClass="" />
                </div>
              </div>
              <ButtonPrimary href="/checkout" className="mt-8 w-full">
                ثبت نهایی سفارش
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;

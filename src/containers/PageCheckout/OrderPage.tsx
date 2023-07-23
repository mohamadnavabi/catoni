import React, { useEffect } from "react";
import Label from "components/Label/Label";
import NcInputNumber from "components/NcInputNumber";
import Prices from "components/Prices";
import { AttributeTypes, Product, PRODUCTS } from "data/data";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory, useLocation } from "react-router-dom";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import Input from "components/shared/Input/Input";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import { BASE_URL } from "contains/contants";
import {
  CartItem,
  getAddresses,
  getPaymentMethods,
  getShippingMethods,
  removeItem,
  storeOrder,
  updateQuantity,
} from "store/slices";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getLowPrice } from "store/slices/cart/helpers";
import ShippingMethod from "./ShippingMethod";
import moment from "moment";

const OrderPage = () => {
  let { state } = useLocation<any>();

  const { user } = useAppSelector((state) => state.auth);

  const history = useHistory();

  useEffect(() => {
    if (!user || !user.token) history.replace("/login");
  }, []);

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

  const renderProduct = (item: any, index: number) => {
    const { product, variant } = item;
    const lowPrices = getLowPrice(item);
    const image =
      product.media && product.media.length
        ? BASE_URL +
          product.media[0].path +
          "/" +
          JSON.parse(product.media[0].resized)[2]["name"]
        : "";
    return (
      <div
        key={index}
        className="relative flex first:pt-0 last:pb-0 items-center last:pt-2"
      >
        <div className="relative h-24 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 border">
          <img
            src={image}
            alt={product.title}
            className="h-full w-full object-contain object-center"
          />
          <Link
            to={{ pathname: `/product/${product.slug}`, state: { ...product } }}
            className="absolute inset-0"
          ></Link>
        </div>

        <div className="mr-3 sm:mr-6 flex flex-1 flex-col">
          <div className="flex justify-between ">
            <div className="flex-[1.5] ">
              <h3 className="text-base font-semibold">
                <Link
                  to={{
                    pathname: `/product/${item.slug}`,
                    state: { ...item },
                  }}
                >
                  {product.title}
                </Link>
              </h3>
              <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                {Object.keys(variant).length > 0 &&
                  React.Children.toArray(
                    variant.attribute_items.map(
                      (attibuteItem: any, index: number) => {
                        const icon = renderVariantIcon(
                          attibuteItem.attribute.type
                        );

                        return index > 0 ? (
                          <>
                            <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                            <div className="flex items-center space-x-1.5 space-x-reverse">
                              {icon}

                              <span className="text-slate-400">
                                {`${attibuteItem.attribute.name}: ${attibuteItem.name} `}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center space-x-1.5 space-x-reverse">
                            {icon}

                            <span className="text-slate-400">{`${attibuteItem.attribute.name}: ${attibuteItem.name} `}</span>
                          </div>
                        );
                      }
                    )
                  )}
              </div>
            </div>

            <div className="hidden flex-1 sm:flex justify-end items-center">
              <Prices {...lowPrices} className="mt-0.5" />
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            <div className="hidden sm:block text-center relative"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CheckoutPage">
      <Helmet>
        <title>سفارش | فروشگاه اینترنتی کفش و کتونی</title>
      </Helmet>

      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            سفارش
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link to={"/#"} className="">
              خانه
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <Link to={"/my-orders"} className="">
              سفارشات
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">{state.order.code}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="border rounded p-5">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl">کد سفارش: {state.order.code}</h1>

              <div className="flex-col">
                <span className="block text-left text-sm text-slate-500 pb-2">
                  روش پرداخت:{" "}
                  {
                    state.order.payment_methods[
                      state.order.payment_methods.length - 1
                    ].title
                  }
                </span>
                <span className="block text-left text-sm text-slate-500">
                  روش ارسال: {state.order.shipping_method.title}
                </span>
              </div>
            </div>

            <div className="my-3 py-8 border-y">
              {state.order.items.map(renderProduct)}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex-1" />
              <div className="flex-col">
                <span className="block text-left text-sm text-slate-500">
                  تاریخ سفارش: {state.order.created_at}
                </span>
                {state.order.note && (
                  <span className="block text-left text-sm text-slate-500">
                    توضیح سفارش: {state.order.note}
                  </span>
                )}

                <span className="block text-left text-sm text-slate-500 pt-5 pb-2">
                  هزینه ارسال:{" "}
                  {state.order.shipping_total > 0
                    ? state.order.shipping_total
                    : "رایگان"}
                </span>
                <span className="block text-left text-sm text-slate-500 pb-2">
                  مبلغ سفارش: {state.order.total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderPage;

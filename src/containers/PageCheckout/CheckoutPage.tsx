import React, { useEffect } from "react";
import Label from "components/Label/Label";
import NcInputNumber from "components/NcInputNumber";
import Prices from "components/Prices";
import { AttributeTypes, Product, PRODUCTS } from "data/data";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import Input from "components/shared/Input/Input";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import { BASE_URL } from "contains/contants";
import {
  CartItem,
  getAddresses,
  getCart,
  getPaymentMethods,
  getShippingMethods,
  removeItem,
  storeOrder,
  updateQuantity,
} from "store/slices";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getLowPrice } from "store/slices/cart/helpers";
import ShippingMethod from "./ShippingMethod";

const CheckoutPage = () => {
  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");

  const { items, tax, shipping, discount, total, totalWithoutDiscount } =
    useAppSelector((state) => state.cart);
  const { user, deviceInfo } = useAppSelector((state) => state.auth);
  const { selectedAddress, selectedPaymentMethod, selectedShippingMethod } =
    useAppSelector((state) => state.checkout);
  const { loading, activeOrder } = useAppSelector((state) => state.order);

  const dispatch = useAppDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!user || !user.token) history.replace("/login");
    else if (!items.length) history.replace("/cart");
    else {
      dispatch(getAddresses());
      dispatch(getPaymentMethods());
      dispatch(getShippingMethods());
    }
  }, []);

  useEffect(() => {
    if (activeOrder) {
      if (activeOrder.tracking_url) {
        window.location.href = activeOrder.tracking_url;
      } else {
        history.replace("/order", activeOrder);
      }
      dispatch(getCart());
    }
  }, [activeOrder]);

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
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
        ? BASE_URL +
          media[0].path +
          "/" +
          JSON.parse(media[0].resized)[2]["name"]
        : "";
    const lowPrices = getLowPrice(item);

    return (
      <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
        <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain object-center"
          />
          <Link
            to={{ pathname: `/product/${item.slug}`, state: { ...item } }}
            className="absolute inset-0"
          ></Link>
        </div>

        <div className="mr-3 sm:mr-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link
                    to={{
                      pathname: `/product/${item.slug}`,
                      state: { ...item },
                    }}
                  >
                    {title}
                  </Link>
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
                    {...lowPrices}
                    contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                  />
                </div>
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices {...lowPrices} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            <div className="hidden sm:block text-center relative">
              <NcInputNumber
                className="relative z-10"
                defaultValue={quantity}
                onChange={(quantity) =>
                  dispatch(updateQuantity({ ...item, quantity }))
                }
                onDelete={() => dispatch(removeItem(item))}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLeft = () => {
    return (
      <div className="space-y-8">
        <div id="ShippingAddress" className="scroll-mt-24">
          <ShippingAddress
            isActive={tabActive === "ShippingAddress"}
            onOpenActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
            onCloseActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
          />
        </div>

        <div id="PaymentMethod" className="scroll-mt-24">
          <PaymentMethod />
        </div>

        <div id="ShippingMethod" className="scroll-mt-24">
          <ShippingMethod />
        </div>
      </div>
    );
  };

  const onPayment = () => {
    dispatch(
      storeOrder({
        ordered_device: deviceInfo,
        total: total,
        discount: discount,
        shipping_total: shipping,
        address_id: selectedAddress?.id,
        coupon_id: null,
        shipping_method_id: selectedShippingMethod.id,
        payment_method_id: selectedPaymentMethod.id,
        items: items.map((item: CartItem) => item.item_id),
      })
    );
  };

  return (
    <div className="nc-CheckoutPage">
      <Helmet>
        <title>ثبت نهایی سفارش | فروشگاه اینترنتی کفش و کتونی</title>
      </Helmet>

      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            ثبت نهایی سفارش
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link to={"/#"} className="">
              خانه
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <Link to={"/cart"} className="">
              سبد خرید
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">ثبت نهایی سفارش</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">{renderLeft()}</div>

          <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

          <div className="w-full lg:w-[36%] ">
            <h3 className="text-lg font-semibold">اقلام درون سبد</h3>
            <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
              {items.map(renderProduct)}
            </div>

            <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
              <div>
                <Label className="text-sm">کد تخفیف</Label>
                <div className="flex mt-1.5">
                  <Input sizeClass="h-10 px-4 py-3" className="flex-1" />
                  <button className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 mr-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors">
                    اعمال
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-between py-2.5">
                <span>جمع سبد</span>
                <Prices
                  price={totalWithoutDiscount}
                  priceClass="font-semibold text-slate-900 dark:text-slate-200"
                  contentClass=""
                />
              </div>
              <div className="flex justify-between py-2.5">
                <span>مالیات</span>
                <Prices
                  price={tax}
                  priceClass="font-semibold text-slate-900 dark:text-slate-200"
                  contentClass=""
                />
              </div>
              <div className="flex justify-between py-2.5">
                <span>هزینه ارسال</span>
                <Prices
                  price={shipping}
                  priceClass="font-semibold text-slate-900 dark:text-slate-200"
                  contentClass=""
                />
              </div>
              <div className="flex justify-between py-2.5">
                <span>تخفیف</span>
                <Prices
                  price={discount}
                  priceClass="font-semibold text-slate-900 dark:text-slate-200"
                  contentClass=""
                />
              </div>

              <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                <span>جمع پرداختی</span>
                <Prices
                  price={total}
                  priceClass="font-semibold text-slate-900 dark:text-slate-200"
                  contentClass=""
                />
              </div>
            </div>
            <ButtonPrimary
              loading={loading}
              className="mt-8 w-full"
              onClick={onPayment}
            >
              پرداخت و ثبت نهایی
            </ButtonPrimary>
            {/* <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
              <p className="block relative pr-5">
                <svg
                  className="w-4 h-4 absolute -left-1 top-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9945 16H12.0035"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Learn more{` `}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-slate-900 dark:text-slate-200 underline font-medium"
                >
                  Taxes
                </a>
                <span>
                  {` `}and{` `}
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-slate-900 dark:text-slate-200 underline font-medium"
                >
                  Shipping
                </a>
                {` `} infomation
              </p>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;

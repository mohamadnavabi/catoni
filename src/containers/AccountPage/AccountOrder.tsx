import React, { useState } from "react";
import Prices from "components/Prices";
import ButtonSecondary from "components/shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getOrders } from "store/slices";
import { BASE_URL } from "contains/contants";
import Paginate from "components/shared/Paginate/Paginate";
import { getLowPrice } from "store/slices/cart/helpers";

const AccountOrder = () => {
  const { loading, list } = useAppSelector((state) => state.order);
  const [orderItems, setOrderItems] = useState([]);
  const dispatch = useAppDispatch();

  const renderProductItem = (item: any, index: number) => {
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
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div className="h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={image}
            alt={product.title}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="mr-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">
                  {product.title}
                </h3>
                {Object.keys(variant).length > 0 &&
                  React.Children.toArray(
                    variant.attribute_items.map(
                      (attibuteItem: any, index: number) => {
                        return index > 0 ? (
                          <>
                            <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              <span>
                                {`${attibuteItem.attribute.name}: ${attibuteItem.name} `}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            <span>{`${attibuteItem.attribute.name}: ${attibuteItem.name} `}</span>
                          </div>
                        );
                      }
                    )
                  )}
              </div>
              <Prices {...lowPrices} className="mt-0.5 mr-2" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="ml-2">{item.quantity}</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="hidden sm:inline-block">جفت</span>
            </p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-indigo-600 dark:text-primary-500 "
              >
                ثبت نظر
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrder = (item: any) => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div>
            <p className="text-lg font-semibold">#{item.code}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
              <span>{item.created_at}</span>
              {/* <span className="mx-2">·</span> */}
              {/* <span className="text-primary-500">{item.status.title}</span> */}
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <ButtonSecondary
              sizeClass="py-2.5 px-4 sm:px-6"
              fontSize="text-sm font-medium"
            >
              نمایش
            </ButtonSecondary>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8">
          {item.items.map(renderProductItem)}
        </div>
      </div>
    );
  };

  return (
    <div>
      <CommonLayout>
        <div className="space-y-10 sm:space-y-12">
          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl font-semibold">لیست سفارشات</h2>
          {!loading &&
            Object.keys(orderItems).length > 0 &&
            React.Children.toArray(orderItems.map(renderOrder))}
        </div>

        <Paginate
          list={list}
          onChangePage={(number) => dispatch(getOrders(number))}
          onCurrentPageDataFetched={setOrderItems}
        />
      </CommonLayout>
    </div>
  );
};

export default AccountOrder;

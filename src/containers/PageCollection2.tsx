import React, { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import SectionSliderCollections from "components/SectionSliderLargeProduct";
import SectionPromo1 from "components/SectionPromo1";
import ProductCard from "components/ProductCard";
import { Product } from "data/data";
import SidebarFilters from "./SidebarFilters";
import {
  categorySlice,
  getCategory,
  getColorAttributeItems,
  getMaximumProductPrice,
  getProductsByCategory,
  getSizeAttributeItems,
} from "store/slices";
import { useAppDispatch, useAppSelector } from "store/hooks";
import TabFilters from "./TabFilters";

export interface PageCollection2Props {
  className?: string;
}

const PageCollection2: FC<PageCollection2Props> = ({ className = "" }) => {
  const { slug, category, products } = useAppSelector(
    (state) => state.category
  );

  const dispatch = useAppDispatch();

  const { pathname, search } = useLocation();

  useEffect(() => {
    const pathnameArray = pathname.split("/");
    const slug = pathnameArray[pathnameArray.length - 1];
    dispatch(categorySlice.actions.setSlug(slug));

    return () => {
      dispatch(categorySlice.actions.reset());
    };
  }, [pathname]);

  useEffect(() => {
    if (slug !== "") {
      const params = new URLSearchParams(search);
      dispatch(getCategory(slug));
      dispatch(
        getProductsByCategory({
          slug,
          color: params.getAll("color"),
          size: params.getAll("size"),
        })
      );
      dispatch(getMaximumProductPrice(slug));
      dispatch(getColorAttributeItems());
      dispatch(getSizeAttributeItems());
    }
  }, [slug, search]);

  return (
    <div
      className={`nc-PageCollection2 ${className}`}
      data-nc-id="PageCollection2"
    >
      <Helmet>
        <title>دسته بندی ها | فروشگاه اینترنتی کفش و کتونی</title>
      </Helmet>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              مردانه
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              دسته بندی مردانه
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          {/* <TabFilters /> */}

          <main>
            {/* LOOP ITEMS */}
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 xl:w-1/4 pr-4">
                <SidebarFilters />
              </div>
              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
              <div className="flex-1 ">
                <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                  {products.map((item: Product) => (
                    <ProductCard data={item} key={item.id} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700" />

        <SectionSliderCollections />
        <hr className="border-slate-200 dark:border-slate-700" />

        {/* SUBCRIBES */}
        <SectionPromo1 />
      </div>
    </div>
  );
};

export default PageCollection2;

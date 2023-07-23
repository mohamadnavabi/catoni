import React, { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import NcImage from "components/shared/NcImage/NcImage";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { AttributeItems, Product } from "data/data";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import ButtonSecondary from "components/shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import { BASE_URL } from "contains/contants";
import { getProductByVariantItems, getVariantByTypes } from "utils/apiWorker";
import { useAppDispatch } from "store/hooks";
import { addToCart, cartSlice } from "store/slices";
import NotifyAddToCart from "./NotifyAddToCart";
import { getLowPrice } from "store/slices/cart/helpers";

export interface ProductCardProps {
  className?: string;
  data: Product | any;
  showWishlist?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data,
  showWishlist = false,
}) => {
  const { title, subtitle, price, variants, media, rating_average } = data;
  const colors = getVariantByTypes(variants, "color");
  const image =
    media && media.length
      ? BASE_URL + media[0].path + "/" + JSON.parse(media[0].resized)[1]["name"]
      : "";

  const [activeColor, setActiveColor] = React.useState<AttributeItems | null>(
    colors[0] ?? null
  );
  const [showModalQuickView, setShowModalQuickView] = React.useState(false);

  const dispatch = useAppDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   // dispatch(getCurrentProduct())
  // }, [])

  const handleAddToCart = (attributeItem: AttributeItems) => {
    const product = getProductByVariantItems(
      data,
      activeColor ? [attributeItem, activeColor] : [attributeItem]
    );

    dispatch(addToCart({ ...product, quantity: 1 }));

    toast.custom(
      (t) => (
        <NotifyAddToCart
          productImage={image}
          qualitySelected={1}
          show={t.visible}
          product={product}
        />
      ),
      { position: "bottom-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderColors = () => {
    if (!colors || !colors.length) {
      return null;
    }

    if (colors) {
      return (
        <div className="flex space-x-1 space-x-reverse justify-center">
          {colors.map((variant, index) => (
            <div
              key={index}
              onClick={() => setActiveColor(variant)}
              className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer`}
              title={variant.name}
              style={{
                borderColor:
                  activeColor && activeColor.id === variant.id
                    ? variant.value === "#ffffff"
                      ? "#e0e0e0"
                      : variant.value
                    : "transparent",
              }}
            >
              <div
                className={`absolute inset-0.5 rounded-full z-0 border`}
                style={{
                  backgroundColor: variant.value,
                  borderColor:
                    variant.value === "#ffffff" ? "#e0e0e0" : "transparent",
                }}
              ></div>
            </div>
          ))}
        </div>
      );
    }
  };

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonPrimary
          className="shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          // onClick={() => handleAddToCart()}
        >
          <BagIcon className="w-3.5 h-3.5 mb-0.5" />
          <span className="mr-1">افزودن به سبد</span>
        </ButtonPrimary>
        <ButtonSecondary
          className="mr-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="mr-1">نمایش سریع</span>
        </ButtonSecondary>
      </div>
    );
  };

  const renderSizeList = () => {
    const sizes = getVariantByTypes(variants, "select");

    if (!sizes || !sizes.length) {
      return null;
    }

    return (
      <div className="absolute bottom-0 inset-x-1 space-x-1.5 space-x-reverse flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
        {sizes.map((size, index) => {
          return (
            <div
              key={index}
              className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
              onClick={() => handleAddToCart(size)}
            >
              {size.name}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
        data-nc-id="ProductCard"
      >
        <Link
          to={{ pathname: `/product/${data.slug}`, state: { ...data } }}
          className="absolute inset-0"
        ></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link
            to={{
              pathname: `/product/${data.slug}`,
              state: { ...data },
            }}
            className="block"
          >
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={image}
              className="object-cover w-full h-full drop-shadow-xl"
            />
          </Link>

          <ProductStatus status={"status"} />

          {showWishlist && (
            <LikeButton
              productId={data.id}
              className="absolute top-3 right-3 z-10"
            />
          )}

          {variants.length ? renderSizeList() : renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {renderColors()}

          <div>
            <h2
              className={`nc-ProductCard__title text-base font-semibold transition-colors`}
            >
              {title}
            </h2>
            <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
              {subtitle}
            </p>
          </div>

          <div className="flex justify-between items-end ">
            <div className="flex items-center mb-0.5">
              {rating_average > 0 && (
                <>
                  <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
                  <span className="text-sm mr-1 text-slate-500 dark:text-slate-400">
                    {rating_average}
                    {/* ({Math.floor(Math.random() * 70 + 20)} نظر) */}
                  </span>
                </>
              )}
            </div>

            <Prices {...getLowPrice(data)} />
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default ProductCard;

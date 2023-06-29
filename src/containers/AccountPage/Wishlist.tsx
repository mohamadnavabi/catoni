import { useEffect } from "react";
import ProductCard from "components/ProductCard";
import ButtonSecondary from "components/shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import { useAppDispatch, useAppSelector } from "store/hooks";
import useAuth from "hooks/useAuth";
import { Wishlist as WishlistType, getWishlist } from "store/slices";

const Wishlist = () => {
  const { list, loading } = useAppSelector((state) => state.wishlist);

  const dispatch = useAppDispatch();

  useAuth(() => {
    dispatch(getWishlist());
  }, []);

  return (
    <div>
      <CommonLayout>
        <div className="space-y-10 sm:space-y-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">
              لیست علاقه‌مندی
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
            {list.map((item: WishlistType) => (
              <ProductCard key={item.id} data={item.product} />
            ))}
          </div>
          <div className="flex !mt-20 justify-center items-center">
            <ButtonSecondary loading={loading}>بیشتر</ButtonSecondary>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default Wishlist;

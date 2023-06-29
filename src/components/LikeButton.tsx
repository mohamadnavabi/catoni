import React, { useEffect, useState } from "react";
import { wishlistAPI } from "services/http/api";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addToWishlist, removeFromWishlist } from "store/slices";

export interface LikeButtonProps {
  productId: number;
  type?: "card" | "detail";
  className?: string;
  liked?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  productId,
  type = "card",
  className = "",
  liked = Math.random() > 0.6,
}) => {
  const { list, loading } = useAppSelector((state) => state.wishlist);

  const [isLiked, setIsLiked] = useState(liked);

  const dispatch = useAppDispatch();

  useEffect(() => {
    wishlistAPI.productInWishlist(productId).then(setIsLiked);
  }, [list]);

  const handleLike = () => {
    if (!isLiked) dispatch(addToWishlist({ product_id: productId }));
    else dispatch(removeFromWishlist(productId));
  };

  if (type === "card") {
    return (
      <button
        className={`w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 nc-shadow-lg ${className}`}
        onClick={handleLike}
        disabled={loading}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
            stroke={isLiked ? "#ef4444" : "currentColor"}
            fill={isLiked ? "#ef4444" : "none"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="flow-root">
      <div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
        <span className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <span className="hidden sm:block mr-2">اشتراک گذاری</span>
        </span>
        <button
          className={`py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer `}
          onClick={handleLike}
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${isLiked ? "text-red-500" : ""}`}
            fill={isLiked ? "currentColor" : `none`}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="hidden sm:block mr-2">افزودن به علاقه‌مندی</span>
        </button>
      </div>
    </div>
  );
};

export default LikeButton;

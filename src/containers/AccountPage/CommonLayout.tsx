import React from "react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "store/hooks";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="nc-CommonLayoutProps container">
      <div className="mt-14 sm:mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl xl:text-4xl font-semibold">
              تنظیمات حساب کاربری
            </h2>
          </div>
          <hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>

          <div className="flex space-x-8 space-x-reverse md:space-x-14 md:space-x-reverse overflow-x-auto hiddenScrollbar">
            {[
              {
                name: "اطلاعات حساب کاربری",
                link: "/account",
              },
              {
                name: "سفارشات من",
                link: "/my-orders",
              },
              {
                name: "لیست ها",
                link: "/wishlist",
              },
              {
                name: "تغییر کلمه عبور",
                link: "/change-password",
              },
            ].map((item, index) => (
              <NavLink
                key={index}
                activeClassName="!border-primary-500 font-medium !text-slate-900 dark:!text-slate-200 "
                to={item.link}
                className="block py-5 md:py-8 border-b-2 border-transparent flex-shrink-0 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm sm:text-base"
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <hr className="border-slate-200 dark:border-slate-700"></hr>
        </div>
      </div>
      <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;

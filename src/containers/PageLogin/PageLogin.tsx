import React, { FC } from "react";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface PageLoginProps {
  className?: string;
}

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>ورود | فروشگاه اینترنتی کفش و کتونی</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          ورود
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                ایمیل یا شماره موبایل
              </span>
              <Input
                type="text"
                placeholder="09xxxxxxxxx"
                className="mt-1 text-left"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                کلمه عبور
                <Link to="/forgot-pass" className="text-sm text-green-600">
                  فراموشی کلمه عبور
                </Link>
              </span>
              <Input type="password" className="mt-1 text-left" />
            </label>
            <ButtonPrimary type="submit">ورود</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            <Link className="text-green-600" to="/signup">
              ثبت نام در کتونی
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;

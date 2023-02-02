import React, { FC } from "react";
import facebookSvg from "assets/images/temp/Facebook.svg";
import twitterSvg from "assets/images/temp/Twitter.svg";
import googleSvg from "assets/images/temp/Google.svg";
import { Helmet } from "react-helmet";
import Input from "components/shared/Input/Input";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";

export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>ثبت نام | فروشگاه اینترنتی کفش و کتونی</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          ثبت نام
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* OR */}
          {/* <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div> */}
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                شماره موبایل
              </span>
              <Input
                type="number"
                placeholder="09xxxxxxxxx"
                className="mt-1 text-left"
              />
            </label>
            {/* <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input type="password" className="mt-1" />
            </label> */}
            <ButtonPrimary type="submit">ادامه</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            قبلا ثبت نام کرده اید؟ {` `}
            <Link className="text-green-600" to="/login">
              ورود
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;

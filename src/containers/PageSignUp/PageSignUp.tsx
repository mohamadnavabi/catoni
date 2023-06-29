import React, { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Input from "components/shared/Input/Input";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { generatePasscode } from "store/slices";
import { getDeviceIp } from "utils/device";
import { validateMobile } from "utils/validation";
import toast from "react-hot-toast";

type FormValues = {
  username: string;
};

export interface PageSignUpProps {
  className?: string;
}

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const [ip, setIp] = useState("");

  const { loading, deviceInfo, passcodeResult } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const ip = await getDeviceIp();
      setIp(ip);
    })();
  }, []);

  useEffect(() => {
    if (passcodeResult.passcode_count > 0) {
      if (passcodeResult.user_exist) {
        toast.error("شما قبلا عضو شده‌اید لطفا وارد شوید.");
      } else {
        history.push("verify-passcode");
      }
    }
  }, [passcodeResult]);

  const onSubmitForm = async ({ username }: FormValues) => {
    dispatch(
      generatePasscode({ ip, device_info: deviceInfo, mobile: username })
    );
  };

  const initialValues: FormValues = { username: "" };

  const registerValidate = ({ username }: FormValues) => {
    const errors: any = {};

    if (username === "") {
      errors.username = "شماره موبایل لازم است";
    } else if (!validateMobile(username)) {
      errors.username = "فرمت شماره موبایل اشتباه است";
    }

    return errors;
  };

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
          <Formik
            initialValues={initialValues}
            validate={registerValidate}
            onSubmit={onSubmitForm}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    شماره موبایل
                  </span>
                  <Input
                    name="username"
                    type="text"
                    placeholder="09xxxxxxxxx"
                    className="mt-1 text-left"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  <span className="text-red-500 text-xs">
                    {errors.username && touched.username && errors.username}
                  </span>
                </label>
                <ButtonPrimary
                  type="submit"
                  disabled={touched.username && !!errors.username}
                  loading={loading}
                >
                  ادامه
                </ButtonPrimary>
              </form>
            )}
          </Formik>

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

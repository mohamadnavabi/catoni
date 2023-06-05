import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import Input from "components/shared/Input/Input";
import { Link, useHistory } from "react-router-dom";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import { Formik } from "formik";
import { validateMobile } from "utils/validation";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { login, storeCart } from "store/slices";

type FormValues = {
  username: string;
  password: string;
};

export interface PageLoginProps {
  className?: string;
}

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const { loading, user, deviceInfo } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user.token !== "") {
      history.goBack();
      dispatch(storeCart(items));
    }
  }, [user]);

  const onSubmitForm = ({ username, password }: FormValues) => {
    dispatch(login({ mobile: username, password, device_info: deviceInfo }));
  };

  const initialValues: FormValues = { username: "", password: "" };

  const loginValidate = ({ username, password }: FormValues) => {
    const errors: any = {};

    if (username === "") {
      errors.username = "شماره موبایل لازم است";
    } else if (!validateMobile(username)) {
      errors.username = "فرمت شماره موبایل اشتباه است";
    } else if (password === "") {
      errors.password = "کلمه عبور لازم است";
    }

    return errors;
  };

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
          <Formik
            initialValues={initialValues}
            validate={loginValidate}
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
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                    کلمه عبور
                    <Link to="/forgot-pass" className="text-sm text-green-600">
                      فراموشی کلمه عبور
                    </Link>
                  </span>
                  <Input
                    name="password"
                    type="password"
                    className="mt-1 text-left"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <span className="text-red-500 text-xs">
                    {errors.password && touched.password && errors.password}
                  </span>
                </label>
                <ButtonPrimary
                  type="submit"
                  disabled={
                    (touched.username && !!errors.username) ||
                    (touched.password && !!errors.password)
                  }
                  loading={loading}
                >
                  ورود
                </ButtonPrimary>
              </form>
            )}
          </Formik>

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

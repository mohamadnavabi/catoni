import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import Input from "components/shared/Input/Input";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { register, verifyPasscode, editNumber, storeCart } from "store/slices";

type FormValues = {
  passcode: string;
  password: string;
  password_confirmation: string;
};

export interface PageSignUpProps {
  className?: string;
}

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const { loading, deviceInfo, passcodeResult, passcodeVerified, user } =
    useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (passcodeResult.passcode_count === 0) history.goBack();
  }, [passcodeResult]);

  useEffect(() => {
    if (user && user.token !== "") {
      history.push("/");
      dispatch(storeCart(items));
      sendCartItemsToServer();
    }
  }, [user]);

  const sendCartItemsToServer = () => {
    console.log(items);
  };

  const onSubmitForm = async ({
    passcode,
    password,
    password_confirmation,
  }: FormValues) => {
    if (!passcodeVerified) {
      dispatch(verifyPasscode({ mobile: passcodeResult.mobile, passcode }));
    } else {
      dispatch(
        register({
          mobile: passcodeResult.mobile,
          device_info: deviceInfo,
          passcode,
          password,
          password_confirmation,
        })
      );
    }
  };

  const initialValues: FormValues = {
    passcode: "",
    password: "",
    password_confirmation: "",
  };

  const registerValidate = ({
    passcode,
    password,
    password_confirmation,
  }: FormValues) => {
    const errors: any = {};

    if (!passcodeVerified) {
      if (passcode === "") {
        errors.passcode = "کد تایید لازم است";
      }
    } else {
      if (password === "") {
        errors.password = "کلمه عبور لازم است";
      } else if (password.length < 6) {
        errors.password = "کلمه عبور حداقل باید 6 کاراکتر باشد";
      } else if (password_confirmation === "") {
        errors.password_confirmation = "تکرار کلمه عبور لازم است";
      } else if (password !== password_confirmation) {
        errors.password_confirmation = "تکرار کلمه عبور همخوانی ندارد";
      }
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
          تایید ثبت نام
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
                {!passcodeVerified ? (
                  <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      کد تایید
                    </span>
                    <Input
                      name="passcode"
                      type="text"
                      placeholder="XXXXX"
                      className="mt-1 text-center"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.passcode}
                    />
                    <span className="text-red-500 text-xs">
                      {errors.passcode && touched.passcode && errors.passcode}
                    </span>
                  </label>
                ) : (
                  <>
                    <label className="block">
                      <span className="text-neutral-800 dark:text-neutral-200">
                        کلمه عبور
                      </span>
                      <Input
                        name="password"
                        type="password"
                        placeholder="******"
                        className="mt-1 text-center"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <span className="text-red-500 text-xs">
                        {errors.password && touched.password && errors.password}
                      </span>
                    </label>
                    <label className="block">
                      <span className="text-neutral-800 dark:text-neutral-200">
                        تکرار کلمه عبور
                      </span>
                      <Input
                        name="password_confirmation"
                        type="password"
                        placeholder="******"
                        className="mt-1 text-center"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password_confirmation}
                      />
                      <span className="text-red-500 text-xs">
                        {errors.password_confirmation &&
                          touched.password_confirmation &&
                          errors.password_confirmation}
                      </span>
                    </label>
                  </>
                )}
                <ButtonPrimary
                  type="submit"
                  disabled={touched.passcode && !!errors.passcode}
                  loading={loading}
                >
                  {passcodeVerified ? "ثبت نام" : "ادامه"}
                </ButtonPrimary>
              </form>
            )}
          </Formik>

          {!passcodeVerified && (
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              <Link
                className="text-green-600"
                to="/signup"
                onClick={() => dispatch(editNumber())}
              >
                ویرایش شماره موبایل
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;

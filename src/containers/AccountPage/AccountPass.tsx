import Label from "components/Label/Label";
import React, { useEffect } from "react";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import Input from "components/shared/Input/Input";
import CommonLayout from "./CommonLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { UpdatePasswordParams, updatePassword } from "store/slices";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useHistory } from "react-router-dom";

const AccountPass = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user === null || user.token === "") history.push("/login");
  }, [user]);

  const onSubmit = (values: UpdatePasswordParams) => {
    dispatch(updatePassword(values));
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required("کلمه عبور فعلی لازم است")
      .min(6, "کلمه عبور فعلی نمی‌تواند کمتر از 6 کاراکتر باشد"),
    password: Yup.string()
      .required("کلمه عبور جدید لازم است")
      .min(6, "کلمه عبور جدید نمی‌تواند کمتر از 6 کاراکتر باشد")
      .notOneOf(
        [Yup.ref("currentPassword")],
        "کلمه عبور جدید باید متفاوت از کلمه عبور فعلی باشد"
      ),
    confirmPassword: Yup.string()
      .required("تکرار کلمه عبور جدید لازم است")
      .min(6, "تکرار کلمه عبور جدید نمی‌تواند کمتر از 6 کاراکتر باشد")
      .notOneOf(
        [Yup.ref("currentPassword")],
        "کلمه عبور جدید باید متفاوت از کلمه عبور فعلی باشد"
      )
      .oneOf([Yup.ref("password")], "تکرار کلمه عبور جدید همخوانی ندارد"),
  });

  const initialValues: UpdatePasswordParams = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div>
      <CommonLayout>
        <div className="space-y-10 sm:space-y-12">
          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl font-semibold">کلمه عبور</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <form
                onSubmit={formik.handleSubmit}
                className=" max-w-xl space-y-6"
              >
                <div>
                  <Label>کلمه عبور فعلی</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    className="mt-1.5"
                    formik={formik}
                  />
                </div>
                <div>
                  <Label>کلمه عبور جدید</Label>
                  <Input
                    id="password"
                    type="password"
                    className="mt-1.5"
                    autoComplete="new-password"
                    formik={formik}
                  />
                </div>
                <div>
                  <Label>تکرار کلمه عبور جدید</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="mt-1.5"
                    autoComplete="new-password"
                    formik={formik}
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <ButtonPrimary type="submit" loading={loading}>
                    تغییر کلمه عبور
                  </ButtonPrimary>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPass;

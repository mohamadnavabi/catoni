import React, { FC } from "react";
import Label from "components/Label/Label";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import Input from "components/shared/Input/Input";
import InputError from "components/shared/InputError/InputError";
import Select from "components/shared/Select/Select";
import Textarea from "components/shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { updateProfile } from "store/slices";
import { UserParams } from "data/data";
import { Datepicker } from "@ijavad805/react-datepicker";
import moment from "moment";

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
  const { user, loading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const onSubmit = (values: UserParams) => {
    dispatch(updateProfile(values));
  };

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("نام لازم است")
      .min(3, "نام نمی‌تواند کمتر از 10 کاراکتر باشد"),
    last_name: Yup.string()
      .required("نام خانوادگی لازم است")
      .min(3, "نام خانوادگی نمی‌تواند کمتر از 10 کاراکتر باشد"),
    national_id: Yup.string()
      .required("کدملی لازم است")
      .matches(/^[0-9]{10}$/, "کدملی نامعتبر است"),
    date_of_birth: Yup.string().required("تاریخ تولد لازم است"),
  });

  const initialValues: UserParams = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    national_id: user?.national_id,
    mobile: user?.mobile,
    date_of_birth: user?.date_of_birth,
    gender: "male",
    banking_number: user?.banking_number,
    about: user?.about,
    // email: user?.email,
    // email_verification_code: user?.email_verification_code,
  };

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>تنظیمات | فروشگاه اینترنتی کفش و کتونی</title>
      </Helmet>
      <CommonLayout>
        <div className="space-y-10 sm:space-y-12">
          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl font-semibold">اطلاعات حساب</h2>
          <div className="flex flex-col md:flex-row">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex-grow mt-10 md:mt-0 max-w-3xl space-y-6"
                >
                  <div className="mt-1.5 flex">
                    <div className="flex-1 ml-3">
                      <Label>
                        نام<span className="text-xs text-red-500">*</span>
                      </Label>
                      <Input
                        className="mt-1.5"
                        id="first_name"
                        formik={formik}
                      />
                    </div>
                    <div className="flex-1">
                      <Label>
                        نام خانوادگی
                        <span className="text-xs text-red-500">*</span>
                      </Label>
                      <Input
                        className="mt-1.5"
                        id="last_name"
                        formik={formik}
                      />
                    </div>
                  </div>

                  {/* ---- */}
                  <div className="flex">
                    <div className="flex-1 ml-3">
                      <Label>شماره همراه</Label>
                      <div className="mt-1.5 flex">
                        <Input
                          disabled
                          className="!rounded-l-none"
                          id="mobile"
                          formik={formik}
                        />
                        <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                          <i className="text-2xl las la-phone-volume"></i>
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <Label>
                        ایمیل
                        <span className="text-xs text-gray-500">(بزودی)</span>
                      </Label>
                      <div className="mt-1.5 flex">
                        <Input
                          disabled
                          className="!rounded-l-none"
                          id="email"
                          placeholder=""
                          formik={formik}
                        />
                        <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                          <i className="text-2xl las la-envelope"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ---- */}
                  <div className="flex">
                    <div className="max-w-lg flex-1">
                      <Label>
                        تاریخ تولد
                        <span className="text-xs text-red-500">*</span>
                      </Label>
                      <div className="mt-1.5 flex ml-3">
                        <Input
                          className="!rounded-l-none"
                          id="date_of_birth"
                          type="hidden"
                          {...formik.getFieldProps("date_of_birth")}
                        />

                        <Datepicker
                          closeWhenSelectADay
                          value={moment(formik.values.date_of_birth)}
                          input={
                            <Input
                              className="!rounded-l-none"
                              id="date_of_birth"
                              {...formik.getFieldProps("date_of_birth")}
                            />
                          }
                          onChange={(val: any) => {
                            formik.handleChange("date_of_birth")(
                              val.format("YYYY/MM/DD")
                            );
                          }}
                        />
                        <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                          <i className="text-2xl las la-calendar"></i>
                        </span>
                      </div>
                      <InputError
                        isTouched={formik.touched.date_of_birth}
                        error={formik.errors.date_of_birth}
                      />
                    </div>
                    <div className=" flex-1 ml-3">
                      <Label>
                        جنسیت<span className="text-xs text-red-500">*</span>
                      </Label>
                      <Select
                        className="mt-1.5"
                        id="gender"
                        {...formik.getFieldProps("gender")}
                      >
                        <option value="male">مرد</option>
                        <option value="female">زن</option>
                      </Select>
                      <InputError
                        isTouched={formik.touched.gender}
                        error={formik.errors.gender}
                      />
                    </div>
                    <div className="flex-1">
                      <Label>
                        کدملی
                        <span className="text-xs text-red-500">*</span>
                      </Label>
                      <Input
                        className="mt-1.5"
                        id="national_id"
                        formik={formik}
                      />
                    </div>
                  </div>

                  {/* ---- */}
                  <div>
                    <Label>درباره من</Label>
                    <Textarea
                      className="mt-1.5"
                      id="about"
                      {...formik.getFieldProps("about")}
                    />
                    <InputError
                      isTouched={formik.touched.about}
                      error={formik.errors.about}
                    />
                  </div>
                  <div className="pt-2 flex justify-end">
                    <ButtonPrimary loading={loading} type="submit">
                      ویرایش حساب کاربری
                    </ButtonPrimary>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;

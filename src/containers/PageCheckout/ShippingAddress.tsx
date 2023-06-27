import React, { FC, useEffect, useState } from "react";
import Label from "components/Label/Label";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import ButtonSecondary from "components/shared/Button/ButtonSecondary";
import Input from "components/shared/Input/Input";
import Textarea from "components/shared/Textarea/Textarea";
import Modal from "components/shared/Modal/Modal";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import SearchableSelect from "components/shared/SearchableSelect/SearchableSelect";
import { CityType, cities as citiesData } from "data/cities";
import { StateType, states } from "data/states";
import { Address, AddressParams } from "data/data";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { storeAddress, touchAddress, updateAddress } from "store/slices";
import { EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import Radio from "components/shared/Radio/Radio";
import ButtonThird from "components/shared/Button/ButtonThird";

const tehranCities = citiesData.filter((city) => city.state_id === 8);
const initialValues: AddressParams = {
  title: "",
  postal_address: "",
  postal_code: "",
  phone: "",
  plate: "",
  receptor_first_name: "",
  receptor_last_name: "",
  receptor_mobile: "",
  type: "home",
  city_id: 0,
};

interface Props {
  isActive: boolean;
  onCloseActive: () => void;
  onOpenActive: () => void;
}

const ShippingAddress: FC<Props> = ({
  isActive,
  onCloseActive,
  onOpenActive,
}) => {
  const [addressModalIsOpen, setAddressModalIsOpen] = useState(false);
  const [addressFormModalIsOpen, setAddressFormModalIsOpen] = useState(false);
  const [cities, setCities] = useState<CityType[]>(tehranCities);
  const [addressForEdit, setAddressForEdit] =
    useState<AddressParams>(initialValues);

  const { addressFormButtonLoading, addresses, selectedAddress } =
    useAppSelector((state) => state.checkout);

  const isEditMode = addressForEdit.hasOwnProperty("id");

  useEffect(() => {
    if (addresses.length) {
      setAddressModalIsOpen(false);
      setAddressFormModalIsOpen(false);
      setAddressForEdit(initialValues);
    }
  }, [addresses]);

  useEffect(() => {
    if (addressFormModalIsOpen === false) setCities(tehranCities);
  }, [addressFormModalIsOpen]);

  const dispatch = useAppDispatch();

  const renderAddressModal = () => (
    <Modal
      show={addressModalIsOpen}
      onClose={() => setAddressModalIsOpen(false)}
      maxWidth="max-w-3xl"
    >
      <div className="flex-col items-center justify-center mt-3">
        <div className="flex direction-row items-center justify-center py-4">
          <ButtonPrimary
            sizeClass="px-4 py-2 sm:px-5"
            onClick={() => {
              setAddressModalIsOpen(false);
              setAddressFormModalIsOpen(true);
            }}
          >
            <MapPinIcon className="w-7 h-7 pl-1" /> اضافه کردن آدرس جدید
          </ButtonPrimary>
        </div>

        {addresses.length === 0 ? (
          <div className="pb-6 border-t">
            <span className="text-center block text-black pt-4">
              شما تا کنون آدرسی ثبت نکرده‌اید
            </span>
            <span className="text-center block text-gray-500 text-sm mt-3">
              لطفا آدرس پستی خود را اضافه کنید
            </span>
          </div>
        ) : (
          <div className="p-6">
            {React.Children.toArray(
              addresses.map((address: Address, index: number) => (
                <div
                  className={`flex direction-row items-center border-t py-2 ${
                    index !== addresses.length - 1 && "border-b"
                  }`}
                >
                  <div
                    className="flex direction-row items-center cursor-pointer flex-1"
                    onClick={() => dispatch(touchAddress(address))}
                  >
                    <Radio
                      id="Address-type-home"
                      name="Address-type"
                      checked={
                        (selectedAddress &&
                          selectedAddress.id === address.id) ||
                        index === 0
                      }
                      className="pl-5"
                    />
                    <div className="flex-1">
                      <p className="text-lg py-2">
                        {address.title} | {address.postal_address}
                      </p>
                      <div className="flex direction-row items-center text-xs text-zinc-500 py-1">
                        <EnvelopeIcon className="w-5 h-5 pl-1" />
                        {address.postal_code}
                      </div>
                      <div className="flex direction-row items-center text-xs text-zinc-500 py-1">
                        <PhoneIcon className="w-5 h-4 pl-1" />
                        {address.receptor_mobile}
                      </div>
                      <div className="flex direction-row items-center text-xs text-zinc-500 py-1">
                        <UserIcon className="w-5 h-5 pl-1" />
                        {address.receptor_first_name}{" "}
                        {address.receptor_last_name}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setAddressForEdit({
                        ...address,
                        city_id: address.city.id,
                      });
                      setCities(
                        citiesData.filter(
                          (city) => city.state_id === address.city.state.id
                        )
                      );
                      setAddressModalIsOpen(false);
                      setAddressFormModalIsOpen(true);
                    }}
                    className="flex direction-row items-center text-cyan-500 py-2 text-sm"
                  >
                    ویرایش
                    <ChevronLeftIcon className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Modal>
  );

  const onSubmit = (values: any) => {
    if (isEditMode) dispatch(updateAddress(values));
    else dispatch(storeAddress(values));
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("عنوان لازم است")
      .max(50, "عنوان نمی‌تواند بیشتر از 50 کاراکتر باشد"),
    postal_address: Yup.string()
      .required("آدرس پستی لازم است")
      .min(10, "آدرس پستی نمی‌تواند کمتر از 10 کاراکتر باشد"),
    postal_code: Yup.string()
      .required("کد پستی لازم است")
      .min(10, "کد پستی نمی‌تواند کمتر از 10 کاراکتر باشد")
      .max(20, "کد پستی نمی‌تواند بیشتر از 20 کاراکتر باشد"),
    plate: Yup.string()
      .required("پلاک لازم است")
      .max(10, "پلاک نمی‌تواند بیشتر از 10 کاراکتر باشد"),
    receptor_first_name: Yup.string()
      .required("نام تحویل گیرنده لازم است")
      .max(20, "نام تحویل گیرنده نمی‌تواند بیشتر از 20 کاراکتر باشد"),
    receptor_last_name: Yup.string()
      .required("نام خانوادگی تحویل گیرنده لازم است")
      .max(20, "نام خانوادگی تحویل گیرنده نمی‌تواند بیشتر از 20 کاراکتر باشد"),
    receptor_mobile: Yup.string()
      .required("تلفن همراه تحویل گیرنده لازم است")
      .max(20, "تلفن همراه تحویل گیرنده نمی‌تواند بیشتر از 20 کاراکتر باشد"),
  });

  const renderAddressFormModal = () => {
    const defaultState = isEditMode
      ? states.find((state) => state.value === addressForEdit.city?.state.id)
      : states[7];
    const defaultCity = isEditMode
      ? cities.find((city) => city.value === addressForEdit.city?.id)
      : undefined;

    return (
      <Modal
        show={addressFormModalIsOpen}
        onClose={() => setAddressFormModalIsOpen(false)}
        maxWidth="max-w-2xl"
      >
        <Formik
          enableReinitialize
          initialValues={addressForEdit}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div
                className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
                  isActive ? "block" : "hidden"
                }`}
              >
                {/* ============ */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3">
                  {isEditMode && (
                    <Input id="id" type="hidden" value={addressForEdit.id} />
                  )}
                  <div>
                    <Label className="text-sm">
                      عنوان
                      <span className="text-xs text-red-500">*</span>
                    </Label>
                    <Input
                      className="mt-1.5"
                      id="title"
                      placeholder="نمونه: خانه"
                      {...formik.getFieldProps("title")}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <span className="pr-3 text-red-500 text-xs italic">
                        {formik.errors.title}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm">
                      شهر
                      <span className="text-xs text-red-500">*</span>
                    </Label>
                    <SearchableSelect
                      isDisabled={isEditMode}
                      className="mt-1.5"
                      options={states}
                      defaultValue={defaultState}
                      onChange={(state: any) =>
                        setCities(
                          citiesData.filter(
                            (city) => city.state_id === state.value
                          )
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-sm">
                      شهرستان
                      <span className="text-xs text-red-500">*</span>
                    </Label>
                    <SearchableSelect
                      isDisabled={isEditMode}
                      id="city"
                      className="mt-1.5"
                      options={cities}
                      defaultValue={defaultCity}
                      onChange={(city: any) =>
                        formik.setFieldValue("city_id", city.value)
                      }
                    />
                  </div>
                </div>

                {/* ============ */}
                <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3 sm:space-x-reverse">
                  <div className="flex-1">
                    <Label className="text-sm">
                      آدرس پستی
                      <span className="text-xs text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="postal_address"
                      className="mt-1.5"
                      rows={4}
                      {...formik.getFieldProps("postal_address")}
                    />
                    {formik.touched.postal_address &&
                      formik.errors.postal_address && (
                        <span className="pr-3 text-red-500 text-xs italic">
                          {formik.errors.postal_address}
                        </span>
                      )}
                  </div>
                </div>

                {/* ============ */}
                <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3 sm:space-x-reverse">
                  <div>
                    <Label className="text-sm">
                      پلاک
                      <span className="text-xs text-red-500">*</span>
                    </Label>
                    <Input
                      id="plate"
                      className="mt-1.5"
                      {...formik.getFieldProps("plate")}
                    />
                    {formik.touched.plate && formik.errors.plate && (
                      <span className="pr-3 text-red-500 text-xs italic">
                        {formik.errors.plate}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm">واحد</Label>
                    <Input
                      id="unit"
                      className="mt-1.5"
                      {...formik.getFieldProps("unit")}
                    />
                  </div>
                  <div>
                    <Label className="text-sm">
                      کد پستی
                      <span className="text-xs text-red-500">*</span>
                    </Label>
                    <Input
                      id="postal_code"
                      className="mt-1.5"
                      {...formik.getFieldProps("postal_code")}
                    />
                    {formik.touched.postal_code &&
                      formik.errors.postal_code && (
                        <span className="pr-3 text-red-500 text-xs italic">
                          {formik.errors.postal_code}
                        </span>
                      )}
                  </div>
                </div>

                {/* ============ */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3">
                  <div>
                    <Label className="text-sm">
                      نام تحویل گیرنده
                      <span className="text-xs text-red-500">*</span>
                    </Label>
                    <Input
                      id="receptor_first_name"
                      className="mt-1.5"
                      {...formik.getFieldProps("receptor_first_name")}
                    />
                    {formik.touched.receptor_first_name &&
                      formik.errors.receptor_first_name && (
                        <span className="pr-3 text-red-500 text-xs italic">
                          {formik.errors.receptor_first_name}
                        </span>
                      )}
                  </div>
                  <div>
                    <Label className="text-sm">
                      نام خانوادگی تحویل گیرنده
                      <span className="text-xs text-red-500">*</span>
                    </Label>
                    <Input
                      id="receptor_last_name"
                      className="mt-1.5"
                      {...formik.getFieldProps("receptor_last_name")}
                    />
                    {formik.touched.receptor_last_name &&
                      formik.errors.receptor_last_name && (
                        <span className="pr-3 text-red-500 text-xs italic">
                          {formik.errors.receptor_last_name}
                        </span>
                      )}
                  </div>
                  <div>
                    <Label className="text-sm">
                      تلفن همراه تحویل گیرنده
                      <span className="text-xs text-red-500">*</span>
                    </Label>
                    <Input
                      id="receptor_mobile"
                      className="mt-1.5"
                      placeholder="09123456789"
                      {...formik.getFieldProps("receptor_mobile")}
                    />
                    {formik.touched.receptor_mobile &&
                      formik.errors.receptor_mobile && (
                        <span className="pr-3 text-red-500 text-xs italic">
                          {formik.errors.receptor_mobile}
                        </span>
                      )}
                  </div>
                </div>

                {/* ============ */}
                <div>
                  <Label className="text-sm">نوع آدرس</Label>
                  <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div className="flex items-center text-sm sm:text-base focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500">
                      <Field
                        type="radio"
                        name="type"
                        id="home"
                        value="home"
                        className={`focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6`}
                      />
                      <label
                        htmlFor="home"
                        className="pr-2.5 sm:pr-3 block text-slate-900 dark:text-slate-100 select-none"
                        dangerouslySetInnerHTML={{
                          __html: `<span class="text-sm font-medium">خانه <span class="font-light">(تحویل در بازه 9 الی 22)</span></span>`,
                        }}
                      ></label>
                    </div>
                    <div className="flex items-center text-sm sm:text-base focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500">
                      <Field
                        type="radio"
                        name="type"
                        id="work"
                        value="work"
                        className={`focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6`}
                      />
                      <label
                        htmlFor="work"
                        className="pr-2.5 sm:pr-3 block text-slate-900 dark:text-slate-100 select-none"
                        dangerouslySetInnerHTML={{
                          __html: `<span class="text-sm font-medium">محل کار <span class="font-light">(تحویل در بازه 9 الی 14)</span> </span>`,
                        }}
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-end lg:rounded-2xl bg-white">
                {isEditMode && (
                  <ButtonThird
                    className="mt-3 sm:mt-0 sm:ml-3"
                    onClick={() => {
                      setAddressFormModalIsOpen(false);
                      setAddressForEdit(initialValues);
                    }}
                  >
                    انصراف
                  </ButtonThird>
                )}
                <ButtonPrimary
                  loading={addressFormButtonLoading}
                  type="submit"
                  sizeClass="px-4 py-2 sm:px-5"
                >
                  {isEditMode ? "ذخیره" : "اضافه کردن"}
                </ButtonPrimary>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    );
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
      <div className="p-6 flex flex-col sm:flex-row items-start">
        <span className="hidden sm:block">
          <svg
            className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <div className="sm:mr-8">
          <h3 className=" text-slate-700 dark:text-slate-300 flex ">
            <span className="uppercase">آدرس تحویل</span>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-5 h-5 mr-3 text-slate-900 dark:text-slate-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </h3>
          <div className="font-semibold mt-1 text-sm">
            <span className="">
              {selectedAddress
                ? `${selectedAddress.city.state.name}، ${selectedAddress.city.name}، ${selectedAddress.postal_address}`
                : "لطفا آدرس پستی خود را اضافه کنید"}
            </span>
          </div>
        </div>
        <ButtonSecondary
          sizeClass="py-2 px-4 "
          fontSize="text-sm font-medium"
          className="bg-slate-50 dark:bg-slate-800 mt-5 sm:mt-0 sm:mr-auto !rounded-lg"
          onClick={() => setAddressModalIsOpen(true)}
        >
          تغییر یا ویرایش
        </ButtonSecondary>
      </div>

      {renderAddressModal()}
      {renderAddressFormModal()}
    </div>
  );
};

export default ShippingAddress;

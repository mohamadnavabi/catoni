import React, { useCallback, useEffect, useState } from "react";

import Checkbox from "components/shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import MySwitch from "components/MySwitch";
import { AttributeItems, Category } from "data/data";
import { useAppSelector } from "store/hooks";
import { Link, useHistory, useLocation } from "react-router-dom";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { currencyFormat } from "utils/number";

const SidebarFilters = () => {
  const { slug, category, colors, sizes, maximumProductPrice } = useAppSelector(
    (state) => state.category
  );

  const { pathname, search } = useLocation();
  const history = useHistory();

  //
  const [isOnSale, setIsIsOnSale] = useState(true);
  const [rangePrices, setRangePrices] = useState([100, 500]);
  const [colorsState, setColorsState] = useState<string[]>([]);
  const [sizesState, setSizesState] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    setColorsState(params.getAll("color"));
    setSizesState(params.getAll("size"));
  }, []);

  useEffect(() => {
    handleChangeURL();
  }, [colorsState, sizesState]);

  const handleChangeURL = () => {
    const params = new URLSearchParams();
    colorsState.forEach((color) => params.append(`color`, color));
    sizesState.forEach((size) => params.append(`size`, size));
    history.push({
      pathname,
      search: params.toString(),
    });
  };

  const handleChangeColors = (checked: boolean, name: string) => {
    checked
      ? setColorsState([...colorsState, name])
      : setColorsState(colorsState.filter((i) => i !== name));
  };

  const handleChangeSizes = (checked: boolean, name: string) => {
    checked
      ? setSizesState([...sizesState, name])
      : setSizesState(sizesState.filter((i) => i !== name));
  };

  const renderCategoryItem = (item: Category, padding = "pr-2") => {
    const isSelected = item.slug === slug;

    return (
      <div
        key={item.id}
        className={`flex row items-center ${padding} ${
          isSelected ? "underline" : ""
        }`}
      >
        <ChevronDownIcon className="w-4 h-4" aria-hidden="true" />
        <Link
          to={isSelected ? "#" : `/category/${item.slug}`}
          className="text-sm font-normal pr-2 pl-2 disabled"
          aria-disabled={true}
        >
          {item.name}
        </Link>
        {isSelected && <CheckIcon className="w-4 h-4" aria-hidden="true" />}
      </div>
    );
  };

  const renderTabsCategories = () => {
    return (
      <div className="relative flex flex-col pb-8 space-y-4">
        <h3 className="font-semibold mb-2.5">دسته بندی</h3>
        {category ? (
          <>
            {renderCategoryItem(category)}
            {category.children.map((item: Category) =>
              renderCategoryItem(item, "pr-4")
            )}
          </>
        ) : null}
      </div>
    );
  };

  const renderTabsColor = () => {
    if (!colors) return null;

    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">رنگ ها</h3>
        {colors.attribute_items.map((item: AttributeItems) => (
          <div key={item.name} className="">
            <Checkbox
              sizeClassName="w-5 h-5"
              labelClassName="text-sm font-normal"
              name={item.name}
              label={item.name}
              defaultChecked={colorsState.includes(item.name)}
              onChange={(checked) => handleChangeColors(checked, item.name)}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderTabsSize = () => {
    if (!sizes) return null;

    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">اندازه ها</h3>
        {sizes.attribute_items.map((item: AttributeItems) => (
          <div key={item.name} className="">
            <Checkbox
              name={item.name}
              label={item.name}
              defaultChecked={sizesState.includes(item.name)}
              onChange={(checked) => handleChangeSizes(checked, item.name)}
              sizeClassName="w-5 h-5"
              labelClassName="text-sm font-normal"
            />
          </div>
        ))}
      </div>
    );
  };

  const renderTabsPriceRage = useCallback(() => {
    const max = Number(maximumProductPrice);
    if (max === 0) return null;

    return (
      <div className="relative flex flex-col py-8 space-y-5 pr-3">
        <div className="space-y-5">
          {/* <span className="font-semibold">Price range</span> */}
          <Slider
            reverse
            range
            min={0}
            max={max}
            step={10000}
            defaultValue={[0, max]}
            allowCross={false}
            onChange={(_input: number | number[]) =>
              setRangePrices(_input as number[])
            }
          />
        </div>

        <div className="flex justify-between space-x-5 space-x-reverse">
          <div>
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              حداقل قیمت
            </label>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                تومان
              </span>
              <input
                type="text"
                name="minPrice"
                disabled
                id="minPrice"
                className="block w-32 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                value={currencyFormat(rangePrices[0])}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 text-left"
            >
              حداکثر قیمت
            </label>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                تومان
              </span>
              <input
                type="text"
                disabled
                name="maxPrice"
                id="maxPrice"
                className="block w-32 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                value={currencyFormat(rangePrices[1])}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }, [rangePrices, maximumProductPrice]);

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {renderTabsCategories()}
      {renderTabsColor()}
      {renderTabsSize()}
      {renderTabsPriceRage()}
      <div className="py-8 pr-2">
        <MySwitch
          label="فروش ویژه"
          desc="فقط کتونی های فروش ویژه"
          enabled={isOnSale}
          onChange={setIsIsOnSale}
        />
      </div>
    </div>
  );
};

export default SidebarFilters;

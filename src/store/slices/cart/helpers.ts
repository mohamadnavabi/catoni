import { PayloadAction, current } from "@reduxjs/toolkit";
import { currencyFormat } from "utils/number";
import { CartItem, CartState, MessagesType } from "./interfaces";

export function handleItems(state: CartState, action: PayloadAction<CartItem>) {
  const findedIndex = state.items.findIndex(
    (item) =>
      item.id === action.payload.id &&
      item.variants[0].id === action.payload.variants[0].id
  );

  const items =
    findedIndex === -1
      ? state.items.concat(action.payload)
      : state.items
          .filter((item) => item.id !== action.payload.id)
          .concat({
            ...action.payload,
            quantity:
              state.items[findedIndex].quantity + action.payload.quantity,
          });

  return items;
}

export const handleExpenses = (items: CartItem[]) => ({
  tax: 0,
  shipping: 0,
  discount: items.reduce((prev, current) => {
    const currentPrices = getPrice(current);
    return (
      prev +
      (currentPrices.sale_price > 0
        ? currentPrices.sale_price - currentPrices.price
        : 0) *
        current.quantity
    );
  }, 0),
  totalWithoutDiscount: items.reduce((prev, current) => {
    const currentPrices = getPrice(current);
    return prev + currentPrices.price * current.quantity;
  }, 0),
  total: items.reduce((prev, current) => {
    const currentPrices = getPrice(current);
    return (
      prev +
      (currentPrices.sale_price > 0
        ? currentPrices.sale_price
        : currentPrices.price) *
        current.quantity
    );
  }, 0),
});

export function compareCart(prev: CartItem[], next: any): CartItem[] {
  let items = next.map((item: any) => ({
    cart_id: item.itemable_id,
    item_id: item.id,
    ...item.product,
    ...getPrice(item.product),
    variants: [item.variant],
    quantity: item.quantity,
    guarantee_id: item.guarantee_id,
  }));

  prev.forEach((item) => {
    const updatedItem = items.find((newItem: any) => {
      if (item.variants.length)
        return item.variants[0].id === newItem.variants[0].id;
      return item.id === newItem.id;
    });
    items = items.filter((newItem: any) => {
      if (item.variants.length)
        return item.variants[0].id !== newItem.variants[0].id;
      return item.id !== newItem.id;
    });

    if (!updatedItem) return;

    const newPrice = getPrice(updatedItem).price;
    const oldPrice = getPrice(item).price;

    // Handle message
    let message: MessagesType | undefined = undefined;
    if (
      updatedItem.stock_status === "out_of_stock" ||
      updatedItem.stock_quantity === 0
    ) {
      message = {
        color: "red",
        title: `محصول ${updatedItem.title} به اتمام رسید و بصورت خودکار از سبد شما حذف شد.`,
      };
    } else if (oldPrice > newPrice) {
      message = {
        color: "green",
        title: `قیمت ${updatedItem.title} ${currencyFormat(
          oldPrice - newPrice
        )} تومان کاهش یافت.`,
        body: `از ${oldPrice} به‌ ${newPrice}`,
      };
    } else if (oldPrice < newPrice) {
      message = {
        color: "yellow",
        title: `قیمت ${updatedItem.title} ${currencyFormat(
          newPrice - oldPrice
        )} تومان افزایش یافت.`,
        body: `از ${oldPrice} به‌ ${newPrice}`,
      };
    }

    items.push({
      ...updatedItem,
      message: message,
    });
  });

  return items;
}

const getVariantPrice = (item: any): number =>
  item.hasOwnProperty("variants") &&
  item.variants.length &&
  Number(item.variants[0].price);

const getVariantSalePrice = (item: any): number =>
  item.hasOwnProperty("variants") &&
  item.variants.length &&
  Number(item.variants[0].sale_price);

const getPrice = (item: any): { price: number; sale_price: number } => {
  const salePrice = getVariantSalePrice(item) || Number(item.sale_price);
  const price = getVariantPrice(item) || Number(item.price);

  return { price, sale_price: salePrice };
};

export const getLowPrice = (
  item: any
): { price: number; sale_price: number } => {
  const minPriceVariable = item.hasOwnProperty("variants")
    ? item.variants.reduce((prev: any, curr: any) =>
        prev.sale_price != 0 && prev.sale_price < curr.sale_price ? prev : curr
      )
    : item.sale_price;
  const salePrice =
    Number(minPriceVariable.sale_price) || Number(item.sale_price);
  const price = Number(minPriceVariable.price) || Number(item.price);

  return { price, sale_price: salePrice };
};

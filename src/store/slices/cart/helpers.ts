import { PayloadAction } from "@reduxjs/toolkit";
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

export function handleExpenses(items: CartItem[]) {
  return {
    tax: 0,
    shipping: 0,
    discount: items.reduce(
      (prev, current) =>
        prev +
        (current.sale_price > 0 ? current.sale_price - current.price : 0) *
          current.quantity,
      0
    ),
    totalWithoutDiscount: items.reduce(
      (prev, current) => prev + current.price * current.quantity,
      0
    ),
    total: items.reduce(
      (prev, current) =>
        prev +
        (current.sale_price > 0 ? current.sale_price : current.price) *
          current.quantity,
      0
    ),
  };
}

export function compareCart(prev: CartItem[], next: any): CartItem[] {
  let items = next.map((item: any) => ({
    cart_id: item.itemable_id,
    item_id: item.id,
    ...item.product,
    price: Number(
      item.product.sale_price && item.product.sale_price !== "0"
        ? item.product.sale_price
        : item.product.price
    ),
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

    const newPrice = Number(updatedItem.price);
    const oldPrice = Number(item.price);

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

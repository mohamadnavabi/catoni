import {
  AttributeItems,
  AttributeTypes,
  Product,
  ProductVariant,
} from "data/data";
import product from "store/slices/product";

const getVariantByTypes = (
  variants: ProductVariant[],
  type: AttributeTypes
): AttributeItems[] => {
  const attributeItems = variants.map((variant) => variant.attribute_items);

  let colorItems: AttributeItems[] = [];
  attributeItems.forEach((items) => {
    items.forEach((item) => {
      if (
        item.attribute.type === type &&
        colorItems.findIndex((colorItem) => colorItem.id === item.id) === -1
      ) {
        colorItems.push(item);
      }
    });
  });

  return colorItems;
};

const getVariantByItems = (
  variants: ProductVariant[],
  selected: AttributeItems[]
): ProductVariant[] | [] => {
  if (!variants.length || !selected.length) return [];

  return selected.length === 1
    ? variants.filter(
        (variant) => variant.attribute_items[0].id === selected[0].id
      )
    : variants.filter(
        (variant) =>
          (variant.attribute_items[0].id === selected[0].id &&
            variant.attribute_items[1].id === selected[1].id) ||
          (variant.attribute_items[1].id === selected[0].id &&
            variant.attribute_items[0].id === selected[1].id)
      );
};

const getProductStatus = (product: Product) => {
  const days =
    (Date.now() - new Date(product.created_at).getTime()) / 1000 / 87400;

  if ((product.sale_price / product.price) * 100 > 50) return "50% تخفیف";
  else if (product.stock_status === "low_stock") return "تعداد محدود";
  else if (days < 7) return "جدید";
  else if (product.stock_status === "out_of_stock") return "تمام شد";

  return "";
};

export { getVariantByTypes, getVariantByItems, getProductStatus };

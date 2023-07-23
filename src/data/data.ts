type Boolean = 0 | 1;

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export type Gender = "male" | "female";

export interface User {
  id: number;
  first_name?: string;
  last_name?: string;
  national_id?: string;
  company_name?: string;
  banking_number?: string;
  mobile: string;
  email?: string;
  password?: string;
  about?: string;
  role_id?: string;
  date_of_birth?: string;
  mobile_verified_at?: string;
  email_verified_at?: string;
  token: string;
}

export interface UserParams {
  first_name: string;
  last_name: string;
  mobile: string;
  national_id?: string;
  date_of_birth?: string;
  gender: Gender;
  banking_number?: string;
  email?: string;
  password?: string;
  about?: string;
}

export interface Country {
  id: number;
  name: string;
  code: string;
  area_code?: number;
}

export interface State {
  id: number;
  name: string;
  code: string;
  area_code?: number;
  latitude?: string;
  longitude?: string;
  approved: boolean;
  country: Country;
}

export interface City {
  id: number;
  name: string;
  code: string;
  latitude?: string;
  longitude?: string;
  approved: boolean;
  state: State;
}

export interface Address {
  id: number;
  title: string;
  latitude?: string;
  longitude?: string;
  postal_address: string;
  postal_code: string;
  phone: string;
  plate: string;
  unit?: string;
  receptor_first_name: string;
  receptor_last_name: string;
  receptor_national_id?: string;
  receptor_mobile: string;
  type: "home" | "work";
  user: User;
  city: City;
  city_id?: number;
}

export interface AddressParams {
  id?: number;
  title: string;
  latitude?: string;
  longitude?: string;
  postal_address: string;
  postal_code: string;
  phone: string;
  plate: string;
  unit?: string;
  receptor_first_name: string;
  receptor_last_name: string;
  receptor_national_id?: string;
  receptor_mobile: string;
  type: "home" | "work";
  city_id: number;
  city?: City;
}

export type AttributeTypes =
  | "multiple-select"
  | "text"
  | "textarea"
  | "boolean"
  | "number"
  | "select"
  | "color"
  | "size"
  | "material"
  | "length"
  | "model"
  | "flavors";

export interface CartItem extends Product {
  quantity: number;
  variant?: ProductVariant;
  cart_id?: number;
  item_id?: number;
}

export interface Category {
  active: number;
  description: null | string;
  icon: null | string;
  id: number;
  name: string;
  parent_id: number | null;
  pivot: { product_id: number; category_id: number };
  slug: string;
  type: "product" | "post";
  created_at: null | string;
  updated_at: null | string;
}

export interface Guarantees {
  name: string;
  period: string;
}

export interface Tags {
  id: number;
  name: string;
  pivot: {
    taggable_id: number;
    tag_id: number;
    taggable_type: "App\\Models\\Product" | "App\\Models\\Post";
  };
  created_at: null | string;
  updated_at: string;
}

export interface Media {
  id: number;
  mime: string;
  name: string;
  path: string;
  size: number;
  resized: string;
  product_id: number;
  directory_id: null | number;
  created_at: string;
  updated_at: string;
}

export interface Attribute {
  id: number;
  name: string;
  slug: string;
  attribute_group_id: number;
  description: null | string;
  filterable: number;
  position: null;
  required: number;
  searchable: number;
  type: AttributeTypes;
  variable: Boolean;
  created_at: string;
  updated_at: string;
  attribute_items: AttributeItems[];
}

export interface AttributeItems {
  id: number;
  name: string;
  value: string;
  pivot: { variant_id: number; attribute_item_id: number };
  attribute: Attribute;
  attribute_id: number;
  show_on_attribute: Boolean;
}

export interface ProductVariant {
  id: number;
  attribute_items: AttributeItems[];
  sku: null | string;
  barcode: string;
  date_on_sale_from: null | string;
  date_on_sale_to: null | string;
  notice: null | string;
  price: number;
  product_id: number;
  purchase_price: number;
  sale_price: number;
  stock_quantity: null;
  stock_status: StockStatus;
  is_special_offer: Boolean;
  warehouse_name: null | string;
  warehouse_shelf_name: null | string;
  weight: null | number;
  width: null | number;
  height: null | number;
  depth: null | number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}
export interface Product {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  price: number;
  sale_price: number;
  sku: string;
  description: string;
  short_description: string;
  date_on_publish_from: null | string;
  date_on_publish_to: null | string;
  date_on_sale_from: null | string;
  date_on_sale_to: null | string;
  editor_id: null | number;
  notice: null | string;
  publisher_id: number;
  purchase_price: string;
  rating_count: number;
  barcode: null | string;
  brand_id: number;
  sale_count: number;
  stock_status: StockStatus;
  stock_quantity: null | number;
  is_original: Boolean;
  is_featured: Boolean;
  is_purchasable: Boolean;
  is_special_offer: Boolean;
  is_backorder: Boolean;
  supplier_id: null | number;
  rating_average: number;
  is_taxable: number;
  type: string;
  video: null | string;
  view_count: number;
  warehouse_name: null | number;
  warehouse_shelf_name: null | number;
  depth: null | number;
  weight: null | number;
  width: null | number;
  height: null | number;
  weight_unit: string;
  length_unit: string;
  count_unit: string;
  categories: Category[];
  guarantees: Guarantees[];
  tags: Tags[];
  media: Media[];
  variants: ProductVariant[];
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "سوئیشرت مردانه نایک",
    subtitle: "Test Subtitle",
    description: "Brown cockroach wings",
    price: 740000,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    variants: [],
    guarantees: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 2,
    title: "کوله پشتی جنس خوب",
    subtitle: "Test Subtitle",
    description: "Classic green",
    price: 68000,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 3,
    title: "کلاه دزدی",
    subtitle: "Test Subtitle",
    description: "New blue aqua",
    price: 13200,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 4,
    title: "Travel Pet Carrier",
    subtitle: "Test Subtitle",
    description: "Dark pink 2023",
    price: 28,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 5,
    title: "Leather Gloves",
    subtitle: "Test Subtitle",
    description: "Perfect mint green",
    price: 42,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 6,
    title: "Hoodie Sweatshirt",
    subtitle: "Test Subtitle",
    description: "New design 2023",
    price: 30,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 7,
    title: "Wool Cashmere Jacket",
    subtitle: "Test Subtitle",
    description: "Matte black",
    price: 12,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 8,
    title: "Ella Leather Tote",
    subtitle: "Test Subtitle",
    description: "Cream pink",
    price: 145,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
];

export const SPORT_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Mastermind Toys",
    subtitle: "Test Subtitle",
    description: "Brown cockroach wings",
    price: 74,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 2,
    title: "Jump Rope Kids",
    subtitle: "Test Subtitle",
    description: "Classic green",
    price: 68,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 3,
    title: "Tee Ball Beanie",
    subtitle: "Test Subtitle",
    description: "New blue aqua",
    price: 132,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 4,
    title: "Rubber Table Tennis",
    subtitle: "Test Subtitle",
    description: "Dark pink 2023",
    price: 28,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 5,
    title: "Classic Blue Rugby",
    subtitle: "Test Subtitle",
    description: "Perfect mint green",
    price: 42,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 6,
    title: "Manhattan Toy WRT",
    subtitle: "Test Subtitle",
    description: "New design 2023",
    price: 30,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 7,
    title: "Tabletop Football ",
    subtitle: "Test Subtitle",
    description: "Matte black",
    price: 12,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
  {
    id: 8,
    title: "Pvc Catching Toy",
    subtitle: "Test Subtitle",
    description: "Cream pink",
    price: 145,
    sale_price: 0,
    media: [],
    categories: [],
    tags: [],
    guarantees: [],
    variants: [],
    slug: "",
    sku: "1",
    short_description: "string",
    date_on_publish_from: null,
    date_on_publish_to: null,
    date_on_sale_from: null,
    date_on_sale_to: null,
    editor_id: null,
    notice: null,
    publisher_id: 0,
    purchase_price: "0",
    rating_average: 4.2,
    rating_count: 0,
    barcode: null,
    brand_id: 0,
    sale_count: 0,
    stock_status: "in_stock",
    stock_quantity: null,
    supplier_id: null,
    is_original: 0,
    is_featured: 0,
    is_purchasable: 0,
    is_backorder: 0,
    is_special_offer: 0,
    is_taxable: 0,
    type: "string",
    video: null,
    view_count: 0,
    warehouse_name: null,
    warehouse_shelf_name: null,
    depth: null,
    weight: null,
    width: null,
    height: 0,
    weight_unit: "g",
    length_unit: "cm",
    count_unit: "جفت",
    created_at: "",
    updated_at: "",
    deleted_at: null,
  },
];

export type maxWidthType =
  | "max-w-0"
  | "max-w-none"
  | "max-w-xs"
  | "max-w-sm"
  | "max-w-md"
  | "max-w-lg"
  | "max-w-xl"
  | "max-w-2xl"
  | "max-w-3xl"
  | "max-w-4xl"
  | "max-w-5xl"
  | "max-w-6xl"
  | "max-w-7xl"
  | "max-w-full"
  | "max-w-min"
  | "max-w-max"
  | "max-w-fit"
  | "max-w-prose"
  | "max-w-screen-sm"
  | "max-w-screen-md"
  | "max-w-screen-lg"
  | "max-w-screen-xl"
  | "max-w-screen-2xl";

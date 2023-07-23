import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  "/home2"?: {};
  "/home3"?: {};
  //
  "/product"?: {};
  "/product-detail-2"?: {};
  "/page-collection"?: {};
  "/category"?: {};
  "/page-search"?: {};
  "/home-header-2"?: {};
  //
  "/account"?: {};
  "/wishlist"?: {};
  "/change-password"?: {};
  "/account-billing"?: {};
  "/my-orders"?: {};
  //
  "/cart"?: {};
  "/checkout"?: {};
  "/order"?: {};
  //
  "/blog"?: {};
  "/blog-single"?: {};

  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/verify-passcode"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/subscription"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}

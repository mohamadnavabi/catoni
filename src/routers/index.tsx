import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "components/shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import Page404 from "containers/Page404/Page404";
import AccountPage from "containers/AccountPage/AccountPage";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageSignUpVerify from "containers/PageSignUpVerify/PageSignUpVerify";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import SiteHeader from "containers/SiteHeader";
import PageCollection from "containers/PageCollection";
import PageSearch from "containers/PageSearch";
import PageHome2 from "containers/PageHome/PageHome2";
import PageHome3 from "containers/PageHome/PageHome3";
import ProductDetailPage from "containers/ProductDetailPage/ProductDetailPage";
import ProductDetailPage2 from "containers/ProductDetailPage/ProductDetailPage2";
import Wishlist from "containers/AccountPage/Wishlist";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountBilling from "containers/AccountPage/AccountBilling";
import AccountOrder from "containers/AccountPage/AccountOrder";
import CartPage from "containers/ProductDetailPage/CartPage";
import CheckoutPage from "containers/PageCheckout/CheckoutPage";
import PageCollection2 from "containers/PageCollection2";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome },
  { path: "/#", exact: true, component: PageHome },
  { path: "/home2", exact: true, component: PageHome2 },
  { path: "/home3", exact: true, component: PageHome3 },
  //
  { path: "/home-header-2", exact: true, component: PageHome },
  { path: "/product", component: ProductDetailPage2 },
  { path: "/product-detail-2", component: ProductDetailPage },
  //
  { path: "/category", component: PageCollection2 },
  { path: "/page-collection", component: PageCollection },
  { path: "/page-search", component: PageSearch },
  //
  { path: "/account", component: AccountPage },
  { path: "/wishlist", component: Wishlist },
  { path: "/change-password", component: AccountPass },
  { path: "/account-billing", component: AccountBilling },
  { path: "/my-orders", component: AccountOrder },
  //
  { path: "/cart", component: CartPage },
  { path: "/checkout", component: CheckoutPage },
  //
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },
  //
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },
  { path: "/signup", component: PageSignUp },
  { path: "/verify-passcode", component: PageSignUpVerify },
  { path: "/login", component: PageLogin },
  { path: "/subscription", component: PageSubcription },
];

const Routes = () => {
  return (
    <BrowserRouter basename="/catoni">
      <ScrollToTop />
      <SiteHeader />
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        <Route component={Page404} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;

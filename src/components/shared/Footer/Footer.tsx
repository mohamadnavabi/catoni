import Logo from "components/shared/Logo/Logo";
import SocialsList1 from "components/shared/SocialsList1/SocialsList1";
import { CustomLink } from "data/types";
import React from "react";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "1",
    title: "دسترسی سریع",
    menus: [
      { href: "#", label: "تک سایز ها" },
      { href: "#", label: "کتونی های مشکی" },
      { href: "#", label: "کتونی های سفید" },
      { href: "#", label: "کتونی های اقتصادی" },
    ],
  },
  {
    id: "2",
    title: "راهنما",
    menus: [
      { href: "#", label: "راهنمای سایز" },
      { href: "#", label: "آموزش خرید از کتونی" },
      { href: "#", label: "پرسش های متداول" },
      { href: "#", label: "نحوه بازگرداندن کتونی" },
    ],
  },
  {
    id: "4",
    title: "همراه کتونی",
    menus: [
      { href: "#", label: "درباره ما" },
      { href: "#", label: "تماس با ما" },
      { href: "#", label: "ثبت شکایت" },
      { href: "#", label: "استخدام در کتونی" },
    ],
  },
  {
    id: "5",
    title: "دانلود اپلیکیشن",
    menus: [],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="nc-Footer relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 space-x-reverse lg:flex-col lg:space-y-3 lg:items-start" />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
  );
};

export default Footer;

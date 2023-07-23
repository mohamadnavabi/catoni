import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Paginate as PaginateInterface } from "services/http/interface";

type Props = {
  list: PaginateInterface<any>[];
  onChangePage: (pageNumber: number) => any;
  onCurrentPageDataFetched: (args: any) => any;
};

export default function Paginate({
  list,
  onChangePage,
  onCurrentPageDataFetched,
}: Props) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const { search, pathname } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const currentPage = Number(params.get("page")) || 1;
    setCurrentPageNumber(currentPage);
    const item = list.find((item: any) => item.current_page === currentPage);
    if (!item) {
      onChangePage(currentPage);
    } else {
      onCurrentPageDataFetched(item.data);
    }
  }, [search, list]);

  return (
    <nav
      aria-label="Page navigation example"
      className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:space-x-reverse sm:flex-row sm:justify-between sm:items-center"
    >
      <ul className="flex flex-1 justify-center items-center -space-x-px h-8 text-sm">
        <li>
          <Link
            to={`${pathname}?page=${currentPageNumber + 1}`}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">صفحه بعد</span>
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </Link>
        </li>

        {list.length > 0 &&
          React.Children.toArray(
            Array.from({ length: list[0].last_page }, (_, i) => i + 1).map(
              (page: number) => (
                <li>
                  <Link
                    to={`${pathname}?page=${page}`}
                    className={
                      currentPageNumber === page
                        ? "z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }
                  >
                    {page}
                  </Link>
                </li>
              )
            )
          )}

        <li>
          <Link
            to={`${pathname}?page=${currentPageNumber - 1}`}
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">صفحه قبل</span>
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

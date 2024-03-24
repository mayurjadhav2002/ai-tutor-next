import { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className="fixed overflow-hidden z-20 w-full bg-white/80 dark:bg-gray-950/75 dark:shadow-md rounded-b-lg dark:shadow-gray-950/10 border-b border-[--ui-light-border-color] border-x dark:border-[--ui-dark-border-color] backdrop-blur">
        <div className="px-6 m-auto max-w-6xl 2xl:px-0">
          <div className="flex flex-wrap items-center justify-between py-2 sm:py-4">
            <div className="w-full items-center flex justify-between lg:w-auto">
              <a href="/" className=" font-semibold text-lg">
                AITUTOR
              </a>
              <div className="flex lg:hidden">
                <button
                  aria-label="humburger"
                  id="menu"
                  className="relative border bordeer-gray-950/30 dark:border-white/20 size-9 rounded-full transition duration-300 active:scale-95"
                >
                  <div
                    aria-hidden="true"
                    id="line1"
                    className="m-auto h-[1.5px] w-4 rounded bg-gray-900 transition duration-300 dark:bg-gray-300"
                  ></div>
                  <div
                    aria-hidden="true"
                    id="line2"
                    className="m-auto mt-1.5 h-[1.5px] w-4 rounded bg-gray-900 transition duration-300 dark:bg-gray-300"
                  ></div>
                </button>
              </div>
            </div>
            <div className="w-full h-0 lg:w-fit flex-wrap justify-end items-center space-y-8 lg:space-y-0 lg:flex lg:h-fit md:flex-nowrap">
              <div className="mt-6 text-gray-600 dark:text-gray-300 md:-ml-4 lg:pr-4 lg:mt-0">
                <ul className="space-y-6 tracking-wide text-base lg:text-sm lg:flex lg:space-y-0">
                  <li>
                    <a
                      href="#"
                      className="block md:px-4 transition hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <span>Learnings</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block md:px-4 transition hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <span>Courses</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block md:px-4 transition hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <span>About</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block md:px-4 transition hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <span>Blog</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="w-full space-y-2 gap-2 pt-6 pb-4 lg:pb-0 border-t border-[--ui-light-border-color] dark:border-[--ui-dark-border-color] items-center flex flex-col lg:flex-row lg:space-y-0 lg:w-fit lg:border-l lg:border-t-0 lg:pt-0 lg:pl-2">
                <Link href="/signin" className="w-full h-9 lg:w-fit group flex items-center rounded-[--btn-border-radius] disabled:border :select-none [&>:not(.sr-only)]:relative :disabled:opacity-20 *:disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border dark:disabled:border-gray-800 disabled:dark:bg-gray-900 dark::disabled:!text-white text-gray-800 hover:bg-gray-100 active:bg-gray-200/75 dark:text-gray-300 dark:hover:bg-gray-500/10 dark:active:bg-gray-500/15 lg:text-sm lg:h-8 px-3.5 justify-center">
                  <span>Login</span>
                </Link>
                
                <Link href="/register" className="w-full h-9 lg:w-fit group flex items-center rounded-[--btn-border-radius] disabled:border :select-none [&>:not(.sr-only)]:relative :disabled:opacity-20 *:disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border dark:disabled:border-gray-800 disabled:dark:bg-gray-900 dark::disabled:!text-white text-gray-800 hover:bg-gray-100 active:bg-gray-200/75 dark:text-gray-300 dark:hover:bg-gray-500/10 dark:active:bg-gray-500/15 lg:text-sm lg:h-8 px-3.5 justify-center">
                  <span>Register</span>
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
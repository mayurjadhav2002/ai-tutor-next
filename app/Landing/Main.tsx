/* eslint-disable @next/next/no-img-element */
import React from "react";
import { MdOutlineInstallDesktop } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "@/components/ui/button";
function Main() {
  return (
    <>
      <section className="pt-24 bg-white dark:bg-[#1e1e1e] z-10">
        <div className="lg:px-12 mx-auto w-full lg:max-w-7xl">
          <div className=" px-12 w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 dark:text-white md:text-6xl md:tracking-tight">
              <span>Start</span>{" "}
              <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-400 to-purple-500 lg:inline">
                Your Project Journey
              </span>{" "}
              <span>
                with <span className="text-blue-500">P</span>rogress
              </span>{" "}
            </h1>
            <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
              Experience a complete project management solution for agile teams,
              featuring dynamic sprint planning, team collaboration, and an
              intuitive interface.
            </p>
            <div className=" flex items-center justify-center mb-4 space-x-0 md:space-x-2 md:mb-8">
              <Link href="/login" className="pr-2">
                <Button>
                  Get Started
                  <FaArrowRightLong className="ml-1" />
                </Button>
              </Link>
              <Link  href="https://github.com/mayurjadhav2002/progress" target="blank">
                <Button variant="secondary">
                  Install Locally
                  <MdOutlineInstallDesktop className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full mx-auto mt-20 text-center ">
            <div className="relative z-0 w-full mt-8">
              <div className="relative overflow-hidden shadow-2xl">
                <div className="flex items-center flex-none px-4 bg-dark/80 dark:bg-dark/50 rounded-b-none h-11 rounded-xl">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3  bg-green-500 rounded-full" />
                  </div>
                </div>
                <img
                  src="/img.png"
                  alt="progress-App-Task"
                  className="w-full"
                />
       
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


export default Main;
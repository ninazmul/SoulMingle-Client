import "./Slider.css"
import { Banner, Button } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const Slider = () => {
    return (
      <div className="text-center bg-fixed bg-slid">
        <div className="py-32">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
            Dating for Grown Ups <br />
            Make a Real Connection
          </h1>
          <p className="mb-6 text-lg font-normal text-pink-400 lg:text-xl sm:px-16 xl:px-48 dark:text-pink-400">
            Start meeting singles who are ready to commit today.
          </p>
          <Link
            to="/signIn"
            className="inline-flex rounded-full items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Get Started
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
        <Banner>
          <div className="flex w-[calc(100%-2rem)] justify-between rounded-lg  bg-pink-500 p-4 shadow-sm flex-row lg:max-w-7xl">
            <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
              <a
                href="/"
                className="mb-2 flex items-center border-gray-200 dark:border-gray-600 md:mb-0 md:mr-4 md:border-r md:pr-4"
              >
                <img
                  src="https://i.ibb.co/4dxnZw8/Soul-Mingle-removebg-preview.png"
                  className="mr-3 h-6 sm:h-9"
                  alt="SoulMingle Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-bold text-black">
                  Soul<span className="text-white">Mingle</span>
                </span>
              </a>
              <p className="flex items-center md:text-xl font-normal text-white ">
                Start your love story
              </p>
            </div>
            <div className="flex flex-shrink-0 items-center">
              <Button
                className="bg-white rounded-full text-pink-500 hover:bg-pink-700 hover:text-white"
                href="/signUp"
              >
                Sign up
              </Button>
              <Banner.CollapseButton
                color="gray"
                className="border-0 bg-transparent text-white"
              >
                <HiX className="h-4 w-4" />
              </Banner.CollapseButton>
            </div>
          </div>
        </Banner>
      </div>
    );
};

export default Slider;

"use client";

import { AlignLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CartIcon from "../../../assets/svgs/cart-icon";
import HeartIcon from "../../../assets/svgs/heart-icon";
import ProfileIcon from "../../../assets/svgs/profile-icon";
import useUser from "@/hooks/useUser";
import { navItems } from "@/configs/constants";

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { user } = useUser();

  console.log(user);

  //Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full transition-all duration-300 ${
        isSticky
          ? "fixed top-0 left-0 z-[100] bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "relative bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative flex items-center justify-between ${
            isSticky ? "py-3" : "py-4"
          }`}
        >
          {/* All Departments Dropdown */}
          <div className="relative">
            <button
              className={`${
                isSticky ? "w-56" : "w-64"
              } cursor-pointer flex items-center justify-between px-6 py-3
                         bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                         text-white font-medium rounded-lg shadow-md hover:shadow-lg
                         transition-all duration-200 group`}
              onClick={() => setShow(!show)}
            >
              <div className="flex items-center space-x-3">
                <AlignLeft
                  size={18}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
                <span className="text-sm font-semibold">All Departments</span>
              </div>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  show ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {show && (
              <div
                className={`absolute left-0 ${
                  isSticky ? "top-14 w-56" : "top-16 w-64"
                } bg-white rounded-xl shadow-xl border border-gray-100 z-50
                           overflow-hidden animate-in slide-in-from-top-2 duration-200`}
              >
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Categories
                  </div>
                  {/* Add your categories here */}
                  <div className="space-y-1 px-2">
                    {[
                      "Electronics",
                      "Fashion",
                      "Home & Garden",
                      "Sports",
                      "Books",
                      "Health",
                    ].map((category, index) => (
                      <Link
                        key={index}
                        href={`/category/${category.toLowerCase()}`}
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700
                                 rounded-lg transition-colors duration-150"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item: NavItemsTypes, index: number) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium text-sm
                         transition-colors duration-200 relative group py-2"
              >
                {item.title}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600
                               group-hover:w-full transition-all duration-200"
                ></span>
              </Link>
            ))}
          </nav>

          {/* Sticky Header Actions */}
          <div className="flex items-center">
            {isSticky && (
              <div className="flex items-center space-x-6">
                {/* User Profile - Sticky */}
                <div className="flex items-center space-x-3">
                  {user ? (
                    <>
                      <Link
                        href={"/profile"}
                        className="w-10 h-10 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100
                                 hover:border-blue-300 flex items-center justify-center rounded-full
                                 transition-all duration-200 hover:shadow-md group"
                      >
                        <ProfileIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      </Link>
                      <Link href={"/profile"} className="hidden sm:block">
                        <span className="block text-xs text-gray-500 font-medium">
                          Hello,
                        </span>
                        <span className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                          {user?.name?.split(" ")[0]}
                        </span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href={"/login"}
                        className="w-10 h-10 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200
                                 hover:border-blue-300 hover:from-blue-50 hover:to-indigo-50
                                 flex items-center justify-center rounded-full
                                 transition-all duration-200 hover:shadow-md group"
                      >
                        <ProfileIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      </Link>
                      <Link href={"/login"} className="hidden sm:block">
                        <span className="block text-xs text-gray-500 font-medium">
                          Hello,
                        </span>
                        <span className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                          Sign In
                        </span>
                      </Link>
                    </>
                  )}
                </div>

                {/* Action Icons - Sticky */}
                <div className="flex items-center space-x-3">
                  <Link href={"/wishlist"} className="relative group">
                    <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <HeartIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500
                                   text-white text-xs font-bold rounded-full flex items-center justify-center
                                   shadow-lg"
                    >
                      0
                    </div>
                  </Link>

                  <Link href={"/cart"} className="relative group">
                    <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <CartIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500
                                   text-white text-xs font-bold rounded-full flex items-center justify-center
                                   shadow-lg"
                    >
                      0
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;

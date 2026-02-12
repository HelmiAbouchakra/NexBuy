"use client";

import CartIcon from "@/assets/svgs/cart-icon";
import HeartIcon from "@/assets/svgs/heart-icon";
import NexBuyIcon from "@/assets/svgs/nexbuy-icon";
import ProfileIcon from "@/assets/svgs/profile-icon";
import useUser from "@/hooks/useUser";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import HeaderBottom from "./header-bottom";

const Header = () => {
  const { user, isLoading } = useUser();
  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href={"/"}
              className="transition-transform hover:scale-105 duration-200"
            >
              <NexBuyIcon />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full px-6 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-full
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200 group-hover:bg-white group-hover:shadow-md
                         font-medium placeholder-gray-400"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2
                               bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                               text-white p-2.5 rounded-full transition-all duration-200
                               hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              {!isLoading && user ? (
                <>
                  <Link
                    href={"/profile"}
                    className="w-12 h-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100
                             hover:border-blue-300 flex items-center justify-center rounded-full
                             transition-all duration-200 hover:shadow-md group"
                  >
                    <ProfileIcon className="group-hover:scale-110 transition-transform duration-200" />
                  </Link>
                  <Link href={"/profile"} className="hidden sm:block">
                    <span className="block text-sm text-gray-500 font-medium">
                      Hello,
                    </span>
                    <span className="font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                      {user?.name?.split(" ")[0]}
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={"/login"}
                    className="w-12 h-12 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200
                             hover:border-blue-300 hover:from-blue-50 hover:to-indigo-50
                             flex items-center justify-center rounded-full
                             transition-all duration-200 hover:shadow-md group"
                  >
                    <ProfileIcon className="group-hover:scale-110 transition-transform duration-200" />
                  </Link>
                  <Link href={"/login"} className="hidden sm:block">
                    <span className="block text-sm text-gray-500 font-medium">
                      Hello,
                    </span>
                    <span className="font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                      {isLoading ? "..." : "Sign In"}
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              <Link href={"/wishlist"} className="relative group">
                <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                  <HeartIcon className="group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500
                               text-white text-xs font-bold rounded-full flex items-center justify-center
                               shadow-lg"
                >
                  0
                </div>
              </Link>

              <Link href={"/cart"} className="relative group">
                <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                  <CartIcon className="group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500
                               text-white text-xs font-bold rounded-full flex items-center justify-center
                               shadow-lg"
                >
                  0
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <HeaderBottom />
    </div>
  );
};

export default Header;

import React from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ArrowSmallLeftIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import logo from "../../../public//logo.webp"
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-12 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="inset-y-0 left-0 flex gap-x-4 items-center sm:static sm:inset-auto w-8">
                  <button
                    onClick={() => router.back()}
                    type="button"
                    className="w-full"
                  >
                    <ArrowSmallLeftIcon className="w-ful text-gray-300 hover:text-gray-100"></ArrowSmallLeftIcon>
                  </button>
                </div>
                <div className="flex w-full items-center justify-center">
                  <Image
                    className="h-8 w-auto rounded-md px-2"
                    src={logo}
                    alt="Your Company"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

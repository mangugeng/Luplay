"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
  Disclosure,
  Menu,
  Transition,
  Combobox,
  Dialog,
} from "@headlessui/react";
import {
  ArrowTrendingUpIcon,
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  EllipsisHorizontalIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import promo from "../../public/discount.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "TV Show", href: "/categories/1-dummy-video", current: false },
  { name: "Movies", href: "/categories/1-dummy-video", current: false },
  { name: "Series", href: "/categories/1-dummy-video", current: false },
];

const more = [
  { href: "/categories/1-dummy-video", label: "Kids" },
  { href: "/categories/1-dummy-video", label: "Premier" },
  { href: "/categories/1-dummy-video", label: "Entertainment" },
];

const search = [
  { id: 1, name: "Promo" },
  { id: 3, name: "bidadari surgamu" },
  { id: 4, name: "ftv" },
  { id: 5, name: "antv" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();

  const [selectedsearch, setSelectedSearch] = useState(search[0]);
  const [query, setQuery] = useState("");
  const [openmodalsearch, setOpenModalSearch] = useState(false);

  const comboBtn = useRef<HTMLButtonElement>(null);

  const filteredSearch =
    query === ""
      ? search
      : search.filter((search) => {
          return search.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8 3xl:max-w-7xl mx-auto">
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
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex">
                  <div className="flex space-x-4 items-center">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "text-white"
                            : "text-gray-300 hover:text-white",
                          "px-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    <Menu as="div" className="relative">
                      {({ open }) => (
                        <>
                          <Menu.Button
                            className={
                              "flex items-center gap-x-1 px-2 text-sm font-medium text-gray-300 hover:text-white"
                            }
                            onMouseEnter={(
                              event: React.MouseEvent<HTMLButtonElement>
                            ) => (open ? "" : event.currentTarget.click())}
                          >
                            Lainnya{" "}
                            <ChevronDownIcon className="h-4 w-4"></ChevronDownIcon>
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            show={open}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {more.map((item) => (
                                <Menu.Item key={item.label}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active
                                          ? "text-blue-700"
                                          : "text-gray-600 hover:text-blue-700",
                                        "block px-2 py-4 text-sm font-medium hover:bg-blue-100"
                                      )}
                                    >
                                      {item.label}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex gap-x-4 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Combobox
                  as="div"
                  className="relative hidden xl:block"
                  value={selectedsearch}
                  onChange={setSelectedSearch}
                >
                  {({ open }) => (
                    <>
                      <Combobox.Button
                        className="hidden"
                        ref={comboBtn}
                      ></Combobox.Button>
                      <div>
                        <Combobox.Input
                          onChange={(event) => setQuery(event.target.value)}
                          onClick={() => comboBtn.current?.click()}
                          placeholder="Cari"
                          className="relative text-sm rounded-md focus:outline-none border-none focus:ring-0 py-0 pr-8 h-8 bg-gray-600/50 text-white placeholder:text-white/50"
                        />
                        <MagnifyingGlassIcon className="absolute right-2 top-1 w-6 h-6 text-white"></MagnifyingGlassIcon>
                      </div>

                      {open && (
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Combobox.Options
                            as="div"
                            className={`absolute w-full z-10 mt-2 rounded-md ${
                              filteredSearch.length == 0
                                ? "hidden "
                                : "bg-white "
                            } py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                          >
                            <h2 className="text-lg px-4 py-2 font-semibold">
                              Pencarian Populer
                            </h2>
                            {filteredSearch.map((search) => (
                              <Combobox.Option
                                key={search.id}
                                value={search}
                                className="w-full px-4 py-2 text-sm font-normal flex flex-row gap-x-2 items-center text-gray-600 hover:bg-gray-100"
                                as="button"
                              >
                                {search.name == "Promo" ? (
                                  <Image
                                    priority
                                    src={promo}
                                    alt=""
                                    className="w-6 h-6"
                                  />
                                ) : (
                                  <ArrowTrendingUpIcon className="w-6 h-6"></ArrowTrendingUpIcon>
                                )}
                                {search.name}
                              </Combobox.Option>
                            ))}
                          </Combobox.Options>
                        </Transition>
                      )}
                    </>
                  )}
                </Combobox>

                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hidden xl:block"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="text-sm font-medium rounded-md py-2 px-4 bg-pallete-4 text-gray-300 hover:text-white shadow-lg"
                >
                  Langganan
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/users/login")}
                  className="text-sm font-medium rounded-md py-2 px-4 bg-white shadow-lg text-gray-600 hover:text-gray-900"
                >
                  Masuk
                </button>

                {/* Profile dropdown */}
                {/* <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-600"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-600"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-600"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> */}
                <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <Menu.Button
                        className={
                          "flex items-center gap-x-1 px-2 text-sm font-medium text-gray-300 hover:text-white"
                        }
                      >
                        <EllipsisHorizontalIcon className="h-6 w-6"></EllipsisHorizontalIcon>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        show={open}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          as="ul"
                          className="absolute z-10 mt-4 w-64 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none right-0"
                        >
                          <Menu.Item as="li" className='block xl:hidden'>
                            <div className="p-2">
                              <input
                                placeholder="Cari"
                                className="relative text-sm rounded-md focus:outline-none border-none focus:ring-0 py-0 pr-8 h-8 bg-gray-600/50 text-white placeholder:text-white"
                                onClick={() => setOpenModalSearch(true)}
                              />
                              <MagnifyingGlassIcon className="absolute right-4 top-4 w-6 h-6 text-white"></MagnifyingGlassIcon>
                            </div>
                          </Menu.Item>
                          <Menu.Item as={"li"} className='block xl:hidden'>
                            <a
                              href="#"
                              className="flex justify-between text-gray-600 hover:text-blue-700 p-2 text-sm font-medium hover:bg-blue-100"
                            >
                              Notifikasi{" "}
                            </a>
                          </Menu.Item>
                          <Menu.Item as={"li"}>
                            <a
                              href="#"
                              className="flex justify-between text-gray-600 hover:text-blue-700 p-2 text-sm font-medium hover:bg-blue-100"
                            >
                              Bantuan dan Lainnya{" "}
                              <ChevronRightIcon className="h-4 w-4"></ChevronRightIcon>
                            </a>
                          </Menu.Item>
                          <Menu.Item as={"li"}>
                            <a
                              href="#"
                              className="flex justify-between text-gray-600 hover:text-blue-700 p-2 text-sm font-medium hover:bg-blue-100"
                            >
                              Blog{" "}
                            </a>
                          </Menu.Item>
                          <Menu.Item as={"li"}>
                            <hr className="my-2 mx-3 border-b border-solid border-gray-300"></hr>
                          </Menu.Item>
                          <Menu.Item>
                            <div className="text-gray-400 text-[10px] font-normal p-2">
                              Hak Cipta ©2023 LunarPlay.com
                              <br></br>
                              PT Lunar Film. Hak cipta dilindungi Undang-undang.
                            </div>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "text-white"
                      : "text-gray-300 hover:text-white",
                    "block px-2 text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>

          <Transition appear show={openmodalsearch} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto bg-gray-800/80"
              onClose={() => setOpenModalSearch(false)}
            >
              <div className="min-h-screen px-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-pallete-5/90 shadow-xl rounded-md">
                    <section className="flex gap-x-4 items-center">
                      <button
                        type="button"
                        onClick={() => setOpenModalSearch(false)}
                        className="text-gray-300 hover:text-gray-100"
                      >
                        <ArrowLeftIcon className="h-8 w-8"></ArrowLeftIcon>
                      </button>
                      <div className="p-2 relative w-full">
                        <input
                          placeholder="Cari"
                          className="relative text-sm rounded-md focus:outline-none border-none focus:ring-0 py-0 pr-8 bg-gray-600/50 text-white placeholder:text-white/50 w-full h-12"
                        />
                        <MagnifyingGlassIcon className="absolute right-4 top-5 w-6 h-6 text-white"></MagnifyingGlassIcon>
                      </div>
                    </section>
                    <section>
                      <h2 className="text-sm text-gray-100 font-semibold my-3">
                        Pencarian Populer
                      </h2>
                      <ul>
                        <li className="border-b border-solid border-gray-700 ">
                          <div className="flex flex-row items-center">
                            <a
                              href="#"
                              className="w-full overflow-hidden py-3 pl-4 flex flex-row items-center hover:bg-pallete-1/20"
                            >
                              <ArrowTrendingUpIcon className="w-6 h-6 flex-shrink-0 mr-6 text-gray-100"></ArrowTrendingUpIcon>
                              <span className="text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">
                                bidadari surgamu
                              </span>
                            </a>
                          </div>
                        </li>
                        <li className="border-b border-solid border-gray-700 ">
                          <div className="flex flex-row items-center">
                            <a
                              href="#"
                              className="w-full overflow-hidden py-3 pl-4 flex flex-row items-center hover:bg-pallete-1/20"
                            >
                              <ArrowTrendingUpIcon className="w-6 h-6 flex-shrink-0 mr-6 text-gray-100"></ArrowTrendingUpIcon>
                              <span className="text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">
                                takdir cinta yang kupilih
                              </span>
                            </a>
                          </div>
                        </li>
                        <li className="border-b border-solid border-gray-700 ">
                          <div className="flex flex-row items-center">
                            <a
                              href="#"
                              className="w-full overflow-hidden py-3 pl-4 flex flex-row items-center hover:bg-pallete-1/20"
                            >
                              <ArrowTrendingUpIcon className="w-6 h-6 flex-shrink-0 mr-6 text-gray-100"></ArrowTrendingUpIcon>
                              <span className="text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">
                                magic 5
                              </span>
                            </a>
                          </div>
                        </li>
                        <li className="border-b border-solid border-gray-700 ">
                          <div className="flex flex-row items-center">
                            <a
                              href="#"
                              className="w-full overflow-hidden py-3 pl-4 flex flex-row items-center hover:bg-pallete-1/20"
                            >
                              <ArrowTrendingUpIcon className="w-6 h-6 flex-shrink-0 mr-6 text-gray-100"></ArrowTrendingUpIcon>
                              <span className="text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">
                                pintu berkah
                              </span>
                            </a>
                          </div>
                        </li>
                      </ul>
                    </section>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

"use client";

import { Fragment, useEffect, useRef, useState, FC } from "react";
import {
  Disclosure,
  Menu,
  Transition,
  Combobox,
  Dialog,
} from "@headlessui/react";
import {
  ArrowTrendingUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  UserIcon,
  ExclamationCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { usePathname } from "next/navigation";
import logo from "../../public/logo.webp";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuthContext } from "@/context/auth-context";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/", current: true },
  // { name: "TV Show", href: "/categories/1-dummy-video", current: false },
  // { name: "Movies", href: "/categories/movies", current: false },
  { name: "Series", href: "/categories/series", current: false },
];
const more = [
  { href: "/categories/1-dummy-video", label: "Kids" },
  { href: "/categories/1-dummy-video", label: "Premier" },
  { href: "/categories/1-dummy-video", label: "Entertainment" },
];
const search = [
  { id: 3, name: "trio pocil" },
  { id: 4, name: "asep & euis" },
  { id: 4, name: "jaka tingkir" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface NavbarProps {
  movePageFunction: (param: string) => void;
}

const Navbar: FC<NavbarProps> = ({ movePageFunction }) => {
  const pathname = usePathname();
  const { user } = useAuthContext();

  const [datauser, setDataUser] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataCollection, setDataCollection] = useState<any[]>([]);
  const [toggleskeleton, setToggleSkeleton] = useState<boolean>(true);
  const [selectedsearch, setSelectedSearch] = useState(search[0]);
  const [query, setQuery] = useState("");
  const [openmodalsearch, setOpenModalSearch] = useState(false);
  const [openmodalsearchmobile, setOpenModalSearchMobile] = useState(false);
  const [openmodalother, setOpenModalOther] = useState(false);

  const comboBtn = useRef<HTMLButtonElement>(null);
  const searchBtn = useRef<HTMLButtonElement>(null);
  const errorSearch = useRef<HTMLDivElement>(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/user/", {
        method: "GET",
      });

      const userData = await response.json();

      if (userData.user.length === 0) {
        await signOut(auth).then(() => {});
      } else {
        setDataUser(userData.user);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);
  useEffect(() => {
    if (query.length >= 2) {
      setLoading(true);
      setDataCollection([]);
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3002/api/search/navbar?q=${query}`,
            {
              method: "GET",
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          setDataCollection(data.dataCollection);
        } catch (error: any) {
          // console.error("Error fetching data:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      return;
    }
  }, [query]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(function () {
        setToggleSkeleton(false);
      }, 2000);
    }
  }, []);

  const filteredSearch =
    query !== "" && query.length >= 2
      ? search.filter((search) => {
          return search.name.toLowerCase().includes(query.toLowerCase());
        })
      : search;

  const handleSignOut = async () => {
    try {
      await signOut(auth).then(async () => {
        const response = await fetch("http://localhost:3002/api/user/sign_out", {
          method: "POST",
        });

        if (response.ok) {
          toast.success("Berhasil keluar!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          location.reload();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Server error");
        }
      });
    } catch (error: any) {
      console.error("Error during sign-out:", error);
    }
  };

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    if (newValue.length <= 30) {
      setQuery(newValue);
      if (newValue.length < 2) {
        errorSearch.current?.classList.add("block");
        errorSearch.current?.classList.remove("hidden");
      } else {
        errorSearch.current?.classList.remove("block");
        errorSearch.current?.classList.add("hidden");
      }
    }
  };

  const KEY = "searchHistory";

  const getSearchHistory = (): string[] => {
    const storedHistory = localStorage.getItem(KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  };

  const addSearchToHistory = (query: string): void => {
    let history: string[] = getSearchHistory();

    history = history.filter((item) => item !== query);

    if (history.length >= 5) {
      history.shift();
    }

    history.push(query);

    localStorage.setItem(KEY, JSON.stringify(history));
  };

  const removeSearchFromHistory = (query: string): void => {
    let history: string[] = getSearchHistory();

    history = history.filter((item) => item !== query);

    localStorage.setItem(KEY, JSON.stringify(history));
  };

  const handleSubmitSearch = (event: React.FormEvent | React.KeyboardEvent) => {
    event.preventDefault();
    if (query.length >= 2) {
      addSearchToHistory(query);
      movePageFunction(`/search?q=${query}`);
    }
  };

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8 3xl:max-w-7xl mx-auto">
            <div className="relative flex h-12 items-center justify-between">
              <div className="flex flex-1 items-center lg:items-stretch justify-between lg:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="h-8 w-auto rounded-md px-2"
                    src={logo}
                    alt="Your Company"
                    priority
                  />
                </div>
                <div className="flex items-center gap-x-4 md:hidden">
                  {/* <button className="flex flex-row items-center gap-x-2 text-sm text-yellow-700 font-bold border border-yellow-700 rounded-md px-2 p-1">
                    <div
                      className="bg-[50%] bg-no-repeat bg-[length:24px_24px] inline-block h-4 w-4 relative"
                      style={{ backgroundImage: `url(/crown.png)` }}
                    ></div>
                    Langganan
                  </button> */}
                  <button
                    type="button"
                    onClick={() => setOpenModalSearchMobile(true)}
                  >
                    <MagnifyingGlassIcon className="w-6 h6 text-gray-100"></MagnifyingGlassIcon>
                  </button>
                </div>
                <div className="hidden lg:ml-6 lg:flex">
                  <div className="flex space-x-4 items-center">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "text-white"
                            : "text-gray-300 hover:text-white",
                          "px-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => movePageFunction(item.href)}
                        type="button"
                        disabled={pathname == item.href ? true : false}
                      >
                        {item.name}
                      </button>
                    ))}
                    {/* <Menu as="div" className="relative">
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
                    </Menu> */}
                  </div>
                </div>
              </div>
              <div className="hidden absolute inset-y-0 right-0 md:flex gap-x-4 items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0 w-1/2 xl:w-[30%]">
                <Combobox
                  as="div"
                  className="relative hidden md:block flex-[1_1_100%]"
                  value={selectedsearch}
                  onChange={setSelectedSearch}
                >
                  <>
                    <Combobox.Button
                      className="hidden"
                      ref={comboBtn}
                    ></Combobox.Button>
                    <form onSubmit={handleSubmitSearch} autoComplete="off">
                      <Combobox.Input
                        onChange={(event) => {
                          handleInputSearch(event);
                          comboBtn.current?.click();
                        }}
                        onKeyUp={(event) => {
                          if (query.length >= 2 && event.key === "Enter") {
                            searchBtn.current?.click();
                          } else if (query.length < 2) {
                            errorSearch.current?.classList.add("block");
                            errorSearch.current?.classList.remove("hidden");
                          } else {
                            errorSearch.current?.classList.remove("block");
                            errorSearch.current?.classList.add("hidden");
                          }
                        }}
                        value={query}
                        onClick={() => comboBtn.current?.click()}
                        placeholder="Cari"
                        className="w-full relative text-sm rounded-md focus:outline-none border-none focus:ring-0 py-0 pr-8 h-8 bg-gray-600/50 text-white placeholder:text-white/50"
                        maxLength={30}
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1"
                        ref={searchBtn}
                      >
                        <MagnifyingGlassIcon className="w-6 h-6 text-white"></MagnifyingGlassIcon>
                      </button>
                    </form>
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
                        className={`absolute w-full z-30 mt-2 rounded-md cursor-pointer 
                        ${
                          filteredSearch.length == 0 &&
                          dataCollection.length == 0 &&
                          !loading
                            ? "hidden "
                            : "bg-white "
                        }
                        py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                      >
                        <div
                          ref={errorSearch}
                          className="transition-all duration-200 bg-gray-200 text-rose-600 p-2 rounded mt-2"
                        >
                          <span className="text-xs font-medium flex items-center justify-center gap-x-1">
                            <ExclamationCircleIcon className="inline-block w-4 h-4"></ExclamationCircleIcon>
                            Harap masukan minimal 2 karakter dan maksimal 30
                          </span>
                        </div>

                        {loading ? (
                          <ThreeDots
                            visible={true}
                            color="#223893"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            width={"38px"}
                            height={"20px"}
                            wrapperStyle={{}}
                            wrapperClass="w-full justify-center"
                          />
                        ) : dataCollection.length == 0 || query.length <= 1 ? (
                          <>
                            {getSearchHistory().length !== 0 ? (
                              <h2 className="text-base px-4 py-2 font-semibold">
                                History Pencarian
                              </h2>
                            ) : (
                              <></>
                            )}
                            {getSearchHistory().map((query, index) => (
                              <Combobox.Option
                                key={index}
                                value={query}
                                className="w-full px-4 py-2 text-sm font-normal flex flex-row gap-x-2 items-center text-gray-600 hover:bg-gray-100"
                                as="div"
                                onClick={() => setQuery(query)}
                              >
                                <ClockIcon className="w-4 h-4"></ClockIcon>
                                {query}
                                <button
                                  className="text-xs font-semibold text-gray-600 hover:text-pallete-4 ml-auto"
                                  type="button"
                                  onClick={(event) => {
                                    removeSearchFromHistory(query);
                                    event.stopPropagation();
                                  }}
                                >
                                  Hapus
                                </button>
                              </Combobox.Option>
                            ))}
                          </>
                        ) : (
                          dataCollection.slice(0, 2).map((item) => (
                            <div
                              className="flex px-4 py-2 hover:bg-gray-100"
                              key={item.id_doc}
                              onClick={() =>
                                movePageFunction(
                                  `/${item.type}/${
                                    item.id_doc
                                  }/${item.title.replace(/\s+/g, "-")}`
                                )
                              }
                            >
                              <div className="flex w-full flex-row gap-x-2">
                                <Image
                                  src={item.image_potrait_thumbnail}
                                  alt={item.title + "-potrait_thumbnails"}
                                  className="w-14 h-20 rounded-md"
                                  width={132}
                                  height={192}
                                />
                                <span className="text-sm my-auto">
                                  {item.title}
                                </span>
                              </div>
                            </div>
                          ))
                        )}

                        {filteredSearch.length !== 0 ? (
                          <h2 className="text-base px-4 py-2 font-semibold text-gray-800">
                            Pencarian Populer
                          </h2>
                        ) : (
                          <></>
                        )}
                        {filteredSearch.map((search) => (
                          <Combobox.Option
                            key={search.id}
                            value={search}
                            className="w-full px-4 py-2 text-sm font-normal flex flex-row gap-x-2 items-center text-gray-800 hover:bg-gray-100"
                            as="div"
                            onClick={() => setQuery(search.name)}
                          >
                            <ArrowTrendingUpIcon className="w-4 h-4"></ArrowTrendingUpIcon>
                            {search.name}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    </Transition>
                  </>
                </Combobox>

                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hidden xl:block"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* <button
                  type="button"
                  className="text-sm font-medium rounded-md py-2 px-4 bg-pallete-4 text-gray-300 hover:text-white shadow-lg hidden lg:block"
                >
                  Langganan
                </button> */}
                {user == null && datauser.length == 0 ? (
                  <button
                    type="button"
                    onClick={() => movePageFunction("/user/sign_in")}
                    className="text-sm font-medium rounded-md py-2 px-4 bg-white shadow-lg text-gray-600 hover:text-gray-900 hidden lg:block"
                  >
                    Masuk
                  </button>
                ) : (
                  <></>
                )}
                {/* Profile dropdown */}
                <Menu as="div" className="relative hidden lg:block">
                  {({ open }) => (
                    <>
                      <Menu.Button
                        className={
                          "group flex items-center gap-x-1 px-2 text-sm font-medium text-gray-300 hover:text-white"
                        }
                      >
                        {user !== null || datauser.length !== 0 ? (
                          datauser.map((item: any, index: number) => (
                            <div
                              key={index}
                              className="flex gap-1 items-center rounded-l-[40px] rounded-tr-[15px] rounded-br-[10px] bg-pallete-3 pr-2"
                            >
                              {item.profileImageUrl !== "" ? (
                                <div
                                  className="relative border-2 leading-6 rounded-full inline-block h-8 w-8 bg-no-repeat bg-center bg-cover"
                                  style={{
                                    backgroundImage: `url(${item.profileImageUrl})`,
                                  }}
                                ></div>
                              ) : (
                                <div className="rounded-full p-1 bg-pallete-4/80 group-hover:bg-pallete-4 shadow-lg">
                                  <UserIcon className="h-6 w-6"></UserIcon>
                                </div>
                              )}
                              <ChevronDownIcon className="h-4 w-4"></ChevronDownIcon>
                            </div>
                          ))
                        ) : (
                          <EllipsisHorizontalIcon className="h-6 w-6"></EllipsisHorizontalIcon>
                        )}
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
                          className="absolute z-10 mt-4 w-64 rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none right-0"
                        >
                          {user !== null || datauser.length !== 0 ? (
                            datauser.map((item: any, index: number) => (
                              <Menu.Item as={"li"} key={index}>
                                <button
                                  onClick={() =>
                                    pathname == "/user/profile"
                                      ? {}
                                      : movePageFunction("/user/profile")
                                  }
                                  className="group flex items-center gap-x-2 text-white p-2 mb-2 text-sm font-medium"
                                  type="button"
                                >
                                  {item.profileImageUrl !== "" ? (
                                    <div
                                      className="relative border-2 leading-6 rounded-full inline-block h-11 w-11 bg-no-repeat bg-center bg-cover"
                                      style={{
                                        backgroundImage: `url(${item.profileImageUrl})`,
                                      }}
                                    ></div>
                                  ) : (
                                    <div className="rounded-full p-1 bg-pallete-4/80 group-hover:bg-pallete-4 shadow-lg">
                                      <UserIcon className="h-8 w-8"></UserIcon>
                                    </div>
                                  )}
                                  <div className="flex flex-col justify-center text-gray-600 group-hover:text-gray-900">
                                    <h4 className="text-left text-sm font-semibold">
                                      Hello,
                                    </h4>
                                    <p className="text-left text-xs font-semibold">
                                      {datauser.map(
                                        (item: any, index: number) =>
                                          item.name.length <= 20
                                            ? item.name
                                            : `${item.name.substring(0, 20)}...`
                                      )}
                                    </p>
                                  </div>
                                </button>
                              </Menu.Item>
                            ))
                          ) : (
                            <></>
                          )}
                          <Menu.Item
                            as={"li"}
                            onClick={(e) => e.preventDefault()}
                          >
                            <Disclosure>
                              <Disclosure.Button className="w-full flex justify-between text-gray-600 hover:text-blue-700 p-2 text-sm font-medium hover:bg-blue-100">
                                Bantuan dan Lainnya{" "}
                                <ChevronRightIcon className="h-4 w-4"></ChevronRightIcon>
                              </Disclosure.Button>
                              <Disclosure.Panel className="p-2">
                                <Link
                                  href="/data-deletion"
                                  className="ml-2 w-full flex justify-between text-gray-600 hover:text-red-700 p-2 text-sm font-medium hover:bg-red-100"
                                >
                                  Hapus Akun
                                </Link>
                              </Disclosure.Panel>
                            </Disclosure>
                          </Menu.Item>
                          {/* <Menu.Item as={"li"}>
                            <a
                              href="#"
                              className="flex justify-between text-gray-600 hover:text-blue-700 p-2 text-sm font-medium hover:bg-blue-100"
                            >
                              Blog{" "}
                            </a>
                          </Menu.Item> */}
                          {user !== null || datauser.length !== 0 ? (
                            <>
                              <Menu.Item as={"li"}>
                                <hr className="my-2 mx-3 border-b border-solid border-gray-300"></hr>
                              </Menu.Item>
                              <Menu.Item as={"li"}>
                                <button
                                  onClick={handleSignOut}
                                  className="w-full flex gap-x-2 text-gray-600 hover:text-red-700 p-2 text-sm font-medium hover:bg-blue-100"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                                    />
                                  </svg>
                                  Keluar{" "}
                                </button>
                              </Menu.Item>
                              <Menu.Item as={"li"}>
                                <hr className="my-2 mx-3 border-b border-solid border-gray-300"></hr>
                              </Menu.Item>
                            </>
                          ) : (
                            <Menu.Item as={"li"}>
                              <hr className="my-2 mx-3 border-b border-solid border-gray-300"></hr>
                            </Menu.Item>
                          )}
                          <Menu.Item>
                            <div className="text-gray-600 text-[10px] font-normal p-2">
                              Hak Cipta ©2024 Luplay.co.id
                              <br></br>
                              PT Universal Sarana Media. Hak cipta dilindungi
                              Undang-undang.
                            </div>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
            <div className="lg:hidden overflow-hidden py-[6px] no-scrollbar">
              {toggleskeleton ? (
                <ul className="flex gap-x-4">
                  <li>
                    <Skeleton
                      baseColor="#202020"
                      highlightColor="#444"
                      height={32}
                      width={64}
                      className="!rounded-full"
                    ></Skeleton>
                  </li>
                  <li>
                    <Skeleton
                      baseColor="#202020"
                      highlightColor="#444"
                      height={32}
                      width={64}
                      className="!rounded-full"
                    ></Skeleton>
                  </li>
                  <li>
                    <Skeleton
                      baseColor="#202020"
                      highlightColor="#444"
                      height={32}
                      width={64}
                      className="!rounded-full"
                    ></Skeleton>
                  </li>
                  <li>
                    <Skeleton
                      baseColor="#202020"
                      highlightColor="#444"
                      height={32}
                      width={64}
                      className="!rounded-full"
                    ></Skeleton>
                  </li>
                  <li>
                    <Skeleton
                      baseColor="#202020"
                      highlightColor="#444"
                      height={32}
                      width={64}
                      className="!rounded-full"
                    ></Skeleton>
                  </li>
                </ul>
              ) : (
                <Swiper
                  slidesPerView={4.7}
                  spaceBetween={10}
                  className="mobile-categories-swiper"
                >
                  {navigation.map((item) => (
                    <SwiperSlide
                      key={item.name}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <button
                        type="button"
                        onClick={() => movePageFunction(item.href)}
                        disabled={pathname == item.href ? true : false}
                        className={classNames(
                          item.current
                            ? "text-gray-100 bg-pallete-4 hover:text-white"
                            : "bg-pallete-1 text-gray-900",
                          "shadow-md font-semibold text-center rounded-2xl inline-flex text-sm min-w-fit py-[6.5px] px-3"
                        )}
                      >
                        {item.name}
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
          <Transition appear show={openmodalsearchmobile} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto bg-gray-800/80"
              onClose={() => setOpenModalSearchMobile(false)}
            >
              <div className="min-h-screen text-center">
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
                  <div className="inline-block w-full h-screen max-w-full min-h-full pt-0 p-6 overflow-scroll text-left align-middle transition-all transform bg-pallete-5">
                    <section className="flex gap-x-3 items-center">
                      <button
                        type="button"
                        onClick={() => setOpenModalSearchMobile(false)}
                        className="text-gray-300 hover:text-gray-100"
                      >
                        <ArrowLeftIcon className="h-6 w-6"></ArrowLeftIcon>
                      </button>
                      <div className="p-2 relative w-full">
                        <form onSubmit={handleSubmitSearch}>
                          <input
                            placeholder="Cari"
                            className="relative text-sm rounded-md focus:outline-none border-none focus:ring-0 py-0 pr-8 bg-gray-600/50 text-white placeholder:text-white/50 w-full h-10"
                            onChange={(event) => {
                              handleInputSearch(event);
                            }}
                            value={query}
                          />
                          <button
                            type="submit"
                            className="absolute right-4 top-4 text-white"
                          >
                            <MagnifyingGlassIcon className="w-6 h-6"></MagnifyingGlassIcon>
                          </button>
                        </form>
                      </div>
                    </section>
                    <section>
                      <div
                        ref={errorSearch}
                        className="transition-all duration-200 bg-gray-200 text-rose-600 p-2 rounded mt-2"
                      >
                        <span className="text-xs font-medium flex items-center justify-center gap-x-1">
                          <ExclamationCircleIcon className="inline-block w-4 h-4"></ExclamationCircleIcon>
                          Harap masukan minimal 2 karakter dan maksimal 30
                        </span>
                      </div>
                      {getSearchHistory().length !== 0 ? (
                        <h2 className="text-sm text-gray-100 font-semibold my-3">
                          History Pencarian
                        </h2>
                      ) : (
                        <></>
                      )}
                      <ul>
                        {getSearchHistory().map((query, index) => (
                          <li
                            className="border-b border-solid border-gray-700"
                            key={index}
                          >
                            <div className="flex flex-row items-center hover:bg-pallete-1/20 py-3 px-4">
                              <button
                                type="button"
                                onClick={() => {
                                  movePageFunction(`/search?q=${query}`);
                                  addSearchToHistory(query);
                                }}
                                className="w-full overflow-hidden flex flex-row items-center"
                              >
                                <span className="text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">
                                  {query}
                                </span>
                              </button>
                              <button
                                className="text-xs font-semibold text-gray-600 hover:text-pallete-4 ml-auto"
                                type="button"
                                onClick={(event) => {
                                  removeSearchFromHistory(query);
                                  setOpenModalSearchMobile(false);
                                  event.stopPropagation();
                                }}
                              >
                                Hapus
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <h2 className="text-sm text-gray-100 font-semibold my-3">
                        Pencarian Populer
                      </h2>
                      <ul>
                        {search.map((search) => (
                          <li
                            className="border-b border-solid border-gray-700"
                            key={search.id}
                          >
                            <div className="flex flex-row items-center">
                              <button
                                type="button"
                                onClick={() => {
                                  movePageFunction(`/search?q=${search.name}`);
                                  addSearchToHistory(search.name);
                                }}
                                className="w-full overflow-hidden py-3 pl-4 flex flex-row items-center hover:bg-pallete-1/20"
                              >
                                <ArrowTrendingUpIcon className="w-6 h-6 flex-shrink-0 mr-6 text-gray-100"></ArrowTrendingUpIcon>
                                <span className="text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">
                                  {search.name}
                                </span>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
          {/* <Transition appear show={openmodalother} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-[60] overflow-y-auto bg-gray-800/80"
              onClose={() => setOpenModalOther(false)}
            >
              <div className="min-h-screen text-center">
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
                  <div className="inline-block w-full h-screen max-w-full min-h-full p-6 overflow-hidden text-left align-middle transition-all transform bg-pallete-5/70">
                    <section className="flex gap-x-3 items-center">
                      <button
                        type="button"
                        onClick={() => setOpenModalOther(false)}
                        className="text-gray-300 hover:text-gray-100"
                      >
                        <ArrowLeftIcon className="h-6 w-6"></ArrowLeftIcon>
                      </button>
                    </section>
                    <section>
                      <h2 className="text-xl text-center text-gray-100 font-semibold my-3">
                        Kategori Lainnya
                      </h2>
                      <ul>
                        <li className="border-b border-solid border-gray-700 ">
                          <div className="flex flex-row items-center">
                            <a
                              href="#"
                              className="w-full overflow-hidden py-3 pl-4 flex flex-row items-center justify-center hover:bg-pallete-1/20"
                            >
                              <span className="text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">
                                Kids
                              </span>
                            </a>
                          </div>
                        </li>
                        <li className="border-b border-solid border-gray-700 ">
                          <div className="flex flex-row items-center">
                            <a
                              href="#"
                              className="w-full overflow-hidden py-3 pl-4 flex flex-row items-center justify-center hover:bg-pallete-1/20"
                            >
                              <span className="text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">
                                Premier
                              </span>
                            </a>
                          </div>
                        </li>
                        <li className="border-b border-solid border-gray-700 ">
                          <div className="flex flex-row items-center">
                            <a
                              href="#"
                              className="w-full overflow-hidden py-3 pl-4 flex flex-row items-center justify-center hover:bg-pallete-1/20"
                            >
                              <span className="text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">
                                Entertainment
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
          </Transition> */}
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;

"use client";

import Navbar from "@/components/Navbar/navbar";
import NavbarBottomMobile from "@/components/Navbar/navbar-bottom-mobile";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NavbarSearch from "../NavbarSearch";
import Loading from "@/components/Loading/loading";
import { analytics } from "@/lib/firebase";

export default function CollectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [loading, setLoading] = useState<boolean>(true);
  const [dataCollection, setDataCollection] = useState<any[]>([]);
  const [isVisibleFilter, setIsVisibleFilter] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("newest");
  const [stateView, setStateView] = useState("collection");
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [devicemobile, setDeviceMobile] = useState<boolean>(false);
  const [colorchange, setColorChange] = useState<boolean>(false);

  const curtaincontentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://luplay.co.id/api/search?q=${query}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setDataCollection(
          data.dataCollection.sort(
            (a: any, b: any) =>
              a.create_at.seconds - b.create_at.seconds ||
              a.create_at.nanoseconds - b.create_at.nanoseconds
          )
        );
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [query]);
  useEffect(() => {
    const changeNavbarColor = () => {
      if (window.scrollY >= 80) {
        setColorChange(true);
      } else {
        setColorChange(false);
      }
    };
    window.addEventListener("scroll", changeNavbarColor);
    return () => window.removeEventListener("scroll", changeNavbarColor);
  }, []);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setDeviceMobile(true);
    } else {
      setDeviceMobile(false);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      analytics;
      if (query !== null && query !== undefined && query !== "") {
        if (!loading) {
          setPageLoaded(true);
          setCheckboxCurtain(true);
        }
      } else {
        throw new Error("Kata pencarian tidak tersedia");
      }
    }
  }, [loading, query]);

  const toggleFilter = () => {
    setIsVisibleFilter(!isVisibleFilter);
  };

  const movePageFunction = (param: string) => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => {
      window.location.href = `https://luplay.co.id${param}`;
    });
  };

  const previousPageFunction = () => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.back());
  };

  return (
    <>
      {devicemobile ? (
        <header className={`${pageloaded ? "relative z-10" : "fixed z-0"}`}>
          <NavbarSearch
            param={query}
            movePageFunction={movePageFunction}
            previousPageFunction={previousPageFunction}
          ></NavbarSearch>
        </header>
      ) : (
        <header className="fixed z-20 w-full top-0 bg-black xl:bg-pallete-5 shadow-md">
          <Navbar movePageFunction={movePageFunction}></Navbar>
        </header>
      )}
      {devicemobile ? (
        <NavbarBottomMobile
          movePageFunction={movePageFunction}
        ></NavbarBottomMobile>
      ) : (
        <></>
      )}
      <div className={pageloaded ? "curtain" : "curtain h-screen"}>
        <div className="curtain__wrapper" id="curtain-wrappper">
          <input
            type="checkbox"
            disabled
            checked={!checkboxcurtain}
            className={`${pageloaded ? "z-0" : "z-50"}`}
          ></input>
          <div
            className={`curtain__panel ${
              colorchange ? `` : "h-screen"
            } curtain__panel--left`}
            style={{
              height: colorchange
                ? `${curtaincontentRef.current?.offsetHeight}px`
                : "",
            }}
          ></div>
          {!pageloaded ? <Loading></Loading> : <></>}
          <div className="curtain__content" ref={curtaincontentRef}>
            {pageloaded ? (
              <main>
                {dataCollection.length == 0 ? (
                  <div className="container mx-auto px-4 pt-4">
                    <div className="flex flex-col justify-center items-center text-lg my-0 md:my-16 lg:my-12 mx-auto relative text-center w-auto lg:w-[544px] z-[1]">
                      <Image
                        src={"/search-not-found.svg"}
                        alt="luplay-not-found"
                        className="h-80 w-80"
                        width={1980}
                        height={720}
                        priority
                      />
                      <h2 className="text-gray-100 text-2xl font-bold mt-10">
                        Oops !
                      </h2>
                      <p className="text-base text-gray-300 mt-2">
                        Yah, konten yang kamu cari tidak ditemukan
                      </p>
                    </div>
                    {/* <div className="text-sm font-bold my-16 mx-auto">
                      <div className="mb-4">
                        <h2 className="text-lg text-gray-100">
                          <span className="text-2xl font-bold">LUPLAY POPULER</span>
                        </h2>
                      </div>
                      <Swiper
                      slidesPerView={5}
                      spaceBetween={10}
                      centeredSlides={false}
                      className="home-carousel-swiper"
                    >
                      <SwiperSlide className="rounded-lg relative align-top !bg-transparent">
                        <a href="#" className="group">
                          <div className="relative">
                            <Image
                              src={trailer}
                              className="rounded-lg"
                              alt="Picture of the author"
                            />
                            <div className="absolute bottom-2 right-2">
                              <time className="text-[10px] py-[1px] px-[2px] bg-black/60 rounded-sm text-white text-center">
                                00:45
                              </time>
                            </div>
                          </div>
                          <div className="mt-2 px-1">
                            <p className="text-left line-clamp-2 group-hover:underline font-normal text-gray-100 text-sm mb-[2px] overflow-hidden text-ellipsis whitespace-normal">
                              Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI
                              Liga 1 2023/24
                            </p>
                          </div>
                        </a>
                      </SwiperSlide>
                      <SwiperSlide className="rounded-lg relative align-top !bg-transparent">
                        <a href="#" className="group">
                          <div className="relative">
                            <Image
                              src={trailer}
                              className="rounded-lg"
                              alt="Picture of the author"
                            />
                            <div className="absolute bottom-2 right-2">
                              <time className="text-[10px] py-[1px] px-[2px] bg-black/60 rounded-sm text-white text-center">
                                00:45
                              </time>
                            </div>
                          </div>
                          <div className="mt-2 px-1">
                            <p className="text-left line-clamp-2 group-hover:underline font-normal text-gray-100 text-sm mb-[2px] overflow-hidden text-ellipsis whitespace-normal">
                              Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI
                              Liga 1 2023/24
                            </p>
                          </div>
                        </a>
                      </SwiperSlide>
                      <SwiperSlide className="rounded-lg relative align-top !bg-transparent">
                        <a href="#" className="group">
                          <div className="relative">
                            <Image
                              src={trailer}
                              className="rounded-lg"
                              alt="Picture of the author"
                            />
                            <div className="absolute bottom-2 right-2">
                              <time className="text-[10px] py-[1px] px-[2px] bg-black/60 rounded-sm text-white text-center">
                                00:45
                              </time>
                            </div>
                          </div>
                          <div className="mt-2 px-1">
                            <p className="text-left line-clamp-2 group-hover:underline font-normal text-gray-100 text-sm mb-[2px] overflow-hidden text-ellipsis whitespace-normal">
                              Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI
                              Liga 1 2023/24
                            </p>
                          </div>
                        </a>
                      </SwiperSlide>
                      <SwiperSlide className="rounded-lg relative align-top !bg-transparent">
                        <a href="#" className="group">
                          <div className="relative">
                            <Image
                              src={trailer}
                              className="rounded-lg"
                              alt="Picture of the author"
                            />
                            <div className="absolute bottom-2 right-2">
                              <time className="text-[10px] py-[1px] px-[2px] bg-black/60 rounded-sm text-white text-center">
                                00:45
                              </time>
                            </div>
                          </div>
                          <div className="mt-2 px-1">
                            <p className="text-left line-clamp-2 group-hover:underline font-normal text-gray-100 text-sm mb-[2px] overflow-hidden text-ellipsis whitespace-normal">
                              Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI
                              Liga 1 2023/24
                            </p>
                          </div>
                        </a>
                      </SwiperSlide>
                      <SwiperSlide className="rounded-lg relative align-top !bg-transparent">
                        <a href="#" className="group">
                          <div className="relative">
                            <Image
                              src={trailer}
                              className="rounded-lg"
                              alt="Picture of the author"
                            />
                            <div className="absolute bottom-2 right-2">
                              <time className="text-[10px] py-[1px] px-[2px] bg-black/60 rounded-sm text-white text-center">
                                00:45
                              </time>
                            </div>
                          </div>
                          <div className="mt-2 px-1">
                            <p className="text-left line-clamp-2 group-hover:underline font-normal text-gray-100 text-sm mb-[2px] overflow-hidden text-ellipsis whitespace-normal">
                              Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI
                              Liga 1 2023/24
                            </p>
                          </div>
                        </a>
                      </SwiperSlide>
                    </Swiper>
                    </div> */}
                  </div>
                ) : devicemobile ? (
                  <div>
                    <div className="text-white text-sm mx-4">
                      <div>
                        Hasil pencarian koleksi untuk{" "}
                        <strong className="text-pallete-4">{query}</strong>
                      </div>
                    </div>
                    <ul className="grid grid-cols-3 gap-[13px] m-4 p-0">
                      {(filter === "most"
                        ? [...dataCollection].sort((a, b) => b.views - a.views)
                        : dataCollection
                      ).map((item: any) => (
                        <li
                          key={item.id_doc}
                          className="inline-block w-full mr-4"
                        >
                          <button
                            onClick={() =>
                              movePageFunction(
                                `/${item.type}/${
                                  item.id_doc
                                }/${item.title.replace(/\s+/g, "-")}`
                              )
                            }
                            className="group"
                          >
                            <div className="relative overflow-hidden rounded-md">
                              <Image
                                src={item.image_potrait_thumbnail}
                                width={156}
                                height={225}
                                className="rounded-md brightness-75 transition-all ease-in duration-200 group-hover:brightness-100 group-hover:scale-105"
                                alt={item.title + `-potrait-thumbnails`}
                              />
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <div className="mt-12 overflow-hidden">
                      <div className="mx-auto flex justify-center max-w-[1366px] min-w-[1366px] p-[32px_0_24px] before:content-[' '] before:table after:clear-both after:content-[' '] after:table">
                        <div className="mr-4 mt-4 w-56">
                          <div className="fixed text-left">
                            <ul className="flex flex-col overflow-hidden">
                              <li>
                                <div
                                  onClick={() =>
                                    movePageFunction("/search?q=" + query)
                                  }
                                  className={`cursor-pointer hover:text-white block text-base font-bold leading-[1.38em] p-[13px_24px] capitalize ${
                                    stateView == "all"
                                      ? "text-white border-l-[3px] border-pallete-4"
                                      : "text-gray-400 border-l-[3px] border-gray-800"
                                  }`}
                                >
                                  Semua
                                </div>
                              </li>
                              {dataCollection.length !== 0 ? (
                                <li>
                                  <div
                                    onClick={() => setStateView("collection")}
                                    className={`cursor-pointer hover:text-white block text-base font-bold leading-[1.38em] p-[13px_24px] capitalize ${
                                      stateView == "collection"
                                        ? "text-white border-l-[3px] border-pallete-4"
                                        : "text-gray-400 border-l-[3px] border-gray-800"
                                    }`}
                                  >
                                    Koleksi
                                  </div>
                                </li>
                              ) : (
                                <></>
                              )}
                            </ul>
                          </div>
                        </div>
                        <div className="max-w-[880px] flex-[1_1]">
                          <div className="mb-[25px]">
                            <div className="flex items-center justify-between">
                              <div className="text-base font-semibold text-white">
                                Hasil pencarian untuk{" "}
                                <span className="font-bold text-pallete-4">
                                  {query}
                                </span>
                              </div>
                              <div>
                                <div
                                  className="mr-0 text-base font-semibold text-gray-200 bg-gray-600 rounded-[20px] cursor-pointer inline-block leading-[1] p-[9px_16px]"
                                  onClick={toggleFilter}
                                >
                                  Filter Hasil
                                  <ChevronDownIcon
                                    className={`${
                                      isVisibleFilter ? "rotate-180 " : ""
                                    }inline-block ml-2 h-4 w-4`}
                                  ></ChevronDownIcon>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`${
                                isVisibleFilter ? "max-h-[127px]" : "max-h-0"
                              } overflow-hidden transition-all duration-500`}
                            >
                              <hr className="border-b border-b-gray-600 my-[1.5em]" />
                              <div className="flex pb-3">
                                <div>
                                  <div className="font-semibold mb-[11px] text-white text-sm">
                                    Urutkan dari
                                  </div>
                                  <span
                                    onClick={() => setFilter("newest")}
                                    className={`${
                                      filter === "newest"
                                        ? "text-gray-900 bg-gray-200"
                                        : "text-gray-200 bg-gray-600"
                                    } rounded-[20px] cursor-pointer font-semibold inline-block text-sm leading-[1em] mr-2 p-[9px_16px]`}
                                  >
                                    Terkini
                                  </span>
                                  <span
                                    onClick={() => setFilter("most")}
                                    className={`${
                                      filter === "most"
                                        ? "text-gray-900 bg-gray-200"
                                        : "text-gray-200 bg-gray-600"
                                    } rounded-[20px] cursor-pointer font-semibold inline-block text-sm leading-[1em] mr-2 p-[9px_16px]`}
                                  >
                                    Paling Banyak Diputar
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {dataCollection.length !== 0 ? (
                            <ul>
                              <div>
                                {(filter === "most"
                                  ? [...dataCollection].sort(
                                      (a, b) => b.views - a.views
                                    )
                                  : dataCollection
                                ).map((item: any) => (
                                  <li
                                    key={item.id_doc}
                                    className="inline-block w-[155px] mr-4"
                                  >
                                    <button
                                      onClick={() =>
                                        movePageFunction(
                                          `/${item.type}/${
                                            item.id_doc
                                          }/${item.title.replace(/\s+/g, "-")}`
                                        )
                                      }
                                      className="group"
                                    >
                                      <div className="relative overflow-hidden rounded-md">
                                        <Image
                                          src={item.image_potrait_thumbnail}
                                          width={156}
                                          height={225}
                                          className="rounded-md brightness-75 transition-all ease-in duration-200 group-hover:brightness-100 group-hover:scale-105"
                                          alt={
                                            item.title + `-potrait-thumbnails`
                                          }
                                        />
                                      </div>
                                    </button>
                                  </li>
                                ))}
                              </div>
                            </ul>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="basis-[203px]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </main>
            ) : (
              <></>
            )}
          </div>
          <div
            className={`curtain__panel ${
              colorchange ? `` : "h-screen"
            } curtain__panel--right`}
            style={{
              height: colorchange
                ? `${curtaincontentRef.current?.offsetHeight}px`
                : "",
            }}
          ></div>
        </div>
      </div>
      {devicemobile ? (
        <></>
      ) : (
        <footer className="w-full mx-auto px-2 sm:px-6 lg:px-8 shadow m-4">
          <div className="bg-pallete-4 rounded-lg mx-auto 3xl:max-w-7xl p-4 md:flex md:items-center justify-center">
            <span className="text-sm text-gray-100 text-center">
              © 2024{" "}
              <a href="https://luplay.co.id/" className="hover:underline">
                Luplay.co.id
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </footer>
      )}
    </>
  );
}

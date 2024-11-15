"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar/navbar";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Loading from "@/components/Loading/loading";
import NavbarBottomMobile from "@/components/Navbar/navbar-bottom-mobile";
import { analytics } from "@/lib/firebase";

export default function Page() {
  const router = useRouter();
  const params = useParams<{ type: string; genre: string }>();

  const [bucketdata, setBucketData] = useState<any[]>([]);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [colorchange, setColorChange] = useState<boolean>(false);
  const [devicemobile, setDeviceMobile] = useState<boolean>(false);

  const curtaincontentRef = useRef<HTMLDivElement>(null);

  const fetchDataMovies = async () => {
    try {
      await fetch(`https://luplay.co.id/api/data/video/movies`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        if (response.status != 200) {
          // console.error(response);
        } else {
          setBucketData(data.bucketdata);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataSeries = async () => {
    try {
      await fetch(`https://luplay.co.id/api/data/video/series`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        if (response.status != 200) {
          // console.error(response);
        } else {
          setBucketData(data.bucketdata);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.type == "movies") {
      fetchDataMovies();
    } else if (params.type == "series") {
      fetchDataSeries();
    } else {
      return notFound;
    }
  }, [params.type, bucketdata]);
  useEffect(() => {
    if (window.pageYOffset >= 80) {
      setColorChange(true);
    }
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
    if (typeof window !== "undefined") {
      analytics;
      if (bucketdata.length != 0) {
        setPageLoaded(true);
        setCheckboxCurtain(true);
      }
    }
  }, [bucketdata.length]);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setDeviceMobile(true);
    } else {
      setDeviceMobile(false);
    }
  }, []);

  const movePageFunction = (param: string) => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.push(param, { scroll: false }));
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
      <header className="fixed z-10 w-full top-0 bg-black xl:bg-pallete-5 shadow-md">
        <Navbar movePageFunction={movePageFunction}></Navbar>
      </header>
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
            {bucketdata.filter(
              (item: any) =>
                item.status === "live" && item.genre.value === params.genre
            ).length != 0 ? (
              pageloaded ? (
                <div className="min-h-[96vh] mx-auto before:content-[''] before:table">
                  <div className="float-right w-full">
                    <div className="mt-14 overflow-hidden">
                      <article className="px-6 block mx-auto max-w-6xl"></article>
                      <main className="mx-auto max-w-6xl p-6 block before:content-[''] before:table">
                        <div className="hidden xl:block sections-overlay-background"></div>
                        <div className="relative bg-pallete-4 rounded-2xl shadow-md mt-10 py-5 px-8 md:py-10 md:px-16 after:content-[''] after:table after:clear-both">
                          <button
                            type="button"
                            className="bg-white rounded-full p-2 absolute -left-2 -top-2"
                            onClick={() => previousPageFunction()}
                          >
                            <ArrowLeftIcon className="h-4 w-4"></ArrowLeftIcon>
                          </button>
                          <section className="w-full mx-auto mb-6 relative block">
                            <div className="mb-4 lg:mb-8 flex justify-between ">
                              <h2 className="text-xl font-bold text-gray-100 capitalize">
                                {params.genre === "romance"
                                  ? "romantis"
                                  : params.genre === "comedy"
                                  ? "komedi"
                                  : params.genre === "action"
                                  ? "aksi"
                                  : params.genre}
                              </h2>
                            </div>
                            <div className="relative">
                              <ul className="-ml-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                                {bucketdata
                                  .filter(
                                    (item: any) =>
                                      item.status === "live" &&
                                      item.genre.value === params.genre
                                  )
                                  .map((item: any, index: number) => (
                                    <li
                                      className="p-2 inline-block align-top"
                                      key={index}
                                    >
                                      <div className="">
                                        <button
                                          onClick={() =>
                                            movePageFunction(
                                              `/${item.type}/${
                                                item.id_doc
                                              }/${item.title.replace(
                                                /\s+/g,
                                                "-"
                                              )}`
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
                                                item.title +
                                                `-potrait-thumbnails`
                                              }
                                            />
                                          </div>
                                        </button>
                                      </div>
                                    </li>
                                  ))}
                              </ul>
                              {/* <button
                                type="button"
                                className="flex min-w-[40px] py-2 px-4 gap-x-2 bg-pallete-1 hover:bg-pallete-3 rounded shadow-lg text-gray-900 text-center items-center font-bold justify-center mt-5 w-full transition-all duration-200 ease-linear"
                              >
                                Lihat Lainnya
                                <ChevronDownIcon className="h-5 w-5"></ChevronDownIcon>
                              </button> */}
                            </div>
                          </section>
                        </div>
                      </main>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )
            ) : (
              <div className="flex flex-col justify-center items-center text-lg my-16 lg:my-12 mx-auto relative text-center w-auto lg:w-[544px] z-[1]">
                <Image
                  src={"/no-data.svg"}
                  alt="luplay-not-data"
                  className="h-80 w-80"
                  width={1980}
                  height={720}
                  priority
                />
                <h2 className="text-gray-100 text-2xl font-bold mt-10">
                  Oops !
                </h2>
                <p className="text-base text-gray-300 mt-2">
                  Tidak ada data yang ditampilkan
                </p>
              </div>
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

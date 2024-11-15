"use client";

import NavbarBottomMobile from "@/components/Navbar/navbar-bottom-mobile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import star from "../../public/star.svg";
import Navbar from "@/components/Trending/Navbar";
import Loading from "@/components/Loading/loading";
import { analytics } from "@/lib/firebase";

export default function Page() {
  const router = useRouter();

  const [bucketdataslider, setBucketDataSlider] = useState<any[]>([]);
  const [bucketdatamovies, setBucketDataMovies] = useState<any[]>([]);
  const [bucketdataseries, setBucketDataSeries] = useState<any[]>([]);
  const [colorchange, setColorChange] = useState<boolean>(false);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [toggleskeleton, setToggleSkeleton] = useState<boolean>(true);

  const curtaincontentRef = useRef<HTMLDivElement>(null);

  const fetchDataMovies = async () => {
    try {
      await fetch(`https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/data/video/movies`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        if (response.status != 200) {
          // console.error(response);
        } else {
          setBucketDataMovies(data.bucketdata);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataSeries = async () => {
    try {
      await fetch(`https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/data/video/series`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        if (response.status != 200) {
          // console.error(response);
        } else {
          setBucketDataSeries(data.bucketdata);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataSlider = async () => {
    try {
      await fetch(`https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/data/slider`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        if (response.status != 200) {
          // console.error(response);
        } else {
          setBucketDataSlider(data.bucketdata);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataMovies();
    fetchDataSeries();
    fetchDataSlider();
  }, []);
  useEffect(() => {
    if (window.innerWidth > 768) {
      router.back();
    }
  }, [router]);
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
    if (typeof window !== "undefined") {
      analytics;
      if (
        bucketdatamovies.length != 0 ||
        bucketdataseries.length !== 0 ||
        bucketdataslider.length !== 0
      ) {
        setPageLoaded(true);
        setCheckboxCurtain(true);
      }
    }
  }, [
    bucketdatamovies.length,
    bucketdataseries.length,
    bucketdataslider.length,
  ]);
  useEffect(() => {
    setTimeout(function () {
      setToggleSkeleton(false);
    }, 2000);
  }, []);
  useEffect(() => {
    if (window.innerWidth > 768) {
      router.back();
    }
  }, [router]);

  const movePageFunction = (param: string) => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.push(param, { scroll: false }));
  };

  return (
    <>
      <header className={`fixed z-10 bg-black w-full`}>
        <Navbar></Navbar>
      </header>
      <NavbarBottomMobile
        movePageFunction={movePageFunction}
      ></NavbarBottomMobile>
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
                <div className="mx-4 sm:mx-auto sm:max-w-xl md:max-w-2xl py-0 mb-6">
                  <section className="mb-6 mt-14">
                    <Swiper
                      slidesPerView={1.1}
                      spaceBetween={10}
                      centeredSlides={true}
                      autoplay={{
                        delay: 50000,
                      }}
                      modules={[Autoplay]}
                      loop={true}
                      className="mobile-carousel-swiper"
                    >
                      {bucketdataslider
                        .sort((a, b) => a.index - b.index)
                        .map((item: any, index: number) => (
                          <SwiperSlide className="rounded" key={index}>
                            <button
                              type="button"
                              className="w-full"
                              onClick={() => {
                                const foundObject = (bucketdatamovies || [])
                                  .concat(bucketdataseries || [])
                                  .find((obj) => obj.id_doc === item.video.id);

                                if (foundObject) {
                                  movePageFunction(
                                    `/${foundObject.type}/${
                                      item.video.id
                                    }/${item.video.title.replace(/\s+/g, "-")}`
                                  );
                                }
                              }}
                            >
                              <Image
                                src={item.image_slider_mobile}
                                width={480}
                                height={288}
                                className="aspect-[16/9] rounded"
                                alt={item.video.title + `-banner-mobile`}
                              />
                            </button>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </section>
                  <div className="mx-4 py-0 mb-20">
                    <section className="mb-6 relative">
                      <h2 className="text-xl text-gray-100 font-semibold mb-3">
                        Top Series{" "}
                        {bucketdataseries
                          .filter((item: any) => item.status === "live")
                          .sort((a, b) => b.views - a.views).length > 20
                          ? "20"
                          : bucketdataseries
                              .filter((item: any) => item.status === "live")
                              .sort((a, b) => b.views - a.views).length}{" "}
                        Minggu Ini
                      </h2>
                      {toggleskeleton ? (
                        <SkeletonTheme
                          baseColor="#202020"
                          highlightColor="#444"
                          height={232}
                        >
                          <Skeleton></Skeleton>
                        </SkeletonTheme>
                      ) : (
                        <Swiper
                          breakpoints={{
                            0: {
                              slidesPerView: 2.7,
                              spaceBetween: 10,
                            },
                            768: {
                              slidesPerView: 3.7,
                              spaceBetween: 10,
                            },
                            1024: {
                              slidesPerView: 5.7,
                              spaceBetween: 10,
                            },
                            1280: {
                              slidesPerView: 6,
                              spaceBetween: 10,
                            },
                          }}
                          centeredSlides={false}
                          navigation={true}
                          modules={[Navigation]}
                          className={`top-carousel-swiper bg-black h-auto lg:h-[230px] xl:h-[280px] rounded-md`}
                        >
                          {bucketdataseries
                            .slice(0, 20)
                            .filter((item: any) => item.status === "live")
                            .sort((a, b) => b.views - a.views)
                            .map((item: any, index: number) => (
                              <SwiperSlide
                                className="rounded-md shadow-md !flex items-center pl-6"
                                key={index}
                              >
                                <div
                                  className={`self-end flex absolute left-0 z-10 bg-pallete-4/80 p-2 rounded-full`}
                                >
                                  <Image
                                    src={star}
                                    className="top-number h-8 w-auto"
                                    alt={`number-${index + 1}-top-series`}
                                    height={48}
                                    width={48}
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    movePageFunction(
                                      `/${item.type}/${
                                        item.id_doc
                                      }/${item.title.replace(/\s+/g, "-")}`
                                    )
                                  }
                                  className="group"
                                >
                                  <div className="relative">
                                    <Image
                                      src={item.image_potrait_thumbnail}
                                      className="rounded-md brightness-75 transition-all ease-in duration-200 group-hover:brightness-100"
                                      alt={item.title + `-potrait-thumbnails`}
                                      width={156}
                                      height={225}
                                    />
                                  </div>
                                </button>
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      )}
                    </section>
                  </div>
                </div>
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
      <footer className="max-md:hidden w-full mx-auto px-2 sm:px-6 lg:px-8 shadow m-4">
        <div className="bg-pallete-4 rounded-lg mx-auto 3xl:max-w-7xl p-4 md:flex md:items-center justify-center">
          <span className="text-sm text-gray-100 text-center">
            © 2024{" "}
            <a href="https://luplay-web--lunarvisionapp.us-central1.hosted.app/" className="hover:underline">
              Luplay.co.id
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

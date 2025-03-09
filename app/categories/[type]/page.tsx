"use client";
import Navbar from "@/components/Navbar/navbar";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import crown from "../../../public/crown.png";
import { notFound, useParams, useRouter } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "@/components/Loading/loading";
import NavbarBottomMobile from "@/components/Navbar/navbar-bottom-mobile";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const router = useRouter();
  const params = useParams<{ type: string }>();

  const [bucketdataslider, setBucketDataSlider] = useState<any[]>([]);
  const [bucketdatamovies, setBucketDataMovies] = useState<any[]>([]);
  const [bucketdataseries, setBucketDataSeries] = useState<any[]>([]);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [devicemobile, setDeviceMobile] = useState<boolean>(false);
  const [toggleskeleton, setToggleSkeleton] = useState<boolean>(true);
  const [colorchange, setColorChange] = useState<boolean>(false);

  const curtaincontentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDataMovies = async () => {
      try {
        const moviesRef = collection(db, "movies");
        const moviesQuery = query(moviesRef, where("status", "==", "live"));
        const moviesSnapshot = await getDocs(moviesQuery);
        const moviesData = moviesSnapshot.docs.map(doc => ({
          id_doc: doc.id,
          ...doc.data()
        }));
        setBucketDataMovies(moviesData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataSeries = async () => {
      try {
        const seriesRef = collection(db, "series");
        const seriesQuery = query(seriesRef, where("status", "==", "live"));
        const seriesSnapshot = await getDocs(seriesQuery);
        const seriesData = seriesSnapshot.docs.map(doc => ({
          id_doc: doc.id,
          ...doc.data()
        }));
        setBucketDataSeries(seriesData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataSlider = async () => {
      try {
        const sliderRef = collection(db, "slider");
        const sliderSnapshot = await getDocs(sliderRef);
        const sliderData = sliderSnapshot.docs.map(doc => ({
          id_doc: doc.id,
          ...doc.data()
        }));
        
        if (params.type === "movies") {
          const resultArray = sliderData.filter(item => {
            return bucketdatamovies.some(movie => movie.id_doc === item.video?.id);
          });
          setBucketDataSlider(resultArray);
        } else if (params.type === "series") {
          const resultArray = sliderData.filter(item => {
            return bucketdataseries.some(series => series.id_doc === item.video?.id);
          });
          setBucketDataSlider(resultArray);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (params.type === "movies") {
      fetchDataMovies();
    } else if (params.type === "series") {
      fetchDataSeries();
    } else {
      return notFound;
    }

    if (bucketdatamovies.length > 0 || bucketdataseries.length > 0) {
      fetchDataSlider();
    }
  }, [params.type, bucketdatamovies, bucketdataseries]);

  useEffect(() => {
    setTimeout(() => {
      setToggleSkeleton(false);
    }, 2000);
  }, []);

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
      if (bucketdatamovies.length > 0 || bucketdataseries.length > 0) {
        setPageLoaded(true);
        setCheckboxCurtain(true);
      }
    }
  }, [bucketdatamovies.length, bucketdataseries.length]);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setDeviceMobile(true);
    } else {
      setDeviceMobile(false);
    }
  }, []);

  const movePageFunction = (param: string) => {
    setCheckboxCurtain(current => !current);
    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.push(param, { scroll: false }));
  };

  return (
    <>
      <header
        className={`fixed z-10 w-full transition-all duration-300 top-0 ${
          colorchange
            ? "bg-black xl:bg-pallete-5 shadow-md "
            : "bg-transparent inner-shadow-header max-[768px]:bg-black"
        }`}
      >
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
            {params.type == "movies" ? (
              bucketdatamovies.length != 0 ? (
                pageloaded ? (
                  <main>
                    {devicemobile ? (
                      <section className="mb-6 mt-24 ">
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
                                      .find(
                                        (obj) => obj.id_doc === item.video.id
                                      );

                                    if (foundObject) {
                                      movePageFunction(
                                        `/${foundObject.type}/${
                                          item.video.id
                                        }/${item.video.title.replace(
                                          /\s+/g,
                                          "-"
                                        )}`
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
                    ) : (
                      <Swiper
                        autoplay={{
                          delay: 25000,
                          disableOnInteraction: false,
                        }}
                        pagination={{
                          dynamicBullets: true,
                          clickable: true,
                        }}
                        modules={[Autoplay, Pagination, Navigation, EffectFade]}
                        loop={true}
                        navigation={true}
                        effect="fade"
                        className="main-carousel-swiper"
                      >
                        {bucketdataslider
                          .sort((a, b) => a.index - b.index)
                          .map((item: any, index: number) => (
                            <SwiperSlide key={index}>
                              <div className={`h-full`}>
                                <Image
                                  src={item.image_slider_desktop}
                                  width={1366}
                                  height={480}
                                  alt={item.video.title + `-banner-desktop`}
                                />
                              </div>
                              <div className="h-full left-1/2 absolute top-0 -translate-x-1/2 w-[1052px] z-[3]">
                                <div className="inline-block h-auto lg:left-40 xl:left-[5px] absolute text-left lg:top-[50%] xl:top-[40%] -translate-y-1/2 whitespace-normal w-96 z-[3]">
                                  <h3 className="text-4xl text-white font-bold text-left">
                                    {item.video.title}
                                  </h3>
                                  <p className="text-white text-base font-normal line-clamp-3 text-left my-4">
                                    {(() => {
                                      const foundObject = (
                                        bucketdatamovies || []
                                      )
                                        .concat(bucketdataseries || [])
                                        .find(
                                          (obj) => obj.id_doc === item.video.id
                                        );

                                      const synopsis = foundObject
                                        ? foundObject.synopsis
                                        : "...";

                                      return synopsis;
                                    })()}
                                  </p>
                                  <span className="flex">
                                    <div
                                      className="bg-[50%] bg-no-repeat bg-[length:24px_24px] rounded-lg inline-block h-6 w-6 mr-5 relative"
                                      style={{
                                        backgroundImage: `url(${crown.src})`,
                                      }}
                                    ></div>
                                    <div className="text-xs font-semibold text-gray-300 inline-block pt-2 uppercase">
                                      {item.tagline}
                                    </div>
                                  </span>
                                  <button
                                    onClick={() => {
                                      const foundObject = (
                                        bucketdatamovies || []
                                      )
                                        .concat(bucketdataseries || [])
                                        .find(
                                          (obj) => obj.id_doc === item.video.id
                                        );

                                      if (foundObject) {
                                        movePageFunction(
                                          `/${foundObject.type}/${
                                            item.video.id
                                          }/${item.video.title.replace(
                                            /\s+/g,
                                            "-"
                                          )}`
                                        );
                                      }
                                    }}
                                    type="button"
                                    className="flex flex-row items-center gap-x-2 mt-8 bg-pallete-4 hover:bg-pallete-3 text-white px-12 py-3 text-sm rounded-full font-semibold transition-all duration-200 ease-linear"
                                  >
                                    <PlayCircleIcon className="w-4 h-4"></PlayCircleIcon>
                                    Cek Sekarang
                                  </button>
                                </div>
                              </div>
                              <div className="overlay-gradient-video"></div>
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    )}
                    <div className="mx-4 sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-0 lg:py-12 mb-20 lg:mb-0">
                      <section className="mb-6 relative">
                        <ul className="opacity-100 overflow-x-[initial] overflow-hidden whitespace-nowrap -ml-2">
                          <div className="overflow-hidden block relative">
                            <div className="opacity-100 flex justify-center relative before:content-[''] before:table">
                              {bucketdatamovies.filter(
                                (item: any) =>
                                  item.status === "live" &&
                                  item.genre.value === "romance"
                              ).length !== 0 ? (
                                <li className="w-16 md:w-20 lg:w-28 xl:w-[121px] block p-2 align-top float-left h-full min-h-[1px]">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        movePageFunction(
                                          `/categories/${params.type}/romance`
                                        )
                                      }
                                      className="group w-full"
                                    >
                                      <div
                                        className="bg-[50%] bg-no-repeat bg-[length:2em]  md:bg-[length:2.75rem] lg:bg-[length:4rem] shadow-md bg-pallete-4/30 pb-[100%] w-full rounded-full group-hover:scale-110 transition-all duration-200 ease-linear"
                                        style={{
                                          backgroundImage: `url(/love.svg)`,
                                        }}
                                      ></div>
                                      <p className="line-clamp-2 text-gray-100 block text-sm mt-2 max-h-[36.4px] text-center text-ellipsis whitespace-[inherit] font-normal">
                                        Romantis
                                      </p>
                                    </button>
                                  </div>
                                </li>
                              ) : (
                                <></>
                              )}
                              {bucketdatamovies.filter(
                                (item: any) =>
                                  item.status === "live" &&
                                  item.genre.value === "drama"
                              ).length !== 0 ? (
                                <li className="w-16 md:w-20 lg:w-28 xl:w-[121px] block p-2 align-top float-left h-full min-h-[1px]">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        movePageFunction(
                                          `/categories/${params.type}/drama`
                                        )
                                      }
                                      className="group w-full"
                                    >
                                      <div
                                        className="bg-[50%] bg-no-repeat bg-[length:2em]  md:bg-[length:2.75rem] lg:bg-[length:4rem] shadow-md bg-pallete-4/30 pb-[100%] w-full rounded-full group-hover:scale-110 transition-all duration-200 ease-linear"
                                        style={{
                                          backgroundImage: `url(/drama.svg)`,
                                        }}
                                      ></div>
                                      <p className="line-clamp-2 text-gray-100 block text-sm mt-2 max-h-[36.4px] text-center text-ellipsis whitespace-[inherit] font-normal">
                                        Drama
                                      </p>
                                    </button>
                                  </div>
                                </li>
                              ) : (
                                <></>
                              )}
                              {bucketdatamovies.filter(
                                (item: any) =>
                                  item.status === "live" &&
                                  item.genre.value === "comedy"
                              ).length !== 0 ? (
                                <li className="w-16 md:w-20 lg:w-28 xl:w-[121px] block p-2 align-top float-left h-full min-h-[1px]">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        movePageFunction(
                                          `/categories/${params.type}/comedy`
                                        )
                                      }
                                      className="group w-full"
                                    >
                                      <div
                                        className="bg-[50%] bg-no-repeat bg-[length:2em]  md:bg-[length:2.75rem] lg:bg-[length:4rem] shadow-md bg-pallete-4/30 pb-[100%] w-full rounded-full group-hover:scale-110 transition-all duration-200 ease-linear"
                                        style={{
                                          backgroundImage: `url(/comedy.svg)`,
                                        }}
                                      ></div>
                                      <p className="line-clamp-2 text-gray-100 block text-sm mt-2 max-h-[36.4px] text-center text-ellipsis whitespace-[inherit] font-normal">
                                        Komedi
                                      </p>
                                    </button>
                                  </div>
                                </li>
                              ) : (
                                <></>
                              )}
                              {bucketdatamovies.filter(
                                (item: any) =>
                                  item.status === "live" &&
                                  item.genre.value === "action"
                              ).length !== 0 ? (
                                <li className="w-16 md:w-20 lg:w-28 xl:w-[121px] block p-2 align-top float-left h-full min-h-[1px]">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        movePageFunction(
                                          `/categories/${params.type}/action`
                                        )
                                      }
                                      className="group w-full"
                                    >
                                      <div
                                        className="bg-[50%] bg-no-repeat bg-[length:2em]  md:bg-[length:2.75rem] lg:bg-[length:4rem] shadow-md bg-pallete-4/30 pb-[100%] w-full rounded-full group-hover:scale-110 transition-all duration-200 ease-linear"
                                        style={{
                                          backgroundImage: `url(/action.svg)`,
                                        }}
                                      ></div>
                                      <p className="line-clamp-2 text-gray-100 block text-sm mt-2 max-h-[36.4px] text-center text-ellipsis whitespace-[inherit] font-normal">
                                        Aksi
                                      </p>
                                    </button>
                                  </div>
                                </li>
                              ) : (
                                <></>
                              )}
                              {bucketdatamovies.filter(
                                (item: any) =>
                                  item.status === "live" &&
                                  item.genre.value === "horor"
                              ).length !== 0 ? (
                                <li className="w-16 md:w-20 lg:w-28 xl:w-[121px] block p-2 align-top float-left h-full min-h-[1px]">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        movePageFunction(
                                          `/categories/${params.type}/horor`
                                        )
                                      }
                                      className="group w-full"
                                    >
                                      <div
                                        className="bg-[50%] bg-no-repeat bg-[length:2em]  md:bg-[length:2.75rem] lg:bg-[length:4rem] shadow-md bg-pallete-4/30 pb-[100%] w-full rounded-full group-hover:scale-110 transition-all duration-200 ease-linear"
                                        style={{
                                          backgroundImage: `url(/horor.svg)`,
                                        }}
                                      ></div>
                                      <p className="line-clamp-2 text-gray-100 block text-sm mt-2 max-h-[36.4px] text-center text-ellipsis whitespace-[inherit] font-normal">
                                        Horor
                                      </p>
                                    </button>
                                  </div>
                                </li>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </ul>
                        <div className="relative"></div>
                      </section>
                      {bucketdatamovies.filter(
                        (item: any) =>
                          item.status === "live" &&
                          item.genre.value === "romance"
                      ).length !== 0 ? (
                        <section className="mb-6 relative">
                          {toggleskeleton ? (
                            <>
                              <SkeletonTheme
                                baseColor="#202020"
                                highlightColor="#444"
                                height={20}
                              >
                                <Skeleton />
                              </SkeletonTheme>
                              <div className="flex gap-x-2 overflow-clip mt-3">
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between mb-3 items-center">
                                <h2 className="text-xl text-gray-100 font-semibold">
                                  Romantis
                                </h2>
                                <span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/romance`
                                      )
                                    }
                                  >
                                    <ChevronRightIcon className="h-4 w-4 text-gray-100"></ChevronRightIcon>
                                  </button>
                                </span>
                              </div>
                              <Swiper
                                breakpoints={{
                                  0: {
                                    slidesPerView: 3.7,
                                    spaceBetween: 10,
                                  },
                                  768: {
                                    slidesPerView: 4.7,
                                    spaceBetween: 10,
                                  },
                                  1024: {
                                    slidesPerView: 6.7,
                                    spaceBetween: 10,
                                  },
                                  1280: {
                                    slidesPerView: 7,
                                    spaceBetween: 10,
                                  },
                                }}
                                centeredSlides={false}
                                navigation={true}
                                modules={[Navigation]}
                                className={`home-carousel-swiper`}
                              >
                                {bucketdatamovies
                                  .slice(0, 10)
                                  .filter(
                                    (item: any) =>
                                      item.status === "live" &&
                                      item.genre.value === "romance"
                                  )
                                  .map((item: any, index: number) => (
                                    <SwiperSlide
                                      className={`rounded-md shadow-md`}
                                      style={{
                                        animationDelay: `${calculateDelay(
                                          index
                                        )}s`,
                                      }}
                                      key={index}
                                    >
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
                                              item.title + `-potrait-thumbnails`
                                            }
                                          />
                                        </div>
                                      </button>
                                    </SwiperSlide>
                                  ))}
                                <SwiperSlide
                                  className={`rounded-md shadow-md max-xl:bg-pallete-4/30 p-2`}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/romance`
                                      )
                                    }
                                    className="group h-full"
                                  >
                                    <div className="relative contents">
                                      <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300 group-hover:underline">
                                        Lihat semua Romantis
                                        <div className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                                          Movies Luplay
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </SwiperSlide>
                              </Swiper>
                            </>
                          )}
                        </section>
                      ) : (
                        <></>
                      )}
                      {bucketdatamovies.filter(
                        (item: any) =>
                          item.status === "live" && item.genre.value === "drama"
                      ).length !== 0 ? (
                        <section className="mb-6 relative">
                          {toggleskeleton ? (
                            <>
                              <SkeletonTheme
                                baseColor="#202020"
                                highlightColor="#444"
                                height={20}
                              >
                                <Skeleton />
                              </SkeletonTheme>
                              <div className="flex gap-x-2 overflow-clip mt-3">
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between mb-3 items-center">
                                <h2 className="text-xl text-gray-100 font-semibold">
                                  Drama
                                </h2>
                                <span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/drama`
                                      )
                                    }
                                  >
                                    <ChevronRightIcon className="h-4 w-4 text-gray-100"></ChevronRightIcon>
                                  </button>
                                </span>
                              </div>
                              <Swiper
                                breakpoints={{
                                  0: {
                                    slidesPerView: 3.7,
                                    spaceBetween: 10,
                                  },
                                  768: {
                                    slidesPerView: 4.7,
                                    spaceBetween: 10,
                                  },
                                  1024: {
                                    slidesPerView: 6.7,
                                    spaceBetween: 10,
                                  },
                                  1280: {
                                    slidesPerView: 7,
                                    spaceBetween: 10,
                                  },
                                }}
                                centeredSlides={false}
                                navigation={true}
                                modules={[Navigation]}
                                className={`home-carousel-swiper`}
                              >
                                {bucketdatamovies
                                  .slice(0, 10)
                                  .filter(
                                    (item: any) =>
                                      item.status === "live" &&
                                      item.genre.value === "drama"
                                  )
                                  .map((item: any, index: number) => (
                                    <SwiperSlide
                                      className={`rounded-md shadow-md`}
                                      style={{
                                        animationDelay: `${calculateDelay(
                                          index
                                        )}s`,
                                      }}
                                      key={index}
                                    >
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
                                              item.title + `-potrait-thumbnails`
                                            }
                                          />
                                        </div>
                                      </button>
                                    </SwiperSlide>
                                  ))}
                                <SwiperSlide
                                  className={`rounded-md shadow-md max-xl:bg-pallete-4/30 p-2`}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/drama`
                                      )
                                    }
                                    className="group h-full"
                                  >
                                    <div className="relative contents">
                                      <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300 group-hover:underline">
                                        Lihat semua Drama
                                        <div className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                                          Movies Luplay
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </SwiperSlide>
                              </Swiper>
                            </>
                          )}
                        </section>
                      ) : (
                        <></>
                      )}
                      {bucketdatamovies.filter(
                        (item: any) =>
                          item.status === "live" &&
                          item.genre.value === "comedy"
                      ).length !== 0 ? (
                        <section className="mb-6 relative">
                          {toggleskeleton ? (
                            <>
                              <SkeletonTheme
                                baseColor="#202020"
                                highlightColor="#444"
                                height={20}
                              >
                                <Skeleton />
                              </SkeletonTheme>
                              <div className="flex gap-x-2 overflow-clip mt-3">
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between mb-3 items-center">
                                <h2 className="text-xl text-gray-100 font-semibold">
                                  Komedi
                                </h2>
                                <span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/comedy`
                                      )
                                    }
                                  >
                                    <ChevronRightIcon className="h-4 w-4 text-gray-100"></ChevronRightIcon>
                                  </button>
                                </span>
                              </div>
                              <Swiper
                                breakpoints={{
                                  0: {
                                    slidesPerView: 3.7,
                                    spaceBetween: 10,
                                  },
                                  768: {
                                    slidesPerView: 4.7,
                                    spaceBetween: 10,
                                  },
                                  1024: {
                                    slidesPerView: 6.7,
                                    spaceBetween: 10,
                                  },
                                  1280: {
                                    slidesPerView: 7,
                                    spaceBetween: 10,
                                  },
                                }}
                                centeredSlides={false}
                                navigation={true}
                                modules={[Navigation]}
                                className={`home-carousel-swiper`}
                              >
                                {bucketdatamovies
                                  .slice(0, 10)
                                  .filter(
                                    (item: any) =>
                                      item.status === "live" &&
                                      item.genre.value === "comedy"
                                  )
                                  .map((item: any, index: number) => (
                                    <SwiperSlide
                                      className={`rounded-md shadow-md`}
                                      style={{
                                        animationDelay: `${calculateDelay(
                                          index
                                        )}s`,
                                      }}
                                      key={index}
                                    >
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
                                              item.title + `-potrait-thumbnails`
                                            }
                                          />
                                        </div>
                                      </button>
                                    </SwiperSlide>
                                  ))}
                                <SwiperSlide
                                  className={`rounded-md shadow-md max-xl:bg-pallete-4/30 p-2`}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/comedy`
                                      )
                                    }
                                    className="group h-full"
                                  >
                                    <div className="relative contents">
                                      <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300 group-hover:underline">
                                        Lihat semua Komedi
                                        <div className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                                          Movies Luplay
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </SwiperSlide>
                              </Swiper>
                            </>
                          )}
                        </section>
                      ) : (
                        <></>
                      )}
                      {bucketdatamovies.filter(
                        (item: any) =>
                          item.status === "live" &&
                          item.genre.value === "action"
                      ).length !== 0 ? (
                        <section className="mb-6 relative">
                          {toggleskeleton ? (
                            <>
                              <SkeletonTheme
                                baseColor="#202020"
                                highlightColor="#444"
                                height={20}
                              >
                                <Skeleton />
                              </SkeletonTheme>
                              <div className="flex gap-x-2 overflow-clip mt-3">
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between mb-3 items-center">
                                <h2 className="text-xl text-gray-100 font-semibold">
                                  Aksi
                                </h2>
                                <span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/action`
                                      )
                                    }
                                  >
                                    <ChevronRightIcon className="h-4 w-4 text-gray-100"></ChevronRightIcon>
                                  </button>
                                </span>
                              </div>
                              <Swiper
                                breakpoints={{
                                  0: {
                                    slidesPerView: 3.7,
                                    spaceBetween: 10,
                                  },
                                  768: {
                                    slidesPerView: 4.7,
                                    spaceBetween: 10,
                                  },
                                  1024: {
                                    slidesPerView: 6.7,
                                    spaceBetween: 10,
                                  },
                                  1280: {
                                    slidesPerView: 7,
                                    spaceBetween: 10,
                                  },
                                }}
                                centeredSlides={false}
                                navigation={true}
                                modules={[Navigation]}
                                className={`home-carousel-swiper`}
                              >
                                {bucketdatamovies
                                  .slice(0, 10)
                                  .filter(
                                    (item: any) =>
                                      item.status === "live" &&
                                      item.genre.value === "action"
                                  )
                                  .map((item: any, index: number) => (
                                    <SwiperSlide
                                      className={`rounded-md shadow-md`}
                                      style={{
                                        animationDelay: `${calculateDelay(
                                          index
                                        )}s`,
                                      }}
                                      key={index}
                                    >
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
                                              item.title + `-potrait-thumbnails`
                                            }
                                          />
                                        </div>
                                      </button>
                                    </SwiperSlide>
                                  ))}
                                <SwiperSlide
                                  className={`rounded-md shadow-md max-xl:bg-pallete-4/30 p-2`}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/action`
                                      )
                                    }
                                    className="group h-full"
                                  >
                                    <div className="relative contents">
                                      <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300 group-hover:underline">
                                        Lihat semua Aksi
                                        <div className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                                          Movies Luplay
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </SwiperSlide>
                              </Swiper>
                            </>
                          )}
                        </section>
                      ) : (
                        <></>
                      )}
                      {bucketdatamovies.filter(
                        (item: any) =>
                          item.status === "live" && item.genre.value === "horor"
                      ).length !== 0 ? (
                        <section className="mb-6 relative">
                          {toggleskeleton ? (
                            <>
                              <SkeletonTheme
                                baseColor="#202020"
                                highlightColor="#444"
                                height={20}
                              >
                                <Skeleton />
                              </SkeletonTheme>
                              <div className="flex gap-x-2 overflow-clip mt-3">
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between mb-3 items-center">
                                <h2 className="text-xl text-gray-100 font-semibold">
                                  Horor
                                </h2>
                                <span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/horor`
                                      )
                                    }
                                  >
                                    <ChevronRightIcon className="h-4 w-4 text-gray-100"></ChevronRightIcon>
                                  </button>
                                </span>
                              </div>
                              <Swiper
                                breakpoints={{
                                  0: {
                                    slidesPerView: 3.7,
                                    spaceBetween: 10,
                                  },
                                  768: {
                                    slidesPerView: 4.7,
                                    spaceBetween: 10,
                                  },
                                  1024: {
                                    slidesPerView: 6.7,
                                    spaceBetween: 10,
                                  },
                                  1280: {
                                    slidesPerView: 7,
                                    spaceBetween: 10,
                                  },
                                }}
                                centeredSlides={false}
                                navigation={true}
                                modules={[Navigation]}
                                className={`home-carousel-swiper`}
                              >
                                {bucketdatamovies
                                  .slice(0, 10)
                                  .filter(
                                    (item: any) =>
                                      item.status === "live" &&
                                      item.genre.value === "horor"
                                  )
                                  .map((item: any, index: number) => (
                                    <SwiperSlide
                                      className={`rounded-md shadow-md`}
                                      style={{
                                        animationDelay: `${calculateDelay(
                                          index
                                        )}s`,
                                      }}
                                      key={index}
                                    >
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
                                              item.title + `-potrait-thumbnails`
                                            }
                                          />
                                        </div>
                                      </button>
                                    </SwiperSlide>
                                  ))}
                                <SwiperSlide
                                  className={`rounded-md shadow-md max-xl:bg-pallete-4/30 p-2`}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/horor`
                                      )
                                    }
                                    className="group h-full"
                                  >
                                    <div className="relative contents">
                                      <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300 group-hover:underline">
                                        Lihat semua Horor
                                        <div className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                                          Movies Luplay
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </SwiperSlide>
                              </Swiper>
                            </>
                          )}
                        </section>
                      ) : (
                        <></>
                      )}
                      <section className="mb-6 relative">
                        <h2 className="text-xl text-gray-100 font-semibold mb-3">
                          Top{" "}
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
                                    className={`self-end flex absolute left-0 z-10 bg-pallete-4/80 p-2
                                    } rounded-full`}
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
                  </main>
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
              )
            ) : params.type == "series" ? (
              bucketdataseries.length != 0 ? (
                pageloaded ? (
                  <main>
                    {devicemobile ? (
                      <section className="mb-6 mt-24 ">
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
                                      .find(
                                        (obj) => obj.id_doc === item.video.id
                                      );

                                    if (foundObject) {
                                      movePageFunction(
                                        `/${foundObject.type}/${
                                          item.video.id
                                        }/${item.video.title.replace(
                                          /\s+/g,
                                          "-"
                                        )}`
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
                    ) : (
                      <Swiper
                        autoplay={{
                          delay: 25000,
                          disableOnInteraction: false,
                        }}
                        pagination={{
                          dynamicBullets: true,
                          clickable: true,
                        }}
                        modules={[Autoplay, Pagination, Navigation, EffectFade]}
                        loop={true}
                        navigation={true}
                        effect="fade"
                        className="main-carousel-swiper"
                      >
                        {bucketdataslider
                          .sort((a, b) => a.index - b.index)
                          .map((item: any, index: number) => (
                            <SwiperSlide key={index}>
                              <div className={`h-full`}>
                                <Image
                                  src={item.image_slider_desktop}
                                  width={1366}
                                  height={480}
                                  alt={item.video.title + `-banner-desktop`}
                                />
                              </div>
                              <div className="h-full left-1/2 absolute top-0 -translate-x-1/2 w-[1052px] z-[3]">
                                <div className="inline-block h-auto lg:left-40 xl:left-[5px] absolute text-left lg:top-[50%] xl:top-[40%] -translate-y-1/2 whitespace-normal w-96 z-[3]">
                                  <h3 className="text-4xl text-white font-bold text-left">
                                    {item.video.title}
                                  </h3>
                                  <p className="text-white text-base font-normal line-clamp-3 text-left my-4">
                                    {(() => {
                                      const foundObject = (
                                        bucketdatamovies || []
                                      )
                                        .concat(bucketdataseries || [])
                                        .find(
                                          (obj) => obj.id_doc === item.video.id
                                        );

                                      const synopsis = foundObject
                                        ? foundObject.synopsis
                                        : "...";

                                      return synopsis;
                                    })()}
                                  </p>
                                  <span className="flex">
                                    <div
                                      className="bg-[50%] bg-no-repeat bg-[length:24px_24px] rounded-lg inline-block h-6 w-6 mr-5 relative"
                                      style={{
                                        backgroundImage: `url(${crown.src})`,
                                      }}
                                    ></div>
                                    <div className="text-xs font-semibold text-gray-300 inline-block pt-2 uppercase">
                                      {item.tagline}
                                    </div>
                                  </span>
                                  <button
                                    onClick={() => {
                                      const foundObject = (
                                        bucketdatamovies || []
                                      )
                                        .concat(bucketdataseries || [])
                                        .find(
                                          (obj) => obj.id_doc === item.video.id
                                        );

                                      if (foundObject) {
                                        movePageFunction(
                                          `/${foundObject.type}/${
                                            item.video.id
                                          }/${item.video.title.replace(
                                            /\s+/g,
                                            "-"
                                          )}`
                                        );
                                      }
                                    }}
                                    type="button"
                                    className="flex flex-row items-center gap-x-2 mt-8 bg-pallete-4 hover:bg-pallete-3 text-white px-12 py-3 text-sm rounded-full font-semibold transition-all duration-200 ease-linear"
                                  >
                                    <PlayCircleIcon className="w-4 h-4"></PlayCircleIcon>
                                    Cek Sekarang
                                  </button>
                                </div>
                              </div>
                              <div className="overlay-gradient-video"></div>
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    )}
                    <div className="mx-4 sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-0 lg:py-12 mb-20 lg:mb-0">
                      <section className="mb-6 relative">
                        <ul className="opacity-100 overflow-x-[initial] overflow-hidden whitespace-nowrap -ml-2">
                          <div className="overflow-hidden block relative">
                            <div className="opacity-100 flex justify-center relative before:content-[''] before:table">
                              {bucketdataseries.filter(
                                (item: any) =>
                                  item.status === "live" &&
                                  item.genre.value === "romance"
                              ).length !== 0 ? (
                                <li className="w-16 md:w-20 lg:w-28 xl:w-[121px] block p-2 align-top float-left h-full min-h-[1px]">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        movePageFunction(
                                          `/categories/${params.type}/romance`
                                        )
                                      }
                                      className="group w-full"
                                    >
                                      <div
                                        className="bg-[50%] bg-no-repeat bg-[length:2em]  md:bg-[length:2.75rem] lg:bg-[length:4rem] shadow-md bg-pallete-4/30 pb-[100%] w-full rounded-full group-hover:scale-110 transition-all duration-200 ease-linear"
                                        style={{
                                          backgroundImage: `url(/love.svg)`,
                                        }}
                                      ></div>
                                      <p className="line-clamp-2 text-gray-100 block text-sm mt-2 max-h-[36.4px] text-center text-ellipsis whitespace-[inherit] font-normal">
                                        Romantis
                                      </p>
                                    </button>
                                  </div>
                                </li>
                              ) : (
                                <></>
                              )}
                              {bucketdataseries.filter(
                                (item: any) =>
                                  item.status === "live" &&
                                  item.genre.value === "drama"
                              ).length !== 0 ? (
                                <li className="w-16 md:w-20 lg:w-28 xl:w-[121px] block p-2 align-top float-left h-full min-h-[1px]">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        movePageFunction(
                                          `/categories/${params.type}/drama`
                                        )
                                      }
                                      className="group w-full"
                                    >
                                      <div
                                        className="bg-[50%] bg-no-repeat bg-[length:2em]  md:bg-[length:2.75rem] lg:bg-[length:4rem] shadow-md bg-pallete-4/30 pb-[100%] w-full rounded-full group-hover:scale-110 transition-all duration-200 ease-linear"
                                        style={{
                                          backgroundImage: `url(/drama.svg)`,
                                        }}
                                      ></div>
                                      <p className="line-clamp-2 text-gray-100 block text-sm mt-2 max-h-[36.4px] text-center text-ellipsis whitespace-[inherit] font-normal">
                                        Drama
                                      </p>
                                    </button>
                                  </div>
                                </li>
                              ) : (
                                <></>
                              )}
                              {bucketdataseries.filter(
                                (item: any) =>
                                  item.status === "live" &&
                                  item.genre.value === "comedy"
                              ).length !== 0 ? (
                                <li className="w-16 md:w-20 lg:w-28 xl:w-[121px] block p-2 align-top float-left h-full min-h-[1px]">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        movePageFunction(
                                          `/categories/${params.type}/comedy`
                                        )
                                      }
                                      className="group w-full"
                                    >
                                      <div
                                        className="bg-[50%] bg-no-repeat bg-[length:2em]  md:bg-[length:2.75rem] lg:bg-[length:4rem] shadow-md bg-pallete-4/30 pb-[100%] w-full rounded-full group-hover:scale-110 transition-all duration-200 ease-linear"
                                        style={{
                                          backgroundImage: `url(/comedy.svg)`,
                                        }}
                                      ></div>
                                      <p className="line-clamp-2 text-gray-100 block text-sm mt-2 max-h-[36.4px] text-center text-ellipsis whitespace-[inherit] font-normal">
                                        Komedi
                                      </p>
                                    </button>
                                  </div>
                                </li>
                              ) : (
                                <></>
                              )}
                              {bucketdataseries.filter(
                                (item: any) =>
                                  item.status === "live" &&
                                  item.genre.value === "action"
                              ).length !== 0 ? (
                                <li className="w-16 md:w-20 lg:w-28 xl:w-[121px] block p-2 align-top float-left h-full min-h-[1px]">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        movePageFunction(
                                          `/categories/${params.type}/action`
                                        )
                                      }
                                      className="group w-full"
                                    >
                                      <div
                                        className="bg-[50%] bg-no-repeat bg-[length:2em]  md:bg-[length:2.75rem] lg:bg-[length:4rem] shadow-md bg-pallete-4/30 pb-[100%] w-full rounded-full group-hover:scale-110 transition-all duration-200 ease-linear"
                                        style={{
                                          backgroundImage: `url(/action.svg)`,
                                        }}
                                      ></div>
                                      <p className="line-clamp-2 text-gray-100 block text-sm mt-2 max-h-[36.4px] text-center text-ellipsis whitespace-[inherit] font-normal">
                                        Aksi
                                      </p>
                                    </button>
                                  </div>
                                </li>
                              ) : (
                                <></>
                              )}
                              {bucketdataseries.filter(
                                (item: any) =>
                                  item.status === "live" &&
                                  item.genre.value === "horor"
                              ).length !== 0 ? (
                                <li className="w-16 md:w-20 lg:w-28 xl:w-[121px] block p-2 align-top float-left h-full min-h-[1px]">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        movePageFunction(
                                          `/categories/${params.type}/horor`
                                        )
                                      }
                                      className="group w-full"
                                    >
                                      <div
                                        className="bg-[50%] bg-no-repeat bg-[length:2em]  md:bg-[length:2.75rem] lg:bg-[length:4rem] shadow-md bg-pallete-4/30 pb-[100%] w-full rounded-full group-hover:scale-110 transition-all duration-200 ease-linear"
                                        style={{
                                          backgroundImage: `url(/horor.svg)`,
                                        }}
                                      ></div>
                                      <p className="line-clamp-2 text-gray-100 block text-sm mt-2 max-h-[36.4px] text-center text-ellipsis whitespace-[inherit] font-normal">
                                        Horor
                                      </p>
                                    </button>
                                  </div>
                                </li>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </ul>
                        <div className="relative"></div>
                      </section>
                      {bucketdataseries.filter(
                        (item: any) =>
                          item.status === "live" &&
                          item.genre.value === "romance"
                      ).length !== 0 ? (
                        <section className="mb-6 relative">
                          {toggleskeleton ? (
                            <>
                              <SkeletonTheme
                                baseColor="#202020"
                                highlightColor="#444"
                                height={20}
                              >
                                <Skeleton />
                              </SkeletonTheme>
                              <div className="flex gap-x-2 overflow-clip mt-3">
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between mb-3 items-center">
                                <h2 className="text-xl text-gray-100 font-semibold">
                                  Romantis
                                </h2>
                                <span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/romance`
                                      )
                                    }
                                  >
                                    <ChevronRightIcon className="h-4 w-4 text-gray-100"></ChevronRightIcon>
                                  </button>
                                </span>
                              </div>
                              <Swiper
                                breakpoints={{
                                  0: {
                                    slidesPerView: 3.7,
                                    spaceBetween: 10,
                                  },
                                  768: {
                                    slidesPerView: 4.7,
                                    spaceBetween: 10,
                                  },
                                  1024: {
                                    slidesPerView: 6.7,
                                    spaceBetween: 10,
                                  },
                                  1280: {
                                    slidesPerView: 7,
                                    spaceBetween: 10,
                                  },
                                }}
                                centeredSlides={false}
                                navigation={true}
                                modules={[Navigation]}
                                className={`home-carousel-swiper`}
                              >
                                {bucketdataseries
                                  .slice(0, 10)
                                  .filter(
                                    (item: any) =>
                                      item.status === "live" &&
                                      item.genre.value === "romance"
                                  )
                                  .map((item: any, index: number) => (
                                    <SwiperSlide
                                      className={`rounded-md shadow-md`}
                                      style={{
                                        animationDelay: `${calculateDelay(
                                          index
                                        )}s`,
                                      }}
                                      key={index}
                                    >
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
                                              item.title + `-potrait-thumbnails`
                                            }
                                          />
                                        </div>
                                      </button>
                                    </SwiperSlide>
                                  ))}
                                <SwiperSlide
                                  className={`rounded-md shadow-md max-xl:bg-pallete-4/30 p-2`}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/romance`
                                      )
                                    }
                                    className="group h-full"
                                  >
                                    <div className="relative contents">
                                      <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300 group-hover:underline">
                                        Lihat semua Romantis
                                        <div className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                                          Series Luplay
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </SwiperSlide>
                              </Swiper>
                            </>
                          )}
                        </section>
                      ) : (
                        <></>
                      )}
                      {bucketdataseries.filter(
                        (item: any) =>
                          item.status === "live" && item.genre.value === "drama"
                      ).length !== 0 ? (
                        <section className="mb-6 relative">
                          {toggleskeleton ? (
                            <>
                              <SkeletonTheme
                                baseColor="#202020"
                                highlightColor="#444"
                                height={20}
                              >
                                <Skeleton />
                              </SkeletonTheme>
                              <div className="flex gap-x-2 overflow-clip mt-3">
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between mb-3 items-center">
                                <h2 className="text-xl text-gray-100 font-semibold">
                                  Drama
                                </h2>
                                <span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/drama`
                                      )
                                    }
                                  >
                                    <ChevronRightIcon className="h-4 w-4 text-gray-100"></ChevronRightIcon>
                                  </button>
                                </span>
                              </div>
                              <Swiper
                                breakpoints={{
                                  0: {
                                    slidesPerView: 3.7,
                                    spaceBetween: 10,
                                  },
                                  768: {
                                    slidesPerView: 4.7,
                                    spaceBetween: 10,
                                  },
                                  1024: {
                                    slidesPerView: 6.7,
                                    spaceBetween: 10,
                                  },
                                  1280: {
                                    slidesPerView: 7,
                                    spaceBetween: 10,
                                  },
                                }}
                                centeredSlides={false}
                                navigation={true}
                                modules={[Navigation]}
                                className={`home-carousel-swiper`}
                              >
                                {bucketdataseries
                                  .slice(0, 10)
                                  .filter(
                                    (item: any) =>
                                      item.status === "live" &&
                                      item.genre.value === "drama"
                                  )
                                  .map((item: any, index: number) => (
                                    <SwiperSlide
                                      className={`rounded-md shadow-md`}
                                      style={{
                                        animationDelay: `${calculateDelay(
                                          index
                                        )}s`,
                                      }}
                                      key={index}
                                    >
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
                                              item.title + `-potrait-thumbnails`
                                            }
                                          />
                                        </div>
                                      </button>
                                    </SwiperSlide>
                                  ))}
                                <SwiperSlide
                                  className={`rounded-md shadow-md max-xl:bg-pallete-4/30 p-2`}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/drama`
                                      )
                                    }
                                    className="group h-full"
                                  >
                                    <div className="relative contents">
                                      <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300 group-hover:underline">
                                        Lihat semua Drama
                                        <div className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                                          Series Luplay
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </SwiperSlide>
                              </Swiper>
                            </>
                          )}
                        </section>
                      ) : (
                        <></>
                      )}
                      {bucketdataseries.filter(
                        (item: any) =>
                          item.status === "live" &&
                          item.genre.value === "comedy"
                      ).length !== 0 ? (
                        <section className="mb-6 relative">
                          {toggleskeleton ? (
                            <>
                              <SkeletonTheme
                                baseColor="#202020"
                                highlightColor="#444"
                                height={20}
                              >
                                <Skeleton />
                              </SkeletonTheme>
                              <div className="flex gap-x-2 overflow-clip mt-3">
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between mb-3 items-center">
                                <h2 className="text-xl text-gray-100 font-semibold">
                                  Komedi
                                </h2>
                                <span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/comedy`
                                      )
                                    }
                                  >
                                    <ChevronRightIcon className="h-4 w-4 text-gray-100"></ChevronRightIcon>
                                  </button>
                                </span>
                              </div>
                              <Swiper
                                breakpoints={{
                                  0: {
                                    slidesPerView: 3.7,
                                    spaceBetween: 10,
                                  },
                                  768: {
                                    slidesPerView: 4.7,
                                    spaceBetween: 10,
                                  },
                                  1024: {
                                    slidesPerView: 6.7,
                                    spaceBetween: 10,
                                  },
                                  1280: {
                                    slidesPerView: 7,
                                    spaceBetween: 10,
                                  },
                                }}
                                centeredSlides={false}
                                navigation={true}
                                modules={[Navigation]}
                                className={`home-carousel-swiper`}
                              >
                                {bucketdataseries
                                  .slice(0, 10)
                                  .filter(
                                    (item: any) =>
                                      item.status === "live" &&
                                      item.genre.value === "comedy"
                                  )
                                  .map((item: any, index: number) => (
                                    <SwiperSlide
                                      className={`rounded-md shadow-md`}
                                      style={{
                                        animationDelay: `${calculateDelay(
                                          index
                                        )}s`,
                                      }}
                                      key={index}
                                    >
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
                                              item.title + `-potrait-thumbnails`
                                            }
                                          />
                                        </div>
                                      </button>
                                    </SwiperSlide>
                                  ))}
                                <SwiperSlide
                                  className={`rounded-md shadow-md max-xl:bg-pallete-4/30 p-2`}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/comedy`
                                      )
                                    }
                                    className="group h-full"
                                  >
                                    <div className="relative contents">
                                      <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300 group-hover:underline">
                                        Lihat semua Komedi
                                        <div className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                                          Series Luplay
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </SwiperSlide>
                              </Swiper>
                            </>
                          )}
                        </section>
                      ) : (
                        <></>
                      )}
                      {bucketdataseries.filter(
                        (item: any) =>
                          item.status === "live" &&
                          item.genre.value === "action"
                      ).length !== 0 ? (
                        <section className="mb-6 relative">
                          {toggleskeleton ? (
                            <>
                              <SkeletonTheme
                                baseColor="#202020"
                                highlightColor="#444"
                                height={20}
                              >
                                <Skeleton />
                              </SkeletonTheme>
                              <div className="flex gap-x-2 overflow-clip mt-3">
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between mb-3 items-center">
                                <h2 className="text-xl text-gray-100 font-semibold">
                                  Aksi
                                </h2>
                                <span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/action`
                                      )
                                    }
                                  >
                                    <ChevronRightIcon className="h-4 w-4 text-gray-100"></ChevronRightIcon>
                                  </button>
                                </span>
                              </div>
                              <Swiper
                                breakpoints={{
                                  0: {
                                    slidesPerView: 3.7,
                                    spaceBetween: 10,
                                  },
                                  768: {
                                    slidesPerView: 4.7,
                                    spaceBetween: 10,
                                  },
                                  1024: {
                                    slidesPerView: 6.7,
                                    spaceBetween: 10,
                                  },
                                  1280: {
                                    slidesPerView: 7,
                                    spaceBetween: 10,
                                  },
                                }}
                                centeredSlides={false}
                                navigation={true}
                                modules={[Navigation]}
                                className={`home-carousel-swiper`}
                              >
                                {bucketdataseries
                                  .slice(0, 10)
                                  .filter(
                                    (item: any) =>
                                      item.status === "live" &&
                                      item.genre.value === "action"
                                  )
                                  .map((item: any, index: number) => (
                                    <SwiperSlide
                                      className={`rounded-md shadow-md`}
                                      style={{
                                        animationDelay: `${calculateDelay(
                                          index
                                        )}s`,
                                      }}
                                      key={index}
                                    >
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
                                              item.title + `-potrait-thumbnails`
                                            }
                                          />
                                        </div>
                                      </button>
                                    </SwiperSlide>
                                  ))}
                                <SwiperSlide
                                  className={`rounded-md shadow-md max-xl:bg-pallete-4/30 p-2`}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/action`
                                      )
                                    }
                                    className="group h-full"
                                  >
                                    <div className="relative contents">
                                      <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300 group-hover:underline">
                                        Lihat semua Aksi
                                        <div className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                                          Series Luplay
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </SwiperSlide>
                              </Swiper>
                            </>
                          )}
                        </section>
                      ) : (
                        <></>
                      )}
                      {bucketdataseries.filter(
                        (item: any) =>
                          item.status === "live" && item.genre.value === "horor"
                      ).length !== 0 ? (
                        <section className="mb-6 relative">
                          {toggleskeleton ? (
                            <>
                              <SkeletonTheme
                                baseColor="#202020"
                                highlightColor="#444"
                                height={20}
                              >
                                <Skeleton />
                              </SkeletonTheme>
                              <div className="flex gap-x-2 overflow-clip mt-3">
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={devicemobile ? 150 : 211}
                                  width={devicemobile ? 135 : 156}
                                ></Skeleton>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between mb-3 items-center">
                                <h2 className="text-xl text-gray-100 font-semibold">
                                  Horor
                                </h2>
                                <span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/horor`
                                      )
                                    }
                                  >
                                    <ChevronRightIcon className="h-4 w-4 text-gray-100"></ChevronRightIcon>
                                  </button>
                                </span>
                              </div>
                              <Swiper
                                breakpoints={{
                                  0: {
                                    slidesPerView: 3.7,
                                    spaceBetween: 10,
                                  },
                                  768: {
                                    slidesPerView: 4.7,
                                    spaceBetween: 10,
                                  },
                                  1024: {
                                    slidesPerView: 6.7,
                                    spaceBetween: 10,
                                  },
                                  1280: {
                                    slidesPerView: 7,
                                    spaceBetween: 10,
                                  },
                                }}
                                centeredSlides={false}
                                navigation={true}
                                modules={[Navigation]}
                                className={`home-carousel-swiper`}
                              >
                                {bucketdataseries
                                  .slice(0, 10)
                                  .filter(
                                    (item: any) =>
                                      item.status === "live" &&
                                      item.genre.value === "horor"
                                  )
                                  .map((item: any, index: number) => (
                                    <SwiperSlide
                                      className={`rounded-md shadow-md`}
                                      style={{
                                        animationDelay: `${calculateDelay(
                                          index
                                        )}s`,
                                      }}
                                      key={index}
                                    >
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
                                              item.title + `-potrait-thumbnails`
                                            }
                                          />
                                        </div>
                                      </button>
                                    </SwiperSlide>
                                  ))}
                                <SwiperSlide
                                  className={`rounded-md shadow-md max-xl:bg-pallete-4/30 p-2`}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePageFunction(
                                        `/categories/${params.type}/horor`
                                      )
                                    }
                                    className="group h-full"
                                  >
                                    <div className="relative contents">
                                      <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300 group-hover:underline">
                                        Lihat semua Horor
                                        <div className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                                          Series Luplay
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </SwiperSlide>
                              </Swiper>
                            </>
                          )}
                        </section>
                      ) : (
                        <></>
                      )}
                      <section className="mb-6 relative">
                        <h2 className="text-xl text-gray-100 font-semibold mb-3">
                          Top{" "}
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
                                    className={`self-end flex absolute left-0 z-10 bg-pallete-4/80 p-2
                                    } rounded-full`}
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
                  </main>
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
              )
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

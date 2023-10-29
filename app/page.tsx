"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "./components/navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import banner1 from "../public/banner-1.webp";
import banner2 from "../public/banner-2.webp";
import banner3 from "../public/banner-3.webp";
import post1 from "../public/post-1.webp";
import {
  ArrowPathIcon,
  ChevronRightIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import crown from "../public/crown.png";
import { useRouter } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NavbarBottomMobiel from "./components/navbar-bottom-mobile";
import bannermobile1 from "../public/banner-mobile-1.webp";
import bannermobile2 from "../public/banner-mobile-2.webp";
import bannermobile3 from "../public/banner-mobile-3.webp";
import handleViewport, { type InjectedViewportProps } from "react-in-viewport";

const LunarPlay = (props: InjectedViewportProps<HTMLDivElement>) => {
  const { inViewport, forwardedRef } = props;
  const animate = inViewport ? "inviewport" : "outviewport";
  return (
    <section className="mt-6 lg:mt-0 viewport-block" ref={forwardedRef}>
      <div className="flex justify-between mb-3 items-center">
        <h2 className="text-xl text-gray-100 font-semibold">Originals</h2>
        <span>
          <a href="#">
            <ChevronRightIcon className="h-4 w-4 text-gray-100"></ChevronRightIcon>
          </a>
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
        <SwiperSlide className={`rounded-md shadow-md ${animate}`}>
          <a href="" className="group">
            <div className="relative overflow-hidden rounded-md">
              <Image
                src={post1}
                className="rounded-md brightness-75 transition-all ease-in duration-200 group-hover:brightness-100 group-hover:scale-105"
                alt="Picture of the author"
              />
            </div>
          </a>
        </SwiperSlide>
        <SwiperSlide className={`rounded-md shadow-md ${animate}`}>
          <a href="" className="group">
            <div className="relative overflow-hidden rounded-md">
              <Image
                src={post1}
                className="rounded-md brightness-75 transition-all ease-in duration-200 group-hover:brightness-100 group-hover:scale-105"
                alt="Picture of the author"
              />
            </div>
          </a>
        </SwiperSlide>
        <SwiperSlide className={`rounded-md shadow-md ${animate}`}>
          <a href="" className="group">
            <div className="relative overflow-hidden rounded-md">
              <Image
                src={post1}
                className="rounded-md brightness-75 transition-all ease-in duration-200 group-hover:brightness-100 group-hover:scale-105"
                alt="Picture of the author"
              />
            </div>
          </a>
        </SwiperSlide>
        <SwiperSlide className={`rounded-md shadow-md ${animate}`}>
          <a href="" className="group">
            <div className="relative overflow-hidden rounded-md">
              <Image
                src={post1}
                className="rounded-md brightness-75 transition-all ease-in duration-200 group-hover:brightness-100 group-hover:scale-105"
                alt="Picture of the author"
              />
            </div>
          </a>
        </SwiperSlide>
        <SwiperSlide className={`rounded-md shadow-md ${animate}`}>
          <a href="" className="group">
            <div className="relative overflow-hidden rounded-md">
              <Image
                src={post1}
                className="rounded-md brightness-75 transition-all ease-in duration-200 group-hover:brightness-100 group-hover:scale-105"
                alt="Picture of the author"
              />
            </div>
          </a>
        </SwiperSlide>
        <SwiperSlide className={`rounded-md shadow-md ${animate}`}>
          <a href="" className="group">
            <div className="relative overflow-hidden rounded-md">
              <Image
                src={post1}
                className="rounded-md brightness-75 transition-all ease-in duration-200 group-hover:brightness-100 group-hover:scale-105"
                alt="Picture of the author"
              />
            </div>
          </a>
        </SwiperSlide>
        <SwiperSlide className={`rounded-md shadow-md ${animate}`}>
          <a href="" className="group">
            <div className="relative overflow-hidden rounded-md">
              <Image
                src={post1}
                className="rounded-md brightness-75 transition-all ease-in duration-200 group-hover:brightness-100 group-hover:scale-105"
                alt="Picture of the author"
              />
            </div>
          </a>
        </SwiperSlide>
        <SwiperSlide className={`rounded-md shadow-md ${animate}`}>
          <a href="" className="group">
            <div className="relative contents">
              <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300 group-hover:underline">
                Lihat semua
                <div className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                  Luplay Originals
                </div>
              </div>
            </div>
          </a>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

const ViewLunarPlay = handleViewport(LunarPlay /** options: {}, config: {} **/);

export default function Home() {
  const router = useRouter();

  const [toggleskeleton, setToggleSkeleton] = useState<boolean>(true);
  const [timeleft, setTimeLeft] = useState<number | null>(null);
  const [playvideo, setPlayVideo] = useState<boolean>(false);
  const [mutedvideo, setMutedVideo] = useState<boolean>(true);
  const [videofinished, setVideoFinished] = useState<boolean>(false);
  const [colorchange, setColorChange] = useState<boolean>(false);
  const [devicemobile, setDeviceMobile] = useState<boolean>(false);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (timeleft === 0) {
      setTimeLeft(null);
      setPlayVideo(true);
    }
    if (!timeleft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeleft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeleft]);
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
    if (window.innerWidth <= 768) {
      setDeviceMobile(true);
    } else {
      setDeviceMobile(false);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(function () {
        setToggleSkeleton(false);
      }, 2000);
      setPageLoaded(true);
      setCheckboxCurtain(true);
    }
  }, []);

  const movePageFunction = (param: string) => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.push(param));
  };

  return (
    <>
      <header
        className={`fixed z-10 top-0 w-full transition-all duration-300 ${
          colorchange
            ? "bg-pallete-5 shadow-md "
            : "bg-transparent inner-shadow-header max-[768px]:bg-pallete-5"
        }`}
      >
        <Navbar movePageFunction={movePageFunction}></Navbar>
      </header>
      {devicemobile ? <NavbarBottomMobiel></NavbarBottomMobiel> : <></>}
      <div className={pageloaded ? "curtain" : "curtain h-screen"}>
        <div className="curtain__wrapper" id="curtain-wrappper">
          <input
            type="checkbox"
            disabled
            checked={!checkboxcurtain}
            className={`${pageloaded ? "z-0" : "z-50"}`}
          ></input>
          <div className="curtain__panel curtain__panel--left"></div>
          <div className="curtain__content">
            {pageloaded ? (
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
                      <SwiperSlide className="rounded">
                        <a href="#">
                          <Image
                            src={bannermobile1}
                            width={480}
                            height={288}
                            className="aspect-[16/9] rounded"
                            alt="Picture of the author"
                          />
                        </a>
                      </SwiperSlide>
                      <SwiperSlide className="rounded">
                        <a href="#">
                          <Image
                            src={bannermobile2}
                            width={480}
                            height={288}
                            className="aspect-[16/9] rounded"
                            alt="Picture of the author"
                          />
                        </a>
                      </SwiperSlide>
                      <SwiperSlide className="rounded">
                        <a href="#">
                          <Image
                            src={bannermobile3}
                            width={480}
                            height={288}
                            className="aspect-[16/9] rounded"
                            alt="Picture of the author"
                          />
                        </a>
                      </SwiperSlide>
                      <SwiperSlide className="rounded">
                        <a href="#">
                          <Image
                            src={bannermobile2}
                            width={480}
                            height={288}
                            className="aspect-[16/9] rounded"
                            alt="Picture of the author"
                          />
                        </a>
                      </SwiperSlide>
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
                    onSlideChange={(swiper) =>
                      swiper.realIndex == 2
                        ? setTimeLeft(2)
                        : setPlayVideo(false)
                    }
                    effect="fade"
                    className="main-carousel-swiper 3xl:h-[52rem]"
                  >
                    <SwiperSlide>
                      <div className="h-full">
                        <Image
                          src={banner1}
                          width={1366}
                          height={480}
                          alt="Picture of the author"
                        />
                      </div>
                      <div className="h-full left-1/2 absolute top-0 -translate-x-1/2 w-[1152px] z-[3]">
                        <div className="inline-block h-auto lg:left-40 xl:left-[5px] absolute text-left lg:top-[50%] xl:top-[40%] -translate-y-1/2 whitespace-normal w-96 z-[3]">
                          <h3 className="text-4xl text-white font-bold text-left">
                            Dia Yang Kau Pilih
                          </h3>
                          <p className="text-white text-base font-normal line-clamp-3 text-left my-4">
                            SETIAP HARI - 16.45 WIB | Kinara, seorang gadis yang
                            baik hati dan menjadi tulang punggung keluarga.
                          </p>
                          <span className="flex">
                            <div
                              className="bg-[50%] bg-no-repeat bg-[length:24px_24px] rounded-lg inline-block h-6 w-6 mr-5 relative"
                              style={{ backgroundImage: `url(${crown.src})` }}
                            ></div>
                            <div className="text-xs font-semibold text-gray-300 inline-block pt-2">
                              DRAMA
                            </div>
                          </span>
                          <button
                            onClick={() =>
                              movePageFunction("/video/632/merajut-dendam")
                            }
                            type="button"
                            className="flex flex-row items-center gap-x-2 mt-8 bg-pallete-4 hover:bg-pallete-3 text-white px-12 py-3 text-sm rounded-full font-semibold transition-all duration-200 ease-linear"
                          >
                            <PlayCircleIcon className="w-4 h-4"></PlayCircleIcon>
                            Cek Sekarang
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="h-full">
                        <Image
                          src={banner3}
                          width={1366}
                          height={480}
                          alt="Picture of the author"
                        />
                      </div>
                      <div className="h-full left-1/2 absolute top-0 -translate-x-1/2 w-[1152px] z-[3]">
                        <div className="inline-block h-auto lg:left-40 xl:left-[5px] absolute text-left lg:top-[50%] xl:top-[40%] -translate-y-1/2 whitespace-normal w-96 z-[3]">
                          <h3 className="text-4xl text-white font-bold text-left">
                            Cinta Setelah Cinta
                          </h3>
                          <p className="text-white text-base font-normal line-clamp-3 text-left my-4">
                            NONTON SEKARANG! 2 Episode Terakhir tayang Eksklusif
                            hanya di Vidio.
                          </p>
                          <span className="flex">
                            <div
                              className="bg-[50%] bg-no-repeat bg-[length:24px_24px] rounded-lg inline-block h-6 w-6 mr-5 relative"
                              style={{ backgroundImage: `url(${crown.src})` }}
                            ></div>
                            <div className="text-xs font-semibold text-gray-300 inline-block pt-2">
                              DRAMA
                            </div>
                          </span>
                          <button
                            onClick={() =>
                              movePageFunction("/video/632/merajut-dendam")
                            }
                            type="button"
                            className="flex flex-row items-center gap-x-2 mt-8 bg-pallete-4 hover:bg-pallete-3 text-white px-12 py-3 text-sm rounded-full font-semibold transition-all duration-200 ease-linear"
                          >
                            <PlayCircleIcon className="w-4 h-4"></PlayCircleIcon>
                            Cek Sekarang
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      {playvideo == false ? (
                        <div className="h-full">
                          <Image
                            src={banner2}
                            width={1366}
                            height={480}
                            alt="Picture of the author"
                          />
                        </div>
                      ) : (
                        <>
                          <video
                            ref={videoRef}
                            className="video-container-swiper"
                            muted={mutedvideo}
                            playsInline={true}
                            autoPlay={true}
                            onEnded={() => setVideoFinished(true)}
                            src="https://media-001-vidio-com.akamaized.net/uploads/7613851/trailer_media/2023-09-29_121612.mp4"
                          ></video>
                          <button
                            type="button"
                            className="absolute z-[3] bottom-8 right-8 w-10 text-gray-300 hover:text-white border rounded-full p-2"
                            onClick={
                              !videofinished
                                ? () => setMutedVideo(!mutedvideo)
                                : () => {
                                    videoRef.current?.play();
                                    setVideoFinished(false);
                                  }
                            }
                          >
                            {!videofinished ? (
                              mutedvideo ? (
                                <SpeakerXMarkIcon className="w-6 h-6"></SpeakerXMarkIcon>
                              ) : (
                                <SpeakerWaveIcon className="w-6 h-6"></SpeakerWaveIcon>
                              )
                            ) : (
                              <ArrowPathIcon className="w-6 h-6"></ArrowPathIcon>
                            )}
                          </button>
                        </>
                      )}
                      <div className="h-full left-1/2 absolute top-0 -translate-x-1/2 w-[1152px] z-[3]">
                        <div className="inline-block h-auto lg:left-40 xl:left-[5px] absolute text-left lg:top-[50%] xl:top-[40%] -translate-y-1/2 whitespace-normal w-96 z-[3]">
                          <h3 className="text-4xl text-white font-bold text-left">
                            Merajut Dendam
                          </h3>
                          <p className="text-white text-base font-normal line-clamp-3 text-left my-4">
                            Nina memiliki segalanya; suami yang mapan dan
                            keluarga yang sempurna. Semua berubah ketika
                            suaminya, Rasya, dituduh sebagai tersangka kasus
                            pencabulan.
                          </p>
                          <span className="flex">
                            <div
                              className="bg-[50%] bg-no-repeat bg-[length:24px_24px] rounded-lg inline-block h-6 w-6 mr-5 relative"
                              style={{ backgroundImage: `url(${crown.src})` }}
                            ></div>
                            <div className="text-xs font-semibold text-gray-300 inline-block pt-2">
                              DRAMA
                            </div>
                          </span>
                          <button
                            onClick={() =>
                              movePageFunction("/video/632/merajut-dendam")
                            }
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
                  </Swiper>
                )}
                <div className="mx-auto max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-0 lg:py-12 mb-20 lg:mb-0">
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
                    <ViewLunarPlay
                      onEnterViewport={() => console.log("enter")}
                      onLeaveViewport={() => console.log("leave")}
                    />
                  )}
                </div>
              </main>
            ) : (
              <></>
            )}
          </div>
          <div className="curtain__panel curtain__panel--right"></div>
        </div>
      </div>
    </>
  );
}

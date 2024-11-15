"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar/navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import {
  ArrowPathIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import crown from "../../public/crown.png";
import { useRouter } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NavbarBottomMobile from "../../components/Navbar/navbar-bottom-mobile";
import handleViewport, { type InjectedViewportProps } from "react-in-viewport";
import videojs from "video.js";
import "video.js/dist/video-js.css"; // Import CSS Video.js
import Loading from "@/components/Loading/loading";
import { analytics } from "@/lib/firebase";

const Movies = (props: any | InjectedViewportProps<HTMLDivElement>) => {
  const { inViewport, forwardedRef } = props;
  const animate = inViewport ? "inviewport" : "outviewport";
  const bucketdatamovies = props.bucketdatamovies;
  return (
    <section className="mt-6 lg:mt-0 viewport-block" ref={forwardedRef}>
      <div className="flex justify-between mb-3 items-center">
        <h2 className="text-xl text-gray-100 font-semibold">
          Luplay Original Movies
        </h2>
        <span>
          <button
            type="button"
            onClick={() => props.movePageFunction("/categories/movies")}
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
          .filter((item: any) => item.status === "live")
          .map((item: any, index: number) => (
            <SwiperSlide
              className={`rounded-md shadow-md ${animate}`}
              key={index}
            >
              <button
                onClick={() =>
                  props.movePageFunction(
                    `/${item.type}/${item.id_doc}/${item.title.replace(
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
                    alt={item.title + `-potrait-thumbnails`}
                  />
                </div>
              </button>
            </SwiperSlide>
          ))}
        <SwiperSlide
          className={`rounded-md shadow-md ${animate} max-xl:bg-pallete-4/30`}
        >
          <button
            type="button"
            onClick={() => props.movePageFunction("/categories/movies")}
            className="group h-full"
          >
            <div className="relative contents">
              <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300 group-hover:underline">
                Lihat semua
                <div className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                  Movies Luplay
                </div>
              </div>
            </div>
          </button>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

const Series = (props: any | InjectedViewportProps<HTMLDivElement>) => {
  const { inViewport, forwardedRef } = props;
  const animate = inViewport ? "inviewport" : "outviewport";
  const bucketdataseries = props.bucketdataseries;

  return (
    <section className="mt-6 lg:mt-0 viewport-block" ref={forwardedRef}>
      <div className="flex justify-between mb-3 items-center">
        <h2 className="text-xl text-gray-100 font-semibold">
          Luplay Original Series
        </h2>
        <span>
          <button
            type="button"
            onClick={() => props.movePageFunction("/categories/series")}
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
          .filter((item: any) => item.status === "live")
          .map((item: any, index: number) => (
            <SwiperSlide
              className={`rounded-md shadow-md ${animate}`}
              key={index}
            >
              <button
                onClick={() =>
                  props.movePageFunction(
                    `/${item.type}/${item.id_doc}/${item.title.replace(
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
                    alt={item.title + `-potrait-thumbnails`}
                  />
                </div>
              </button>
            </SwiperSlide>
          ))}
        <SwiperSlide
          className={`rounded-md shadow-md ${animate} max-xl:bg-pallete-4/30`}
        >
          <button
            type="button"
            onClick={() => props.movePageFunction("/categories/series")}
            className="group h-full"
          >
            <div className="relative contents">
              <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300 group-hover:underline">
                Lihat semua
                <div className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                  Series Luplay
                </div>
              </div>
            </div>
          </button>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

const ViewMovies = handleViewport(Movies /** options: {}, config: {} **/);
const ViewSeries = handleViewport(Series /** options: {}, config: {} **/);

export default function Home() {
  const router = useRouter();

  const [bucketdataslider, setBucketDataSlider] = useState<any[]>([]);
  const [bucketdatamovies, setBucketDataMovies] = useState<any[]>([]);
  const [bucketdataseries, setBucketDataSeries] = useState<any[]>([]);
  const [toggleskeleton, setToggleSkeleton] = useState<boolean>(true);
  const [timeleft, setTimeLeft] = useState<number | null>(null);
  const [playvideo, setPlayVideo] = useState<boolean>(false);
  const [mutedvideo, setMutedVideo] = useState<boolean>(true);
  const [videoplay, setVideoPlay] = useState<boolean>(true);
  const [videofinished, setVideoFinished] = useState<boolean>(false);
  const [colorchange, setColorChange] = useState<boolean>(false);
  const [devicemobile, setDeviceMobile] = useState<boolean>(false);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);

  const curtaincontentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<any | null>(null);

  useEffect(() => {
    const fetchDataMovies = async () => {
      try {
        await fetch(`https://luplay.co.id/api/data/video/movies`, {
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
        await fetch(`https://luplay.co.id/api/data/video/series`, {
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
        await fetch(`https://luplay.co.id/api/data/slider`, {
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

    fetchDataMovies();
    fetchDataSeries();
    fetchDataSlider();
  }, []);
  useEffect(() => {
    if (timeleft === 0) {
      setTimeLeft(null);
      setPlayVideo(true);
      const id_doc = bucketdataslider.find((item) => item.index === "0").video
        .id;
      const foundObject = (bucketdatamovies || [])
        .concat(bucketdataseries || [])
        .find((obj) => obj.id_doc === id_doc).video_trailer;

      initializeVideoPlayer(foundObject);
    }
    if (!timeleft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeleft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [bucketdatamovies, bucketdataseries, bucketdataslider, timeleft]);
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
    if (bucketdatamovies.length !== 0 || bucketdataseries.length !== 0) {
      setTimeout(function () {
        setToggleSkeleton(false);
      }, 2000);
    }
    if (typeof window !== "undefined") {
      analytics;
      if (bucketdataslider.length !== 0) {
        setPageLoaded(true);
        setCheckboxCurtain(true);
      }
    }
  }, [bucketdataseries, bucketdatamovies, bucketdataslider]);

  const movePageFunction = (param: string) => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.push(param, { scroll: false }));
  };

  const initializeVideoPlayer = (url: string) => {
    if (videoRef.current) {
      const options = {
        fluid: true,
        autoplay: true,
        disablePictureInPicture: true,
        sources: [
          {
            src: url,
            type: "application/x-mpegURL",
          },
        ],
      };
  
      const player: any = videojs(videoRef.current, options);
  
      let qualityLevels = player.qualityLevels();
  
      player.on("loadedmetadata", () => {
        console.log("Metadata loaded");
        enableQualityLevel(3);
      });
  
      let enableQualityLevel = (level: number) => {
        for (let i = 0; i < qualityLevels.length; i++) {
          qualityLevels[i].enabled = i === level;
        }
      };
  
      player.on("playing", () => {
        setVideoPlay(true);
      });
  
      player.on("pause", () => {
        setVideoPlay(false);
      });
  
      player.on("ended", () => {
        setVideoFinished(true);
      });
  
      player.on("error", () => {
        console.error("Player error:", player.error());
      });
  
      qualityLevels.on("error", () => {
        console.error("Quality levels error");
      });
    }
  };
  

  const handleTogglePlay = () => {
    if (videoRef.current) {
      const player = videojs(videoRef.current);

      if (player.paused()) {
        player.play();
      } else {
        player.pause();
      }
    }
  };

  return (
    <>
      <header
        className={`fixed z-10 top-0 w-full transition-all duration-300 ${
          colorchange
            ? "bg-black xl:bg-pallete-5  shadow-md "
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
            {pageloaded ? (
              <main className="mb-24 lg:mb-0">
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
                                priority
                              />
                            </button>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </section>
                ) : (
                  <Swiper
                    autoplay={{
                      delay: 25000000,
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
                      swiper.realIndex == 0
                        ? setTimeLeft(5)
                        : setPlayVideo(false)
                    }
                    effect="fade"
                    className="main-carousel-swiper"
                  >
                    {bucketdataslider
                      .sort((a, b) => a.index - b.index)
                      .map((item: any, index: number) => (
                        <SwiperSlide key={index}>
                          <div
                            className={`h-full ${
                              playvideo ? "opacity-0" : "opacity-100"
                            }`}
                          >
                            <Image
                              src={item.image_slider_desktop}
                              width={1366}
                              height={480}
                              alt={item.video.title + `-banner-desktop`}
                              priority
                            />
                          </div>
                          {item.index != 0 ? (
                            <></>
                          ) : (
                            <div
                              className={`${
                                playvideo ? "opacity-100" : "opacity-0"
                              }`}
                            >
                              <div data-vjs-player>
                                <video
                                  ref={videoRef}
                                  className="video-js"
                                  playsInline
                                  autoPlay
                                  muted={mutedvideo}
                                />
                                {!videofinished ? (
                                  <button
                                    type="button"
                                    className="absolute z-[3] bottom-8 right-24 w-10 text-gray-300 hover:text-white hover:bg-pallete-4 border rounded-full p-2"
                                    onClick={handleTogglePlay}
                                  >
                                    {videoplay ? (
                                      <PauseIcon className="w-6 h-6"></PauseIcon>
                                    ) : (
                                      <PlayIcon className="w-6 h-6"></PlayIcon>
                                    )}
                                  </button>
                                ) : (
                                  <></>
                                )}
                                <button
                                  type="button"
                                  className="absolute z-[3] bottom-8 right-8 w-10 text-gray-300 hover:text-white hover:bg-pallete-4 border rounded-full p-2"
                                  onClick={() => {
                                    if (videofinished) {
                                      // If video has finished, restart the video
                                      if (videoRef.current) {
                                        const player = videojs(
                                          videoRef.current
                                        );
                                        // Restart the video
                                        player.currentTime(0);
                                        player.play();
                                        // Reset the video finished state
                                        setVideoFinished(false);
                                      }
                                    } else {
                                      // If video is not finished, toggle mute
                                      setMutedVideo((prevMuted) => !prevMuted);
                                    }
                                  }}
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
                              </div>
                            </div>
                          )}
                          <div className="h-full left-1/2 absolute top-0 -translate-x-1/2 w-[1052px] z-[3]">
                            <div className="inline-block h-auto lg:left-40 xl:left-[5px] absolute text-left lg:top-[50%] xl:top-[40%] -translate-y-1/2 whitespace-normal w-96 z-[3]">
                              <h3 className="text-4xl text-white font-bold text-left">
                                {item.video.title}
                              </h3>
                              <p className="text-white text-base font-normal line-clamp-3 text-left my-4">
                                {(() => {
                                  const foundObject = (bucketdatamovies || [])
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
                {/* <div className="mx-4 sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-0 lg:py-12 mb-6 lg:mb-0">
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
                    <ViewMovies
                      bucketdatamovies={bucketdatamovies}
                      movePageFunction={movePageFunction}
                    />
                  )}
                </div> */}
                <div className="mx-4 sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-0 lg:py-12 mb-6 lg:mb-0">
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
                    <ViewSeries
                      bucketdataseries={bucketdataseries}
                      movePageFunction={movePageFunction}
                    />
                  )}
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

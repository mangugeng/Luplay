"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "./components/navbar";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import banner1 from "../public/banner-1.webp";
import banner2 from "../public/banner-2.webp";
import banner3 from "../public/banner-3.webp";
import post1 from "../public/post-1.webp";
import {
  ArrowPathIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import crown from "../public/crown.png";

export default function Home() {
  const [timeleft, setTimeLeft] = useState<number | null>(null);
  const [playvideo, setPlayVideo] = useState<boolean>(false);
  const [mutedvideo, setMutedVideo] = useState<boolean>(true);
  const [videofinished, setVideoFinished] = useState<boolean>(false);
  const [colorchange, setColorChange] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (timeleft === 0) {
      setTimeLeft(null);
      setPlayVideo(true);
    }
    // exit early when we reach 0
    if (!timeleft) return;
    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeleft - 1);
    }, 1000);
    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeleft]);

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

  return (
    <>
      <header
        className={`fixed z-10 w-full transition-all duration-300 ${
          colorchange ? "bg-pallete-5 shadow-md " : "bg-transparent "
        }`}
      >
        <Navbar></Navbar>
      </header>
      <main>
        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          modules={[Pagination, Navigation, EffectFade]}
          loop={true}
          navigation={true}
          onSlideChange={(swiper) =>
            swiper.realIndex == 2 ? setTimeLeft(2) : setPlayVideo(false)
          }
          effect="fade"
          className="main-carousel-swiper"
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
              <div className="inline-block h-auto left-[5px] absolute text-left top-[40%] -translate-y-1/2 whitespace-normal w-96 z-[3]">
                <h3 className="text-4xl text-white font-bold text-left">
                  Dia Yang Kau Pilih
                </h3>
                <p className="text-white text-base font-normal line-clamp-3 text-left my-4">
                  SETIAP HARI - 16.45 WIB | Kinara, seorang gadis yang baik hati
                  dan menjadi tulang punggung keluarga.
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
                  type="button"
                  className="flex flex-row items-center gap-x-2 mt-8 bg-pallete-4 hover:bg-pallete-3 text-white px-12 py-3 text-sm rounded-full font-semibold"
                >
                  <PlayCircleIcon className="w-4 h-4"></PlayCircleIcon>Cek
                  Sekarang
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
              <div className="inline-block h-auto left-[5px] absolute text-left top-[40%] -translate-y-1/2 whitespace-normal w-96 z-[3]">
                <h3 className="text-4xl text-white font-bold text-left">
                  Cinta Setelah Cinta
                </h3>
                <p className="text-white text-base font-normal line-clamp-3 text-left my-4">
                  NONTON SEKARANG! 2 Episode Terakhir tayang Eksklusif hanya di
                  Vidio.
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
                  type="button"
                  className="flex flex-row items-center gap-x-2 mt-8 bg-pallete-4 hover:bg-pallete-3 text-white px-12 py-3 text-sm rounded-full font-semibold"
                >
                  <PlayCircleIcon className="w-4 h-4"></PlayCircleIcon>Cek
                  Sekarang
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
              <div className="inline-block h-auto left-[5px] absolute text-left top-[40%] -translate-y-1/2 whitespace-normal w-96 z-[3]">
                <h3 className="text-4xl text-white font-bold text-left">
                  Merajut Dendam
                </h3>
                <p className="text-white text-base font-normal line-clamp-3 text-left my-4">
                  Nina memiliki segalanya; suami yang mapan dan keluarga yang
                  sempurna. Semua berubah ketika suaminya, Rasya, dituduh
                  sebagai tersangka kasus pencabulan.
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
                  type="button"
                  className="flex flex-row items-center gap-x-2 mt-8 bg-pallete-4 hover:bg-pallete-3 text-white px-12 py-3 text-sm rounded-full font-semibold"
                >
                  <PlayCircleIcon className="w-4 h-4"></PlayCircleIcon>Cek
                  Sekarang
                </button>
              </div>
            </div>
            <div className="overlay-gradient-video"></div>
          </SwiperSlide>
        </Swiper>
        <div className="mx-auto max-w-6xl py-12">
          <section>
            <h2 className="text-xl text-gray-100 font-semibold mb-4">
              Lunar Originals
            </h2>
            <Swiper
              slidesPerView={7}
              spaceBetween={10}
              centeredSlides={false}
              navigation={true}
              modules={[Navigation]}
              className="home-carousel-swiper"
            >
              <SwiperSlide className="rounded-md">
                <Image
                  src={post1}
                  className="rounded-md"
                  alt="Picture of the author"
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <Image
                  src={post1}
                  className="rounded-md"
                  alt="Picture of the author"
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <Image
                  src={post1}
                  className="rounded-md"
                  alt="Picture of the author"
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <Image
                  src={post1}
                  className="rounded-md"
                  alt="Picture of the author"
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <Image
                  src={post1}
                  className="rounded-md"
                  alt="Picture of the author"
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <Image
                  src={post1}
                  className="rounded-md"
                  alt="Picture of the author"
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <Image
                  src={post1}
                  className="rounded-md"
                  alt="Picture of the author"
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <Image
                  src={post1}
                  className="rounded-md"
                  alt="Picture of the author"
                />
              </SwiperSlide>
              <SwiperSlide className="rounded-md">
                <div className="flex flex-col items-center justify-center h-full text-sm text-gray-300">
                  Lihat semua
                  <div className="text-3xl font-semibold mt-2">
                    Lunar Originals
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </section>
        </div>
      </main>
    </>
  );
}

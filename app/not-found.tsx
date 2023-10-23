"use client";

import Link from "next/link";
import Navbar from "./components/navbar";
import Image from "next/image";
import notfound from "../public/not-found.svg";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import trailer from "../public/trailer-1.webp";

export default function NotFound() {
  return (
    <>
      <header className="fixed z-10 w-full transition-all duration-300 bg-pallete-5 shadow-md ">
        <Navbar></Navbar>
      </header>
      <div className="container mx-auto px-4 pt-4">
        <div className="flex flex-col justify-center items-center text-lg my-12 mx-auto relative text-center w-[544px] z-[1]">
          <Image
            src={notfound}
            alt="Picture of the author"
            className="h-80 w-80"
          />
          <h2 className="text-gray-100 text-2xl font-bold mt-10">Oops !</h2>
          <p className="text-base text-gray-300 mt-2">
            Halaman yang kamu cari enggak ada.
          </p>
        </div>
        <div className="text-sm font-bold my-16 mx-auto">
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
                  Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI Liga 1 2023/24
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
                  Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI Liga 1 2023/24
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
                  Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI Liga 1 2023/24
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
                  Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI Liga 1 2023/24
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
                  Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI Liga 1 2023/24
                  </p>
                </div>
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

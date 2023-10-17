"use client";

import Image from "next/image";
import Navbar from "./components/navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import banner1 from "../public/banner-1.webp";
import banner2 from "../public/banner-2.webp";
import banner3 from "../public/banner-3.webp";

export default function Home() {
  return (
    <>
      <header className="sticky z-10">
        <Navbar></Navbar>
      </header>
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        loop={true}
        navigation={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <div>
            <Image
              src={banner1}
              width={1366}
              height={480}
              alt="Picture of the author"
            />
          </div>
          <div className="absolute w-96 top-1/4 left-24 z-[3]">
            <h3 className="text-4xl text-white font-bold text-left">
              Dia Yang Kau Pilih
            </h3>
            <p className="text-white text-base font-normal line-clamp-3 text-left mt-4">
              SETIAP HARI - 16.45 WIB | Kinara, seorang gadis yang baik hati dan
              menjadi tulang punggung keluarga.
            </p>
            <button
              type="button"
              className="flex flex-row items-center gap-x-2 mt-8 bg-pallete-4 hover:bg-pallete-3 text-white px-12 py-3 text-sm rounded-full font-semibold"
            >
              <PlayCircleIcon className="w-4 h-4"></PlayCircleIcon>Cek Sekarang
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <Image
              src={banner3}
              width={1366}
              height={480}
              alt="Picture of the author"
            />
          </div>
          <div className="absolute w-96 top-1/4 left-24 z-[3]">
            <h3 className="text-4xl text-white font-bold text-left">
              Cinta Setelah Cinta
            </h3>
            <p className="text-white text-base font-normal line-clamp-3 text-left mt-4">
              NONTON SEKARANG! 2 Episode Terakhir tayang Eksklusif hanya di
              Vidio.
            </p>
            <button
              type="button"
              className="flex flex-row items-center gap-x-2 mt-8 bg-pallete-4 hover:bg-pallete-3 text-white px-12 py-3 text-sm rounded-full font-semibold"
            >
              <PlayCircleIcon className="w-4 h-4"></PlayCircleIcon>Cek Sekarang
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <Image
              src={banner2}
              width={1366}
              height={480}
              alt="Picture of the author"
            />
          </div>
          <div className="absolute w-96 top-1/4 left-24 z-[3]">
            <h3 className="text-4xl text-white font-bold text-left">
              Merajut Dendam
            </h3>
            <p className="text-white text-base font-normal line-clamp-3 text-left mt-4">
              Nina memiliki segalanya; suami yang mapan dan keluarga yang
              sempurna. Semua berubah ketika suaminya, Rasya, dituduh sebagai
              tersangka kasus pencabulan.
            </p>
            <button
              type="button"
              className="flex flex-row items-center gap-x-2 mt-8 bg-pallete-4 hover:bg-pallete-3 text-white px-12 py-3 text-sm rounded-full font-semibold"
            >
              <PlayCircleIcon className="w-4 h-4"></PlayCircleIcon>Cek Sekarang
            </button>
          </div>
          <div className="premium-headline__gradient"></div>
        </SwiperSlide>
      </Swiper>
      <div className="mx-auto max-w-7xl"></div>
    </>
  );
}

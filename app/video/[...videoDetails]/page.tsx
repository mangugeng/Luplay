"use client";

import Navbar from "../../components/navbar";
import Image from "next/image";
import banner from "../../../public/banner-detail.webp";
import crown from "../../../public/crown.png";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <div className="relative w-full h-[480px] container-banner-details">
          <div className="w-full h-full absolute text-right top-0">
            <div className="h-full relative ml-auto overflow-hidden w-fit">
              <Image
                src={banner}
                width={960}
                height={540}
                alt="Picture of the author"
                className="block h-full w-full"
              />
              <div className="overlay-gradient-detail"></div>
            </div>
          </div>
          <div className="flex items-center h-full left-0 absolute top-0 w-full z-[1]">
            <div className="w-[1242px] px-5 mx-auto">
              <div className="w-[454px] text-white">
                <h1 className="text-3xl font-bold">Merajut Dendam</h1>
                <div className="flex items-center font-semibold gap-1 mt-2 text-xs">
                  <div
                    className="h-6 w-6 bg-contain bg-no-repeat"
                    style={{ backgroundImage: `url(${crown.src})` }}
                  ></div>
                  <span className="separator">•</span>
                  <div className="border border-solid border-white rounded-sm px-1">
                    18+
                  </div>
                  <span className="separator">•</span>
                  <div className="">2023</div>
                  <span className="separator">•</span>
                  <div className="">3 Episodes</div>
                  <span className="separator">•</span>
                  <div className="">
                    <a href="#" className="hover:underline hover:text-blue-600">
                      Drama
                    </a>
                    ,&nbsp;
                    <a href="#" className="hover:underline hover:text-blue-600">
                      Romance
                    </a>
                  </div>
                </div>
                <div className="mt-2 mb-4">
                  <p className="line-clamp-4 text-sm mb-3">
                    Nina memiliki segalanya; suami yang mapan dan keluarga yang
                    sempurna. Semua berubah ketika suaminya, Rasya, dituduh
                    sebagai tersangka kasus pencabulan.
                  </p>
                  <div className="flex gap-2 items-start text-sm">
                    <div className="shrink-0 text-gray-400">
                      Sutradara:&nbsp;
                    </div>
                    <div>
                      <a
                        href="#"
                        className="hover:underline hover:text-blue-600"
                      >
                        Razka Robby Ertanto
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start text-sm">
                    <div className="shrink-0 text-gray-400">Pemain:&nbsp;</div>
                    <div className="headline-info__people-item">
                      <a
                        href="#"
                        className="hover:underline hover:text-blue-600"
                      >
                        Oka Antara
                      </a>
                      ,&nbsp;
                      <a
                        href="#"
                        className="hover:underline hover:text-blue-600"
                      >
                        Laura Basuki
                      </a>
                      ,&nbsp;
                      <a
                        href="#"
                        className="hover:underline hover:text-blue-600"
                      >
                        Carissa Perusset
                      </a>
                      ,&nbsp;
                      <a
                        href="#"
                        className="hover:underline hover:text-blue-600"
                      >
                        Andri Mashadi
                      </a>
                      ,&nbsp;
                      <a
                        href="#"
                        className="hover:underline hover:text-blue-600"
                      >
                        Sheila Marcia
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold mb-2">
                  Nonton Lebih Cepat Episode 3 dengan Vidio&nbsp;Express!
                </div>
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    className="inline-flex py-3 px-6 text-center bg-pallete-4 hover:bg-pallete-3 rounded-md font-bold items-center shadow-lg"
                  >
                    <PlayCircleIcon className="w-6 h-6 mr-2"></PlayCircleIcon>
                    Putar
                  </button>
                  <button
                    type="button"
                    className="inline-flex py-3 px-6 text-center border border-white rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white"
                  >
                    <BookmarkIcon className="w-6 h-6 mr-2"></BookmarkIcon>
                    Daftarku
                  </button>
                  <button type="button"
                  className="inline-flex py-3 px-6 text-center border border-white rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white"
                  >
                    <ShareIcon className="w-6 h-6 mr-2"></ShareIcon>
                    Bagikan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mx-auto relative max-w-6xl">
          <div className="relative w-64 text-left mt-7">
            <div className="absolute top-0 w-full">
              <ul className="flex flex-col overflow-hidden">
                <li>
                  <a href="#" className="block w-full text-white font-black border-l-4 text-lg capitalize py-2 px-5 border-l-pallete-3">Episode</a>
                </li>
                <li>
                  <a href="#" className="block w-full text-gray-300 font-normal border-l-4 text-lg capitalize py-2 px-5 border-l-pallete-1">Trailer & Ekstra</a>
                </li>
                <li>
                  <a href="#" className="block w-full text-gray-300 font-normal border-l-4 text-lg capitalize py-2 px-5 border-l-pallete-1">Konten Sejenis</a>
                </li>
              </ul>
            </div>
          </div>
          <div></div>
        </div>
      </main>
    </>
  );
}

"use client";

import React, { Fragment, useState, useRef, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import VideoPlayer from "./components/video-player";
import crown from "../../../public/crown.png";
import poster from "../../../public/poster.webp";
import Image from "next/image";
import {
  BookmarkIcon,
  ShareIcon,
  ChevronUpDownIcon,
  FunnelIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import trailer from "../../../public/trailer-1.webp";
import { Listbox, Transition } from "@headlessui/react";
import user from "../../../public/user.png";

const filtercomment = [
  { id: 1, name: "Terlama ke Terbaru" },
  { id: 2, name: "Terbaru ke Terlama" },
];

export default function Page() {
  const VIDEOJS_OPTIONS = {
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      skipButtons: {
        backward: 10,
        forward: 10,
      },
    },
    preferFullWindow: true,
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
        type: "application/x-mpegURL",
      },
    ],
    html5: {
      vhs: {
        overrideNative: true,
      },
      nativeAudioTracks: false,
      nativeVideoTracks: false,
    },
  };

  const [selectedfiltercomment, setSelectedFilterComment] = useState(
    filtercomment[0]
  );
  const [valuecomment, setValueComment] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const useAutosizeTextArea = (
    textAreaRef: HTMLTextAreaElement | null,
    value: string
  ) => {
    useEffect(() => {
      if (textAreaRef) {
        // We need to reset the height momentarily to get the correct scrollHeight for the textarea
        textAreaRef.style.height = "0px";
        const scrollHeight = textAreaRef.scrollHeight;

        // We then set the height directly, outside of the render loop
        // Trying to set this with state or a ref will product an incorrect value.
        textAreaRef.style.height = scrollHeight + "px";
      }
    }, [textAreaRef, value]);
  };

  useAutosizeTextArea(textAreaRef.current, valuecomment);

  const handleChangeComment = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValueComment(val);
  };
  return (
    <>
      <header className="fixed z-50 w-full top-0 bg-pallete-5 shadow-md">
        <Navbar></Navbar>
      </header>
      <div className="p-0 mx-auto before:content-[''] before:table">
        <main className="justify-between mx-auto max-w-[1360px] w-[1360px] py-8 grid gap-y-8 before:content-[''] before:table">
          <div className="min-h-[569px] w-[1012px] bg-black/40 block h-[441px] overflow-hidden relative">
            <VideoPlayer options={VIDEOJS_OPTIONS} />
          </div>
          <div className="w-[1012px]">
            <div className="w-full">
              <div>
                <section className="my-4 block">
                  <h1 className="line-clamp-2 text-ellipsis text-2xl font-bold mb-4 text-gray-100">
                    Merajut Dendam
                  </h1>
                  <div className="flex text-base font-semibold mb-6 text-gray-600">
                    <span
                      className="block h-6 w-6 bg-contain bg-no-repeat"
                      style={{ backgroundImage: `url(${crown.src})` }}
                    ></span>
                    <span className="before:inline-block before:content-[''] before:border-l before:border-gray-600 before:h-3 before:mx-2">
                      2023
                    </span>
                    <span className="before:inline-block before:content-[''] before:border-l before:border-gray-600 before:h-3 before:mx-2">
                      Season : Ep 01 - Harta, Tahta, Wanita
                    </span>
                  </div>
                  <article className="line-clamp-2 text-ellipsis text-gray-200 text-base">
                    <p className="mt-0 mb-3 text-sm">
                      Rasya Perdana, pengacara handal dari keluarga terpandang
                      yang tersandung kasus video perselingkuhannya. Siapa
                      dalang dibalik penyebaran video itu?
                    </p>
                  </article>
                  <div className="">
                    <hr className="border-t border-gray-700 my-6"></hr>
                    <h2 className="text-gray-100 text-base font-semibold mb-4 mt-6">
                      Detail Serial
                    </h2>
                    <div className="flex gap-4">
                      <a href="#" className="shrink-0">
                        <Image
                          src={poster}
                          alt="Picture of the author"
                          className=""
                          width={67}
                          height={100}
                        />
                      </a>
                      <div className="flex flex-col gap-3 justify-center">
                        <a
                          href="#"
                          className="text-gray-100 text-xl font-bold line-clamp-2 text-ellipsis hover:text-blue-700"
                        >
                          Merajut Dendam
                        </a>
                        <div className="flex">
                          <span className="flex items-center after:border-r after:border-gray-600 after:content-[''] after:inline-block after:h-3 after:mx-3">
                            <Image
                              src={crown}
                              alt="Picture of the author"
                              className=""
                              height={20}
                              width={20}
                            />
                          </span>
                          <span className="text-sm text-gray-600 font-normal">
                            2023
                          </span>
                        </div>
                        <div className="px-2 py-1 bg-pallete-1 text-gray-700 text-xs">
                          Nonton Lebih Cepat Episode 4 & 5 dengan Vidio Express!
                        </div>
                      </div>
                    </div>
                    <article className="mt-4 text-gray-200 text-base font-normal">
                      <p className="mt-0 text-sm font-normal mb-3">
                        Nina memiliki segalanya; suami yang mapan dan keluarga
                        yang sempurna. Semua berubah ketika suaminya, Rasya,
                        dituduh sebagai tersangka kasus pencabulan.
                      </p>
                    </article>
                    <hr className="border-t border-gray-700 my-6"></hr>
                    <div className="mb-6">
                      <div className="flex flex-wrap">
                        <a
                          href="#"
                          className="text-xs font-semibold mr-2 bg-pallete-2 rounded text-gray-100 block mb-2 py-1 px-2 hover:text-blue-600"
                        >
                          Drama
                        </a>
                        <a
                          href="#"
                          className="text-xs font-semibold mr-2 bg-pallete-2 rounded text-gray-100 block mb-2 py-1 px-2 hover:text-blue-600"
                        >
                          Romance
                        </a>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-base font-base font-semibold text-blue-700"
                  >
                    Lihat Lebih Banyak
                  </button>
                </section>
                <section className="my-4 block">
                  <ul className="flex gap-2 mb-4">
                    <li>
                      <button
                        type="button"
                        className="inline-flex text-sm p-3 text-center border border-white rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white"
                      >
                        <BookmarkIcon className="w-4 h-4 mr-2"></BookmarkIcon>
                        Daftarku
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex text-sm p-3 text-center border border-white rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white"
                      >
                        <ShareIcon className="w-4 h-4 mr-2"></ShareIcon>
                        Bagikan
                      </button>
                    </li>
                  </ul>
                </section>
                <section className="my-4 block">
                  <div className="mb-4 flex justify-between items-center relative">
                    <h3 className="text-xl font-bold line-clamp-1 text-gray-100 m-0 text-ellipsis whitespace-normal">
                      Trailer & Extra
                    </h3>
                  </div>
                  <Swiper
                    slidesPerView={6}
                    spaceBetween={10}
                    centeredSlides={false}
                    navigation={true}
                    modules={[Navigation]}
                    className="watch-carousel-swiper"
                  >
                    <SwiperSlide className="rounded-lg relative align-top">
                      <a href="#" className="">
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
                        <div className="mt-2">
                          <h3 className="font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                            Merajut Dendam - Vidio Original Series | Official
                            Teaser
                          </h3>
                        </div>
                      </a>
                    </SwiperSlide>
                    <SwiperSlide className="rounded-lg relative align-top">
                      <a href="#" className="">
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
                        <div className="mt-2">
                          <h3 className="font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                            Merajut Dendam - Vidio Original Series | Official
                            Teaser
                          </h3>
                        </div>
                      </a>
                    </SwiperSlide>
                    <SwiperSlide className="rounded-lg relative align-top">
                      <a href="#" className="">
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
                        <div className="mt-2">
                          <h3 className="font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                            Merajut Dendam - Vidio Original Series | Official
                            Teaser
                          </h3>
                        </div>
                      </a>
                    </SwiperSlide>
                    <SwiperSlide className="rounded-lg relative align-top">
                      <a href="#" className="">
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
                        <div className="mt-2">
                          <h3 className="font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                            Merajut Dendam - Vidio Original Series | Official
                            Teaser
                          </h3>
                        </div>
                      </a>
                    </SwiperSlide>
                    <SwiperSlide className="rounded-lg relative align-top">
                      <a href="#" className="">
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
                        <div className="mt-2">
                          <h3 className="font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                            Merajut Dendam - Vidio Original Series | Official
                            Teaser
                          </h3>
                        </div>
                      </a>
                    </SwiperSlide>
                    <SwiperSlide className="rounded-lg relative align-top">
                      <a href="#" className="">
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
                        <div className="mt-2">
                          <h3 className="font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                            Merajut Dendam - Vidio Original Series | Official
                            Teaser
                          </h3>
                        </div>
                      </a>
                    </SwiperSlide>
                    <SwiperSlide className="rounded-lg relative align-top">
                      <a href="#" className="">
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
                        <div className="mt-2">
                          <h3 className="font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                            Merajut Dendam - Vidio Original Series | Official
                            Teaser
                          </h3>
                        </div>
                      </a>
                    </SwiperSlide>
                    <SwiperSlide className="rounded-lg relative align-top">
                      <a href="#" className="">
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
                        <div className="mt-2">
                          <h3 className="font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                            Merajut Dendam - Vidio Original Series | Official
                            Teaser
                          </h3>
                        </div>
                      </a>
                    </SwiperSlide>
                  </Swiper>
                </section>
                <div className="">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-full mb-4 flex items-center justify-between relative">
                      <h3 className="text-xl font-bold line-clamp-1 text-gray-100 text-ellipsis whitespace-normal">
                        Semua Komentar
                      </h3>
                      <Listbox
                        value={selectedfiltercomment}
                        onChange={setSelectedFilterComment}
                        as="div"
                        className="relative z-10"
                      >
                        {({ open }) => (
                          <>
                            <Listbox.Button className=" flex flex-row items-center gap-x-2 text-base text-gray-300 font-semibold ">
                              <FunnelIcon className="w-4 h-4"></FunnelIcon>
                              {selectedfiltercomment.name}
                              <ChevronUpDownIcon className="w-4 h-4"></ChevronUpDownIcon>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              enter="transition duration-100 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Listbox.Options
                                static
                                className="absolute w-full z-10 text-center mt-2 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                {filtercomment.map((filter) => (
                                  <Listbox.Option
                                    key={filter.id}
                                    value={filter}
                                    as={Fragment}
                                  >
                                    {({ active }) => (
                                      <li
                                        className={`cursor-pointer ${
                                          active
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-gray-600"
                                        }`}
                                      >
                                        {filter.name}
                                      </li>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </>
                        )}
                      </Listbox>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <Image
                      src={user}
                      className="w-10 h-10 rounded-[50%] mt-1"
                      alt="Picture of the author"
                    />
                    <div className="grow items-stretch flex flex-wrap relative">
                      <textarea
                        placeholder="Tulis komentar kamu..."
                        onChange={handleChangeComment}
                        value={valuecomment}
                        ref={textAreaRef}
                        rows={1}
                        className="min-h-[48px] border-gray-700 resize-none bg-white border border-solid rounded-md text-base text-gray-900 outline-none px-4 py-3 w-full overflow-hidden placeholder:text-gray-300"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      className="py-2 px-6 text-xs min-w-[32px] text-gray-400 items-center rounded inline-flex font-bold justify-center"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      className="py-2 px-6 text-xs min-w-[32px] text-gray-400 items-center rounded inline-flex font-bold justify-center bg-gray-100"
                    >
                      Kirim
                    </button>
                  </div>
                  <ul>
                    <li className="border-b border-solid border-gray-700 flex flex-row gap-4 my-6">
                      <a href="#">
                        <div className="items-center bg-pallete-3 rounded-full text-gray-300 flex w-[38px] h-[38px] justify-center min-h-[38px] overflow-hidden align-middle">
                          JD
                        </div>
                      </a>
                      <div className="w-full ">
                        <div>
                          <a
                            href="#"
                            className="text-sm font-semibold text-gray-100"
                          >
                            John Doe
                          </a>
                          <span className="text-gray-300 font-normal text-xs before:content-['\2022'] before:mx-2">
                            8 jam yang lalu
                          </span>
                        </div>
                        <div className="break-words text-gray-100 text-sm mt-2 mb-4">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </div>
                      </div>
                      <div className="relative text-gray-300">
                        <button type="button" className="w-fit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            data-testid="more-button"
                          >
                            <path
                              fill="currentColor"
                              fill-rule="evenodd"
                              d="M12 2a2.275 2.275 0 1 0 0 4.55A2.275 2.275 0 0 0 12 2Zm0 15.45A2.275 2.275 0 1 0 12 22a2.275 2.275 0 0 0 0-4.55ZM9.725 12a2.275 2.275 0 1 1 4.55 0 2.275 2.275 0 0 1-4.55 0Z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </li>
                  </ul>
                  <div className="text-center">
                    <button
                      type="button"
                      className="w-full text-gray-100 text-sm uppercase font-semibold flex justify-center gap-2 items-center"
                    >
                      <span>Tampilkan lebih banyak</span>
                      <ChevronDownIcon className="w-3 h-3 font-semibold"></ChevronDownIcon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

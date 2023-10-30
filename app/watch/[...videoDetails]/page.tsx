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
  ChevronDownIcon,
  XMarkIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import trailer from "../../../public/trailer-1.webp";
import { Listbox, Transition } from "@headlessui/react";
import user from "../../../public/user.png";
import episode from "../../../public/episode-1.webp";
import similar from "../../../public/similar-1.webp";
import { useRouter } from "next/navigation";
import postermobille from "../../../public/poster-mobile.webp";

const filtercomment = [
  { id: 1, name: "Terlama ke Terbaru" },
  { id: 2, name: "Terbaru ke Terlama" },
];

export default function Page() {
  const router = useRouter();

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

  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [devicemobile, setDeviceMobile] = useState<boolean>(false);
  const [selectedfiltercomment, setSelectedFilterComment] = useState(
    filtercomment[0]
  );
  const [valuecomment, setValueComment] = useState("");
  const [infomobile, setInfoMobile] = useState<boolean>(false);
  const [commentmobile, setCommentMobile] = useState<boolean>(false);
  const [trailerextramobile, setTrailerExtraMobile] = useState<boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(function () {
        // setToggleSkeleton(false);
      }, 2000);
      setPageLoaded(true);
      setCheckboxCurtain(true);
    }
  }, []);
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
    sleep(1000).then(() => router.push(param));
  };
  const previousPageFunction = () => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.back());
  };
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
      <header className="fixed z-50 w-full top-0 bg-pallete-5 shadow-md hidden lg:block">
        <Navbar movePageFunction={movePageFunction}></Navbar>
      </header>
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
              devicemobile ? (
                <div className="mx-auto">
                  <div className="ml-4 absolute top-4 z-[5] transitio">
                    <button
                      type="button"
                      className="bg-pallete-4/50 rounded-full inline p-2 text-white"
                      onClick={() => previousPageFunction()}
                    >
                      <ArrowLeftIcon className="w-6 h-6"></ArrowLeftIcon>
                    </button>
                  </div>
                  <div className="right-4 absolute top-4 z-[5]">
                    <button
                      type="button"
                      className="bg-pallete-4/50 rounded-full inline p-2 text-white"
                    >
                      <ShareIcon className="w-6 h-6"></ShareIcon>
                    </button>
                  </div>
                  <div className="fixed w-full left-1/2 -translate-x-1/2 z-[4] shadow-md">
                    <div
                      className="pt-[42.6%] relative bg-black/50 bg-no-repeat bg-cover"
                      style={{ backgroundImage: `url(${episode.src})` }}
                    >
                      <VideoPlayer options={VIDEOJS_OPTIONS} />
                    </div>
                  </div>
                  <div className="pt-[42.6%]">
                    <div className="text-white mx-auto relative">
                      <div className="h-[calc(100%-0.3*100%)] md:h-[calc(100%-0.5*100%)] relative overflow-y-scroll">
                        <section className="my-6">
                          <div className="mx-4">
                            <div className="flex justify-between w-full">
                              <div>
                                <span>
                                  <h1 className="line-clamp-2 text-white text-base font-semibold mb-[5px] text-ellipsis">
                                    Merajut Dendam
                                  </h1>
                                </span>
                                <div className="line-clamp-2 text-gray-300 text-xs font-semibold mt-[3px] mb-2 text-ellipsis">
                                  Season : Ep 01 - Harta, Tahta, Wanita
                                </div>
                                <div className="flex text-xs">
                                  <span className="border-r border-gray-300 px-2">
                                    <Image
                                      src={crown}
                                      className="w-4 h-4"
                                      alt="Picture of the author"
                                    />
                                  </span>
                                  <span className="border-r-0 px-2">2023</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                className="justify-center flex flex-col items-center w-[50px]"
                                onClick={() =>
                                  setInfoMobile((current) => !current)
                                }
                              >
                                <ChevronDownIcon className="w-4 h-4"></ChevronDownIcon>
                              </button>
                            </div>
                          </div>
                          <div
                            className={`bottom-0 fixed h-[calc(100%-0.3*100%)] md:h-[calc(100%-0.5*100%)] w-full detail-selected-bottom ${
                              infomobile
                                ? "detail-selected-bottom z-[7]"
                                : "detail-selected-bottom-hidden z-[-1]"
                            }`}
                          >
                            <div className="h-full left-0 absolute top-0 w-full z-[6] overflow-y-scroll">
                              <div className="items-center bg-pallete-4 flex flex-row justify-between left-0 py-3 px-4 sticky top-0 w-full z-[5]">
                                <h3 className="text-white text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap w-11/12">
                                  Info
                                </h3>
                                <button
                                  type="button"
                                  className="w-6 h-6 text-white"
                                  onClick={() =>
                                    setInfoMobile((current) => !current)
                                  }
                                >
                                  <XMarkIcon></XMarkIcon>
                                </button>
                              </div>
                              <div className="bg-pallete-5 h-100% overflow-y-scroll">
                                <div className="p-4">
                                  <div className="text-base font-semibold mb-3">
                                    Sinopsis
                                  </div>
                                  <div className="text-white text-sm font-semibold">
                                    Season : Ep 01 - Harta, Tahta, Wanita
                                  </div>
                                  <div className="text-gray-300 text-xs font-normal mt-2">
                                    <div className="overflow-hidden relative">
                                      <article>
                                        <p className="text-gray-300 text-xs font-normal">
                                          Rasya Perdana, pengacara handal dari
                                          keluarga terpandang yang tersandung
                                          kasus video perselingkuhannya. Siapa
                                          dalang dibalik penyebaran video itu?
                                        </p>
                                      </article>
                                    </div>
                                  </div>
                                </div>
                                <hr className="border-b-[6px] border-b-gray-600 border-t-0 opacity-30" />
                                <div className="mt-4 px-4">
                                  <div className="text-base font-semibold mb-3">
                                    Detail Serial
                                  </div>
                                  <div className="flex items-center mb-4">
                                    <div className="mr-3 relative">
                                      <a href="" className="overflow-hidden">
                                        <picture>
                                          <Image
                                            src={postermobille}
                                            width={55}
                                            height={80}
                                            className="rounded-[4%]"
                                            alt="Picture of the author"
                                          />
                                        </picture>
                                      </a>
                                    </div>
                                    <div className="items-center flex-[3_1]">
                                      <div className="flex justify-between w-full">
                                        <div>
                                          <span>
                                            <h1 className="text-sm mb-1 line-clamp-2 text-white font-semibold text-ellipsis">
                                              Merajut Dendam
                                            </h1>
                                          </span>
                                          <div className="text-xs flex">
                                            <span className="border-r border-r-gray-300 pr-2">
                                              <Image
                                                src={crown}
                                                className="w-4 h-4"
                                                alt="Picture of the author"
                                              />
                                            </span>
                                            <span className="border-r-0 px-2">
                                              2023
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-4 text-gray-300 font-normal whitespace-pre-wrap break-words">
                                    <div className="overflow-hidden relative">
                                      <article>
                                        <p className="text-gray-300 text-xs font-normal whitespace-pre-wrap break-words">
                                          Nina memiliki segalanya, suami yang
                                          mapan dan keluarga yang sempurna.
                                          Semua berubah ketika suaminya, Rasya,
                                          dituduh sebagai tersangka kasus
                                          pencabulan.
                                        </p>
                                      </article>
                                    </div>
                                    <a
                                      href=""
                                      className="text-blue-600 font-semibold text-xs"
                                    >
                                      Lebih Sedikit
                                    </a>
                                  </div>
                                  <div>
                                    <div className="flex flex-wrap">
                                      <a
                                        href="#"
                                        className="mr-2 bg-pallete-3 rounded text-white block text-[10px] font-bold mb-2 py-[5px] px-2"
                                      >
                                        Drama
                                      </a>
                                      <a
                                        href="#"
                                        className="mr-2 bg-pallete-3 rounded text-white block text-[10px] font-bold mb-2 py-[5px] px-2"
                                      >
                                        Romance
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="my-6">
                          <ul className="flex gap-2 m-4 overflow-x-scroll overflow-y-hidden whitespace-nowrap">
                            <li className="flex items-center justify-center flex-col min-w-[60px]">
                              <div className="h-8 w-8 flex items-center justify-center">
                                <BookmarkIcon></BookmarkIcon>
                              </div>
                              <p className="text-white text-[10px] font-semibold text-center">
                                Daftarku
                              </p>
                            </li>
                            <li className="flex items-center justify-center flex-col min-w-[60px]">
                              <button
                                type="button"
                                className="h-8 w-8 flex items-center justify-center"
                                onClick={() =>
                                  setCommentMobile((current) => !current)
                                }
                              >
                                <ChatBubbleBottomCenterTextIcon></ChatBubbleBottomCenterTextIcon>
                              </button>
                              <p className="text-white text-[10px] font-semibold text-center">
                                Komentar
                              </p>
                              <div
                                className={`bottom-0 fixed h-[calc(100%-0.3*100%)] md:h-[calc(100%-0.5*100%)] w-full left-0 ${
                                  commentmobile
                                    ? "detail-selected-bottom z-[7]"
                                    : "detail-selected-bottom-hidden z-[-1]"
                                }`}
                              >
                                <div className="h-full left-0 absolute top-0 w-full z-[6] overflow-y-scroll">
                                  <div className="items-center bg-pallete-4 flex flex-row justify-between left-0 py-3 px-4 sticky top-0 w-full z-[5]">
                                    <h3 className="text-white text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap w-11/12">
                                      Komentar
                                    </h3>
                                    <button
                                      type="button"
                                      className="w-6 h-6 text-white"
                                      onClick={() =>
                                        setCommentMobile(
                                          (current) => !current
                                        )
                                      }
                                    >
                                      <XMarkIcon></XMarkIcon>
                                    </button>
                                  </div>
                                  <div className="bg-pallete-5 h-100% overflow-y-scroll">
                                    <div className="flex justify-between pt-4 px-4">
                                      <span className="text-gray-300 text-xs font-normal">
                                        1 Komentar
                                      </span>
                                    </div>
                                    <ul className="py-2 px-4">
                                      <li className="border-b border-gray-600 py-2 flex">
                                        <a href="">
                                          <div className="flex items-center border bg-pallete-3 border-gray-600 rounded-full h-8 justify-center min-w-[32px] overflow-hidden align-middle text-white">
                                            J
                                          </div>
                                        </a>
                                        <div className="ml-4 w-[calc(100%-40px)]">
                                          <a href="" className="flex w-full items-center">
                                            <span className="text-gray-300 text-[13px] font-semibold max-w-[27vw] overflow-hidden text-ellipsis whitespace-nowrap">John Doe</span>
                                            <span className="text-xs text-gray-300 whitespace-nowrap before:content-[•] before:mx-1 ">1 jam yang lalu</span>
                                          </a>
                                          <div className="my-1">
                                            <div className="overflow-hidden relative">
                                              <p className="mt-0 break-words text-white text-sm font-normal my-1">
                                              yg di tunggu²
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-center justify-between my-4">
                                            <button type="button" className="items-baseline bg-transparent"></button>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="flex items-center justify-center flex-col min-w-[60px]">
                              <div className="h-8 w-8 flex items-center justify-center">
                                <ShareIcon></ShareIcon>
                              </div>
                              <p className="text-white text-[10px] font-semibold text-center">
                                Bagikan
                              </p>
                            </li>
                          </ul>
                        </section>
                        <section className="my-6">
                          <div className="flex items-center justify-between mx-4 mb-[10px] relative">
                            <span className="p-2 border border-gray-300 rounded text-white text-xs font-semibold">
                              Season
                            </span>
                          </div>
                          <Swiper
                            breakpoints={{
                              0: {
                                slidesPerView: 2.7,
                                spaceBetween: 10,
                              },
                              768: {
                                slidesPerView: 4.7,
                                spaceBetween: 10,
                              },
                            }}
                            slidesPerView={2.9}
                            spaceBetween={10}
                            centeredSlides={false}
                            navigation={true}
                            modules={[Navigation]}
                            className="watch-carousel-swiper watch-carousel-swiper-mobile"
                          >
                            <SwiperSlide className="rounded-lg relative align-top">
                              <a href="#" className="group">
                                <div className="relative">
                                  <Image
                                    src={episode}
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
                                  <h3 className="group-hover:underline text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                                    Ep 01 - Harta, Tahta, Wanita
                                  </h3>
                                </div>
                              </a>
                            </SwiperSlide>
                            <SwiperSlide className="rounded-lg relative align-top">
                              <a href="#" className="group">
                                <div className="relative">
                                  <Image
                                    src={episode}
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
                                  <h3 className="group-hover:underline text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                                    Ep 01 - Harta, Tahta, Wanita
                                  </h3>
                                </div>
                              </a>
                            </SwiperSlide>
                            <SwiperSlide className="rounded-lg relative align-top">
                              <a href="#" className="group">
                                <div className="relative">
                                  <Image
                                    src={episode}
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
                                  <h3 className="group-hover:underline text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                                    Ep 01 - Harta, Tahta, Wanita
                                  </h3>
                                </div>
                              </a>
                            </SwiperSlide>
                            <SwiperSlide className="rounded-lg relative align-top">
                              <a href="#" className="group">
                                <div className="relative">
                                  <Image
                                    src={episode}
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
                                  <h3 className="group-hover:underline text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                                    Ep 01 - Harta, Tahta, Wanita
                                  </h3>
                                </div>
                              </a>
                            </SwiperSlide>
                            <SwiperSlide className="rounded-lg relative align-top">
                              <a href="#" className="group">
                                <div className="relative">
                                  <Image
                                    src={episode}
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
                                  <h3 className="group-hover:underline text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                                    Ep 01 - Harta, Tahta, Wanita
                                  </h3>
                                </div>
                              </a>
                            </SwiperSlide>
                          </Swiper>
                        </section>
                        <section className="my-6">
                          <div className="flex items-center justify-between mx-4 mb-[10px] relative">
                            <button
                              type="button"
                              onClick={() =>
                                setTrailerExtraMobile((current) => !current)
                              }
                            >
                              <h3 className="line-clamp-1 text-white text-base font-semibold text-ellipsis whitespace-normal">
                                Trailer & Extra
                              </h3>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setTrailerExtraMobile((current) => !current)
                              }
                              className="text-white block text-sm font-normal h-4 whitespace-nowrap w-4"
                            >
                              <ChevronRightIcon></ChevronRightIcon>
                            </button>
                          </div>
                          <Swiper
                            breakpoints={{
                              0: {
                                slidesPerView: 2.7,
                                spaceBetween: 10,
                              },
                              768: {
                                slidesPerView: 4.7,
                                spaceBetween: 10,
                              },
                            }}
                            slidesPerView={2.9}
                            spaceBetween={10}
                            centeredSlides={false}
                            navigation={true}
                            modules={[Navigation]}
                            className="watch-carousel-swiper watch-carousel-swiper-mobile"
                          >
                            <SwiperSlide className="rounded-lg relative align-top">
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
                                <div className="mt-2">
                                  <h3 className="group-hover:underline text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap font-normal">
                                    Merajut Dendam - Vidio Original Series |
                                    Official Teaser
                                  </h3>
                                </div>
                              </a>
                            </SwiperSlide>
                            <SwiperSlide className="rounded-lg relative align-top">
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
                                <div className="mt-2">
                                  <h3 className="group-hover:underline text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap font-normal">
                                    Merajut Dendam - Vidio Original Series |
                                    Official Teaser
                                  </h3>
                                </div>
                              </a>
                            </SwiperSlide>
                            <SwiperSlide className="rounded-lg relative align-top">
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
                                <div className="mt-2">
                                  <h3 className="group-hover:underline text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap font-normal">
                                    Merajut Dendam - Vidio Original Series |
                                    Official Teaser
                                  </h3>
                                </div>
                              </a>
                            </SwiperSlide>
                            <SwiperSlide className="rounded-lg relative align-top">
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
                                <div className="mt-2">
                                  <h3 className="group-hover:underline text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap font-normal">
                                    Merajut Dendam - Vidio Original Series |
                                    Official Teaser
                                  </h3>
                                </div>
                              </a>
                            </SwiperSlide>
                            <SwiperSlide className="rounded-lg relative align-top">
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
                                <div className="mt-2">
                                  <h3 className="group-hover:underline text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap font-normal">
                                    Merajut Dendam - Vidio Original Series |
                                    Official Teaser
                                  </h3>
                                </div>
                              </a>
                            </SwiperSlide>
                            <SwiperSlide className="rounded-lg relative align-top">
                              <a href="#" className="group">
                                <div className="flex items-center h-full justify-center">
                                  <div className="flex flex-col relative items-center">
                                    <ArrowRightIcon className="text-white h-10 w-10 p-3 m-auto rounded-full icon-arrow-right-view-all"></ArrowRightIcon>
                                    <span className="text-white text-xs mt-2 text-center whitespace-normal w-[50px]">
                                      Lihat Semua
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </SwiperSlide>
                          </Swiper>
                          <div
                            className={`bottom-0 fixed h-[calc(100%-0.3*100%)] md:h-[calc(100%-0.5*100%)] w-full ${
                              trailerextramobile
                                ? "detail-selected-bottom z-[7]"
                                : "detail-selected-bottom-hidden z-[-1]"
                            }`}
                          >
                            <div className="h-full left-0 absolute top-0 w-full z-[6] overflow-y-scroll">
                              <div className="items-center bg-pallete-4 flex flex-row justify-between left-0 py-3 px-4 sticky top-0 w-full z-[5]">
                                <h3 className="text-white text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap w-11/12">
                                  Trailer & Extra
                                </h3>
                                <button
                                  type="button"
                                  className="w-6 h-6 text-white"
                                  onClick={() =>
                                    setTrailerExtraMobile((current) => !current)
                                  }
                                >
                                  <XMarkIcon></XMarkIcon>
                                </button>
                              </div>
                              <div className="bg-pallete-5 h-100% overflow-y-scroll">
                                <div>
                                  <ul>
                                    <li className="my-2">
                                      <a href="" className="block">
                                        <div className="flex items-center py-2 px-4">
                                          <div className="flex-[0_0_auto] mr-4 w-36">
                                            <div className="bg-black/50 rounded-lg overflow-hidden pb-[56%] relative">
                                              <Image
                                                src={trailer}
                                                alt="Picture of the author"
                                                className="h-full left-0 top-0 overflow-hidden absolute w-full"
                                                width={600}
                                                height={360}
                                              />
                                              <span className="bg-black/50 rounded bottom-[7px] text-white text-[10px] font-medium py-[2px] px-[5px] absolute right-[7px]">
                                                00:45
                                              </span>
                                            </div>
                                          </div>
                                          <div>
                                            <h3 className="line-clamp-2 text-white text-sm font-normal overflow-hidden text-ellipsis whitespace-normal">
                                              Merajut Dendam - Vidio Original
                                              Series | Official Teaser
                                            </h3>
                                          </div>
                                        </div>
                                      </a>
                                    </li>
                                    <li className="my-2">
                                      <a href="" className="block">
                                        <div className="flex items-center py-2 px-4">
                                          <div className="flex-[0_0_auto] mr-4 w-36">
                                            <div className="bg-black/50 rounded-lg overflow-hidden pb-[56%] relative">
                                              <Image
                                                src={trailer}
                                                alt="Picture of the author"
                                                className="h-full left-0 top-0 overflow-hidden absolute w-full"
                                                width={600}
                                                height={360}
                                              />
                                              <span className="bg-black/50 rounded bottom-[7px] text-white text-[10px] font-medium py-[2px] px-[5px] absolute right-[7px]">
                                                00:45
                                              </span>
                                            </div>
                                          </div>
                                          <div>
                                            <h3 className="line-clamp-2 text-white text-sm font-normal overflow-hidden text-ellipsis whitespace-normal">
                                              Merajut Dendam - Vidio Original
                                              Series | Official Teaser
                                            </h3>
                                          </div>
                                        </div>
                                      </a>
                                    </li>
                                    <li className="my-2">
                                      <a href="" className="block">
                                        <div className="flex items-center py-2 px-4">
                                          <div className="flex-[0_0_auto] mr-4 w-36">
                                            <div className="bg-black/50 rounded-lg overflow-hidden pb-[56%] relative">
                                              <Image
                                                src={trailer}
                                                alt="Picture of the author"
                                                className="h-full left-0 top-0 overflow-hidden absolute w-full"
                                                width={600}
                                                height={360}
                                              />
                                              <span className="bg-black/50 rounded bottom-[7px] text-white text-[10px] font-medium py-[2px] px-[5px] absolute right-[7px]">
                                                00:45
                                              </span>
                                            </div>
                                          </div>
                                          <div>
                                            <h3 className="line-clamp-2 text-white text-sm font-normal overflow-hidden text-ellipsis whitespace-normal">
                                              Merajut Dendam - Vidio Original
                                              Series | Official Teaser
                                            </h3>
                                          </div>
                                        </div>
                                      </a>
                                    </li>
                                    <li className="my-2">
                                      <a href="" className="block">
                                        <div className="flex items-center py-2 px-4">
                                          <div className="flex-[0_0_auto] mr-4 w-36">
                                            <div className="bg-black/50 rounded-lg overflow-hidden pb-[56%] relative">
                                              <Image
                                                src={trailer}
                                                alt="Picture of the author"
                                                className="h-full left-0 top-0 overflow-hidden absolute w-full"
                                                width={600}
                                                height={360}
                                              />
                                              <span className="bg-black/50 rounded bottom-[7px] text-white text-[10px] font-medium py-[2px] px-[5px] absolute right-[7px]">
                                                00:45
                                              </span>
                                            </div>
                                          </div>
                                          <div>
                                            <h3 className="line-clamp-2 text-white text-sm font-normal overflow-hidden text-ellipsis whitespace-normal">
                                              Merajut Dendam - Vidio Original
                                              Series | Official Teaser
                                            </h3>
                                          </div>
                                        </div>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="my-6">
                          <div>
                            <div className="flex items-center justify-between mx-4 mb-[10px] relative">
                              <h3 className="line-clamp-1 text-base font-semibold text-ellipsis whitespace-normal">
                                Rekomendasi yang Serupa
                              </h3>
                            </div>
                          </div>
                          <div>
                            <ul className="grid grid-cols-3 md:grid-cols-5 gap-4 mx-4">
                              <li className="max-w-full overflow-hidden">
                                <div className="h-full w-full text-center">
                                  <a href="#">
                                    <div className="bg-pallete-2/20 rounded-lg relative">
                                      <Image
                                        src={similar}
                                        alt="Picture of the author"
                                        className="h-auto w-full flex items-center text-sm rounded-lg"
                                        width={112}
                                        height={162}
                                      />
                                    </div>
                                  </a>
                                </div>
                              </li>
                              <li className="max-w-full overflow-hidden">
                                <div className="h-full w-full text-center">
                                  <a href="#">
                                    <div className="bg-pallete-2/20 rounded-lg relative">
                                      <Image
                                        src={similar}
                                        alt="Picture of the author"
                                        className="h-auto w-full flex items-center text-sm rounded-lg"
                                        width={112}
                                        height={162}
                                      />
                                    </div>
                                  </a>
                                </div>
                              </li>
                              <li className="max-w-full overflow-hidden">
                                <div className="h-full w-full text-center">
                                  <a href="#">
                                    <div className="bg-pallete-2/20 rounded-lg relative">
                                      <Image
                                        src={similar}
                                        alt="Picture of the author"
                                        className="h-auto w-full flex items-center text-sm rounded-lg"
                                        width={112}
                                        height={162}
                                      />
                                    </div>
                                  </a>
                                </div>
                              </li>
                              <li className="max-w-full overflow-hidden">
                                <div className="h-full w-full text-center">
                                  <a href="#">
                                    <div className="bg-pallete-2/20 rounded-lg relative">
                                      <Image
                                        src={similar}
                                        alt="Picture of the author"
                                        className="h-auto w-full flex items-center text-sm rounded-lg"
                                        width={112}
                                        height={162}
                                      />
                                    </div>
                                  </a>
                                </div>
                              </li>
                              <li className="max-w-full overflow-hidden">
                                <div className="h-full w-full text-center">
                                  <a href="#">
                                    <div className="bg-pallete-2/20 rounded-lg relative">
                                      <Image
                                        src={similar}
                                        alt="Picture of the author"
                                        className="h-auto w-full flex items-center text-sm rounded-lg"
                                        width={112}
                                        height={162}
                                      />
                                    </div>
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-0 mx-auto mt-12 before:content-[''] before:table">
                  <main className="justify-between mx-auto lg:max-w-[1012px] xl:max-w-[1360px] lg:w-[1012px] xl:w-[1360px] grid gap-x-8 py-6 grid-rows-2 grid-flow-col lg:h-[calc(100vh--25rem)] xl:h-[calc(100vh--35rem)] 2xl:h-[calc(100vh--30rem)] 3xl:h-[calc(100vh--20rem)]">
                    <div className="lg:min-h-[459px] xl:min-h-[569px] lg:w-[698px] xl:w-[1012px] bg-black/40 block lg:h-[331px] xl:h-[441px] overflow-hidden relative">
                      <VideoPlayer options={VIDEOJS_OPTIONS} />
                    </div>
                    <div className="lg:w-[698px] xl:w-[1012px]">
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
                                Rasya Perdana, pengacara handal dari keluarga
                                terpandang yang tersandung kasus video
                                perselingkuhannya. Siapa dalang dibalik
                                penyebaran video itu?
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
                                    Nonton Lebih Cepat Episode 4 & 5 dengan
                                    Vidio Express!
                                  </div>
                                </div>
                              </div>
                              <article className="mt-4 text-gray-200 text-base font-normal">
                                <p className="mt-0 text-sm font-normal mb-3">
                                  Nina memiliki segalanya; suami yang mapan dan
                                  keluarga yang sempurna. Semua berubah ketika
                                  suaminya, Rasya, dituduh sebagai tersangka
                                  kasus pencabulan.
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
                                  <div className="mt-2">
                                    <h3 className="group-hover:underline font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                                      Merajut Dendam - Vidio Original Series |
                                      Official Teaser
                                    </h3>
                                  </div>
                                </a>
                              </SwiperSlide>
                              <SwiperSlide className="rounded-lg relative align-top">
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
                                  <div className="mt-2">
                                    <h3 className="group-hover:underline font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                                      Merajut Dendam - Vidio Original Series |
                                      Official Teaser
                                    </h3>
                                  </div>
                                </a>
                              </SwiperSlide>
                              <SwiperSlide className="rounded-lg relative align-top">
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
                                  <div className="mt-2">
                                    <h3 className="group-hover:underline font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                                      Merajut Dendam - Vidio Original Series |
                                      Official Teaser
                                    </h3>
                                  </div>
                                </a>
                              </SwiperSlide>
                              <SwiperSlide className="rounded-lg relative align-top">
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
                                  <div className="mt-2">
                                    <h3 className="group-hover:underline font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                                      Merajut Dendam - Vidio Original Series |
                                      Official Teaser
                                    </h3>
                                  </div>
                                </a>
                              </SwiperSlide>
                              <SwiperSlide className="rounded-lg relative align-top">
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
                                  <div className="mt-2">
                                    <h3 className="group-hover:underline font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                                      Merajut Dendam - Vidio Original Series |
                                      Official Teaser
                                    </h3>
                                  </div>
                                </a>
                              </SwiperSlide>
                              <SwiperSlide className="rounded-lg relative align-top">
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
                                  <div className="mt-2">
                                    <h3 className="group-hover:underline font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                                      Merajut Dendam - Vidio Original Series |
                                      Official Teaser
                                    </h3>
                                  </div>
                                </a>
                              </SwiperSlide>
                              <SwiperSlide className="rounded-lg relative align-top">
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
                                  <div className="mt-2">
                                    <h3 className="group-hover:underline font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                                      Merajut Dendam - Vidio Original Series |
                                      Official Teaser
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
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry&apos;s standard
                                    dummy text ever since the 1500s, when an
                                    unknown printer took a galley of type and
                                    scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but
                                    also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was
                                    popularised in the 1960s with the release of
                                    Letraset sheets containing Lorem Ipsum
                                    passages, and more recently with desktop
                                    publishing software like Aldus PageMaker
                                    including versions of Lorem Ipsum.
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
                                        fillRule="evenodd"
                                        d="M12 2a2.275 2.275 0 1 0 0 4.55A2.275 2.275 0 0 0 12 2Zm0 15.45A2.275 2.275 0 1 0 12 22a2.275 2.275 0 0 0 0-4.55ZM9.725 12a2.275 2.275 0 1 1 4.55 0 2.275 2.275 0 0 1-4.55 0Z"
                                        clipRule="evenodd"
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
                    <div className="lg:w-[284px] xl:w-[316px] lg:min-h-[459px] xl:min-h-[569px] inline-block">
                      <section className="lg:mb-4 xl:my-4 rounded overflow-y-scroll lg:h-[460px] xl:h-[570px] no-scrollbar">
                        <div className="p-4">
                          <span className="rounded-lg inline-block text-sm py-3 px-4 border border-solid border-gray-300 text-gray-100 font-semibold">
                            Season
                          </span>
                        </div>
                        <ul className="flex flex-col relative">
                          <li>
                            <div className="bg-pallete-2/20 py-3 px-4">
                              <a href="#" className="group flex items-center">
                                <div className="h-16 w-32 rounded-lg overflow-hidden relative align-top z-[1]">
                                  <Image
                                    src={episode}
                                    alt="Picture of the author"
                                    className="object-cover object-center aspect-[16/9]"
                                  />
                                  <div className="absolute bottom-1 left-0">
                                    <span className="text-[8px] py-[3px] px-[6px] bg-gray-50 border border-solid border-gray-300 rounded text-gray-900 font-medium mb-1 ml-1">
                                      GRATIS
                                    </span>
                                  </div>
                                  <div className="absolute bottom-1 right-2">
                                    <time className="text-[10px] font-normal py-[1px] px-[2px] bg-black/60 rounded text-white text-center">
                                      43:35
                                    </time>
                                  </div>
                                </div>
                                <div className="flex-[1_1] ml-2">
                                  <h3 className="line-clamp-2 max-h-[36px] break-words text-sm font-semibold text-gray-100 group-hover:text-blue-700">
                                    Ep 01 - Harta, Tahta, Wanita
                                  </h3>
                                </div>
                              </a>
                            </div>
                          </li>
                          <li>
                            <div className="bg-pallete-2/20 py-3 px-4">
                              <a href="#" className="group flex items-center">
                                <div className="h-16 w-32 rounded-lg overflow-hidden relative align-top z-[1]">
                                  <Image
                                    src={episode}
                                    alt="Picture of the author"
                                    className="object-cover object-center aspect-[16/9]"
                                  />
                                  <div className="absolute bottom-1 left-0">
                                    <span className="text-[8px] py-[3px] px-[6px] bg-gray-50 border border-solid border-gray-300 rounded text-gray-900 font-medium mb-1 ml-1">
                                      GRATIS
                                    </span>
                                  </div>
                                  <div className="absolute bottom-1 right-2">
                                    <time className="text-[10px] font-normal py-[1px] px-[2px] bg-black/60 rounded text-white text-center">
                                      43:35
                                    </time>
                                  </div>
                                </div>
                                <div className="flex-[1_1] ml-2">
                                  <h3 className="line-clamp-2 max-h-[36px] break-words text-sm font-semibold text-gray-100 group-hover:text-blue-700">
                                    Ep 01 - Harta, Tahta, Wanita
                                  </h3>
                                </div>
                              </a>
                            </div>
                          </li>
                          <li>
                            <div className="bg-pallete-2/20 py-3 px-4">
                              <a href="#" className="group flex items-center">
                                <div className="h-16 w-32 rounded-lg overflow-hidden relative align-top z-[1]">
                                  <Image
                                    src={episode}
                                    alt="Picture of the author"
                                    className="object-cover object-center aspect-[16/9]"
                                  />
                                  <div className="absolute bottom-1 left-0">
                                    <span className="text-[8px] py-[3px] px-[6px] bg-gray-50 border border-solid border-gray-300 rounded text-gray-900 font-medium mb-1 ml-1">
                                      GRATIS
                                    </span>
                                  </div>
                                  <div className="absolute bottom-1 right-2">
                                    <time className="text-[10px] font-normal py-[1px] px-[2px] bg-black/60 rounded text-white text-center">
                                      43:35
                                    </time>
                                  </div>
                                </div>
                                <div className="flex-[1_1] ml-2">
                                  <h3 className="line-clamp-2 max-h-[36px] break-words text-sm font-semibold text-gray-100 group-hover:text-blue-700">
                                    Ep 01 - Harta, Tahta, Wanita
                                  </h3>
                                </div>
                              </a>
                            </div>
                          </li>
                          <li>
                            <div className="bg-pallete-2/20 py-3 px-4">
                              <a href="#" className="group flex items-center">
                                <div className="h-16 w-32 rounded-lg overflow-hidden relative align-top z-[1]">
                                  <Image
                                    src={episode}
                                    alt="Picture of the author"
                                    className="object-cover object-center aspect-[16/9]"
                                  />
                                  <div className="absolute bottom-1 left-0">
                                    <span className="text-[8px] py-[3px] px-[6px] bg-gray-50 border border-solid border-gray-300 rounded text-gray-900 font-medium mb-1 ml-1">
                                      GRATIS
                                    </span>
                                  </div>
                                  <div className="absolute bottom-1 right-2">
                                    <time className="text-[10px] font-normal py-[1px] px-[2px] bg-black/60 rounded text-white text-center">
                                      43:35
                                    </time>
                                  </div>
                                </div>
                                <div className="flex-[1_1] ml-2">
                                  <h3 className="line-clamp-2 max-h-[36px] break-words text-sm font-semibold text-gray-100 group-hover:text-blue-700">
                                    Ep 01 - Harta, Tahta, Wanita
                                  </h3>
                                </div>
                              </a>
                            </div>
                          </li>
                          <li>
                            <div className="bg-pallete-2/20 py-3 px-4">
                              <a href="#" className="group flex items-center">
                                <div className="h-16 w-32 rounded-lg overflow-hidden relative align-top z-[1]">
                                  <Image
                                    src={episode}
                                    alt="Picture of the author"
                                    className="object-cover object-center aspect-[16/9]"
                                  />
                                  <div className="absolute bottom-1 left-0">
                                    <span className="text-[8px] py-[3px] px-[6px] bg-gray-50 border border-solid border-gray-300 rounded text-gray-900 font-medium mb-1 ml-1">
                                      GRATIS
                                    </span>
                                  </div>
                                  <div className="absolute bottom-1 right-2">
                                    <time className="text-[10px] font-normal py-[1px] px-[2px] bg-black/60 rounded text-white text-center">
                                      43:35
                                    </time>
                                  </div>
                                </div>
                                <div className="flex-[1_1] ml-2">
                                  <h3 className="line-clamp-2 max-h-[36px] break-words text-sm font-semibold text-gray-100 group-hover:text-blue-700">
                                    Ep 01 - Harta, Tahta, Wanita
                                  </h3>
                                </div>
                              </a>
                            </div>
                          </li>
                          <li>
                            <div className="bg-pallete-2/20 py-3 px-4">
                              <a href="#" className="group flex items-center">
                                <div className="h-16 w-32 rounded-lg overflow-hidden relative align-top z-[1]">
                                  <Image
                                    src={episode}
                                    alt="Picture of the author"
                                    className="object-cover object-center aspect-[16/9]"
                                  />
                                  <div className="absolute bottom-1 left-0">
                                    <span className="text-[8px] py-[3px] px-[6px] bg-gray-50 border border-solid border-gray-300 rounded text-gray-900 font-medium mb-1 ml-1">
                                      GRATIS
                                    </span>
                                  </div>
                                  <div className="absolute bottom-1 right-2">
                                    <time className="text-[10px] font-normal py-[1px] px-[2px] bg-black/60 rounded text-white text-center">
                                      43:35
                                    </time>
                                  </div>
                                </div>
                                <div className="flex-[1_1] ml-2">
                                  <h3 className="line-clamp-2 max-h-[36px] break-words text-sm font-semibold text-gray-100 group-hover:text-blue-700">
                                    Ep 01 - Harta, Tahta, Wanita
                                  </h3>
                                </div>
                              </a>
                            </div>
                          </li>
                          <li>
                            <div className="bg-pallete-2/20 py-3 px-4">
                              <a href="#" className="group flex items-center">
                                <div className="h-16 w-32 rounded-lg overflow-hidden relative align-top z-[1]">
                                  <Image
                                    src={episode}
                                    alt="Picture of the author"
                                    className="object-cover object-center aspect-[16/9]"
                                  />
                                  <div className="absolute bottom-1 left-0">
                                    <span className="text-[8px] py-[3px] px-[6px] bg-gray-50 border border-solid border-gray-300 rounded text-gray-900 font-medium mb-1 ml-1">
                                      GRATIS
                                    </span>
                                  </div>
                                  <div className="absolute bottom-1 right-2">
                                    <time className="text-[10px] font-normal py-[1px] px-[2px] bg-black/60 rounded text-white text-center">
                                      43:35
                                    </time>
                                  </div>
                                </div>
                                <div className="flex-[1_1] ml-2">
                                  <h3 className="line-clamp-2 max-h-[36px] break-words text-sm font-semibold text-gray-100 group-hover:text-blue-700">
                                    Ep 01 - Harta, Tahta, Wanita
                                  </h3>
                                </div>
                              </a>
                            </div>
                          </li>
                        </ul>
                      </section>
                    </div>
                    <div className="lg:w-[284px] xl:w-[316px] inline-block">
                      <section className="mb-8 mt-4">
                        <div className="mb-4 flex items-center justify-between relative">
                          <h3 className="text-xl font-bold line-clamp-1 text-gray-100 text-ellipsis whitespace-normal">
                            Rekomendasi yang Serupa
                          </h3>
                        </div>
                        <div>
                          <ul className="grid grid-cols-3 gap-4">
                            <li className="max-w-full overflow-hidden">
                              <div className="h-full w-full text-center">
                                <a href="#">
                                  <div className="bg-pallete-2/20 rounded-lg relative">
                                    <Image
                                      src={similar}
                                      alt="Picture of the author"
                                      className="h-auto w-full flex items-center text-sm rounded-lg"
                                      width={112}
                                      height={162}
                                    />
                                  </div>
                                </a>
                              </div>
                            </li>
                            <li className="max-w-full overflow-hidden">
                              <div className="h-full w-full text-center">
                                <a href="#">
                                  <div className="bg-pallete-2/20 rounded-lg relative">
                                    <Image
                                      src={similar}
                                      alt="Picture of the author"
                                      className="h-auto w-full flex items-center text-sm rounded-lg"
                                      width={112}
                                      height={162}
                                    />
                                  </div>
                                </a>
                              </div>
                            </li>
                            <li className="max-w-full overflow-hidden">
                              <div className="h-full w-full text-center">
                                <a href="#">
                                  <div className="bg-pallete-2/20 rounded-lg relative">
                                    <Image
                                      src={similar}
                                      alt="Picture of the author"
                                      className="h-auto w-full flex items-center text-sm rounded-lg"
                                      width={112}
                                      height={162}
                                    />
                                  </div>
                                </a>
                              </div>
                            </li>
                            <li className="max-w-full overflow-hidden">
                              <div className="h-full w-full text-center">
                                <a href="#">
                                  <div className="bg-pallete-2/20 rounded-lg relative">
                                    <Image
                                      src={similar}
                                      alt="Picture of the author"
                                      className="h-auto w-full flex items-center text-sm rounded-lg"
                                      width={112}
                                      height={162}
                                    />
                                  </div>
                                </a>
                              </div>
                            </li>
                            <li className="max-w-full overflow-hidden">
                              <div className="h-full w-full text-center">
                                <a href="#">
                                  <div className="bg-pallete-2/20 rounded-lg relative">
                                    <Image
                                      src={similar}
                                      alt="Picture of the author"
                                      className="h-auto w-full flex items-center text-sm rounded-lg"
                                      width={112}
                                      height={162}
                                    />
                                  </div>
                                </a>
                              </div>
                            </li>
                            <li className="max-w-full overflow-hidden">
                              <div className="h-full w-full text-center">
                                <a href="#">
                                  <div className="bg-pallete-2/20 rounded-lg relative">
                                    <Image
                                      src={similar}
                                      alt="Picture of the author"
                                      className="h-auto w-full flex items-center text-sm rounded-lg"
                                      width={112}
                                      height={162}
                                    />
                                  </div>
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </section>
                    </div>
                  </main>
                </div>
              )
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

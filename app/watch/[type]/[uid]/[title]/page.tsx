"use client";

import React, { Fragment, useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar/navbar";
import VideoPlayer from "./components/video-player";
import crown from "../../../../../public/crown.png";
import Image from "next/image";
import {
  BookmarkIcon,
  ShareIcon,
  ChevronDownIcon,
  XMarkIcon,
  ArrowLeftIcon,
  BookmarkSquareIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { notFound, useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "@/components/Loading/loading";
import NavbarBottomMobile from "@/components/Navbar/navbar-bottom-mobile";
import { analytics } from "@/lib/firebase";

const filtercomment = [
  { id: 1, name: "Terlama ke Terbaru" },
  { id: 2, name: "Terbaru ke Terlama" },
];

export default function Page() {
  const router = useRouter();
  const params = useParams<{ type: string; uid: string; title: string }>();

  const [datauser, setDataUser] = useState<any[]>([]);
  const [bucketdatasimilar, setBucketDataSimilar] = useState<any[]>([]);
  const [bucketdatamovies, setBucketDataMovies] = useState<any[]>([]);
  const [bucketdataseries, setBucketDataSeries] = useState<any[]>([]);
  const [bucketdataepisode, setBucketDataEpisode] = useState<any[]>([]);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [devicemobile, setDeviceMobile] = useState<boolean>(false);
  const [selectedfiltercomment, setSelectedFilterComment] = useState(
    filtercomment[0]
  );
  const [statuswatchlist, setStatusWatchlist] = useState<boolean>(false);
  const [valuecomment, setValueComment] = useState("");
  const [infomobile, setInfoMobile] = useState<boolean>(false);
  const [commentmobile, setCommentMobile] = useState<boolean>(false);
  const [trailerextramobile, setTrailerExtraMobile] = useState<boolean>(false);
  const [heightcurtain, setHeightCurtain] = useState<string>("100vh");
  const [detailvideo, setDetailVideo] = useState<boolean>(false);
  const [statemodal, setStateModal] = useState(false);
  const [successcopy, setSuccessCopy] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const curtaincontentRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const VIDEOJS_OPTIONS = {
    playbackRates: [0.5, 1, 1.5, 2],
    preload: "auto",
    controlBar: {
      skipButtons: {
        backward: 10,
        forward: 10,
      },
      remainingTimeDisplay: {
        displayNegative: false,
      },
      pictureInPictureToggle: false,
    },
    preferFullWindow: true,
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src:
          params.type == "series" && bucketdataepisode.length != 0
            ? bucketdataepisode.find((obj) => obj.id_doc === params.title)
                .video_main
            : params.type == "trailer-series" && bucketdataseries.length != 0
            ? bucketdataseries
                .map(({ video_trailer }) => video_trailer)
                .toLocaleString()
            : params.type == "movies"
            ? bucketdatamovies
                .map(({ video_main }) => video_main)
                .toLocaleString()
            : params.type == "trailer-movies"
            ? bucketdatamovies
                .map(({ video_trailer }) => video_trailer)
                .toLocaleString()
            : "",
        type: "application/x-mpegURL",
        withCredentials: false,
      },
    ],
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/user/", {
          method: "GET",
        });

        const userData = await response.json();
        setDataUser(userData.user);
      } catch (error: any) {
        console.error("Error generating metadata:", error.message);
      }
    };

    const fetchDataMovies = async () => {
      try {
        await fetch(
          `https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/data/video/movies/${params.uid}`,
          {
            method: "GET",
          }
        ).then(async (response) => {
          const data = await response.json();
          if (response.status != 200) {
            // console.error(response);
          } else {
            setBucketDataMovies([data.movies_data]);
          }
        });
      } catch (error: any) {
        throw new Error(error.messages);
      }
    };

    const fetchDataSeries = async () => {
      try {
        await fetch(
          `https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/data/video/series/${params.uid}`,
          {
            method: "GET",
          }
        ).then(async (response) => {
          const data = await response.json();
          if (response.status != 200) {
            // console.error(response);
          } else {
            setPageLoaded(true);
            setBucketDataSeries([data.series_data]);
            setBucketDataEpisode(() =>
              [...data.episode_data].sort(
                (a, b) =>
                  a.create_at.seconds - b.create_at.seconds ||
                  a.create_at.nanoseconds - b.create_at.nanoseconds
              )
            );
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataSimilar = async () => {
      try {
        await fetch(`https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/data/video/series`, {
          method: "GET",
        }).then(async (response) => {
          const data = await response.json();
          if (response.status != 200) {
            // console.error(response);
          } else {
            setBucketDataSimilar(
              data.bucketdata
                .filter((item: any) => {
                  return (
                    item.status !== "incomplete" &&
                    item.genre.value ===
                      bucketdataseries
                        .map((item: any) => item.genre.value)
                        .toLocaleString() &&
                    item.id_doc !== params.uid
                  );
                })
                .slice(0, 15)
                .sort(
                  (a: any, b: any) =>
                    a.create_at.seconds - b.create_at.seconds ||
                    a.create_at.nanoseconds - b.create_at.nanoseconds
                )
            );
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataWishlist = async () => {
      try {
        await fetch(`https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/user/watchlist/GET`, {
          method: "GET",
        }).then(async (response) => {
          const data = await response.json();
          if (response.status != 200) {
            // console.error(response);
          } else {
            setStatusWatchlist(
              data.userWatchlist.some((item: any) =>
                Object.values(item).some(
                  (value) =>
                    typeof value === "string" && value.includes(params.uid)
                )
              )
            );
          }
        });
      } catch (error: any) {
        throw new Error(error.messages);
      }
    };

    fetchUserData();

    if (datauser.length !== 0) {
      fetchDataWishlist();
    }

    if (params.type === "series" || params.type === "trailer-series") {
      fetchDataSeries();
    } else if (params.type === "movies" || params.type === "trailer-movies") {
      fetchDataMovies();
    } else {
      return notFound;
    }

    if (bucketdataseries.length != 0 || bucketdatamovies.length !== 0) {
      fetchDataSimilar();
    }
  }, [
    params.type,
    bucketdataseries.length,
    params.uid,
    bucketdataseries,
    bucketdatamovies.length,
    datauser.length,
  ]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      analytics;
      setTimeout(function () {
        // setToggleSkeleton(false);
      }, 2000);
      setPageLoaded(true);
      setCheckboxCurtain(true);
    }
  }, []);
  useEffect(() => {
    const changeHeightCurtain = () => {
      if (window.scrollY >= 80) {
        setHeightCurtain(
          `calc(${curtaincontentRef.current?.offsetHeight}px - 0rem)`
        );
      } else {
        setHeightCurtain("100vh");
      }
    };
    window.addEventListener("scroll", changeHeightCurtain);
    return () => window.removeEventListener("scroll", changeHeightCurtain);
  }, []);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setDeviceMobile(true);
    } else {
      setDeviceMobile(false);
    }
  }, []);

  const handleAddView = async () => {
    if (params.type !== "trailer-movies" && params.type !== "trailer-series") {
      try {
        await fetch(
          `https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/analytics/view?type=${
            params.type
          }&id_doc=${params.uid}${
            params.type === "series" ? `&title=${params.title}` : ""
          }`,
          {
            method: "PUT",
          }
        );
      } catch (error) {
        // console.error(error);
        toast.error("Error:" + error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const handleAddWatchlist = async () => {
    try {
      const response = await fetch(
        `https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/user/watchlist/POST?id_doc=${params.uid}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        movePageFunction("/user/sign_in");
      } else {
        toast.success("Berhasil ditambahkan ke daftar putar", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setStatusWatchlist(!statuswatchlist);
      }
    } catch (error) {
      // console.error(error);
      toast.error("Error:" + error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDeleteWatchlist = async () => {
    try {
      const response = await fetch(
        `https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/user/watchlist/DELETE?id_doc=${params.uid}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        movePageFunction("/user/sign_in");
      } else {
        toast.success("Dihapus dari daftar putar", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setStatusWatchlist(!statuswatchlist);
      }
    } catch (error) {
      // console.error(error);
      toast.error("Error:" + error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const toggleModal = () => {
    setStateModal((current) => !current);
    setSuccessCopy(false);
  };

  const handleShareFacebook = async () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      "https://luplay-web--lunarvisionapp.us-central1.hosted.app/watch/" +
        params.type +
        "/" +
        params.uid +
        "/" +
        params.title +
        "?utm_source=referral&utm_medium=share-facebook"
    )}&quote=${encodeURIComponent("")}`;
    window.open(facebookShareUrl, "_blank", "width=600,height=400");
  };

  const handleShareTwitter = async () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      "https://luplay-web--lunarvisionapp.us-central1.hosted.app/watch/" +
        params.type +
        "/" +
        params.uid +
        "/" +
        params.title +
        "?utm_source=referral&utm_medium=share-X"
    )}&text=${encodeURIComponent("")}`;
    window.open(twitterShareUrl, "_blank", "width=600,height=400");
  };

  const handleCopyClick = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      navigator.clipboard
        .writeText(textareaRef.current.value)
        .then(() => {
          setSuccessCopy(true);
        })
        .catch((err) => {
          console.error("Unable to copy text to clipboard", err);
        });
    }
  };

  const useAutosizeTextArea = (
    textAreaRef: HTMLTextAreaElement | null,
    value: string
  ) => {
    useEffect(() => {
      if (textAreaRef) {
        textAreaRef.style.height = "0px";
        const scrollHeight = textAreaRef.scrollHeight;

        textAreaRef.style.height = scrollHeight + "px";
      }
    }, [textAreaRef, value]);
  };
  useAutosizeTextArea(textAreaRef.current, valuecomment);
  const handleChangeComment = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValueComment(val);
  };

  const movePageFunction = (param: string) => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.push(param, { scroll: false }));
  };

  const previousPageFunction = () => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.back());
  };

  return (
    <>
      <header className="fixed z-50 w-full top-0 bg-black xl:bg-pallete-5  shadow-md hidden lg:block">
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
            className="curtain__panel curtain__panel--left"
            style={{ height: `${heightcurtain}` }}
          ></div>
          {!pageloaded ? <Loading></Loading> : <></>}
          {(params.type === "series" || params.type === "trailer-series"
            ? bucketdataseries
            : bucketdatamovies
          ).map((item: any, index: number) => (
            <div
              className="curtain__content"
              ref={curtaincontentRef}
              key={index}
            >
              {pageloaded ? (
                <>
                  {devicemobile ? (
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
                      <div className="fixed w-full left-1/2 -translate-x-1/2 z-[4] shadow-md">
                        <div
                          className="pt-[240px] md:pt-[42.6%] relative bg-black/50 bg-no-repeat bg-cover"
                          style={{
                            backgroundImage: `url(${item.image_trailer})`,
                          }}
                        >
                          <VideoPlayer
                            options={VIDEOJS_OPTIONS}
                            handleAddView={handleAddView}
                          />
                        </div>
                      </div>
                      <div className="pt-[240px] sm:pt-[56%]">
                        <div className="text-white mx-auto relative">
                          <div className="h-[calc(100%-0.3*100%)] relative overflow-y-scroll">
                            <section className="my-6">
                              <div className="mx-4">
                                <div className="flex justify-between w-full">
                                  <div>
                                    <span>
                                      <h1 className="line-clamp-2 text-white text-base font-semibold mb-[5px] text-ellipsis">
                                        {item.title}
                                      </h1>
                                    </span>
                                    <div className="line-clamp-2 text-gray-300 text-xs font-semibold mt-[3px] mb-2 text-ellipsis">
                                      {params.type == "series"
                                        ? bucketdataepisode.find(
                                            (obj: any) =>
                                              obj.id_doc === params.title
                                          ).title
                                        : item.title_trailer}
                                    </div>
                                    <div className="flex text-xs">
                                      <span className="border-r border-gray-300 px-2">
                                        <Image
                                          src={crown}
                                          className="w-4 h-4"
                                          alt="Picture of the author"
                                          width={16}
                                          height={16}
                                        />
                                      </span>
                                      {/* <span className="border-r-0 px-2">
                                      2023
                                    </span> */}
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
                                className={`bottom-0 bg-pallete-5 fixed h-[calc(100%-0.3*100%)] md:h-[calc(100%-0.5*100%)] w-full detail-selected-bottom ${
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
                                  <div className="h-100% overflow-y-scroll">
                                    <div className="p-4">
                                      <div className="text-base font-semibold mb-3">
                                        Sinopsis
                                      </div>
                                      {/* <div className="text-white text-sm font-semibold">
                                      {
                                        bucketdataepisode.find(
                                          (obj: any) =>
                                            obj.id_doc === params.title
                                        ).title
                                      }
                                    </div> */}
                                      <div className="text-gray-300 text-xs font-normal mt-2">
                                        <div className="overflow-hidden relative">
                                          <article>
                                            <p className="text-gray-300 text-xs font-normal">
                                              {params.type == "series"
                                                ? bucketdataepisode.find(
                                                    (obj: any) =>
                                                      obj.id_doc ===
                                                      params.title
                                                  ).synopsis
                                                : item.synopsis_trailer}
                                            </p>
                                          </article>
                                        </div>
                                      </div>
                                    </div>
                                    <hr className="border-b-[6px] border-b-gray-600 border-t-0 opacity-30" />
                                    <div className="mt-4 px-4">
                                      <div className="text-base font-semibold mb-3">
                                        Detail{" "}
                                        {params.type === "series" ||
                                        params.type === "trailer-series"
                                          ? "Serial"
                                          : "Film"}
                                      </div>
                                      <div className="flex items-center mb-4">
                                        <div className="mr-3 relative">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              movePageFunction(
                                                `/${params.type}/${params.uid}/${item.title}`
                                              )
                                            }
                                            className="overflow-hidden"
                                          >
                                            <picture>
                                              <Image
                                                src={
                                                  item.image_potrait_thumbnail
                                                }
                                                width={55}
                                                height={80}
                                                className="rounded-[4%] h-auto w-auto"
                                                alt={`${item.title_trailer}-potrait-thumbnails`}
                                              />
                                            </picture>
                                          </button>
                                        </div>
                                        <div className="items-center flex-[3_1]">
                                          <div className="flex justify-between w-full">
                                            <div>
                                              <span>
                                                <h1 className="text-sm mb-1 line-clamp-2 text-white font-semibold text-ellipsis">
                                                  {item.title}
                                                </h1>
                                              </span>
                                              <div className="text-xs flex">
                                                <span className="border-r border-r-gray-300 pr-2">
                                                  <Image
                                                    src={crown}
                                                    className="w-4 h-4"
                                                    alt="Picture of the author"
                                                    height={16}
                                                    width={16}
                                                  />
                                                </span>
                                                {/* <span className="border-r-0 px-2">
                                                2023
                                              </span> */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mb-4 text-gray-300 font-normal whitespace-pre-wrap break-words">
                                        {detailvideo ? (
                                          <div className="overflow-hidden relative">
                                            <article>
                                              <p className="text-gray-300 text-xs font-normal whitespace-pre-wrap break-words">
                                                {item.synopsis}
                                              </p>
                                            </article>
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                        <button
                                          onClick={() =>
                                            setDetailVideo(
                                              (current) => !current
                                            )
                                          }
                                          className="text-blue-600 font-semibold text-xs"
                                        >
                                          {detailvideo
                                            ? "Lebih Sedikit"
                                            : "Lebih Banyak"}
                                        </button>
                                      </div>
                                      <div>
                                        <div className="flex flex-wrap">
                                          <button
                                            type="button"
                                            className="mr-2 bg-pallete-3 rounded text-white block text-[10px] font-bold mb-2 py-[5px] px-2"
                                            onClick={() =>
                                              movePageFunction(
                                                `/categories/${params.type}/${item.genre.value}`
                                              )
                                            }
                                          >
                                            {item.genre.label}
                                          </button>
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
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (statuswatchlist) {
                                        handleDeleteWatchlist();
                                      } else {
                                        handleAddWatchlist();
                                      }
                                    }}
                                    className={`h-8 w-8 flex items-center justify-center ${
                                      statuswatchlist
                                        ? "text-pallete-4"
                                        : "text-white"
                                    }`}
                                  >
                                    {statuswatchlist ? (
                                      <BookmarkSquareIcon className="w-6 h-6"></BookmarkSquareIcon>
                                    ) : (
                                      <BookmarkIcon className="h-6 w-6"></BookmarkIcon>
                                    )}
                                  </button>
                                  <p className="text-white text-[10px] font-semibold text-center">
                                    Daftarku
                                  </p>
                                </li>
                                {/* <li className="flex items-center justify-center flex-col min-w-[60px]">
                                <button
                                  type="button"
                                  className="h-8 w-8 flex items-center justify-center text-white"
                                  onClick={() =>
                                    setCommentMobile((current) => !current)
                                  }
                                >
                                  <ChatBubbleBottomCenterTextIcon className="h-6 w-6"></ChatBubbleBottomCenterTextIcon>
                                </button>
                                <p className="text-white text-[10px] font-semibold text-center">
                                  Komentar
                                </p>
                                <div
                                  className={`bottom-0 bg-pallete-5 fixed h-[calc(100%-0.3*100%)] md:h-[calc(100%-0.5*100%)] w-full left-0 ${
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
                                    <div className="h-100% overflow-y-scroll">
                                      <div className="flex justify-between pt-4 px-4">
                                        <span className="text-gray-300 text-xs font-normal">
                                          1 Komentar
                                        </span>
                                      </div>
                                      <ul className="py-2 px-4">
                                        <li className="border-b border-gray-600 py-2 flex">
                                          <a href="">
                                            <div className="flex items-center border bg-pallete-3 border-gray-600 rounded-full h-8 justify-center min-w-[32px] overflow-hidden align-middle text-white">
                                              JD
                                            </div>
                                          </a>
                                          <div className="ml-4 w-[calc(100%-40px)]">
                                            <a
                                              href=""
                                              className="flex w-full items-center"
                                            >
                                              <span className="text-gray-300 text-[13px] font-semibold max-w-[27vw] overflow-hidden text-ellipsis whitespace-nowrap">
                                                John Doe
                                              </span>
                                              <span className="text-xs text-gray-300 whitespace-nowrap before:content-['•'] before:mx-1 ">
                                                8 jam yang lalu
                                              </span>
                                            </a>
                                            <div className="my-1">
                                              <div className="overflow-hidden relative">
                                                <p className="mt-0 break-words text-white text-sm font-normal my-1 whitespace-break-spaces">
                                                  Lorem Ipsum is simply dummy
                                                  text of the printing and
                                                  typesetting industry. Lorem
                                                  Ipsum has been the
                                                  industry&apos;s standard dummy
                                                  text ever since the 1500s,
                                                  when an unknown printer took a
                                                  galley of type and scrambled
                                                  it to make a type specimen
                                                  book. It has survived not only
                                                  five centuries, but also the
                                                  leap into electronic
                                                  typesetting, remaining
                                                  essentially unchanged. It was
                                                  popularised in the 1960s with
                                                  the release of Letraset sheets
                                                  containing Lorem Ipsum
                                                  passages, and more recently
                                                  with desktop publishing
                                                  software like Aldus PageMaker
                                                  including versions of Lorem
                                                  Ipsum.
                                                </p>
                                              </div>
                                            </div>
                                            <div className="flex items-center justify-between my-4">
                                              <button
                                                type="button"
                                                className="flex items-baseline bg-transparent text-gray-300 text-sm font-semibold w-fit"
                                              >
                                                <HeartIcon className="h-3 w-3 mr-1"></HeartIcon>
                                                1 Suka
                                              </button>
                                              <button
                                                type="button"
                                                className="flex items-baseline bg-transparent text-gray-300 text-sm font-semibold w-fit ml-5"
                                              >
                                                Balas
                                              </button>
                                              <div className="grow flex flex-row justify-end">
                                                <FlagIcon className="h-3 w-3"></FlagIcon>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li className="border-b border-gray-600 py-2 flex">
                                          <a href="">
                                            <div className="flex items-center border bg-pallete-3 border-gray-600 rounded-full h-8 justify-center min-w-[32px] overflow-hidden align-middle text-white">
                                              JD
                                            </div>
                                          </a>
                                          <div className="ml-4 w-[calc(100%-40px)]">
                                            <a
                                              href=""
                                              className="flex w-full items-center"
                                            >
                                              <span className="text-gray-300 text-[13px] font-semibold max-w-[27vw] overflow-hidden text-ellipsis whitespace-nowrap">
                                                John Doe
                                              </span>
                                              <span className="text-xs text-gray-300 whitespace-nowrap before:content-['•'] before:mx-1 ">
                                                8 jam yang lalu
                                              </span>
                                            </a>
                                            <div className="my-1">
                                              <div className="overflow-hidden relative">
                                                <p className="mt-0 break-words text-white text-sm font-normal my-1 whitespace-break-spaces">
                                                  Lorem Ipsum is simply dummy
                                                  text of the printing and
                                                  typesetting industry. Lorem
                                                  Ipsum has been the
                                                  industry&apos;s standard dummy
                                                  text ever since the 1500s,
                                                  when an unknown printer took a
                                                  galley of type and scrambled
                                                  it to make a type specimen
                                                  book. It has survived not only
                                                  five centuries, but also the
                                                  leap into electronic
                                                  typesetting, remaining
                                                  essentially unchanged. It was
                                                  popularised in the 1960s with
                                                  the release of Letraset sheets
                                                  containing Lorem Ipsum
                                                  passages, and more recently
                                                  with desktop publishing
                                                  software like Aldus PageMaker
                                                  including versions of Lorem
                                                  Ipsum.
                                                </p>
                                              </div>
                                            </div>
                                            <div className="flex items-center justify-between my-4">
                                              <button
                                                type="button"
                                                className="flex items-baseline bg-transparent text-gray-300 text-sm font-semibold w-fit"
                                              >
                                                <HeartIcon className="h-3 w-3 mr-1"></HeartIcon>
                                                1 Suka
                                              </button>
                                              <button
                                                type="button"
                                                className="flex items-baseline bg-transparent text-gray-300 text-sm font-semibold w-fit ml-5"
                                              >
                                                Balas
                                              </button>
                                              <div className="grow flex flex-row justify-end">
                                                <FlagIcon className="h-3 w-3"></FlagIcon>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="flex items-start bg-pallete-4 border-t border-pallete-3 bottom-0 h-fit fixed w-full">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        preserveAspectRatio="none"
                                        viewBox="0 0 32 32"
                                        width="32"
                                        height="32"
                                        className="mt-auto mr-2 mb-2 ml-4"
                                      >
                                        <circle
                                          cx="16"
                                          cy="16"
                                          r="15.5"
                                          fill="url(#avatar-default_svg__a)"
                                          stroke="#EEE"
                                        ></circle>
                                        <mask
                                          id="avatar-default_svg__b"
                                          x="0"
                                          y="0"
                                          maskUnits="userSpaceOnUse"
                                          style={{ maskType: "alpha" }}
                                        >
                                          <circle
                                            cx="16"
                                            cy="16"
                                            r="15.5"
                                            fill="#fff"
                                            stroke="#fff"
                                          ></circle>
                                        </mask>
                                        <path
                                          fill="#fff"
                                          fillRule="evenodd"
                                          d="M16 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 1.333c3.682 0 6.667 2.11 6.667 4.714 0 2.604-13.334 2.604-13.334 0 0-2.603 2.985-4.714 6.667-4.714Z"
                                          clipRule="evenodd"
                                        ></path>
                                        <defs>
                                          <linearGradient
                                            id="avatar-default_svg__a"
                                            x1="0"
                                            x2="0"
                                            y1="0"
                                            y2="32"
                                            gradientUnits="userSpaceOnUse"
                                          >
                                            <stop stopColor="#E8EAF4"></stop>
                                            <stop
                                              offset="1"
                                              stopColor="#CACEDE"
                                            ></stop>
                                          </linearGradient>
                                        </defs>
                                      </svg>
                                      <textarea className="w-[calc(100%-116px)] bg-pallete-2 rounded-2xl text-white my-2 py-[6px] px-4 resize-none align-middle overflow-auto outline-none text-sm"></textarea>
                                      <button className="bg-pallete-5 rounded-full text-white h-9 mt-auto mr-4 mb-2 ml-2 w-9 flex justify-center items-center">
                                        <PaperAirplaneIcon className="w-[18px] h-[18px]"></PaperAirplaneIcon>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li> */}
                                <li className="flex items-center justify-center flex-col min-w-[60px]">
                                  <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="h-8 w-8 flex items-center justify-cente text-white"
                                  >
                                    <ShareIcon className="h-6 w-6"></ShareIcon>
                                  </button>
                                  <p className="text-white text-[10px] font-semibold text-center">
                                    Bagikan
                                  </p>
                                </li>
                              </ul>
                            </section>
                            {params.type === "series" ||
                            params.type === "trailer-series" ? (
                              <section className="my-6">
                                <div className="flex items-center justify-between mx-4 mb-[10px] relative">
                                  <span className="p-2 border border-gray-300 rounded text-white text-xs font-semibold">
                                    Episode
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
                                  {bucketdataepisode.map(
                                    (item: any, index: number) => (
                                      <SwiperSlide
                                        className="rounded-lg relative align-top"
                                        key={index}
                                      >
                                        <div
                                          onClick={() => {
                                            params.type == "trailer-series"
                                              ? movePageFunction(
                                                  `/watch/series/${params.uid}/${item.id_doc}`
                                                )
                                              : movePageFunction(
                                                  `/watch/${params.type}/${params.uid}/${item.id_doc}`
                                                );
                                          }}
                                          className="group cursor-pointer"
                                        >
                                          <div className="relative">
                                            <Image
                                              src={item.image}
                                              width={640}
                                              height={360}
                                              className="rounded-lg"
                                              alt={
                                                item.title +
                                                `-landscape-thumbnails`
                                              }
                                            />
                                            {/* <div className="absolute bottom-2 right-2">
                                   <time className="text-[10px] py-[1px] px-[2px] bg-black/60 rounded-sm text-white text-center">
                                     00:45
                                   </time>
                                 </div> */}
                                          </div>
                                          <div className="mt-2">
                                            <h3 className="group-hover:underline text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                                              {item.title}
                                            </h3>
                                          </div>
                                        </div>
                                      </SwiperSlide>
                                    )
                                  )}
                                </Swiper>
                              </section>
                            ) : (
                              <></>
                            )}
                            {params.type !== "trailer-series" &&
                            params.type !== "trailer-movies" ? (
                              <section className="my-6">
                                <div className="flex items-center justify-between mx-4 mb-[10px] relative">
                                  <button
                                    type="button"
                                    // onClick={() =>
                                    //   setTrailerExtraMobile((current) => !current)
                                    // }
                                  >
                                    <h3 className="line-clamp-1 text-white text-base font-semibold text-ellipsis whitespace-normal">
                                      Trailer
                                    </h3>
                                  </button>
                                  {/* <button
                                type="button"
                                onClick={() =>
                                  setTrailerExtraMobile((current) => !current)
                                }
                                className="text-white block text-sm font-normal h-4 whitespace-nowrap w-4"
                              >
                                <ChevronRightIcon></ChevronRightIcon>
                              </button> */}
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
                                    <div
                                      onClick={() =>
                                        movePageFunction(
                                          `/watch/trailer-${params.type}/${
                                            params.uid
                                          }/${item.title_trailer.replace(
                                            /\s+/g,
                                            "-"
                                          )}`
                                        )
                                      }
                                      className="group"
                                    >
                                      <div className="relative">
                                        <Image
                                          src={item.image_trailer}
                                          className="rounded-lg"
                                          alt={
                                            item.title + `-landscape-thumbnails`
                                          }
                                          width={640}
                                          height={360}
                                        />
                                        {/* <div className="absolute bottom-2 right-2">
                                      <time className="text-[10px] py-[1px] px-[2px] bg-black/60 rounded-sm text-white text-center">
                                        00:45
                                      </time>
                                    </div> */}
                                      </div>
                                      <div className="mt-2">
                                        <h3 className="group-hover:underline text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap font-normal">
                                          {item.title_trailer} - Luplay Original
                                          Series | Official Trailer
                                        </h3>
                                      </div>
                                    </div>
                                  </SwiperSlide>
                                </Swiper>
                                {/* <div
                              className={`bottom-0 bg-pallete-5 fixed h-[calc(100%-0.3*100%)] md:h-[calc(100%-0.5*100%)] w-full ${
                                trailerextramobile
                                  ? "detail-selected-bottom z-[7]"
                                  : "detail-selected-bottom-hidden z-[-1]"
                              }`}
                            >
                              <div className="h-full left-0 absolute top-0 w-full z-[6] overflow-y-scroll">
                                <div className="items-center bg-pallete-4 flex flex-row justify-between left-0 py-3 px-4 sticky top-0 w-full z-[5]">
                                  <h3 className="text-white text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap w-11/12">
                                    Trailer
                                  </h3>
                                  <button
                                    type="button"
                                    className="w-6 h-6 text-white"
                                    onClick={() =>
                                      setTrailerExtraMobile(
                                        (current) => !current
                                      )
                                    }
                                  >
                                    <XMarkIcon></XMarkIcon>
                                  </button>
                                </div>
                                <div className="h-100% overflow-y-scroll">
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
                                                Merajut Dendam - Luplay Original
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
                                                Merajut Dendam - Luplay Original
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
                                                Merajut Dendam - Luplay Original
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
                                                Merajut Dendam - Luplay Original
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
                            </div> */}
                              </section>
                            ) : (
                              <></>
                            )}
                            <section className="mt-6 mb-16">
                              <div>
                                <div className="flex items-center justify-between mx-4 mb-[10px] relative">
                                  <h3 className="line-clamp-1 text-base font-semibold text-ellipsis whitespace-normal">
                                    Rekomendasi yang Serupa
                                  </h3>
                                </div>
                              </div>
                              <div>
                                <ul className="grid grid-cols-3 md:grid-cols-5 gap-4 mx-4">
                                  {bucketdatasimilar.map(
                                    (item: any, index: number) => (
                                      <li
                                        className="max-w-full overflow-hidden"
                                        key={index}
                                      >
                                        <div className="h-full w-full text-center">
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
                                          >
                                            <div className="bg-pallete-2/20 rounded-lg relative">
                                              <Image
                                                src={
                                                  item.image_potrait_thumbnail
                                                }
                                                width={156}
                                                height={225}
                                                alt={
                                                  item.title +
                                                  `-potrait-thumbnails`
                                                }
                                                className="h-auto w-full flex items-center text-sm rounded-lg"
                                              />
                                            </div>
                                          </button>
                                        </div>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="p-0 mx-auto mt-12 overflow-hidden">
                        <main
                          className="justify-between mx-auto lg:max-w-[1012px] xl:max-w-[1360px] lg:w-[1012px] xl:w-[1360px] gap-x-8 py-6 after:clear-both"
                          style={{
                            display: "grid",
                            gridTemplate:
                              '"video sidebar-column" min-content "main-column sidebar-column" 1fr',
                          }}
                        >
                          <div
                            className="lg:min-h-[459px] xl:min-h-[569px] lg:w-[698px] xl:w-[1012px] bg-black/40 block lg:h-[331px] xl:h-[441px] overflow-hidden relative"
                            style={{ gridArea: "video" }}
                          >
                            <VideoPlayer
                              options={VIDEOJS_OPTIONS}
                              handleAddView={handleAddView}
                            />
                          </div>
                          <div
                            className="lg:w-[698px] xl:w-[1012px]"
                            style={{ gridArea: "main-column" }}
                          >
                            <div className="w-full">
                              <div>
                                <section className="my-4 block">
                                  <h1 className="line-clamp-2 text-ellipsis text-2xl font-bold mb-4 text-gray-100">
                                    {item.title}
                                  </h1>
                                  <div className="flex text-base font-semibold mb-6 text-gray-600">
                                    <span
                                      className="block h-6 w-6 bg-contain bg-no-repeat"
                                      style={{
                                        backgroundImage: `url(${crown.src})`,
                                      }}
                                    ></span>
                                    {/* <span className="before:inline-block before:content-[''] before:border-l before:border-gray-600 before:h-3 before:mx-2">
                                  2023
                                </span> */}
                                    <span className="before:inline-block before:content-[''] before:border-l before:border-gray-600 before:h-3 before:mx-2">
                                      {params.type == "series"
                                        ? bucketdataepisode.find(
                                            (obj: any) =>
                                              obj.id_doc === params.title
                                          ).title
                                        : item.title_trailer}
                                    </span>
                                  </div>
                                  <article
                                    className={`${
                                      detailvideo ? "" : "line-clamp-2"
                                    } text-ellipsis text-gray-200 text-base`}
                                  >
                                    <p className="mt-0 mb-3 text-sm">
                                      {params.type == "series"
                                        ? bucketdataepisode.find(
                                            (obj: any) =>
                                              obj.id_doc === params.title
                                          ).synopsis
                                        : item.synopsis_trailer}
                                    </p>
                                  </article>
                                  {detailvideo ? (
                                    <div className="">
                                      <hr className="border-t border-gray-700 my-6"></hr>
                                      <h2 className="text-gray-100 text-base font-semibold mb-4 mt-6">
                                        Detail{" "}
                                        {params.type === "series" ||
                                        params.type === "trailer-series"
                                          ? "Serial"
                                          : "Film"}
                                      </h2>
                                      <div className="flex gap-4">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            movePageFunction(
                                              `/${params.type}/${params.uid}/${item.title}`
                                            )
                                          }
                                          className="shrink-0"
                                        >
                                          <Image
                                            src={item.image_potrait_thumbnail}
                                            alt={
                                              item.title + `-potrait-thumbnails`
                                            }
                                            className=""
                                            width={67}
                                            height={100}
                                          />
                                        </button>
                                        <div className="flex flex-col gap-3 justify-center">
                                          <button
                                            type="button"
                                            className="text-gray-100 text-xl font-bold line-clamp-2 text-ellipsis hover:text-blue-700"
                                            onClick={() =>
                                              movePageFunction(
                                                `/${params.type}/${params.uid}/${item.title}`
                                              )
                                            }
                                          >
                                            {item.title}
                                          </button>
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
                                            {/* <span className="text-sm text-gray-600 font-normal">
                                          2023
                                        </span> */}
                                          </div>
                                          {/* <div className="px-2 py-1 bg-pallete-1 text-gray-700 text-xs">
                                        Nonton Lebih Cepat Episode 4 & 5 dengan
                                        Luplay Express!
                                      </div> */}
                                        </div>
                                      </div>
                                      <article className="mt-4 text-gray-200 text-base font-normal">
                                        <p className="mt-0 text-sm font-normal mb-3">
                                          {item.synopsis}
                                        </p>
                                      </article>
                                      <hr className="border-t border-gray-700 my-6"></hr>
                                      <div className="mb-6">
                                        <div className="flex flex-wrap">
                                          <button
                                            type="button"
                                            className="text-xs font-semibold mr-2 bg-pallete-2 rounded text-gray-100 block mb-2 py-1 px-2 hover:text-blue-600"
                                            onClick={() =>
                                              movePageFunction(
                                                `/categories/${params.type}/${item.genre.value}`
                                              )
                                            }
                                          >
                                            {item.genre.label}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <button
                                    type="button"
                                    className="text-base font-base font-semibold text-blue-700 hover:text-blue-500"
                                    onClick={() =>
                                      setDetailVideo((current) => !current)
                                    }
                                  >
                                    {detailvideo
                                      ? "Lihat Lebih Sedikit"
                                      : "Lihat Lebih Banyak"}
                                  </button>
                                </section>
                                <section className="my-4 block">
                                  <ul className="flex gap-2 mb-4">
                                    <li>
                                      <button
                                        type="button"
                                        className={`inline-flex text-sm p-3 text-center ${
                                          statuswatchlist
                                            ? "border-pallete-4 border-2"
                                            : "border-white border"
                                        } rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white`}
                                        onClick={() => {
                                          if (statuswatchlist) {
                                            handleDeleteWatchlist();
                                          } else {
                                            handleAddWatchlist();
                                          }
                                        }}
                                      >
                                        {statuswatchlist ? (
                                          <BookmarkSquareIcon className="w-4 h-4 mr-2"></BookmarkSquareIcon>
                                        ) : (
                                          <BookmarkIcon className="w-4 h-4 mr-2"></BookmarkIcon>
                                        )}
                                        Daftarku
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        type="button"
                                        className="inline-flex text-sm p-3 text-center border border-white rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white"
                                        onClick={toggleModal}
                                      >
                                        <ShareIcon className="w-4 h-4 mr-2"></ShareIcon>
                                        Bagikan
                                      </button>
                                    </li>
                                  </ul>
                                </section>
                                {params.type !== "trailer-series" &&
                                params.type !== "trailer-movies" ? (
                                  <section className="my-4 block">
                                    <div className="mb-4 flex justify-between items-center relative">
                                      <h3 className="text-xl font-bold line-clamp-1 text-gray-100 m-0 text-ellipsis whitespace-normal">
                                        Trailer
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
                                        <button
                                          onClick={() =>
                                            movePageFunction(
                                              `/watch/trailer-${params.type}/${
                                                params.uid
                                              }/${item.title_trailer.replace(
                                                /\s+/g,
                                                "-"
                                              )}`
                                            )
                                          }
                                          className="group w-[inherit]"
                                        >
                                          <div className="relative">
                                            <Image
                                              src={item.image_trailer}
                                              className="rounded-lg"
                                              alt={
                                                item.title_trailer +
                                                `-landscape-thumbnails`
                                              }
                                              width={640}
                                              height={360}
                                            />
                                            {/* <div className="absolute bottom-2 right-2">
                                     <time className="text-[10px] py-[1px] px-[2px] bg-black/60 rounded-sm text-white text-center">
                                       00:45
                                     </time>
                                   </div> */}
                                          </div>
                                          <div className="mt-2">
                                            <h3 className="group-hover:underline font-normal text-gray-100 text-xs mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
                                              {item.title_trailer} - Luplay
                                              Original Series | Official Trailer
                                            </h3>
                                          </div>
                                        </button>
                                      </SwiperSlide>
                                    </Swiper>
                                  </section>
                                ) : (
                                  <></>
                                )}
                                {/* <div className="">
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
                                      Ipsum has been the industry&apos;s
                                      standard dummy text ever since the 1500s,
                                      when an unknown printer took a galley of
                                      type and scrambled it to make a type
                                      specimen book. It has survived not only
                                      five centuries, but also the leap into
                                      electronic typesetting, remaining
                                      essentially unchanged. It was popularised
                                      in the 1960s with the release of Letraset
                                      sheets containing Lorem Ipsum passages,
                                      and more recently with desktop publishing
                                      software like Aldus PageMaker including
                                      versions of Lorem Ipsum.
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
                            </div> */}
                              </div>
                            </div>
                          </div>
                          <div
                            className="lg:w-[284px] xl:w-[316px] inline-block"
                            style={{ gridArea: "sidebar-column" }}
                          >
                            {params.type === "series" ||
                            params.type === "trailer-series" ? (
                              <section className="lg:mb-4 xl:my-4 rounded overflow-y-scroll lg:h-[460px] xl:h-[570px] no-scrollbar">
                                <div className="p-4">
                                  <span className="rounded-lg inline-block text-sm py-3 px-4 border border-solid border-gray-300 text-gray-100 font-semibold">
                                    Episode
                                  </span>
                                </div>
                                <ul className="flex flex-col relative">
                                  {bucketdataepisode.map(
                                    (item: any, index: number) => (
                                      <li key={index}>
                                        <div className="bg-pallete-2/20 py-3 px-4">
                                          <div
                                            onClick={() => {
                                              params.type == "trailer-series"
                                                ? movePageFunction(
                                                    `/watch/series/${params.uid}/${item.id_doc}`
                                                  )
                                                : movePageFunction(
                                                    `/watch/${params.type}/${params.uid}/${item.id_doc}`
                                                  );
                                            }}
                                            className="group flex items-center cursor-pointer"
                                          >
                                            <div className="h-16 w-32 rounded-lg overflow-hidden relative align-top z-[1]">
                                              <Image
                                                src={item.image}
                                                alt={
                                                  item.title +
                                                  `-landscape-thumbnails`
                                                }
                                                className="object-cover object-center aspect-[16/9]"
                                                width={640}
                                                height={360}
                                                priority
                                              />
                                              <div className="absolute bottom-1 left-0">
                                                <span className="text-[8px] py-[3px] px-[6px] bg-gray-50 border border-solid border-gray-300 rounded text-gray-900 font-medium mb-1 ml-1">
                                                  GRATIS
                                                </span>
                                              </div>
                                              {/* <div className="absolute bottom-1 right-2">
                                   <time className="text-[10px] font-normal py-[1px] px-[2px] bg-black/60 rounded text-white text-center">
                                     43:35
                                   </time>
                                 </div> */}
                                            </div>
                                            <div className="flex-[1_1] ml-2">
                                              <h3 className="line-clamp-2 max-h-[36px] break-words text-sm font-semibold text-gray-100 group-hover:text-blue-700">
                                                {item.title}
                                              </h3>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </section>
                            ) : (
                              <></>
                            )}
                            {bucketdatasimilar.length != 0 ? (
                              <section className="mb-8 mt-4">
                                <div className="mb-4 flex items-center justify-between relative">
                                  <h3 className="text-xl font-bold line-clamp-1 text-gray-100 text-ellipsis whitespace-normal">
                                    Rekomendasi yang Serupa
                                  </h3>
                                </div>
                                <div>
                                  <ul className="grid grid-cols-3 gap-4">
                                    {bucketdatasimilar.map(
                                      (item: any, index: number) => (
                                        <li
                                          className="max-w-full overflow-hidden"
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
                                                src={
                                                  item.image_potrait_thumbnail
                                                }
                                                width={156}
                                                height={225}
                                                className="rounded-md brightness-75 transition-all ease-in duration-200 group-hover:brightness-100 group-hover:scale-105"
                                                alt={
                                                  item.title +
                                                  `-potrait-thumbnails`
                                                }
                                              />
                                            </div>
                                          </button>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </section>
                            ) : (
                              <></>
                            )}
                          </div>
                        </main>
                      </div>
                    </>
                  )}
                  <Transition show={statemodal} as={Fragment}>
                    <Dialog
                      open={statemodal}
                      onClose={() => {}}
                      className="relative z-[9999]"
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div
                          className="fixed inset-0 bg-black/50"
                          aria-hidden="true"
                        />
                      </Transition.Child>

                      <div className="fixed inset-0 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Dialog.Panel className="mx-auto w-[380px] sm:w-[488px] bg-pallete-4 shadow-default rounded-md">
                              <div
                                className="absolute hover:text-graydark top-0 right-0 p-4 z-9 hover:text-rose-600 cursor-pointer"
                                onClick={() => {
                                  toggleModal();
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-[18px] h-[18px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                              <Dialog.Title
                                className={
                                  "text-xl font-semibold leading-[1.05] text-gray-100 text-center m-[48px_32px_0]"
                                }
                              >
                                Bagikan ke Semua Orang
                              </Dialog.Title>
                              <Dialog.Description
                                className={"text-gray-100 text-sm mb-4"}
                              ></Dialog.Description>
                              <div className="p-[24px_32px_32px]">
                                <div className="block">
                                  <div className="flex flex-col gap-y-2 md:block mt-2">
                                    <button
                                      className="inline-block mr-2 rounded-sm p-2 text-center w-full md:w-[49%] bg-[#1877F2]"
                                      onClick={handleShareFacebook}
                                    >
                                      <span
                                        className="bg-cover bg-no-repeat bg-[50%] inline-block h-6 mr-[10px] align-middle w-6"
                                        style={{
                                          backgroundImage: `url(/facebook.svg)`,
                                        }}
                                      ></span>
                                      <span className="text-gray-100 font-semibold align-middle text-sm text-center break-words">
                                        Bagikan ke Facebook
                                      </span>
                                    </button>
                                    <button
                                      className="inline-block rounded-sm p-2 text-center w-full md:w-[49%] bg-white"
                                      onClick={handleShareTwitter}
                                    >
                                      <span
                                        className="bg-cover bg-no-repeat bg-[50%] inline-block h-6 mr-[10px] align-middle w-6"
                                        style={{
                                          backgroundImage: `url(/X.svg)`,
                                        }}
                                      ></span>
                                      <span className="text-gray-900 font-semibold align-middle text-sm text-center break-words">
                                        Bagikan ke X
                                      </span>
                                    </button>
                                  </div>
                                  <div className="m-[24px_0_32px]">
                                    <span className="text-gray-100 text-sm break-words font-semibold">
                                      Salin tautan luplay
                                    </span>
                                    <div className="mt-2">
                                      <textarea
                                        className="border border-gray-400 rounded h-[100px] resize-none w-full text-gray-900 text-[0.8em]"
                                        readOnly
                                        value={
                                          "https://luplay-web--lunarvisionapp.us-central1.hosted.app/" +
                                          params.type +
                                          "/" +
                                          params.uid +
                                          "/" +
                                          params.title +
                                          "?utm_source=referral&utm_medium=share-link"
                                        }
                                        ref={textareaRef}
                                      ></textarea>
                                      <div className="flex items-center gap-2 w-full">
                                        <button
                                          className="h-8 w-16 bg-gray-200 rounded text-center block"
                                          type="button"
                                          onClick={handleCopyClick}
                                        >
                                          <ClipboardDocumentIcon className="w-full h-6"></ClipboardDocumentIcon>
                                        </button>
                                        {successcopy ? (
                                          <span className="text-green-400 text-xs transition-all ease-in duration-100">
                                            Berhasil disalin!
                                          </span>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
          <div
            className="curtain__panel curtain__panel--right"
            style={{ height: `${heightcurtain}` }}
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
              <a href="https://luplay-web--lunarvisionapp.us-central1.hosted.app/" className="hover:underline">
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

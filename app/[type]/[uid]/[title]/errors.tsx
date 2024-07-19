"use client"; // Error components must be Client Components

import Loading from "@/components/Loading/loading";
import Navbar from "@/components/Navbar/navbar";
import { analytics } from "@/lib/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const [colorchange, setColorChange] = useState<boolean>(false);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);

  const curtaincontentRef = useRef<HTMLDivElement>(null);

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
    if (typeof window !== "undefined") {
      analytics;
      setPageLoaded(true);
      setCheckboxCurtain(true);
    }
  }, []);

  const movePageFunction = (param: string) => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.push(param, { scroll: false }));
  };

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <header className="fixed z-10 top-0 w-full transition-all duration-300 bg-black xl:bg-pallete-5 shadow-md ">
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
              <div className="container mx-auto px-4 pt-4">
                <div className="flex flex-col justify-center items-center text-lg my-16 lg:my-12 mx-auto relative text-center w-auto lg:w-[544px] z-[1]">
                  <Image
                    src={"/error.svg"}
                    alt="luplay-error"
                    className="h-80 w-80"
                    width={1980}
                    height={720}
                  />
                  <h2 className="text-gray-100 text-2xl font-bold mt-10">
                    Oops !
                  </h2>
                  <p className="text-base text-gray-300 mt-2">
                    Ada yang salah &rarr;{" "}
                    <button
                      className="hover:underline hover:text-pallete-3"
                      onClick={
                        // Attempt to recover by trying to re-render the segment
                        //   () => reset()
                        () => movePageFunction("/")
                      }
                    >
                      Kembali Ke Awal
                    </button>
                  </p>
                </div>
                {/* <div className="text-sm font-bold my-16 mx-auto">
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
                             src={"/trailer-1.webp"}
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
                             Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI
                             Liga 1 2023/24
                           </p>
                         </div>
                       </a>
                     </SwiperSlide>
                     <SwiperSlide className="rounded-lg relative align-top !bg-transparent">
                       <a href="#" className="group">
                         <div className="relative">
                           <Image
                             src={"/trailer-1.webp"}
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
                             Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI
                             Liga 1 2023/24
                           </p>
                         </div>
                       </a>
                     </SwiperSlide>
                     <SwiperSlide className="rounded-lg relative align-top !bg-transparent">
                       <a href="#" className="group">
                         <div className="relative">
                           <Image
                             src={"/trailer-1.webp"}
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
                             Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI
                             Liga 1 2023/24
                           </p>
                         </div>
                       </a>
                     </SwiperSlide>
                     <SwiperSlide className="rounded-lg relative align-top !bg-transparent">
                       <a href="#" className="group">
                         <div className="relative">
                           <Image
                             src={"/trailer-1.webp"}
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
                             Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI
                             Liga 1 2023/24
                           </p>
                         </div>
                       </a>
                     </SwiperSlide>
                     <SwiperSlide className="rounded-lg relative align-top !bg-transparent">
                       <a href="#" className="group">
                         <div className="relative">
                           <Image
                             src={"/trailer-1.webp"}
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
                             Persija Jakarta VS Rans Nusantara FC - Full Highlights | BRI
                             Liga 1 2023/24
                           </p>
                         </div>
                       </a>
                     </SwiperSlide>
                   </Swiper>
                   </div> */}
              </div>
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
      <footer className="max-md:hidden w-full mx-auto px-2 sm:px-6 lg:px-8 shadow m-4">
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
    </>
  );
}

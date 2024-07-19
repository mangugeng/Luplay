"use client";

import NavbarBottomMobile from "@/components/Navbar/navbar-bottom-mobile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Watchlist/Navbar";
import Loading from "@/components/Loading/loading";
import { ListBulletIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { analytics } from "@/lib/firebase";

export default function Page() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [bucketwacthlist, setBucketWatchlist] = useState<any[]>([]);
  const [colorchange, setColorChange] = useState<boolean>(false);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);

  const curtaincontentRef = useRef<HTMLDivElement>(null);

  const fetchDataWishlist = async () => {
    try {
      await fetch(`http://localhost:3002/api/user/watchlist/GET`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        if (response.status != 200) {
          // console.error(response);
        } else {
          let bucketwacthlist: any[] = [];
          try {
            await fetch(`http://localhost:3002/api/data/video/movies`, {
              method: "GET",
            }).then(async (response) => {
              const data = await response.json();
              if (response.status != 200) {
                // console.error(response);
              } else {
                bucketwacthlist = bucketwacthlist.concat(data.bucketdata);
              }
            });
          } catch (error) {
            console.log(error);
          }

          try {
            await fetch(`http://localhost:3002/api/data/video/series`, {
              method: "GET",
            }).then(async (response) => {
              const data = await response.json();
              if (response.status != 200) {
                // console.error(response);
              } else {
                bucketwacthlist = bucketwacthlist.concat(data.bucketdata);
              }
            });
          } catch (error) {
            console.log(error);
          }
          setBucketWatchlist(
            bucketwacthlist.filter((obj1) =>
              data.userWatchlist.some(
                (obj2: any) => obj2.id_doc === obj1.id_doc
              )
            )
          );
        }
      });
    } catch (error: any) {
      throw new Error(error.messages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataWishlist();
  }, []);
  useEffect(() => {
    if (window.innerWidth > 768) {
      router.back();
    }
  }, [router]);
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
    if (typeof window !== "undefined" && !loading) {
      analytics;
      setPageLoaded(true);
      setCheckboxCurtain(true);
    }
  }, [loading]);
  useEffect(() => {
    if (window.innerWidth > 768) {
      router.back();
    }
  }, [router]);

  const movePageFunction = (param: string) => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.push(param, { scroll: false }));
  };

  const handleDeleteWatchlist = async (param: string) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/user/watchlist/DELETE?id_doc=${param}`,
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
    } finally {
      window.location.reload();
    }
  };

  return (
    <>
      <header className={`fixed z-10 bg-black w-full`}>
        <Navbar></Navbar>
      </header>
      <NavbarBottomMobile
        movePageFunction={movePageFunction}
      ></NavbarBottomMobile>
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
              <main>
                <div className="mx-4 sm:mx-auto sm:max-w-xl md:max-w-2xl py-0 mb-6">
                  <section className="mb-16 my-14">
                    <div className="bg-pallete-4 rounded-2xl p-6 shadow-lg">
                      <h2 className="flex gap-4 items-center text-sm text-white font-semibold w-full">
                        <ListBulletIcon className="w-6 h-6"></ListBulletIcon>
                        {bucketwacthlist.length} Konten
                      </h2>
                      <hr className="my-4 border-t-gray-600"></hr>
                      {bucketwacthlist.length == 0 ? (
                        <div className="flex flex-col md:flex-row justify-center gap-x-4">
                          <div>
                            <Image
                              src={"/empety.svg"}
                              alt="luplay-not-found"
                              className="h-64 w-64 mx-auto"
                              width={256}
                              height={256}
                            />
                          </div>
                          <div className="flex flex-col justify-center text-white md:w-1/2">
                            <div className="block text-xl font-black tracking-[.2px] leading-[1.1]">
                              Wishlistmu masih kosong
                            </div>
                            <div className="text-gray-400 block text-base leading-[1.38] py-4">
                              Tambahkan konten yang kamu suka supaya kamu lebih
                              mudah mencari dan menontonnya
                            </div>
                            <button
                              className="bg-pallete-3 hover:bg-pallete-2 rounded-3xl block text-base font-bold h-12 leading-[1.38] mr-10 text-center w-full md:w-56"
                              type="button"
                              onClick={() => movePageFunction("/")}
                            >
                              Cari Konten
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {bucketwacthlist.map((item: any, index: number) => (
                            <div
                              onClick={() =>
                                movePageFunction(
                                  `/${item.type}/${
                                    item.id_doc
                                  }/${item.title.replace(/\s+/g, "-")}`
                                )
                              }
                              className="group hover:cursor-pointer block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
                              key={index}
                            >
                              <div className="bg-gray-950 rounded-md inline-block h-[88px] overflow-hidden relative align-top w-[156px] z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
                                <Image
                                  src={item.image_banner_mobile}
                                  alt={item.title + `-landscape-thumbnails`}
                                  className="align-middle h-full w-full absolute left-0 top-0"
                                  width={154}
                                  height={88}
                                />
                              </div>
                              <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
                                <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
                                  {item.title}
                                </h3>
                                <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold py-1 px-2 text-center uppercase">
                                  gratis
                                </span>
                                <div className="mt-2 z-10">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      {
                                        e.stopPropagation();
                                        handleDeleteWatchlist(item.id_doc);
                                      }
                                    }}
                                    className="flex gap-x-2 items-center bg-red-600 text-xs text-gray-100 rounded-md px-2 py-1"
                                  >
                                    <TrashIcon className="w-4 h-4"></TrashIcon>
                                    Hapus
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <hr className="my-4 border-t-gray-600"></hr>
                    </div>
                  </section>
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

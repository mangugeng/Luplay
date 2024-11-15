"use client";

import { useEffect, useRef, useState, Fragment, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import NavbarBottomMobile from "@/components/Navbar/navbar-bottom-mobile";
import Navbar from "@/components/Navbar/navbar";
import NavbarMobile from "../components/navbar";
import {
  CheckIcon,
  ListBulletIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { sendEmailVerification, signOut } from "firebase/auth";
import { analytics, auth } from "@/lib/firebase";
import { toast } from "react-toastify";
import Loading from "@/components/Loading/loading";

export default function Profile() {
  const router = useRouter();

  const savedState = localStorage.getItem("stateProfile");

  const [datauser, setDataUser] = useState<any[]>([]);
  const [stateprofile, setStateProfile] = useState<string>(
    savedState || "watchlist"
  );
  const [bucketwacthlist, setBucketWatchlist] = useState<any[]>([]);
  const [buttonverificationemaildisabled, setButtonVerificationEmailDisabled] =
    useState(false);
  const [
    countdownbuttonverificationemail,
    setCountdownButtonVerificationEmail,
  ] = useState(0);
  const [buttonresetpassworddisabled, setButtonResetPasswordDisabled] =
    useState(false);
  const [countdownbuttonresetpassword, setCountdownButtonResetPassword] =
    useState(0);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [devicemobile, setDeviceMobile] = useState<boolean>(false);
  const [colorchange, setColorChange] = useState<boolean>(false);

  const curtaincontentRef = useRef<HTMLDivElement>(null);

  const fetchDataWishlist = async () => {
    try {
      await fetch(`https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/user/watchlist/GET`, {
        method: "GET",
      }).then(async (response) => {
        const data = await response.json();
        if (response.status != 200) {
          // console.error(response);
        } else {
          let bucketwacthlist: any[] = [];
          try {
            await fetch(`https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/data/video/movies`, {
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
            await fetch(`https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/data/video/series`, {
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
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/user/", {
          method: "GET",
        });
        const userData = await response.json();
        if (userData.user.length === 0) {
          await signOut(auth).then(() => {
            router.replace("/");
          });
        } else {
          setDataUser(userData.user);
        }
      } catch (error: any) {
        console.error("Error generating metadata:", error.message);
      }
    };

    fetchUserData();
  }, [router]);
  useEffect(() => {
    localStorage.setItem("stateProfile", stateprofile);
  }, [stateprofile]);
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
    if (typeof window !== "undefined") {
      analytics;
      if (datauser.length != 0) {
        fetchDataWishlist().finally(() => {
          setPageLoaded(true);
          setCheckboxCurtain(true);
        });
      }
    }
  }, [datauser.length]);
  useEffect(() => {
    const lastClickTime = localStorage.getItem("lastClickTime");

    if (lastClickTime) {
      const timeDifference = new Date().getTime() - parseInt(lastClickTime, 10);

      if (timeDifference < 60000) {
        setButtonVerificationEmailDisabled(true);

        // Hitung countdownbuttonverificationemail awal
        const initialCountdown = Math.ceil((60000 - timeDifference) / 1000);
        setCountdownButtonVerificationEmail(initialCountdown);

        // Mulai mengurangkan setiap detik
        const countdownInterval = setInterval(() => {
          setCountdownButtonVerificationEmail(
            (prevCountdown) => prevCountdown - 1
          );
        }, 1000);

        // Set timeout untuk membersihkan interval setelah sisa waktu
        setTimeout(() => {
          setButtonVerificationEmailDisabled(false);
          clearInterval(countdownInterval);
        }, timeDifference);
      }
    }
  }, []);
  useEffect(() => {
    const lastClickTimeResetPasswordString = localStorage.getItem(
      "lastClickTimeResetPassword"
    );
    const lastClickTimeResetPassword = lastClickTimeResetPasswordString
      ? parseInt(lastClickTimeResetPasswordString, 10)
      : 0;

    const currentTime = new Date().getTime();

    const timeDifference = currentTime - lastClickTimeResetPassword;

    let countdownInterval: any;

    if (timeDifference < 60000) {
      setButtonResetPasswordDisabled(true);

      const remainingTime = Math.floor((60000 - timeDifference) / 1000);
      setCountdownButtonResetPassword(remainingTime);

      countdownInterval = setInterval(() => {
        setCountdownButtonResetPassword((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
        setButtonResetPasswordDisabled(false);
      }, 60000 - timeDifference);
    } else {
      setButtonResetPasswordDisabled(false);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);
  useEffect(() => {
    const lastClickTimeVerificationEmailString = localStorage.getItem(
      "lastClickTimeVerificationEmail"
    );
    const lastClickTimeVerificationEmail = lastClickTimeVerificationEmailString
      ? parseInt(lastClickTimeVerificationEmailString, 10)
      : 0;

    const currentTime = new Date().getTime();

    const timeDifference = currentTime - lastClickTimeVerificationEmail;

    let countdownInterval: any;

    if (timeDifference < 60000) {
      setButtonVerificationEmailDisabled(true);

      const remainingTime = Math.floor((60000 - timeDifference) / 1000);
      setCountdownButtonVerificationEmail(remainingTime);

      countdownInterval = setInterval(() => {
        setCountdownButtonVerificationEmail(
          (prevCountdown) => prevCountdown - 1
        );
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
        setButtonVerificationEmailDisabled(false);
      }, 60000 - timeDifference);
    } else {
      setButtonVerificationEmailDisabled(false);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  const movePageFunction = (param: string) => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.push(param, { scroll: false }));
  };

  const handleVerificationEmail = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      if (auth.currentUser !== null) {
        setButtonVerificationEmailDisabled(true);

        await sendEmailVerification(auth.currentUser);

        toast.success("Email verifikasi berhasil terkirim!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        const lastClickTimeVerificationEmail = new Date().getTime();
        localStorage.setItem(
          "lastClickTimeVerificationEmail",
          lastClickTimeVerificationEmail.toString()
        );

        setButtonVerificationEmailDisabled(true);

        setTimeout(() => {
          setButtonVerificationEmailDisabled(false);
        }, 60000);

        setCountdownButtonVerificationEmail(60);

        const countdownInterval = setInterval(() => {
          setCountdownButtonVerificationEmail(
            (prevCountdown) => prevCountdown - 1
          );
        }, 1000);

        setTimeout(() => {
          clearInterval(countdownInterval);
        }, 60000);
      } else {
        // Handle the case when currentUser is null
        console.error("Current user is null");
      }
    } catch (error: any) {
      // Handle error
      // console.error(error);

      toast.error(error.message || "An error occurred", {
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

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setButtonResetPasswordDisabled(true);
    try {
      const response = await fetch(
        "https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/user/reset/POST",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: auth.currentUser?.email }),
        }
      );

      if (!response.ok) {
        toast.error("Error mengirim tautan, coba lagi!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("Email reset kata sandi berhasil terkirim!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error: any) {
      // console.error(error);
    } finally {
      const lastClickTimeResetPassword = new Date().getTime();
      localStorage.setItem(
        "lastClickTimeResetPassword",
        lastClickTimeResetPassword.toString()
      );

      setButtonResetPasswordDisabled(true);

      setTimeout(() => {
        setButtonResetPasswordDisabled(false);
      }, 60000);

      // Set countdownbuttonverificationemail awal dan mulai mengurangkan setiap detik
      setCountdownButtonResetPassword(60);
      const countdownInterval = setInterval(() => {
        setCountdownButtonResetPassword((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Set timeout untuk membersihkan interval setelah 1 menit
      setTimeout(() => {
        clearInterval(countdownInterval);
      }, 60000);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth).then(async () => {
        const response = await fetch(
          "https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/user/sign_out",
          {
            method: "POST",
          }
        );

        if (response.ok) {
          toast.success("Berhasil keluar!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          location.reload();
        } else {
          // Handle server-side error
          const errorData = await response.json();
          throw new Error(errorData.error || "Server error");
        }
      });
    } catch (error: any) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <>
      {devicemobile ? (
        <header className="fixed w-full z-10 top-0 bg-black xl:bg-pallete-5 shadow-md">
          <NavbarMobile></NavbarMobile>
        </header>
      ) : (
        <header className="fixed z-20 w-full top-0 bg-black xl:bg-pallete-5 shadow-md hidden lg:block">
          <Navbar movePageFunction={movePageFunction}></Navbar>
        </header>
      )}
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
              datauser.length != 0 ? (
                datauser.map((item: any, index: number) => (
                  <main key={index}>
                    <div className="mx-4 sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-0 mt-12 before:content-[' '] before:table">
                      <div className="float-right w-full">
                        <div className="overflow-hidden">
                          <article className="block my-0 mx-auto max-w-none p-0">
                            <div className="border-b border-gray-600 mb-5 relative before:content-[' '] before:table">
                              <form action="#">
                                <div className="my-0 mx-auto max-w-6xl py-0 px-4 relative">
                                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-y-5 md:pt-5">
                                    <div className="flex items-end lg:gap-5 my-4 mx-0 relative before:content-[' '] before:table after:content-[' '] after:table clear-both">
                                      <div>
                                        <div>
                                          <div className="inline-block float-left relative mr-5 lg:mr-0">
                                            {item.profileImageUrl !== "" ? (
                                              <div
                                                className="relative border-4 leading-6 rounded-full inline-block h-28 w-28 md:h-[132px] md:w-[132px] bg-no-repeat bg-center bg-cover"
                                                style={{
                                                  backgroundImage: `url(${item.profileImageUrl})`,
                                                }}
                                              ></div>
                                            ) : (
                                              <div className="border-4 h-28 w-28 md:h-[132px] md:w-[132px] flex rounded-full items-center text-4xl justify-center bg-pallete-2 text-gray-900">
                                                {item.name
                                                  .split(" ")
                                                  .map(
                                                    (
                                                      item: string,
                                                      index: number
                                                    ) =>
                                                      index < 2 ? item[0] : ""
                                                  )
                                                  .join("")}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="pb-2">
                                        <h1 className="text-white text-xl font-semibold leading-normal relative z-[1]">
                                          {item.name}
                                        </h1>
                                        <span className="text-gray-300 inline-block relative text-sm">
                                          {item.email}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex gap-3 justify-end">
                                      <button
                                        onClick={() =>
                                          movePageFunction("/user/edit")
                                        }
                                        className="border border-gray-100 text-gray-100 text-xs tracking-normal leading-[18px] font-semibold min-w-[32px] py-2 px-4 rounded ml-[10px] relative z-[1]"
                                        type="button"
                                      >
                                        <PencilIcon className="w-4 h-4 mr-1 inline-block"></PencilIcon>
                                        Ubah Profil
                                      </button>
                                      <button
                                        onClick={handleSignOut}
                                        className="border border-red-600 text-red-600 text-xs tracking-normal leading-[18px] font-semibold min-w-[32px] py-2 px-4 rounded ml-[10px] relative z-[1]"
                                        type="button"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="w-4 h-4 mr-1 inline-block"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                                          />
                                        </svg>
                                        Keluar
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <nav className="flex justify-between mt-8 lg:mt-[42px] mx-auto max-w-6xl py-0 px-4 relative w-full before:content-[' '] before:table">
                                  <ul className="flex items-end mb-0 w-full overflow-x-auto">
                                    <li className="block p-0 text-center">
                                      <button
                                        className={`border-b-2 block text-sm font-semibold leading-normal pt-2 px-6 pb-[6px] ${
                                          stateprofile == "watchlist"
                                            ? "text-white border-b-pallete-3"
                                            : "text-gray-400 border-transparent"
                                        } hover:text-white`}
                                        type="button"
                                        onClick={() =>
                                          setStateProfile("watchlist")
                                        }
                                      >
                                        <span className="inline-block whitespace-nowrap text-sm font-semibold">
                                          Daftarku
                                        </span>
                                      </button>
                                    </li>
                                    <li className="block p-0 text-center">
                                      <button
                                        className={`border-b-2 block text-sm font-semibold leading-normal pt-2 px-6 pb-[6px] ${
                                          stateprofile == "email"
                                            ? "text-white border-b-pallete-3"
                                            : "text-gray-400 border-transparent"
                                        } hover:text-white`}
                                        type="button"
                                        onClick={() => setStateProfile("email")}
                                      >
                                        <span className="inline-block whitespace-nowrap text-sm font-semibold">
                                          Email
                                        </span>
                                      </button>
                                    </li>
                                    <li className="block p-0 text-center">
                                      <button
                                        className={`border-b-2 block text-sm font-semibold leading-normal pt-2 px-6 pb-[6px] ${
                                          stateprofile == "phone"
                                            ? "text-white border-b-pallete-3"
                                            : "text-gray-400 border-transparent"
                                        } hover:text-white`}
                                        type="button"
                                        onClick={() => setStateProfile("phone")}
                                      >
                                        <span className="inline-block whitespace-nowrap text-sm font-semibold">
                                          Nomor Ponsel
                                        </span>
                                      </button>
                                    </li>
                                    <li className="block p-0 text-center">
                                      <button
                                        className={`border-b-2 block text-sm font-semibold leading-normal pt-2 px-6 pb-[6px] ${
                                          stateprofile == "settings"
                                            ? "text-white border-b-pallete-3"
                                            : "text-gray-400 border-transparent"
                                        } hover:text-white`}
                                        type="button"
                                        onClick={() =>
                                          setStateProfile("settings")
                                        }
                                      >
                                        <span className="inline-block whitespace-nowrap text-sm font-semibold">
                                          Pengaturan
                                        </span>
                                      </button>
                                    </li>
                                  </ul>
                                </nav>
                              </form>
                            </div>
                          </article>
                          <main className="block my-0 mx-auto xl:max-w-6xl xl:min-w-[1152px] px-4 pb-6 before:content-[' '] before:table after:clear-both after:content-[' '] after:table">
                            <section className="block py-6">
                              <div className="md:px-14 mb-14">
                                {stateprofile == "watchlist" ? (
                                  <>
                                    <div className="text-base tracking-normal font-bold leading-6 mb-6 pb-[15px] w-full text-white">
                                      Daftarku
                                    </div>
                                    <div className="bg-pallete-4 rounded-2xl p-6 shadow-lg">
                                      <h2 className="flex gap-4 items-center text-sm text-white font-semibold w-full">
                                        <ListBulletIcon className="w-6 h-6"></ListBulletIcon>
                                        {bucketwacthlist.length} Konten
                                      </h2>
                                      <hr className="my-4 border-t-gray-600"></hr>
                                      {bucketwacthlist.length == 0 ? (
                                        <div className="flex flex-col md:flex-row justify-center py-0 lg:py-20">
                                          <div>
                                            <Image
                                              src={"/empety.svg"}
                                              alt="luplay-not-found"
                                              className="h-64 w-64 mx-auto md:mr-20"
                                              width={256}
                                              height={256}
                                            />
                                          </div>
                                          <div className="flex flex-col justify-center text-white md:w-1/2 xl:w-fit">
                                            <div className="block text-xl font-black tracking-[.2px] leading-[1.1]">
                                              Wishlistmu masih kosong
                                            </div>
                                            <div className="text-gray-400 block text-base leading-[1.38] py-4 w-full xl:w-[505px]">
                                              Tambahkan konten yang kamu suka
                                              supaya kamu lebih mudah mencari
                                              dan menontonnya
                                            </div>
                                            <button
                                              className="bg-pallete-3 hover:bg-pallete-2 rounded-3xl block text-base font-bold h-12 leading-[1.38] mr-10 text-center w-full md:w-56"
                                              type="button"
                                              onClick={() =>
                                                movePageFunction("/")
                                              }
                                            >
                                              Cari Konten
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <div>
                                          {bucketwacthlist.map(
                                            (item: any, index: number) => (
                                              <div
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
                                                className="group hover:cursor-pointer block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
                                                key={index}
                                              >
                                                <div className="bg-gray-950 rounded-md inline-block h-[88px] lg:h-32 overflow-hidden relative align-top w-[156px] lg:w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
                                                  <Image
                                                    src={
                                                      item.image_banner_mobile
                                                    }
                                                    alt={
                                                      item.title +
                                                      `-landscape-thumbnails`
                                                    }
                                                    className="align-middle h-full w-full absolute left-0 top-0"
                                                    width={640}
                                                    height={360}
                                                  />
                                                </div>
                                                <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
                                                  <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
                                                    {item.title}
                                                  </h3>
                                                  <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold py-1 px-2 text-center uppercase">
                                                    gratis
                                                  </span>
                                                  {devicemobile ? (
                                                    <></>
                                                  ) : (
                                                    <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal">
                                                      {item.synopsis.length >
                                                      150
                                                        ? `${item.synopsis.slice(
                                                            0,
                                                            150
                                                          )}...`
                                                        : item.synopsis}
                                                    </p>
                                                  )}
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )}
                                      <hr className="my-4 border-t-gray-600"></hr>
                                    </div>
                                  </>
                                ) : stateprofile == "email" ? (
                                  <form onSubmit={handleVerificationEmail}>
                                    <div className="text-base tracking-normal font-bold leading-6 mb-6 pb-[15px] w-full text-white">
                                      Email
                                    </div>
                                    <div className="flex items-start">
                                      <label
                                        htmlFor="user_email"
                                        className="flex-1 text-sm font-bold tracking-normal leading-[19px] text-white md:block hidden"
                                      >
                                        Alamat Email
                                      </label>
                                      <div className="flex-[3.5_1] relative">
                                        <div className="flex items-stretch flex-wrap relative w-full">
                                          <input
                                            id="user_email"
                                            type="text"
                                            className="border border-gray-600 rounded block text-base h-12 py-3 pl-4 pr-14 w-full bg-transparent text-white"
                                            defaultValue={item.email}
                                            disabled
                                            readOnly
                                          />
                                          {auth.currentUser?.emailVerified ? (
                                            <div className="absolute p-1 rounded-full bg-green-600 text-white font-semibold top-3 right-4">
                                              <CheckIcon className="w-4 h-4"></CheckIcon>
                                            </div>
                                          ) : (
                                            <div className="absolute p-1 rounded-full bg-rose-600 text-white font-semibold top-3 right-4">
                                              <XMarkIcon className="w-4 h-4"></XMarkIcon>
                                            </div>
                                          )}
                                        </div>
                                        <div className="text-gray-600 text-xs ml-4 font-normal leading-[18px] mb-4 mt-1">
                                          Email{" "}
                                          {auth.currentUser?.emailVerified
                                            ? "sudah"
                                            : "belum"}{" "}
                                          terverifikasi
                                        </div>
                                      </div>
                                    </div>
                                    {auth.currentUser?.emailVerified ? (
                                      <></>
                                    ) : (
                                      <div className="flex items-start mt-4 justify-end">
                                        <button
                                          type="submit"
                                          className="text-sm md:text-base tracking-normal font-bold leading-[22px] min-w-[48px] py-3 px-4 text-white bg-pallete-4/80 hover:bg-pallete-3 rounded disabled:bg-gray-400"
                                          disabled={
                                            buttonverificationemaildisabled
                                          }
                                        >
                                          {buttonverificationemaildisabled
                                            ? `Tunggu ${countdownbuttonverificationemail}s`
                                            : "Kirim Kode Verifikasi"}
                                        </button>
                                      </div>
                                    )}
                                  </form>
                                ) : stateprofile == "phone" ? (
                                  <>
                                    <form>
                                      <div className="text-base tracking-normal font-bold leading-6 mb-6 pb-[15px] w-full text-white">
                                        Nomor Ponsel
                                      </div>
                                      <div className="flex items-start">
                                        <div className="flex-[3.5_1] relative">
                                          <div className="flex items-stretch flex-wrap relative w-full">
                                            <input
                                              id="user_phone"
                                              type="tel"
                                              className="border border-gray-600 rounded block text-base h-12 py-3 pl-4 pr-14 w-full bg-transparent text-white"
                                              defaultValue={item.phone}
                                              readOnly
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  </>
                                ) : (
                                  <div className="flex gap-x-6">
                                    <form onSubmit={handleResetPassword}>
                                      <div className="text-base tracking-normal font-bold leading-6 mb-6 pb-[15px] w-full text-white">
                                        Kata Sandi
                                      </div>
                                      <div className="flex items-start mt-4">
                                        <button
                                          type="submit"
                                          className="text-sm md:text-base tracking-normal font-bold leading-[22px] min-w-[48px] py-3 px-4 text-white bg-pallete-4/80 hover:bg-pallete-3 rounded disabled:bg-gray-400"
                                          disabled={buttonresetpassworddisabled}
                                        >
                                          {buttonresetpassworddisabled
                                            ? `Tunggu ${countdownbuttonresetpassword}s`
                                            : "Reset Password"}
                                        </button>
                                      </div>
                                    </form>
                                    <div>
                                      <div className="text-base tracking-normal font-bold leading-6 mb-6 pb-[15px] w-full text-white">
                                        Hapus Akun
                                      </div>
                                      <button
                                        type="button"
                                        className="border border-red-600 text-red-600 text-sm md:text-base tracking-normal leading-[22px] font-semibold min-w-[48px] py-3 px-4 rounded relative z-[1]"
                                      >
                                        Inisiasi Penghapusan Akun
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </section>
                          </main>
                        </div>
                      </div>
                    </div>
                  </main>
                ))
              ) : (
                <></>
              )
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

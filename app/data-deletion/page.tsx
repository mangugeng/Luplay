"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import { useRouter } from "next/navigation";
import "react-loading-skeleton/dist/skeleton.css";
import NavbarBottomMobile from "../../components/Navbar/navbar-bottom-mobile";
import Loading from "@/components/Loading/loading";
import { analytics } from "@/lib/firebase";
import { Disclosure } from "@headlessui/react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function DataDeletion() {
  const router = useRouter();

  const [colorchange, setColorChange] = useState<boolean>(false);
  const [devicemobile, setDeviceMobile] = useState<boolean>(false);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [statusButton, setStatusSbutton] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean | null>(null);

  const handleDeleteAccount = async (
    _currentState: unknown,
    formData: FormData
  ) => {
    try {
      setStatusSbutton(true);
      await fetch("https://luplay-web--lunarvisionapp.us-central1.hosted.app/api/user/delete", {
        method: "DELETE",
        cache: "no-store",
        body: JSON.stringify({
          reason: formData.get("reason-delete-acccount")!.toString(),
        }),
      }).then(async (response) => {
        if (response.ok) {
          toast.success("Akun berhasil dihapus", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              location.replace("/");
            },
          });
        }
      });
    } catch (error) {
      return "Something went wrong.";
    } finally {
      setStatusSbutton(false);
    }
  };

  const [errorMessage, dispatch] = useFormState(handleDeleteAccount, undefined);

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
    if (window.innerWidth <= 768) {
      setDeviceMobile(true);
    } else {
      setDeviceMobile(false);
    }
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

  return (
    <>
      <header
        className={`fixed z-10 top-0 w-full transition-all duration-300 ${
          colorchange
            ? "bg-black xl:bg-pallete-5  shadow-md "
            : "bg-transparent inner-shadow-header max-[768px]:bg-black"
        }`}
      >
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
                <div className="mt-28 lg:mt-0 lg:fixed lg:top-1/2 lg:left-1/2 transform lg:-translate-x-1/2 lg:-translate-y-1/2 mx-4 sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-0 lg:py-12 mb-20 lg:mb-0 text-white">
                  <p className="my-3">
                    <span className="text-lg font-semibold">
                      Permintaan Penghapusan Data dan Hak Pengguna
                    </span>
                  </p>
                  <p className="my-3">
                    <span className="">
                      Sebagai pengguna, Anda memiliki hak tertentu terkait data
                      pribadi Anda. Anda memiliki hak untuk mengakses,
                      mengoreksi, mengobjeksi, atau menghapus data yang kami
                      miliki. Jika Anda ingin meminta penghapusan data pribadi
                      Anda, silakan ikuti langkah-langkah di bawah ini:
                    </span>
                  </p>
                  <div className="flex flex-col gap-y-6">
                    <div className="my-3">
                      <div>
                        <p>
                          <span className="font-semibold">
                            1. Permintaan di Website:
                          </span>
                          <span className="">
                            {" "}
                            Untuk memulai permintaan penghapusan data, Anda
                            dapat mengisi formulir permintaan melalui opsi
                            &apos;
                          </span>
                          <span className="font-semibold">
                            &quot;Inisiasi Penghapusan Akun&quot;
                          </span>
                          <span className="">&apos; dibawah ini.</span>
                        </p>
                      </div>
                      <div className="flex flex-col justify-center mt-2">
                        <Disclosure>
                          <Disclosure.Button className="w-fit self-center p-2 rounded-md text-red-600 font-semibold bg-red-100 hover:bg-red-200 transition-all">
                            Inisiasi Penghapusan Akun
                          </Disclosure.Button>
                          <Disclosure.Panel className="text-gray-500 py-2">
                            <form action={dispatch}>
                              <div className="">
                                <label
                                  htmlFor="reason-delete-acccount"
                                  className="block text-sm font-medium leading-6 text-white"
                                >
                                  Alasan Penghapusan
                                </label>
                                <div className="mt-2">
                                  <textarea
                                    id="reason-delete-acccount"
                                    name="reason-delete-acccount"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => {
                                      if (e.currentTarget.textLength >= 50) {
                                        setValid(true);
                                      }
                                    }}
                                    onBlur={(e) => {
                                      if (e.currentTarget.textLength >= 50) {
                                        setValid(true);
                                      } else {
                                        setValid(false);
                                      }
                                    }}
                                  ></textarea>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                  Tulis beberapa kata untuk alasan penghapusan
                                  akun.
                                </p>
                              </div>
                              <div className="flex gap-x-4 items-center">
                                <button
                                  disabled={
                                    statusButton ||
                                    valid === false ||
                                    valid === null
                                  }
                                  className="py-2 px-4 mt-3 text-white text-center bg-pallete-4 hover:bg-pallete-3 rounded-md font-bold items-center shadow-lg transition-all duration-200 ease-linear disabled:bg-gray-300 disabled:text-gray-600"
                                >
                                  {statusButton ? "Mohon Tunggu" : "Hapus Akun"}
                                </button>
                                <div>
                                  {errorMessage && (
                                    <p className="text-sm font-normal text-red-600 mt-2">
                                      {errorMessage}
                                    </p>
                                  )}
                                  {valid === false && (
                                    <p className="text-sm font-normal text-red-600 mt-2">
                                      Alasan tidak valid
                                    </p>
                                  )}
                                </div>
                              </div>
                            </form>
                          </Disclosure.Panel>
                        </Disclosure>
                      </div>
                    </div>
                    <div>
                      <p className="my-3">
                        <span className="font-semibold ">
                          2. Aplikasi Luplay:
                        </span>
                        <span className=" ">
                          {" "}
                          Lalu, Anda dapat menemukan opsi{" "}
                        </span>
                        <span className="font-semibold italic">
                          &quot;Initiate Data Deletion & Delete Account&quot;
                        </span>
                        <span className="">
                          {" "}
                          pada profil, setelah anda login.
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="my-3">
                        <span className="font-semibold ">
                          3. Google Play Store:
                        </span>
                        <span className=" ">
                          {" "}
                          Alternatifnya, Anda dapat menemukan formulir
                          permintaan di bagian{" "}
                        </span>
                        <span className="font-semibold">penghapusan data</span>
                        <span className=""> di Google Play Store.</span>
                      </p>
                    </div>
                  </div>
                  <p className="my-3">
                    <span className="">
                      Setelah Anda mengirimkan permintaan, tim kami akan
                      memverifikasinya. Setelah verifikasi berhasil, akun Anda
                      dan semua data terkait akan dihapus secara permanen,
                      memastikan penghapusan informasi Anda dari sistem kami.
                    </span>
                  </p>
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

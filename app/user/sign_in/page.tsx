"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { analytics, auth } from "@/lib/firebase";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import Loading from "@/components/Loading/loading";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formDataModal, setFormDataModal] = useState({
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [buttonresetpassworddisabled, setButtonResetPasswordDisabled] =
    useState(false);
  const [countdownbuttonresetpassword, setCountdownButtonResetPassword] =
    useState(0);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [statemodal, setStateModal] = useState(false);
  const [submitStatusModal, setSubmitStatusModal] = useState(false);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [colorchange, setColorChange] = useState<boolean>(false);

  const curtaincontentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      analytics;
      setPageLoaded(true);
      setCheckboxCurtain(true);
    }
  }, []);
  useEffect(() => {
    if (window.pageYOffset >= 80) {
      setColorChange(true);
    }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeModal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormDataModal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormEmpty = () => {
    return Object.values(formData).some((value) => value === "");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitStatus(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const response = await fetch("https://luplay.co.id/api/user/sign_in", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
      });

      const res = await response.json();

      if (response.ok && searchParams.get("from") === "data-deletion") {
        router.push("/data-deletion");
      } else if (response.ok && searchParams.get("from") !== "data-deletion") {
        router.back();
      } else {
        toast.error(res.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(
        errorCode === "auth/invalid-credential"
          ? "Kata sandi salah!"
          : "Coba kembali nanti!",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } finally {
      setSubmitStatus(false);
    }
  };

  const toggleModal = () => {
    setStateModal((current) => !current);
  };

  const isFormEmptyModal = () => {
    return Object.values(formDataModal).some((value) => value === "");
  };

  const onSubmitModal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitStatusModal(true);

    try {
      const response = await fetch(
        "https://luplay.co.id/api/user/reset/POST",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formDataModal.email }),
        }
      );

      if (!response.ok) {
        toast.error("Error mengirim tautan, coba lagi!", {
          position: "top-center",
          autoClose: 2000,
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
      toast.error("Error mengirim tautan, coba lagi!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setSubmitStatusModal(false);

      handleResetPasswordButtonState();
    }
  };

  const handleResetPasswordButtonState = () => {
    const lastClickTimeResetPassword = new Date().getTime();
    localStorage.setItem(
      "lastClickTimeResetPassword",
      lastClickTimeResetPassword.toString()
    );

    setButtonResetPasswordDisabled(true);

    setTimeout(() => {
      setButtonResetPasswordDisabled(false);
    }, 60000);

    setCountdownButtonResetPassword(60);
    const countdownInterval = setInterval(() => {
      setCountdownButtonResetPassword((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
    }, 60000);
  };

  const movePageFunction = (param: string) => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.push(param, { scroll: false }));
  };

  return (
    <>
      <div className="block h-0"></div>
      <header className="fixed w-full z-10 top-0 bg-black xl:bg-pallete-5 shadow-md">
        <Navbar></Navbar>
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
              <div>
                <div className="w-[380px] sm:w-[480px] -translate-y-1/2 -translate-x-1/2 top-1/2 fixed p-12 my-auto left-1/2 shadow-lg rounded-lg bg-pallete-4">
                  <div className="text-gray-100 text-2xl font-bold mb-9 text-center">
                    Masuk
                  </div>
                  {/* <div className="flex justify-between">
            <form className="flex-[0_0_48%] relative before:bg-google before:bg-white before:bg-cover before:bg-no-repeat before:rounded-full before:content-[''] before:block before:h-8 before:left-2 m-auto before:absolute before:top-1/2 before:-translate-y-1/2 before:w-8">
              <button
                type="submit"
                className="bg-[#4285f4] border-none rounded-3xl shadow-md text-gray-100 text-sm font-bold h-12 py-3 pr-5 pl-10 text-center w-full transition-all ease-linear duration-200"
              >
                Google
              </button>
            </form>
          </div> */}
                  <form onSubmit={onSubmit} className="mt-8 w-full ">
                    <div className="">
                      <input
                        className="border border-solid border-gray-700 rounded-md block text-sm h-12 px-4 w-full mb-3"
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      ></input>
                    </div>
                    <div className="relative">
                      <input
                        className="border border-solid border-gray-700 rounded-md block text-sm h-12 px-4 w-full mb-3"
                        placeholder="Kata sandi (min. 8 karakter)"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      ></input>
                      <div
                        onClick={() =>
                          setShowPassword(
                            (prevShowPassword) => !prevShowPassword
                          )
                        }
                        className="absolute h-5 opacity-50 right-6 top-0 translate-y-[65%] w-6 cursor-pointer group"
                      >
                        {showPassword ? (
                          <EyeIcon className="group-hover:text-[#0000ff]"></EyeIcon>
                        ) : (
                          <EyeSlashIcon className="group-hover:text-[#0000ff]"></EyeSlashIcon>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex px-2">
                      <div className="flex-[1_1]">
                        {/* <div className="flex items-center mb-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ml-2 text-xs font-normal text-gray-100"
                  >
                    Default checkbox
                  </label>
                </div> */}
                      </div>
                      <div
                        onClick={toggleModal}
                        className="text-blue-400 hover:text-blue-200 text-sm font-bold text-right flex-[1_1] cursor-pointer"
                      >
                        Lupa kata sandi?
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="bg-pallete-3 disabled:bg-gray-100 text-gray-300 transition-all ease-linear duration-200 min-w-[48px] py-3 px-4 rounded shadow-md inline-block text-center text-lg w-full font-semibold"
                        disabled={isFormEmpty() || submitStatus}
                      >
                        {submitStatus ? (
                          <ThreeDots
                            visible={true}
                            color="#223893"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            width={"48px"}
                            height={"26px"}
                            wrapperStyle={{}}
                            wrapperClass="w-full justify-center"
                          />
                        ) : (
                          "Masuk"
                        )}
                      </button>
                    </div>
                    <p className="text-gray-100 text-sm mt-10 text-center">
                      Belum punya akun?
                      <button
                        type="button"
                        onClick={() => movePageFunction("/user/sign_up")}
                        className="text-blue-400 hover:text-blue-200 font-semibold ml-1"
                      >
                        {" "}
                        Daftar
                      </button>
                    </p>
                  </form>
                </div>
                <Transition show={statemodal} as={Fragment}>
                  <Dialog
                    open={statemodal}
                    onClose={() => {}}
                    className="relative z-[9999]"
                  >
                    {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      {/* The backdrop, rendered as a fixed sibling to the panel container */}
                      <div
                        className="fixed inset-0 bg-black/50"
                        aria-hidden="true"
                      />
                    </Transition.Child>

                    {/* Full-screen scrollable container */}
                    <div className="fixed inset-0 w-screen overflow-y-auto">
                      {/* Container to center the panel */}
                      <div className="flex min-h-full items-center justify-center p-4">
                        {/*
                ...and another Transition.Child to apply a separate transition
                to the contents.
              */}
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          {/* The actual dialog panel  */}
                          <Dialog.Panel className="mx-auto w-[380px] sm:w-[580px] bg-pallete-4 shadow-default p-4 rounded-md">
                            {/* Handle close button */}
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
                            {/* Handle view content modal */}
                            <Dialog.Title
                              className={"text-xl font-bold text-gray-100 mb-2"}
                            >
                              Lupa kata sandi?
                            </Dialog.Title>
                            <Dialog.Description
                              className={"text-gray-100 text-sm mb-4"}
                            >
                              Tautan untuk mengatur ulang kata sandimu akan
                              dikirim ke emailmu.
                            </Dialog.Description>
                            <div className="mb-8">
                              <form onSubmit={onSubmitModal}>
                                <div className="">
                                  <input
                                    className="border border-solid border-gray-700 rounded-md block text-sm h-12 px-4 w-full mb-3"
                                    placeholder="Alamat Email"
                                    type="email"
                                    name="email"
                                    value={formDataModal.email}
                                    onChange={handleChangeModal}
                                    required
                                  ></input>
                                </div>
                                <div className="mt-8">
                                  <button
                                    type="submit"
                                    className="bg-pallete-3 disabled:bg-gray-400 text-white transition-all ease-linear duration-200 min-w-[48px] py-3 px-4 rounded shadow-md inline-block text-center text-lg w-full font-semibold"
                                    disabled={
                                      isFormEmptyModal() ||
                                      buttonresetpassworddisabled ||
                                      submitStatusModal
                                    }
                                  >
                                    {submitStatusModal ? (
                                      <ThreeDots
                                        visible={true}
                                        color="#223893"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        width={"48px"}
                                        height={"26px"}
                                        wrapperStyle={{}}
                                        wrapperClass="w-full justify-center"
                                      />
                                    ) : buttonresetpassworddisabled ? (
                                      `Tunggu ${countdownbuttonresetpassword}s`
                                    ) : (
                                      "Submit"
                                    )}
                                  </button>
                                </div>
                              </form>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
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

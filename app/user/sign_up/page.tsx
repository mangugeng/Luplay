"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { analytics, auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/loading";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
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
    if (formData.phone != "") {
      const { phone } = formData;

      if (!isPhoneNumberValid(phone)) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "fullname" && value.length <= 32) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (name !== "fullname") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handlePhoneBlur = () => {
    const { phone } = formData;

    if (!isPhoneNumberValid(phone)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };
  const handlePasswordBlur = () => {
    const { password } = formData;

    if (!isPasswordValid(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const isFormEmpty = () => {
    return Object.values(formData).some((value) => value === "");
  };
  const isPhoneNumberValid = (phone: string) => {
    const phoneNumberRegex = /^\d{10,}$/;
    return phoneNumberRegex.test(phone);
  };
  const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };
  const isPasswordNotMatch = () => {
    return formData.password !== formData.confirmpassword;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitStatus(true);

    await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    )
      .then(async (userCredential) => {
        const user = userCredential.user;
        await fetch("https://luplay.co.id/api/user/sign_up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData, id: user.uid }),
        })
          .then(async (response) => {
            if (response.status !== 200) {
              toast.error("Failed to write data", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
              await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
              ).then(async (userCredential) => {
                const response = await fetch(
                  "https://luplay.co.id/api/user/sign_in",
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${await user.getIdToken()}`,
                    },
                  }
                );
                if (response.status === 200) {
                  router.push("/");
                } else {
                  toast.error("Failed to sign up. Status: " + response.status, {
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
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        toast.error(errorCode + ":" + errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

    setSubmitStatus(false);
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
                <div className="max-h-[41rem] overflow-auto w-[380px] sm:w-[480px] -translate-y-1/2 -translate-x-1/2 top-1/2 fixed p-12 my-auto left-1/2 shadow-lg rounded-lg bg-pallete-4">
                  <div className="text-gray-100 text-2xl font-bold mb-9 text-center">
                    Daftar
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
                  <form
                    onSubmit={onSubmit}
                    autoComplete="off"
                    className="mt-8 w-full "
                  >
                    <div className="relative">
                      <input
                        className="peer border border-solid border-gray-700 rounded-md block text-sm h-12 px-4 w-full mb-3"
                        placeholder="Nama Lengkap"
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                      ></input>
                      <div className="peer-focus:block hidden text-gray-600 font-normal tracking-[normal] leading-[1.33] absolute right-6 top-4">
                        <span>{formData.fullname.length}</span>
                        /32
                      </div>
                    </div>
                    <div className="">
                      <input
                        className="border border-solid border-gray-700 rounded-md block text-sm h-12 px-4 w-full mb-3"
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      ></input>
                    </div>
                    <div className="">
                      <input
                        className="border border-solid border-gray-700 rounded-md block text-sm h-12 px-4 w-full mb-3"
                        placeholder="Nomor Ponsel"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handlePhoneBlur}
                        autoComplete="none"
                        required
                      ></input>
                    </div>
                    <div className="relative">
                      <input
                        className="border border-solid border-gray-700 rounded-md block text-sm h-12 px-4 w-full mb-3 pr-14"
                        placeholder="Kata sandi (min. 6 karakter)"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handlePasswordBlur}
                        required
                      ></input>
                      <div
                        onClick={() =>
                          setShowPassword(
                            (prevShowPassword) => !prevShowPassword
                          )
                        }
                        className="absolute h-5 opacity-50 right-6 top-0 translate-y-[65%] w-6 cursor-pointer wrapper group"
                      >
                        {showPassword ? (
                          <EyeIcon className="group-hover:text-[#0000ff]"></EyeIcon>
                        ) : (
                          <EyeSlashIcon className="group-hover:text-[#0000ff]"></EyeSlashIcon>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        className="border border-solid border-gray-700 rounded-md block text-sm h-12 px-4 w-full mb-3 pr-14"
                        placeholder="Konfirmasi Kata Sandi"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmpassword"
                        value={formData.confirmpassword}
                        onChange={handleChange}
                        required
                      ></input>
                      <div
                        onClick={() =>
                          setShowConfirmPassword(
                            (prevShowConfirmPassword) =>
                              !prevShowConfirmPassword
                          )
                        }
                        className="absolute h-5 opacity-50 right-6 top-0 translate-y-[65%] w-6 cursor-pointer group"
                      >
                        {showConfirmPassword ? (
                          <EyeIcon className="group-hover:text-[#0000ff]"></EyeIcon>
                        ) : (
                          <EyeSlashIcon className="group-hover:text-[#0000ff]"></EyeSlashIcon>
                        )}
                      </div>
                    </div>
                    {phoneError && (
                      <div className="flex gap-x-2 text-red-400">
                        <div>
                          <ExclamationCircleIcon className="w-6"></ExclamationCircleIcon>
                        </div>
                        <p className="text-sm font-semibold mb-3">
                          No telepon minimal 10 angka, diawali dengan 0
                        </p>
                      </div>
                    )}
                    {passwordError && (
                      <div className="flex gap-x-2 text-red-400">
                        <div>
                          <ExclamationCircleIcon className="w-6"></ExclamationCircleIcon>
                        </div>
                        <p className="text-sm font-semibold mb-3">
                          Kata sandi harus memiliki setidaknya 1 huruf besar, 1
                          angka, dan minimal 6 karakter.
                        </p>
                      </div>
                    )}
                    {isPasswordNotMatch() && (
                      <div className="flex gap-x-2 text-red-400">
                        <div>
                          <ExclamationCircleIcon className="w-6"></ExclamationCircleIcon>
                        </div>
                        <p className="text-sm font-semibold ">
                          Passwords tidak sama.
                        </p>
                      </div>
                    )}
                    <div className="mt-4 mb-8 text-center text-xs text-gray-100">
                      Dengan mendaftar di Luplay kamu setuju untuk mengikuti{" "}
                      <Link
                        href="#"
                        className="text-blue-400 hover:text-blue-200 font-semibold"
                      >
                        Syarat Penggunaan
                      </Link>{" "}
                      &{" "}
                      <Link
                        href="#"
                        className="text-blue-400 hover:text-blue-200 font-semibold"
                      >
                        Kebijakan Privasi
                      </Link>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="bg-pallete-3 disabled:bg-gray-100 text-gray-300 transition-all ease-linear duration-200 min-w-[48px] py-3 px-4 rounded shadow-md inline-block text-center text-lg w-full font-semibold"
                        disabled={
                          isFormEmpty() ||
                          phoneError ||
                          passwordError ||
                          isPasswordNotMatch() ||
                          submitStatus
                        }
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
                          "Daftar"
                        )}
                      </button>
                    </div>
                    <p className="text-gray-100 text-sm mt-10 text-center">
                      Sudah punya akun?
                      <button
                        type="button"
                        className="text-blue-400 hover:text-blue-200 font-semibold ml-1"
                        onClick={() => movePageFunction("/user/sign_in")}
                      >
                        {" "}
                        Masuk
                      </button>
                    </p>
                  </form>
                </div>
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

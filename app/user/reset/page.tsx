"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { analytics, auth } from "@/lib/firebase";
import { applyActionCode } from "firebase/auth";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import Loading from "@/components/Loading/loading";

export default function Page() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [statusreset, setStatusReset] = useState(false);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [colorchange, setColorChange] = useState<boolean>(false);
  const [statusverification, setStatusVerification] = useState<
    boolean | undefined
  >(undefined);

  const curtaincontentRef = useRef<HTMLDivElement>(null);

  const handleResetPassword = async (
    actionCode: string | null,
    lang: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/user/reset/GET?mode=resetPassword&oobCode=${actionCode}&lang=${lang}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        setStatusVerification(false);
      } else {
        setStatusVerification(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordBlur = () => {
    const { password } = formData;

    if (!isPasswordValid(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  const isPasswordNotMatch = () => {
    return formData.password !== formData.confirmpassword;
  };

  const isFormEmpty = () => {
    return Object.values(formData).some((value) => value === "");
  };

  useEffect(() => {
    // Get the action to complete.
    const mode = searchParams.get("mode");
    // Get the one-time code from the query parameter.
    const actionCode = searchParams.get("oobCode");
    // (Optional) Get the language code if available.
    const lang = searchParams.get("lang") || "en";

    // Handle the user management action.
    switch (mode) {
      case "resetPassword":
        // Display email verification handler and UI.
        handleResetPassword(actionCode, lang);
        break;
      default:
        setStatusVerification(false);
        throw new Error("Invalid mode / code");
    }
  }, [searchParams]);
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
    if (typeof window !== "undefined") {
      analytics
      if (statusverification !== undefined) {
        setPageLoaded(true);
        setCheckboxCurtain(true);
      }
    }
  }, [statusverification]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitStatus(true);
    if (statusverification) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/user/reset/PATCH?oobCode=${searchParams.get(
            "oobCode"
          )}`,
          {
            method: "PATCH",
            body: JSON.stringify({ password: formData.password }),
          }
        );

        if (!response.ok) {
          toast.error("Error memperbarui kata sandi", {
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
          setStatusReset(true);
        }
      } catch (error: any) {
        console.error("Error :", error.message);
      }
    }
    setSubmitStatus(false);
  };

  return (
    <>
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
              <div className="min-h-[96vh] mx-auto before:content-[''] before:table">
                <div className="float-right w-full">
                  <div className="mt-14 overflow-hidden">
                    <main className="mx-auto w-[380px] sm:w-[580px] p-6 block before:content-[''] before:table">
                      <div className="hidden xl:block sections-overlay-background"></div>
                      <div className="bg-pallete-4 rounded-2xl shadow-md xl:mt-10 py-5 px-8 md:py-10 md:px-16 after:content-[''] after:table after:clear-both">
                        <section className="w-full mx-auto mb-6 relative block">
                          <div className="mb-4 lg:mb-8 flex justify-center ">
                            <h2 className="text-xl font-bold text-gray-100 capitalize">
                              Atur Ulang Kata Sandi
                            </h2>
                          </div>
                          <div>
                            {!statusreset ? (
                              <>
                                <Image
                                  src={"/reset-password.svg"}
                                  alt="luplay-email-verification"
                                  className="h-40 w-40 mx-auto"
                                  width={1980}
                                  height={720}
                                  priority
                                />
                                {statusverification ? (
                                  <form
                                    onSubmit={onSubmit}
                                    className="mt-8 w-full"
                                  >
                                    <div className="relative">
                                      <input
                                        className="border border-solid border-gray-700 rounded-md block text-sm h-12 px-4 w-full mb-3 pr-14"
                                        placeholder="Kata sandi (min. 6 karakter)"
                                        type={
                                          showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handlePasswordBlur}
                                        required
                                      ></input>
                                      <div
                                        onClick={() =>
                                          setShowPassword(
                                            (prevShowPassword) =>
                                              !prevShowPassword
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
                                        type={
                                          showConfirmPassword
                                            ? "text"
                                            : "password"
                                        }
                                        name="confirmpassword"
                                        value={formData.confirmpassword}
                                        onChange={handleChange}
                                        autoComplete="new-password"
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
                                    {passwordError && (
                                      <div className="flex gap-x-2 text-red-400">
                                        <div>
                                          <ExclamationCircleIcon className="w-6"></ExclamationCircleIcon>
                                        </div>
                                        <p className="text-sm font-semibold mb-3">
                                          Kata sandi harus memiliki setidaknya 1
                                          huruf besar, 1 angka, dan minimal 6
                                          karakter.
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
                                    <div className="mt-4 flex px-2">
                                      <div className="flex-[1_1]"></div>
                                    </div>
                                    <div className="mt-4">
                                      <button
                                        type="submit"
                                        className="bg-pallete-3 disabled:bg-gray-100 text-gray-300 transition-all ease-linear duration-200 min-w-[48px] py-3 px-4 rounded shadow-md inline-block text-center text-lg w-full font-semibold"
                                        disabled={
                                          isFormEmpty() ||
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
                                          "Submit"
                                        )}
                                      </button>
                                    </div>
                                  </form>
                                ) : (
                                  <div className="text-center">
                                    <h3 className="text-lg font-medium text-white">
                                      Oops! &#128532;
                                    </h3>
                                    <p className="text-base font-medium text-white">
                                      Kode verifikasi sudah tidak berlaku, coba
                                      lagi
                                    </p>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <Image
                                  src={"/success.svg"}
                                  alt="luplay-email-verification"
                                  className="h-40 w-40 mx-auto mb-4 lg:mb-8 "
                                  width={1980}
                                  height={720}
                                  priority
                                />
                                <div className="text-center">
                                  <h3 className="text-lg font-medium text-white">
                                    Selamat! &#127881;
                                  </h3>
                                  <p className="text-base font-medium text-white">
                                    Kata sandi berhasil dirubah
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </section>
                      </div>
                    </main>
                  </div>
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
    </>
  );
}

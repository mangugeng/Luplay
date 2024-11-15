"use client";

import { useEffect, useRef, useState, Fragment, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import NavbarBottomMobile from "@/components/Navbar/navbar-bottom-mobile";
import Navbar from "@/components/Navbar/navbar";
import NavbarMobile from "../components/navbar";
import Image from "next/image";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  deleteUser,
  linkWithRedirect,
  sendEmailVerification,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { analytics, auth } from "@/lib/firebase";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import Loading from "@/components/Loading/loading";

export default function Profile() {
  const router = useRouter();

  const [datauser, setDataUser] = useState<any[]>([]);
  const [formData, setFormData] = useState<{
    fullname: string;
    username: string;
    phone: string;
    gender: string;
    birthdate: any;
    photo: any;
  }>({
    fullname: "",
    username: "",
    phone: "",
    gender: "",
    birthdate: "",
    photo: "",
  });
  const [isFormChanged, setFormChanged] = useState<boolean>(false);
  const [buttoneditprofiledisabled, setButtonEditProfileDisabled] =
    useState(false);
  const [countdownbuttoneditprofile, setCountdownButtonEditProfile] =
    useState(0);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [devicemobile, setDeviceMobile] = useState<boolean>(false);
  const [colorchange, setColorChange] = useState<boolean>(false);

  const curtaincontentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://luplay.co.id/api/user/", {
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
        setPageLoaded(true);
        setCheckboxCurtain(true);
        const initialData = {
          fullname: datauser.map((item: any) => item.name).toLocaleString(),
          username: datauser.map((item: any) => item.username).toLocaleString(),
          phone: datauser.map((item: any) => item.phone).toLocaleString(),
          gender: datauser.map((item: any) => item.gender).toLocaleString(),
          birthdate: datauser
            .map((item: any) => item.birthdate)
            .toLocaleString(),
          photo:
            datauser
              .map((item: any) => item.profileImageUrl)
              .toLocaleString() == ""
              ? ""
              : datauser
                  .map((item: any) => item.profileImageUrl)
                  .toLocaleString(),
        };

        setFormData(initialData);
      }
    }
  }, [datauser, datauser.length]);
  useEffect(() => {
    const lastClickTimeEditProfileString = localStorage.getItem(
      "lastClickTimeEditProfile"
    );
    const lastClickTimeEditProfile = lastClickTimeEditProfileString
      ? parseInt(lastClickTimeEditProfileString, 10)
      : 0;

    const currentTime = new Date().getTime();

    const timeDifference = currentTime - lastClickTimeEditProfile;

    let countdownInterval: any;

    if (timeDifference < 60000) {
      setButtonEditProfileDisabled(true);

      const remainingTime = Math.floor((60000 - timeDifference) / 1000);
      setCountdownButtonEditProfile(remainingTime);

      countdownInterval = setInterval(() => {
        setCountdownButtonEditProfile((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
        setButtonEditProfileDisabled(false);
      }, 60000 - timeDifference);
    } else {
      setButtonEditProfileDisabled(false);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "photo") {
      const selectedFile = e.target.files?.[0];

      if (selectedFile) {
        const fileSizeInMB = selectedFile.size / (1024 * 1024);

        if (fileSizeInMB > 1) {
          toast.error("Ukuran file melebihi 1MB", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }

        setFormData((prevData) => ({
          ...prevData,
          photo: selectedFile,
        }));
      }
    } else if (name === "gender") {
      setFormData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else if (
      name === "fullname" &&
      /^[a-zA-Z\s]*$/.test(value) &&
      value.length <= 32
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (
      name === "username" &&
      /^[a-z0-9_.]*$/.test(value) &&
      value.length <= 22
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (name !== "fullname" && name !== "username") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    setFormChanged(true);
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(true);
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("id", auth.currentUser?.uid || "");

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch("https://luplay.co.id/api/user/edit", {
        method: "PATCH",
        body: formDataToSend,
      });

      if (!response.ok) {
        toast.error("Error memperbarui profil, coba lagi!", {
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
        toast.success("Profil berhasil diperbarui!", {
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
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setSubmitStatus(false);
      const lastClickTimeEditProfile = new Date().getTime();
      localStorage.setItem(
        "lastClickTimeEditProfile",
        lastClickTimeEditProfile.toString()
      );

      setButtonEditProfileDisabled(true);

      setTimeout(() => {
        setButtonEditProfileDisabled(false);
      }, 60000);

      setCountdownButtonEditProfile(60);
      const countdownInterval = setInterval(() => {
        setCountdownButtonEditProfile((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
      }, 60000);
    }
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
                    <div className="mx-4 sm:mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-6 md:mt-12 before:content-[' '] before:table">
                      <div className="mb-16 md:mb-0">
                        <div className="text-[22px] font-semibold text-white md:block hidden">
                          Ubah Profil
                        </div>
                        <form onSubmit={onSubmit} className="mt-10 w-full">
                          <div className="flex gap-4 md:gap-0 items-start">
                            <div className="hidden md:block flex-[1_1] leading-[48px]">
                              <label
                                className="leading-[1] font-medium text-white text-base inline-block"
                                htmlFor=""
                              >
                                Foto Profil
                              </label>
                              <div className="text-gray-600 text-xs leading-[1]">
                                Maks. 1MB
                              </div>
                            </div>
                            <div className="flex items-center justify-center flex-[3.5_1] relative">
                              {formData.photo == "" ? (
                                <>
                                  <div className="border-2 leading-[76px] text-4xl w-20 bg-pallete-2 inline-block text-center rounded-full text-gray-900">
                                    IF
                                  </div>
                                  <div
                                    onClick={handleDivClick}
                                    className="bg-black rounded-full h-8 md:left-6 opacity-60 absolute md:right-0 top-6 w-8 cursor-pointer"
                                  >
                                    <Image
                                      src={"/photo.svg"}
                                      alt="luplay-change-photo"
                                      className="h-6 w-6 absolute left-1 top-1"
                                      width={24}
                                      height={24}
                                    />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div
                                    className="relative border-2 leading-[76px] rounded-full inline-block h-[76px] w-[76px] bg-no-repeat bg-center bg-cover"
                                    style={{
                                      backgroundImage: `url(${
                                        typeof formData.photo === "string"
                                          ? formData.photo
                                          : URL.createObjectURL(
                                              new Blob([formData.photo], {
                                                type: "image/*",
                                              })
                                            )
                                      })`,
                                    }}
                                  ></div>
                                  <div
                                    onClick={handleDivClick}
                                    className="bg-black rounded-full h-8 left-6 opacity-60 absolute right-0 top-6 w-8 cursor-pointer"
                                  >
                                    <Image
                                      src={"/photo.svg"}
                                      alt="luplay-change-photo"
                                      className="h-6 w-6 absolute left-1 top-1"
                                      width={24}
                                      height={24}
                                    />
                                  </div>
                                </>
                              )}
                              <input
                                accept="image/*"
                                id="user_photo_button"
                                className="hidden"
                                type="file"
                                name="photo"
                                ref={fileInputRef}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row gap-x-4 md:gap-0 items-start mt-4">
                            <label
                              className="flex-[1_1] text-base font-medium leading-[48px] text-white"
                              htmlFor=""
                            >
                              Nama Lengkap
                            </label>
                            <div className="w-full md:flex-[3.5_1] relative">
                              <input
                                className="peer bg-transparent border border-gray-600 rounded block text-base h-12 px-4 w-full hover:border-[#2563eb] text-white"
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleInputChange}
                                required
                              />
                              <div className="peer-focus:block hidden text-gray-600 font-normal tracking-[normal] leading-[1.33] absolute right-6 top-4">
                                <span>{formData.fullname.length}</span>
                                /32
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row gap-x-4 md:gap-0 items-start mt-4">
                            <label
                              className="flex-[1_1] text-base font-medium leading-[48px] text-white"
                              htmlFor=""
                            >
                              Nama Pengguna
                            </label>
                            <div className="w-full md:flex-[3.5_1] relative before:text-gray-600 before:text-base before:left-4 before:absolute before:top-3 before:content-['@']">
                              <input
                                className="peer bg-transparent border border-gray-600 rounded block text-base h-12 pl-10 pr-4 w-full hover:border-[#2563eb] text-white"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                              />
                              <div className="peer-focus:block hidden text-gray-600 font-normal tracking-[normal] leading-[1.33] absolute right-6 top-4">
                                <span>{formData.username.length}</span>
                                /22
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row gap-x-4 md:gap-0 items-start mt-4">
                            <label
                              className="flex-[1_1] text-base font-medium leading-[48px] text-white"
                              htmlFor=""
                            >
                              Nomor Ponsel
                            </label>
                            <div className="w-full md:flex-[3.5_1] relative">
                              <input
                                className="peer bg-transparent border border-gray-600 rounded block text-base h-12 px-4 w-full hover:border-[#2563eb] text-white"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row gap-x-4 md:gap-0 items-start mt-4">
                            <label
                              className="flex-[1_1] text-base font-medium leading-[48px] text-white"
                              htmlFor=""
                            >
                              Jenis Kelamin
                            </label>
                            <div className="flex-[3.5_1] relative">
                              <div className="inline-flex items-center text-sm relative leading-[48px] h-12">
                                <input
                                  id="user-male"
                                  type="radio"
                                  value="male"
                                  name="gender"
                                  checked={formData.gender == "male"}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                  onChange={handleInputChange}
                                />
                                <label
                                  htmlFor="user-male"
                                  className="ms-2 text-sm font-medium text-white"
                                >
                                  Pria
                                </label>
                              </div>
                              <div className="inline-flex items-center text-sm relative leading-[48px] h-12 ml-4">
                                <input
                                  id="user-female"
                                  type="radio"
                                  value="female"
                                  name="gender"
                                  checked={formData.gender == "female"}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                  onChange={handleInputChange}
                                />
                                <label
                                  htmlFor="user-female"
                                  className="ms-2 text-sm font-medium text-white"
                                >
                                  Wanita
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row gap-x-4 md:gap-0 items-start mt-4">
                            <label
                              className="flex-[1_1] text-base font-medium leading-[48px] text-white"
                              htmlFor=""
                            >
                              Tanggal Lahir
                            </label>
                            <div className="w-full md:flex-[3.5_1] relative">
                              <input
                                className="peer bg-transparent border border-gray-600 rounded block text-base h-12 px-4 w-full hover:border-[#2563eb] text-white"
                                type="date"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row gap-x-4 md:gap-0 items-start mt-4 justify-end">
                            <button
                              className="w-36 transition-all ease-linear duration-200 min-w-[48px] py-3 px-4 bg-pallete-4 rounded text-white inline-block text-sm md:text-base text-center font-semibold disabled:bg-gray-400"
                              type="submit"
                              disabled={
                                !isFormChanged ||
                                submitStatus ||
                                buttoneditprofiledisabled
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
                              ) : buttoneditprofiledisabled ? (
                                `Tunggu ${countdownbuttoneditprofile}s`
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </div>
                        </form>
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
              <a href="https://luplay.co.id/" className="hover:underline">
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

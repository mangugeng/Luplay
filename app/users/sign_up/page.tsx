"use client";

import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <>
      <div className="block h-0"></div>
      <header className="fixed w-full z-10 top-0 bg-pallete-5 shadow-md">
        <Navbar></Navbar>
      </header>
      <div>
        <div className="w-[480px] -translate-y-1/2 -translate-x-1/2 top-1/2 absolute p-12 my-auto left-1/2 shadow-lg rounded-lg bg-pallete-4">
          <div className="text-gray-100 text-2xl font-bold mb-9 text-center">
            Daftar
          </div>
          <div className="flex justify-between">
            <form className="flex-[0_0_48%] relative before:bg-google before:bg-white before:bg-cover before:bg-no-repeat before:rounded-full before:content-[''] before:block before:h-8 before:left-2 m-auto before:absolute before:top-1/2 before:-translate-y-1/2 before:w-8">
              <button
                type="submit"
                className="bg-[#4285f4] border-none rounded-3xl shadow-md text-gray-100 text-sm font-bold h-12 py-3 pr-5 pl-10 text-center w-full transition-all ease-linear duration-200"
              >
                Google
              </button>
            </form>
          </div>
          <form className="mt-8 w-full ">
            <div className="">
              <input
                className="border border-solid border-gray-700 rounded-md block text-sm h-12 px-4 w-full mb-3"
                placeholder="Nomor ponsel / Email"
                type="text"
                name="user[login]"
                required
              ></input>
            </div>
            <div className="relative">
              <input
                className="border border-solid border-gray-700 rounded-md block text-sm h-12 px-4 w-full mb-3 pr-14"
                placeholder="Kata sandi (min. 8 karakter)"
                type="password"
                name="user[password]"
                required
              ></input>
              <div className="absolute h-5 opacity-50 right-6 top-0 translate-y-[65%] w-6">
                <EyeIcon></EyeIcon>
              </div>
            </div>
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
                className="bg-gray-100 text-gray-300 transition-all ease-linear duration-200 min-w-[48px] py-3 px-4 rounded shadow-md inline-block text-center text-lg w-full font-semibold"
              >
                Daftar
              </button>
            </div>
            <p className="text-gray-100 text-sm mt-10 text-center">
              Sudah punya akun?
              <Link
                href="/users/login"
                className="text-blue-400 hover:text-blue-200 font-semibold"
              >
                {" "}
                Masuk
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

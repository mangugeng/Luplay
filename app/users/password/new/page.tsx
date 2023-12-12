"use client";

import React from "react";
import Navbar from "../../components/navbar";

export default function Page() {
  return (
    <>
      <div className="block h-0"></div>
      <header className="relative w-full z-10 top-0 bg-black xl:bg-pallete-5 shadow-md">
        <Navbar></Navbar>
      </header>
      <div className="m-auto pt-16 w-[384px]">
        <div className="mb-10 text-center">
          <h1 className="text-gray-100 text-3xl font-semibold mb-6">
            Lupa kata sandi?
          </h1>
          <div className="text-gray-300 text-sm">
            Tautan untuk mengatur ulang kata sandimu akan dikirim ke emailmu.
          </div>
        </div>
        <div>
          <div className="mb-8">
            <form>
              <div className="">
                <input
                  className="border border-solid border-gray-700 rounded-md block text-sm h-12 px-4 w-full mb-3"
                  placeholder="Alamat Email"
                  type="text"
                  name="user[login]"
                  required
                ></input>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="bg-gray-100 text-gray-300 transition-all ease-linear duration-200 min-w-[48px] py-3 px-4 rounded shadow-md inline-block text-center text-lg w-full font-semibold mt-6"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

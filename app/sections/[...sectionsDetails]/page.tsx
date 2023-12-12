"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/navbar";
import Image from "next/image";
import post from "../../../public/post-1.webp";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Page() {
  return (
    <>
      <header className="fixed z-50 w-full top-0 bg-black xl:bg-pallete-5 shadow-md">
        <Navbar movePageFunction={function (param: string): void {
          throw new Error("Function not implemented.");
        } }></Navbar>
      </header>
      <div className="min-h-[96vh] mx-auto before:content-[''] before:table">
        <div className="float-right w-full">
          <div className="mt-14 overflow-hidden">
            <article className="px-6 block mx-auto max-w-6xl"></article>
            <main className="mx-auto max-w-6xl p-6 block before:content-[''] before:table">
              <div className="sections-overlay-background"></div>
              <div className="bg-pallete-4 rounded-2xl shadow-md mt-10 py-10 px-16 after:content-[''] after:table after:clear-both">
                <section className="w-full mx-auto mb-6 relative block">
                  <div className="mb-8 flex justify-between ">
                    <h2 className="text-xl font-bold text-gray-100">
                      <a href="#">Luplay Originals</a>
                    </h2>
                  </div>
                  <div className="relative">
                    <ul className="-ml-2 grid grid-cols-7">
                      <li className="p-2 inline-block align-top">
                        <div className="">
                          <a href="#" className="group">
                            <div className="pb-[148%] bg-pallete-2 shadow-md h-0 overflow-hidden relative">
                              <Image
                                src={post}
                                alt="Picture of the author"
                                className="h-auto min-h-full min-w-full block w-full brightness-75 transition-all ease-in duration-200 group-hover:brightness-100"
                              />
                            </div>
                          </a>
                        </div>
                      </li>
                      <li className="p-2 inline-block align-top">
                        <div className="">
                          <a href="#" className="group">
                            <div className="pb-[148%] bg-pallete-2 shadow-md h-0 overflow-hidden relative">
                              <Image
                                src={post}
                                alt="Picture of the author"
                                className="h-auto min-h-full min-w-full block w-full brightness-75 transition-all ease-in duration-200 group-hover:brightness-100"
                              />
                            </div>
                          </a>
                        </div>
                      </li>
                      <li className="p-2 inline-block align-top">
                        <div className="">
                          <a href="#" className="group">
                            <div className="pb-[148%] bg-pallete-2 shadow-md h-0 overflow-hidden relative">
                              <Image
                                src={post}
                                alt="Picture of the author"
                                className="h-auto min-h-full min-w-full block w-full brightness-75 transition-all ease-in duration-200 group-hover:brightness-100"
                              />
                            </div>
                          </a>
                        </div>
                      </li>
                      <li className="p-2 inline-block align-top">
                        <div className="">
                          <a href="#" className="group">
                            <div className="pb-[148%] bg-pallete-2 shadow-md h-0 overflow-hidden relative">
                              <Image
                                src={post}
                                alt="Picture of the author"
                                className="h-auto min-h-full min-w-full block w-full brightness-75 transition-all ease-in duration-200 group-hover:brightness-100"
                              />
                            </div>
                          </a>
                        </div>
                      </li>
                      <li className="p-2 inline-block align-top">
                        <div className="">
                          <a href="#" className="group">
                            <div className="pb-[148%] bg-pallete-2 shadow-md h-0 overflow-hidden relative">
                              <Image
                                src={post}
                                alt="Picture of the author"
                                className="h-auto min-h-full min-w-full block w-full brightness-75 transition-all ease-in duration-200 group-hover:brightness-100"
                              />
                            </div>
                          </a>
                        </div>
                      </li>
                      <li className="p-2 inline-block align-top">
                        <div className="">
                          <a href="#" className="group">
                            <div className="pb-[148%] bg-pallete-2 shadow-md h-0 overflow-hidden relative">
                              <Image
                                src={post}
                                alt="Picture of the author"
                                className="h-auto min-h-full min-w-full block w-full brightness-75 transition-all ease-in duration-200 group-hover:brightness-100"
                              />
                            </div>
                          </a>
                        </div>
                      </li>
                      <li className="p-2 inline-block align-top">
                        <div className="">
                          <a href="#" className="group">
                            <div className="pb-[148%] bg-pallete-2 shadow-md h-0 overflow-hidden relative">
                              <Image
                                src={post}
                                alt="Picture of the author"
                                className="h-auto min-h-full min-w-full block w-full brightness-75 transition-all ease-in duration-200 group-hover:brightness-100"
                              />
                            </div>
                          </a>
                        </div>
                      </li>
                      <li className="p-2 inline-block align-top">
                        <div className="">
                          <a href="#" className="group">
                            <div className="pb-[148%] bg-pallete-2 shadow-md h-0 overflow-hidden relative">
                              <Image
                                src={post}
                                alt="Picture of the author"
                                className="h-auto min-h-full min-w-full block w-full brightness-75 transition-all ease-in duration-200 group-hover:brightness-100"
                              />
                            </div>
                          </a>
                        </div>
                      </li>
                      <li className="p-2 inline-block align-top">
                        <div className="">
                          <a href="#" className="group">
                            <div className="pb-[148%] bg-pallete-2 shadow-md h-0 overflow-hidden relative">
                              <Image
                                src={post}
                                alt="Picture of the author"
                                className="h-auto min-h-full min-w-full block w-full brightness-75 transition-all ease-in duration-200 group-hover:brightness-100"
                              />
                            </div>
                          </a>
                        </div>
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="flex min-w-[40px] py-2 px-4 gap-x-2 bg-pallete-1 hover:bg-pallete-3 rounded shadow-lg text-gray-900 text-center items-center font-bold justify-center mt-5 w-full transition-all duration-200 ease-linear"
                    >
                      Lihat Lainnya
                      <ChevronDownIcon className="h-5 w-5"></ChevronDownIcon>
                    </button>
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

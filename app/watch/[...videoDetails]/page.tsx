"use client";

import React from "react";
import Navbar from "@/app/components/navbar";
import ReactPlayer from "react-player";

export default function Page() {
  return (
    <>
      <header className="fixed z-50 w-full top-0 bg-pallete-5 shadow-md">
        <Navbar></Navbar>
      </header>
      <div className="p-0 mx-auto before:content-[''] before:table">
        <main className="justify-between mx-auto max-w-[1360px] w-[1360px] py-8 grid gap-y-8 before:content-[''] before:table">
          <div className="min-h-[569px] w-[1012px] bg-black/40 block h-[441px] overflow-hidden relative">
            <div className="relative mb-0">
              <ReactPlayer
                width={"100%"}
                height={"100%"}
                controls={true}
                playsinline={true}
                url="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

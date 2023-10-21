"use client";

import React, { useRef } from "react";
import Navbar from "@/app/components/navbar";
import VideoPlayer from "./components/video-player";
import videojs from "video.js";

export default function Page() {
  const playerRef = useRef(null);

  const videoJsOptions = {
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      skipButtons: {
        backward: 10,
        forward:10
      },
    },
    preferFullWindow: true,
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });

  };
  return (
    <>
      <header className="fixed z-50 w-full top-0 bg-pallete-5 shadow-md">
        <Navbar></Navbar>
      </header>
      <div className="p-0 mx-auto before:content-[''] before:table">
        <main className="justify-between mx-auto max-w-[1360px] w-[1360px] py-8 grid gap-y-8 before:content-[''] before:table">
          <div className="min-h-[569px] w-[1012px] bg-black/40 block h-[441px] overflow-hidden relative">
            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
        </main>
      </div>
    </>
  );
}

import React, { useEffect, useRef, FC, useState } from "react";
import videojs from "video.js";
import "videojs-quality-selector-hls";
import "./video-js.css"; // Pastikan file CSS terkait dengan video.js telah diimpor

interface VideoJSProps {
  options: any;
  onReady?: (player: any) => void;
  handleAddView: () => void;
}

const VideoPlayer: FC<VideoJSProps> = (props) => {
  const placeholderRef = useRef(null);
  const videoRef = useRef<any | null>(null);

  const { options, onReady } = props;

  useEffect(() => {
    if (!videoRef.current) {
      const placeholderEl: any = placeholderRef.current;
      const videoElement = placeholderEl?.appendChild(
        document.createElement("video-js")
      );

      videoElement.classList.add("container-vjs");

      const player =
        videoRef.current ||
        (videoRef.current = videojs(videoElement, options, () => {
          // Register the quality selector plugin
          onReady && onReady(player);

          let qualityLevels = player.qualityLevels();

          // let enableQualityLevel = (level: number) => {
          //   for (var i = 0; i < qualityLevels.length; i++) {
          //     let qualityLevel = qualityLevels[i];
          //     qualityLevel.enabled = i === level ? true : false;
          //   }
          // };

          // qualityLevels.on("change", function () {
          //   enableQualityLevel(4);
          // });

          // Enable the quality selector plugin
          player.qualitySelectorHls();
        }));

      player.one("play", () => {
        props.handleAddView();
      });

      if (!player.src()) {
        const no_video = `
        <div>
        <div class='image'>
        </div>
        <h2>
          Oops...
        </h2>
        <p>
          Video sepertinya sedang diunggah, coba beberapa saat lagi!
        </p>
        </div>`;
        var contentEl = document.createElement("div");
        contentEl.classList.add("not-found-video");
        contentEl.innerHTML = no_video;
        player.createModal(contentEl);
      }
    } else {
      const player = videoRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, []);

  return <div className="h-full" ref={placeholderRef}></div>;
};

export default VideoPlayer;

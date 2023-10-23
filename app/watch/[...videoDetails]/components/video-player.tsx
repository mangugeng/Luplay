import React, { useEffect, useRef, FC } from "react";
import videojs from "video.js";
import "./video-js.css";
import '@videojs/http-streaming'

interface VideoJSProps {
  options: any;
  onReady?: (player: any) => void;
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

      videoElement.classList.add("!h-full");

      const player  = (videoRef.current = videojs(videoElement, options, () => {
        player.log("player is ready");
        onReady && onReady(player);
      }));
      
      // You can update player in the `else` block here, for example:
    } else {
      const player = videoRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, []);

  React.useEffect(() => {
    const player = videoRef.current;
    return () => {
      if (player) {
        player.dispose();
        videoRef.current = null;
      }
    };
  }, [videoRef]);

  return <div className="h-full" ref={placeholderRef}></div>;
};

export default VideoPlayer;

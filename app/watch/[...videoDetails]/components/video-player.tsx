import React, { useEffect, useRef, FC } from "react";
import videojs from "video.js";
import "./video-js.css";

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

      videoElement.classList.add(`container-vjs`);

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
  }, [onReady, options]);
  useEffect(() => {
    const player = videoRef.current;

  let qualityLevels = player.qualityLevels();
        // Listen to change events for when the player selects a new quality level
        qualityLevels.on('change', function () {
            console.log('Quality Level changed!');
            console.log('New level:', qualityLevels[qualityLevels.selectedIndex]);
        });      

        // show what levels are enabled
        let showEnabledLevels = () => {
            for (var i = 0; i < qualityLevels.length; i++) {
                let qualityLevel = qualityLevels[i];
                console.log(qualityLevel.enabled, qualityLevel.height);
            }            
        }

        // enable quality level by index, set other levels to false
        let enableQualityLevel = (level: number) => {

            for (var i = 0; i < qualityLevels.length; i++) {
                let qualityLevel = qualityLevels[i];
                qualityLevel.enabled = i === level ? true : false;
            }

            qualityLevels.selectedIndex_ = level;
            qualityLevels.trigger({ type: 'change', selectedIndex: level });    
        }


        // set min quality level
        document.getElementById("setMinLevel")?.addEventListener('click', () => {
            console.log("Set Min quality level")
            enableQualityLevel(0);          

            console.log("qualityLevels.selectedIndex: ", qualityLevels.selectedIndex);
            
            showEnabledLevels();
        })

        // set max quality level 
        document.getElementById("setMaxLevel")?.addEventListener('click', () => {
            console.log("Set Max quality level")
            enableQualityLevel(qualityLevels.length-1); 

            console.log("qualityLevels.selectedIndex: ", qualityLevels.selectedIndex);

            showEnabledLevels();
        })        

        player.on('timeupdate', function (){
            console.log("Playing now: ", player.videoHeight());
        })

        player.on('loadedmetadata', function () {

            // track currently rendered segments change
            let tracks = player.textTracks();
            let segmentMetadataTrack:any;

            for (let i = 0; i < tracks.length; i++) {
                if (tracks[i].label === 'segment-metadata') {
                    segmentMetadataTrack = tracks[i];
                }
            }

            let previousPlaylist:any;

            if (segmentMetadataTrack) {
                segmentMetadataTrack.on('cuechange', function () {
                    let activeCue = segmentMetadataTrack.activeCues[0];

                    if (activeCue) {
                        if (previousPlaylist !== activeCue.value.playlist) {
                            console.log('Switched from rendition ' + previousPlaylist +
                                ' to rendition ' + activeCue.value.playlist, activeCue.value.resolution.height);
                        }
                        previousPlaylist = activeCue.value.playlist;
                    }
                });
            }

        });
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

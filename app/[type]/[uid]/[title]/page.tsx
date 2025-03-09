"use client";

import React, { useState, useEffect, Fragment, useRef } from "react";
import Navbar from "../../../../components/Navbar/navbar";
import Image from "next/image";
import crown from "../../../../public/crown.png";
import { PlayCircleIcon, PlayIcon } from "@heroicons/react/24/solid";
import {
  ArrowLeftIcon,
  BookmarkIcon,
  BookmarkSquareIcon,
  ChevronUpDownIcon,
  ClipboardDocumentIcon,
  FunnelIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import handleViewport, { type InjectedViewportProps } from "react-in-viewport";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "@/components/Loading/loading";
import NavbarBottomMobile from "@/components/Navbar/navbar-bottom-mobile";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import styled from "styled-components";
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const filterepisode = [
  { id: 2, name: "Episode Awal" },
  { id: 1, name: "Episode Akhir" },
];

const filtertrailerextra = [
  { id: 1, name: "Trailer" },
  // { id: 2, name: "Extras" },
];

const Synopsis = (props: any | InjectedViewportProps<HTMLDivElement>) => {
  const { inViewport, forwardedRef } = props;
  const animate = inViewport ? "inviewport" : "outviewport";
  return (
    <>
      <div className={`${animate}`} ref={forwardedRef}>
        <p className="text-white block text-sm mt-3 whitespace-pre-wrap">
          {props.synopsis}
        </p>
      </div>
    </>
  );
};

const AllEpisode = (props: any | InjectedViewportProps<HTMLLIElement>) => {
  const { inViewport, forwardedRef } = props;
  const [loadedItems, setLoadedItems] = useState(5);
  const calculateDelay = (index: number) => {
    return index * 0.25;
  };
  const animate = inViewport ? "inviewport" : "outviewport";
  const loadMoreItems = () => {
    setLoadedItems((prev) => prev + 5);
  };
  return (
    <div>
      <ul className="all-episode-section" ref={forwardedRef}>
        {props.bucketdataepisode
          .slice(0, loadedItems)
          .map((item: any, index: number) => (
            <React.Fragment key={index}>
              <li
                className={`block list-episode ${animate}`}
                style={{ animationDelay: `${calculateDelay(index)}s` }}
              >
                <div
                  onClick={() =>
                    props.movePageFunction(
                      `/watch/${props.type[0]}/${props.type[1]}/${item.id_doc}`
                    )
                  }
                  className="group hover:cursor-pointer block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
                >
                  <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
                    <Image
                      src={item.image}
                      alt={item.title + `-landscape-thumbnails`}
                      className="align-middle h-full w-full absolute left-0 top-0"
                      width={640}
                      height={360}
                    />
                  </div>
                  <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
                    <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
                      {item.title}
                    </h3>
                    {/* <span className="text-gray-300 inline-block text-sm align-middle">
              43 menit
            </span> */}
                    <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold ml-3 py-1 px-2 text-center uppercase">
                      Gratis
                    </span>
                    <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal">
                      {item.synopsis.length > 150
                        ? `${item.synopsis.slice(0, 150)}...`
                        : item.synopsis}
                    </p>
                  </div>
                </div>
              </li>
            </React.Fragment>
          ))}
      </ul>
      {props.bucketdataepisode.length > 5 && (
        <div className="flex items-center justify-center pt-4">
          {loadedItems < props.bucketdataepisode.length && (
            <button
              className="inline-flex py-3 px-6 text-center bg-pallete-4 hover:bg-pallete-3 rounded-md font-bold items-center shadow-lg transition-all duration-200 ease-linear text-white "
              onClick={loadMoreItems}
            >
              Tampilkan Lebih Banyak
            </button>
          )}
          {loadedItems >= props.bucketdataepisode.length && (
            <button
              className="inline-flex py-3 px-6 text-center bg-pallete-4 hover:bg-pallete-3 rounded-md font-bold items-center shadow-lg transition-all duration-200 ease-linear text-white "
              onClick={() => setLoadedItems(5)}
            >
              Lebih Sedikit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const Trailer = (props: any | InjectedViewportProps<HTMLLIElement>) => {
  const { inViewport, forwardedRef } = props;
  const animate = inViewport ? "inviewport" : "outviewport";
  return props.bucketdatavideo.map((item: any, index: number) => (
    <React.Fragment key={index}>
      <li className={`block list-trailer ${animate}`} ref={forwardedRef}>
        <div
          onClick={() =>
            props.movePageFunction(
              `/watch/trailer-${props.type[0]}/${
                props.type[1]
              }/${item.title_trailer.replace(/\s+/g, "-")}`
            )
          }
          className="group hover:cursor-pointer block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
        >
          <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
            <Image
              src={item.image_trailer}
              alt={item.title_trailer + `-landscape-thumbnails`}
              className="align-middle h-full w-full absolute left-0 top-0"
              width={640}
              height={360}
            />
          </div>
          <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
            <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
              {item.title_trailer} - Luplay Original Series | Official Trailer
            </h3>
            {/* <span className="text-gray-300 inline-block text-sm align-middle">
              &lt; 1 menit
            </span> */}
            <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold py-1 px-2 text-center uppercase">
              gratis
            </span>
            <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal">
              {item.synopsis_trailer.length > 150
                ? `${item.synopsis_trailer.slice(0, 150)}...`
                : item.synopsis_trailer}
            </p>
          </div>
        </div>
      </li>
    </React.Fragment>
  ));
};

// const Extras = (props: InjectedViewportProps<HTMLLIElement>) => {
//   const { inViewport, forwardedRef } = props;
//   const animate = inViewport ? "inviewport" : "outviewport";
//   return (
//     <>
//       <li className={`block list-extras ${animate}`} ref={forwardedRef}>
//         <a
//           href="#"
//           className="group block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
//         >
//           <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
//             <Image
//               src={extra}
//               alt="Picture of the author"
//               className="align-middle h-full w-full absolute left-0 top-0"
//             />
//           </div>
//           <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
//             <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
//               Merajut Dendam - Luplay Original Series | Next On Episode 2
//             </h3>
//             <span className="text-gray-300 inline-block text-sm align-middle">
//               1 menit
//             </span>
//             <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold py-1 px-2 text-center uppercase">
//               gratis
//             </span>
//             <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal"></p>
//           </div>
//         </a>
//       </li>
//       <li className={`block list-extras ${animate}`}>
//         <a
//           href="#"
//           className="group block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
//         >
//           <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
//             <Image
//               src={extra}
//               alt="Picture of the author"
//               className="align-middle h-full w-full absolute left-0 top-0"
//             />
//           </div>
//           <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
//             <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
//               Merajut Dendam - Luplay Original Series | Next On Episode 2
//             </h3>
//             <span className="text-gray-300 inline-block text-sm align-middle">
//               1 menit
//             </span>
//             <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold py-1 px-2 text-center uppercase">
//               gratis
//             </span>
//             <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal"></p>
//           </div>
//         </a>
//       </li>
//       <li className={`block list-extras ${animate}`}>
//         <a
//           href="#"
//           className="group block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
//         >
//           <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
//             <Image
//               src={extra}
//               alt="Picture of the author"
//               className="align-middle h-full w-full absolute left-0 top-0"
//             />
//           </div>
//           <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
//             <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
//               Merajut Dendam - Luplay Original Series | Next On Episode 2
//             </h3>
//             <span className="text-gray-300 inline-block text-sm align-middle">
//               1 menit
//             </span>
//             <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold py-1 px-2 text-center uppercase">
//               gratis
//             </span>
//             <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal"></p>
//           </div>
//         </a>
//       </li>
//     </>
//   );
// };

const SimilarVideo = (props: any | InjectedViewportProps<HTMLLIElement>) => {
  const { inViewport, forwardedRef } = props;
  const animate = inViewport ? "inviewport" : "outviewport";
  const [bucketdata, setBucketData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(
          props.type == "movies"
            ? `https://luplay.co.id/api/data/video/movies`
            : `https://luplay.co.id/api/data/video/series`,
          {
            method: "GET",
          }
        ).then(async (response) => {
          const data = await response.json();

          if (response.status != 200) {
            // console.error(response);
          } else {
            setBucketData(
              data.bucketdata.filter((item: any) => {
                return (
                  item.genre.value === props.genre &&
                  item.id_doc !== props.except &&
                  item.status !== "incomplete"
                );
              })
            );
            props.setLengthBucketSimilar(
              data.bucketdata.filter((item: any) => {
                return (
                  item.genre.value === props.genre &&
                  item.id_doc !== props.except &&
                  item.status !== "incomplete"
                );
              }).length
            );
          }
        });
      } catch (error: any) {
        throw new Error(error.messages);
      }
    };

    fetchData();
  }, [props]);

  return (
    <>
      {bucketdata.length !== 0 ? (
        bucketdata.map((item: any, index: number) => (
          <li
            className={`inline-block m-2 w-[calc(33.33%-16px)] md:w-[calc(25.33%-20px)] lg:m-3 lg:w-[calc(20%-24px)] list-similar-video ${
              props.devicemobile ? "" : animate
            }`}
            ref={forwardedRef}
            key={index}
          >
            <button
              onClick={() =>
                props.movePageFunction(
                  `/${item.type}/${item.id_doc}/${item.title.replace(
                    /\s+/g,
                    "-"
                  )}`
                )
              }
              className="group"
            >
              <div className="relative overflow-hidden rounded-md">
                <Image
                  src={item.image_potrait_thumbnail}
                  width={156}
                  height={225}
                  className="rounded-md brightness-75 transition-all ease-in duration-200 group-hover:brightness-100 group-hover:scale-105"
                  alt={item.title + `-potrait-thumbnails`}
                />
              </div>
            </button>
          </li>
        ))
      ) : (
        // <li className="ml-[0.85rem] text-white">
        //   Opss... Tidak ada yang ditampilkan
        // </li>
        <></>
      )}
    </>
  );
};

const ViewSynopsis = handleViewport(Synopsis /** options: {}, config: {} **/);
const ViewAllEpisode = handleViewport(
  AllEpisode /** options: {}, config: {} **/
);
const ViewTrailer = handleViewport(Trailer /** options: {}, config: {} **/);
// const ViewExtras = handleViewport(Extras /** options: {}, config: {} **/);
const ViewSimilarVideo = handleViewport(
  SimilarVideo /** options: {}, config: {} **/
);

// Tambahkan styles untuk hero section
const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9));
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 33.33%; // 1/3 dari lebar layar
    height: 100%;
    background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, transparent 100%);
    z-index: 1;
  }

  @media (max-width: 768px) {
    height: 60vh;
  }

  .hero-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent);
    color: white;
    z-index: 2;

    @media (max-width: 768px) {
      padding: 1.5rem;
    }
  }

  .title-section {
    max-width: 800px;
    margin-bottom: 1.5rem;

    h1 {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 1rem;
      line-height: 1.2;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .metadata {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 0.9rem;

      .badge {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        background: rgba(255,255,255,0.2);
      }
    }

    .synopsis {
      font-size: 1rem;
      line-height: 1.6;
      opacity: 0.9;
      max-width: 600px;
      margin-bottom: 1.5rem;

      @media (max-width: 768px) {
        font-size: 0.9rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.2s;

      svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      &.primary {
        background: #E50914;
        color: white;
        
        &:hover {
          background: #F40612;
          transform: scale(1.05);
        }
      }

      &.secondary {
        background: rgba(255,255,255,0.2);
        color: white;
        
        &:hover {
          background: rgba(255,255,255,0.3);
        }
      }

      @media (max-width: 768px) {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;

        svg {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }
`;

// Tambahkan styles untuk content section
const ContentSection = styled.section`
  padding: 2rem;
  background: #141414;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  .content-header {
    max-width: 1200px;
    margin: 0 auto 2rem;
  }

  .tab-list {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 768px) {
      gap: 1.5rem;
    }
  }

  .tab {
    color: rgba(255,255,255,0.7);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    padding-bottom: 0.5rem;
    white-space: nowrap;

    &:hover {
      color: white;
    }

    &.active {
      color: white;

      &:after {
        content: '';
        position: absolute;
        bottom: -1rem;
        left: 0;
        right: 0;
        height: 2px;
        background: #e50914;
      }
    }
  }

  .episodes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
  }

  .filter-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .filter-label {
      font-size: 0.9rem;
      color: rgba(255,255,255,0.7);
    }

    .filter-button {
      padding: 0.5rem 1rem;
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
      font-size: 0.9rem;
      color: white;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: rgba(255,255,255,0.2);
      }

      svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }
`;

const VideoPlayer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #000;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        rgba(0,0,0,0.95) 0%,
        rgba(0,0,0,0.7) 30%,
        rgba(0,0,0,0.4) 60%,
        rgba(0,0,0,0.2) 100%
      );
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 4rem;
    background: linear-gradient(
      0deg,
      rgba(0,0,0,0.9) 0%,
      rgba(0,0,0,0.8) 20%,
      rgba(0,0,0,0) 100%
    );
    color: white;
    z-index: 2;

    @media (max-width: 768px) {
      padding: 2rem;
    }

    .title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      line-height: 1.2;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .metadata {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;

      .badge {
        background: rgba(255,255,255,0.2);
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        backdrop-filter: blur(4px);
      }

      @media (max-width: 768px) {
        font-size: 0.9rem;
        flex-wrap: wrap;
      }
    }

    .synopsis {
      max-width: 600px;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      opacity: 0.9;

      @media (max-width: 768px) {
        font-size: 0.9rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    .actions {
      display: flex;
      gap: 1rem;
      
      @media (max-width: 768px) {
        flex-wrap: wrap;
      }

      button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        transition: all 0.3s ease;

        &.primary {
          background: #E50914;
          color: white;
          
          &:hover {
            transform: scale(1.05);
            background: #F40612;
          }
        }

        &.secondary {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(4px);
          
          &:hover {
            background: rgba(255,255,255,0.3);
          }
        }

        @media (max-width: 768px) {
          width: 100%;
          justify-content: center;
        }
      }
    }
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    background: rgba(255,255,255,0.2);
    border: none;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 3;
    transition: all 0.3s ease;
    backdrop-filter: blur(4px);

    &:hover {
      transform: translate(-50%, -50%) scale(1);
      background: rgba(255,255,255,0.3);
    }

    svg {
      width: 30px;
      height: 30px;
      fill: white;
    }
  }
`;

const Footer = styled.footer`
  background: #111;
  padding: 2rem 0;
  color: white;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    .footer-section {
      h3 {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 0.5rem;
          opacity: 0.7;
          transition: opacity 0.2s;
          cursor: pointer;

          &:hover {
            opacity: 1;
          }
        }
      }
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
      padding: 0 1rem;
      gap: 1.5rem;

      .footer-section {
        h3 {
          font-size: 1rem;
        }

        ul li {
          font-size: 0.875rem;
        }
      }
    }
  }

  .footer-bottom {
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255,255,255,0.1);
    opacity: 0.7;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0;

    .footer-bottom {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      font-size: 0.875rem;
    }
  }
`;

const EpisodeCard = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  img {
    object-fit: cover;
  }

  .content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
    color: white;
  }

  .badge {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px 8px;
    background: rgba(255,255,255,0.9);
    color: black;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }
`;

function VideoPlayerComponent({ 
  videoUrl, 
  posterUrl, 
  title, 
  metadata, 
  synopsis,
  onAddWatchlist,
  onShare
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    try {
      setIsLoading(true);
      if (isPlaying) {
        await videoRef.current.pause();
      } else {
        await videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      setError('Gagal memutar video. Silakan coba lagi.');
      console.error('Video playback error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
      video.currentTime = 0;
    };

    const handleError = (e) => {
      setError('Terjadi kesalahan saat memuat video.');
      console.error('Video error:', e);
    };

    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);

    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
    };
  }, []);

  return (
    <VideoPlayer>
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          playsInline
          preload="metadata"
          poster={posterUrl}
        />
      )}
      <div className="poster">
        <Image
          src={posterUrl || '/default-poster.jpg'}
          alt={title}
          fill
          sizes="100vw"
          priority
          quality={90}
        />
      </div>
      {!isPlaying && videoUrl && (
        <button 
          className="play-button" 
          onClick={handlePlayPause}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          ) : (
            <PlayIcon className="w-8 h-8" />
          )}
        </button>
      )}
      <div className="overlay">
        <h1 className="title">{title}</h1>
        <div className="metadata">
          {metadata}
        </div>
        <p className="synopsis">{synopsis}</p>
        <div className="actions">
          <button className="primary" onClick={handlePlayPause}>
            <PlayIcon className="w-5 h-5" />
            Putar Sekarang
          </button>
          <button className="secondary" onClick={onAddWatchlist}>
            <BookmarkIcon className="w-5 h-5" />
            Tambah ke Watchlist
          </button>
          <button className="secondary" onClick={onShare}>
            <ShareIcon className="w-5 h-5" />
            Bagikan
          </button>
        </div>
      </div>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center p-4">
            <p className="text-red-500 mb-2">{error}</p>
            <button
              className="px-4 py-2 bg-white/20 rounded hover:bg-white/30 transition"
              onClick={() => {
                setError(null);
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}
    </VideoPlayer>
  );
}

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const [bucketdatamovies, setBucketDataMovies] = useState<any>([]);
  const [bucketdataseries, setBucketDataSeries] = useState<any>([]);
  const [bucketdatawishlist, setBucketDataWishlist] = useState<any>([]);
  const [bucketdataepisode, setBucketDataEpisode] = useState<any>([]);
  const [bucketdatavideo, setBucketDataVideo] = useState<any>([]);
  const [bucketdatasimilar, setBucketDataSimilar] = useState<any>([]);
  const [lengthbucketsimilar, setLengthBucketSimilar] = useState<number>(0);
  const [selectedfilter, setSelectedFilter] = useState(filterepisode[0]);
  const [selectedfiltertrailerextra, setSelectedFilterTrailerExtra] =
    useState(filtertrailerextra[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [devicemobile, setDeviceMobile] = useState<boolean>(false);
  const [toggleskeleton, setToggleSkeleton] = useState<boolean>(true);
  const [colorchange, setColorChange] = useState<boolean>(false);
  const [headlinevisible, setHeadlineVisible] = useState<boolean>(true);
  const [copiedtext, setCopiedText] = useState<boolean>(false);
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState<boolean>(false);
  const [sidebarfixed, setSidebarFixed] = useState<boolean>(false);
  const [stateprofilenavigation, setStateProfileNavigation] = useState("synopsis-video");
  const [expanddetails, setExpandDetails] = useState<boolean>(false);
  const [statemodal, setStateModal] = useState<boolean>(false);
  const [successcopy, setSuccessCopy] = useState<boolean>(false);
  const [statuswatchlist, setStatusWatchlist] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState('episodes');

  const curtaincontentRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const ViewportSynopsis = handleViewport(Synopsis);
  const ViewportAllEpisode = handleViewport(AllEpisode);
  const ViewportTrailer = handleViewport(Trailer);
  const ViewportSimilarVideo = handleViewport(SimilarVideo);

  useEffect(() => {
    const getEpisodeNumber = (id: string) => {
      const match = id.match(/episode-(\d+)/i);
      return match ? parseInt(match[1], 10) : 0;
    };

    if (selectedfilter.id === 2) {
      setBucketDataEpisode((prevData) =>
        [...prevData].sort((a, b) => {
          const aNum = getEpisodeNumber(a.id_doc);
          const bNum = getEpisodeNumber(b.id_doc);
          return aNum - bNum;
        })
      );
    } else if (selectedfilter.id === 1) {
      setBucketDataEpisode((prevData) =>
        [...prevData].sort((a, b) => {
          const aNum = getEpisodeNumber(a.id_doc);
          const bNum = getEpisodeNumber(b.id_doc);
          return bNum - aNum;
        })
      );
    }
  }, [selectedfilter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data with params:", params);
        
        if (!params.type || !params.uid) {
          console.log("Missing params, redirecting to 404");
          router.push('/404');
          return;
        }

        if (params.type === "series") {
          console.log("Fetching series data for ID:", params.uid);
          const docRef = doc(db, "series", params.uid as string);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            console.log("Series data found:", docSnap.data());
            const seriesData = docSnap.data();
            setBucketDataSeries(seriesData);
            
            console.log("Fetching episodes...");
            const episodesRef = collection(db, "series", params.uid as string, "episode");
            const episodesSnap = await getDocs(episodesRef);
            const episodesData = episodesSnap.docs
              .map(doc => ({
                id_doc: doc.id,
                ...doc.data()
              }))
              .sort((a, b) => {
                // Urutkan berdasarkan nomor episode
                const getEpisodeNumber = (id: string) => {
                  const match = id.match(/episode-(\d+)/i);
                  return match ? parseInt(match[1], 10) : 0;
                };
                const aNum = getEpisodeNumber(a.id_doc);
                const bNum = getEpisodeNumber(b.id_doc);
                return aNum - bNum;
              });
            console.log("Episodes found:", episodesData.length);
            setBucketDataEpisode(episodesData);
            
            if (seriesData.genre?.value) {
              console.log("Fetching similar series for genre:", seriesData.genre.value);
              const similarRef = collection(db, "series");
              const similarQuery = query(
                similarRef,
                where("status", "==", "live"),
                where("genre.value", "==", seriesData.genre.value)
              );
              const similarSnap = await getDocs(similarQuery);
              const similarData = similarSnap.docs
                .map(doc => ({
                  id_doc: doc.id,
                  ...doc.data()
                }))
                .filter(item => item.id_doc !== params.uid);
              setBucketDataSimilar(similarData);
              setLengthBucketSimilar(similarData.length);
            }

            // Fetch trailer data
            const trailersRef = collection(db, "trailers");
            const trailersQuery = query(
              trailersRef,
              where("video_id", "==", params.uid),
              where("status", "==", "live")
            );
            const trailersSnap = await getDocs(trailersQuery);
            const trailersData = trailersSnap.docs.map(doc => ({
              id_doc: doc.id,
              ...doc.data()
            }));
            setBucketDataVideo(trailersData);

            setPageLoaded(true);
            setCheckboxCurtain(true);
            setTimeout(() => {
              setToggleSkeleton(false);
            }, 2000);
          } else {
            console.log("No series found with ID:", params.uid);
            router.push('/404');
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push('/404');
      }
    };

    fetchData();
  }, [params.type, params.uid, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (bucketdatavideo.length > 0) {
        setPageLoaded(true);
        setCheckboxCurtain(true);
        setTimeout(() => {
          setToggleSkeleton(false);
        }, 2000);
      }
    }
  }, [bucketdatavideo]);

  useEffect(() => {
    const changeHeadlineVisible = () => {
      if (window.scrollY >= 250) {
        setHeadlineVisible(true);
        setSidebarFixed(true);
      } else {
        setHeadlineVisible(false);
        setSidebarFixed(false);
      }
    };
    window.addEventListener("scroll", changeHeadlineVisible);

    return () => window.removeEventListener("scroll", changeHeadlineVisible);
  }, []);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setDeviceMobile(true);
    } else {
      setDeviceMobile(false);
    }
  }, []);

  const handleAddWatchlist = async () => {
    try {
      const response = await fetch(
        `https://luplay.co.id/api/user/watchlist/POST?id_doc=${params.uid}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        movePageFunction("/user/sign_in");
      } else {
        toast.success("Berhasil ditambahkan ke daftar putar", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setStatusWatchlist(!statuswatchlist);
      }
    } catch (error) {
      // console.error(error);
      toast.error("Error:" + error, {
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
  };

  const handleDeleteWatchlist = async () => {
    try {
      const response = await fetch(
        `https://luplay.co.id/api/user/watchlist/DELETE?id_doc=${params.uid}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        movePageFunction("/user/sign_in");
      } else {
        toast.success("Dihapus dari daftar putar", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setStatusWatchlist(!statuswatchlist);
      }
    } catch (error) {
      // console.error(error);
      toast.error("Error:" + error, {
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
  };

  const toggleModal = () => {
    setStateModal((current) => !current);
    setSuccessCopy(false);
  };

  const handleShareFacebook = async () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      "https://luplay.co.id/" +
        params.type +
        "/" +
        params.uid +
        "/" +
        params.title +
        "?utm_source=referral&utm_medium=share-facebook"
    )}&quote=${encodeURIComponent("")}`;
    window.open(facebookShareUrl, "_blank", "width=600,height=400");
  };

  const handleShareTwitter = async () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      "https://luplay.co.id/" +
        params.type +
        "/" +
        params.uid +
        "/" +
        params.title +
        "?utm_source=referral&utm_medium=share-X"
    )}&text=${encodeURIComponent("")}`;
    window.open(twitterShareUrl, "_blank", "width=600,height=400");
  };

  const handleCopyClick = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      navigator.clipboard
        .writeText(textareaRef.current.value)
        .then(() => {
          setSuccessCopy(true);
        })
        .catch((err) => {
          console.error("Unable to copy text to clipboard", err);
        });
    }
  };

  const movePageFunction = (param: string) => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.push(param, { scroll: false }));
  };

  const previousPageFunction = () => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.back());
  };

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <VideoPlayerComponent
        videoUrl={bucketdataepisode[0]?.video_url}
        posterUrl={bucketdataseries.image_landscape || bucketdataepisode[0]?.image}
        title={bucketdataseries.title}
        metadata={
          <>
            <span className="badge">{bucketdataseries.age_rating?.label || 'ALL'}</span>
            <span>{bucketdataseries.genre?.label}</span>
            <span>{bucketdataepisode.length} Episode</span>
          </>
        }
        synopsis={bucketdataseries.synopsis}
        onAddWatchlist={handleAddWatchlist}
        onShare={toggleModal}
      />
      <ContentSection>
        <div className="content-header">
          <div className="tab-list">
            <button
              className={`tab ${activeTab === 'episodes' ? 'active' : ''}`}
              onClick={() => setActiveTab('episodes')}
            >
              Episode
            </button>
            <button
              className={`tab ${activeTab === 'trailers' ? 'active' : ''}`}
              onClick={() => setActiveTab('trailers')}
            >
              Trailer
            </button>
            <button
              className={`tab ${activeTab === 'similar' ? 'active' : ''}`}
              onClick={() => setActiveTab('similar')}
            >
              Konten Serupa
            </button>
          </div>
          {activeTab === 'episodes' && (
            <div className="filter-section">
              <span className="filter-label">Urutkan:</span>
              <Listbox value={selectedfilter} onChange={setSelectedFilter}>
                <div className="relative">
                  <Listbox.Button className="filter-button">
                    <span>{selectedfilter.name}</span>
                    <ChevronUpDownIcon className="w-4 h-4" />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 w-full bg-gray-900 rounded-md shadow-lg py-1 z-10">
                      {filterepisode.map((filter) => (
                        <Listbox.Option
                          key={filter.id}
                          value={filter}
                          className={({ active }) =>
                            `${active ? 'bg-gray-800' : ''} cursor-pointer select-none relative py-2 px-4`
                          }
                        >
                          {filter.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          )}
        </div>
        {activeTab === 'episodes' && (
          <div className="episodes-grid">
            {bucketdataepisode.map((episode) => (
              <EpisodeCard key={episode.id_doc} onClick={() => movePageFunction(`/watch/${params.type}/${params.uid}/${episode.id_doc}`)}>
                <div className="image-container">
                  <Image
                    src={episode.image}
                    alt={episode.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                  {episode.badge && <span className="badge">{episode.badge}</span>}
                </div>
                <div className="content">
                  <h3 className="text-lg font-semibold mb-2">{episode.title}</h3>
                  <p className="text-sm opacity-80 line-clamp-2">{episode.synopsis}</p>
                </div>
              </EpisodeCard>
            ))}
          </div>
        )}
        {activeTab === 'trailers' && (
          <div className="episodes-grid">
            {bucketdatavideo.map((trailer) => (
              <EpisodeCard key={trailer.id_doc} onClick={() => movePageFunction(`/watch/trailer-${params.type}/${params.uid}/${trailer.title_trailer.replace(/\s+/g, "-")}`)}>
                <div className="image-container">
                  <Image
                    src={trailer.image_trailer}
                    alt={`${trailer.title_trailer} - Official Trailer`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                  <span className="badge">TRAILER</span>
                </div>
                <div className="content">
                  <h3 className="text-lg font-semibold mb-2">{trailer.title_trailer}</h3>
                  <p className="text-sm opacity-80 line-clamp-2">{trailer.synopsis_trailer}</p>
                </div>
              </EpisodeCard>
            ))}
          </div>
        )}
        {activeTab === 'similar' && (
          <div className="episodes-grid">
            {bucketdatasimilar.map((similar) => (
              <EpisodeCard key={similar.id_doc} onClick={() => movePageFunction(`/${similar.type}/${similar.id_doc}/${similar.title.replace(/\s+/g, "-")}`)}>
                <div className="image-container">
                  <Image
                    src={similar.image_potrait_thumbnail}
                    alt={similar.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                </div>
                <div className="content">
                  <h3 className="text-lg font-semibold mb-2">{similar.title}</h3>
                  <p className="text-sm opacity-80 line-clamp-2">{similar.synopsis}</p>
                </div>
              </EpisodeCard>
            ))}
          </div>
        )}
      </ContentSection>
      <Footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Tentang Luplay</h3>
            <ul>
              <li>Tentang Kami</li>
              <li>Karir</li>
              <li>Hubungi Kami</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Layanan</h3>
            <ul>
              <li>Berlangganan</li>
              <li>Redeem Voucher</li>
              <li>Gift Card</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Bantuan</h3>
            <ul>
              <li>Pusat Bantuan</li>
              <li>FAQ</li>
              <li>Syarat & Ketentuan</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Ikuti Kami</h3>
            <ul>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Facebook</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Luplay. All rights reserved.</p>
        </div>
      </Footer>
      <Transition show={statemodal} as={Fragment}>
        <Dialog onClose={toggleModal} className="relative z-50">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-gray-900 rounded-lg p-6 max-w-sm w-full">
                <Dialog.Title className="text-xl font-semibold mb-4 text-white">
                  Bagikan
                </Dialog.Title>
                <div className="space-y-4">
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={handleShareFacebook}
                  >
                    Bagikan ke Facebook
                  </Button>
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={handleShareTwitter}
                  >
                    Bagikan ke Twitter
                  </Button>
                  <div>
                    <label className="text-sm text-gray-400">Link</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        readOnly
                        value={`https://luplay.co.id/${params.type}/${params.uid}/${params.title}`}
                        className="flex-1 bg-gray-800 rounded px-3 py-2 text-sm text-white"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleCopyClick}
                      >
                        {successcopy ? 'Tersalin!' : 'Salin'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <NavbarBottomMobile />
    </main>
  );
}


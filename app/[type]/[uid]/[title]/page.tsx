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
import { analytics } from "@/lib/firebase";

const filterepisode = [
  { id: 1, name: "Terbaru ke Terlama" },
  { id: 2, name: "Terlama ke Terbaru" },
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
            ? `http://localhost:3002/api/data/video/movies`
            : `http://localhost:3002/api/data/video/series`,
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

export default function Page() {
  const router = useRouter();
  const params = useParams<{ type: string; uid: string; title: string }>();

  const [datauser, setDataUser] = useState<any[]>([]);
  const [bucketdatavideo, setBucketDataVideo] = useState<any[]>([]);
  const [bucketdataepisode, setBucketDataEpisode] = useState<any[]>([]);
  const [lengthbucketsimilar, setLengthBucketSimilar] = useState<number>();
  const [statuswatchlist, setStatusWatchlist] = useState<boolean>(false);
  const [toggleskeleton, setToggleSkeleton] = useState<boolean>(true);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [expanddetails, setExpandDetails] = useState<boolean>(true);
  const [selectedfilterepisode, setSelectedFilterEpisode] = useState(
    filterepisode[1]
  );
  const [selectedtrailerextra, setSelectedTrailerExtra] = useState(
    filtertrailerextra[0]
  );
  const [stateprofilenavigation, setStateProfileNavigation] =
    useState("synopsis-video");
  const [headlinevisible, setHeadlineVisible] = useState<boolean>(false);
  const [sidebarfixed, setSidebarFixed] = useState<boolean>(false);
  const [devicemobile, setDeviceMobile] = useState<boolean>(false);
  const [openselectedtrailerextra, setOpensetSelectedFilterEpisode] =
    useState<boolean>(false);
  const [statemodal, setStateModal] = useState(false);
  const [successcopy, setSuccessCopy] = useState(false);

  const curtaincontentRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/user/", {
          method: "GET",
        });

        const userData = await response.json();
        setDataUser(userData.user);
      } catch (error: any) {
        console.error("Error generating metadata:", error.message);
      }
    };

    const fetchDataMovies = async () => {
      try {
        await fetch(
          `http://localhost:3002/api/data/video/movies/${params.uid}`,
          {
            method: "GET",
          }
        ).then(async (response) => {
          const data = await response.json();
          if (response.status != 200) {
            // console.error(response);
          } else {
            setBucketDataVideo([data.movies_data]);
          }
        });
      } catch (error: any) {
        throw new Error(error.messages);
      }
    };

    const fetchDataSeries = async () => {
      try {
        await fetch(
          `http://localhost:3002/api/data/video/series/${params.uid}`,
          {
            method: "GET",
          }
        ).then(async (response) => {
          const data = await response.json();
          if (response.status != 200) {
            // console.error(response);
          } else {
            setBucketDataVideo([data.series_data]);
            setBucketDataEpisode(() =>
              [...data.episode_data].sort(
                (a, b) =>
                  a.create_at.seconds - b.create_at.seconds ||
                  a.create_at.nanoseconds - b.create_at.nanoseconds
              )
            );
          }
        });
      } catch (error: any) {
        throw new Error(error.messages);
      }
    };

    const fetchDataWishlist = async () => {
      try {
        await fetch(`http://localhost:3002/api/user/watchlist/GET`, {
          method: "GET",
        }).then(async (response) => {
          const data = await response.json();
          if (response.status != 200) {
            // console.error(response);
          } else {
            setStatusWatchlist(
              data.userWatchlist.some((item: any) =>
                Object.values(item).some(
                  (value) =>
                    typeof value === "string" && value.includes(params.uid)
                )
              )
            );
          }
        });
      } catch (error: any) {
        throw new Error(error.messages);
      }
    };

    fetchUserData();

    if (datauser.length !== 0) {
      fetchDataWishlist();
    }

    if (params.type === "series") {
      fetchDataSeries();
    } else if (params.type === "movies") {
      fetchDataMovies();
    } else {
      return notFound;
    }
  }, [datauser.length, params.type, params.uid]);
  useEffect(() => {
    if (selectedfilterepisode.id === 2) {
      setBucketDataEpisode((prevData) =>
        [...prevData].sort(
          (a, b) =>
            a.create_at.seconds - b.create_at.seconds ||
            a.create_at.nanoseconds - b.create_at.nanoseconds
        )
      );
    } else if (selectedfilterepisode.id === 1) {
      setBucketDataEpisode((prevData) =>
        [...prevData].sort(
          (a, b) =>
            b.create_at.seconds - a.create_at.seconds ||
            b.create_at.nanoseconds - a.create_at.nanoseconds
        )
      );
    }
  }, [selectedfilterepisode]);
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
  useEffect(() => {
    if (typeof window !== "undefined") {
      analytics;
      if (bucketdatavideo.length != 0) {
        setPageLoaded(true);
        setCheckboxCurtain(true);
        setTimeout(function () {
          setToggleSkeleton(false);
        }, 2000);
      }
    }
  }, [bucketdatavideo, lengthbucketsimilar]);

  const handleAddWatchlist = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/user/watchlist/POST?id_doc=${params.uid}`,
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
        `http://localhost:3002/api/user/watchlist/DELETE?id_doc=${params.uid}`,
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
      "http://localhost:3002/" +
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
      "http://localhost:3002/" +
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
    <>
      <header className="fixed z-20 w-full top-0 bg-black xl:bg-pallete-5  shadow-md hidden lg:block">
        <Navbar movePageFunction={movePageFunction}></Navbar>
      </header>
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
              headlinevisible ? `` : "h-[110vh] lg:h-[132vh]"
            } curtain__panel--left`}
            style={{
              height: headlinevisible
                ? `${curtaincontentRef.current?.offsetHeight}px`
                : "",
            }}
          ></div>
          {!pageloaded ? <Loading></Loading> : <></>}
          <div className="curtain__content" ref={curtaincontentRef}>
            {pageloaded ? (
              bucketdatavideo.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  {devicemobile ? (
                    toggleskeleton ? (
                      <>
                        <div>
                          <Skeleton
                            baseColor="#202020"
                            highlightColor="#444"
                            height={200}
                            width={window.innerWidth}
                          ></Skeleton>
                        </div>
                        <div className="mt-4 mx-4 mb-2">
                          <div className="flex justify-between mb-2">
                            <div>
                              <Skeleton
                                baseColor="#202020"
                                highlightColor="#444"
                                height={28}
                                width={150}
                              ></Skeleton>
                            </div>
                            <div>
                              <Skeleton
                                baseColor="#202020"
                                highlightColor="#444"
                                height={28}
                                width={24}
                              ></Skeleton>
                            </div>
                          </div>
                          <div className="my-3">
                            <Skeleton
                              baseColor="#202020"
                              highlightColor="#444"
                              height={20}
                              width={200}
                            ></Skeleton>
                          </div>
                          <div className="mt-2">
                            <Skeleton
                              baseColor="#202020"
                              highlightColor="#444"
                              height={20}
                              width={250}
                            ></Skeleton>
                          </div>
                          <div className="my-2">
                            <Skeleton
                              baseColor="#202020"
                              highlightColor="#444"
                              height={36}
                              width={window.innerWidth}
                            ></Skeleton>
                          </div>
                          <div className="mb-2">
                            <Skeleton
                              baseColor="#202020"
                              highlightColor="#444"
                              height={15}
                              width={window.innerWidth}
                              count={2}
                            ></Skeleton>
                          </div>
                          <div>
                            <Skeleton
                              baseColor="#202020"
                              highlightColor="#444"
                              height={15}
                              width={100}
                            ></Skeleton>
                          </div>
                        </div>
                        <div className="mt-4 mx-4">
                          <div className="mb-[10px]">
                            <Skeleton
                              baseColor="#202020"
                              highlightColor="#444"
                              height={40}
                              width={window.innerWidth}
                            ></Skeleton>
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <Skeleton
                                baseColor="#202020"
                                highlightColor="#444"
                                height={16}
                                width={100}
                              ></Skeleton>
                            </div>
                            <div>
                              <Skeleton
                                baseColor="#202020"
                                highlightColor="#444"
                                height={16}
                                width={100}
                              ></Skeleton>
                            </div>
                          </div>
                          <div className="my-4">
                            <div className="flex items-center gap-x-2">
                              <div>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={81}
                                  width={144}
                                ></Skeleton>
                              </div>
                              <div>
                                <Skeleton
                                  baseColor="#202020"
                                  highlightColor="#444"
                                  height={15}
                                  width={200}
                                ></Skeleton>
                              </div>
                            </div>
                            <div>
                              <Skeleton
                                baseColor="#202020"
                                highlightColor="#444"
                                height={15}
                                width={window.innerWidth}
                                count={2}
                              ></Skeleton>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="relative text-white">
                        <div
                          className={`${
                            headlinevisible ? "visible" : "invisible opacity-0"
                          } bg-pallete-5 shadow-md pb-10 pt-4 fixed w-full z-10 container-headline-details`}
                        >
                          <div className="left-4 top-4 absolute z-[5]">
                            <button
                              type="button"
                              onClick={() => previousPageFunction()}
                              className="inline"
                            >
                              <ArrowLeftIcon className="h-6 w-6"></ArrowLeftIcon>
                            </button>
                          </div>
                          <h1 className="text-white text-xl font-bold overflow-hidden px-16 text-center text-ellipsis whitespace-nowrap">
                            {item.title}
                          </h1>
                          <div className="flex text-sm font-bold justify-center left-0 max-h-[44px] absolute right-0 top-14 whitespace-nowrap w-auto z-[4]">
                            <button
                              type="button"
                              onClick={() =>
                                movePageFunction(
                                  params.type === "movies"
                                    ? `/watch/${params.type}/${
                                        params.uid
                                      }/${params.title.replace(/\s+/g, "-")}`
                                    : `/watch/${params.type}/${params.uid}/episode-1`
                                )
                              }
                              className="text-white text-base py-3 px-6 bg-pallete-4 items-center rounded inline-flex font-bold justify-center"
                            >
                              <PlayIcon className="mr-3 w-[14px] h-[14px]"></PlayIcon>
                              Putar Sekarang
                            </button>
                          </div>
                        </div>
                        <div className="ml-4 absolute top-4 z-[5]">
                          <button
                            type="button"
                            className="bg-pallete-4/50 rounded-full inline p-2"
                            onClick={() => previousPageFunction()}
                          >
                            <ArrowLeftIcon className="w-6 h-6"></ArrowLeftIcon>
                          </button>
                        </div>
                        <div className="right-4 absolute top-4 z-[5]">
                          <button
                            type="button"
                            className="bg-pallete-4/50 rounded-full inline p-2"
                            onClick={toggleModal}
                          >
                            <ShareIcon className="w-6 h-6"></ShareIcon>
                          </button>
                        </div>
                        <div className="block pt-[56.27%] relative w-full">
                          <picture className="top-0 right-0 bottom-0 left-0 absolute">
                            <Image
                              src={item.image_banner_mobile}
                              width={1920}
                              height={1080}
                              alt={item.title + `-banner-mobile`}
                              priority
                            />
                            <div
                              onClick={() =>
                                movePageFunction(
                                  `/watch/trailer-${params.type}/${
                                    params.uid
                                  }/${item.title_trailer.replace(/\s+/g, "-")}`
                                )
                              }
                              className="bg-pallete-4/50 items-center rounded-2xl bottom-4 text-white inline-flex text-xs font-normal justify-center left-4 min-w-[32px] py-2 px-3 absolute"
                            >
                              <PlayIcon className="w-4 h-4 mr-2"></PlayIcon>
                              <span>Trailer</span>
                            </div>
                          </picture>
                        </div>
                        <div className="mt-4 mx-4 mb-2">
                          <div className="flex items-start justify-between">
                            <h1 className="line-clamp-2 text-xl font-bold mb-2 text-ellipsis whitespace-pre-wrap">
                              {item.title}
                            </h1>
                            <button
                              type="button"
                              onClick={() => {
                                if (statuswatchlist) {
                                  handleDeleteWatchlist();
                                } else {
                                  handleAddWatchlist();
                                }
                              }}
                              className="w-fit"
                            >
                              {statuswatchlist ? (
                                <BookmarkSquareIcon className="w-6 h-6"></BookmarkSquareIcon>
                              ) : (
                                <BookmarkIcon className="w-6 h-6"></BookmarkIcon>
                              )}
                            </button>
                          </div>
                          <div className="flex items-center text-sm my-3 whitespace-nowrap text-gray-300">
                            <Image
                              src={crown}
                              className="w-4 h-4"
                              alt={`premium-${params.type}-luplay`}
                              height={16}
                              width={16}
                            />
                            <div className="border-l border-l-gray-300 ml-1 pl-1">
                              18+
                            </div>
                            {/* <div className="border-l border-l-gray-300 ml-1 pl-1">
                              2023
                            </div> */}
                            {/* <div className="border-l border-l-gray-300 ml-1 pl-1">
                              6 Episodes
                            </div> */}
                            <button
                              type="button"
                              className="border-l border-l-gray-300 ml-1 pl-1 flex-shrink"
                              onClick={() =>
                                movePageFunction(
                                  `/categories/${params.type}/${item.genre.value}`
                                )
                              }
                            >
                              {item.genre.label}
                            </button>
                          </div>
                          {/* <p className="text-white text-sm font-medium mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                            Express Episode 5 & 6 Tayang Tanggal 27 Oktober
                          </p> */}
                          <div className="my-2 w-100% transition ease-out delay-200">
                            <button
                              type="button"
                              onClick={() =>
                                movePageFunction(
                                  params.type === "movies"
                                    ? `/watch/${params.type}/${
                                        params.uid
                                      }/${params.title.replace(/\s+/g, "-")}`
                                    : `/watch/${params.type}/${params.uid}/episode-1`
                                )
                              }
                              className="text-sm font-bold mx-auto whitespace-nowrap w-full min-w-[40px] py-2 px-4 items-center rounded inline-flex justify-center bg-pallete-4 shadow-md"
                            >
                              <PlayIcon className="w-4 h-4 mr-3"></PlayIcon>
                              Putar Sekarang
                            </button>
                          </div>
                          {/* <div className="my-2">
                            <h4 className="font-medium text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                              Ep 01 - Harta, Tahta, Wanita
                            </h4>
                            <span className="flex items-center mt-[2px]">
                              <div className="bg-white flex-[1_1] w-full rounded-sm h-1">
                                <div className="w-[37.55%] bg-pallete-4 rounded-sm h-1"></div>
                              </div>
                              <time className="font-medium text-xs ml-2">
                                27m tersisa
                              </time>
                            </span>
                          </div> */}
                          <div className="text-sm ">
                            {expanddetails ? (
                              <div className="block relative text-white">
                                <article className="text-sm">
                                  <p className="mb-2">{item.synopsis}</p>
                                </article>
                                <p className="mb-2 flex text-sm ">
                                  <span className="mr-1 text-gray-300">
                                    Sutradara:
                                  </span>
                                  <span>
                                    <span className="inline ">
                                      {item.director}
                                    </span>
                                  </span>
                                </p>
                                <p className="mb-2 flex text-sm ">
                                  <span className="mr-1 text-gray-300">
                                    Pemain:
                                  </span>
                                  <span>
                                    {item.main_cast.map(
                                      (
                                        item: string,
                                        index: number,
                                        array: any
                                      ) => (
                                        <React.Fragment key={index}>
                                          <span className="inline">{item}</span>
                                          {index < array.length - 1 && (
                                            <>,&nbsp;</>
                                          )}
                                        </React.Fragment>
                                      )
                                    )}
                                  </span>
                                </p>
                              </div>
                            ) : (
                              <div className="block relative text-white">
                                <article className="text-sm">
                                  <p className="mb-2">
                                    {`${item.synopsis.slice(0, 150)}...`}
                                  </p>
                                </article>
                              </div>
                            )}
                            <button
                              type="button"
                              className="text-blue-400 font-semibold"
                              onClick={() => {
                                setExpandDetails(!expanddetails);
                              }}
                            >
                              {expanddetails ? "Lebih Sedikit" : "Selengkapnya"}
                            </button>
                          </div>
                        </div>
                        <Tabs className="tabs-detail-video">
                          <TabList>
                            {bucketdataepisode.length !== 0 ? (
                              <Tab>Episode</Tab>
                            ) : (
                              <></>
                            )}
                            <Tab>Trailer</Tab>
                            {lengthbucketsimilar !== 0 ? (
                              <Tab>Konten Sejenis</Tab>
                            ) : (
                              <></>
                            )}
                          </TabList>
                          {bucketdataepisode.length !== 0 ? (
                            <TabPanel>
                              <div className="mt-4 mx-4 min-h-[100px] lg:min-h-[200px] pb-16">
                                <div className="flex items-center justify-between">
                                  <p className="text-xs font-semibold py-2 px-3">
                                    Semua Episode
                                  </p>
                                  <div>
                                    <Listbox
                                      value={selectedfilterepisode}
                                      onChange={setSelectedFilterEpisode}
                                      as="div"
                                      className="relative"
                                    >
                                      {({ open }) => (
                                        <>
                                          <Listbox.Button className=" flex flex-row items-center gap-x-2 text-xs text-gray-300 font-medium ">
                                            <FunnelIcon className="w-4 h-4"></FunnelIcon>
                                            {selectedfilterepisode.name}
                                            <ChevronUpDownIcon className="w-4 h-4"></ChevronUpDownIcon>
                                          </Listbox.Button>

                                          <Transition
                                            show={open}
                                            enter="transition duration-100 ease-out"
                                            enterFrom="transform scale-95 opacity-0"
                                            enterTo="transform scale-100 opacity-100"
                                            leave="transition duration-75 ease-out"
                                            leaveFrom="transform scale-100 opacity-100"
                                            leaveTo="transform scale-95 opacity-0"
                                          >
                                            <Listbox.Options
                                              static
                                              className="absolute w-full z-10 text-center mt-2 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            >
                                              {filterepisode.map((filter) => (
                                                <Listbox.Option
                                                  key={filter.id}
                                                  value={filter}
                                                  as={Fragment}
                                                >
                                                  {({ active }) => (
                                                    <li
                                                      className={`cursor-pointer text-xs ${
                                                        active
                                                          ? "bg-blue-500 text-white"
                                                          : "bg-white text-gray-600"
                                                      }`}
                                                    >
                                                      {filter.name}
                                                    </li>
                                                  )}
                                                </Listbox.Option>
                                              ))}
                                            </Listbox.Options>
                                          </Transition>
                                        </>
                                      )}
                                    </Listbox>
                                  </div>
                                </div>
                                <div className="block">
                                  <ul className="mt-4">
                                    {bucketdataepisode.map(
                                      (item: any, index: number) => (
                                        <li className="mb-4" key={index}>
                                          <div className="block">
                                            <div
                                              onClick={() =>
                                                movePageFunction(
                                                  `/watch/${params.type}/${params.uid}/${item.id_doc}`
                                                )
                                              }
                                              className="flex items-center"
                                            >
                                              <div className="rounded-lg h-20 overflow-hidden relative align-top w-36 z-[1]">
                                                <Image
                                                  src={item.image}
                                                  width={640}
                                                  height={360}
                                                  className="aspect-[16/9] object-cover object-center"
                                                  alt={
                                                    item.title +
                                                    `-landscape-thumbnails`
                                                  }
                                                />
                                                <div className="bottom-1 left-0 absolute">
                                                  <span className="text-[8px] py-[3px] px-[6px] bg-white border border-solid border-gray-100 rounded-sm text-gray-900 block font-medium mb-1 ml-1">
                                                    GRATIS
                                                  </span>
                                                </div>
                                                {/* <div className="bottom-2 absolute right-2">
                                            <time className="text-[10px] font-normal py-[1px] px-[2px] bg-black/50 rounded-sm text-white text-center">
                                              43:35
                                            </time>
                                          </div> */}
                                              </div>
                                              <div className="flex-[1_1] ml-2">
                                                <h3 className="line-clamp-3 max-h-[54px] break-words text-white text-sm font-semibold mb-[2px] text-ellipsis">
                                                  {item.title}
                                                </h3>
                                              </div>
                                            </div>
                                          </div>
                                          <p className="line-clamp-2 text-white text-sm mt-1 max-h-[42px] text-left text-ellipsis break-words">
                                            {item.synopsis.slice(0, 150)}
                                          </p>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </TabPanel>
                          ) : (
                            <></>
                          )}
                          <TabPanel>
                            <div className="mt-4 mx-4 min-h-[100px] lg:min-h-[200px] pb-16">
                              <div className="flex items-center justify-between">
                                <div>
                                  <button
                                    type="button"
                                    className="flex flex-row shadow-md items-center gap-x-2 text-xs text-gray-300 font-semibold py-2 px-3 border border-solid rounded-md"
                                    // onClick={() =>
                                    //   setOpensetSelectedFilterEpisode(
                                    //     (current) => !current
                                    //   )
                                    // }
                                  >
                                    {selectedtrailerextra.name}
                                    <ChevronUpDownIcon className="w-4 h-4"></ChevronUpDownIcon>
                                  </button>
                                </div>
                                {/* <div
                                  className={`bg-black/50 bottom-0 left-0 fixed right-0 top-0 ${
                                    openselectedtrailerextra
                                      ? "detail-selected-bottom z-[9]"
                                      : "detail-selected-bottom-hidden z-[-1]"
                                  }`}
                                >
                                  <div className="bg-pallete-5 rounded-tl-2xl rounded-tr-2xl bottom-0 max-h-[98%] py-8 px-6 absolute w-full">
                                    <button
                                      type="button"
                                      className="text-white bg-pallete-4/50 rounded-full p-2 absolute right-3 top-3"
                                      onClick={() =>
                                        setOpensetSelectedFilterEpisode(
                                          (current) => !current
                                        )
                                      }
                                    >
                                      <XMarkIcon className="w-5 h-5"></XMarkIcon>
                                    </button>
                                    <div className="max-h-[97vh] overflow-auto">
                                      <h2 className="text-white text-xl font-bold">
                                        {" "}
                                        Season
                                      </h2>
                                      <ul className="text-sm">
                                        <li className="mt-6">
                                          <button
                                            type="button"
                                            className="text-white font-sm text-left"
                                          >
                                            Trailer{" "}
                                            <span className="text-gray-300 text-sm text-left">
                                              ( 5 Episode )
                                            </span>
                                          </button>
                                        </li>
                                        <li className="mt-6">
                                          <button
                                            type="button"
                                            className="text-white font-sm text-left"
                                          >
                                            Extras{" "}
                                            <span className="text-gray-300 text-sm text-left">
                                              ( 7 Episode )
                                            </span>
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div> */}
                                {/* <div>
                                  <Listbox
                                    value={selectedfilterepisode}
                                    onChange={setSelectedFilterEpisode}
                                    as="div"
                                    className="relative"
                                  >
                                    {({ open }) => (
                                      <>
                                        <Listbox.Button className=" flex flex-row items-center gap-x-2 text-xs text-gray-300 font-semibold ">
                                          <FunnelIcon className="w-4 h-4"></FunnelIcon>
                                          {selectedfilterepisode.name}
                                          <ChevronUpDownIcon className="w-4 h-4"></ChevronUpDownIcon>
                                        </Listbox.Button>

                                        <Transition
                                          show={open}
                                          enter="transition duration-100 ease-out"
                                          enterFrom="transform scale-95 opacity-0"
                                          enterTo="transform scale-100 opacity-100"
                                          leave="transition duration-75 ease-out"
                                          leaveFrom="transform scale-100 opacity-100"
                                          leaveTo="transform scale-95 opacity-0"
                                        >
                                          <Listbox.Options
                                            static
                                            className="absolute w-full z-10 text-center mt-2 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                          >
                                            {filterepisode.map((filter) => (
                                              <Listbox.Option
                                                key={filter.id}
                                                value={filter}
                                                as={Fragment}
                                              >
                                                {({ active }) => (
                                                  <li
                                                    className={`cursor-pointer text-xs ${
                                                      active
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-white text-gray-600"
                                                    }`}
                                                  >
                                                    {filter.name}
                                                  </li>
                                                )}
                                              </Listbox.Option>
                                            ))}
                                          </Listbox.Options>
                                        </Transition>
                                      </>
                                    )}
                                  </Listbox>
                                </div> */}
                              </div>
                              <div className="block">
                                {selectedtrailerextra.id == 1 ? (
                                  <ul className="mt-4">
                                    <li>
                                      <div className="block">
                                        <div
                                          onClick={() =>
                                            movePageFunction(
                                              `/watch/trailer-${params.type}/${
                                                params.uid
                                              }/${item.title_trailer.replace(
                                                /\s+/g,
                                                "-"
                                              )}`
                                            )
                                          }
                                          className="flex items-center"
                                        >
                                          <div className="rounded-lg h-20 overflow-hidden relative align-top w-36 z-[1]">
                                            <Image
                                              src={item.image_trailer}
                                              width={640}
                                              height={360}
                                              className="aspect-[16/9] object-cover object-center"
                                              alt={
                                                item.title_trailer +
                                                `-landscape-thumbnails`
                                              }
                                            />
                                            <div className="bottom-1 left-0 absolute">
                                              <span className="text-[8px] py-[3px] px-[6px] bg-white border border-solid border-gray-100 rounded-sm text-gray-900 block font-medium mb-1 ml-1">
                                                GRATIS
                                              </span>
                                            </div>
                                            {/* <div className="bottom-2 absolute right-2">
                                              <time className="text-[10px] font-normal py-[1px] px-[2px] bg-black/50 rounded-sm text-white text-center">
                                                00:45
                                              </time>
                                            </div> */}
                                          </div>
                                          <div className="flex-[1_1] ml-2">
                                            <h3 className="line-clamp-3 max-h-[54px] break-words text-white text-sm font-semibold mb-[2px] text-ellipsis">
                                              {item.title_trailer} - Luplay
                                              Original Series | Official Teaser
                                            </h3>
                                          </div>
                                        </div>
                                      </div>
                                      <p className="line-clamp-2 text-white text-sm mt-1 max-h-[42px] text-left text-ellipsis break-words">
                                        {item.synopsis_trailer}
                                      </p>
                                    </li>
                                  </ul>
                                ) : (
                                  <ul className="mt-4">
                                    <li>
                                      <div className="block">
                                        <div className="flex items-center">
                                          <div className="rounded-lg h-20 overflow-hidden relative align-top w-36 z-[1]">
                                            {/* <Image
                                              src={extra}
                                              className="aspect-[16/9] object-cover object-center"
                                              alt="Picture of the author"
                                            /> */}
                                            <div className="bottom-1 left-0 absolute">
                                              <span className="text-[8px] py-[3px] px-[6px] bg-white border border-solid border-gray-100 rounded-sm text-gray-900 block font-medium mb-1 ml-1">
                                                GRATIS
                                              </span>
                                            </div>
                                            <div className="bottom-2 absolute right-2">
                                              <time className="text-[10px] font-normal py-[1px] px-[2px] bg-black/50 rounded-sm text-white text-center">
                                                01:08
                                              </time>
                                            </div>
                                          </div>
                                          <div className="flex-[1_1] ml-2">
                                            <h3 className="line-clamp-3 max-h-[54px] break-words text-white text-sm font-semibold mb-[2px] text-ellipsis">
                                              Merajut Dendam - Luplay Original
                                              Series | Next On Episode 2
                                            </h3>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                )}
                              </div>
                            </div>
                          </TabPanel>
                          <TabPanel>
                            <div className="mt-4 mx-4 min-h-[100px] lg:min-h-[200px] pb-16">
                              <ul className="-m-3 similar-video-section">
                                <ViewSimilarVideo
                                  onEnterViewport={() =>
                                    setStateProfileNavigation("similar-video")
                                  }
                                  movePageFunction={movePageFunction}
                                  genre={item.genre.value}
                                  except={params.uid}
                                  devicemobile={devicemobile}
                                  type={params.type}
                                  setLengthBucketSimilar={
                                    setLengthBucketSimilar
                                  }
                                />
                              </ul>
                            </div>
                          </TabPanel>
                        </Tabs>
                      </div>
                    )
                  ) : (
                    <div className="mt-12 overflow-hidden">
                      <main>
                        <section className="block">
                          <div className="relative">
                            <div className="absolute top-[40%]"></div>
                            <div
                              className={`${
                                headlinevisible
                                  ? "visible"
                                  : "invisible opacity-0"
                              } items-center bg-gray-600 flex h-24 left-0 overflow-hidden fixed w-full z-[11] container-headline-details`}
                            >
                              <div>
                                <Image
                                  src={item.image_headline}
                                  alt="Picture of the author"
                                  className="block h-full w-full blur-2xl left-0 opacity-100 absolute top-1/2 -translate-y-1/2 z-0"
                                  width={1366}
                                  height={480}
                                  priority
                                />
                              </div>
                              <div className="items-center flex h-24 justify-between m-auto relative w-[1020px]">
                                <h2 className="text-white basis-[45%] text-2xl font-black ml-6 overflow-hidden text-ellipsis whitespace-nowrap">
                                  {item.title}
                                </h2>
                                <div className="basis-1/2 grow-[2] justify-end m-0 text-right flex gap-2">
                                  <div className="flex gap-2 mb-4">
                                    <button
                                      onClick={() =>
                                        movePageFunction(
                                          params.type === "movies"
                                            ? `/watch/${params.type}/${
                                                params.uid
                                              }/${params.title.replace(
                                                /\s+/g,
                                                "-"
                                              )}`
                                            : `/watch/${params.type}/${params.uid}/episode-1`
                                        )
                                      }
                                      type="button"
                                      className="inline-flex py-3 px-6 text-center bg-pallete-4 hover:bg-pallete-3 rounded-md font-bold items-center shadow-lg text-white transition-all duration-200 ease-linear"
                                    >
                                      <PlayCircleIcon className="w-6 h-6 mr-2"></PlayCircleIcon>
                                      Putar
                                    </button>
                                    <button
                                      type="button"
                                      className={`inline-flex py-3 px-6 text-center ${
                                        statuswatchlist
                                          ? "border-pallete-4 border-2"
                                          : "border-white border"
                                      } rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white`}
                                      onClick={() => {
                                        if (statuswatchlist) {
                                          handleDeleteWatchlist();
                                        } else {
                                          handleAddWatchlist();
                                        }
                                      }}
                                    >
                                      {statuswatchlist ? (
                                        <BookmarkSquareIcon className="w-6 h-6 mr-2"></BookmarkSquareIcon>
                                      ) : (
                                        <BookmarkIcon className="w-6 h-6 mr-2"></BookmarkIcon>
                                      )}
                                      Daftarku
                                    </button>
                                    <button
                                      type="button"
                                      className="inline-flex py-3 px-6 text-center border border-white rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white"
                                      onClick={toggleModal}
                                    >
                                      <ShareIcon className="w-6 h-6 mr-2"></ShareIcon>
                                      Bagikan
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`${
                                headlinevisible
                                  ? "opacity-0 -translate-y-[30vh] invisible"
                                  : "opacity-100 transform-none visible"
                              } relative w-full container-banner-details`}
                            >
                              <div className="w-full h-full absolute text-right top-0">
                                <div className="h-full relative ml-auto overflow-hidden w-fit">
                                  <Image
                                    src={item.image_banner_desktop}
                                    width={960}
                                    height={540}
                                    alt="Picture of the author"
                                    className="inline-block align-middle h-full w-auto"
                                    priority
                                  />
                                  <div className="overlay-gradient-detail"></div>
                                </div>
                              </div>
                              <div className="flex justify-center items-center h-full left-0 absolute top-0 w-full z-[1]">
                                <div className="w-full lg:max-w-4xl xl:max-w-6xl ">
                                  <div className="w-[454px] text-white">
                                    <h1 className="text-3xl font-bold">
                                      {item.title}
                                    </h1>
                                    <div className="flex items-center font-semibold gap-1 mt-2 text-xs">
                                      <div
                                        className="h-6 w-6 bg-contain bg-no-repeat"
                                        style={{
                                          backgroundImage: `url(/crown.png)`,
                                        }}
                                      ></div>
                                      <span className="separator">•</span>
                                      <div className="border border-solid border-white rounded-sm px-1 uppercase">
                                        {item.age_rating.label}
                                      </div>
                                      {/* <span className="separator">•</span>
                                      <div className="">2023</div> */}
                                      {/* <span className="separator">•</span>
                                      <div className="">3 Episodes</div> */}
                                      <span className="separator">•</span>
                                      <div className="">
                                        <button
                                          onClick={() =>
                                            movePageFunction(
                                              `/${params.type}/${item.genre.value}`
                                            )
                                          }
                                          type="button"
                                          className="hover:underline hover:text-blue-600"
                                        >
                                          {item.genre.label}
                                        </button>
                                      </div>
                                    </div>
                                    <div className="mt-2 mb-4">
                                      <p className="line-clamp-4 text-sm mb-3">
                                        {item.tagline}
                                      </p>
                                      <div className="flex gap-2 items-start text-sm">
                                        <div className="shrink-0 text-gray-400">
                                          Sutradara:&nbsp;
                                        </div>
                                        <div>
                                          <div className="hover:underline hover:text-blue-600">
                                            {item.director}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex gap-2 items-start text-sm">
                                        <div className="shrink-0 text-gray-400">
                                          Pemain:&nbsp;
                                        </div>
                                        <div className="flex flex-wrap">
                                          {item.main_cast.map(
                                            (
                                              item: string,
                                              index: number,
                                              array: any
                                            ) => (
                                              <React.Fragment key={index}>
                                                <div className="hover:underline hover:text-blue-600">
                                                  {item}
                                                </div>
                                                {index < array.length - 1 && (
                                                  <>,&nbsp;</>
                                                )}
                                              </React.Fragment>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    {/* <div className="text-sm font-semibold mb-2">
                                      Nonton Lebih Cepat Episode 3 dengan
                                      Luplay&nbsp;Express!
                                    </div> */}
                                    <div className="flex gap-2 mb-4">
                                      <button
                                        onClick={() =>
                                          movePageFunction(
                                            params.type === "movies"
                                              ? `/watch/${params.type}/${
                                                  params.uid
                                                }/${params.title.replace(
                                                  /\s+/g,
                                                  "-"
                                                )}`
                                              : `/watch/${params.type}/${params.uid}/episode-1`
                                          )
                                        }
                                        type="button"
                                        className="inline-flex py-3 px-6 text-center bg-pallete-4 hover:bg-pallete-3 rounded-md font-bold items-center shadow-lg transition-all duration-200 ease-linear"
                                      >
                                        <PlayCircleIcon className="w-6 h-6 mr-2"></PlayCircleIcon>
                                        Putar
                                      </button>
                                      <button
                                        type="button"
                                        className={`inline-flex py-3 px-6 text-center ${
                                          statuswatchlist
                                            ? "border-pallete-4 border-2"
                                            : "border-white border"
                                        } rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white`}
                                        onClick={() => {
                                          if (statuswatchlist) {
                                            handleDeleteWatchlist();
                                          } else {
                                            handleAddWatchlist();
                                          }
                                        }}
                                      >
                                        {statuswatchlist ? (
                                          <BookmarkSquareIcon className="w-6 h-6 mr-2"></BookmarkSquareIcon>
                                        ) : (
                                          <BookmarkIcon className="w-6 h-6 mr-2"></BookmarkIcon>
                                        )}
                                        Daftarku
                                      </button>
                                      <button
                                        type="button"
                                        className="inline-flex py-3 px-6 text-center border border-white rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white"
                                        onClick={toggleModal}
                                      >
                                        <ShareIcon className="w-6 h-6 mr-2"></ShareIcon>
                                        Bagikan
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <div className="flex mx-auto relative lg:max-w-4xl xl:max-w-6xl">
                          <div className="relative w-64 text-left mt-7">
                            <div
                              className={`${
                                sidebarfixed ? "fixed top-44" : "absolute top-0"
                              } w-[inherit]`}
                            >
                              <ul className="flex flex-col overflow-hidden">
                                <li>
                                  <Link
                                    href="#synopsis-video"
                                    className={`${
                                      stateprofilenavigation == "synopsis-video"
                                        ? "text-white font-black border-l-pallete-3"
                                        : "text-gray-300 font-normal hover:text-white"
                                    } block border-l-4 text-lg capitalize py-2 px-5`}
                                    onClick={() =>
                                      setStateProfileNavigation(
                                        "synopsis-video"
                                      )
                                    }
                                  >
                                    Sinopsis
                                  </Link>
                                </li>
                                {bucketdataepisode.length != 0 ? (
                                  <li>
                                    <Link
                                      href="#playlist-episode"
                                      className={`${
                                        stateprofilenavigation ==
                                        "playlist-episode"
                                          ? "text-white font-black border-l-pallete-3"
                                          : "text-gray-300 font-normal hover:text-white"
                                      } block border-l-4 text-lg capitalize py-2 px-5`}
                                      onClick={() =>
                                        setStateProfileNavigation(
                                          "playlist-episode"
                                        )
                                      }
                                    >
                                      Episode
                                    </Link>
                                  </li>
                                ) : (
                                  <></>
                                )}
                                <li>
                                  <Link
                                    href="#playlist-trailer-extra"
                                    className={`${
                                      stateprofilenavigation ==
                                      "playlist-trailer-extra"
                                        ? "text-white font-black border-l-pallete-3"
                                        : "text-gray-300 font-normal hover:text-white"
                                    } block border-l-4 text-lg capitalize py-2 px-5`}
                                    onClick={() =>
                                      setStateProfileNavigation(
                                        "playlist-trailer-extra"
                                      )
                                    }
                                  >
                                    Trailer
                                  </Link>
                                </li>
                                {lengthbucketsimilar !== 0 ? (
                                  <li>
                                    <Link
                                      href="#similar-video"
                                      className={`${
                                        stateprofilenavigation ==
                                        "similar-video"
                                          ? "text-white font-black border-l-pallete-3"
                                          : "text-gray-300 font-normal hover:text-white"
                                      } block border-l-4 text-lg capitalize py-2 px-5`}
                                      onClick={() =>
                                        setStateProfileNavigation(
                                          "similar-video"
                                        )
                                      }
                                    >
                                      Konten Sejenis
                                    </Link>
                                  </li>
                                ) : (
                                  <></>
                                )}
                              </ul>
                            </div>
                          </div>
                          <div className="w-[758px] lg: pb-20">
                            <hr className="border-b border-solid border-gray-700" />
                            <div>
                              <ul>
                                <li>
                                  <section
                                    className="relative z-10 mt-7 scroll-mt-40"
                                    id="synopsis-video"
                                  >
                                    <div className="flex justify-between items-center">
                                      <h2 className="text-base font-semibold text-white">
                                        Sinopsis
                                      </h2>
                                    </div>
                                    <ViewSynopsis
                                      onEnterViewport={() =>
                                        setStateProfileNavigation(
                                          "synopsis-video"
                                        )
                                      }
                                      synopsis={item.synopsis}
                                      // onLeaveViewport={() =>
                                      //   console.log("leave")
                                      // }
                                    />
                                  </section>
                                </li>
                                {bucketdataepisode.length !== 0 ? (
                                  <li>
                                    <section
                                      className="relative z-10 mt-7 scroll-mt-40"
                                      id="playlist-episode"
                                    >
                                      <div className="flex justify-between items-center">
                                        <h2 className="text-base font-semibold text-white">
                                          Semua Episode
                                        </h2>
                                        <div>
                                          <Listbox
                                            value={selectedfilterepisode}
                                            onChange={setSelectedFilterEpisode}
                                            as="div"
                                            className="relative"
                                          >
                                            {({ open }) => (
                                              <>
                                                <Listbox.Button className=" flex flex-row items-center gap-x-2 text-base text-gray-300 font-semibold ">
                                                  <FunnelIcon className="w-4 h-4"></FunnelIcon>
                                                  {selectedfilterepisode.name}
                                                  <ChevronUpDownIcon className="w-4 h-4"></ChevronUpDownIcon>
                                                </Listbox.Button>

                                                <Transition
                                                  show={open}
                                                  enter="transition duration-100 ease-out"
                                                  enterFrom="transform scale-95 opacity-0"
                                                  enterTo="transform scale-100 opacity-100"
                                                  leave="transition duration-75 ease-out"
                                                  leaveFrom="transform scale-100 opacity-100"
                                                  leaveTo="transform scale-95 opacity-0"
                                                >
                                                  <Listbox.Options
                                                    static
                                                    className="absolute w-full z-10 text-center mt-2 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                  >
                                                    {filterepisode.map(
                                                      (filter) => (
                                                        <Listbox.Option
                                                          key={filter.id}
                                                          value={filter}
                                                          as={Fragment}
                                                        >
                                                          {({ active }) => (
                                                            <li
                                                              className={`cursor-pointer ${
                                                                active
                                                                  ? "bg-blue-500 text-white"
                                                                  : "bg-white text-gray-600"
                                                              }`}
                                                            >
                                                              {filter.name}
                                                            </li>
                                                          )}
                                                        </Listbox.Option>
                                                      )
                                                    )}
                                                  </Listbox.Options>
                                                </Transition>
                                              </>
                                            )}
                                          </Listbox>
                                        </div>
                                      </div>
                                      <div className="relative -z-[1]">
                                        {toggleskeleton ? (
                                          <ul className="all-episode-section">
                                            <li className="flex gap-x-8 overflow-clip py-4">
                                              <div>
                                                <Skeleton
                                                  baseColor="#202020"
                                                  highlightColor="#444"
                                                  height={128}
                                                  width={224}
                                                ></Skeleton>
                                              </div>
                                              <div className="flex flex-col gap-y-3 w-full">
                                                <Skeleton
                                                  baseColor="#202020"
                                                  highlightColor="#444"
                                                  height={24}
                                                  className="w-full"
                                                ></Skeleton>
                                                <Skeleton
                                                  baseColor="#202020"
                                                  highlightColor="#444"
                                                  height={20}
                                                  className="!w-1/4"
                                                ></Skeleton>
                                                <Skeleton
                                                  baseColor="#202020"
                                                  highlightColor="#444"
                                                  height={50}
                                                  className="w-full"
                                                ></Skeleton>
                                              </div>
                                            </li>
                                          </ul>
                                        ) : (
                                          <ViewAllEpisode
                                            onEnterViewport={() =>
                                              setStateProfileNavigation(
                                                "playlist-episode"
                                              )
                                            }
                                            bucketdataepisode={
                                              bucketdataepisode
                                            }
                                            movePageFunction={movePageFunction}
                                            type={[params.type, params.uid]}
                                            // onLeaveViewport={() =>
                                            //   console.log("leave")
                                            // }
                                          />
                                        )}
                                      </div>
                                    </section>
                                  </li>
                                ) : (
                                  <></>
                                )}
                                <li>
                                  <section
                                    className="relative z-10 mt-7 scroll-mt-40"
                                    id="playlist-trailer-extra"
                                  >
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <Listbox
                                          value={selectedtrailerextra}
                                          onChange={setSelectedTrailerExtra}
                                          as="div"
                                          className="relative"
                                        >
                                          {({ open }) => (
                                            <>
                                              <Listbox.Button className=" flex flex-row items-center gap-x-2 text-base text-gray-300 font-semibold py-3 px-4 border border-solid rounded-md">
                                                {selectedtrailerextra.name}
                                                <ChevronUpDownIcon className="w-4 h-4"></ChevronUpDownIcon>
                                              </Listbox.Button>

                                              <Transition
                                                show={open}
                                                enter="transition duration-100 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-75 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                              >
                                                <Listbox.Options
                                                  static
                                                  className="absolute w-full z-10 text-center mt-2 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                >
                                                  {filtertrailerextra.map(
                                                    (filter) => (
                                                      <Listbox.Option
                                                        key={filter.id}
                                                        value={filter}
                                                        as={Fragment}
                                                      >
                                                        {({ active }) => (
                                                          <li
                                                            className={`cursor-pointer ${
                                                              active
                                                                ? "bg-blue-500 text-white"
                                                                : "bg-white text-gray-600"
                                                            }`}
                                                          >
                                                            {filter.name}
                                                          </li>
                                                        )}
                                                      </Listbox.Option>
                                                    )
                                                  )}
                                                </Listbox.Options>
                                              </Transition>
                                            </>
                                          )}
                                        </Listbox>
                                      </div>
                                      {/* <div>
                                        <Listbox
                                          value={selectedfilterepisode}
                                          onChange={setSelectedFilterEpisode}
                                          as="div"
                                          className="relative"
                                        >
                                          {({ open }) => (
                                            <>
                                              <Listbox.Button className=" flex flex-row items-center gap-x-2 text-base text-gray-300 font-semibold ">
                                                <FunnelIcon className="w-4 h-4"></FunnelIcon>
                                                {selectedfilterepisode.name}
                                                <ChevronUpDownIcon className="w-4 h-4"></ChevronUpDownIcon>
                                              </Listbox.Button>

                                              <Transition
                                                show={open}
                                                enter="transition duration-100 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-75 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                              >
                                                <Listbox.Options
                                                  static
                                                  className="absolute w-full z-10 text-center mt-2 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                >
                                                  {filterepisode.map(
                                                    (filter) => (
                                                      <Listbox.Option
                                                        key={filter.id}
                                                        value={filter}
                                                        as={Fragment}
                                                      >
                                                        {({ active }) => (
                                                          <li
                                                            className={`cursor-pointer ${
                                                              active
                                                                ? "bg-blue-500 text-white"
                                                                : "bg-white text-gray-600"
                                                            }`}
                                                          >
                                                            {filter.name}
                                                          </li>
                                                        )}
                                                      </Listbox.Option>
                                                    )
                                                  )}
                                                </Listbox.Options>
                                              </Transition>
                                            </>
                                          )}
                                        </Listbox>
                                      </div> */}
                                    </div>
                                    <div className="relative -z-[1]">
                                      {selectedtrailerextra.id == 1 ? (
                                        <ul className="trailer-section">
                                          {toggleskeleton ? (
                                            <li className="flex gap-x-8 overflow-clip py-4">
                                              <div>
                                                <Skeleton
                                                  baseColor="#202020"
                                                  highlightColor="#444"
                                                  height={128}
                                                  width={224}
                                                ></Skeleton>
                                              </div>
                                              <div className="flex flex-col gap-y-3 w-full">
                                                <Skeleton
                                                  baseColor="#202020"
                                                  highlightColor="#444"
                                                  height={24}
                                                  className="w-full"
                                                ></Skeleton>
                                                <Skeleton
                                                  baseColor="#202020"
                                                  highlightColor="#444"
                                                  height={20}
                                                  className="!w-1/4"
                                                ></Skeleton>
                                                <Skeleton
                                                  baseColor="#202020"
                                                  highlightColor="#444"
                                                  height={50}
                                                  className="w-full"
                                                ></Skeleton>
                                              </div>
                                            </li>
                                          ) : (
                                            <ViewTrailer
                                              onEnterViewport={() =>
                                                setStateProfileNavigation(
                                                  "playlist-trailer-extra"
                                                )
                                              }
                                              // onLeaveViewport={() =>
                                              //   console.log("leave")
                                              // }
                                              type={[params.type, params.uid]}
                                              movePageFunction={
                                                movePageFunction
                                              }
                                              bucketdatavideo={bucketdatavideo}
                                            />
                                          )}
                                        </ul>
                                      ) : (
                                        <ul className="extras-section">
                                          {toggleskeleton ? (
                                            <li className="flex gap-x-8 overflow-clip py-4">
                                              <div>
                                                <Skeleton
                                                  baseColor="#202020"
                                                  highlightColor="#444"
                                                  height={128}
                                                  width={224}
                                                ></Skeleton>
                                              </div>
                                              <div className="flex flex-col gap-y-3 w-full">
                                                <Skeleton
                                                  baseColor="#202020"
                                                  highlightColor="#444"
                                                  height={24}
                                                  className="w-full"
                                                ></Skeleton>
                                                <Skeleton
                                                  baseColor="#202020"
                                                  highlightColor="#444"
                                                  height={20}
                                                  className="!w-1/4"
                                                ></Skeleton>
                                                <Skeleton
                                                  baseColor="#202020"
                                                  highlightColor="#444"
                                                  height={50}
                                                  className="w-full"
                                                ></Skeleton>
                                              </div>
                                            </li>
                                          ) : (
                                            // <ViewExtras
                                            //   onEnterViewport={() =>
                                            //     setStateProfileNavigation(
                                            //       "playlist-trailer-extra"
                                            //     )
                                            //   }
                                            //   onLeaveViewport={() =>
                                            //     console.log("leave")
                                            //   }
                                            // />
                                            <></>
                                          )}
                                        </ul>
                                      )}
                                    </div>
                                  </section>
                                </li>
                              </ul>
                            </div>
                            {lengthbucketsimilar !== 0 ? (
                              <section id="similar-video">
                                <div>
                                  <div className="block my-0 mx-auto py-8">
                                    <h2 className="text-xl font-black mb-6 text-white">
                                      Serupa dengan {item.title}
                                    </h2>
                                    <ul className="-m-3 similar-video-section">
                                      {toggleskeleton ? (
                                        <>
                                          <li className="!inline-block m-3 !w-[calc(20%-24px)]">
                                            <Skeleton
                                              baseColor="#202020"
                                              highlightColor="#444"
                                              height={191}
                                            ></Skeleton>
                                          </li>
                                          <li className="!inline-block m-3 !w-[calc(20%-24px)]">
                                            <Skeleton
                                              baseColor="#202020"
                                              highlightColor="#444"
                                              height={191}
                                            ></Skeleton>
                                          </li>
                                          <li className="!inline-block m-3 !w-[calc(20%-24px)]">
                                            <Skeleton
                                              baseColor="#202020"
                                              highlightColor="#444"
                                              height={191}
                                            ></Skeleton>
                                          </li>
                                          <li className="!inline-block m-3 !w-[calc(20%-24px)]">
                                            <Skeleton
                                              baseColor="#202020"
                                              highlightColor="#444"
                                              height={191}
                                            ></Skeleton>
                                          </li>
                                          <li className="!inline-block m-3 !w-[calc(20%-24px)]">
                                            <Skeleton
                                              baseColor="#202020"
                                              highlightColor="#444"
                                              height={191}
                                            ></Skeleton>
                                          </li>
                                        </>
                                      ) : (
                                        <ViewSimilarVideo
                                          onEnterViewport={() =>
                                            setStateProfileNavigation(
                                              "similar-video"
                                            )
                                          }
                                          movePageFunction={movePageFunction}
                                          genre={item.genre.value}
                                          except={params.uid}
                                          type={params.type}
                                          setLengthBucketSimilar={
                                            setLengthBucketSimilar
                                          }
                                        />
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </section>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </main>
                    </div>
                  )}
                  <Transition show={statemodal} as={Fragment}>
                    <Dialog
                      open={statemodal}
                      onClose={() => {}}
                      className="relative z-[9999]"
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div
                          className="fixed inset-0 bg-black/50"
                          aria-hidden="true"
                        />
                      </Transition.Child>

                      <div className="fixed inset-0 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Dialog.Panel className="mx-auto w-[380px] sm:w-[488px] bg-pallete-4 shadow-default rounded-md">
                              <div
                                className="absolute hover:text-graydark top-0 right-0 p-4 z-9 hover:text-rose-600 cursor-pointer"
                                onClick={() => {
                                  toggleModal();
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-[18px] h-[18px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                              <Dialog.Title
                                className={
                                  "text-xl font-semibold leading-[1.05] text-gray-100 text-center m-[48px_32px_0]"
                                }
                              >
                                Bagikan ke Semua Orang
                              </Dialog.Title>
                              <Dialog.Description
                                className={"text-gray-100 text-sm mb-4"}
                              ></Dialog.Description>
                              <div className="p-[24px_32px_32px]">
                                <div className="block">
                                  <div className="flex flex-col gap-y-2 md:block mt-2">
                                    <button
                                      className="inline-block mr-2 rounded-sm p-2 text-center w-full md:w-[49%] bg-[#1877F2]"
                                      onClick={handleShareFacebook}
                                    >
                                      <span
                                        className="bg-cover bg-no-repeat bg-[50%] inline-block h-6 mr-[10px] align-middle w-6"
                                        style={{
                                          backgroundImage: `url(/facebook.svg)`,
                                        }}
                                      ></span>
                                      <span className="text-gray-100 font-semibold align-middle text-sm text-center break-words">
                                        Bagikan ke Facebook
                                      </span>
                                    </button>
                                    <button
                                      className="inline-block rounded-sm p-2 text-center w-full md:w-[49%] bg-white"
                                      onClick={handleShareTwitter}
                                    >
                                      <span
                                        className="bg-cover bg-no-repeat bg-[50%] inline-block h-6 mr-[10px] align-middle w-6"
                                        style={{
                                          backgroundImage: `url(/X.svg)`,
                                        }}
                                      ></span>
                                      <span className="text-gray-900 font-semibold align-middle text-sm text-center break-words">
                                        Bagikan ke X
                                      </span>
                                    </button>
                                  </div>
                                  <div className="m-[24px_0_32px]">
                                    <span className="text-gray-100 text-sm break-words font-semibold">
                                      Salin tautan luplay
                                    </span>
                                    <div className="mt-2">
                                      <textarea
                                        className="border border-gray-400 rounded h-[100px] resize-none w-full text-gray-900 text-[0.8em]"
                                        readOnly
                                        value={
                                          "http://localhost:3002/" +
                                          params.type +
                                          "/" +
                                          params.uid +
                                          "/" +
                                          params.title +
                                          "?utm_source=referral&utm_medium=share-link"
                                        }
                                        ref={textareaRef}
                                      ></textarea>
                                      <div className="flex items-center gap-2 w-full">
                                        <button
                                          className="h-8 w-16 bg-gray-200 rounded text-center block"
                                          type="button"
                                          onClick={handleCopyClick}
                                        >
                                          <ClipboardDocumentIcon className="w-full h-6"></ClipboardDocumentIcon>
                                        </button>
                                        {successcopy ? (
                                          <span className="text-green-400 text-xs transition-all ease-in duration-100">
                                            Berhasil disalin!
                                          </span>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </React.Fragment>
              ))
            ) : (
              <></>
            )}
          </div>
          <div
            className={`curtain__panel ${
              headlinevisible ? `` : "h-[110vh] lg:h-[132vh]"
            } curtain__panel--right`}
            style={{
              height: headlinevisible
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

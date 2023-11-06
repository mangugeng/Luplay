"use client";

import { useState, useEffect, Fragment, useRef } from "react";
import Navbar from "../../components/navbar";
import Image from "next/image";
import banner from "../../../public/banner-detail.webp";
import bannermobile from "../../../public/banner-detail-mobile.webp";
import crown from "../../../public/crown.png";
import { PlayCircleIcon, PlayIcon } from "@heroicons/react/24/solid";
import {
  ArrowLeftIcon,
  BookmarkIcon,
  ChevronUpDownIcon,
  FunnelIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import episode from "../../../public/episode-1.webp";
import { Listbox, Transition } from "@headlessui/react";
import headline from "../../../public/headline-1.webp";
import trailer from "../../../public/trailer-1.webp";
import extra from "../../../public/extra-1.webp";
import similar from "../../../public/similar-1.webp";
import { useRouter } from "next/navigation";
import Link from "next/link";
import handleViewport, { type InjectedViewportProps } from "react-in-viewport";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const filterepisode = [
  { id: 1, name: "Terlama ke Terbaru" },
  { id: 2, name: "Terbaru ke Terlama" },
];

const filtertrailerextra = [
  { id: 1, name: "Trailer" },
  { id: 2, name: "Extras" },
];

const Synopsis = (props: InjectedViewportProps<HTMLDivElement>) => {
  const { inViewport, forwardedRef } = props;
  const animate = inViewport ? "inviewport" : "outviewport";
  return (
    <>
      <div className={`${animate}`} ref={forwardedRef}>
        <p className="text-white block text-sm mt-3 whitespace-normal">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
          <br></br>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </p>
      </div>
    </>
  );
};

const AllEpisode = (props: InjectedViewportProps<HTMLLIElement>) => {
  const { inViewport, forwardedRef } = props;
  const animate = inViewport ? "inviewport" : "outviewport";
  return (
    <>
      <li className={`block list-episode ${animate}`} ref={forwardedRef}>
        <Link
          href="/watch/632/merajut-dendam"
          className="group block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
        >
          <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
            <Image
              src={episode}
              alt="Picture of the author"
              className="align-middle h-full w-full absolute left-0 top-0"
            />
          </div>
          <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
            <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
              Ep 01 - Harta, Tahta, Wanita
            </h3>
            <span className="text-gray-300 inline-block text-sm align-middle">
              43 menit
            </span>
            <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold ml-3 py-1 px-2 text-center uppercase">
              free
            </span>
            <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal">
              Rasya Perdana, pengacara handal dari keluarga terpandang yang
              tersandung kasus video perselingkuhannya. Siapa dalang dibalik
              penyebaran video itu?
            </p>
          </div>
        </Link>
      </li>
      <li className={`block list-episode ${animate}`}>
        <Link
          href="/watch/632/merajut-dendam"
          className="group block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
        >
          <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
            <Image
              src={episode}
              alt="Picture of the author"
              className="align-middle h-full w-full absolute left-0 top-0"
            />
          </div>
          <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
            <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
              Ep 01 - Harta, Tahta, Wanita
            </h3>
            <span className="text-gray-300 inline-block text-sm align-middle">
              43 menit
            </span>
            <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold ml-3 py-1 px-2 text-center uppercase">
              free
            </span>
            <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal">
              Rasya Perdana, pengacara handal dari keluarga terpandang yang
              tersandung kasus video perselingkuhannya. Siapa dalang dibalik
              penyebaran video itu?
            </p>
          </div>
        </Link>
      </li>
      <li className={`block list-episode ${animate}`}>
        <Link
          href="/watch/632/merajut-dendam"
          className="group block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
        >
          <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
            <Image
              src={episode}
              alt="Picture of the author"
              className="align-middle h-full w-full absolute left-0 top-0"
            />
          </div>
          <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
            <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
              Ep 01 - Harta, Tahta, Wanita
            </h3>
            <span className="text-gray-300 inline-block text-sm align-middle">
              43 menit
            </span>
            <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold ml-3 py-1 px-2 text-center uppercase">
              free
            </span>
            <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal">
              Rasya Perdana, pengacara handal dari keluarga terpandang yang
              tersandung kasus video perselingkuhannya. Siapa dalang dibalik
              penyebaran video itu?
            </p>
          </div>
        </Link>
      </li>
    </>
  );
};

const Trailer = (props: InjectedViewportProps<HTMLLIElement>) => {
  const { inViewport, forwardedRef } = props;
  const animate = inViewport ? "inviewport" : "outviewport";
  return (
    <>
      <li className={`block list-trailer ${animate}`} ref={forwardedRef}>
        <a
          href="#"
          className="group block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
        >
          <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
            <Image
              src={trailer}
              alt="Picture of the author"
              className="align-middle h-full w-full absolute left-0 top-0"
            />
          </div>
          <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
            <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
              Merajut Dendam - Luplay Original Series | Official Teaser
            </h3>
            <span className="text-gray-300 inline-block text-sm align-middle">
              &lt; 1 menit
            </span>
            <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold ml-3 py-1 px-2 text-center uppercase">
              free
            </span>
            <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal">
              Nina memiliki segalanya; suami yang mapan dan keluarga yang
              sempurna. Semua berubah ketika suaminya, Rasya, dituduh sebagai
              tersangka kasus pencabulan.
            </p>
          </div>
        </a>
      </li>
      <li className={`block list-trailer ${animate}`}>
        <a
          href="#"
          className="group block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
        >
          <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
            <Image
              src={trailer}
              alt="Picture of the author"
              className="align-middle h-full w-full absolute left-0 top-0"
            />
          </div>
          <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
            <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
              Merajut Dendam - Luplay Original Series | Official Teaser
            </h3>
            <span className="text-gray-300 inline-block text-sm align-middle">
              &lt; 1 menit
            </span>
            <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold ml-3 py-1 px-2 text-center uppercase">
              free
            </span>
            <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal">
              Nina memiliki segalanya; suami yang mapan dan keluarga yang
              sempurna. Semua berubah ketika suaminya, Rasya, dituduh sebagai
              tersangka kasus pencabulan.
            </p>
          </div>
        </a>
      </li>
      <li className={`block list-trailer ${animate}`}>
        <a
          href="#"
          className="group block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
        >
          <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
            <Image
              src={trailer}
              alt="Picture of the author"
              className="align-middle h-full w-full absolute left-0 top-0"
            />
          </div>
          <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
            <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
              Merajut Dendam - Luplay Original Series | Official Teaser
            </h3>
            <span className="text-gray-300 inline-block text-sm align-middle">
              &lt; 1 menit
            </span>
            <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold ml-3 py-1 px-2 text-center uppercase">
              free
            </span>
            <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal">
              Nina memiliki segalanya; suami yang mapan dan keluarga yang
              sempurna. Semua berubah ketika suaminya, Rasya, dituduh sebagai
              tersangka kasus pencabulan.
            </p>
          </div>
        </a>
      </li>
    </>
  );
};

const Extras = (props: InjectedViewportProps<HTMLLIElement>) => {
  const { inViewport, forwardedRef } = props;
  const animate = inViewport ? "inviewport" : "outviewport";
  return (
    <>
      <li className={`block list-extras ${animate}`} ref={forwardedRef}>
        <a
          href="#"
          className="group block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
        >
          <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
            <Image
              src={extra}
              alt="Picture of the author"
              className="align-middle h-full w-full absolute left-0 top-0"
            />
          </div>
          <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
            <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
              Merajut Dendam - Luplay Original Series | Next On Episode 2
            </h3>
            <span className="text-gray-300 inline-block text-sm align-middle">
              1 menit
            </span>
            <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold ml-3 py-1 px-2 text-center uppercase">
              free
            </span>
            <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal"></p>
          </div>
        </a>
      </li>
      <li className={`block list-extras ${animate}`}>
        <a
          href="#"
          className="group block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
        >
          <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
            <Image
              src={extra}
              alt="Picture of the author"
              className="align-middle h-full w-full absolute left-0 top-0"
            />
          </div>
          <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
            <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
              Merajut Dendam - Luplay Original Series | Next On Episode 2
            </h3>
            <span className="text-gray-300 inline-block text-sm align-middle">
              1 menit
            </span>
            <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold ml-3 py-1 px-2 text-center uppercase">
              free
            </span>
            <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal"></p>
          </div>
        </a>
      </li>
      <li className={`block list-extras ${animate}`}>
        <a
          href="#"
          className="group block py-4 relative before:bg-transparent before:rounded-md before:content-[''] before:h-full before:-left-4 before:absolute before:top-0 before:ease-linear before:transition-all before:duration-200 before:w-[calc(100%+32px)]"
        >
          <div className="bg-gray-950 rounded-md inline-block h-32 overflow-hidden relative align-top w-56 z-[1] after:bg-black/40 after:bg-play-episode after:bg-[56%] after:bg-no-repeat after:bg-[length:32px_32px] after:rounded-[100%] after:content-[''] after:inline-block after:h-[50px] after:left-1/2 after:opacity-0 group-hover:after:opacity-100 after:absolute after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[50px]">
            <Image
              src={extra}
              alt="Picture of the author"
              className="align-middle h-full w-full absolute left-0 top-0"
            />
          </div>
          <div className="inline-block ml-8 relative align-top w-[calc(100%-260px)] z-[1]">
            <h3 className="text-white block text-base font-black mb-2 group-hover:underline">
              Merajut Dendam - Luplay Original Series | Next On Episode 2
            </h3>
            <span className="text-gray-300 inline-block text-sm align-middle">
              1 menit
            </span>
            <span className="bg-gray-600/30 rounded-md text-white text-xs font-bold ml-3 py-1 px-2 text-center uppercase">
              free
            </span>
            <p className="line-clamp-3 text-white block text-sm mt-3 max-h-20 overflow-hidden text-ellipsis whitespace-normal"></p>
          </div>
        </a>
      </li>
    </>
  );
};

const SimilarVideo = (props: InjectedViewportProps<HTMLLIElement>) => {
  const { inViewport, forwardedRef } = props;
  const animate = inViewport ? "inviewport" : "outviewport";
  return (
    <>
      <li
        className={`inline-block m-2 w-[calc(33.33%-16px)] md:w-[calc(25.33%-20px)] lg:m-3 lg:w-[calc(20%-24px)] list-similar-video ${animate}`}
        ref={forwardedRef}
      >
        <a href="#" className="block">
          <div className="bg-black/40 rounded-md block overflow-hidden pt-[144.4%] relative w-full">
            <Image
              src={similar}
              alt="Picture of the author"
              className="h-full w-full absolute left-0 top-0"
            />
            <div
              className="bottom-2 h-6 left-2 absolute w-6 bg-contain bg-no-repeat"
              style={{
                backgroundImage: `url(${crown.src})`,
              }}
            ></div>
          </div>
        </a>
      </li>
      <li
        className={`inline-block m-2 w-[calc(33.33%-16px)] md:w-[calc(25.33%-20px)] lg:m-3 lg:w-[calc(20%-24px)] list-similar-video ${animate}`}
      >
        <a href="#" className="block">
          <div className="bg-black/40 rounded-md block overflow-hidden pt-[144.4%] relative w-full">
            <Image
              src={similar}
              alt="Picture of the author"
              className="h-full w-full absolute left-0 top-0"
            />
            <div
              className="bottom-2 h-6 left-2 absolute w-6 bg-contain bg-no-repeat"
              style={{
                backgroundImage: `url(${crown.src})`,
              }}
            ></div>
          </div>
        </a>
      </li>
      <li
        className={`inline-block m-2 w-[calc(33.33%-16px)] md:w-[calc(25.33%-20px)] lg:m-3 lg:w-[calc(20%-24px)] list-similar-video ${animate}`}
      >
        <a href="#" className="block">
          <div className="bg-black/40 rounded-md block overflow-hidden pt-[144.4%] relative w-full">
            <Image
              src={similar}
              alt="Picture of the author"
              className="h-full w-full absolute left-0 top-0"
            />
            <div
              className="bottom-2 h-6 left-2 absolute w-6 bg-contain bg-no-repeat"
              style={{
                backgroundImage: `url(${crown.src})`,
              }}
            ></div>
          </div>
        </a>
      </li>
      <li
        className={`inline-block m-2 w-[calc(33.33%-16px)] md:w-[calc(25.33%-20px)] lg:m-3 lg:w-[calc(20%-24px)] list-similar-video ${animate}`}
      >
        <a href="#" className="block">
          <div className="bg-black/40 rounded-md block overflow-hidden pt-[144.4%] relative w-full">
            <Image
              src={similar}
              alt="Picture of the author"
              className="h-full w-full absolute left-0 top-0"
            />
            <div
              className="bottom-2 h-6 left-2 absolute w-6 bg-contain bg-no-repeat"
              style={{
                backgroundImage: `url(${crown.src})`,
              }}
            ></div>
          </div>
        </a>
      </li>
      <li
        className={`inline-block m-2 w-[calc(33.33%-16px)] md:w-[calc(25.33%-20px)] lg:m-3 lg:w-[calc(20%-24px)] list-similar-video ${animate}`}
      >
        <a href="#" className="block">
          <div className="bg-black/40 rounded-md block overflow-hidden pt-[144.4%] relative w-full">
            <Image
              src={similar}
              alt="Picture of the author"
              className="h-full w-full absolute left-0 top-0"
            />
            <div
              className="bottom-2 h-6 left-2 absolute w-6 bg-contain bg-no-repeat"
              style={{
                backgroundImage: `url(${crown.src})`,
              }}
            ></div>
          </div>
        </a>
      </li>
    </>
  );
};

const ViewSynopsis = handleViewport(Synopsis /** options: {}, config: {} **/);
const ViewAllEpisode = handleViewport(
  AllEpisode /** options: {}, config: {} **/
);
const ViewTrailer = handleViewport(Trailer /** options: {}, config: {} **/);
const ViewExtras = handleViewport(Extras /** options: {}, config: {} **/);
const ViewSimilarVideo = handleViewport(
  SimilarVideo /** options: {}, config: {} **/
);

export default function Page() {
  const router = useRouter();

  const [toggleskeleton, setToggleSkeleton] = useState<boolean>(true);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [selectedfilterepisode, setSelectedFilterEpisode] = useState(
    filterepisode[0]
  );
  const [selectedtrailerextra, setSelectedTrailerExtra] = useState(
    filtertrailerextra[0]
  );
  const [stateprofilenavigation, setStateProfileNavigation] =
    useState("playlist-episode");
  const [headlinevisible, setHeadlineVisible] = useState<boolean>(false);
  const [sidebarfixed, setSidebarFixed] = useState<boolean>(false);
  const [devicemobile, setDeviceMobile] = useState<boolean>(false);
  const [openselectedtrailerextra, setOpensetSelectedFilterEpisode] =
    useState<boolean>(false);

  const curtaincontentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const changeHeadlineVisible = () => {
      if (window.scrollY >= 280) {
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
      setTimeout(function () {
        setToggleSkeleton(false);
      }, 2000);
      setPageLoaded(true);
      setCheckboxCurtain(true);
    }
  }, []);

  const movePageFunction = (param: string) => {
    setCheckboxCurtain((current) => !current);
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000).then(() => router.push(param));
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
      <header className="fixed z-50 w-full top-0 bg-pallete-5 shadow-md hidden lg:block">
        <Navbar movePageFunction={movePageFunction}></Navbar>
      </header>
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
          <div className="curtain__content" ref={curtaincontentRef}>
            {pageloaded ? (
              devicemobile ? (
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
                        Merajut Dendam
                      </h1>
                      <div className="flex text-sm font-bold justify-center left-0 max-h-[44px] absolute right-0 top-14 whitespace-nowrap w-auto z-[4]">
                        <button
                          type="button"
                          onClick={() =>
                            movePageFunction("/watch/632/merajut-dendam")
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
                      >
                        <ShareIcon className="w-6 h-6"></ShareIcon>
                      </button>
                    </div>
                    <button
                      type="button"
                      className="block pt-[56.27%] relative w-full"
                      onClick={() =>
                        movePageFunction("/watch/632/merajut-dendam")
                      }
                    >
                      <picture className="top-0 right-0 bottom-0 left-0 absolute">
                        <Image src={bannermobile} alt="Picture of the author" />
                        <div className="bg-pallete-4/50 items-center rounded-2xl bottom-4 text-white inline-flex text-xs font-normal justify-center left-4 min-w-[32px] py-2 px-3 absolute">
                          <PlayIcon className="w-4 h-4 mr-2"></PlayIcon>
                          <span>Trailer</span>
                        </div>
                      </picture>
                    </button>
                    <div className="mt-4 mx-4 mb-2">
                      <div className="flex items-start justify-between">
                        <h1 className="line-clamp-2 text-xl font-bold mb-2 text-ellipsis whitespace-pre-wrap">
                          Merajut Dendam
                        </h1>
                        <button className="w-fit">
                          <BookmarkIcon className="w-6 h-6"></BookmarkIcon>
                        </button>
                      </div>
                      <div className="flex items-center text-sm my-3 whitespace-nowrap text-gray-300">
                        <Image
                          src={crown}
                          className="w-4 h-4"
                          alt="Picture of the author"
                        />
                        <div className="border-l border-l-gray-300 ml-1 pl-1">
                          18+
                        </div>
                        <div className="border-l border-l-gray-300 ml-1 pl-1">
                          2023
                        </div>
                        <div className="border-l border-l-gray-300 ml-1 pl-1">
                          6 Episodes
                        </div>
                        <a
                          href="#"
                          className="border-l border-l-gray-300 ml-1 pl-1 flex-shrink"
                        >
                          Drama
                        </a>
                        <a
                          href="#"
                          className="border-l border-l-gray-300 ml-1 pl-1 flex-shrink"
                        >
                          Romance
                        </a>
                      </div>
                      <p className="text-white text-sm font-medium mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                        Express Episode 5 & 6 Tayang Tanggal 27 Oktober
                      </p>
                      <div className="my-2 w-100% transition ease-out delay-200">
                        <button
                          type="button"
                          onClick={() =>
                            movePageFunction("/watch/632/merajut-dendam")
                          }
                          className="text-sm font-bold mx-auto whitespace-nowrap w-full min-w-[40px] py-2 px-4 items-center rounded inline-flex justify-center bg-pallete-4 shadow-md"
                        >
                          <PlayIcon className="w-4 h-4 mr-3"></PlayIcon>
                          Putar Sekarang
                        </button>
                      </div>
                      <div className="my-2">
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
                      </div>
                      <div className="text-sm ">
                        <div className="block relative text-white">
                          <article className="text-sm">
                            <p className="mb-2">
                              Nina memiliki segalanya, suami yang mapan dan
                              keluarga yang sempurna. Semua berubah ketika
                              suaminya, Rasya, dituduh sebagai tersangka kasus
                              pencabulan.
                            </p>
                          </article>
                          <p className="mb-2 flex text-sm ">
                            <span className="mr-1 text-gray-300">
                              Sutradara:
                            </span>
                            <span>
                              <a href="#" className="inline ">
                                Razka Robby Ertanto
                              </a>
                            </span>
                          </p>
                          <p className="mb-2 flex text-sm ">
                            <span className="mr-1 text-gray-300">Pemain:</span>
                            <span>
                              <a href="#" className="inline">
                                Oka Antara
                              </a>
                              , &nbsp;
                              <a href="#" className="inline">
                                Laura Basuki
                              </a>
                              , &nbsp;
                              <a href="#" className="inline">
                                Carissa Perusset
                              </a>
                              , &nbsp;
                              <a href="#" className="inline ">
                                Andri Mashadi
                              </a>
                              , &nbsp;
                              <a href="#" className="inline ">
                                Sheila Marcia
                              </a>
                              , &nbsp;
                            </span>
                          </p>
                        </div>
                        <button
                          type="button"
                          className="text-blue-400 font-semibold"
                        >
                          Lebih Sedikit
                        </button>
                      </div>
                    </div>
                    <Tabs className="tabs-detail-video">
                      <TabList>
                        <Tab>Episode</Tab>
                        <Tab>Trailer & Ekstra</Tab>
                        <Tab>Konten Sejenis</Tab>
                      </TabList>
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
                              <li>
                                <div className="block">
                                  <a href="" className="flex items-center">
                                    <div className="rounded-lg h-20 overflow-hidden relative align-top w-36 z-[1]">
                                      <Image
                                        src={episode}
                                        className="aspect-[16/9] object-cover object-center"
                                        alt="Picture of the author"
                                      />
                                      <div className="bottom-1 left-0 absolute">
                                        <span className="text-[8px] py-[3px] px-[6px] bg-white border border-solid border-gray-100 rounded-sm text-gray-900 block font-medium mb-1 ml-1">
                                          GRATIS
                                        </span>
                                      </div>
                                      <div className="bottom-2 absolute right-2">
                                        <time className="text-[10px] font-normal py-[1px] px-[2px] bg-black/50 rounded-sm text-white text-center">
                                          43:35
                                        </time>
                                      </div>
                                    </div>
                                    <div className="flex-[1_1] ml-2">
                                      <h3 className="line-clamp-3 max-h-[54px] break-words text-white text-sm font-semibold mb-[2px] text-ellipsis">
                                        Ep 01 - Harta, Tahta, Wanita
                                      </h3>
                                    </div>
                                  </a>
                                </div>
                                <p className="line-clamp-2 text-white text-sm mt-1 max-h-[42px] text-left text-ellipsis break-words">
                                  Rasya Perdana, pengacara handal dari keluarga
                                  terpandang yang tersandung kasus video
                                  perselingkuhannya. Siapa dalang dibalik
                                  penyebaran video itu?
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="mt-4 mx-4 min-h-[100px] lg:min-h-[200px] pb-16">
                          <div className="flex items-center justify-between">
                            <div>
                              <button
                                type="button"
                                className="flex flex-row shadow-md items-center gap-x-2 text-xs text-gray-300 font-semibold py-2 px-3 border border-solid rounded-md"
                                onClick={() =>
                                  setOpensetSelectedFilterEpisode(
                                    (current) => !current
                                  )
                                }
                              >
                                {selectedtrailerextra.name}
                                <ChevronUpDownIcon className="w-4 h-4"></ChevronUpDownIcon>
                              </button>
                            </div>
                            <div
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
                            </div>
                            <div>
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
                            </div>
                          </div>
                          <div className="block">
                            {selectedtrailerextra.id == 1 ? (
                              <ul className="mt-4">
                                <li>
                                  <div className="block">
                                    <a href="" className="flex items-center">
                                      <div className="rounded-lg h-20 overflow-hidden relative align-top w-36 z-[1]">
                                        <Image
                                          src={trailer}
                                          className="aspect-[16/9] object-cover object-center"
                                          alt="Picture of the author"
                                        />
                                        <div className="bottom-1 left-0 absolute">
                                          <span className="text-[8px] py-[3px] px-[6px] bg-white border border-solid border-gray-100 rounded-sm text-gray-900 block font-medium mb-1 ml-1">
                                            GRATIS
                                          </span>
                                        </div>
                                        <div className="bottom-2 absolute right-2">
                                          <time className="text-[10px] font-normal py-[1px] px-[2px] bg-black/50 rounded-sm text-white text-center">
                                            00:45
                                          </time>
                                        </div>
                                      </div>
                                      <div className="flex-[1_1] ml-2">
                                        <h3 className="line-clamp-3 max-h-[54px] break-words text-white text-sm font-semibold mb-[2px] text-ellipsis">
                                          Merajut Dendam - Luplay Original Series
                                          | Official Teaser
                                        </h3>
                                      </div>
                                    </a>
                                  </div>
                                  <p className="line-clamp-2 text-white text-sm mt-1 max-h-[42px] text-left text-ellipsis break-words">
                                    Nina memiliki segalanya; suami yang mapan
                                    dan keluarga yang sempurna. Semua berubah
                                    ketika suaminya, Rasya, dituduh sebagai
                                    tersangka kasus pencabulan.
                                  </p>
                                </li>
                              </ul>
                            ) : (
                              <ul className="mt-4">
                                <li>
                                  <div className="block">
                                    <a href="" className="flex items-center">
                                      <div className="rounded-lg h-20 overflow-hidden relative align-top w-36 z-[1]">
                                        <Image
                                          src={extra}
                                          className="aspect-[16/9] object-cover object-center"
                                          alt="Picture of the author"
                                        />
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
                                          Merajut Dendam - Luplay Original Series
                                          | Next On Episode 2
                                        </h3>
                                      </div>
                                    </a>
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
                              onLeaveViewport={() => console.log("leave")}
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
                            headlinevisible ? "visible" : "invisible opacity-0"
                          } items-center bg-gray-600 flex h-24 left-0 overflow-hidden fixed w-full z-20 container-headline-details`}
                        >
                          <div>
                            <Image
                              src={headline}
                              alt="Picture of the author"
                              className="block h-full w-full blur-2xl left-0 opacity-100 absolute top-1/2 -translate-y-1/2 z-0"
                            />
                          </div>
                          <div className="items-center flex h-24 justify-between m-auto relative w-[1020px]">
                            <h2 className="text-white basis-[45%] text-2xl font-black ml-6 overflow-hidden text-ellipsis whitespace-nowrap">
                              Merajut Dendam
                            </h2>
                            <div className="basis-1/2 grow-[2] justify-end m-0 text-right flex gap-2">
                              <div className="flex gap-2 mb-4">
                                <button
                                  onClick={() =>
                                    movePageFunction(
                                      "/watch/632/merajut-dendam"
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
                                  className="inline-flex py-3 px-6 text-center border border-white rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white"
                                >
                                  <BookmarkIcon className="w-6 h-6 mr-2"></BookmarkIcon>
                                  Daftarku
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex py-3 px-6 text-center border border-white rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white"
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
                                src={banner}
                                width={960}
                                height={540}
                                alt="Picture of the author"
                                className="block h-full w-full"
                              />
                              <div className="overlay-gradient-detail"></div>
                            </div>
                          </div>
                          <div className="flex justify-center items-center h-full left-0 absolute top-0 w-full z-[1]">
                            <div className="w-full lg:max-w-4xl xl:max-w-6xl ">
                              <div className="w-[454px] text-white">
                                <h1 className="text-3xl font-bold">
                                  Merajut Dendam
                                </h1>
                                <div className="flex items-center font-semibold gap-1 mt-2 text-xs">
                                  <div
                                    className="h-6 w-6 bg-contain bg-no-repeat"
                                    style={{
                                      backgroundImage: `url(${crown.src})`,
                                    }}
                                  ></div>
                                  <span className="separator">•</span>
                                  <div className="border border-solid border-white rounded-sm px-1">
                                    18+
                                  </div>
                                  <span className="separator">•</span>
                                  <div className="">2023</div>
                                  <span className="separator">•</span>
                                  <div className="">3 Episodes</div>
                                  <span className="separator">•</span>
                                  <div className="">
                                    <a
                                      href="#"
                                      className="hover:underline hover:text-blue-600"
                                    >
                                      Drama
                                    </a>
                                    ,&nbsp;
                                    <a
                                      href="#"
                                      className="hover:underline hover:text-blue-600"
                                    >
                                      Romance
                                    </a>
                                  </div>
                                </div>
                                <div className="mt-2 mb-4">
                                  <p className="line-clamp-4 text-sm mb-3">
                                    Nina memiliki segalanya; suami yang mapan
                                    dan keluarga yang sempurna. Semua berubah
                                    ketika suaminya, Rasya, dituduh sebagai
                                    tersangka kasus pencabulan.
                                  </p>
                                  <div className="flex gap-2 items-start text-sm">
                                    <div className="shrink-0 text-gray-400">
                                      Sutradara:&nbsp;
                                    </div>
                                    <div>
                                      <a
                                        href="#"
                                        className="hover:underline hover:text-blue-600"
                                      >
                                        Razka Robby Ertanto
                                      </a>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 items-start text-sm">
                                    <div className="shrink-0 text-gray-400">
                                      Pemain:&nbsp;
                                    </div>
                                    <div className="headline-info__people-item">
                                      <a
                                        href="#"
                                        className="hover:underline hover:text-blue-600"
                                      >
                                        Oka Antara
                                      </a>
                                      ,&nbsp;
                                      <a
                                        href="#"
                                        className="hover:underline hover:text-blue-600"
                                      >
                                        Laura Basuki
                                      </a>
                                      ,&nbsp;
                                      <a
                                        href="#"
                                        className="hover:underline hover:text-blue-600"
                                      >
                                        Carissa Perusset
                                      </a>
                                      ,&nbsp;
                                      <a
                                        href="#"
                                        className="hover:underline hover:text-blue-600"
                                      >
                                        Andri Mashadi
                                      </a>
                                      ,&nbsp;
                                      <a
                                        href="#"
                                        className="hover:underline hover:text-blue-600"
                                      >
                                        Sheila Marcia
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-sm font-semibold mb-2">
                                  Nonton Lebih Cepat Episode 3 dengan
                                  Luplay&nbsp;Express!
                                </div>
                                <div className="flex gap-2 mb-4">
                                  <button
                                    onClick={() =>
                                      movePageFunction(
                                        "/watch/632/merajut-dendam"
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
                                    className="inline-flex py-3 px-6 text-center border border-white rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white"
                                  >
                                    <BookmarkIcon className="w-6 h-6 mr-2"></BookmarkIcon>
                                    Daftarku
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-flex py-3 px-6 text-center border border-white rounded-md font-bold items-center shadow-lg text-gray-300 hover:text-white"
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
                                  setStateProfileNavigation("synopsis-video")
                                }
                              >
                                Sinopsis
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#playlist-episode"
                                className={`${
                                  stateprofilenavigation == "playlist-episode"
                                    ? "text-white font-black border-l-pallete-3"
                                    : "text-gray-300 font-normal hover:text-white"
                                } block border-l-4 text-lg capitalize py-2 px-5`}
                                onClick={() =>
                                  setStateProfileNavigation("playlist-episode")
                                }
                              >
                                Episode
                              </Link>
                            </li>
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
                                Trailer & Ekstra
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#similar-video"
                                className={`${
                                  stateprofilenavigation == "similar-video"
                                    ? "text-white font-black border-l-pallete-3"
                                    : "text-gray-300 font-normal hover:text-white"
                                } block border-l-4 text-lg capitalize py-2 px-5`}
                                onClick={() =>
                                  setStateProfileNavigation("similar-video")
                                }
                              >
                                Konten Sejenis
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="w-[758px]">
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
                                    setStateProfileNavigation("synopsis-video")
                                  }
                                  onLeaveViewport={() => console.log("leave")}
                                />
                              </section>
                            </li>
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
                                              {filterepisode.map((filter) => (
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
                                              ))}
                                            </Listbox.Options>
                                          </Transition>
                                        </>
                                      )}
                                    </Listbox>
                                  </div>
                                </div>
                                <div className="relative -z-[1]">
                                  <ul className="all-episode-section">
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
                                      <ViewAllEpisode
                                        onEnterViewport={() =>
                                          setStateProfileNavigation(
                                            "playlist-episode"
                                          )
                                        }
                                        onLeaveViewport={() =>
                                          console.log("leave")
                                        }
                                      />
                                    )}
                                  </ul>
                                </div>
                              </section>
                            </li>
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
                                              {filterepisode.map((filter) => (
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
                                              ))}
                                            </Listbox.Options>
                                          </Transition>
                                        </>
                                      )}
                                    </Listbox>
                                  </div>
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
                                          onLeaveViewport={() =>
                                            console.log("leave")
                                          }
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
                                        <ViewExtras
                                          onEnterViewport={() =>
                                            setStateProfileNavigation(
                                              "playlist-trailer-extra"
                                            )
                                          }
                                          onLeaveViewport={() =>
                                            console.log("leave")
                                          }
                                        />
                                      )}
                                    </ul>
                                  )}
                                </div>
                              </section>
                            </li>
                          </ul>
                        </div>
                        <section id="similar-video">
                          <div>
                            <div className="block my-0 mx-auto py-8">
                              <h2 className="text-xl font-black mb-6 text-white">
                                Serupa dengan Merajut Dendam
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
                                      setStateProfileNavigation("similar-video")
                                    }
                                    onLeaveViewport={() => console.log("leave")}
                                  />
                                )}
                              </ul>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </main>
                </div>
              )
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
    </>
  );
}

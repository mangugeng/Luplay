import {
  BookmarkIcon,
  FireIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export default function NavbarBottomMobiel() {
  return (
    <div className="fixed bottom-0 left-0 z-10 w-full h-16 bg-black border-t border-black shadow-[0_-4px_8px_-1px_rgba(0,0,0,0.5)]">
      <ul className="flex h-14 pt-2 pb-[6px]">
        <li className="flex-[1_1] h-10">
          <a
            href="#"
            className="flex items-center flex-col h-10 justify-center"
          >
            <div className="h-6 w-6 pb-[5px] text-center">
              <div className="text-white">
                <HomeIcon></HomeIcon>
              </div>
            </div>
            <div className="text-xs font-medium text-center text-white">
              Beranda
            </div>
          </a>
        </li>
        <li className="flex-[1_1] h-10">
          <a
            href="#"
            className="flex items-center flex-col h-10 justify-center"
          >
            <div className="h-6 w-6 pb-[5px] text-center">
              <div className="text-white">
                <FireIcon></FireIcon>
              </div>
            </div>
            <div className="text-xs font-medium text-center text-white">
              Trending
            </div>
          </a>
        </li>
        <li className="flex-[1_1] h-10">
          <a
            href="#"
            className="flex items-center flex-col h-10 justify-center"
          >
            <div className="h-6 w-6 pb-[5px] text-center">
              <div className="text-white">
                <BookmarkIcon></BookmarkIcon>
              </div>
            </div>
            <div className="text-xs font-medium text-center text-white">
              Watchlist
            </div>
          </a>
        </li>
        <li className="flex-[1_1] h-10">
          <a
            href="#"
            className="flex items-center flex-col h-10 justify-center"
          >
            <div className="h-6 w-6 pb-[5px] text-center">
              <div className="text-white">
                <UserIcon></UserIcon>
              </div>
            </div>
            <div className="text-xs font-medium text-center text-white">
              Profil
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}

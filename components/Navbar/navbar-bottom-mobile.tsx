import { useAuthContext } from "@/context/auth-context";
import {
  BookmarkSquareIcon,
  FireIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface NavbarProps {
  movePageFunction: (param: string) => void;
}

const NavbarBottomMobile: FC<NavbarProps> = ({ movePageFunction }) => {
  const { user } = useAuthContext();
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 z-10 w-full h-16 bg-black border-t border-black shadow-[0_-4px_8px_-1px_rgba(0,0,0,0.5)]">
      <ul className="flex h-14 pt-2 pb-[6px]">
        <li className="flex-[1_1] h-10">
          <button
            type="button"
            onClick={() => movePageFunction("/")}
            className="flex items-center flex-col h-10 justify-center w-full"
            disabled={pathname == '/' ? true : false}
          >
            <div className="h-6 w-6 pb-[5px] text-center">
              <div className="text-white">
                <HomeIcon></HomeIcon>
              </div>
            </div>
            <div className="text-xs font-medium text-center text-white">
              Beranda
            </div>
          </button>
        </li>
        <li className="flex-[1_1] h-10">
          <button
            type="button"
            onClick={() => movePageFunction("/trending")}
            className="flex items-center flex-col h-10 justify-center w-full"
            disabled={pathname == '/trending' ? true : false}
          >
            <div className="h-6 w-6 pb-[5px] text-center">
              <div className="text-white">
                <FireIcon></FireIcon>
              </div>
            </div>
            <div className="text-xs font-medium text-center text-white">
              Trending
            </div>
          </button>
        </li>
        <li className="flex-[1_1] h-10">
          <button
            type="button"
            onClick={()=>movePageFunction('/watchlist')}
            className="flex items-center flex-col h-10 justify-center w-full"
            disabled={pathname == '/watchlist' ? true : false}
          >
            <div className="h-6 w-6 pb-[5px] text-center">
              <div className="text-white">
                <BookmarkSquareIcon></BookmarkSquareIcon>
              </div>
            </div>
            <div className="text-xs font-medium text-center text-white">
              Daftarku
            </div>
          </button>
        </li>
        {user ? (
          <li className="flex-[1_1] h-10">
            <button
            type="button"
              className="flex items-center flex-col h-10 justify-center w-full"
              onClick={()=>movePageFunction('/user/profile')}
              disabled={pathname == '/user/profile' ? true : false}
            >
              <div className="h-6 w-6 pb-[5px] text-center">
                <div className="text-white">
                  <UserIcon></UserIcon>
                </div>
              </div>
              <div className="text-xs font-medium text-center text-white">
                Profil
              </div>
            </button>
          </li>
        ) : (
          <li className="flex-[1_1] h-10">
            <button
              type="button"
              onClick={() => movePageFunction("/user/sign_in")}
              className="flex items-center flex-col h-10 justify-center w-full"
              disabled={pathname == '/user/sign_in' ? true : false}
            >
              <div className="h-6 w-6 pb-[5px] text-center">
                <div className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-xs font-medium text-center text-white">
                Masuk
              </div>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavbarBottomMobile;

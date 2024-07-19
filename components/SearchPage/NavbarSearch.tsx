import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ArrowTrendingUpIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React, { Fragment, useRef, useState } from "react";

const search = [
  { id: 3, name: "bidadari surgamu" },
  { id: 4, name: "ftv" },
  { id: 5, name: "antv" },
  { id: 6, name: "bidadari surgamu 1" },
  { id: 7, name: "ftv 1" },
  { id: 8, name: "antv 1" },
  { id: 9, name: "bidadari surgamu 2" },
  { id: 10, name: "ftv 3" },
  { id: 11, name: "antv 4" },
];

export default function NavbarSearch({
  param,
  movePageFunction,
  previousPageFunction,
}: {
  param: string | null;
  movePageFunction: (param: string) => void;
  previousPageFunction: () => void;
}) {
  const [query, setQuery] = useState(param);
  const [openmodalsearchmobile, setOpenModalSearchMobile] = useState(false);

  const errorSearch = useRef<HTMLDivElement>(null);

  const KEY = "searchHistory";

  const getSearchHistory = (): string[] => {
    const storedHistory = localStorage.getItem(KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  };

  const addSearchToHistory = (query: string): void => {
    let history: string[] = getSearchHistory();

    history = history.filter((item) => item !== query);

    if (history.length >= 5) {
      history.shift();
    }

    history.push(query);

    localStorage.setItem(KEY, JSON.stringify(history));
  };

  const removeSearchFromHistory = (query: string): void => {
    let history: string[] = getSearchHistory();

    history = history.filter((item) => item !== query);

    localStorage.setItem(KEY, JSON.stringify(history));
  };

  const handleSubmitSearch = (event: React.FormEvent | React.KeyboardEvent) => {
    event.preventDefault();
    if (query !== null) {
      if (query.length >= 2) {
        addSearchToHistory(query);
        movePageFunction(`/search?q=${query}`);
      }
    }
  };

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    if (newValue.length <= 30) {
      setQuery(newValue);
      if (newValue.length < 2) {
        errorSearch.current?.classList.add("block");
        errorSearch.current?.classList.remove("hidden");
      } else {
        errorSearch.current?.classList.remove("block");
        errorSearch.current?.classList.add("hidden");
      }
    }
  };

  return openmodalsearchmobile ? (
    <Transition appear show={openmodalsearchmobile} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-gray-800/80"
        onClose={() => setOpenModalSearchMobile(false)}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full h-screen max-w-full min-h-full pt-0 p-6 overflow-scroll text-left align-middle transition-all transform bg-pallete-5">
              <section className="flex gap-x-3 items-center">
                <button
                  type="button"
                  onClick={() => setOpenModalSearchMobile(false)}
                  className="text-gray-300 hover:text-gray-100"
                >
                  <ArrowLeftIcon className="h-6 w-6"></ArrowLeftIcon>
                </button>
                <div className="p-2 relative w-full">
                  <form onSubmit={handleSubmitSearch}>
                    <input
                      placeholder="Cari"
                      className="relative text-sm rounded-md focus:outline-none border-none focus:ring-0 py-0 pr-8 bg-gray-600/50 text-white placeholder:text-white/50 w-full h-10"
                      onChange={(event) => {
                        handleInputSearch(event);
                      }}
                      value={query ? query : ""}
                    />
                    <button
                      type="submit"
                      className="absolute right-4 top-4 text-white"
                    >
                      <MagnifyingGlassIcon className="w-6 h-6"></MagnifyingGlassIcon>
                    </button>
                  </form>
                </div>
              </section>
              <section>
                <div
                  ref={errorSearch}
                  className="transition-all duration-200 bg-gray-200 text-rose-600 p-2 rounded mt-2"
                >
                  <span className="text-xs font-medium flex items-center justify-center gap-x-1">
                    <ExclamationCircleIcon className="inline-block w-4 h-4"></ExclamationCircleIcon>
                    Harap masukan minimal 2 karakter dan maksimal 30
                  </span>
                </div>
                {getSearchHistory().length !== 0 ? (
                  <h2 className="text-sm text-gray-100 font-semibold my-3">
                    History Pencarian
                  </h2>
                ) : (
                  <></>
                )}
                <ul>
                  {getSearchHistory().map((query, index) => (
                    <li
                      className="border-b border-solid border-gray-700"
                      key={index}
                    >
                      <div className="flex flex-row items-center hover:bg-pallete-1/20 py-3 px-4">
                        <button
                          type="button"
                          onClick={() => {
                            movePageFunction(`/search?q=${query}`);
                            addSearchToHistory(query);
                          }}
                          className="w-full overflow-hidden flex flex-row items-center"
                        >
                          <span className="text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">
                            {query}
                          </span>
                        </button>
                        <button
                          className="text-xs font-semibold text-gray-600 hover:text-pallete-4 ml-auto"
                          type="button"
                          onClick={(event) => {
                            removeSearchFromHistory(query);
                            setOpenModalSearchMobile(false);
                            event.stopPropagation();
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <h2 className="text-sm text-gray-100 font-semibold my-3">
                  Pencarian Populer
                </h2>
                <ul>
                  {search.map((search) => (
                    <li
                      className="border-b border-solid border-gray-700"
                      key={search.id}
                    >
                      <div className="flex flex-row items-center">
                        <button
                          type="button"
                          onClick={() => {
                            movePageFunction(`/search?q=${search.name}`);
                            addSearchToHistory(search.name);
                          }}
                          className="w-full overflow-hidden py-3 pl-4 flex flex-row items-center hover:bg-pallete-1/20"
                        >
                          <ArrowTrendingUpIcon className="w-6 h-6 flex-shrink-0 mr-6 text-gray-100"></ArrowTrendingUpIcon>
                          <span className="text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap">
                            {search.name}
                          </span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  ) : (
    <nav className="mb-3 flex items-center bg-black h-14 py-[10px] px-4 relative">
      <button
        type="button"
        className="mr-3 text-white"
        onClick={() => previousPageFunction()}
      >
        <ArrowLeftIcon className="w-6 h-6"></ArrowLeftIcon>
      </button>
      <form
        className="bg-gray-600 rounded-md flex-[1_1] flex items-center"
        role="search"
        onSubmit={handleSubmitSearch}
      >
        <label htmlFor="search-mobile-nav" className="sr-only">
          Search
        </label>
        <MagnifyingGlassIcon className="my-[10px] mx-[13px] align-middle w-4 h-4 text-white"></MagnifyingGlassIcon>
        <input
          id="search-mobile-nav"
          type="search"
          placeholder="Cari judul"
          autoComplete="off"
          pattern=".{2,30}"
          spellCheck={false}
          required
          className="bg-transparent focus:ring-0 focus:border-none border-none text-white text-sm w-full font-normal h-10 py-[1px] px-[2px]"
          defaultValue={query ? query : ""}
          onFocus={() => setOpenModalSearchMobile(true)}
        />
      </form>
    </nav>
  );
}

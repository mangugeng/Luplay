"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { analytics, auth } from "@/lib/firebase";
import { applyActionCode } from "firebase/auth";
import Loading from "@/components/Loading/loading";

export default function Page() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [pageloaded, setPageLoaded] = useState<boolean>(false);
  const [checkboxcurtain, setCheckboxCurtain] = useState<boolean>(false);
  const [colorchange, setColorChange] = useState<boolean>(false);
  const [statusverification, setStatusVerification] = useState<boolean>(false);

  const curtaincontentRef = useRef<HTMLDivElement>(null);

  const handleVerifyEmail = async (actionCode: string | null, lang: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://luplay.co.id/api/user/verification?mode=verifyEmail&oobCode=${actionCode}&lang=${lang}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        setStatusVerification(true);
      }
    } catch (error: any) {
      throw new Error(error.messages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get the action to complete.
    const mode = searchParams.get("mode");
    // Get the one-time code from the query parameter.
    const actionCode = searchParams.get("oobCode");
    // (Optional) Get the language code if available.
    const lang = searchParams.get("lang") || "en";

    // Handle the user management action.
    switch (mode) {
      case "verifyEmail":
        // Display email verification handler and UI.
        handleVerifyEmail(actionCode, lang);
        break;
      default:
    }
  }, [searchParams]);
  useEffect(() => {
    if (window.pageYOffset >= 80) {
      setColorChange(true);
    }
    const changeNavbarColor = () => {
      if (window.scrollY >= 80) {
        setColorChange(true);
      } else {
        setColorChange(false);
      }
    };
    window.addEventListener("scroll", changeNavbarColor);

    return () => window.removeEventListener("scroll", changeNavbarColor);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      analytics
      if (!loading) {
        setPageLoaded(true);
        setCheckboxCurtain(true);
      }
    }
  }, [loading, statusverification]);

  return (
    <>
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
              colorchange ? `` : "h-screen"
            } curtain__panel--left`}
            style={{
              height: colorchange
                ? `${curtaincontentRef.current?.offsetHeight}px`
                : "",
            }}
          ></div>
          {!pageloaded ? <Loading></Loading> : <></>}
          <div className="curtain__content" ref={curtaincontentRef}>
            {pageloaded ? (
              <div className="min-h-[96vh] mx-auto before:content-[''] before:table">
                <div className="float-right w-full">
                  <div className="mt-14 overflow-hidden">
                    <main className="mx-auto max-w-6xl p-6 block before:content-[''] before:table">
                      <div className="hidden xl:block sections-overlay-background"></div>
                      <div className="bg-pallete-4 rounded-2xl shadow-md xl:mt-10 py-5 px-8 md:py-10 md:px-16 after:content-[''] after:table after:clear-both">
                        <section className="w-full mx-auto mb-6 relative block">
                          <div className="mb-4 lg:mb-8 flex justify-between ">
                            <h2 className="text-xl font-bold text-gray-100 capitalize">
                              Verifikasi Email
                            </h2>
                          </div>
                          <div className="relative">
                            <Image
                              src={"/email-verification.svg"}
                              alt="luplay-email-verification"
                              className="h-80 w-80 mx-auto"
                              width={1980}
                              height={720}
                              priority
                            />
                            <div className="text-center">
                              {statusverification ? (
                                <>
                                  <h3 className="text-lg font-medium text-white">
                                    Selamat! &#127881;
                                  </h3>
                                  <p className="text-base font-medium text-white">
                                    Email anda berhasil diverifikasi
                                  </p>
                                </>
                              ) : (
                                <>
                                  <h3 className="text-lg font-medium text-white">
                                    Oops! &#128532;
                                  </h3>
                                  <p className="text-base font-medium text-white">
                                    Kode verifikasi sudah tidak berlaku, coba
                                    lagi
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </section>
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div
            className={`curtain__panel ${
              colorchange ? `` : "h-screen"
            } curtain__panel--right`}
            style={{
              height: colorchange
                ? `${curtaincontentRef.current?.offsetHeight}px`
                : "",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

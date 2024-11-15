import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  if (!session) {
    if (
      request.nextUrl.pathname.startsWith("/user/profile") ||
      request.nextUrl.pathname.startsWith("/user/edit")
    ) {
      return NextResponse.redirect(new URL("/user/sign_in", request.url));
    } else if (request.nextUrl.pathname.startsWith("/data-deletion")) {
      return NextResponse.redirect(
        new URL("/user/sign_in?from=data-deletion", request.url)
      );
    }
    return NextResponse.next();
  }

  let response;
  try {
    response = await fetch("https://luplay-web--lunarvisionapp.us-central1.hosted.app/api", {
      headers: {
        Cookie: `session=${session?.value}`,
      },
    });
  } catch (error) {
    console.error("Fetch failed:", error);
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (
    (response.ok && request.nextUrl.pathname.startsWith("/user/sign_in")) ||
    (response.ok && request.nextUrl.pathname.startsWith("/user/sign_up"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (
    (!response.ok && request.nextUrl.pathname.startsWith("/user/profile")) ||
    (!response.ok && request.nextUrl.pathname.startsWith("/user/edit"))
  ) {
    return NextResponse.redirect(new URL("/user/sign_in", request.url));
  } else if (
    !response.ok &&
    request.nextUrl.pathname.startsWith("/data-deletion")
  ) {
    return NextResponse.redirect(new URL("/user/sign_in", request.url));
  } else if (!response.ok) {
    request.cookies.delete("session");
    return NextResponse.redirect(new URL("/user/sign_in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:path*"],
};

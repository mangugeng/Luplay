import { permanentRedirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  permanentRedirect(
    `/user/${
      searchParams.mode === "verifyEmail"
        ? "verification"
        : searchParams.mode === "resetPassword"
        ? "reset"
        : ""
    }?mode=${searchParams.mode}&oobCode=${searchParams.oobCode}&apiKey=${
      searchParams.apiKey
    }&lang=${searchParams.lang}`
  );
}

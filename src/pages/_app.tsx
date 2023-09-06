import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import clsx from "clsx";
import useModal from "@/stores/modal";
import MainLayout from "@/components/Layouts/MainLayout";
import { useRouter } from "next/router";
import Login from "./login";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const { current } = useModal();

  const router = useRouter();

  return (
    <>
      <style jsx global>
        {`
          * {
            font-family: ${inter.style.fontFamily};
          }
        `}
      </style>

      {router.asPath === '/login' ? (
        <div className="min-h-screen max-h-screen min-w-full max-w-full bg-neutral-200 flex justify-center items-center overflow-x-hidden">
          <Login />
        </div>
    ) : (
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    )}

      <div
        className={clsx(
          "fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-black/50 flex items-center justify-center",
          current ? "" : "hidden"
        )}
      >
        {current}
      </div>
    </>
  );
}

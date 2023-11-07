import MainLayout from "@/components/Layouts/MainLayout";
import { trpc } from "@/libs/trpc";
import useModal from "@/stores/modal";
import "@/styles/globals.css";
import clsx from "clsx";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps) {
  const { current } = useModal();

  const router = useRouter();
  let content;
  let title = "";

  if (router.asPath === "/login") {
    content = (
      <div className="min-h-screen max-h-screen min-w-full bg-neutral-200 flex justify-center items-center overflow-x-hidden">
        <Component {...pageProps} />
      </div>
    );
  } else if (router.asPath.endsWith("/print")) {
    content = (
      <div className="">
        <Component {...pageProps} />
      </div>
    );
  } else {
    content = (
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    );
  }

  if (router.asPath.includes("master_data")) {
    title = "| Master Data"
  } else if (router.asPath.includes("marketing")) {
    title = "| Marketing"
  } else if (router.asPath.includes("operation")) {
    title = "| Operational"
  } 

  return (
    <>
      <Head>
        <title>FIEMS {title}</title>
      </Head>

      <style jsx global>
        {`
          * {
            font-family: ${inter.style.fontFamily};
          }
        `}
      </style>

      {content}

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

export default trpc.withTRPC(App);

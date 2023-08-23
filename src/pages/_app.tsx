import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import clsx from "clsx";
import useModal from "@/stores/modal";

const { library, config } = require("@fortawesome/fontawesome-svg-core");

config.autoAddCss = false;
library.add(fas, far);

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const { current } = useModal();

  return (
    <>
      <style jsx global>
        {`
          * {
            font-family: ${inter.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
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

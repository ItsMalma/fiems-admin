import { Toast } from "@/components/Elements";
import MainLayout from "@/components/Layouts/MainLayout";
import { trpc } from "@/libs/trpc";
import useModal from "@/stores/modal";
import useToast from "@/stores/toast";
import "@/styles/globals.css";
import clsx from "clsx";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { CookiesProvider } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps) {
  const { current } = useModal();
  const { toasts, removeToast } = useToast();

  return (
    <CookiesProvider>
      <style jsx global>
        {`
          * {
            font-family: ${inter.style.fontFamily};
          }
        `}
      </style>

      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>

      <div
        className={clsx(
          "fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-black/50 flex items-center justify-center",
          current ? "" : "hidden"
        )}
      >
        {current}
      </div>

      <div className="fixed right-5 bottom-5 flex flex-col">
        {toasts.map((toast, toastIndex) => (
          <Toast
            key={toastIndex}
            {...toast}
            onClose={() => {
              removeToast(toastIndex);
            }}
          />
        ))}
      </div>
    </CookiesProvider>
  );
}

export default trpc.withTRPC(App);

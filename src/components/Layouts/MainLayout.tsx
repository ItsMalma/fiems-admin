import React from "react";
import Header from "./Header";
import Sider from "./Sider";
import Footer from "./Footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout(props: MainLayoutProps) {
  return (
    <div className="min-h-screen max-h-screen bg-neutral-100 flex flex-col">
      <Header />
      <div className="pl-[18px] pr-6 py-3 2xl:pl-6 2xl:pr-8 2xl:py-4 flex gap-6 2xl:gap-8 grow overflow-auto">
        <Sider />
        <div className="basis-4/5 flex flex-col gap-[18px] 2xl:gap-6">
          {props.children ?? <div className="flex-grow"></div>}
          <Footer />
        </div>
      </div>
    </div>
  );
}

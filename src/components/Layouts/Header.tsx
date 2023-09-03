import React from "react";
import useHeader from "@/stores/header";
import { Moon, Bell } from "react-bootstrap-icons";

export default function Header() {
  const { title } = useHeader();

  return (
    <header className="bg-primary w-full px-6 py-[18px] 2xl:px-8 2xl:py-6 flex items-center justify-between sticky top-0 z-50">
      <div>
        <h1 className="text-white text-[18px] 2xl:text-2xl font-bold">FIEMS</h1>
      </div>
      <h1 className="text-blue-200 text-[18px] 2xl:text-2xl font-bold">
        {title}
      </h1>
      <div className="flex gap-3 2xl:gap-4 items-center text-white">
        <span className="p-[9px] 2xl:p-3">
          <Moon className="cursor-pointer" />
        </span>
        <span className="p-[9px] 2xl:p-3">
          <Bell className="cursor-pointer" />
        </span>
      </div>
    </header>
  );
}

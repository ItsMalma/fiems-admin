import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Header() {
  return (
    <header className="bg-primary w-full px-6 py-[18px] 2xl:px-8 2xl:py-6 flex items-center justify-between sticky top-0 z-50">
      <div>
        <h1 className="text-white text-[18px] 2xl:text-2xl font-bold">FIEMS</h1>
      </div>
      <h1 className="text-blue-200 text-[18px] 2xl:text-2xl font-bold">
        Master Data | Customer Group
      </h1>
      <div className="flex gap-3 2xl:gap-4 items-center text-white">
        <FontAwesomeIcon
          icon={["far", "moon"]}
          className="2xl:!hidden p-[9px] cursor-pointer"
        />
        <FontAwesomeIcon
          icon={["far", "bell"]}
          className="2xl:!hidden p-[9px] cursor-pointer"
        />
        <FontAwesomeIcon
          icon={["far", "moon"]}
          className="!hidden 2xl:!block p-3 cursor-pointer"
          size="lg"
        />
        <FontAwesomeIcon
          icon={["far", "bell"]}
          className="!hidden 2xl:!block p-3 cursor-pointer"
          size="lg"
        />
      </div>
    </header>
  );
}

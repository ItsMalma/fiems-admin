import React from "react";
import useHeader from "@/stores/header";
import { Moon, Bell, BellFill } from "react-bootstrap-icons";

export default function Header() {
  const { title } = useHeader();
  const [ showNotification, setShowNotification ] = React.useState(false);
  const [ theme, setTheme ] = React.useState("light")

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.theme = 'light'
    localStorage.theme = 'dark'
  }, [theme])

  return (
    <header className="bg-primary dark:bg-primary3 w-full px-6 py-[18px] 2xl:px-8 2xl:py-6 flex items-center justify-between sticky top-0 z-50">  
      <div onClick={() => setShowNotification(false)} className="absolute left-0 top-0 w-full min-h-screen">
      </div>    
      <div>
        <h1 className="text-white text-[18px] 2xl:text-2xl font-bold">FIEMS</h1>
      </div>
      <h1 className="text-blue-200 dark:text-blue-100 text-[18px] 2xl:text-2xl font-bold">
        {title}
      </h1>
      <div className="relative flex gap-1 2xl:gap-2 items-center text-white">
        <span className="select-none p-[9px] 2xl:p-3 transition duration-150 hover:bg-primary3 dark:hover:bg-primaryActive rounded-full">
          <Moon onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="select-none cursor-pointer"/>
        </span>
        <span className="select-none p-[9px] 2xl:p-3 relative transition duration-150 hover:bg-primary3 dark:hover:bg-primaryActive rounded-full">
          {showNotification ?
            <BellFill onClick={() => setShowNotification(false)} className="select-none cursor-pointer" />
          :
            <Bell onClick={() => setShowNotification(true)} className="select-none cursor-pointer" />
          }
        </span>
        {showNotification ?
          <div className="absolute bg-gray-200 dark:bg-slate-800 right-0 top-10 w-[30rem] h-[38rem] rounded-2xl">
          </div>
        :
          null
        }
      </div>
    </header>
  );
}

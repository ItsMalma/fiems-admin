import React from "react";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";

export default function Dashboard() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();

  React.useEffect(() => {
    setTitle("Dashboard");
    setActive(0, 0, 0);
  }, [setActive, setTitle]);

  return (
    <div className="flex-grow flex flex-col bg-white rounded-[10px] p-4 shadow"></div>
  );
}

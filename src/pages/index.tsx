import MainLayout from "@/components/Layouts/MainLayout";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import React from "react";

export default function Dashboard() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();

  React.useEffect(() => {
    setTitle("Dashboard");
    setActive(0, 0, 0);
  }, []);

  return <div className="flex-grow"></div>;
}

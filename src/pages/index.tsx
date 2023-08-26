import MainLayout from "@/components/Layouts/MainLayout";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import React from "react";

export default function Dashboard() {
  const { setIndex } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setIndex(0, 0, 0);
    setTitle("Dashboard");
  }, []);

  return <MainLayout>{}</MainLayout>;
}

import NewSelect from "@/components/Elements/NewSelect";
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

  return (
    <div className="flex-grow flex flex-col bg-white rounded-[10px] p-4 shadow">
      <NewSelect
        className="w-1/6"
        placeholder="Select your option"
        options={["Ayam Goreng", "Nasi Goreng", "Telur Dadar"]}
      />
    </div>
  );
}

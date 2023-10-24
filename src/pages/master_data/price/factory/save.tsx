import SaveLayout from "@/components/Layouts/SaveLayout";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import { FormikProvider, useFormik } from "formik";
import React from "react";

export default function PriceFactorySave() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Master Data | Price Factory Save");
    setActive(1, 6, 0);
  }, [setTitle, setActive]);

  useFormik<>();

  return (
    <FormikProvider value={}>
      <SaveLayout
        title="Input Price Factory"
        onSave={() => {}}
        tabs={[{ name: "General Information", component: <></> }]}
      />
    </FormikProvider>
  );
}

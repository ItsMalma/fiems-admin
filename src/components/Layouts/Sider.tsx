import React from "react";
import Menu from "@/components/Elements/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Sider() {
  return (
    <aside className="bg-primary pt-[18px] pb-3 2xl:pt-6 2xl:pb-4 rounded-2xl basis-[21%] 2xl:basis-1/6 sticky top-0 flex flex-col">
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex items-center">
        <div className="flex gap-[9px] 2xl:gap-3 items-center">
          <Image
            src="/SampleAvatar.jpeg"
            alt="Sample Avatar"
            width={0}
            height={0}
            sizes="100vh"
            className="rounded-full w-10 h-10"
          />
          <div className="flex flex-col 2xl:gap-0.5">
            <p className="text-white font-semibold">Hadi Yusuf</p>
            <p className="text-neutral-200 text-xs">Human Resource</p>
          </div>
        </div>
        <FontAwesomeIcon
          icon={["fas", "info-circle"]}
          className="text-white ml-auto cursor-pointer"
        />
      </div>
      <Menu
        items={[
          {
            name: "Dashboard",
            icon: <FontAwesomeIcon icon={["fas", "chart-simple"]} />,
            url: "/",
          },
          {
            name: "Master Data",
            icon: <FontAwesomeIcon icon={["fas", "database"]} />,
            subItems: [
              {
                name: "Business Partner",
                subSubItems: [
                  {
                    name: "Customer Group",
                    url: "/master_data/business_partner/customer_group",
                  },
                  {
                    name: "Customers",
                    url: "/master_data/business_partner/customers",
                  },
                ],
              },
              { name: "Master Route", url: "/master_data/route" },
              { name: "Master Port", url: "/master_data/port" },
              { name: "Master Sales", url: "/master_data/sales" },
              { name: "Master Vehicle", url: "/master_data/vehicle" },
              { name: "Master Vessel", url: "/master_data/vessel" },
              {
                name: "Master Price",
                subSubItems: [
                  {
                    name: "Price Factory",
                    url: "/master_data/price/factory",
                  },
                  {
                    name: "Price Vendor",
                    url: "/master_data/price/vendor",
                  },
                  {
                    name: "Price Shipping",
                    url: "/master_data/price/shipping",
                  },
                ],
              },
              {
                name: "Master Uang Jalan",
                url: "/master_data/uang_jalan",
              },
              {
                name: "Master Product Category",
                url: "/master_data/product_category",
              },
              {
                name: "Master Product",
                subSubItems: [
                  {
                    name: "Product",
                    url: "/master_data/items/product",
                  },
                  {
                    name: "Sparepart",
                    url: "/master_data/items/sparepart",
                  },
                  {
                    name: "ATK",
                    url: "/master_data/items/atk",
                  },
                ],
              },
              { name: "Account COA", url: "/master_data/account_coa" },
            ],
          },
          {
            name: "Marketing",
            icon: <FontAwesomeIcon icon={["fas", "magnifying-glass-dollar"]} />,
            subItems: [
              { name: "Price Calculation", url: "/marketing/price_calculation" },
              { name: "Form Quotation", url: "/marketing/quotation" },
              { name: "Inquiry Container", url: "/marketing/inquiry" },
              { name: "Vessel Schedule", url: "/marketin/vessel_schedule" },
            ],
          },
        ]}
      />
      
    </aside>
  );
}

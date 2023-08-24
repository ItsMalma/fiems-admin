import React from "react";
import Menu from "@/components/Elements/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Sider() {
  return (
    <aside className="bg-primary pt-[18px] pb-3 2xl:pt-6 2xl:pb-4 rounded-2xl basis-1/4 2xl:basis-1/6 sticky top-0 flex flex-col">
      <Menu
        items={[
          {
            name: "Dashboard",
            icon: <FontAwesomeIcon icon={["fas", "chart-simple"]} />,
            url: "/dashboard",
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
                    url: "/master_data/business_partner/customers/reports",
                  },
                ],
              },
              { name: "Master Route", url: "/master_data/route/reports" },
              { name: "Master Port", url: "/master_data/port/reports" },
              { name: "Master Sales", url: "/master_data/sales/reports" },
              { name: "Master Vehicle", url: "/master_data/vehicle/reports" },
              { name: "Master Vessel", url: "/master_data/vessel" },
              {
                name: "Master Price",
                subSubItems: [
                  {
                    name: "Price Factory",
                    url: "/master_data/master_price/factory",
                  },
                  {
                    name: "Price Vendor",
                    url: "/master_data/master_price/vendor",
                  },
                  {
                    name: "Price Shipping",
                    url: "/master_data/master_price/shipping",
                  },
                ],
              },
              {
                name: "Master Uang Jalan",
                url: "/master_data/master_uang_jalan",
              },
              {
                name: "Master Product Category",
                url: "/master_data/master_product_category",
              },
              { name: "Master Product", url: "/master_data/master_product" },
              { name: "Account COA", url: "/master_data/account_coa" },
            ],
          },
        ]}
      />
      <div className="mt-auto px-[18px] py-[9px] 2xl:px-6 2xl:py-3 flex items-center">
        <div className="flex gap-[9px] 2xl:gap-3 items-center">
          <Image
            src="/SampleAvatar.jpeg"
            alt="Sample Avatar"
            width={0}
            height={0}
            sizes="100vh"
            className="rounded-full w-8 h-8"
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
    </aside>
  );
}

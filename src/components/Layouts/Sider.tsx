import React from "react";
import Image from "next/image";
import {
  Icon,
  ChevronDown,
  ChevronUp,
  Grid1x2,
  Grid1x2Fill,
  Database,
  DatabaseFill,
  BarChart,
  BarChartFill,
  Gear,
  GearFill,
  Cart,
  CartFill,
  HouseDoor,
  HouseDoorFill,
  PiggyBank,
  PiggyBankFill,
  People,
  PeopleFill,
  InfoCircleFill,
  PersonGear,
  PersonFillGear,
} from "react-bootstrap-icons";
import Menu from "./Menu";

export default function Sider() {
  return (
    <aside className="bg-primary pt-[18px] pb-3 2xl:pt-6 2xl:pb-4 rounded-2xl 2xl:rounded-3xl basis-1/5 2xl:basis-1/6 sticky top-0 flex flex-col">
      <Menu
        items={[
          {
            name: "Dashboard",
            icon: Grid1x2,
            activeIcon: Grid1x2Fill,
            url: "/",
          },
          {
            name: "Master Data",
            icon: Database,
            activeIcon: DatabaseFill,
            childrens: [
              {
                name: "Business Partner",
                childrens: [
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
              {
                name: "Master Route",
                url: "/master_data/route",
              },
              {
                name: "Master Port",
                url: "/master_data/port",
              },
              {
                name: "Master Sales",
                url: "/master_data/sales",
              },
              {
                name: "Master Vehicle",
                url: "/master_data/vehicle",
              },
              {
                name: "Master Vessel",
                url: "/master_data/vessel",
              },
              {
                name: "Master Price",
                childrens: [
                  { name: "Price Factory", url: "/master_data/price/factory" },
                  { name: "Price Vendor", url: "/master_data/price/vendor" },
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
                childrens: [
                  { name: "Product", url: "/master_data/items/product" },
                  { name: "Sparepart", url: "/master_data/items/sparepart" },
                  { name: "ATK", url: "/master_data/items/atk" },
                ],
              },
              {
                name: "Account COA",
                url: "/master_data/account_coa",
              },
            ],
          },
          {
            name: "Marketing",
            icon: BarChart,
            activeIcon: BarChartFill,
            childrens: [
              {
                name: "Price Calculation",
                url: "/marketing/price_calculation",
              },
              {
                name: "Form Quotation",
                url: "/marketing/quotation",
              },
              {
                name: "Inquiry Container",
                url: "/marketing/inquiry_container",
              },
              {
                name: "Vessel Schedule",
                url: "/marketing/vessel_schedule",
              },
            ]
          },
          {
            name: "Operational",
            icon: Gear,
            activeIcon: GearFill,
            childrens: [
              {
                name: "Job Order",
                url: "/operation/job_order",
              },
              {
                name: "Delivery Report",
                url: "/operation/delivery_report"
              },
              {
                name: "Operational Docs.",
                childrens: [
                  {
                    name: "SPM Report",
                    url: "/operation/document/spmuj",
                  },
                  {
                    name: "Surat Jalan",
                    url: "/operation/document/surat_jalan"
                  },
                  {
                    name: "BAST Report",
                    url: "/operation/document/bast"
                  },
                  {
                    name: "Packing List",
                    url: "/operation/document/packing"
                  },
                  {
                    name: "Insurance",
                    url: "/operation/document/insurance"
                  },
                  {
                    name: "Request",
                    url: "/operation/document/request"
                  },
                ]
              }
            ]
          },
          {
            name: "User Management",
            icon: PersonGear,
            activeIcon: PersonFillGear,
            url: "/user",
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
        <InfoCircleFill className="text-neutral-300 ml-auto cursor-pointer" />
      </div>
    </aside>
  );
}

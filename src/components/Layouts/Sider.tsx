import Image from "next/image";
import {
  BarChart,
  BarChartFill,
  Database,
  DatabaseFill,
  Gear,
  GearFill,
  Grid1x2,
  Grid1x2Fill,
  InfoCircleFill,
} from "react-bootstrap-icons";
import Menu from "./Menu";

export default function Sider() {
  return (
    <aside className="bg-primary dark:bg-primary3 pt-[18px] text-lg pb-3 2xl:pt-6 2xl:pb-4 rounded-2xl 2xl:rounded-3xl basis-1/5 2xl:basis-1/6 sticky top-0 flex flex-col">
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
                    url: "/master_data/business_partner/customer",
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
                  {
                    name: "Price Factory",
                    url: "/master_data/prices/factory",
                  },
                  { name: "Price Vendor", url: "/master_data/prices/vendor" },
                  {
                    name: "Price Shipping",
                    url: "/master_data/prices/shipping",
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
                url: "/master_data/product",
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
                url: "/marketing/quotation/save",
              },
              {
                name: "Form Quotation",
                childrens: [
                  { name: "Incomplete", url: "/marketing/quotation" },
                  { name: "Complete", url: "/marketing/quotation/complete" },
                ],
              },
              {
                name: "Inquiry Container",
                childrens: [
                  { name: "Unconfirmed", url: "/marketing/inquiry" },
                  { name: "Reviced", url: "/marketing/inquiry/reviced" },
                  { name: "Confirmed", url: "/marketing/inquiry/confirmed" },
                ],
              },
              {
                name: "Vessel Schedule",
                url: "/marketing/vessel_schedule",
              },
            ],
          },
          {
            name: "Operational",
            icon: Gear,
            activeIcon: GearFill,
            childrens: [
              { name: "Inquiry Container", url: "/operational/inquiry" },
              {
                name: "Job Order",
                childrens: [
                  { name: "Unconfirmed", url: "/operational/job_order" },
                  {
                    name: "Confirmed",
                    url: "/operational/job_order/confirmed",
                  },
                ],
              },
              { name: "SPM & UJ", url: "/operational/spm_uj" },
              { name: "Surat Jalan", url: "/operational/surat_jalan" },
              { name: "BAST", url: "/operational/bast" },
              { name: "Packing List", url: "/operational/packing_list" },
              { name: "Insurance", url: "/operational/insurance" },
              { name: "Vessel Schedule", url: "/operational/vessel_schedule" },
              { name: "Request", url: "/operational/request" },
            ],
          },
          // {
          //   name: "Operational",
          //   icon: Gear,
          //   activeIcon: GearFill,
          //   childrens: [
          //     {
          //       name: "Job Order",
          //       url: "/operation/job_order",
          //     },
          //     {
          //       name: "Delivery Report",
          //       url: "/operation/delivery_report",
          //     },
          //     {
          //       name: "Operational Docs.",
          //       childrens: [
          //         {
          //           name: "SPM Report",
          //           url: "/operation/document/spmuj",
          //         },
          //         {
          //           name: "Surat Jalan",
          //           url: "/operation/document/surat_jalan",
          //         },
          //         {
          //           name: "BAST Report",
          //           url: "/operation/document/bast",
          //         },
          //         {
          //           name: "Packing List",
          //           url: "/operation/document/packing",
          //         },
          //         {
          //           name: "Shipping Instruction",
          //           url: "/operation/document/si",
          //         },
          //         {
          //           name: "Insurance",
          //           url: "/operation/document/insurance",
          //         },
          //         {
          //           name: "Request",
          //           url: "/operation/document/request",
          //         },
          //       ],
          //     },
          //     {
          //       name: "Ship Schedule",
          //       url: "/operation/ship_schedule",
          //     },
          //     {
          //       name: "Dooring",
          //       url: "/operation/dooring",
          //     },
          //     {
          //       name: "Change Dooring",
          //       url: "/operation/change_dooring",
          //     },
          //   ],
          // },
          // {
          //   name: "HRD",
          //   icon: Person,
          //   activeIcon: PersonFill,
          //   childrens: [
          //     {
          //       name: "Employee",
          //       childrens: [
          //         {
          //           name: "Employee List",
          //           url: "/hrd/employee/list",
          //         },
          //         {
          //           name: "Attendance",
          //           url: "/hrd/employee/attendance",
          //         },
          //         {
          //           name: "Leave",
          //           url: "/hrd/employee/leave",
          //         },
          //       ],
          //     },
          //     {
          //       name: "Payroll",
          //       url: "/marketing/quotation",
          //     },
          //     {
          //       name: "Recruitment",
          //       url: "/marketing/inquiry_container",
          //     },
          //   ],
          // },
          // {
          //   name: "User Management",
          //   icon: PersonGear,
          //   activeIcon: PersonFillGear,
          //   url: "/user",
          // },
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
            className="rounded-full w-10 h-10"
          />
          <div className="flex flex-col 2xl:gap-0.5">
            <p className="text-white font-semibold">Hadi Yusuf</p>
            <p className="text-neutral-200 text-sm">Human Resource</p>
          </div>
        </div>
        <InfoCircleFill className="text-neutral-300 ml-auto cursor-pointer" />
      </div>
    </aside>
  );
}

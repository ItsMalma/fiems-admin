import React from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Url } from "next/dist/shared/lib/router/router";
import useMenu from "@/stores/menu";

type MenuSubSubItem = {
  name: string;
  url: Url;
};

type MenuSubItem = {
  name: string;
  subSubItems?: MenuSubSubItem[];
  url?: Url;
};

type MenuItem = {
  name: string;
  icon: React.ReactNode;
  iconActive?: React.ReactNode;
  subItems?: MenuSubItem[];
  url?: Url;
};

type RCMenuSubSubItemProps = {
  active: boolean;
  subSubItem: MenuSubSubItem;
  onClick: () => void;
};

function RCMenuSubSubItem(props: RCMenuSubSubItemProps) {
  return (
    <div
      className={clsx(
        "flex px-[15px] py-1.5 2xl:px-5 2xl:py-2 text-solitude2 cursor-pointer",
        props.active && "text-solitudeActive font-semibold"
      )}
      onClick={props.onClick}
    >
      {props.subSubItem.name}
    </div>
  );
}

type RCMenuSubItemProps = {
  active: boolean;
  subItem: MenuSubItem;
  onClick: () => void;
};

function RCMenuSubItem(props: RCMenuSubItemProps) {
  return (
    <div
      className={clsx(
        "flex px-[15px] py-3 2xl:px-5 2xl:py-4 items-center gap-[10.5px] 2xl:gap-[14px] rounded-lg text-solitude2 cursor-pointer",
        props.active && "bg-primary2 text-solitudeActive font-semibold"
      )}
      onClick={props.onClick}
    >
      {props.subItem.name}
      {props.subItem.subSubItems && (
        <FontAwesomeIcon
          icon={["fas", props.active ? "chevron-up" : "chevron-down"]}
          className="ml-auto"
        />
      )}
    </div>
  );
}

type RCMenuItemProps = {
  active: boolean;
  item: MenuItem;
  onClick: () => void;
};

function RCMenuItem(props: RCMenuItemProps) {
  return (
    <div
      className={clsx(
        "flex px-[15px] py-3 2xl:px-5 2xl:py-4 items-center gap-[10.5px] 2xl:gap-[14px] rounded-lg text-solitude cursor-pointer",
        props.active && "bg-primaryActive text-solitudeActive font-semibold"
      )}
      onClick={props.onClick}
    >
      <div className="flex items-center gap-[10.5px] 2xl:gap-[14px]">
        {props.active && props.item
          ? props.item.iconActive ?? props.item.icon
          : props.item.icon}
        {props.item.name}
      </div>
      {props.item.subItems && (
        <FontAwesomeIcon
          icon={["fas", props.active ? "chevron-up" : "chevron-down"]}
          className="ml-auto"
        />
      )}
    </div>
  );
}

type MenuProps = {
  items?: MenuItem[];
  className?: string;
};

export default function Menu({ items = [], ...props }: MenuProps) {
  const router = useRouter();
  const { itemIndex, subItemIndex, subSubItemIndex, setIndex } = useMenu();

  React.useEffect(() => {
    if (
      itemIndex === undefined ||
      subItemIndex === undefined ||
      subSubItemIndex === undefined
    ) {
      return;
    }

    const item = items[itemIndex];
    const subItem = item.subItems && item.subItems[subItemIndex];
    const subSubItem =
      subItem?.subSubItems && subItem.subSubItems[subSubItemIndex];

    if (subSubItem?.url) router.push(subSubItem.url);
    else if (subItem?.url) router.push(subItem.url);
    else if (item.url) router.push(item.url);
  }, [itemIndex, subItemIndex, subSubItemIndex]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-[18px] 2xl:gap-6 overflow-auto px-[18px] 2xl:px-6",
        props.className
      )}
    >
      {items.map((item, mapItemIndex) => (
        <div
          key={mapItemIndex}
          className={clsx(
            "flex flex-col gap-[9px] 2xl:gap-3 rounded-lg",
            mapItemIndex === itemIndex &&
              item.subItems &&
              "bg-primary2 pb-1.5 2xl:pb-2"
          )}
        >
          <RCMenuItem
            active={mapItemIndex === itemIndex}
            item={item}
            onClick={() => {
              setIndex(mapItemIndex, 0, 0);

              if (item.url) {
                router.push(item.url);
              }
            }}
          />
          {item.subItems &&
            mapItemIndex === itemIndex &&
            item.subItems.map((subItem, mapSubIndexItem) => (
              <div
                key={mapSubIndexItem}
                className={clsx(
                  "flex flex-col gap-[9px] 2xl:gap-3 rounded-lg",
                  mapSubIndexItem === subItemIndex &&
                    subItem.subSubItems &&
                    "bg-primary3 pb-1.5 2xl:pb-2"
                )}
              >
                <RCMenuSubItem
                  active={mapSubIndexItem === subItemIndex}
                  subItem={subItem}
                  onClick={() => {
                    setIndex(mapItemIndex, mapSubIndexItem, 0);

                    if (subItem.url) {
                      router.push(subItem.url);
                    }
                  }}
                />
                {subItem.subSubItems &&
                  mapSubIndexItem == subItemIndex &&
                  subItem.subSubItems.map((subSubItem, mapSubSubItemIndex) => (
                    <RCMenuSubSubItem
                      active={mapSubSubItemIndex === subSubItemIndex}
                      subSubItem={subSubItem}
                      onClick={() => {
                        setIndex(
                          mapItemIndex,
                          mapSubIndexItem,
                          mapSubSubItemIndex
                        );

                        router.push(subSubItem.url);
                      }}
                    />
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

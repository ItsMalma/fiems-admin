import React from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type MenuSubSubItem = {
  name: string;
};

type MenuSubItem = {
  name: string;
  subSubItems?: MenuSubSubItem[];
}

type MenuItem = {
  name: string;
  icon: React.ReactNode;
  iconActive?: React.ReactNode;
  subItems?: MenuSubItem[];
};

type RCMenuSubSubItemProps = {
  active: boolean;
  subSubItem: MenuSubSubItem;
  onClick: () => void;
}

function RCMenuSubSubItem(props: RCMenuSubSubItemProps) {
  return (
    <div
      className={clsx(
        "flex px-4 py-2 items-center gap-2 text-solitude2 cursor-pointer",
        props.active && "text-solitudeActive font-semibold"
      )}
      onClick={props.onClick}
    >
      {props.subSubItem.name}
    </div>
  )
}

type RCMenuSubItemProps = {
  active: boolean;
  subItem: MenuSubItem;
  onClick: () => void;
}

function RCMenuSubItem(props: RCMenuSubItemProps) {
  return (
    <div
      className={clsx(
        "flex px-4 py-2 items-center gap-2 rounded-b-lg text-solitude2 cursor-pointer",
        props.active && "bg-primary2 text-solitudeActive font-semibold"
      )}
      onClick={props.onClick}
    >
      {props.subItem.name}
      {props.subItem.subSubItems && (
        <FontAwesomeIcon icon={["fas", props.active ? "chevron-up" : "chevron-down"]} />
      )}
    </div>
  )
}

type RCMenuItemProps = {
  active: boolean;
  item: MenuItem;
  onClick: () => void;
}

function RCMenuItem(props: RCMenuItemProps) {
  return (
    <div
      className={clsx(
        "flex px-4 py-2 items-center gap-2 rounded-lg text-solitude cursor-pointer",
        props.active && "bg-primaryActive text-solitudeActive font-semibold"
      )}
      onClick={props.onClick}
    >
      {props.active && props.item ? (props.item.iconActive ?? props.item.icon) : props.item.icon}
      {props.item.name}
      {props.item.subItems && (
        <FontAwesomeIcon icon={["fas", props.active ? "chevron-up" : "chevron-down"]} />
      )}
    </div>
  );
}

type MenuProps = {
  items?: MenuItem[];
}

export default function Menu({
  items = [],
  ...props
} : MenuProps) {
  const [itemIndex, setItemIndex] = React.useState<number>(0);
  const [subItemIndex, setSubItemIndex] = React.useState<number>(0);
  const [subSubItemIndex, setSubSubItemIndex] = React.useState<number>(0);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={index} className={clsx(
          "flex flex-col gap-2 rounded-lg",
          index === itemIndex && item.subItems && "bg-primary2 pb-2"
        )}>
          <RCMenuItem
            active={index === itemIndex}
            item={item}
            onClick={() => {
              setItemIndex(index);
              setSubItemIndex(0);
              setSubSubItemIndex(0);
            }}
          />
          {item.subItems && index === itemIndex && item.subItems.map((subItem, index) => (
            <div key={index} className={clsx(
              "flex flex-col gap-2",
              index === subItemIndex && subItem.subSubItems && "bg-primary3 pb-2"
            )}>
              <RCMenuSubItem
                active={index === subItemIndex}
                subItem={subItem}
                onClick={() => {
                  setSubItemIndex(index);
                  setSubSubItemIndex(0);
                }}
              />
              {subItem.subSubItems && index == subItemIndex && subItem.subSubItems.map((subSubItem, index) => (
                <RCMenuSubSubItem
                  active={index === subSubItemIndex}
                  subSubItem={subSubItem}
                  onClick={() => {
                    setSubSubItemIndex(index);
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
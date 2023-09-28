import React from "react";
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
} from "react-bootstrap-icons";
import clsx from "clsx";
import { useRouter } from "next/router";
import useMenu from "@/stores/menu";

type SingleMenuItemProps =
  | {
      level: 1;
      name: string;
      icon: Icon;
      activeIcon: Icon;
      isActive: boolean;
      hasChildren: boolean;
      onClick?: () => void;
    }
  | {
      level: 2;
      name: string;
      isActive: boolean;
      hasChildren: boolean;
      onClick?: () => void;
    }
  | {
      level: 3;
      name: string;
      isActive: boolean;
      onClick?: () => void;
    };

function SingleMenuItem(props: SingleMenuItemProps) {
  switch (props.level) {
    case 1:
      return (
        <div
          className={clsx(
            "px-[15px] py-3 2xl:px-5 2xl:py-4 flex items-center cursor-pointer rounded-[10px]",
            props.isActive ? "bg-primaryActive" : "bg-primary"
          )}
          onClick={() => {
            if (props.onClick) {
              props.onClick();
            }
          }}
        >
          <span className="flex items-center gap-[10.5px] 2xl:gap-[14px]">
            {props.isActive ? (
              <props.activeIcon className="text-white" />
            ) : (
              <props.icon className="text-slate-200" />
            )}
            <p
              className={clsx(
                props.isActive ? "text-white font-bold" : "text-slate-200"
              )}
            >
              {props.name}
            </p>
          </span>
          {props.hasChildren &&
            (props.isActive ? (
              <ChevronUp className="text-white ml-auto" />
            ) : (
              <ChevronDown className="text-gray-200 ml-auto" />
            ))}
        </div>
      );
    case 2:
      return (
        <div
          className={clsx(
            "bg-primary2 px-[15px] 2xl:px-5 flex items-center cursor-pointer rounded-b-[10px]",
            props.hasChildren ? "py-3 2xl:py-4" : "py-1.5 2xl:py-2"
          )}
          onClick={() => {
            if (props.onClick) {
              props.onClick();
            }
          }}
        >
          <p
            className={clsx(
              props.isActive ? "text-white font-bold" : "text-gray-300"
            )}
          >
            {props.name}
          </p>
          {props.hasChildren &&
            (props.isActive ? (
              <ChevronUp className="text-white ml-auto" />
            ) : (
              <ChevronDown className="text-gray-200 ml-auto" />
            ))}
        </div>
      );
    case 3:
      return (
        <div
          className={clsx(
            "px-[15px] py-1.5 2xl:px-5 2xl:py-2 flex items-center cursor-pointer"
          )}
          onClick={() => {
            if (props.onClick) {
              props.onClick();
            }
          }}
        >
          <p
            className={clsx(
              props.isActive ? "text-white font-bold" : "text-gray-300"
            )}
          >
            {props.name}
          </p>
        </div>
      );
  }
}

type MenuItemPropsChildren = {
  name: string;
  isActive: boolean;
  onClick?: () => void;
  childrens?: Omit<MenuItemPropsChildren, "childrens">[];
};

type MenuItemProps = {
  name: string;
  icon: Icon;
  activeIcon: Icon;
  isActive?: boolean;
  onClick?: () => void;
  childrens?: MenuItemPropsChildren[];
};

function MenuItemComponent(props: MenuItemProps) {
  if (props.childrens && props.isActive) {
    return (
      <div className="bg-primary2 flex flex-col gap-[9px] 2xl:gap-3 rounded-[10px] pb-1.5 2xl:pb-2">
        <SingleMenuItem
          level={1}
          name={props.name}
          icon={props.icon}
          activeIcon={props.activeIcon}
          isActive={props.isActive!}
          hasChildren={props.childrens !== undefined}
          onClick={props.onClick}
        />
        <div className="flex flex-col gap-[14.25px] 2xl:gap-[19px]">
          {props.childrens.map((children, childrenIndex) =>
            children.childrens && children.isActive ? (
              <div
                key={childrenIndex}
                className="bg-primary3 flex flex-col gap-[9px] 2xl:gap-3 rounded-[10px] pb-1.5 2xl:pb-2"
              >
                <SingleMenuItem
                  level={2}
                  name={children.name}
                  isActive={children.isActive!}
                  hasChildren={children.childrens !== undefined}
                  onClick={children.onClick}
                />
                <div className="flex flex-col gap-[9px] 2xl:gap-3 rounded-[10px]">
                  {children.childrens.map((subChildren, subChildrenIndex) => (
                    <SingleMenuItem
                      key={subChildrenIndex}
                      level={3}
                      name={subChildren.name}
                      isActive={subChildren.isActive!}
                      onClick={subChildren.onClick}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <SingleMenuItem
                key={childrenIndex}
                level={2}
                name={children.name}
                isActive={children.isActive!}
                hasChildren={children.childrens !== undefined}
                onClick={children.onClick}
              />
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <SingleMenuItem
      level={1}
      name={props.name}
      icon={props.icon}
      activeIcon={props.activeIcon}
      isActive={props.isActive!}
      hasChildren={props.childrens !== undefined}
      onClick={props.onClick}
    />
  );
}

type MenuItemChildren = {
  name: string;
  url?: string;
  childrens?: Omit<MenuItemChildren, "childrens">[];
};

type MenuItem = {
  name: string;
  icon: Icon;
  activeIcon: Icon;
  url?: string;
  childrens?: MenuItemChildren[];
};

type MenuProps = {
  items: MenuItem[];
};

export default function Menu(props: MenuProps) {
  const { active: activeContext } = useMenu();

  const [active, setActive] = React.useState<{
    0?: number;
    1?: number;
    2?: number;
  }>({
    0: undefined,
    1: undefined,
    2: undefined,
  });

  const router = useRouter();

  React.useEffect(() => {
    if (active[0] !== undefined) {
      const item = props.items[active[0]];
      if (item.childrens && active[1] !== undefined) {
        const children = item.childrens[active[1]];
        if (children.childrens && active[2] !== undefined) {
          const subChildren = children.childrens[active[2]];
          if (subChildren.url) {
            router.push(subChildren.url);
          }
        } else if (children.url) {
          router.push(children.url);
        }
      } else if (item.url) {
        router.push(item.url);
      }
    }
  }, [active, props.items, router]);

  return (
    <nav className="px-[18px] 2xl:px-6 flex flex-col gap-[18px] 2xl:gap-6 overflow-auto">
      {props.items.map((item, itemIndex) => (
        <MenuItemComponent
          key={itemIndex}
          name={item.name}
          icon={item.icon}
          activeIcon={item.activeIcon}
          isActive={itemIndex === activeContext[0]}
          onClick={() => setActive({ 0: itemIndex, 1: 0, 2: 0 })}
          childrens={item.childrens?.map((children, childrenIndex) => ({
            name: children.name,
            isActive:
              itemIndex === activeContext[0] &&
              childrenIndex === activeContext[1],
            onClick: () => setActive({ 0: itemIndex, 1: childrenIndex, 2: 0 }),
            childrens: children.childrens?.map(
              (subChildren, subChildrenIndex) => ({
                name: subChildren.name,
                isActive:
                  itemIndex === activeContext[0] &&
                  childrenIndex === activeContext[1] &&
                  subChildrenIndex === activeContext[2],
                onClick: () =>
                  setActive({
                    0: itemIndex,
                    1: childrenIndex,
                    2: subChildrenIndex,
                  }),
              })
            ),
          }))}
        />
      ))}
    </nav>
  );
}

import React from "react";
import { Icon, ChevronDown, ChevronUp } from "react-bootstrap-icons";
import clsx from "clsx";
import useMenu from "@/stores/menu";
import { useRouter } from "next/router";

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
  childrens?: (Omit<MenuItemChildren, "childrens" | "url"> & { url: string })[];
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

export default function Menu({ items }: MenuProps) {
  const { active: activeContext } = useMenu();

  const [active, setActive] = React.useState<{
    0?: number;
    1?: number;
    2?: number;
  }>({ 0: 0, 1: 0, 2: 0 });

  React.useEffect(() => {
    setActive({
      0: activeContext[0] ?? 0,
      1: activeContext[1] ?? 0,
      2: activeContext[2] ?? 0,
    });
  }, [activeContext]);

  const router = useRouter();

  const handleClick = React.useCallback(
    (itemIndex: number, childrenIndex: number, subChildrenIndex: number) => {
      setActive({ 0: itemIndex, 1: childrenIndex, 2: subChildrenIndex });

      // Dapatkan menu item berdasarkan index
      const item = items[itemIndex];

      // Cek apakah item punya children
      if (item.childrens) {
        // Dapatkan children dari menu item
        const itemChildren = item.childrens[childrenIndex];

        // Cek apakah children punya children lagi (subChildren)
        if (itemChildren.childrens) {
          // Dapatkan children dari childrennya menu item (:v)
          const subChildren = itemChildren.childrens[subChildrenIndex];

          // Redirect ke url sub children
          router.push(subChildren.url);
        } else if (itemChildren.url) {
          // Jika tidak, maka redirect ke url children item
          router.push(itemChildren.url);
        }
      } else if (item.url) {
        // Jika tidak, maka redirect ke url item
        router.push(item.url);
      }
    },
    [router, items]
  );

  return (
    <nav className="px-[18px] 2xl:px-6 flex flex-col gap-[18px] 2xl:gap-6 overflow-auto">
      {items.map((item, itemIndex) => (
        <MenuItemComponent
          key={itemIndex}
          name={item.name}
          icon={item.icon}
          activeIcon={item.activeIcon}
          isActive={itemIndex === active[0]}
          onClick={() => handleClick(itemIndex, 0, 0)}
          childrens={item.childrens?.map((children, childrenIndex) => ({
            name: children.name,
            isActive: itemIndex === active[0] && childrenIndex === active[1],
            onClick: () => handleClick(itemIndex, childrenIndex, 0),
            childrens: children.childrens?.map(
              (subChildren, subChildrenIndex) => ({
                name: subChildren.name,
                isActive:
                  itemIndex === active[0] &&
                  childrenIndex === active[1] &&
                  subChildrenIndex === active[2],
                onClick: () =>
                  handleClick(itemIndex, childrenIndex, subChildrenIndex),
              })
            ),
          }))}
        />
      ))}
    </nav>
  );
}

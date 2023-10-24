import React from "react";
import { Oval } from "react-loader-spinner";

type LoadingProps = {
  size: "xs" | "sm" | "md" | "lg" | "xl";
  color: "primary" | "white";
  stroke?: number;
};

export function Loading(props: LoadingProps) {
  const size = React.useMemo(() => {
    switch (props.size) {
      case "xs":
        return 16;
      case "sm":
        return 24;
      case "md":
        return 32;
      case "lg":
        return 40;
      case "xl":
        return 48;
    }
  }, [props.size]);

  const { primaryColor, secondaryColor } = React.useMemo(() => {
    switch (props.color) {
      case "primary":
        return { primaryColor: "#266BAC", secondaryColor: "#1A4A77" };
      case "white":
        return { primaryColor: "#ffffff", secondaryColor: "cecece" };
    }
  }, [props.color]);

  return (
    <div className="flex items-center justify-center">
      <Oval
        width={size}
        height={size}
        color={primaryColor}
        secondaryColor={secondaryColor}
        strokeWidth={props.stroke || 4}
        strokeWidthSecondary={props.stroke || 4}
      />
    </div>
  );
}

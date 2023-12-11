import React from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "react-bootstrap-icons";
import clsx, { ClassValue } from "clsx";
import { useRouter } from "next/navigation";

type ButtonVariant = "solid" | "faded" | "bordered";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "md";
  startContent?: React.ReactElement<Icon> | React.ReactNode;
  endContent?: React.ReactElement<Icon> | React.ReactNode;
  isIconOnly?: boolean;
  color?: "primary" | "secondary";
  href?: string;
}

const Button = ({
  className,
  variant = "solid",
  size = "md",
  startContent,
  endContent,
  isIconOnly = false,
  color = "primary",
  children,
  href,
  ...props
}: ButtonProps) => {
  const buttonVariant = (variant: ButtonVariant): ClassValue => {
    switch (variant) {
      case "solid":
        return `bg-${color} text-white hover:bg-${color}/80 active:bg-primary2 transition-colors duration-200`;

      case "bordered":
        return `bg-transparent text-${color} border-[2px] border-${color} transition-colors duration-200 active:bg-white/20`;

      case "faded":
        return "styles.buttonVariantFaded";

      default:
        return `bg-${color} text-white hover:bg-${color}/80 active:bg-primary2 transition-colors duration-200`;
    }
  };

  const router = useRouter();

  const handleClick = (link: string) => {
    if (link === undefined) {
      return;
    }

    router.push(link);
  };

  return (
    <button
      {...props}
      className={twMerge(
        clsx(
          "flex items-center justify-center font-medium gap-3 relative px-4 rounded-[10px] box-border min-h-[40px] min-w-[80px]",
          buttonVariant(variant),
          props.disabled && `opacity-50 hover:bg-${color} active:bg-${color}`
        ),
        className
      )}
      onClick={() => handleClick(href!)}
    >
      {startContent}
      {children}
      {endContent}
    </button>
  );
};

export default Button;

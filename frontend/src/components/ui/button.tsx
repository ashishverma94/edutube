"use client";

import { cn } from "../../lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex font-[] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[20px] [corner-shape:squircle] font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed [&_svg]:size-4 [&_svg]:shrink-0 shadow-[0px_0px_0px_1px_hsla(196,87%,9%,0.1)_inset,0px_0px_0px_0px_hsla(221,100%,65%,1)_inset] disabled:border-neutral-300 disabled:border-[0.5px] font-[poppins]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 font-medium text-white hover:bg-primary-400 focus:bg-primary-700 disabled:bg-neutral-500 disabled:text-neutral-600 text-base border",
        secondary:
          "bg-white text-primary-500 border border-primary-500 hover:bg-primary-200 hover:border-primary-300 focus:bg-primary-300 focus:border-primary-400 disabled:bg-white disabled:text-neutral-600",
        secondaryNeutral:
          "border-neutral-400 border-[0.5px] text-neutral-900 hover:bg-neutral-200 hover:border-neutral-500 hover:text-neutral-900 focus:bg-neutral-300 focus:border-neutral-500 focus:text-neutral-900 disabled:bg-white disabled:text-neutral-600",
        danger:
          "bg-danger-600 text-white hover:bg-danger-500 active:bg-danger-700 disabled:bg-danger-600 disabled:opacity-40",
        dark: "bg-black text-white hover:bg-neutral-800 active:bg-neutral-700 disabled:bg-neutral-500 disabled:text-neutral-700 disabled:opacity-40",
      },
      size: {
        xs: "h-[32px] xl:h-10 md:h-[28px] py-1 md:rounded-[8px] xl:rounded-xl px-2 md:px-3 xl:px-5 text-xs md:text-[10px] xl:text-sm",
        sm: " h-[48px]  xl:h-12 md:h-[38px] py-1 md:rounded-[8px] xl:rounded-xl px-2 md:px-4 xl:px-8 text-sm md:text-[12px] xl:text-base",
        lg: "py-1 rounded-[20px] px-8 h-12",
        icon: "h-9 w-9",
        box: "h-[56px] w-[56px] rounded-xl p-4 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: any; // Accepts any React element, e.g., an SVG
  iconAtStart?: boolean; // Determines the position of the icon
  loading?: boolean; // New loading prop
  variant?: "primary" | "secondary" | "secondaryNeutral" | "danger" | "dark";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size,
      asChild = false,
      icon,
      iconAtStart = true,
      loading = false, // Default loading to false
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Intercept the icon and apply the dynamic class
    const processedIcon = React.isValidElement(icon)
      ? React.cloneElement(icon, {
        className: cn((icon as any).props.className, "text-current"),
      } as React.Attributes)
      : null;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading
            ? `${variant === "primary"
              ? "disabled:bg-primary-400"
              : variant === "secondary"
                ? "disabled:bg-neutral-500"
                : variant === "secondaryNeutral"
                  ? "disabled:bg-neutral-500"
                  : "disabled:bg-danger-600"
            }`
            : ""
        )}
        ref={ref}
        disabled={disabled || loading} // Disable button when loading
        onMouseUp={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (e.currentTarget) e.currentTarget.blur();
        }}
        {...props}
      >
        {loading ? (
          // <Loader bgColor={"white"} />
          <span>loading...</span>
        ) : (
          <>
            {iconAtStart && processedIcon}
            {children}
            {!iconAtStart && processedIcon}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

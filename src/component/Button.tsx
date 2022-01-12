import cc from "classcat";
import { forwardRef, useMemo } from "react";

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  isDisabled?: boolean;
};

type ButtonVariant = "outline" | "ghost" | "solid-blue" | "solid-red" | "solid-gray" | "solid-white" | "solid-black";

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & Common;

const useButtonClass = (className?: string, variant?: ButtonVariant, disabled?: boolean) => {
  const classes = useMemo(() => {
    return cc([
      "grid place-items-center px-4 py-2 font-bold tracking-wider focus-visible:ring-2 transition duration-200 ease-in-out focus:outline-none cursor-pointer",
      {
        "bg-gray-400 hover:bg-gray-400 cursor-default text-white": disabled,
        "border focus:ring-2 focus:ring-blue-400": variant === "outline" && !disabled,
        "hover:text-blue-400 focus-visible:text-blue-400 hover:bg-blue-50 focus-visible:bg-blue-50 focus-visible:ring-blue-400":
          variant === "ghost" && !disabled,
        "text-white bg-blue-500 hover:bg-blue-600 focus-visible:bg-blue-600 focus-visible:ring-blue-400":
          variant === "solid-blue" && !disabled,
        "text-white bg-red-500 hover:bg-red-600 focus-visible:bg-red-600 focus-visible:ring-red-400":
          variant === "solid-red" && !disabled,
        "bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:ring-blue-400":
          variant === "solid-gray" && !disabled,
        "bg-white hover:bg-gray-100 focus:bg-gray-100 ": variant === "solid-white" && !disabled,
        "text-white bg-black hover:bg-gray-800 focus:bg-gray-800 ": variant === "solid-black" && !disabled,
      },
      className,
    ]);
  }, [className, variant, disabled]);

  return classes;
};

export const Button = forwardRef<HTMLButtonElement, ButtonType>((props, ref) => {
  const { children, className, variant = "solid-blue", isDisabled, ...rest } = props;
  const classes = useButtonClass(className, variant, isDisabled);
  return (
    <button type="button" disabled={isDisabled} ref={ref} {...rest} className={classes}>
      {children}
    </button>
  );
});

Button.displayName === "Button";

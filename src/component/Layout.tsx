import clsx from "clsx";
import type { VFC } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Layout: VFC<Props> = (props) => {
  return (
    <div
      className={clsx([
        "m-4",
        {
          [`${props.className}`]: props.className,
        },
      ])}
    >
      {props.children}
    </div>
  );
};

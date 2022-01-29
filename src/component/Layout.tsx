import clsx from "clsx";
import type { VFC } from "react";

type Props = {
  children: React.ReactNode;
  option?: string;
};

export const Layout: VFC<Props> = (props) => {
  return (
    <div
      className={clsx([
        "m-4",
        {
          [`${props.option}`]: props.option,
        },
      ])}
    >
      {props.children}
    </div>
  );
};

import { PropsWithChildren } from "react";

type ContainerProps = {
  className?: string;
};

export default function Container({ children, className = "" }: PropsWithChildren<ContainerProps>) {
  const classes = ["mx-auto w-full max-w-6xl px-6 lg:px-8", className].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}

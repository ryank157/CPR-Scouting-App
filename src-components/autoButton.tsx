import type { DOMAttributes, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  icon: string[];
  variant: boolean;
  onClick: DOMAttributes<HTMLButtonElement>["onClick"];
}
export default function AutoButton({
  children,
  className,
  icon,
  variant,
  onClick,
}: ButtonProps) {
  const inactive = "border-inactive-border bg-inactive-bg";
  const active = "border-active-border bg-cpr-blue-light";
  // Children info
  return (
    <button
      className={` flex h-12 items-center justify-between rounded-md border-2 p-2.5 text-xl ${
        variant ? active : inactive
      } ${className}`}
      onClick={onClick}
    >
      {children}
      <div
        className={`${
          variant ? icon[1] : icon[0]
        } h-full w-15 bg-contain bg-right bg-no-repeat`}
      ></div>
    </button>
  );
}

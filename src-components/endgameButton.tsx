import type { DOMAttributes, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;

  variant: boolean;
  onClick: DOMAttributes<HTMLButtonElement>["onClick"];
}
export default function EndgameButton({
  children,
  className,
  variant,
  onClick,
}: ButtonProps) {
  const inactive = "bg-inactive-bg";
  const active = "bg-cpr-blue-light";
  return (
    <button
      className={`row-span-1 flex h-10 w-full items-center justify-center rounded-[5px]  border border-inactive-border text-xl ${
        variant ? active : inactive
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

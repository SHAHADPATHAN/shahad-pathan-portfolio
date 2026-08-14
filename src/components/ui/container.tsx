import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";

export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  );
}

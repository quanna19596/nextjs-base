import { ComponentProps, JSX } from "react";
import { cn } from "@/app/api/tools/(common)/csr-helpers";

const Skeleton = ({ className, ...props }: ComponentProps<"div">): JSX.Element => {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
};

export { Skeleton };

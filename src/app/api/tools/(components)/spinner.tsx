import { ComponentProps, JSX } from "react";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/utils/common";

const Spinner = ({ className, ...props }: ComponentProps<"svg">): JSX.Element => {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
};

export { Spinner };

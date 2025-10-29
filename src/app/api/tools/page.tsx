import { JSX } from "react";
import { notFound } from "next/navigation";
import { isDevelopmentMode } from "@/utils/common";

const Page = (): JSX.Element => {
  if (!isDevelopmentMode()) {
    return notFound();
  }

  return (
    <div>
      <span className="text-[#ff0000]">Welcome</span>
    </div>
  );
};

export default Page;

import { JSX } from "react";
import { notFound } from "next/navigation";
import { isDevelopmentMode } from "@/utils/common";

const Page = (): JSX.Element => {
  if (!isDevelopmentMode()) {
    return notFound();
  }

  return (
    <div>
      <span>Page</span>
    </div>
  );
};

export default Page;

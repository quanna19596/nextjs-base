"use client";

import { JSX } from "react";
import { useParams } from "next/navigation";

const Page = (): JSX.Element => {
  const params: { name: string } = useParams();

  return <div>Service: {params.name}</div>;
};

export default Page;

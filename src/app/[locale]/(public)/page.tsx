"use client";

import { JSX } from "react";
import { useTranslations } from "@/i18n";
import useGetAllProducts from "@/services/sample/products/get-all-products/hook";
import { TPageProps } from "./types";

const Page = ({}: TPageProps): JSX.Element => {
  const { mutate, isPending } = useGetAllProducts();
  const t = useTranslations();

  const handleClick = async (): Promise<void> => {
    mutate({ queries: { pageNum: 1, pageSize: 10 } });
  };

  if (isPending) return <span>Loading...</span>;

  return (
    <div>
      <span>{t("App.Public.Page")}</span>
      <button onClick={handleClick}>Get All Products</button>
    </div>
  );
};

export default Page;

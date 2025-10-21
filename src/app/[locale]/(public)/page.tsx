"use client";

import useGetAllProducts from "@/services/sample/products/get-all-products/hook";
import { useTranslations } from "next-intl";

const Home = () => {
  const { mutate, isPending } = useGetAllProducts();
  const t = useTranslations();

  const handleClick = async () => {
    mutate({ queries: { pageNum: 1, pageSize: 10 } });
  };

  if (isPending) return "Loading...";

  return (
    <div>
      <span>{t("App.Page.title")}</span>
      <button onClick={handleClick}>Get All Products</button>
    </div>
  );
};

export default Home;

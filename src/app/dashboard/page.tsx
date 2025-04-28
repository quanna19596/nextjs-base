"use client";

import useGetAllProducts from "@/hooks/apis/sample/products/useGetAllProducts";
import { signIn, useSession } from "next-auth/react";

export default function DashboardPage1() {
  const { mutate: getAllProducts, isPending: gettingProducts } =
    useGetAllProducts();

  // const { data: session, status } = useSession();

  // console.log('CLIENT', session);

  const tryToLogin = (): void => {
    signIn("credentials", {
      username: "emilys",
      password: "emilyspass",
      redirect: false
    });
  };

  const getProducts = (): void => {
    getAllProducts({});
  };

  return (
    <div>
      <button onClick={tryToLogin}>Login</button>
      <button onClick={getProducts}>Get Products</button>
    </div>
  );
}

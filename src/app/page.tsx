"use client";

import useGetAllProducts from "@/services/sample/products/get-all-products/hook";

const Home = () => {
  const { mutate, isPending } = useGetAllProducts();

  const handleClick = async () => {
    mutate({ queries: { pageNum: 1, pageSize: 10 } });
  };

  if (isPending) return "Loading...";

  return (
    <div>
      <span>Home</span>
      <button onClick={handleClick}>Get All Products</button>
    </div>
  );
};

export default Home;

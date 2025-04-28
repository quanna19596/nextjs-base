// import getAllProducts from "@/services/sample/products/get-all-products";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions);
  // console.log('SERVER', session);
  // const resp = await getAllProducts({});
  return (
    <div>
      <p>DashboardLayout</p>
      <div>{children}</div>
    </div>
  );
}

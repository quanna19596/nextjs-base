import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      <p>DashboardLayout</p>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;

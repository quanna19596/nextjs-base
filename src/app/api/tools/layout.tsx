import { JSX } from "react";
import "@/styles/globals.css";

export const metadata = {
  title: "Developer Tools",
  description: "Developer Tools",
};

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default Layout;

import { JSX } from "react";
import "@/styles/globals.css";
import { AppSidebar } from "./(components)/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./(components)/sidebar";
import { Toaster } from "./(components)/sonner";

export const metadata = {
  title: "Developer Tools",
  description: "Developer Tools",
};

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex flex-1 flex-col items-end justify-between p-4">
            <div className="w-full">{children}</div>
            <SidebarTrigger />
          </main>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default Layout;

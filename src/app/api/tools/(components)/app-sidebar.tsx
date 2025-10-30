import { JSX } from "react";
import { headers } from "next/headers";
import { Calendar, Home, Search, Settings, Zap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";

const rootUrl = "/api/tools";

const items = [
  {
    title: "Services",
    rootPoint: "services",
    icon: Zap,
  },
  {
    title: "Calendar",
    rootPoint: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    rootPoint: "#",
    icon: Search,
  },
  {
    title: "Settings",
    rootPoint: "#",
    icon: Settings,
  },
];

const AppSidebar = async (): Promise<JSX.Element> => {
  const headersList = await headers();
  const currentPath = headersList.get("x-current-path");

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      currentPath ? currentPath?.startsWith(`${rootUrl}/${item.rootPoint}`) : false
                    }
                  >
                    <a href={`${rootUrl}/${item.rootPoint}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export { AppSidebar };

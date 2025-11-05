"use client";

import { JSX, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ERoute } from "@/app/api/tools/(common)/enums";
import { fetchEndpointsByService } from "@/app/api/tools/(common)/methods";
import { TService } from "@/app/api/tools/(common)/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/api/tools/(components)/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/api/tools/(components)/tabs";

const Page = (): JSX.Element => {
  const params: { name: string } = useParams();
  const [service, setService] = useState<TService>();

  useEffect(() => {
    fetchEndpointsByService({ service: params.name });
  }, []);

  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`${ERoute.ROOT}${ERoute.SERVICES}`}>Services</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{params.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs defaultValue="endpoints">
        <TabsList>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
        </TabsList>
        <TabsContent value="endpoints">Endpoints</TabsContent>
        <TabsContent value="models">Models</TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;

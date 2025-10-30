"use client";

import { JSX, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { TService } from "@/app/api/tools/(common)/types";
import { Button } from "@/app/api/tools/(components)/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/api/tools/(components)/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/api/tools/(components)/form";
import { Input } from "@/app/api/tools/(components)/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/api/tools/(components)/table";
import ToolsAPI from "@/app/api/tools/api";
import { formSchema } from "./data";

const Page = (): JSX.Element => {
  const [services, setServices] = useState<TService[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: "",
      baseUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>): void => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  const fetchServices = async (): Promise<void> => {
    const { data } = await ToolsAPI.get<TService[]>("/services");
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <Dialog>
        <DialogTrigger className="mb-4 cursor-pointer">
          <Button onClick={() => form.reset()}>
            <Plus />
            Add new service
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New service</DialogTitle>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-4">
                <FormField
                  control={form.control}
                  name="serviceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="baseUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  <Check />
                  Submit
                </Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service Name</TableHead>
            <TableHead>BaseURL</TableHead>
            <TableHead>Groups</TableHead>
            <TableHead>Endpoints</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => {
            const endpointsAmount = service.groups.reduce(
              (result, group) => (result += group.endpoints.length),
              0,
            );

            return (
              <TableRow key={`${service.name}-${service.baseUrl}`}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.baseUrl}</TableCell>
                <TableCell>{service.groups.length}</TableCell>
                <TableCell>{endpointsAmount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;

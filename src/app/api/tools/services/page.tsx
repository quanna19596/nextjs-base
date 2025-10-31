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
  const [visibleServiceForm, setVisibleServiceForm] = useState<boolean>(false);

  const serviceForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: "",
      baseUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>): void => {
    createService(values);
  };

  const fetchServices = async (): Promise<void> => {
    const { data } = await ToolsAPI.get<TService[]>("/services");
    setServices(data);
  };

  const createService = async (body: z.infer<typeof formSchema>): Promise<void> => {
    await ToolsAPI.post<TService[]>("/services", body);
    fetchServices();
    setVisibleServiceForm(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <Dialog open={visibleServiceForm} onOpenChange={setVisibleServiceForm}>
        <Button
          className="mb-4 cursor-pointer"
          onClick={() => {
            setVisibleServiceForm(true);
            serviceForm.reset();
          }}
        >
          <Plus />
          Add new service
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New service</DialogTitle>
            <Form {...serviceForm}>
              <form onSubmit={serviceForm.handleSubmit(onSubmit)} className="space-y-8 pt-4">
                <FormField
                  control={serviceForm.control}
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
                  control={serviceForm.control}
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
            <TableHead>Base URL</TableHead>
            <TableHead className="text-center">Models</TableHead>
            <TableHead className="text-center">Groups</TableHead>
            <TableHead className="text-center">Endpoints</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={`${service.name}-${service.baseUrl}`}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.baseUrl}</TableCell>
              <TableCell className="text-center">{service.numberOfModels}</TableCell>
              <TableCell className="text-center">{service.numberOfGroups}</TableCell>
              <TableCell className="text-center">{service.numberOfEndpoints}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;

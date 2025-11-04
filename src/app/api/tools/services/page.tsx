"use client";

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Pencil, Plus, TextSearch, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { ERoute } from "@/app/api/tools/(common)/enums";
import {
  createService,
  deleteService,
  fetchService,
  fetchServices,
  updateService,
} from "@/app/api/tools/(common)/methods";
import { TService } from "@/app/api/tools/(common)/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/api/tools/(components)/alert-dialog";
import { Button } from "@/app/api/tools/(components)/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/api/tools/(components)/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/api/tools/(components)/form";
import { FullLoading } from "@/app/api/tools/(components)/full-loading";
import { Input } from "@/app/api/tools/(components)/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/api/tools/(components)/table";
import { TCreateServiceResponse, TUpdateServiceResponse } from "@/app/api/tools/api/services/types";
import { defaultValues, formSchema } from "./data";

const Page = (): JSX.Element => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<TService[]>([]);
  const [visibleServiceForm, setVisibleServiceForm] = useState<boolean>(false);
  const [visibleConfirmDeleteServiceAlert, setVisibleConfirmDeleteServiceAlert] =
    useState<boolean>(false);
  const [targetService, setTargetService] = useState<TService>();

  const serviceForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const modifyServiceRespHandler = (
    resp: TCreateServiceResponse | TUpdateServiceResponse,
  ): void => {
    if (!resp.isSuccess) {
      toast.error(resp.message);
      return;
    }

    const fetchServicesDelay = setTimeout(async () => {
      const fetchServiceResp = await fetchServices();
      if (fetchServiceResp.isSuccess && fetchServiceResp.data) setServices(fetchServiceResp.data);

      setLoading(false);
      clearTimeout(fetchServicesDelay);
    }, 300);
    setVisibleServiceForm(false);
    toast.success(resp.message);
  };

  const onSubmitService = async (values: z.infer<typeof formSchema>): Promise<void> => {
    setLoading(true);
    if (!targetService) {
      const createServiceResp = await createService(values);
      modifyServiceRespHandler(createServiceResp);
      return;
    }

    const updateServiceResp = await updateService(targetService.name, values);
    modifyServiceRespHandler(updateServiceResp);
  };

  const onSubmitDeleteService = async (service: TService): Promise<void> => {
    setLoading(true);
    const resp = await deleteService(service.name);

    if (!resp.isSuccess) {
      toast.error(resp.message);
      return;
    }

    const fetchServicesDelay = setTimeout(async () => {
      const fetchServiceResp = await fetchServices();
      if (fetchServiceResp.isSuccess && fetchServiceResp.data) setServices(fetchServiceResp.data);

      setLoading(false);
      clearTimeout(fetchServicesDelay);
    }, 300);

    toast.success(resp.message);
  };

  const handleGetService = async (service: TService): Promise<void> => {
    setLoading(true);
    const serviceResp = await fetchService(service.name);
    if (!serviceResp.isSuccess) {
      toast.error(serviceResp.message);
      return;
    }

    serviceForm.reset({ serviceName: serviceResp.data?.name, baseUrl: serviceResp.data?.baseUrl });
    setTargetService(serviceResp.data);
    setVisibleServiceForm(true);
    setLoading(false);
  };

  useEffect(() => {
    const getAllServices = async (): Promise<void> => {
      setLoading(true);
      const resp = await fetchServices();
      if (resp.isSuccess && resp.data) setServices(resp.data);
      setLoading(false);
    };
    getAllServices();
  }, []);

  return (
    <div>
      <FullLoading loading={loading} />
      <Dialog open={visibleServiceForm} onOpenChange={setVisibleServiceForm}>
        <Button
          className="mb-4"
          onClick={() => {
            setVisibleServiceForm(true);
            setTargetService(undefined);
            serviceForm.reset(defaultValues);
          }}
        >
          <Plus />
          Add new service
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{!targetService ? "New service" : targetService.name}</DialogTitle>
            <Form {...serviceForm}>
              <form onSubmit={serviceForm.handleSubmit(onSubmitService)} className="space-y-8 pt-4">
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
            <TableHead />
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
              <TableCell className="flex items-center">
                <Button
                  size="icon"
                  onClick={() => {
                    setTargetService(service);
                    setVisibleConfirmDeleteServiceAlert(true);
                  }}
                >
                  <Trash2 />
                </Button>
                <Button
                  className="ml-2"
                  size="icon"
                  onClick={() => {
                    handleGetService(service);
                  }}
                >
                  <Pencil />
                </Button>
                <Button
                  className="ml-2"
                  size="icon"
                  onClick={() => {
                    handleGetService(service);
                    router.push(`${ERoute.ROOT}${ERoute.SERVICE}/${service.name}`);
                  }}
                >
                  <TextSearch />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlertDialog
        open={visibleConfirmDeleteServiceAlert}
        onOpenChange={setVisibleConfirmDeleteServiceAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (targetService) {
                  onSubmitDeleteService(targetService);
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Page;

import { JSX } from "react";
import { useAppLoading } from "@/app/api/tools/(context)/app-loading";
import { Dialog, DialogContent } from "./dialog";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty";
import { Spinner } from "./spinner";

export const FullLoading = (): JSX.Element => {
  const { appLoading } = useAppLoading();

  return (
    <Dialog open={appLoading}>
      <DialogContent showCloseButton={false}>
        <Empty className="w-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyTitle>Processing your request</EmptyTitle>
            <EmptyDescription>
              Please wait while we process your request. Do not refresh the page.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </DialogContent>
    </Dialog>
  );
};

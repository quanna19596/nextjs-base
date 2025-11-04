import { JSX } from "react";
import { Button } from "./button";
import { Dialog, DialogContent } from "./dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty";
import { Spinner } from "./spinner";

export const FullLoading = ({ loading }: { loading: boolean }): JSX.Element => {
  return (
    <Dialog open={loading}>
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

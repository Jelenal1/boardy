"use client";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { revalidatePage } from "~/utils/serverActions";
import Dialog from "./Dialog";

const MoreButton = ({
  className,
  classNameButton,
  titleDialog,
  serverDeleteAction,
}: {
  className?: string;
  classNameButton?: string;
  titleDialog: string;
  serverDeleteAction: () => void | Promise<void>;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<() => void | Promise<void>>(
    () => {},
  );
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const handleDeleteAction = () => {
    setDialogAction(() => async () => {
      await serverDeleteAction();
      setIsDialogOpen(false);
    });
    setDialogTitle("Delete " + titleDialog);
    setDialogContent("Are you sure you want to delete " + titleDialog + "?");
    setIsDialogOpen(true); // Open the dialog
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={className}>
          <HiDotsVertical
            className={
              classNameButton
                ? classNameButton
                : "rounded-full bg-zinc-900 py-1 text-xl"
            }
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDeleteAction}>
            Delete 🗑
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        dialogAction={dialogAction}
        dialogTitle={dialogTitle}
        dialogContent={dialogContent}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
    </>
  );
};

export default MoreButton;

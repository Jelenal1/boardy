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
import { deleteList } from "~/utils/queries";
import { revalidate } from "~/utils/serverActions";
import { LIST } from "~/utils/types";
import Dialog from "./Dialog";

const ListMoreButton = ({
  className,
  list,
}: {
  className?: string;
  list: LIST;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<() => void | Promise<void>>(
    () => {},
  );
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const handleDeleteAction = () => {
    setDialogAction(() => async () => {
      await deleteList(list.id);
      setIsDialogOpen(false);
      revalidate("/board/[id]");
    });
    setDialogTitle("Delete List");
    setDialogContent(
      "Are you sure you want to delete this list? This action cannot be undone.",
    );
    setIsDialogOpen(true); // Open the dialog
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={className}>
          <HiDotsVertical className="rounded-full bg-black py-1 text-xl" />
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

export default ListMoreButton;

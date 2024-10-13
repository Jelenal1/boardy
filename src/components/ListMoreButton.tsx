"use client";
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

const ListMoreButton = ({
  className,
  list,
}: {
  className?: string;
  list: LIST;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <HiDotsVertical className="rounded-full bg-black py-1 text-xl" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            deleteList(list.id);
            revalidate("/board/[id]");
          }}
        >
          Delete 🗑
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListMoreButton;

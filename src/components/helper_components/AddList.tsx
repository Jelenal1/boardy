"use client";
import { FaPlus } from "react-icons/fa6";
import { createList } from "~/utils/queries";
import { revalidate } from "~/utils/serverActions";
import { Button } from "../ui/button";

const AddList = ({
  boardId,
  userIds,
  position,
}: {
  boardId: number;
  userIds: string[];
  position: number;
}) => {
  const addList = async () => {
    await createList({
      boardId: boardId,
      user_uids: userIds,
      title: "Title",
      position: position,
    });
    revalidate("/board/[id]");
  };
  return (
    <div className="mx-2 w-20 rounded-md bg-gray-600 p-4">
      <Button className="h-full w-full" onClick={() => addList()}>
        <FaPlus size={20} />
      </Button>
    </div>
  );
};

export default AddList;

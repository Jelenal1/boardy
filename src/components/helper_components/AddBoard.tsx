"use client";
import { FaPlus } from "react-icons/fa6";
import { createBoard } from "~/utils/queries";
import { revalidatePage } from "~/utils/serverActions";
import { Button } from "../ui/button";

const AddBoard = ({ userId }: { userId: string }) => {
  const addBoard = async () => {
    await createBoard({
      title: "Title",
      user_uids: [userId ?? ""],
    });
    revalidatePage("/boards");
  };

  return (
    <div className="ml-9 mr-auto rounded-md bg-gray-600 p-4 text-center">
      <Button className="w-full" onClick={() => addBoard()}>
        <FaPlus size={20} />
      </Button>
    </div>
  );
};

export default AddBoard;

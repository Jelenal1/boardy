"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import { createBoard } from "~/utils/queries";
import { revalidate } from "~/utils/serverActions";
import { Button } from "../ui/button";

const AddBoard = () => {
  const router = useRouter();
  const userId = useAuth().userId;
  if (!userId) router.push("/signin");

  const addBoard = async () => {
    await createBoard({
      title: "Title",
      user_uids: [userId ?? ""],
    });
    revalidate("/boards");
  };

  return (
    <div className="mr-auto rounded-md bg-gray-600 p-4 text-center">
      <Button className="w-full" onClick={() => addBoard()}>
        <FaPlus size={20} />
      </Button>
    </div>
  );
};

export default AddBoard;

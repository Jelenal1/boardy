"use client";
import { FaPlus } from "react-icons/fa6";
import { createCard } from "~/utils/queries";
import { revalidate } from "~/utils/serverActions";
import { Button } from "./ui/button";

const AddCard = ({
  listId,
  position,
}: {
  listId: number;
  position: number;
}) => {
  const addCard = async () => {
    try {
      await createCard({
        listId: listId,
        title: "",
        description: "",
        status: "todo",
        user_uids: [],
        dueDate: new Date(),
        position: position,
      });
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
    revalidate("/board/[id]");
  };

  return (
    <>
      <Button className="w-full" onClick={() => addCard()}>
        <FaPlus size={20} />
      </Button>
    </>
  );
};

export default AddCard;

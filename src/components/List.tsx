"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import type { List } from "~/app/utils/types";
import Card from "./Card";
import { Button } from "./ui/button";

const List = async ({ initialList }: { initialList: List }) => {
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      title: "To Do",
      status: "todo",
      responsability: 1,
      description: "",
      dueDate: new Date(),
      listId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  return (
    <div className="flex max-h-full w-full max-w-96 flex-col gap-4 overflow-y-scroll bg-gray-600 p-2">
      <h2 className="mx-auto text-3xl">{initialList.title}</h2>
      <Button>
        <FaPlus size={20} />
      </Button>
      {cards.map((card) => (
        <Card key={card.id} initialCard={card} />
      ))}
    </div>
  );
};

export default List;

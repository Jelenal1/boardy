"use client";

import { useEffect, useState } from "react";
import type { Card } from "~/app/utils/types";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

const Card = ({ initialCard }: { initialCard: Card }) => {
  const [card, setCard] = useState<Card>(initialCard);

  useEffect(() => {
    setCard(initialCard);
  }, [initialCard]);

  return (
    <div
      key={card.id}
      className="m-4 flex w-full max-w-[300px] flex-col gap-4 rounded-md border-2 border-white p-4 text-center"
    >
      <h2
        className="rounded-md text-xl font-bold outline outline-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        contentEditable={true}
      >
        {card.title}
      </h2>
      <p
        className="rounded-md outline outline-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        contentEditable={true}
      >
        {card.description}
      </p>
      <Select>
        <SelectTrigger>
          <span>{card.status}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todo">todo</SelectItem>
          <SelectItem value="in-progress">in-progress</SelectItem>
          <SelectItem value="done">done</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Card;

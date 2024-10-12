"use client";

import { useEffect, useState } from "react";
import type { Card, Label } from "~/app/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Card = ({ initialCard }: { initialCard: Card }) => {
  const [card, setCard] = useState<Card>(initialCard);
  const [status, setStatus] = useState<"todo" | "inprogress" | "done">(
    card.status,
  );
  const [labels, setLabels] = useState<Label[]>([]);

  const updateStatus = async (value: "todo" | "inprogress" | "done") => {
    setCard({ ...card, status: value });
    setStatus(value);
  };

  const fetchLabels = async (id: number) => {
    const fetchedLabels = await fetch(`/api/getCards/${id}/getLabels`, {
      next: { revalidate: 10 },
    });
  };

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
      <Select
        value={status}
        onValueChange={(value: "todo" | "inprogress" | "done") =>
          updateStatus(value)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todo">Todo</SelectItem>
          <SelectItem value="inprogress">In progress</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex h-10 rounded-md border border-white">
        {labels.map((label) => (
          <div
            key={label.id}
            className="inline-block w-10 rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
          >
            {label.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;

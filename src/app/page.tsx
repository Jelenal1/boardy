import Card from "~/components/Card";
import type { GetCardsResult } from "./utils/types";

export default async function HomePage() {
  const cards: GetCardsResult = [
    {
      id: 1,
      title: "Test 1",
      status: "done",
      description: "Test 1 description",
      listId: 1,
      dueDate: new Date(),
      responsability: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center bg-black">
      <h1 className="text-5xl font-bold">Boardy</h1>
      {cards.map((card) => (
        <Card key={card.id} initialCard={card} />
      ))}
    </main>
  );
}

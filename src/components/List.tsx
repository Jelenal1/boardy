import { getCardsOfList } from "~/utils/queries";
import type { LIST } from "~/utils/types";
import AddCard from "./AddCard";
import Card from "./Card";

const List = async ({ initialList }: { initialList: LIST }) => {
  const cards = await getCardsOfList(initialList.id);

  return (
    <div className="mx-2 flex max-h-[calc(100vh-5em)] min-w-72 flex-col gap-4 overflow-y-scroll rounded-md bg-gray-600 p-4">
      <h2 className="mx-auto text-3xl">{initialList.title}</h2>
      {cards?.map((card) => <Card key={card.id} initialCard={card} />)}
      <AddCard key={initialList.id} listId={initialList.id} />
    </div>
  );
};

export default List;

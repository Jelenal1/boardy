import { getCardsOfList, updateList } from "~/utils/queries";
import type { LIST } from "~/utils/types";
import AddCard from "./AddCard";
import Card from "./Card";
import ReactiveHeader from "./ReactiveHeader";

const List = async ({ initialList }: { initialList: LIST }) => {
  const cards = await getCardsOfList(initialList.id);

  return (
    <div className="mx-2 flex max-h-full min-w-72 flex-col gap-4 overflow-y-scroll rounded-md bg-gray-600 p-4">
      <ReactiveHeader
        className="mx-2"
        headerText={initialList.title}
        handleUpdate={async (innerText) => {
          "use server";
          updateList({
            ...initialList,
            title: innerText,
          });
        }}
      />
      {cards?.map((card) => <Card key={card.id} initialCard={card} />)}
      <AddCard key={initialList.id} listId={initialList.id} />
    </div>
  );
};

export default List;

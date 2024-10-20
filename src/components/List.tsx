import { deleteList, getCardsOfList, updateList } from "~/utils/queries";
import type { LIST } from "~/utils/types";
import Card from "./Card";
import AddCard from "./helper_components/AddCard";
import MoreButton from "./MoreButton";
import ReactiveHeader from "./ReactiveHeader";
import { revalidatePage } from "~/utils/serverActions";

const List = async ({ initialList }: { initialList: LIST }) => {
  const cards = await getCardsOfList(initialList.id);

  return (
    <div className="relative mx-2 flex h-full min-w-72 flex-col gap-4 overflow-y-scroll rounded-md bg-gray-600 p-4">
      <MoreButton
        serverDeleteAction={async () => {
          "use server";
          deleteList(initialList.id);
          revalidatePage("/board/[id]");
        }}
        className="ml-auto"
        titleDialog="List"
      />
      <ReactiveHeader
        className="mx-1 whitespace-pre-line rounded-md p-1 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
        emptyClassName="mx-1 rounded-md p-1 text-xl outline outline-dashed outline-1 focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-50"
        headerText={initialList.title}
        handleUpdate={async (innerText) => {
          "use server";
          updateList({
            ...initialList,
            title: innerText,
          });
        }}
      />
      {cards?.map((card, index) => <Card key={card.id} initialCard={card} />)}
      <AddCard
        key={initialList.id}
        listId={initialList.id}
        position={cards.length ? cards.length + 1 : 1}
      />
    </div>
  );
};

export default List;

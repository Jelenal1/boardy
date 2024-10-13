import { createCard, getCardsOfList } from "~/utils/queries";
import { revalidate } from "~/utils/serverActions";
import type { LIST } from "~/utils/types";
import AddCard from "./AddCard";
import Card from "./Card";




const List = async ({ initialList }: { initialList: LIST }) => {

  const cards = await getCardsOfList(initialList.id);

  const addCard = async () => {
    "use server"
    if (!initialList.id) return;
    try {
      await createCard({
        listId: initialList.id,
        title: "",
        description: "",
        status: "todo",
        user_uids: [],
        dueDate: new Date(),
      });
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
    revalidate('/board/[id]')
  };

  return (
    <div className="mx-2 flex max-h-full w-full max-w-80 flex-col gap-4 overflow-y-scroll rounded-md bg-gray-600 px-4 py-4">
      <h2 className="mx-auto text-3xl">{initialList.title}</h2>
      {cards?.map((card) => <Card key={card.id} initialCard={card} />)}
      <AddCard addCard={addCard} />
    </div>
  );
};

export default List;

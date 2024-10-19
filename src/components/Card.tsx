import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LuText } from "react-icons/lu";
import { deleteCard, updateCard } from "~/utils/queries";
import type { CARD } from "~/utils/types";
import MoreButton from "./MoreButton";
import ReactiveInput from "./ReactiveInput";

const Card = ({ initialCard }: { initialCard: CARD }) => {
  const { userId } = auth();

  if (!userId) redirect("/signin");

  const fetchLabels = async (id: number) => {
    const fetchedLabels = await fetch(`/api/getCards/${id}/getLabels`, {
      next: { revalidate: 10 },
    });
  };

  return (
    <div className="mx-auto flex w-full flex-col gap-4 rounded-md border-2 border-zinc-900 p-4 text-center">
      <MoreButton
        serverDeleteAction={async () => {
          "use server";
          await deleteCard(initialCard.id);
        }}
        className="ml-auto"
      />

      <ReactiveInput
        headerText={initialCard.title}
        label="Title"
        icon={<LuText />}
        handleUpdate={async (innerText) => {
          "use server";
          updateCard({
            ...initialCard,
            title: innerText,
          });
        }}
      />

      <ReactiveInput
        label="Description"
        icon={<LuText />}
        inputType="textarea"
        headerText={initialCard.description}
        handleUpdate={async (innerText) => {
          "use server";
          updateCard({ ...initialCard, description: innerText });
        }}
      />
    </div>
  );
};

export default Card;

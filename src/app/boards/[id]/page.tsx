import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AddList from "~/components/helper_components/AddList";
import MoreButton from "~/components/MoreButton";
import List from "~/components/List";
import ReactiveHeader from "~/components/ReactiveHeader";
import {
  deleteBoard,
  getBoard,
  getListsByBoardId,
  updateBoard,
} from "~/utils/queries";
import { BOARD, LIST } from "~/utils/types";
import { revalidatePage } from "~/utils/serverActions";
import ReactiveInput from "~/components/ReactiveInput";

export const revalidate = 1;

export default async function page({ params }: { params: { id: string } }) {
  if (Number(params.id) < 1 || !Number(params.id)) redirect("/not-found");
  const { userId } = auth();
  if (!userId) redirect("/signin");

  const lists: LIST[] = await getListsByBoardId(Number(params.id));
  if (!lists) redirect("/not-found");
  const board: BOARD | undefined = await getBoard(Number(params.id));
  if (!board) redirect("/not-found");

  return (
    <main className="m-4 rounded-md border border-gray-600 px-4">
      <div className="flex gap-4">
        <MoreButton
          classNameButton="bg-gray-600 p-1 rounded-full text-xl"
          serverDeleteAction={async () => {
            "use server";
            await deleteBoard(Number(params.id));
            revalidatePage("/boards");
            redirect("/boards");
          }}
          titleDialog="Board"
        />
        <ReactiveHeader
          handleUpdate={async (innerText) => {
            "use server";
            await updateBoard({
              ...board,
              title: innerText,
            });
          }}
          headerText={board.title}
          className="my-4 w-96 whitespace-pre-line rounded-md bg-transparent p-1 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          emptyClassName="my-4 w-96 rounded-md p-1 text-xl border border-dashed focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-50"
        />
      </div>
      <div className="mx-2 flex h-[calc(100vh-8.6rem)] overflow-x-scroll">
        {lists.map((list, index) => (
          <List key={list.id} initialList={list} />
        ))}
        <AddList
          boardId={Number(params.id)}
          userIds={[userId]}
          position={lists.length + 1}
        />
      </div>
    </main>
  );
}

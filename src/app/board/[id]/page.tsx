import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AddList from "~/components/AddList";
import List from "~/components/List";
import { getListsByBoardId } from "~/utils/queries";
import { LIST } from "~/utils/types";

export const revalidate = 1;

export default async function page({ params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) redirect("/signin");

  const lists: LIST[] = await getListsByBoardId(Number(params.id));

  return (
    <main>
      <div className="mx-2 flex h-[calc(100vh-4rem)] overflow-x-scroll">
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

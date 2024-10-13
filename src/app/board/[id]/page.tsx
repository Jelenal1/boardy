import { auth } from "@clerk/nextjs/server";
import AddList from "~/components/AddList";
import List from "~/components/List";
import { getListsByBoardId } from "~/utils/queries";
import { LIST } from "~/utils/types";

export const revalidate = 1;

export default async function page({params} : {params: {id: string}}) {
    const { userId } = auth();
    if (userId) {
    const lists : LIST[] = await getListsByBoardId(Number(params.id));



  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="mb-4 mt-2 text-5xl font-bold">Boardy</h1>
      <div className="mx-2 flex w-full overflow-x-scroll">
        {lists.map((list) => (
          <List key={list.id} initialList={list}/>
        ))}
        <AddList boardId={Number(params.id)} userIds={[userId]} />
      </div>
    </main>
  );
}
}

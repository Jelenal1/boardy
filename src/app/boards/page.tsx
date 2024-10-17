import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AddBoard from "~/components/helper_components/AddBoard";
import { getBoardsByUserId } from "~/utils/queries";

const Page = async () => {
  // get boards by user id of current clerk user
  const { userId } = auth();
  if (!userId) redirect("/signin");
  const boards = await getBoardsByUserId(userId);
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="text-3xl font-bold">Your Boards</h1>
      <AddBoard />
      {boards?.map((board) => (
        <div key={board.id}>
          <a href={`/boards/${board.id}`}>
            <div className="h-72 w-96 rounded-md bg-gray-600 p-4 text-center">
              <h2>{board.title}</h2>
            </div>
          </a>
        </div>
      ))}
    </main>
  );
};

export default Page;

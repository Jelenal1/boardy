import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Board from "~/components/Board";
import AddBoard from "~/components/helper_components/AddBoard";
import MoreButton from "~/components/MoreButton";
import { getBoardsByUserId } from "~/utils/queries";
import { revalidatePage } from "~/utils/serverActions";

const Page = async () => {
  // get boards by user id of current clerk user
  const { userId } = auth();
  if (!userId) redirect("/signin");
  if (userId) {
    revalidatePage("/boards");
  }
  const boards = await getBoardsByUserId(userId);
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-3xl font-bold">Your Boards</h1>
      <AddBoard userId={userId} />
      <div className="mt-4 grid w-full grid-cols-4 gap-4">
        {boards?.map(async (board) => {
          const { data: users } = await clerkClient().users.getUserList({
            userId: board.user_uids,
            limit: 100,
          });

          return <Board key={board.id} board={board} users={users} />;
        })}
      </div>
    </main>
  );
};

export default Page;

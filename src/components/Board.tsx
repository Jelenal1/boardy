import { User } from "@clerk/nextjs/server";
import { BOARD } from "~/utils/types";

const Board = ({ board, users }: { board: BOARD; users: User[] }) => {
  return (
    <a href={`/boards/${board.id}`}>
      <div className="h-72 w-96 rounded-md bg-gray-600 p-4 text-center">
        <h1>{board.title}</h1>
        <p>{board.user_uids.length} members</p>
        <div className="flex items-center">
          {users?.map((user) => (
            <div className="flex flex-col items-center">
              <img
                src={user.imageUrl}
                key={user.id}
                alt=""
                className="w-10 rounded-full"
              />
              <p>{user.username}</p>
            </div>
          ))}
        </div>
      </div>
    </a>
  );
};

export default Board;

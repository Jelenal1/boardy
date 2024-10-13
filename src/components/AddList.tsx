"use client";
import { FaPlus } from 'react-icons/fa6';
import { createList } from '~/utils/queries';
import { revalidate } from '~/utils/serverActions';
import { Button } from './ui/button';

const AddList = ({boardId, userIds}: {boardId: number, userIds: string[]}) => {
    const addList = async() => {
        await createList({
            boardId: boardId,
            user_uids: userIds,
            title: "",
        })
        revalidate('/board/[id]')
    };
    return (
    <div className="mx-2 flex max-h-full w-full max-w-80 flex-col gap-4 overflow-y-scroll rounded-md bg-gray-600 px-4 py-4">
        <Button className="mt-5" onClick={() => addList()}>
          <FaPlus size={20} />
        </Button>
      </div>
    );
}

export default AddList;

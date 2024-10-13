"use client";
import { FaPlus } from "react-icons/fa6";
import { Button } from "./ui/button";

const AddCard = ({ addCard }: { addCard: () => void }) => {
    "use client";
    return (
      <>
        <Button className="mt-5" onClick={() => addCard()}>
          <FaPlus size={20} />
        </Button>
      </>
    )
  }

export default AddCard
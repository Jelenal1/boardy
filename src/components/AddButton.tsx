import { FaPlus } from "react-icons/fa6";
import { Button } from "./ui/button";

const AddButton = ({
  className,
  buttonClassName,
  onClick,
}: {
  className: string;
  buttonClassName: string;
  onClick: () => void;
}) => {
  return (
    <div className={className}>
      <Button className={buttonClassName} onClick={onClick}>
        <FaPlus size={20} />
      </Button>
    </div>
  );
};

export default AddButton;

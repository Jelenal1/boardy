"use client";

import { useState } from "react";

const ReactiveHeader = ({
  className,
  emptyClassName,
  headerText,
  handleUpdate,
}: {
  className?: string;
  emptyClassName?: string;
  headerText: string;
  handleUpdate: (innerText: string) => void;
}) => {
  const [isEmpty, setIsEmpty] = useState(headerText === "");
  return (
    <div
      className={isEmpty ? emptyClassName : className}
      onInput={(e) => {
        handleUpdate(e.currentTarget.innerText);
        e.currentTarget.innerText === "" ? setIsEmpty(true) : setIsEmpty(false);
      }}
      contentEditable={true}
      suppressContentEditableWarning={true}
    >
      {headerText}
    </div>
  );
};

export default ReactiveHeader;

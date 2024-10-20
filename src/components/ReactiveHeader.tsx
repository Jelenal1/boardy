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
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  return (
    <div
      className={isEmpty ? emptyClassName : className}
      onInput={(e) => {
        const currentValue = e.currentTarget.innerText || "";
        currentValue === "" ? setIsEmpty(true) : setIsEmpty(false);

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        const id = setTimeout(() => {
          handleUpdate(currentValue);
        }, 1000);

        setTimeoutId(id);
      }}
      contentEditable={true}
      suppressContentEditableWarning={true}
    >
      {headerText}
    </div>
  );
};

export default ReactiveHeader;

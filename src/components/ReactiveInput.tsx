"use client";

import { useEffect, useRef, useState } from "react";

const ReactiveInput = ({
  headerText,
  handleUpdate,
  className,
  emptyClassName,
  label,
  icon,
  rows = 1,
}: {
  headerText: string;
  handleUpdate: (innerText: string) => void;
  className?: string;
  emptyClassName?: string;
  label?: string;
  icon?: React.ReactNode;
  rows?: number;
}) => {
  const notEmptyStyle =
    className ||
    "w-full whitespace-pre-line rounded-md p-1 text-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none";
  const emptyStyle =
    emptyClassName ||
    "w-full rounded-md p-1 text-xl outline outline-dashed text-black outline-1 focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-50 resize-none";

  const [isEmpty, setIsEmpty] = useState(headerText === "");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Aufräumen des Timeouts, wenn die Komponente unmontiert wird
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  useEffect(() => {
    inputRef.current?.style.setProperty("height", "auto");
    inputRef.current?.style.setProperty(
      "height",
      `${inputRef.current.scrollHeight}px`,
    );
  }, []);

  return (
    <>
      <label htmlFor={label} className="flex items-center gap-2">
        {label && icon}
        {label}
      </label>
      <textarea
        ref={inputRef}
        className={isEmpty ? emptyStyle : notEmptyStyle}
        onChange={(e) => {
          inputRef.current?.style.setProperty("height", "auto");
          inputRef.current?.style.setProperty(
            "height",
            `${e.currentTarget.scrollHeight}px`,
          );
          const currentValue = e.currentTarget.value || "";
          currentValue === "" ? setIsEmpty(true) : setIsEmpty(false);

          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          const id = setTimeout(() => {
            handleUpdate(currentValue);
          }, 1000);

          setTimeoutId(id);
        }}
        defaultValue={headerText}
        name={label}
        rows={rows}
        style={{ height: "auto" }}
      />
    </>
  );
};

export default ReactiveInput;

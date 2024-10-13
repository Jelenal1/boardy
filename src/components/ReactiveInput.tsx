"use client";

import { useState } from "react";

const ReactiveInput = ({
  headerText,
  handleUpdate,
  className,
  emptyClassName,
  label,
  icon,
  inputType,
}: {
  headerText: string;
  handleUpdate: (innerText: string) => void;
  className?: string;
  emptyClassName?: string;
  label?: string;
  icon?: React.ReactNode;
  inputType?: string;
}) => {
  const notEmptyStyle =
    className ||
    "w-full whitespace-pre-line rounded-md p-1 text-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500";
  const emptyStyle =
    emptyClassName ||
    "w-full rounded-md p-1 text-xl outline outline-dashed text-black outline-1 focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-50";

  const [isEmpty, setIsEmpty] = useState(headerText === "");

  if (inputType === "textarea") {
    return (
      <>
        <label htmlFor={label} className="flex items-center gap-2">
          {label && icon}
          {label}
        </label>
        <textarea
          className={isEmpty ? emptyStyle : notEmptyStyle}
          onChange={(e) => {
            handleUpdate(e.currentTarget.value);
            e.currentTarget.value === "" ? setIsEmpty(true) : setIsEmpty(false);
          }}
          defaultValue={headerText}
          name={label}
        />
      </>
    );
  }

  return (
    <>
      <label htmlFor={label} className="flex items-center gap-2">
        {label && icon}
        {label}
      </label>
      <input
        className={isEmpty ? emptyStyle : notEmptyStyle}
        onChange={(e) => {
          handleUpdate(e.currentTarget.value);
          e.currentTarget.value === "" ? setIsEmpty(true) : setIsEmpty(false);
        }}
        defaultValue={headerText}
        name={label}
        type={inputType || "text"}
      />
    </>
  );
};

export default ReactiveInput;

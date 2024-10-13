"use client";

const ReactiveHeader = ({
  className,
  headerText,
  handleUpdate,
}: {
  className: string;
  headerText: string;
  handleUpdate: (innerText: string) => void;
}) => {
  return (
    <div
      className={className}
      onInput={(e) => {
        handleUpdate(e.currentTarget.innerText);
      }}
      contentEditable={true}
      suppressContentEditableWarning={true}
    >
      {headerText}
    </div>
  );
};

export default ReactiveHeader;

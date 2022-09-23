import classNames from "classnames";
import React from "react";

function Button({
  text,
  borderColor,
  textColor,
}: {
  text: string;
  borderColor: string;
  textColor: string;
}) {
  const btnClass = classNames(
    "inline-block rounded-lg border bg-transparent px-6 py-2 font-bold transition duration-150 ease-in-out hover:border-transparent hover:text-white",
    `border-${borderColor}`,
    `text-${textColor}`,
    `hover:bg-${borderColor}`,
  );
  console.log(btnClass);

  return (
    <button type="button" className={btnClass}>
      {text}
    </button>
  );
}

export default Button;

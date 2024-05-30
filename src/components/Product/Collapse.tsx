import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { CollapseProps } from "./types";

function Collapse({ children, title, isOpen=false }: CollapseProps) {
  const [open, setOpen] = useState(isOpen);
  const arrowStyle = "h-5 stroke-[3px] text-dark-300";

  return (
    <div className="shadow-[0_0_20px_0_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden bg-light-100">
      <div
        className="flex items-center justify-between px-6 py-5 bg-white cursor-pointer rounded-2xl"
        onClick={() => setOpen((val) => !val)}
      >
        <span className="text-xl font-semibold text-dark-200">
          {title}
        </span>
        {open ? (
          <ChevronUpIcon className={arrowStyle} />
        ) : (
          <ChevronDownIcon className={arrowStyle} />
        )}
      </div>
      <div
        className={`px-6 py-5 transition duration-150 ease-out ${
          open ? "d-block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Collapse;

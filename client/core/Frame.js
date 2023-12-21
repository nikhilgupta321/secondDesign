import React from "react";

export default function Frame(props) {
  return (
    <div>
        <div className="border-b-4 title frame-title border-b-gray-500">{props.title}</div>
        <div className="p-2 text-xl font-medium text-gray-600 bg-white ">{props.children}</div>
    </div>
  );
}

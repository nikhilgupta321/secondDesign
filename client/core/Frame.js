import React from "react";

export default function Frame(props) {
  return (
    <div>
        <div className=" title frame-title">{props.title}</div>
        <div className="border-b-4 border-blue-600 border-x-4 ">{props.children}</div>
    </div>
  );
}

import React from "react";
import { decode } from "html-entities";

export default function EditorSlot(props) {
  const editorPicture = props.editor.picture || "avatar.png";
  return (
    <div className="flex border-t-2 border-blue-600">
      <div className="w-1/6 p-2 border-r-2 border-blue-600">
        <img src={`assets/editors/${editorPicture}`} />
      </div>
      <div className="w-5/6 p-2">
        <div>
          <b>{props.editor.name}</b>&nbsp;
          {/* {props.editor.degree !== "" && <>({props.editor.degree})</>} */}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: decode(props.editor.post) }}
        ></div>
        <div>{props.editor.content}</div>
        <div className="text-blue">
          {/* <b>Email: </b>
          {props.editor.email} */}
        </div>
        <div>
          {/* <b>Phone: </b>
          {props.editor.phone} */}
        </div>
      </div>
    </div>
  );
}

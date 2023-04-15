import React from "react";

const decodeStr = (str) => {
  let doc = new DOMParser().parseFromString(str, "text/html");
  return doc.documentElement.textContent
}

export default function EditorSlot(props) {
  return (
    <div className="flex  border-t-2 border-blue-600">
      <div className="p-2 w-1/6 border-r-2 border-blue-600">
      <img src={`assets/editors/${props.editor.picture}`} />
      </div>
      <div className="w-5/6 p-2">
        <div>
          <b>{props.editor.name}</b>&nbsp;
          {props.editor.degree !== '' && (<>( {props.editor.degree} )</>)}
        </div>
        <div dangerouslySetInnerHTML={{ __html: decodeStr(props.editor.post) }}></div>
        <div>{props.editor.content}</div>
        {/* <div><b>Email: </b>{props.editor.email}</div> */}
      </div>
    </div>
  );
}

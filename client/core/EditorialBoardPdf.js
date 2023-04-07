import React from "react";

const decodeStr = (str) => {
  let doc = new DOMParser().parseFromString(str, "text/html");
  return doc.documentElement.textContent
}

export default function EditorialBoardPdf(props) {

  const sliceLength = Math.ceil(props.editors.length / 3);
  const editorRow1 = props.editors.slice(0, sliceLength);
  const editorRow2 = props.editors.slice(sliceLength, sliceLength * 2);
  const editorRow3 = props.editors.slice(sliceLength * 2, sliceLength * 3);

  return (
    <div>
      <div id="editor-head-pdf">
        {props.settings.domain}<br />
        {props.settings.issn.split(",")[0]}<br />
        {props.settings.issn.split(",")[1]}<br />
      </div>
      <div className="text-3xl font-bold p-4 text-center text-green-600">
        {props.settings.websitename}
      </div>
      <div className="text-xl font-bold p-4 text-center text-blue-600">
        Editorial Board
      </div>
      <div className="text-sm grid m-t-8 gap-4 grid-cols-3">
        <div className="flex flex-col gap-6">
        {editorRow1.map((editor, index) => {
          return <div key={`editorrow1-${index + 1}`}>
            <div>
              <b>{editor.name}</b>&nbsp;
              {editor.degree !== '' && (<>( {editor.degree} )</>)}
            </div>
            <div>{editor.post}</div>
            <div dangerouslySetInnerHTML={{ __html: decodeStr(editor.content) }}></div>
          </div>
        })
        }
        </div>
        <div className="flex flex-col gap-6">
        {editorRow2.map((editor, index) => {
          return <div key={`editorrow2-${index + 1}`}>
            <div>
              <b>{editor.name}</b>&nbsp;
              {editor.degree !== '' && (<>( {editor.degree} )</>)}
            </div>
            <div>{editor.post}</div>
            <div dangerouslySetInnerHTML={{ __html: decodeStr(editor.content) }}></div>
          </div>
        })
        }
        </div>
        <div className="flex flex-col gap-6">
        {editorRow3.map((editor, index) => {
          return <div key={`editorrow3-${index + 1}`}>
            <div>
              <b>{editor.name}</b>&nbsp;
              {editor.degree !== '' && (<>( {editor.degree} )</>)}
            </div>
            <div>{editor.post}</div>
            <div dangerouslySetInnerHTML={{ __html: decodeStr(editor.content) }}></div>
          </div>
        })
        }
        </div>
      </div>
    </div>
  )
}
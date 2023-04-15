import React, { useState, useEffect, useContext } from "react";
import Frame from "./Frame";
import PageTitle from "./PageTitle";
import EditorSlot from "./EditorSlot";
import { listEditors } from "../helper/api-editors";
import { GlobalContext } from "../context/GlobalContext";

export default function EditorialBoard() {
  const { settings } = useContext(GlobalContext)
  const [chiefEditors, setChiefEditors] = useState([]);
  const [editors, setEditors] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listEditors(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else if (data) {
        setEditors(data.filter(editor => editor.status === "enabled" && editor.category.toLowerCase() === 'editors'));
        setChiefEditors(data.filter(editor => editor.status === "enabled" && editor.category.toLowerCase() === 'editor in chief'));
      }
    })

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    document.title = 'Editorial Board | ' + settings.websitename
  }, [settings])

  return (
    <div className="page">
      <PageTitle title="EDITORIAL BOARD" />

      {chiefEditors.length > 0 &&
        <Frame title="EDITOR IN CHIEF">
          {
            chiefEditors.map((editor, index) => {
              return (
                <EditorSlot key={`chiefeditor-${index + 1}`} editor={editor} />
              )
            })
          }
        </Frame>
      }

      {editors.length > 0 &&
        <Frame title="EDITORS">
          {
            editors.map((editor, index) => {
              return (
                <EditorSlot key={`editor-${index + 1}`} editor={editor} />
              )
            })
          }
        </Frame>
      }
    </div>
  );
}

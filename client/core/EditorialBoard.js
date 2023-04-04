import React, { useState, useEffect, useContext } from "react";
import Frame from "./Frame";
import PageTitle from "./PageTitle";
import EditorSlot from "./EditorSlot";
import { listEditors } from "../helper/api-editors";
import { GlobalContext } from "../context/GlobalContext";

export default function EditorialBoard() {
  const { settings } = useContext(GlobalContext)
  const [editors, setEditors] = useState([]);
  
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listEditors(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else if (data) {
        setEditors(data)
      }
    })

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    document.title = 'Editorial Board | ' + settings.journal_name
  }, [settings])

  return (
    <div className="page">
      <PageTitle title="EDITORIAL BOARD" />

      <Frame title="EDITOR IN CHIEF">
        {editors.map((editor) => {
          return (
            editor.category == 'Editor in chief' &&
            <EditorSlot editor={editor} />
          )
        }
        )}
      </Frame>

      <Frame title="EDITORS">
        {
          editors.map((editor) => {
            return (
              editor.category == 'Editors' &&
              <EditorSlot editor={editor} />
            )
          })}
      </Frame>
    </div>
  );
}

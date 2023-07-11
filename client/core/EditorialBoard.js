import React, { useState, useEffect, useContext } from "react";
import Frame from "./Frame";
import PageTitle from "./PageTitle";
import EditorSlot from "./EditorSlot";
import { listEditors } from "../helper/api-editors";
import { GlobalContext } from "../context/GlobalContext";

export default function EditorialBoard() {
  const { settings } = useContext(GlobalContext)
  const [chiefEditors, setChiefEditors] = useState([]);
  const [associateEditors, setAssociateEditors] = useState([]);
  const [assistantEditors, setAssistantEditors] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listEditors(signal).then((data) => {
      if (data && data.error) {
        console.error(data.error)
      } else if (data) {
        const editors = (data.filter(editor => editor.status === "enabled"))
        
        switch(settings.domain) {
          case 'www.botanyjournals.com':
            editors = editors.filter(editor => editor.picture !== 'avatar.png' && editor.email)
        }
        
        setAssistantEditors(editors.filter(editor => editor.category === 'assistant editor'));
        setAssociateEditors(editors.filter(editor => editor.category === 'associate editor'));
        setChiefEditors(editors.filter(editor => editor.category === 'chief editor'));
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
        <Frame title="Editor-in-Chief">
          {
            chiefEditors.map((editor, index) => {
              return (
                <EditorSlot key={`chiefeditor-${index + 1}`} editor={editor} />
              )
            })
          }
        </Frame>
      }

      {associateEditors.length > 0 &&
        <Frame title="Associate Editors">
          {
            associateEditors.map((editor, index) => {
              return (
                <EditorSlot key={`associateEditor-${index + 1}`} editor={editor} />
              )
            })
          }
        </Frame>
      }

      {assistantEditors.length > 0 &&
        <Frame title="Assistant Editors">
          {
            assistantEditors.map((editor, index) => {
              return (
                <EditorSlot key={`assistantEditor-${index + 1}`} editor={editor} />
              )
            })
          }
        </Frame>
      }
    </div>
  );
}

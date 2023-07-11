import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Flash from "../Flash";
import { listEditors } from "../../helper/api-editors";
import { getEditorsCertificate } from "../../helper/api-pdf";

const parseDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleString()
}


const saveEditorsCertificate = (selected) => {
  getEditorsCertificate(selected).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Editors-Certificate.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  })
}


const statusWithColor = (status) => {
  if (status == 'disabled')
    return <div className="text-red-600">disabled</div>
  else
    return <div className="text-green-600">enabled</div>
}

const Th = (props) => {
  return (<th className="border bg-slate-200 border-slate-400 p-2">{props.children}</th>)
}

const Td = (props) => {
  return (<td className="border bg-white border-slate-400 p-2">{props.children}</td>)
}

export default function Editors(props) {
  const [editors, setEditors] = useState([])
  const [selected, setSelected] = useState([])

  const handleSelect = (id) => {
    if(selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id))
    }
    else {
      setSelected([...selected, id])
    }
  }

  const handleSelectAll = () => {
    if(selected.length) {
      setSelected([])
    }
    else {
      setSelected(editors.map((editor) => editor.id))
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listEditors(signal).then((data) => {
      if (data && data.error) {
        console.error(data.error)
      } else if (data) {
        setEditors(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <div>
      <div className="float-right font-bold">Total Rows: {editors.length}</div>
      <div className="flex gap-6">
        <Link className="p-2 rounded w-24 bg-green-700 text-center text-slate-200" to={`/admin/editors/add`}>Add New</Link>
        { selected.length !== 0 && <button className="p-2 text-center rounded w-24 bg-green-700  text-slate-200" onClick={() => saveEditorsCertificate(selected)}>Certificate</button> }
      </div>
      {editors.length !== 0 &&
        <table className="mt-4 border-collapse border">
          <thead>
            <tr>
              <Th><input type="checkbox" checked={selected.length !== 0 && selected.length === editors.length} onChange={handleSelectAll}/></Th>
              <Th>S.NO.</Th>
              <Th>PICTURE</Th>
              <Th>CATEGORY</Th>
              <Th>EMAIL</Th>
              <Th>POST</Th>
              <Th>AFFILIATION</Th>
              <Th>STATUS</Th>
              <Th>CREADTED</Th>
              <Th>UPDATED</Th> 
              <Th>ACTION</Th>
            </tr>
          </thead>
          <tbody>
            {editors.map((editor, index) => {
              return (
                <tr key={`editor-${index + 1}`}>
                  <Td><input type="checkbox" checked={selected.includes(editor.id)} onChange={()=>{handleSelect(editor.id)}}/></Td>
                  <Td>{index + 1}</Td>
                  <Td>
                    <img
                      className="rounded-full h-12 w-12"
                      src={editor.picture ?
                        `/assets/editors/${editor.picture}` :
                        '/assets/editors/avatar.png'
                      }
                    />
                  </Td>
                  <Td>{editor.category}</Td>
                  <Td>{editor.email}</Td>
                  <Td>{editor.post}</Td>
                  <Td>{editor.content}</Td>
                  <Td>{statusWithColor(editor.status)}</Td>
                  <Td>{parseDate(editor.creation)}</Td>
                  <Td>{parseDate(editor.modification)}</Td>
                  <Td><Link className="text-green-700 font-bold" to={`/admin/editors/${editor.id}`}>EDIT</Link></Td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      }
    </div>
  )
}
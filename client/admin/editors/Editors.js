import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Flash from "../Flash";
import { listEditors } from "../../helper/api-editors";

const parseDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleString()
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
  const [values, setValues] = useState({
    editors: [],
    selected: [],
    selectAll: false,
    checked: false,
    error: '',
  })

  const hideMsg = () => {
    setValues({ ...values, error: '' })
  }

  const handleSelect = (index) => {
    let selected = values.selected;
    selected[index] = !selected[index]
    setValues({ ...values, selected: selected, checked: values.selected.includes(true), selectAll: false })
  }

  const handleSelectAll = () => {
    const change = !values.selectAll
    setValues({ ...values, selected: new Array(values.selected.length).fill(change), selectAll: change, selectAll: change })
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listEditors(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
        setValues({ ...values, error: data.error })
      } else if (data) {
        setValues({ editors: data, selected: new Array(data.length).fill(false), error: '' })
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <div>
      {values.error && <Flash type="error" msg={values.error} close={hideMsg} />}
      <div >
        <Link className="p-2 rounded w-24 bg-green-700 text-slate-200" to={`/admin/editors/add`}>Add New</Link>
        <div className="float-right font-bold">Total Rows: {values.editors.length}</div>
      </div>
      {values.editors.length !== 0 &&
        <table className="mt-4 border-collapse border">
          <thead>
            <tr>
              {/* <Th><input type="checkbox" checked={values.selectAll} onChange={handleSelectAll}/></Th> */}
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
            {values.editors.map((editor, index) => {
              return (
                <tr key={`editor-${index + 1}`}>
                  {/* <Td><input type="checkbox" checked={values.selected[index]} onChange={()=>{handleSelect(index)}}/></Td> */}
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
                  {/* <Td>{parseDate(editor.creation)}</Td> */}
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
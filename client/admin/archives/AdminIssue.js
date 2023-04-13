import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import auth from "../../helper/auth-helper"
import { listAdminIssue } from "../../helper/api-archives";

const parseDate = (date) => {
  const d = new Date(date)
  return d.toLocaleString()
}

const decodeStr = (str) => {
  let doc = new DOMParser().parseFromString(str, "text/html");
  return doc.documentElement.textContent
}

export default function AdminIssue(props) {
  const { year, vol, issue } = useParams();
  const [values, setValues] = useState({
    issues: [],
    selected: [],
    selectAll: false,
    checked: false,
    error: '',
  })

  const jwt = auth.isAuthenticated()

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

    listAdminIssue({ year, vol, issue }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
        setValues({ ...values, error: data.error })
      } else {
        setValues({ issues: data, selected: new Array(data.length).fill(false), error: '' })
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <div>
      <Link className="p-2 rounded w-24 bg-green-700 text-slate-200" to={`/admin/archives/add/${year}/${vol}/${issue}`}>Add New</Link>
      <table className="mt-4 w-full border-collapse border">
        <thead>
          <tr>
            {/* <Th><input type="checkbox" checked={values.selectAll} onChange={handleSelectAll}/></Th> */}
            <th className="bg-gray-200 text-sm border border-slate-400 p-2 w-16">S. NO.</th>
            <th className="bg-gray-200 text-sm border border-slate-400 p-2 w-32">REF. NUM.</th>
            <th className="bg-gray-200 text-sm border border-slate-400 p-2">TITLE</th>
            <th className="bg-gray-200 text-sm border border-slate-400 p-2">TRANSACTION ID</th>
            <th className="bg-gray-200 text-sm border border-slate-400 p-2">PAGES</th>
            <th className="bg-gray-200 text-sm border border-slate-400 p-2 w-48">Created At</th>
            <th className="bg-gray-200 text-sm border border-slate-400 p-2 w-48">Modified At</th>
            <th className="bg-gray-200 text-sm border border-slate-400 p-2">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {values.issues.map((article, index) => {
            return (
              <tr key={`article-${index + 1}`}>
                {/* <Td><input type="checkbox" checked={values.selected[index]} onChange={()=>{handleSelect(index)}}/></Td> */}
                <td className="bg-white border border-slate-400 p-2">{index + 1}</td>
                <td className="bg-white border border-slate-400 p-2">{article.refnumber}</td>
                <td className="bg-white border border-slate-400 p-2"><div dangerouslySetInnerHTML={{ __html: decodeStr(article.title) }}></div></td>
                <td className="bg-white border border-slate-400 p-2">{article.txnid}</td>
                <td className="bg-white border border-slate-400 p-2">{article.pagenumber}</td>
                <td className="bg-white border border-slate-400 p-2 w-48">{parseDate(article.creation)}</td>
                <td className="bg-white border border-slate-400 p-2 w-48">{parseDate(article.modification)}</td>
                <td className="bg-white border border-slate-400 p-2"><Link className="text-green-700 font-bold" to={`/admin/archives/${article.id}`}>EDIT</Link></td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  )
}
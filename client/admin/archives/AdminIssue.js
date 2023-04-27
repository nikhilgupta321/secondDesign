import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import auth from "../../helper/auth-helper"
import { listAdminIssue } from "../../helper/api-archives";
import { decode } from "html-entities";
import { getIndexPage } from "../../helper/api-pdf";
import { getbulkCertificates } from "../../helper/api-pdf";

const parseDate = (date) => {
  const d = new Date(date)
  return d.toLocaleString()
}

const saveIndexPage = (selected) => {
  getIndexPage(selected).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Index-Page.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  })
}

const saveBulkCertificates = (selected) => {
  getbulkCertificates(selected).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Certificates.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  })
}


export default function AdminIssue(props) {
  const { year, vol, issue } = useParams();
  const [issues , setIssues] = useState([])
  const [selected, setSelected] = useState([])
  
  const jwt = auth.isAuthenticated()

  const handleSelect = (refnumber) => {
    if(selected.includes(refnumber)) {
      setSelected(selected.filter((item) => item !== refnumber))
    }
    else {
      setSelected([...selected, refnumber])
    }
  }

  const handleSelectAll = () => {
    if(selected.length) {
      setSelected([])
    }
    else {
      setSelected(issues.map((issue) => issue.refnumber))
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listAdminIssue({ year, vol, issue }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        data.sort((a, b) => parseInt(a.pagenumber) - parseInt(b.pagenumber));
        setIssues(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <div>
      <div className="flex gap-6">
      <Link className="p-2 text-center rounded w-24 bg-green-700 text-slate-200" to={`/admin/archives/add/${year}/${vol}/${issue}`}>Add New</Link>
      { selected.length !== 0 && 
        <>
          <button className="p-2 text-center rounded w-24 bg-green-700  text-slate-200" onClick={() => saveIndexPage(selected)}>Index Page</button>
          <button className="p-2 text-center rounded w-24 bg-green-700  text-slate-200" onClick={() => saveBulkCertificates(selected)}>Certificate</button>
        </>
      }
      </div>
      <table className="mt-4 w-full border-collapse border">
        <thead>
          <tr>
            <th className="bg-gray-200 text-sm border border-slate-400 p-2"><input type="checkbox" checked={selected.length !== 0 && selected.length === issues.length} onChange={handleSelectAll}/></th>
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
          {issues.map((article, index) => {
            return (
              <tr key={`article-${index + 1}`}>
                <td className="bg-white border border-slate-400 p-2 text-center"><input type="checkbox" checked={selected.includes(article.refnumber)} onChange={()=>{handleSelect(article.refnumber)}}/></td>
                <td className="bg-white border border-slate-400 p-2">{index + 1}</td>
                <td className="bg-white border border-slate-400 p-2">{article.refnumber}</td>
                <td className="bg-white border border-slate-400 p-2"><div dangerouslySetInnerHTML={{ __html: decode(article.title) }}></div></td>
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
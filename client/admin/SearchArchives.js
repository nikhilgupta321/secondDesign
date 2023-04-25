import React, { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom";
import auth from "../helper/auth-helper"
import { searchArchives } from "../helper/api-archives";
import { decode } from "html-entities";

const parseDate = (date) => {
  const d = new Date(date)
  return d.toLocaleString()
}

export default function SearchArchives(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [articles, setArticles] = useState([])
  const [notFound, setNotFound] = useState(false)
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    searchArchives(query, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        if (data.length == 0)
          setNotFound(true)
        else 
          setNotFound(false)
        
        setArticles(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [query])

  return (
    <div>
      {notFound && <div className="text-xl">Not Found!</div>}
      {articles.length !== 0 &&
        <table className="mt-4 border-collapse border">
          <thead>
            <tr>
              <th className="bg-gray-300 text-sm border border-slate-400 p-2 w-16">S. NO.</th>
              <th className="bg-gray-300 text-sm border border-slate-400 p-2 w-32">REF. NUM.</th>
              <th className="bg-gray-300 text-sm border border-slate-400 p-2">TITLE</th>
              <th className="bg-gray-300 text-sm border border-slate-400 p-2">TRANSACTION ID</th>
              <th className="bg-gray-300 text-sm border border-slate-400 p-2">PAGES</th>
              <th className="bg-gray-300 text-sm border border-slate-400 p-2 w-48">Created At</th>
              <th className="bg-gray-300 text-sm border border-slate-400 p-2 w-48">Modified At</th>
              <th className="bg-gray-300 text-sm border border-slate-400 p-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => {
              return (
                <tr key={`article-${index + 1}`}>
                  {/* <Td><input type="checkbox" checked={values.selected[index]} onChange={()=>{handleSelect(index)}}/></Td> */}
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
      }
    </div>
  )
}
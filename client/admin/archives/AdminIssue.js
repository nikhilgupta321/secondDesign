import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import auth from "../../helper/auth-helper";
import { listAdminIssue } from "../../helper/api-archives";
import { decode } from "html-entities";
import { getIndexPage } from "../../helper/api-pdf";
import { getbulkCertificates } from "../../helper/api-pdf";
import sanitizeHtml from "sanitize-html";

const cleanHtml = (data) => {
  let cleanData = sanitizeHtml(data, {
    allowedTags: ["i", "em"],
    allowedAttributes: {},
  });
  return cleanData.replace(/\s+/g, " ");
};

const parseDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString();
};

const saveIndexPage = (selected) => {
  getIndexPage(selected).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Index-Page.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  });
};

const saveBulkCertificates = (selected) => {
  getbulkCertificates(selected).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Certificates.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  });
};

export default function AdminIssue(props) {
  const { year, vol, issue } = useParams();
  const [issues, setIssues] = useState([]);
  const [selected, setSelected] = useState([]);

  const jwt = auth.isAuthenticated();

  const handleSelect = (refnumber) => {
    if (selected.includes(refnumber)) {
      setSelected(selected.filter((item) => item !== refnumber));
    } else {
      setSelected([...selected, refnumber]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length) {
      setSelected([]);
    } else {
      setSelected(issues.map((issue) => issue.refnumber));
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listAdminIssue({ year, vol, issue }, signal).then((data) => {
      if (data && data.error) {
        console.error(data.error);
      } else {
        data.sort((a, b) => parseInt(a.pagenumber) - parseInt(b.pagenumber));
        setIssues(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <div className="flex gap-6">
        <Link
          className="w-24 p-2 text-center bg-green-700 rounded text-slate-200"
          to={`/admin/archives/add/${year}/${vol}/${issue}`}
        >
          Add New
        </Link>
        {selected.length !== 0 && (
          <>
            <button
              className="w-24 p-2 text-center bg-green-700 rounded text-slate-200"
              onClick={() => saveIndexPage(selected)}
            >
              Index Page
            </button>
            <button
              className="w-24 p-2 text-center bg-green-700 rounded text-slate-200"
              onClick={() => saveBulkCertificates(selected)}
            >
              Certificate
            </button>
          </>
        )}
      </div>
      <table className="w-full mt-4 border border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-sm bg-gray-200 border border-slate-400">
              <input
                type="checkbox"
                checked={
                  selected.length !== 0 && selected.length === issues.length
                }
                onChange={handleSelectAll}
              />
            </th>
            <th className="w-16 p-2 text-sm bg-gray-200 border border-slate-400">
              S. NO.
            </th>
            <th className="w-32 p-2 text-sm bg-gray-200 border border-slate-400">
              REF. NUM.
            </th>
            <th className="p-2 text-sm bg-gray-200 border border-slate-400">
              TITLE
            </th>
            <th className="p-2 text-sm bg-gray-200 border border-slate-400">
              TRANSACTION ID
            </th>
            <th className="p-2 text-sm bg-gray-200 border border-slate-400">
              PAGES
            </th>
            <th className="w-48 p-2 text-sm bg-gray-200 border border-slate-400">
              Created At
            </th>
            <th className="w-48 p-2 text-sm bg-gray-200 border border-slate-400">
              Modified At
            </th>
            <th className="p-2 text-sm bg-gray-200 border border-slate-400">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {issues.map((article, index) => {
            return (
              <tr key={`article-${index + 1}`}>
                <td className="p-2 text-center bg-white border border-slate-400">
                  <input
                    type="checkbox"
                    checked={selected.includes(article.refnumber)}
                    onChange={() => {
                      handleSelect(article.refnumber);
                    }}
                  />
                </td>
                <td className="p-2 bg-white border border-slate-400">
                  {index + 1}
                </td>
                <td className="p-2 bg-white border border-slate-400">
                  {article.refnumber}
                </td>
                <td className="p-2 bg-white border border-slate-400">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: cleanHtml(decode(article.title)),
                    }}
                  ></div>
                </td>
                <td className="p-2 bg-white border border-slate-400">
                  {article.txnid}
                </td>
                <td className="p-2 bg-white border border-slate-400">
                  {article.pagenumber}
                </td>
                <td className="w-48 p-2 bg-white border border-slate-400">
                  {parseDate(article.creation)}
                </td>
                <td className="w-48 p-2 bg-white border border-slate-400">
                  {parseDate(article.modification)}
                </td>
                <td className="p-2 bg-white border border-slate-400">
                  <Link
                    className="font-bold text-green-700"
                    to={`/admin/archives/${article.id}`}
                  >
                    EDIT
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

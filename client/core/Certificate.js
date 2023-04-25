import React, { useState, useEffect, useContext } from "react";
import PageTitle from "./PageTitle";
import { useSearchParams, Link } from "react-router-dom";
import { archivesByRef } from "../helper/api-archives";
import { GlobalContext } from "../context/GlobalContext";
import { getCertificate } from "../helper/api-pdf";
import { getCoverpage } from "../helper/api-pdf";
import { getEditorialBoard } from "../helper/api-pdf";

const saveCertificate = (refnumber, author) => {
  getCertificate(refnumber, author).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `certificate-${refnumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  })
}

const saveCoverpage = (refnumber) => {
  getCoverpage(refnumber).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coverpage-${refnumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  })
}

const saveEditorialBoard = (refnumber) => {
  getEditorialBoard().then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Editorial-Board.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  })
}
  export default function Certificate(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = searchParams.get('refno');
  const { settings } = useContext(GlobalContext)

  const [article, setArticle] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    archivesByRef(ref, signal)
      .then((data) => {
        if (data && data.error) {
          setError(true)
        } else if (data) {
          setArticle(data)
        }
      })
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className="page">
      <PageTitle title="DOWNLOAD PUBLICATION CERTIFICATE" />
      {Object.keys(article).length !== 0 && <>
        <h3>Download your Artcle, Certificate, Cover Page, Editorial Board</h3>
        <div id="im"></div>
        <table id="certificate">
          <tbody>
            {article.file && <tr>
              <td>Download Artcle</td>
              <td><a href={`/assets/archives/${article.year}/vol${article.volume}issue${article.issue}/${article.file}`} download={`article-${article.refnumber}.pdf`}><div className="certificate-button" >Download</div></a></td>
            </tr>}

            {article.authorname.split(',').map((author, index) => {
              return <tr key={`author-${index + 1}`}>
                <td>Download Certificate</td>
                <td><div className="certificate-button" onClick={() => { saveCertificate(ref, author) }}>{author}</div></td>
              </tr>
            })}

            <tr>
              <td>Download Cover Page</td>
              <td><div className="certificate-button" onClick={() => { saveCoverpage(ref) }}>Download</div></td>
            </tr>
            <tr>
              <td>Download Editorial Board</td>
              <td><div className="certificate-button" onClick={() => { saveEditorialBoard() }}>Download</div></td>
            </tr>
          </tbody>
        </table>
      </>}
    </div>
  )
}
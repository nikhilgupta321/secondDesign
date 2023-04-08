import React, { useState, useEffect, useContext } from "react";
import PageTitle from "./PageTitle";
import { useSearchParams, Link } from "react-router-dom";
import { jsPDF } from 'jspdf';
import { renderToString } from 'react-dom/server'
import CertificatePdf from "./CertificatePdf";
import CoverpagePdf from "./CoverpagePdf";
import EditorialBoardPdf from "./EditorialBoardPdf";
import { archivesByRef } from "../helper/api-archives";
import { GlobalContext } from "../context/GlobalContext";

const generateCertificate = (article, author, settings) => {
  var doc = new jsPDF();

  var elementHTML = renderToString(<CertificatePdf author={author} article={article} settings={settings} />)

  doc.html(elementHTML, {
    callback: function (doc) {
      doc.save(`certificate-${article.refnumber}.pdf`);
    },
    width: 210, //target width in the PDF document
    windowWidth: 750 //window width in CSS pixels
  });
}

const generateCoverpage = (article, settings) => {

  var doc = new jsPDF({ orientation: "landscape", format: "a3" });
  var elementHTML = renderToString(<CoverpagePdf article={article} settings={settings} />)

  doc.html(elementHTML, {
    callback: function (doc) {
      doc.save(`coverpage.pdf`);
    },
    width: 420, //target width in the PDF document
    windowWidth: 1500 //window width in CSS pixels
  });
}

const getEditors = async () => {
  try {
    let response = await fetch("/api/editors/", {
      method: "GET",
    });
    const result = await response.json();
    if (result && result.error) {
      console.log(result.error);
    } else {
      return result
    }
  } catch (err) {
    console.log(err);
  }
};

const generateEditorialBoard = (settings) => {
  getEditors().then(editors => {
    var doc = new jsPDF({ margin: [40, 60, 40, 60] });
    var elementHTML = renderToString(<EditorialBoardPdf editors={editors} settings={settings} />)

    doc.html(elementHTML, {
      callback: function (doc) {
        doc.save(`Editorial-Board.pdf`);
      },
      width: 180, //target width in the PDF document
      windowWidth: 750, //window width in CSS pixels
      margin: [15, 15, 15, 15]
    },
    );
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

    archivesByRef(ref, signal).then((data) => {
      if(data && !data.error && data.status === "enabled") {
        setArticle(data)
      }
      else {
        setError(true)
      }
    })
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className="page">
      <PageTitle title="DOWNLOAD PUBLICATION CERTIFICATE" />
      {error && <h3>Certificate not found!</h3>}
      {Object.keys(article).length !== 0 && <>
        <h3>Download your Artcle, Certificate, Cover Page, Editorial Board</h3>
        <table id="certificate">
          <tbody>
            {article.file && <tr>
              <td>Download Artcle</td>
              <td><a className="certificate-button" href={`/assets/archives/${article.year}/vol${article.volume}issue${article.issue}/${article.file}`} download={`article-${article.refnumber}.pdf`}>Download</a></td>
            </tr>}

            {article.authorname.split(',').map((author, index) => {
              return <tr key={`author-${index + 1}`}>
                <td>Download Certificate</td>
                <td><div className="certificate-button" onClick={() => { generateCertificate(article, author, settings) }}>{author}</div></td>
              </tr>
            })}

            <tr>
              <td>Download Cover Page</td>
              <td><a className="certificate-button" onClick={() => { generateCoverpage(article, settings) }}>Download</a></td>
            </tr>
            <tr>
              <td>Download Editorial Board</td>
              <td><a className="certificate-button" onClick={() => { generateEditorialBoard(settings) }}>Download</a></td>
            </tr>
          </tbody>
        </table>
      </>}
    </div>
  )
}
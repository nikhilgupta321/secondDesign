import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import auth from "../../helper/auth-helper";
import { updateArticle, archivesById } from "../../helper/api-archives";
import { GlobalContext } from "../../context/GlobalContext";
import { decode, encode } from "html-entities";

export default function AddArticle(props) {
  const { flash, setFlash, settings } = useContext(GlobalContext);
  const { id } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [article, setArticle] = useState({
    year: "",
    volume: "",
    issue: "",
    txnid: "",
    ptype: "paid",
    publishdate: new Date().toISOString().slice(0, 10),
    authorname: "",
    pagenumber: "",
    subject: "",
    country: "",
    refnumber: "",
    email: "",
    mobile: "",
    title: "",
    description: "",
    keywords: "",
    abstract: "",
  });

  const [pdffile, setPdfFile] = useState();

  const jwt = auth.isAuthenticated();

  const handleChange = (name) => (event) => {
    setArticle({ ...article, [name]: event.target.value });
  };

  const handleChangeFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size < maxSize) {
        setPdfFile(file);
      } else {
        alert("File size exceeds the limit of 5 MB.");
        setPdfFile(null);
      }
    }
  };

  const handleChangeInput = (name) => (event) => {
    setArticle({ ...article, [name]: event.target.innerHTML });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);

    let data = article;
    if (
      !data.txnid ||
      !pdffile ||
      !data.ptype ||
      !data.publishdate ||
      !data.authorname ||
      !data.pagenumber ||
      !data.refnumber ||
      !document.getElementById("rich-title").textContent ||
      !document.getElementById("rich-abstract").textContent
    ) {
      return;
    }

    data = {
      ...data,
      title: encode(document.getElementById("rich-title").innerHTML),
      abstract: encode(document.getElementById("rich-abstract").innerHTML),
      modifiedby: jwt.user,
      modification: new Date(),
    };

    updateArticle(
      {
        id: id,
        data: data,
        file: pdffile,
      },
      { token: jwt.token }
    ).then((data) => {
      if (data && data.error) {
        if (data.error == "duplicate_reference_number")
          setFlash({ error: true, msg: "Duplicate reference number" });
        else if (data.error == "duplicate_title")
          setFlash({ error: true, msg: "Duplicate title" });
        else if (data.error == "invalid_txnid")
          setFlash({ error: true, msg: "Invalid transaction id" });
        else if (data.error == "invalid_pagenumber")
          setFlash({ error: true, msg: "Invalid page number" });
        else setFlash({ error: true, msg: "Something went wrong" });
      } else {
        setFlash({
          normal: true,
          msg: (
            <div className="flex flex-col">
              <div>
                <b>Dear Author,</b>
              </div>
              <br />
              <div>
                <div>
                  <b>
                    1. We have updated your article. Kindly check the given
                    link.
                  </b>
                </div>
                <div className="flex gap-1 text-blue-700">
                  <div>Link:</div>
                  <Link
                    to={`/pdf?refno=${article.refnumber}`}
                  >{`https://${settings.domain}/pdf?refno=${article.refnumber}`}</Link>
                </div>
              </div>
            </div>
          ),
        });
      }
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    archivesById(id, signal).then((data) => {
      if (data && data.error) {
        console.error(data.error);
      } else {
        setArticle({
          id: data.id,
          txnid: data.txnid || article.txnid,
          ptype: data.ptype || article.ptype,
          publishdate: data.publishdate || article.publishdate,
          authorname: data.authorname || article.authorname,
          pagenumber: data.pagenumber || article.pagenumber,
          subject: data.subject || article.subject,
          country: data.country || article.country,
          refnumber: data.refnumber || article.refnumber,
          email: data.email || article.email,
          mobile: data.mobile || article.mobile,
          title: data.title || article.title,
          description: data.description || article.description,
          keywords: data.keywords || article.keywords,
          abstract: data.abstract || article.abstract,
          year: data.year,
          volume: data.volume,
          issue: data.issue,
        });
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <div className="flex gap-4">
        <Link
          to={`/admin/archives/${article.year}/${article.volume}/${article.issue}`}
          className="w-16 p-2 mb-4 text-center text-gray-500 bg-gray-200 rounded"
        >
          <i className="fa fa-arrow-left" aria-hidden="true" />
        </Link>
        <button
          onClick={handleSubmit}
          className="w-24 p-2 mb-4 text-gray-100 rounded bg-sky-600"
        >
          Submit
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div>
          <div>TRANSACTION ID *</div>
          <input
            onChange={handleChange("txnid")}
            value={article.txnid}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && !article.txnid ? "border-b-red-500" : ""
              }`}
            type="text"
          />
        </div>
        <div>
          <div>PAYMENT TYPE</div>
          <select
            onChange={handleChange("ptype")}
            value={article.ptype}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && !article.ptype ? "border-b-red-500" : ""
              }`}
          >
            <option value="paid">Paid</option>
            <option value="free">Free</option>
          </select>
        </div>
        <div>
          <div>CERTIFICATE DATE</div>
          <input
            onChange={handleChange("publishdate")}
            value={article.publishdate}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && !article.publishdate ? "border-b-red-500" : ""
              }`}
            type="date"
          />
        </div>
        <div className="col-span-2 row-span-2">
          <div>AUTHOR NAME *</div>
          <textarea
            onChange={handleChange("authorname")}
            value={article.authorname}
            className={`h-32 resize-none w-full p-2 focus:outline-emerald-600 border-2 border-gray-300 rounded ${isSubmitted && !article.authorname ? "border-b-red-500" : ""
              }`}
          />
        </div>
        <div>
          <div>PAGE NUMBER *</div>
          <input
            onChange={handleChange("pagenumber")}
            value={article.pagenumber}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && !article.pagenumber ? "border-b-red-500" : ""
              }`}
            type="text"
          />
        </div>
        <div>
          <div>SUBJECT</div>
          <input
            onChange={handleChange("subject")}
            value={article.subject}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600`}
            type="text"
          />
        </div>
        <div>
          <div>COUNTRY</div>
          <input
            onChange={handleChange("country")}
            value={article.country}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600`}
            type="text"
          />
        </div>

        <div>
          <div>REFERENCE NUMBER *</div>
          <input
            onChange={handleChange("refnumber")}
            value={article.refnumber}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && article.refnumber === "" ? "border-b-red-500" : ""
              }`}
            type="text"
          />
        </div>
        <div>
          <div>EMAIL</div>
          <input
            onChange={handleChange("email")}
            value={article.email}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600`}
            type="text"
          />
        </div>
        <div>
          <div>PHONE</div>
          <input
            onChange={handleChange("mobile")}
            value={article.mobile}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600`}
            type="text"
          />
        </div>
        <div className="col-span-2 row-span-2">
          <div>TITLE *</div>
          <div
            id="rich-title"
            contentEditable={true}
            className={`h-32 overflow-scroll bg-white w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && !document.getElementById("rich-title").textContent
                ? "border-b-red-500"
                : ""
              }`}
            dangerouslySetInnerHTML={{ __html: decode(article.title) }}
          ></div>
        </div>
        <div className="col-span-3">
          <div>DESCRIPTION</div>
          <input
            onChange={handleChange("description")}
            value={article.description}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600`}
            type="text"
          />
        </div>
        <div className="col-span-3">
          <div>KEYWORDS</div>
          <input
            onChange={handleChange("keywords")}
            value={article.keywords}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600`}
            type="text"
          />
        </div>
        <div className="col-span-2 row-span-3">
          <div>ABSTRACT *</div>
          <div
            id="rich-abstract"
            contentEditable={true}
            className={`h-32 overflow-scroll w-full bg-white border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted &&
                !document.getElementById("rich-abstract").textContent
                ? "border-b-red-500"
                : ""
              }`}
            dangerouslySetInnerHTML={{ __html: decode(article.abstract) }}
          ></div>
        </div>
        <div className={`col-span-3`}>
          <div>UPLOAD *</div>
          <input
            onChange={handleChangeFile}
            type="file"
            accept="application/pdf"
            className={`w-full ${isSubmitted && !pdffile ? "border-b-red-500" : ""
              } bg-white border-2 border-gray-300 rounded p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-emerald-600 file:text-gray-100`}
          />
        </div>
      </div>
    </div>
  );
}

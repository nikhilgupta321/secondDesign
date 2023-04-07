import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import auth from "../../helper/auth-helper"
import { addArticle } from "../../helper/api-archives";
import { GlobalContext } from "../../context/GlobalContext";

export default function AdminArticle(props) {
  const { flash, setFlash, settings } = useContext(GlobalContext)
  const { year, vol, issue } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  
  const [article, setArticle] = useState({
    txnid: '',
    ptype: 'paid',
    publishdate: new Date().toISOString().slice(0, 10),
    authorname: '',
    pagenumber: '',
    subject: '',
    country: '',
    refnumber: '',
    email: '',
    mobile: '',
    title: '',
    description: '',
    keywords: '',
    abstract: '',
  })

  const [pdffile, setPdfFile] = useState()

  const jwt = auth.isAuthenticated()

  const handleChange = name => event => {
    setArticle({ ...article, [name]: event.target.value })
  }

  const handleChangeFile = (event) => {
    setPdfFile(event.target.files[0])
  }

  const handleSubmit = () => {
    
    console.log(article.publishdate)

    console.log('hello')
    setIsSubmitted(true)

    if (
      !article.txnid ||
      !article.ptype ||
      !article.publishdate ||
      !article.authorname ||
      !article.pagenumber ||
      !article.refnumber ||
      !article.email ||
      !article.title ||
      !article.abstract ||
      !pdffile
    ) {
      return;
    }
    
    let articleData = article
    articleData = {
      ...articleData,
      year: year,
      volume: vol,
      issue: issue,
      file: `${articleData.refnumber}.pdf`,
      status: 'enabled',
      modifiedby: jwt.user,
      modification: new Date(),
      createdby: jwt.user,
      creation: new Date(),
    }


    addArticle(articleData, pdffile, { token: jwt.token }).then((data) => {
      if (data && data.error) {
        setFlash({ error: true, msg: 'Something went wrong' })
      }
      else {
        setFlash({
          normal: true,
          msg: <div className="flex flex-col">
            <div><b>Dear Author,</b></div>
            <br/>
            <div>
              <div><b>1. Your article has been published, kindly download pdf, certificate and coverpage from the given link.</b></div>
              <div className="flex gap-1">
                <div>Link:&nbsp;</div>
                <Link to={`/pdf?refno=${article.refnumber}`}>{`https://${settings.domain}/pdf?refno=${article.refnumber}`}</Link>
              </div>
            </div>
            <br/>
            <div>
              <div><b>2. Also add your article in Google Scholar for citation</b></div>
              <div className="flex gap-1">
                <div>Link:&nbsp;</div>
                <Link to='https://scholar.google.com'>https://scholar.google.com</Link>
              </div>
            </div>
            <br/>
            <div>
              <div>3. Watch video on how to create Google Scholar profile</div>
              <div className="flex gap-1">
                <div>Link:&nbsp;</div>
                <Link to='https://www.youtube.com/watch?v=6JZ6TQoWc58'>https://www.youtube.com/watch?v=6JZ6TQoWc58</Link>
              </div>
            </div>
            <br/>
            <div>
              <div>4. Watch video on how to upload published article in Google Scholar</div>
              <div className="flex gap-1">
                <div>Link:&nbsp;</div>
                <Link to='https://www.youtube.com/watch?v=VMjncGlNn0w'>https://www.youtube.com/watch?v=VMjncGlNn0w</Link>
              </div>
            </div>
          </div>
        })
        setIsCreated(true)
      }
    })
  }

  return (
    <div>
      <div className="flex gap-4">
        <Link to={`/admin/archives/${year}/${vol}/${issue}`} className="p-2 mb-4 text-center rounded w-16 bg-gray-200 text-gray-500"><i className="fa fa-arrow-left" aria-hidden="true" /></Link>
        {!isCreated && <button onClick={handleSubmit} className="p-2 mb-4 rounded w-24 bg-sky-600 text-gray-100">Submit</button>}
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div>
          <div>TRANSACTION ID *</div>
          <input
            onChange={handleChange('txnid')}
            value={article.txnid}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && !article.txnid ? 'border-b-red-500' : ''}`}
            type="text"
          />
        </div>
        <div>
          <div>PAYMENT TYPE</div>
          <select
            onChange={handleChange('ptype')}
            value={article.ptype}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && !article.ptype ? 'border-b-red-500' : ''}`}
          >
            <option value="paid">Paid</option>
            <option value="free">Free</option>
          </select>
        </div>
        <div>
          <div>CERTIFICATE DATE</div>
          <input
            onChange={handleChange('publishdate')}
            value={article.publishdate}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && !article.publishdate ? 'border-b-red-500' : ''}`}
            type="date"
          />
        </div>
        <div className="col-span-2 row-span-2">
          <div>AUTHOR NAME *</div>
          <textarea
            onChange={handleChange('authorname')}
            value={article.authorname}
            className={`h-32 resize-none w-full p-2 focus:outline-emerald-600 border-2 border-gray-300 rounded ${isSubmitted && !article.authorname ? 'border-b-red-500' : ''}`}
          />
        </div>
        <div>
          <div>PAGE NUMBER *</div>
          <input
            onChange={handleChange('pagenumber')}
            value={article.pagenumber}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && !article.pagenumber ? 'border-b-red-500' : ''}`}
            type="text"
          />
        </div>
        <div>
          <div>SUBJECT</div>
          <input
            onChange={handleChange('subject')}
            value={article.subject}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600`}
            type="text"
          />
        </div>
        <div>
          <div>COUNTRY</div>
          <input
            onChange={handleChange('country')}
            value={article.country}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600`}
            type="text"
          />
        </div>

        <div>
          <div>REFERENCE NUMBER *</div>
          <input
            onChange={handleChange('refnumber')}
            value={article.refnumber}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && article.refnumber === '' ? 'border-b-red-500' : ''}`}
            type="text"
          />
        </div>
        <div>
          <div>EMAIL *</div>
          <input
            onChange={handleChange('email')}
            value={article.email}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && article.email === '' ? 'border-b-red-500' : ''}`}
            type="text"
          />
        </div>
        <div>
          <div>PHONE</div>
          <input
            onChange={handleChange('mobile')}
            value={article.mobile}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600`}
            type="text"
          />
        </div>
        <div className="row-span-2 col-span-2">
          <div>TITLE *</div>
          <textarea
            onChange={handleChange('title')}
            value={article.title}
            className={`h-32 resize-none w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && article.title === '' ? 'border-b-red-500' : ''}`}
          ></textarea>
        </div>
        <div className="col-span-3">
          <div>DESCRIPTION</div>
          <input
            onChange={handleChange('description')}
            value={article.description}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600`}
            type="text"
          />
        </div>
        <div className="col-span-3">
          <div>KEYWORDS</div>
          <input
            onChange={handleChange('keywords')}
            value={article.keywords}
            className={`w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600`}
            type="text"
          />
        </div>
        <div className="row-span-3 col-span-2">
          <div>ABSTRACT *</div>
          <textarea
            onChange={handleChange('abstract')}
            value={article.abstract}
            className={`h-32 resize-none w-full border-2 border-gray-300 rounded p-2 focus:outline-emerald-600 ${isSubmitted && article.abstract === '' ? 'border-b-red-500' : ''}`}
          ></textarea>
        </div>
        <div className={`col-span-3`}>
          <div>UPLOAD *</div>
          <input
            onChange={handleChangeFile}
            type="file"
            accept="application/pdf"
            className={`w-full bg-white border-2 border-gray-300 rounded ${isSubmitted && !pdffile ? 'border-b-red-500' : ''} p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-emerald-600 file:text-gray-100`}
          />
        </div>
      </div>
    </div>
  )
}

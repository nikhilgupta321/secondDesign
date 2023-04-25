import React, { useState, useEffect, useContext } from "react";
import PageTitle from "./PageTitle";
import { useParams, Link } from "react-router-dom";
import { archivesByRef } from "../helper/api-archives";
import { GlobalContext } from "../context/GlobalContext";
import { decode } from 'html-entities';

export default function Article(props) {
  const {ref} = useParams();
  const { settings } = useContext(GlobalContext)

  const [article, setArticle] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    archivesByRef( ref, signal).then((data) => {
      if(data && !data.error && data.status === "enabled") {
        setArticle(data)
        setError(false)
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
      {error && <h3>Article not found!</h3>}
      {Object.keys(article).length !== 0 && <>
        <PageTitle title={`VOL. ${article.volume}, ISSUE ${article.issue} (${article.year})`} />
        <div className="article-title" dangerouslySetInnerHTML={{ __html: decode(article.title) }}></div>
        <div>
          <div className="text-blue"><b>Authors</b></div>
          <div id="author-name">{article.authorname}</div>
        </div>
        <div>
          <div className="text-blue"><b>Abstract</b></div>
          <div dangerouslySetInnerHTML={{ __html: decode(article.abstract) }}></div>
        </div>
        <div className="flex-row">
          {article.file && <a href={`/assets/archives/${article.year}/vol${article.volume}issue${article.issue}/${article.file}`} download={`article-${article.refnumber}.pdf`}><b>Download</b>&nbsp;|&nbsp;</a>}
          <div className="text-blue"><b>Pages : </b>{article.pagenumber}</div>
        </div>
        <div>
          <div className="text-blue"><b>How to cite this article:</b></div>
          <div>{article.authroname} <b className="article-cite" dangerouslySetInnerHTML={{ __html: decode(article.title) }}></b>. {settings.websitename}, Volume {article.volume}, Issue {article.issue}, {article.year}, Pages {article.pagenumber}</div>
        </div>
      </>
      }
    </div>
  );
}

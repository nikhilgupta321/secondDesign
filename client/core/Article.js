import React, { useState, useEffect } from "react";
import PageTitle from "./PageTitle";
import { useParams, Link } from "react-router-dom";

const decodeStr = (str) => {
  let doc = new DOMParser().parseFromString(str, "text/html");
  return doc.documentElement.textContent
}

export default function Article(props) {
  const {ref} = useParams();

  const [article, setArticle] = useState({});
  const [error, setError] = useState(false);

  const list = async (signal) => {
    try {
      let response = await fetch(`/api/archives/${ref}`, {
        method: "GET",
        signal: signal,
      });

      let result = await response.json();

      if(result && result.error)
        setError(true)
      else
        setArticle(result)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal);

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className="page">
      {error && <h3>Article not found!</h3>}
      {Object.keys(article).length !== 0 && <>
        <PageTitle title={`VOL. ${article.volume}, ISSUE ${article.issue} (${article.year})`} />
        <div className="article-title" dangerouslySetInnerHTML={{ __html: decodeStr(article.title) }}></div>
        <div>
          <div className="text-blue"><b>Authors</b></div>
          <div id="author-name">{article.author_name}</div>
        </div>
        <div>
          <div className="text-blue"><b>Abstract</b></div>
          <div dangerouslySetInnerHTML={{ __html: decodeStr(article.abstract) }}></div>
        </div>
        <div className="flex-row">
          {article.file && <a href={`/assets/archives/${article.year}/vol${article.volume}issue${article.issue}/${article.file}`} download={`article-${article.reference_num}.pdf`}><b>Download</b>&nbsp;|&nbsp;</a>}
          <div className="text-blue"><b>Pages : </b>{article.page_num}</div>
        </div>
        <div>
          <div className="text-blue"><b>How to cite this article:</b></div>
          <div>{article.authroname} <b className="article-cite" dangerouslySetInnerHTML={{ __html: decodeStr(article.title) }}></b>. International Journal of Multidisciplinary Research and Development, Volume {article.vol}, Issue {article.issue}, {article.year}, Pages {article.page_num}</div>
        </div>
      </>
      }
    </div>
  );
}

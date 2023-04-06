import React, { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageTitle from "./PageTitle";
import { useParams, Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { searchArchives } from "../helper/api-archives";

const decodeStr = (str) => {
  let doc = new DOMParser().parseFromString(str, "text/html");
  return doc.documentElement.textContent
}

export default function Search(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [notFound, setNotFound] = useState(false);
  const { settings } = useContext(GlobalContext)
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    searchArchives(query, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        if(data.length == 0) setNotFound(true)
        else setNotFound(false)
        setArticles(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [query])

  useEffect(() => {
    document.title = 'Search | ' + settings.websitename
  }, [settings])

  return (
    <div className="page">
      <PageTitle title="SEARCH" />
      { notFound && <div>Sorry, nothing matched your search terms. Please try again with different keywords.</div>}
      { articles.length !== 0 && <>
        <div>Resuts: {articles.length}, Query: <b>{query}</b></div> 
        <table className="articles">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Title and Authors Name</th>
              <th>Subject</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
          {articles.map((article, index) => {
            return <tr>
              <td>{index + 1}</td>
              <td>
                <div className="article-info">
                  <div><b dangerouslySetInnerHTML={{ __html: decodeStr(article.title) }}></b></div>
                  <div>{article.authorname}</div>
                  <div className="abstract">
                    <Link to={`/archives/${article.year}/vol${article.volume}/issue${article.issue}/${article.refnumber}`}>
                      <b>Abstract</b>
                    </Link>
                    &nbsp;|&nbsp;
                    {article.file && <><a href={`/assets/archives/${article.year}/vol${article.volume}issue${article.issue}/${article.file}`} download={`article-${article.refnumber}.pdf`}><b>Download</b></a>&nbsp;|&nbsp;</>}

                    <div>Pages: {article.pagenumber}</div>
                  </div>
                  <div className="citation"><b>How to cite this article:</b></div>
                  <div>{article.authroname} <b dangerouslySetInnerHTML={{ __html: decodeStr(article.title) }}></b>. International Journal of Multidisciplinary Research and Development, Volume {article.vol}, Issue {article.issue}, {article.year}, Pages {article.pagenumber}</div>
                </div>
              </td>
              <td>{article.subject}</td>
              <td>{article.country}</td>
            </tr>
          })}
          </tbody>
        </table>
        </>
        }
    </div>
  );
}
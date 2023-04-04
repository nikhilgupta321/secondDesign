import React, { useState, useEffect } from "react";
import PageTitle from "./PageTitle";
import { useParams, Link } from "react-router-dom";

const decodeStr = (str) => {
  let doc = new DOMParser().parseFromString(str, "text/html");
  return doc.documentElement.textContent
}

export default function Archives(props) {
  const params = useParams();
  const year = parseInt(params.year.match(/\d+/)[0], 10)
  const vol = parseInt(params.vol.match(/\d+/)[0], 10)
  const issue = parseInt(params.issue.match(/\d+/)[0], 10)

  const [articles, setArticles] = useState([]);

  const list = async (signal) => {
    try {
      let response = await fetch(`/api/archives/${year}/${vol}/${issue}`, {
        method: "GET",
        signal: signal,
      });

      let result = await response.json();
      if (result && result.error) {
        console.log(result.error);
      } else {
        const enabledArticles = result.filter(article => article.status == 'enabled');
        setArticles(enabledArticles);
      }
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
    <div className="page ">
      <PageTitle title={`VOL. ${vol}, ISSUE ${issue} (${year})`} />
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
          {articles.length !== 0 && articles.map((article, index) => {
            return <tr>
              <td>{index + 1}</td>
              <td>
                <div className="article-info">
                  <div><b dangerouslySetInnerHTML={{ __html: decodeStr(article.title) }}></b></div>
                  <div><b>Authors: </b>{article.author_name}</div>
                  <div className="abstract">
                    <Link to={`/archives/${params.year}/${params.vol}/${params.issue}/${article.reference_num}`}>
                      <b>Abstract</b>
                    </Link>
                    &nbsp;|&nbsp;
                    {article.file && <><a href={`/assets/archives/${article.year}/vol${article.volume}issue${article.issue}/${article.file}`} download={`article-${article.reference_num}.pdf`}><b>Download</b></a>&nbsp;|&nbsp;</>}
                   
                    <div>Pages: {article.page_num}</div>
                  </div>
                  <div className="citation"><b>How to cite this article:</b></div>
                  <div>{article.authroname} <b dangerouslySetInnerHTML={{ __html: decodeStr(article.title) }}></b>. International Journal of Multidisciplinary Research and Development, Volume {vol}, Issue {issue}, {year}, Pages {article.page_num}</div>
                </div>
              </td>
              <td>{article.subject}</td>
              <td>{article.country}</td>
            </tr>
          })
          }
        </tbody>
      </table>
    </div>
  );
}

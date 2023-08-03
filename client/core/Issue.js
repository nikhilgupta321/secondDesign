import React, { useState, useEffect, useContext } from "react";
import PageTitle from "./PageTitle";
import { useParams, Link } from "react-router-dom";
import { listPublicIssue } from "../helper/api-archives";
import { GlobalContext } from "../context/GlobalContext";
import { decode } from "html-entities";
import sanitizeHtml from "sanitize-html";
import { formatAuthorNames, cleanHtml } from "../helper/helpers";

export default function Archives(props) {
  const params = useParams();
  const year = parseInt(params.year.match(/\d+/)[0], 10);
  const vol = parseInt(params.vol.match(/\d+/)[0], 10);
  const issue = parseInt(params.issue.match(/\d+/)[0], 10);
  const { settings } = useContext(GlobalContext);

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listPublicIssue({ year: year, vol: vol, issue: issue }, signal).then(
      (data) => {
        if (data && !data.error) {
          const enabledArticles = data.filter(
            (article) => article.refnumber && article.status === "enabled"
          );
          enabledArticles.sort(
            (a, b) => parseInt(a.pagenumber) - parseInt(b.pagenumber)
          );
          setArticles(enabledArticles);
        }
      }
    );

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
          {articles.length !== 0 &&
            articles.map((article, index) => {
              return (
                <tr key={`article-${index + 1}`}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="article-info">
                      <div className="text-justify">
                        <b
                          dangerouslySetInnerHTML={{
                            __html: cleanHtml(decode(article.title)),
                          }}
                        ></b>
                      </div>
                      <div>
                        <b>Authors: </b>
                        {article.authorname}
                      </div>
                      <div className="abstract">
                        <Link
                          to={`/archives/${params.year}/${params.vol}/${params.issue}/${article.refnumber}`}
                        >
                          <b>Abstract</b>
                        </Link>
                        &nbsp;|&nbsp;
                        {article.file && (
                          <>
                            <a
                              href={`/assets/archives/${article.year}/vol${article.volume}issue${article.issue}/${article.file}`}
                              target="_blank"
                            >
                              <b>Download</b>
                            </a>
                            &nbsp;|&nbsp;
                          </>
                        )}
                        <div>Pages: {article.pagenumber}</div>
                      </div>
                      <div className="citation">
                        <b>How to cite this article:</b>
                      </div>
                      <div className="text-justify">
                        {article.authorname &&
                          formatAuthorNames(article.authorname)}{" "}
                        "
                        <span
                          dangerouslySetInnerHTML={{
                            __html: cleanHtml(decode(article.title)),
                          }}
                        ></span>
                        " . {settings.websitename}, Volume {vol}, Issue {issue},{" "}
                        {year}, Pages {article.pagenumber}
                      </div>
                    </div>
                  </td>
                  <td>{article.subject}</td>
                  <td>{article.country}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

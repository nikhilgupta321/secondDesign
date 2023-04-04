import React, { useState, useEffect, useContext } from "react";
import Frame from "./Frame";
import PageTitle from "./PageTitle";
import { Link } from "react-router-dom";
import { listPublicArchives } from "../helper/api-archives";
import { GlobalContext } from "../context/GlobalContext";

export default function Archives(props) {
  const { settings } = useContext(GlobalContext)  
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listPublicArchives(signal)
      .then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else if (data) {
          setArchives(data)
        }
      })
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    document.title = 'Archives | ' + settings.journal_name
  }, [settings])

  return (
    <div className="page">
      <PageTitle title="ARCHIVES" />
      {archives.map((archive) => {
        return <Frame title={`${archive.year} ISSUES`}>
          <div className="issue-grid">
            {[...Array(archive.total_issues)].map((e, index) => {
              return <Link to={`/archives/${archive.year}/vol${archive.volume}/issue${index + 1}`}>
                <div className="issue">VOL. {archive.volume} : ISSUE {index + 1}</div>
              </Link>
            })}
          </div>
        </Frame>;
      })}
      </div>
  );
}

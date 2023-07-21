import React, { useState, useEffect, useContext } from "react";
import Frame from "./Frame";
import PageTitle from "./PageTitle";
import { Link } from "react-router-dom";
import { listPublicArchives } from "../helper/api-archives";
import { GlobalContext } from "../context/GlobalContext";

export default function Archives(props) {
  const { settings } = useContext(GlobalContext);
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listPublicArchives(signal).then((data) => {
      if (data && data.error) {
        console.error(data.error);
      } else if (data) {
        setArchives(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    window.title = `Archives | ${settings.websitename}`;
  }, [settings]);

  return (
    <div className="page">
      <PageTitle title="ARCHIVES" />
      {archives.map((archive, index) => {
        return (
          <Frame key={`frame-${index}`} title={`${archive.year} ISSUES`}>
            <div className="issue-grid">
              {[...Array(archive.total_issues)].map((e, i) => {
                const issueIndex = i + 1;
                return (
                  <Link
                    key={`issue-${issueIndex}`}
                    to={`/archives/${archive.year}/vol${archive.volume}/issue${issueIndex}`}
                  >
                    <div className="issue">
                      VOL. {archive.volume} : ISSUE {issueIndex}
                    </div>
                  </Link>
                );
              })}
            </div>
          </Frame>
        );
      })}
    </div>
  );
}

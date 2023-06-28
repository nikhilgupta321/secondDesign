import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { listIndexing } from "../helper/api-indexing";

export default function JournalInfo(props) {
  const [RJIFIndex, setRJIFIndex] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listIndexing(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setRJIFIndex(data.find(index => index.title === 'RJIF'))
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const { settings } = useContext(GlobalContext)
  return (
    <table className="journalInfo">
      <tbody>
        <tr>
          <td>
            {settings && settings.issn && settings.issn.split(",")[0]}
            <br />
            {settings && settings.issn && settings.issn.split(",")[1]}
          </td>
          <td>
            Indexed Journal <br /> Refereed Journal <br /> Peer Reviewed Journal
          </td>
        </tr>
      </tbody>
    </table>
  );
}

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
      <div className="font-bold text-3xl text-red-500 pt-6 text-center">
        {settings && settings.issn && <>
          {settings.issn.split(",")[0]}
          {settings.issn.split(",")[1] && <><br/>{settings.issn.split(",")[1]}</>}
        </>}
        <br/>
        <br/>
        Indexed Journal
        <br/>
        Refered Journal
        <br/>
        Peer Reviewed Journal
      </div>
  )
}

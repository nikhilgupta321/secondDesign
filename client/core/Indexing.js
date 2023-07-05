import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { listIndexing } from "../helper/api-indexing";

export default function Indexing(props) {
  const { settings } = useContext(GlobalContext)
  const [indexing, setIndexing] = useState([])

  useEffect(() => {
    document.title = 'Indexing | ' + settings.websitename
    const abortController = new AbortController();
    const signal = abortController.signal;

    listIndexing(signal).then(data => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setIndexing(data.filter(index => index.status === "enabled").sort((a, b) => a.sortnumber - b.sortnumber))
      }
    })

    return function cleanup() {
      abortController.abort();
    };
  }, [settings])

  return (
    <div className="indexing-grid">
      {indexing.map((indexing, index) => {
        return <a key={`indexing-${index + 1}`} className="indexing-element flex items-center justify-center p-5" href={indexing.link} style={{ pointerEvents: indexing.link ? 'auto' : 'none' }} target="_blank" rel="noopener noreferrer">
                  <img src={`assets/indexing/${indexing.image}`} className="bg-blue-600 w-full h-auto" alt={indexing.title} />
               </a>
      })}
    </div>
  );
}

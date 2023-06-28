import React, { useContext, useEffect } from "react";
import Indexing from "./Indexing";
import JournalInfo from "./JournalInfo";
import { GlobalContext } from "../context/GlobalContext";

function htmlDecode(input){
  var e = document.createElement('textarea');
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

export default function Home(props) {
  const { settings } = useContext(GlobalContext)
  
  useEffect(() => {
    document.title = settings.websitename
  }, [settings])

  return (
    <>
      <JournalInfo />
      <div className="font-bold text-3xl text-red-500 pt-6 text-center">We send published link, <br/>certificate, coverpage in 5 days.</div>
      <div className="pt-8" dangerouslySetInnerHTML={{ __html: typeof window !== 'undefined' ? htmlDecode(settings.home_content) : ""}}></div>
      <div id="indexing-title">INDEXING</div>
      <Indexing/>
    </>
  );
}

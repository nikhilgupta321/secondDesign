import React, { useContext, useEffect } from "react";
import Indexing from "./Indexing";
import { GlobalContext } from "../context/GlobalContext";

function htmlDecode(input) {
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
      <div className="flex flex-col items-center w-full gap-6 text-3xl font-bold text-blue-A">
        {/* <div className="text-center">
          {settings && settings.issn && settings.issn.split(",")[0]}
          <br />
          {settings && settings.issn && settings.issn.split(",")[1]}
        </div>
        <div className="text-center">
          Indexed Journal<br />
          Refered Journal<br />
          Peer Reviewed Journal
        </div>
        <div className="text-center">
          We send published link, <br />certificate, coverpage in 5 days.
        </div> */}
      </div>
      <div className="pt-6 text-lg" dangerouslySetInnerHTML={{ __html: typeof window !== 'undefined' ? htmlDecode(settings.home_content) : "" }}></div>
      <div id="indexing-title"></div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Indexing />
    </>
  );
}

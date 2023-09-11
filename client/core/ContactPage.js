import React, { useContext, useEffect } from "react";
import PageTitle from "./PageTitle";
import { GlobalContext } from "../context/GlobalContext";
import Indexing from "./Indexing";

function htmlDecode(input) {
  var e = document.createElement("textarea");
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

export default function ContactPage(props) {
  const { settings } = useContext(GlobalContext);

  useEffect(() => {
    document.title = "Contact Us | " + settings.websitename;
  }, [settings]);

  return (
    <b>
      <img width={350}
        id="header-img"
        src="/assets/images/contact.png"
      />
      <br />
      <div className="flex flex-col gap-5">

        <PageTitle title="CONTACT US" />
        <div
          dangerouslySetInnerHTML={{
            __html:
              typeof window !== "undefined" ? htmlDecode(settings.address) : "",
          }}
        ></div>
        WhatsApp your Query
        <br />
        <div>
          {/* <div>Head: Nikhil Gupta</div> */}
          <div className="phoneno">
            <div>Ph:</div>
            <div id="phone">{`${settings.whatsup_number}`}</div>
            <img
              className="whatsapp-icon"
              src="/assets/images/whatsapp-icon.png"
            />
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Indexing />
      </div>
    </b>
  );
}

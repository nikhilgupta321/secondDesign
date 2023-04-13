import React, { useContext, useEffect } from "react";
import PageTitle from "./PageTitle";
import { GlobalContext } from "../context/GlobalContext";

export default function ContactPage(props) {
  const { settings } = useContext(GlobalContext)

  useEffect(() => {
    document.title = 'Contact Us | ' + settings.websitename
  }, [settings])

  return (
    <b>
    <div className=" flex flex-col gap-5">
      <PageTitle title="CONTACT US" />
        <div>Address: H-34/3, Sector-3, Rohini, Delhi, India</div>
        <div>
          Email<br />
          {settings.websiteemail}
        </div>
        WhatsApp your query<br />
        <div>
        <div>Head: Nikhil Gupta</div>
        <div className="phoneno">
            <div>phone:</div>
            <div id="phone">{`${settings.whatsup_number}`}</div>
            <img className="whatsapp-icon" src="/assets/images/whatsapp-icon.png" />
        </div>
        </div>
    </div>
    </b>
  )
}

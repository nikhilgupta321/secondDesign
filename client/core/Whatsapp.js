import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Whatsapp(props) {
  const { settings } = useContext(GlobalContext)
  return (
    <div className="blinkBox">
      <a href={`https://wa.me/919999888671?text=Hi, I have a query regarding publication in ${settings.websitename} (${settings.domain})`}>
        <img src="/assets/images/whatsapp-logo.png" />
      </a>
    </div>
  );
}

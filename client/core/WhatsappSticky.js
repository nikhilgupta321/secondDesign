import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function WhatsappSticky(props) {
  const { settings } = useContext(GlobalContext)
  return (
    <a href={`https://wa.me/919999888671?text=Hi, I have a query regarding publication in ${settings.websitename} (${settings.domain})`}>
      <img src="/assets/images/whatsapp-logo.png" className="blinkBox fixed right-0 top-96 -rotate-90 origin-bottom-right w-40 h-auto" />
    </a>
  );
}

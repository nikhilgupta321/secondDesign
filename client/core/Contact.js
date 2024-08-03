import React, { useContext } from "react";
import Card from "./Card";
import { GlobalContext } from "../context/GlobalContext";

export default function Contact(props) {
  const { settings } = useContext(GlobalContext);
  return (
    <Card cardTitle="CONTACT US">
      <div id="contact">
        <div>
          <div>Ph:</div>
          <div>{`${settings.whatsup_number}`}</div>
          <img
            className="whatsapp-icon"
            src="/assets/images/whatsapp-icon.png"
          />
        </div>
      </div>
    </Card>
  );
}

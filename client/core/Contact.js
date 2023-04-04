import React, { useContext } from "react";
import Card from "./Card";
import { GlobalContext } from "../context/GlobalContext";

export default function Contact(props) {
  const { settings } = useContext(GlobalContext)
  return (
    <Card cardTitle="CONTACT US">
      <div id="contact">
        <div>
            <div>Head: Nikhil Gupta</div>
        </div>
        <div>
            <div>phone:</div>
            <div>{`+91-${settings.whatsapp_num}`}</div>
            <img className="whatsapp-icon" src="/assets/images/whatsapp-icon.png" />
          </div>
        </div>
    </Card>
  );
}

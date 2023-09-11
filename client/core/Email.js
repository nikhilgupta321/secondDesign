import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { GlobalContext } from "../context/GlobalContext";

export default function Email(props) {
  const { settings } = useContext(GlobalContext);

  return (
    <Card cardTitle="SUBMIT YOUR ARTICLE">
      <div>{settings.websiteemail}</div>
    </Card>
  );
}

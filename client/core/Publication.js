import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";


export default function Publication(props) {
  return (
    <Card >
    <div className="blinkbox"> 
     <Link to="/instructions"><div className="text manuscript">Publicaiton Ethics</div></Link>
    </div>
    </Card>
  );
}
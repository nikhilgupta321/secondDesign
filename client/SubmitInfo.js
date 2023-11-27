import React from "react";
import { Link } from "react-router-dom";
import Card from "./core/Card";

export default function SubmitInfo(props) {
  return (
    <Card >
    <div className="blinkbox"> 
     <Link to="/manuscript"><div className="text manuscript">Submit Online</div></Link>
    </div>
    </Card>
  );
}
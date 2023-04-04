import React from "react";

export default function Card(props) {
  return (
    <div className="sidebar-card">
      <p className="sidebarCardTitle">{props.cardTitle}</p>
      <div className="sidebarContent">{props.children}</div>
    </div>
  );
}

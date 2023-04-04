import PageTitle from "./PageTitle";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function NotFound(props) {
  const { settings } = useContext(GlobalContext)
  
  useEffect(() => {
    document.title = 'Search | ' + settings.journal_name
  }, [settings])

  return (
    <div className="page">
    <PageTitle title="SEARCH" />
    <div className="">Sorry, nothing matched your search terms. Please try again with different keywords.</div>
    </div>
  );
}

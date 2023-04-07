import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import Email from "./Email";
import Certificate from "./CertificateImg";
import Contact from "./Contact";
import JournalList from "./JournalList";
import Whatsapp from "./Whatsapp";
import WhatsappSticky from "./WhatsappSticky";
import SearchBar from "./SearchBar";
import CoverPage from "./CoverPage";
import { GlobalContext } from "../context/GlobalContext";
export default function Root() {
  const { settings } = useContext(GlobalContext)  
  
  return (
    <div>
      <div className="text-base" id="container">
          <div className="flex gap-12 w-full items-center justify-center flex-col lg:flex-row">
            <img className="w-48 h-48" src="/assets/images/logo.png" />
            <div className="flex gap-12 w-full text-center justify-center flex-col">
              <div className="text-3xl text-center lg:text-left font-bold text-blue-A">
                {settings.journal_name}
              </div>
              <div className="text-xl flex font-bold text-blue-A flex-col lg:flex-row lg:gap-12">
                <div className="py-2 border-blue-A border-t-2 lg:border-none">
                  <Link to="/">Home</Link>
                </div>
                <div className="py-2 border-blue-A border-t-2 lg:border-none">
                  <Link to="/board">EDITORIAL BOARD</Link>
                </div>
                <div className="py-2 border-blue-A border-t-2 lg:border-none">
                  <Link to="/archives">ARCHIVES</Link>
                </div>
                <div className="py-2 border-blue-A border-t-2 lg:border-none">
                  <Link to="/instructions">INSTRUCTIONS</Link>
                </div>
                <div className="py-2 border-blue-A border-t-2 lg:border-none">
                  <Link to="/indexing">INDEXING</Link>
                </div>
                <div className="py-2 border-blue-A border-y-2 lg:border-none">
                  <Link to="/contact">CONTACT US</Link>
                </div>
              </div>
            </div>
          </div>
        <img id="header-img" src="/assets/images/header.jpg" />
        <div id="body-container-desktop">
          <div className="sidebar">
            <Email/>
            <Certificate/>
            <Contact/>
          </div>
          <div id="page-content">
            <Outlet/>
          </div>
          <div className="sidebar">
            <JournalList/>
            <Whatsapp/>
            <SearchBar/>
            <CoverPage/>
          </div>
        </div>
        <div id="body-container-mobile">
          <WhatsappSticky/>
          <SearchBar/>
          <Outlet/>
          <Email/>
          <Contact/>
          <JournalList/>
          <CoverPage/>
        </div>
      </div>
      <div id="footer">Copyright © {new Date().getFullYear()}. All Rights Reserved.</div>
    </div>
  );
}
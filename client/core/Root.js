import React, { useContext, useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Email from "./Email";
import Certificate from "./CertificateImg";
import Contact from "./Contact";
// import JournalList from "./JournalList";
// import Whatsapp from "./Whatsapp";
// import WhatsappSticky from "./WhatsappSticky";
import SearchBar from "./SearchBar";
import CoverPage from "./CoverPage";
import { GlobalContext } from "../context/GlobalContext";
import SubmitInfo from "../SubmitInfo";
import Publication from "./Publication";


export default function Root() {
  const { settings } = useContext(GlobalContext);


  return (
    <div>
      <div className="text-base" id="container">
        <div className="flex flex-col items-center justify-center w-full gap-12 lg:flex-row">
          <img className="w-48 h-48" src="/assets/images/logo.png" />
          <div className="flex flex-col justify-center w-full gap-12 text-center">
            <div className="text-right text-blue-A">
              {settings && settings.issn && settings.issn.split(",")[0]}
            </div>
            <div
              className="text-3xl font-bold text-center lg:hidden text-blue-A"
              dangerouslySetInnerHTML={{
                __html: settings.formatted_journal_name,
              }}
            ></div>
            <div
              className="hidden text-4xl font-bold text-center lg:block lg:text-left text-blue-A"
              dangerouslySetInnerHTML={{
                __html: settings.websitename,
              }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col w-full text-xl font-normal text-black lg:flex-row lg:gap-12">
          <div className="py-2 border-t-2 border-black lg:border-none">
            <Link to="/">HOME</Link>
          </div>
          <div className="py-2 border-t-2 border-black lg:border-none">
            <Link to="/board">EDITORIAL BOARD</Link>
          </div>
          <div className="py-2 border-t-2 border-black lg:border-none">
            <Link to="/archives">ARCHIVES</Link>
          </div>
          <div className="py-2 border-t-2 border-black lg:border-none">
            <Link to="/instructions">INSTRUCTIONS</Link>
          </div>
          <div className="py-2 border-t-2 border-black lg:border-none">
            <Link to="/about">ABOUT US</Link>
          </div>
          <div className="py-2 border-t-2 border-black border-y-2 lg:border-none">
            <Link to="/contact">CONTACT US</Link>
          </div>
          {/* <div className="py-2 border-t-2 border-black border-y-2 lg:border-none">
            <Link to="/contact">ABOUT US</Link>
          </div>
          <div className="py-2 border-t-2 border-black border-y-2 lg:border-none">
            <Link to="/contact">CONTACT US</Link>
          </div> */}
        </div>

        {/* <img id="header-img" src="/assets/images/header.jpg" /> */}
        <div id="body-container-desktop">
          {/* <div className="sidebar">
            <CoverPage />
            <Certificate />
            <SubmitInfo />
            <Contact />
          </div> */}
          <div id="page-content">
            <Outlet />
          </div>
          <div className="sidebar">
            {/* <JournalList /> */}
            {/* <Whatsapp />
            <SearchBar /> */}
            {/* <CoverPage /> */}
            <SubmitInfo />
            <Email />
            <Certificate />
            <Publication />
            {/* <Contact /> */}
            <img id="header-img" src="/assets/images/Plagriasim.jpg" />
          </div>

        </div>
        <div id="body-container-mobile">
          {/* <WhatsappSticky /> */}
          <SearchBar />
          <Outlet />
          <Email />
          <Certificate />
          <Publication />
          {/* <Contact /> */}
          {/* <JournalList /> */}
          {/* <CoverPage /> */}
          <img id="header-img" src="/assets/images/Plagriasim.jpg" />
        </div>
      </div>
      <div id="footer">
        Copyright © {new Date().getFullYear()}. All Rights Reserved.
      </div>
    </div>
  );
}

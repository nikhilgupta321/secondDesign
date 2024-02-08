import React, { useState, useEffect } from "react";
import Root from "./core/Root";
import ErrorPage from "./ErrorPage";
import EditorialBoard from "./core/EditorialBoard";
import Home from "./core/Home";
import { Routes, Route } from "react-router-dom";
import Archives from "./core/Archives";
import Issue from "./core/Issue";
import Article from "./core/Article";
import Certificate from "./core/Certificate";
import Search from "./core/Search";
import InstructionsPage from "./core/InstructionsPage";
import IndexingPage from "./core/IndexingPage";
import ContactPage from "./core/ContactPage";
import LogIn from "./admin/LogIn";
import Admin from "./admin/Admin";
import Dashboard from "./admin/Dashboard";
import AdminArchives from "./admin/archives/AdminArchives";
import AdminIssue from "./admin/archives/AdminIssue";
import AddArticle from "./admin/archives/AddArticle";
import EditArticle from "./admin/archives/EditArticle";
import Editors from "./admin/editors/Editors";
import AddEditor from "./admin/editors/AddEditor";
import EditEditor from "./admin/editors/EditEditor";
import Settings from "./admin/settings/Settings";
import ArchiveSearch from "./admin/SearchArchives";
import GlobalProvider from "./context/GlobalContext";
import SubmitManuscript from "./core/SubmitManuscript";
import About from "./core/About";
import Account from "./admin/Account";
import Login from "./webdata/Login";
import Web_dataList from "./webdata/Webdatalist";
import Add_data from "./webdata/Adddata";
import Navbar from "./webdata/Navbar";

export default function MainRouter() {
  return (
    <React.StrictMode>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route path="board" element={<EditorialBoard />} />
            {/* <Route path="board" element={<EditorialBoardTable />} /> */}
            <Route path="archives">
              <Route index element={<Archives />} />
              <Route path=":year/:vol/:issue" element={<Issue />} />
              <Route path=":year/:vol/:issue/:ref" element={<Article />} />
            </Route>
            <Route path="search?" element={<Search />} />
            <Route path="pdf?" element={<Certificate />} />
            <Route path="instructions" element={<InstructionsPage />} />
            <Route path="indexing" element={<IndexingPage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="manuscript" element={<SubmitManuscript />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="archives" element={<AdminArchives />} />
            <Route path="archives/:year/:vol/:issue" element={<AdminIssue />} />
            <Route
              path="archives/add/:year/:vol/:issue"
              element={<AddArticle />}
            />
            <Route path="archives/:id" element={<EditArticle />} />
            <Route path="editors" element={<Editors />} />
            <Route path="editors/add" element={<AddEditor />} />
            <Route path="editors/:id" element={<EditEditor />} />
            <Route path="settings" element={<Settings />} />
            <Route path="search?" element={<ArchiveSearch />} />
            <Route path="not-found" element={<div>Not Found!</div>} />
            <Route path="account/:id" element={<Account />} />
          </Route>
          <Route path="/admin/login" element={<LogIn />} />

          {/* web data */}

          <Route path="/webdata/*" element={<Navbar />}>
            <Route index element={<Web_dataList />} />
            <Route path="addentris" element={<Add_data />} />
            <Route path=":filterType" element={<Web_dataList />} />
          </Route>
          <Route path="/webdata/login" element={<Login />} />
        </Routes>
      </GlobalProvider>
    </React.StrictMode>
  );
}

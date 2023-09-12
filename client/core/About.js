import React, { useContext, useEffect } from "react";
import PageTitle from "./PageTitle";
import { GlobalContext } from "../context/GlobalContext";
import Indexing from "./Indexing";


function htmlDecode(input) {
  var e = document.createElement('textarea');
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}


export default function About(props) {
  const { settings } = useContext(GlobalContext)

  useEffect(() => {
    document.title = 'Instructions | ' + settings.websitename
  }, [settings])

  return (
    <div className="flex flex-col gap-5 ">
      <PageTitle title="About Us" />
      <div className="text-1xl">
        {/* <div>
          {settings.websitename} is a leading international journal for publication of new ideas, the state-of-the-art research results and fundamental advances in all aspects of Engineering, Science, Technology & Management. {settings.short_name} is a open access, peer reviewed international journal with a primary objective to provide the academic community and industry for the submission of half of original research and applications.
          <br />
          <br />
          It is a large for introducing the Journals to the researchers. This service helps researchers to finding appropriate Journal for referencing and publishing their quality paper. In this global world, there are lots of Journals. So, it is very difficult to find best relevant Journal which can be useful for us. Here anybody can find and also check the quality of particular Journal decided based on the different critical analytical parameters.
        </div>
        <div>
          <br />
          <b>Global Public Policy:</b>
          <br />
          <br />
          {settings.short_name} and its organizational units engage in coordinated public policy activities at the national, regional, and international levels in order to advance the mission and vision of securing the benefits of technology for the advancement of society. The  {settings.short_name} Global Public Policy website provides a window into these activities, as well as a repository of all public policy positions and statements adopted by  {settings.short_name} or its organizational units in order to support the goal of engaging and informing {settings.short_name}  members, the public, and policymakers around the world on technology-related aspects of public policy issues.
          <br />
          <br />
          The core of the vision  {settings.short_name} is to disseminate new knowledge and technology for the benefit of all, ranging from academic research and professional communities to industry professionals in a range of topics in engineering, technology & management sciences.
          <br />
          <br />
          {settings.short_name} invites authors to send original and unpublished work that gives current research on information security regarding the theoretical and methodological aspects, as well as various real-world applications in solving security problems in the information.
          <br />
          <br />
          {settings.short_name} welcomes the submission of documents relating to any branch of the theory of Science, Management, Engineering and its applications in business, industry and other topics.
        </div> */}
        <div className="pt-6 text-lg">This journal is indexed, refereed, peer reviewed, open access journal
          This Journal provides the platform established with the aim of motivating the researchers in the research and development of chemical sciences.</div>
        <div id="indexing-title"></div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <Indexing />
      </div>
    </div>
  )
}


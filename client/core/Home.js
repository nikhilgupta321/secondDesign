import React, { useContext, useEffect } from "react";
import Indexing from "./Indexing";
import JournalInfo from "./JournalInfo";
import { GlobalContext } from "../context/GlobalContext";

export default function Home(props) {
  const { settings } = useContext(GlobalContext)
  
  useEffect(() => {
    document.title = settings.journal_name
  }, [settings])

  return (
    <>
      <div className="flex flex-col gap-5">
      <JournalInfo />
      <div className="flex flex-col gap-5 ">
      <p>
        <b>
          {settings.journal_name}
        </b>
        &nbsp;is indexed, refereed, peer reviewed, open access journal, publishing
        high quality papers on all aspects of education.
      </p>
      <p>
        <b>
        Social Science
        </b>
        <br/>
        Humanities, Sociology, Education, Political Science, Law, Policy, Social Review, Arts, History, Philosophy, English
      </p>
      <p>
        <b>
        Management
        </b>
        <br/>
        Commerce, Economics, Finance, Accounting, Corporate Governance, Human Resources Management, Marketing Management, Quality Management Training and Development
      </p>
      <p>
        <b>
        Engineering
        </b>
        <br/>
        Information Technology, Computer Application, Civil Engineering, Machanical Engineering, Chemical Engineering, Electrical Engineering, Physics
      </p>
      <p>
        <b>
        Medical Science
        </b>
        <br/>
        Medicine, Health, Nursing, Clinical Research, Pharmacy, Pharmaceutical, Pharmacognosy, Pharmacology, Phytochemistry
      </p>
      <p>
        <b>
        Biology
        </b>
        <br/>
        Botany, Bioscience, Microbiology, Biotechnology, Clinical Biology, Molecular Biology, Biochemistry, Agriculture, Chemistry, Environment and Ecology, Food Science, Nutrition, Plant Science, Entomology, Zoology, Fisheries
      </p>
      <p>
        <b>
        Physical Education
        </b>
        <br/>
        Sports, Yoga, Physiotherapy, Physiology, Exercise, Health
      </p>
      </div>
      <div id="indexing-title">INDEXING</div>
      <Indexing/>
      </div>
    </>
  );
}

import React, { useContext, useEffect } from "react";
import PageTitle from "./PageTitle";
import { GlobalContext } from "../context/GlobalContext";

export default function InstructionsPage(props) {
  const { settings } = useContext(GlobalContext)

  useEffect(() => {
    document.title = 'Instructions | ' + settings.websitename
  }, [settings])

  return (
    <div className=" flex flex-col gap-5">
      <PageTitle title="INSTRUCTIONS TO AUTHOR" />
      <div>
        <b>Submit Your Article</b><br />
        <b>{settings.websiteemail}</b>
      </div>
      <div>
        <b>Download Copyright Form <a href={`/assets/CopyrightAgreementAndAuthorshipResponsibility.doc`} download="copyright.doc">Click Here</a></b> 
      </div>
      <div>
        <b>Send Article in MS Word file</b>
      </div>
      <div>
        <b>Format of Article</b><br/>
        Title<br />
        Author Names (Maximum 5)<br />
        Author Details (Author Name, Post, Department, College, State, Country, Phone Number, E-Mail)<br />
        Abstract<br />
        Keywords<br />
        Introduction<br />
        Material and Methods<br />
        Conclusion<br />
        References (Maximum 50)<br />
        <b>References:</b> The reference number should follow the following format.
      </div>
      <div>
        <b>For Journals Format:</b> Authors Name (surname initials). Title of the article. Journal name, Volume number, Issue number, Year of publication, Pages number.
      </div>
      <div>
        <b>Example:</b><br />
        Bogduk N, Bartsch T, Silberstein S, Lipton R, Dodick D. Clinical Evaluation of Cervicogenic Headache: A clinical perspective. International Journal of Multidisciplinary Research and Development, Volume 16, Issue 2, 2008, Pages 73-80
      </div>
      <div className="big-text">Publication Policy</div>
      <div>
        The journal employs the double-blind peer review process, where both reviewers and authors remain anonymous throughout the review process.
      </div>
      <div>
        Every proposal submitted for publication is read at least by an editor, for an initial review. If the paper agrees with editorial policies and with a minimum quality level, is sent to two reviewers. The reviewers won't know the author's identity, as any identifying information will be stripped from the document before review.
      </div>
      <div>
      Reviewers comments to the editors are confidential and before passing on to the author will made anonymous. Based on the reviewers comments, Editorial Board makes a final decision on the acceptability of the article and communicates to the authors the decision, along with referees reports. Whether significant revisions are proposed, acceptance is dependent on whether the author can deal with those satisfactorily.
      </div>
      <div>
        <b>Policy of Submission:</b><br/>
        Authors are encouraged to submit their manuscripts through email. Submitted manuscript should not previously published and are not under consideration for publication by another journal.
      </div>
      <div>
        <b>Policy of Publication:</b> Published article will publish online as open access.
      </div>
      <div className="big-text">Copyright</div>
      <div>
      Journal allows the author to hold the copyright and retain publishing rights without restrictions.
      </div>
      <div className="big-text">Plagiarism</div>
      <div>
      The Journal do check plagiarism of submitted paper through software known as Plagiarism Checker X.
      </div>
      <div>
      There is a zero-tolerance policy towards plagiarism in our journal. Article are screened for plagiarism before, during, and after publication, and if found they will be rejected at any stage of processing.
      </div>
      <div className="big-text">Open Access</div>
      <div>Open Access means that everyone around the world can read and download your article for free.</div>
      <div className="big-text">Ethics</div>
      <div>
      Journal take the responsibility to maintain the integrity and completeness of the scholarly record of the content for all and users very seriously. The journal place great importance on the articles after they have been published.
      </div>
    </div>
  );
}

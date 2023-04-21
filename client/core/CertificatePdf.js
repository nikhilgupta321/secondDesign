import React from "react";

const decodeStr = (str) => {
  let doc = new DOMParser().parseFromString(str, "text/html");
  return doc.documentElement.textContent
}

export default function CertificatePdf(props) {
  const dateString = props.article.publishdate;
  const date = new Date(dateString);
  const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const formattedDate = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  
  return (
    <div id="certificate-pdf">
      <div id="cert-content">
        <div className="flex p-8 gap-8 border-b-2 border-black">
          <img id="cert-logo" src="/assets/images/logo.png" />
          <div className="flex items-center justify-center -ml-4 -mt-6 text-blue-A w-full text-center text-3xl">{props.settings.websitename}</div>
        </div>
        <div id="cert-body">
          <div id="cert-body-title">
          <div>Indexed Journal, Refereed Journal, Peer Reviewed Journal</div>
          <div>{`${props.settings.issn}, ${props.settings.impactfactor}`}</div>
          </div>
          <img id="cert-banner" src="/assets/images/publication-certificate.jpg" />
          <div>This certificate confirms that <b style={{fontFamily:'Hind, times', fontSize: '16px'}}>{props.author}</b>&nbsp;has published article
            titled <b style={{fontFamily:'Hind, times', fontSize: '16px', wordSpacing: '5px'}} dangerouslySetInnerHTML={{ __html: decodeStr(props.article.title) }} />.</div>
          <div>
          <div>Details of Published Article as follow:</div>
          <table id="cert-table">
            <tbody>
              <tr>
                <td>Volume</td>
                <td>:</td>
                <td><b>{props.article.volume}</b></td>
              </tr>
              <tr>
                <td>Issue</td>
                <td>:</td>
                <td><b>{props.article.issue}</b></td>
              </tr>
              <tr>
                <td>Year</td>
                <td>:</td>
                <td><b>{props.article.year}</b></td>
              </tr>
              <tr>
                <td>Page Number</td>
                <td>:</td>
                <td><b>{props.article.pagenumber}</b></td>
              </tr>
              <tr>
                <td>Reference No.</td>
                <td>:</td>
                <td><b>{props.article.refnumber}</b></td>
              </tr>
              <tr>
                <td>Published Date</td>
                <td>:</td>
                <td><b>{formattedDate}</b></td>
              </tr>
            </tbody>
          </table>
          </div>
          <div className="w-24 h-24 mb-3">
          <img src="/assets/images/stamp.png" />
          </div>
          <div>
            Regards<br />
            {props.settings.websitename}<br />
            {props.settings.domain}<br />
            {props.settings.websiteemail}<br />
            {props.settings.whatsup_number}<br />
          </div>
        </div>
      </div>
    </div>
  )
}
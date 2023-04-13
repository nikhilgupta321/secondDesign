import React from "react";

const decodeStr = (str) => {
  let doc = new DOMParser().parseFromString(str, "text/html");
  return doc.documentElement.textContent
}

export default function CertificatePdf(props) {
  const dateString = props.article.published_at;
  const date = new Date(dateString);
  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  return (
    <div id="certificate-pdf">
      <div id="cert-content">
        <div id="cert-head">
          <img id="cert-logo" src="/assets/images/logo.png" />
          <div id="cert-title">{props.settings.journal_name}</div>
        </div>
        <div id="cert-body">
          <div id="cert-body-title">
          <div>Indexed Journal, Refereed Journal, Peer Reviewed Journal</div>
          <div>{`${props.settings.issn}, ${props.settings.impact_factor}`}</div>
          </div>
          <img id="cert-banner" src="/assets/images/publication-certificate.jpg" />
          <div>This certificate confirms that <b style={{fontFamily:'helvetica, NotoSansDevanagri'}}>{props.author}</b>&nbsp;has published article
            titled <b style={{fontFamily:'helvetica, NotoSansDevanagri'}} dangerouslySetInnerHTML={{ __html: decodeStr(props.article.title) }} />.</div>
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
                <td><b>{props.article.page_num}</b></td>
              </tr>
              <tr>
                <td>Reference No.</td>
                <td>:</td>
                <td><b>{props.article.reference_num}</b></td>
              </tr>
              <tr>
                <td>Published Date</td>
                <td>:</td>
                <td><b>{formattedDate}</b></td>
              </tr>
            </tbody>
          </table>
          </div>
          <img id="cert-sign" src="/assets/images/sign.png" />
          <div>
            Regards<br />
            {props.settings.journal_name}<br />
            {props.settings.domain}<br />
            {props.settings.journal_email}<br />
            {props.settings.whatsapp_num}<br />
          </div>
        </div>
      </div>
    </div>
  )
}
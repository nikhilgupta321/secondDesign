const fs = require("fs");
import { decode } from "html-entities";
import cleanHtml from "./clean_html";

export default (config, article, author, settings, formattedPublishDate) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
  </head>
  <body style="margin: 0 !important; padding: 0 !important;">
    <div style="font-family: 'Times New Roman'; color: black; line-height: normal; font-size: 18px; width: 210mm; height: 297mm; padding: 30px; position: relative;">
      <div style="border: 3px solid black; height: 100%;">
        <div style="display: flex; padding: 30px; gap: 10px; border-bottom-width: 3px; border-bottom-style: solid; border-color: black;">
          <img style="width: 120px; height: 120px;" src="data:image/jpeg;base64,${fs
            .readFileSync(config.imagesDir + "/logo.png")
            .toString("base64")}" />
          <div style="display: flex; align-items: center; justify-content: center; color: #0400ff; width: 100%; text-align: center; font-size: 30px;">
            ${settings.websitename}
          </div>
        </div>
        <div style="padding: 30px; height: 100%;">
          <div style="text-align:center; margin-top:10px;">
            Indexed Journal, Refereed Journal, Peer Reviewed Journal
          </div>
          <div style="text-align:center; margin-top:30px;">
            ${settings.issn}
          </div>
          <div style="display:flex; margin-top:40px; align-items:center; justify-content:center;">
            <img style="width:300px; margin:auto;" src="data:image/jpeg;base64,${fs
              .readFileSync(config.imagesDir + "/publication-certificate.jpg")
              .toString("base64")}"/>
          </div>
          <div style="line-height:normal; margin-top: 40px; text-align:justify; text-justify:inter-word;">
            This certificate confirms that&nbsp;<b>${author}</b>&nbsp;has published article
            titled&nbsp;<b>${cleanHtml(decode(article.title))}</b>&nbsp;.
          </div>
          <div style="margin-top: 40px;">Details of Published Article as follow:</div>
          <table style="margin-top: 20px;">
            <tbody>
              <tr><td>Volume</td>         <td style="padding-left:10px;padding-right:10px">:</td> <td><b>${
                article.volume
              }</b></td></tr>
              <tr><td>Issue</td>          <td style="padding-left:10px;padding-right:10px">:</td> <td><b>${
                article.issue
              }</b></td></tr>
              <tr><td>Year</td>           <td style="padding-left:10px;padding-right:10px">:</td> <td><b>${
                article.year
              }</b></td></tr>
              <tr><td>Page Number</td>    <td style="padding-left:10px;padding-right:10px">:</td> <td><b>${
                article.pagenumber
              }</b></td></tr>
              <tr><td>Reference No.</td>  <td style="padding-left:10px;padding-right:10px">:</td> <td><b>${
                article.refnumber
              }</b></td></tr>
              <tr><td>Published Date</td> <td style="padding-left:10px;padding-right:10px">:</td> <td><b>${formattedPublishDate}</b></td></tr>
            </tbody>
          </table>
          <img style="width: 100px; margin-top: 40px;" src="data:image/jpeg;base64,${fs
            .readFileSync(config.imagesDir + "/stamp.png")
            .toString("base64")}"/>
          <div style="position: absolute; bottom: 60px;">
            Regards<br />
            ${settings.websitename}<br/>
            ${settings.domain}<br/>
            ${settings.websiteemail}<br/>
            ${settings.whatsup_number}<br/>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>`;
};

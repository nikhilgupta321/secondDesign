import React from "react";

export default function CoverpagePdf(props) {
  return (
    <div id="coverpage">
    <div id="cover-pdf">
      <div id="cover-row1">
        <div>Indexed Journal<br />
          Refereed Journal<br />
          Peer Reviewed Journal<br />
        </div>
        <div id="cover-row1-right">
          {props.settings.domain}<br />
          {props.settings.issn.split(",")[0]}<br />
          {props.settings.issn.split(",")[1]}<br />
        </div>
      </div>
      <div id="cover-row2">
        <div>
          Volume: {props.article.volume}
        </div>
        <div>
          Issue: {props.article.issue}
        </div>
        <div>
          Year: {props.article.year}
        </div>
      </div>
      <div id="cover-title">{props.settings.websitename}</div>
      <img src="/assets/images/coverpage-img.jpg" />
      <div id="cover-footer">
        Journal List : www.academicpublications.net<br/>
      </div>
    </div>
    </div>
  )
}
const fs = require("fs");

export default (config, article, settings) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <style>
    html {
      -webkit-print-color-adjust: exact;
    }

    body {
      margin: 0;
      padding: 0;
    }
    
    #coverpage {
      display: flex;
      flex-direction: row;
      gap: 100px;
      background-color: #325BA9;
      font-family: 'Times New Roman';
      line-height: normal;
      padding: 100px;
      width: fit-content;
    }
  
    .page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 30px;
      color: white;
      position: relative;
    }
  
  
  #cover-pdf {
    display: flex;
    flex-direction: column;
    gap: 30px;
    color: white;
  }
  
  #cover-row1-right {
    text-align: right;
  }
  
  #cover-row1 {
    display: flex;
    font-size: 27px;
  }
  
  #cover-row1>div {
    flex: 1;
  }
  
  #cover-row2>div {
    flex: 1;
    text-align: center;
  }
  
  #cover-row2 {
    display: flex;
    font-size: 30px;
    font-weight: bolder;
  }
  
  #cover-title {
    text-align: center;
    font-size: 40px;
  }
  
  #cover-footer {
    text-align: center;
    width: 100%;
    font-size: 35px;
    position:absolute;
    bottom: 50px;
  }
  
  .cover-flex>div {
    flex: 1;
  }
  </style>
  </head>
  <body>
  <div id="coverpage">
  <div class="page"></div>
  <div class="page">
      <div id="cover-row1">
        <div>Indexed Journal<br />
          Refereed Journal<br />
          Peer Reviewed Journal<br />
        </div>
        <div id="cover-row1-right">
          ${settings.domain}<br />
          ${settings.issn.split(",")[0]}<br />
          ${
            settings.issn.split(",")[1] ? settings.issn.split(",")[1] : ""
          }<br />
        </div>
      </div>
      <div id="cover-row2">
        <div>
          Volume: ${article.volume}
        </div>
        <div>
          Issue: ${article.issue}
        </div>
        <div>
          Year: ${article.year}
        </div>
      </div>
      <div id="cover-title">${settings.websitename}</div>
      <br/>
      <img style="height:500px" src="data:image/jpeg;base64,${fs
        .readFileSync(config.imagesDir + "/coverpage-img.jpg")
        .toString("base64")}" />
      <div id="cover-footer">
        ${
          settings.publication
            ? `
          Published By </br>
          ${settings.publication} </br></br>
        `
            : ""
        }
      </div>
    </div>
  </div>
  </body>
  </html>`;
};

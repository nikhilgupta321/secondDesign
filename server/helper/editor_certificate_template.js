const fs = require('fs');

export default (editor, settings, config, formattedCertificateDate) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
  </head>
  <body style="margin: 0 !important; padding: 0 !important;">
    <div style="font-family: 'Times New Roman'; color: black; line-height: normal; font-size: 16px; width: 210mm; height: 297mm; padding:30px; position: relative;">
      <div style="border: 3px solid black; height: 100%;">
        <div style="display: flex; padding: 30px; gap: 10px; border-bottom-width: 3px; border-bottom-style: solid; border-color: black;">
          <img style="width: 120px; height: 120px;" src="data:image/jpeg;base64,${fs.readFileSync(config.imagesDir + '/logo.png').toString('base64')}" />
          <div style="display: flex; align-items: center; justify-content: center; color: #0400ff; width: 100%; text-align: center; font-size: 25px;">
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
            <img style="width:300px; margin:auto;" src="data:image/jpeg;base64,${fs.readFileSync(config.imagesDir + '/editorial-certificate.jpg').toString('base64')}"/>
          </div>
          <div style="display:flex; justify-content: space-between; margin-top: 40px;">
            <div style="width:50%">
              <b>${editor.name}</b><br />
              ${editor.post}<br />
              ${editor.content}<br />
            </div>
            <div style="style="width:50%"; text-align: right;">
              Date: ${formattedCertificateDate}
            </div>
          </div>
          <div style="margin-top:40px;">Dear <b>${editor.name}</b>,</div>
          <div style="margin-top:40px; text-align: justify;">
            This letter confirms that <b>Academic Publications</b> appoint you as <b>${editor.category}</b> of
            <b>${settings.websitename}</b>.
            <br/><br/>
            This contract can be terminated by either party without any obligation<br/><br/>
            In extending my sincere congratulation to you, I would like to express my deep satisfaction for the
            possibility to profit from your competent collaboration.<br/>
          </div>
          <img style="width: 100px; margin-top: 40px;" src="data:image/jpeg;base64,${fs.readFileSync(config.imagesDir + '/stamp.png').toString('base64')}"/>
          <div style="position: absolute; bottom: 60px;">
            Regards<br />
            ${settings.websitename}<br/>
            ${settings.domain}<br/>
            ${settings.websiteemail}<br/>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>`
};
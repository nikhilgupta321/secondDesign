import {decode} from 'html-entities';

export default (editors, settings) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
  </head>
  <body style="font-family: 'Times New Roman', Times, serif; font-size: 11px;">
    <div>
      <div style="font-size: 14px; text-align: left;">
        ${settings.domain}<br />
        ${settings.issn.split(",")[0]}<br />
        ${settings.issn.split(",")[1]}<br />
      </div>
      <div style="font-size: 25px; font-weight: bold; margin-top: 50px; text-align: center; color: green;">
        ${settings.websitename}
      </div>
      <div style="font-size: 20px; font-weight: bold; margin-top: 50px; text-align: center; color: blue;">
        Editorial Board
      </div>
      <div style="margin-top: 50px; display: grid; grid-template-columns: repeat(3, 210px);grid-gap: 20px;">
        ${editors.map((editor) => {
          return `<div style="word-wrap: break-word;">
            <div>
              <b>${editor.name}</b>&nbsp;
              ${editor.degree ? editor.degree : ''}
            </div>
            <div>${editor.post}</div>
            <div>${decode(editor.content)}</div>
          </div>`
          }).join('')
        }
      </div>
    </div>
  </body>
  </html>`
}
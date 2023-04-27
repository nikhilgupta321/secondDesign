import {decode} from 'html-entities';

export default (articles, settings) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
  </head>
  <body style="font-family: 'Times New Roman', Times, serif; font-size: 12px;">
    <div>
      <div style="margin-top:20px; text-align: left;">
        Website: ${settings.domain}<br />
        Volume: <b>${articles[0].volume}</b>,&nbsp; Issue: <b>${articles[0].issue}</b>,&nbsp; Year: <b>${articles[0].year}</b><br />
        ${settings.issn.split(",")[0]}<br />
        ${settings.issn.split(",")[1] || ''}<br />
      </div>
      <div style="font-size: 20px; font-weight: bold; margin-top: 50px; text-align: center; color: green;">
        ${settings.websitename}
      </div>
      <ul style="margin-left: 0; padding-left: 8px; margin-top: 50px;">
        ${articles.map((article) => {
          return `<li style="padding:10px 10px; word-wrap: break-word;">
            <b>${decode(article.title)}</b><br />
            <b>Authored by:</b> ${article.authorname}<br />
            <b>Page:</b> ${article.pagenumber}<br />
          </li>`
          }).join('')
        }
      </ul>
    </div>
  </body>
  </html>`
}
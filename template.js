export default (markup) => {
  return `<!doctype html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="keywords" content="multidisciplinary journal, education journal, educational journal, scientific journal, engineering journal, management journal, economics journal, commerce journal, business journal, medical journal, pharmacy journal, pharmaceutical journal, medicine journal, pharmacology journal, pharmacognosy journal, physical education journal, sports journal, physiology journal, biology journal, chemistry journal, chemical journal, biotechnology journal, bioscience journal, microbiology journal, food science journal, nutrition journal, humanities journal, social science journal, sociology journal, political science journal, botany journal, plants journal, agriculture journal, entomology journal, zoology journal, fish journal, robotics journal, english journal, physics journal, finance journal, ecology journal, environmental journal, environment journal">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
  <link rel="stylesheet" href="/dist/style.css">
  </head>
  <body style="background-color:#f1f5f9">
<div id="root">${markup}</div>
<script type="application/javascript" src="/dist/bundle.js"></script>
</body>
  </html>`;
};

import Archive from '../models/archive.model';
import Setting from '../models/setting.model';
import Editor from '../models/editor.model';
import { config } from '../../config/config';
import puppeteer from 'puppeteer';
import certificateTemplate from '../helper/certificate_template';
import coverpageTemplate from '../helper/coverpage_template';
import editorialBoardTemplate from '../helper/editorial_board_template';
import indexpageTemplate from '../helper/indexpage_template';
import editorCertificateTemplate from '../helper/editor_certificate_template';
import archiver from 'archiver';

import { Op } from 'sequelize';

const fs = require('fs');

const generateCertificate = async (req, res) => {
  try {
    const article = await Archive.findOne({
      where: {
        refnumber: req.params.refnumber,
        status: 'enabled'
      },
      raw: true
    });
    
    let settings = await Setting.findOne({raw: true})

    if (article.length == 0) throw 'Article not found'
    if (settings.length == 0) throw 'Settings not found'
    
    // fix this
    // if(!article.authorname.split(',').includes(req.params.author)) throw 'Author not found'
    
    const author = req.params.author;
    const dateString = article.publishdate;
    const date = new Date(dateString);
    const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const formattedPublishDate = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`; 
    
    const template = certificateTemplate(config, article, author, settings, formattedPublishDate);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(template);
    await page.setViewport({ width: 1920, height: 1080 });
    const pdfBuffer = await page.pdf({ 
      format: 'A4',
      pageRanges: '1',
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      },
    });
    await browser.close();
    res.type('application/pdf');
    res.send(pdfBuffer);
  } catch (err) {
    console.log(err)
    return res.status(400).json({error: err})
  }
}

const generateBulkCertificates = async (req, res) => {
  try {
    const settings = await Setting.findOne({ raw: true });
    const refnumbers = req.body

    let articles = await Archive.findAll({
      where: {
        status: 'enabled',
        refnumber: { [Op.in]: refnumbers },
      },
      raw: true,
    });

    if (articles.length == 0) throw 'Archives not found';
    if (settings.length == 0) throw 'Settings not found';

    const pdfBuffers = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    for (let article of articles) {
      for (let author of article.authorname.split(',')) {
        const dateString = article.publishdate;
        const date = new Date(dateString);
        const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const formattedPublishDate = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`; 
        const template = certificateTemplate(config, article, author, settings, formattedPublishDate);
        await page.setContent(template);

        const pdfBuffer = await page.pdf({
          format: 'A4',
          pageRanges: '1',
          margin: {
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
        });

        pdfBuffers.push({ name: `${article.refnumber}-${author}.pdf`, data: pdfBuffer });
      }
    }

    await browser.close();

    const zip = archiver('zip');
    zip.on('error', function (err) {
      throw err;
    });

    pdfBuffers.forEach(pdfbuffer => {
      zip.append(pdfbuffer.data, { name: pdfbuffer.name });
    });
    
    res.type('application/zip');
    res.attachment('author_certificates.zip');
    zip.pipe(res);
    zip.finalize();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
};


const generateCoverpage = async (req, res) => {
  try {
    const settings = await Setting.findOne({raw: true})
    const article = await Archive.findOne({
      where: {
        refnumber: req.params.refnumber,
        status: 'enabled'
      },
      raw: true
    });
    
    if (article.length == 0) throw 'Article not found'
    if (settings.length == 0) throw 'Settings not found'

    const template = coverpageTemplate(config, article, settings);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(template);
    await page.setViewport({ width: 1920, height: 1080 });

    const pdfBuffer = await page.pdf({ 
      format: 'A3', 
      landscape: true, 
      pageRanges: '1',
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      },
    });
    await browser.close();
    res.type('application/pdf');
    res.send(pdfBuffer);
  } catch (err) {
    console.log(err)
    return res.status(400).json({error: err})
  }
}

const generateEditorialBoard = async (req, res) => {
  try {
    const settings = await Setting.findOne({raw: true})
    let editors = await Editor.findAll({where: {status: 'enabled'}, raw: true})
    if (editors.length == 0) throw 'Editors not found'
    if (settings.length == 0) throw 'Settings not found'

    const template = editorialBoardTemplate(editors, settings);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(template);
    await page.setViewport({ width: 1920, height: 1080 });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '50px',
        right: '50px',
        bottom: '50px',
        left: '50px'
      }
    });
    await browser.close();
    res.type('application/pdf');
    res.send(pdfBuffer);
  } catch (err) {
    console.log(err)
    return res.status(400).json({error: err})
  }
}

const generateIndexPage = async (req, res) => {
  try {
    const settings = await Setting.findOne({raw: true})
    const refnumbers = req.body
    let articles = await Archive.findAll({
      where: {
        status: 'enabled',
        refnumber: {[Op.in]: refnumbers}
      }, 
    raw: true})
    
    if (articles.length == 0) throw 'Articles not found'
    if (settings.length == 0) throw 'Settings not found'

    articles.sort((a, b) => parseInt(a.pagenumber) - parseInt(b.pagenumber));

    const template = indexpageTemplate(articles, settings);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(template);
    await page.setViewport({ width: 1920, height: 1080 });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '50px',
        right: '50px',
        bottom: '50px',
        left: '50px'
      }
    });
    await browser.close();
    res.type('application/pdf');
    res.send(pdfBuffer);
  } catch (err) {
    console.log(err)
    return res.status(400).json({error: err})
  }
}

const generateEditorCertificates = async (req, res) => {
  try {
    const settings = await Setting.findOne({ raw: true });
    const editorIds = req.body;
    console.log(editorIds)
    let editors = await Editor.findAll({
      where: {
        id: { [Op.in]: editorIds },
      },
      raw: true,
    });

    if (editors.length == 0) throw 'Editors not found';
    if (settings.length == 0) throw 'Settings not found';

    const date = new Date();
    const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const formattedCertificateDate = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`; 

    const pdfBuffers = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    for (let editor of editors) {
      const template = editorCertificateTemplate(editor, settings, config, formattedCertificateDate);
      await page.setContent(template);

      const pdfBuffer = await page.pdf({
        format: 'A4',
        pageRanges: '1',
        margin: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      });
      
      pdfBuffers.push({ name: `editor-certificate-${editor.name}.pdf`, data: pdfBuffer });
    }

    await browser.close();

    const zip = archiver('zip');
    zip.on('error', function (err) {
      throw err;
    });

    pdfBuffers.forEach(pdfbuffer => {
      zip.append(pdfbuffer.data, { name: pdfbuffer.name });
    });
    
    res.type('application/zip');
    res.attachment('editor_certificates.zip');
    zip.pipe(res);
    zip.finalize();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
};


export default {
  generateCertificate,
  generateBulkCertificates,
  generateCoverpage,
  generateEditorialBoard,
  generateIndexPage,
  generateEditorCertificates
}
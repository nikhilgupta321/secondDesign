import Archive from '../models/archive.model';
import Setting from '../models/setting.model';
import Editor from '../models/editor.model';
import { config } from '../../config/config';
import puppeteer from 'puppeteer';
import certificateTemplate from '../helper/certificate_template';
import coverpageTemplate from '../helper/coverpage_template';
import editorialBoardTemplate from '../helper/editorial_board_template';
import indexpageTemplate from '../helper/indexpage_template';
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
    if(!article.authorname.split(',').includes(req.params.author)) throw 'Author not found'
    
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

export default {
  generateCertificate,
  generateCoverpage,
  generateEditorialBoard,
  generateIndexPage
}
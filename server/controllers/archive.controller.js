import Sequelize from 'sequelize';
const { QueryTypes } = require('sequelize');
import Archive from '../models/archive.model';
import { config } from '../../config/config';
const { Op } = require('sequelize');

const fs = require('fs');

const listPublicArchives = async (req, res) => {
  try {
    const archives = await Archive.findAll({
      attributes: ['year', 'volume', [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('issue'))), 'total_issues']],
      group: ['year', 'volume'],
      order: [['year', 'DESC']],
      row: true
    });    
    return res.status(200).json(archives)
  } catch (err) {
    console.log(err)
    return res.status(400).json({error: err})
  }
}

const addArticle = async (req, res) => {
  try {
    const data = req.body
    console.log(data)
    if (!req.files || !req.files.pdfFile || !data.year ||
      !data.volume || !data.issue || !data.reference_num)
      throw 'Invalid request!'

    const pdfFile = req.files.pdfFile;
    data.file = `${data.reference_num}-${new Date().valueOf()}.pdf`
    const path = `${config.archivesDir}/${data.year}/vol${data.volume}issue${data.issue}`;
    
    if(!fs.existsSync(path))
      fs.mkdirSync(path, { recursive: true })

    await pdfFile.mv(path + '/' + data.file)
    await Archive.create(data)
    res.status(200).json({
      message: "Success!"
    });
  } catch (err) {
    console.log(err)
    return res.status(400).json({error: err})
  }
}

const updateArticle = async (req, res) => {
  try {
    const data = req.body
    console.log(req.body)
    if (req.files && req.files.pdfFile) {
      if (!data.year || !data.volume || !data.issue || !data.reference_num) throw 'Invalid request!'
      const pdfFile = req.files.pdfFile;
      data.file = `${data.reference_num}-${new Date().valueOf()}.pdf`
      const path = `${config.archivesDir}/${data.year}/vol${data.volume}issue${data.issue}`;
      if(!fs.existsSync(path))
      fs.mkdirSync(path, { recursive: true })
      await pdfFile.mv(path + '/' + data.file)
    }

    let article = await Archive.findOne({where: {reference_num: req.params.ref}})
    console.log(data)
    await article.update(data)

    res.status(200).json({
      message: "Success!"
    });
  } catch (err) {
    console.log(err)
    return res.status(400).json({error: err})
  }
}

const adminArchives = async (req, res) => {
  try {
    const archives = await Archive.findAll({
      attributes: ['year', 'volume', 'issue', [Sequelize.fn('COUNT', Sequelize.col('issue')), 'articles'], [Sequelize.fn('MIN', Sequelize.col('created_at')), 'created_at']],
      group: ['year', 'volume', 'issue'],
      order: [[Sequelize.literal('year DESC, ABS(issue) DESC')]],
    });       
    return res.status(200).json(archives)
  } catch (err) {
    console.log(err)
    return res.status(400).json({error: err})
  }
}

const listIssue = async (req, res) => {
  try {
    const issue = await Archive.findAll({
      where: {
        year: req.params.year,
        volume: req.params.vol,
        issue: req.params.issue,
      },
      raw: true
    });

    let result = issue.map((article) => {
      if (article.file && fs.existsSync(`${config.archivesDir}/${article.year}/vol${article.volume}issue${article.issue}/${article.file}`)) {
        return { ...article }
      } else {
        return { ...article, file: '' }
      }
    })
    return res.status(200).json(result)
  } catch (err) {
    console.log(err)
    return res.status(400).json({error: err})
  }
}

const archivesByRef = async (req, res) => {
  try {
    const article = await Archive.findOne({
      where: {
        reference_num: req.params.ref,
        status: 'enabled'
      },
      limit: 1,
      raw: true
    });
    
    if (article.length == 0) throw 'Article not found'

    const path = `${config.archivesDir}/${article.year}/vol${article.volume}issue${article.issue}/${article.file}`
    if (article.file && !fs.existsSync(path))
      article.file = ''

    return res.status(200).json(article)
  } catch (err) {
    console.log(err)
    return res.status(400).json({error: err})
  }
}

//Fix this: it should check the database if the issue is already present
const createNewIssue = async (req, res) => {
  const data = req.body
  const date = new Date()
  data.year = date.getFullYear()
  try {
    if (!data.volume || !data.issue) throw "Invalid request"
    const path = `${config.archivesDir}/${data.year}/vol${data.volume}issue${data.issue}`
    
    if(!fs.existsSync(path))
      fs.mkdirSync(path, { recursive: true })
    
      await Archive.create(data)
    return res.status(200).json({
      message: "Created new archive!"
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ error: err })
  }
}

const searchArchives = async (req, res) => {
  try {
    const query = req.query.q;
    
    if(!query) return res.status(200).json([])

    const articles = await Archive.findAll({
      where: {
        [Op.or]: [
          { reference_num: { [Op.like]: `%${query}%` } },
          { title: { [Op.like]: `%${query}%` } },
          { author_name: { [Op.like]: `%${query}%` } },
          { abstract: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } },
        ],
      },
      limit: 25,
      raw: true
    });
    
    let result = articles.map((article) => {
      const path = `${config.archivesDir}/${article.year}/vol${article.volume}issue${article.issue}/${article.file}`
      if (article.file && fs.existsSync(path)) {
        return { ...article }
      } else {
        return { ...article, file: '' }
      }
    })
    return res.status(200).json(result)
  } catch (err) {
    console.log(err)
    return res.status(400).json({error: err})
  }
}

export default {
  updateArticle,
  addArticle,
  listPublicArchives,
  listIssue,
  archivesByRef,
  searchArchives,
  adminArchives,
  createNewIssue
}
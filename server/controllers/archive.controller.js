import Sequelize from 'sequelize';
import Archive from '../models/archive.model';
import Setting from '../models/setting.model';
import { transactiondb, config } from '../../config/config';
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
    console.error(err)
    return res.status(400).json({ error: err })
  }
}

const addArticle = async (req, res) => {
  try {
    const data = req.body
    if (!req.files || !req.files.pdfFile || !data.year ||
      !data.volume || !data.issue || !data.refnumber || !data.txnid)
      throw 'Invalid request!'

    if (await Archive.findOne({ where: { refnumber: data.refnumber } }))
      throw 'duplicate_reference_number'
    if (await Archive.findOne({ where: { title: data.title } }))
      throw 'duplicate_title'
    if (await Archive.findOne({ where: { txnid: data.txnid } }))
      throw 'duplicate_txnid'

    const setting = await Setting.findOne({ raw: true })
    const rows = await transactiondb.query(`
      SELECT * FROM transactions
      WHERE journal = '${setting.websitename}'
      AND txnid = '${data.txnid}'
      AND status = 'successful'`,
      { type: Sequelize.QueryTypes.SELECT })
    if (rows.length != 1)
      throw 'invalid_txnid'

    const pagenumbers = await Archive.findAll({
      attributes: ['pagenumber'],
      where: {
        year: data.year,
        volume: data.volume,
        issue: data.issue,
      },
      raw: true
    })

    if (pagenumbers.length > 0) {
      const max = Math.max.apply(Math, pagenumbers.map(function (row) { return row.pagenumber.split('-')[1] }))
      if (data.pagenumber.split('-')[0] < max)
        throw 'invalid_pagenumber'
    }

    const pdfFile = req.files.pdfFile;
    data.file = `${data.refnumber}-${new Date().valueOf()}.pdf`
    const path = `${config.archivesDir}/${data.year}/vol${data.volume}issue${data.issue}`;

    if (!fs.existsSync(path))
      fs.mkdirSync(path, { recursive: true })

    await pdfFile.mv(path + '/' + data.file)
    await Archive.create(data)
    res.status(200).json({
      message: "Success!"
    });
  } catch (err) {
    console.error(err)
    return res.status(400).json({ error: err })
  }
}

const updateArticle = async (req, res) => {
  try {
    const data = req.body

    if (!data.year || !data.volume || !data.issue || !data.refnumber || !data.txnid) throw 'Invalid request!'
    const setting = await Setting.findOne({ raw: true })

    const rows = await transactiondb.query(`
      SELECT * FROM transactions
      WHERE journal = '${setting.websitename}'
      AND txnid = '${data.txnid}'
      AND status = 'successful'`,
      { type: Sequelize.QueryTypes.SELECT })

    if (rows.length != 1)
      throw 'invalid_txnid'

    if (req.files && req.files.pdfFile) {
      const pdfFile = req.files.pdfFile;
      data.file = `${data.refnumber}-${new Date().valueOf()}.pdf`
      const path = `${config.archivesDir}/${data.year}/vol${data.volume}issue${data.issue}`;

      if (!fs.existsSync(path))
        fs.mkdirSync(path, { recursive: true })

      await pdfFile.mv(path + '/' + data.file)
    }

    let article = await Archive.findOne({ where: { id: req.params.id } })

    await article.update(data)

    res.status(200).json({
      message: "Success!"
    });
  } catch (err) {
    console.error(err)
    return res.status(400).json({ error: err })
  }
}

const listAdminArchives = async (req, res) => {
  try {
    const archives = await Archive.findAll({
      attributes: ['year', 'volume', 'issue', [Sequelize.fn('COUNT', Sequelize.col('issue')), 'articles'], [Sequelize.fn('MIN', Sequelize.col('creation')), 'creation']],
      group: ['year', 'volume', 'issue'],
      order: [[Sequelize.literal('year DESC, ABS(issue) DESC')]],
    });
    return res.status(200).json(archives)
  } catch (err) {
    console.error(err)
    return res.status(400).json({ error: err })
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
    console.error(err)
    return res.status(400).json({ error: err })
  }
}

const archivesByRef = async (req, res) => {
  try {
    const article = await Archive.findOne({
      where: {
        refnumber: req.params.ref,
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
    console.error(err)
    return res.status(400).json({ error: err })
  }
}

const archivesById = async (req, res) => {
  try {
    const article = await Archive.findOne({
      where: {
        id: req.params.id,
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
    console.error(err)
    return res.status(400).json({ error: err })
  }
}

//Fix this: it should check the database if the issue is already present
const createNewIssue = async (req, res) => {
  const data = req.body
  try {
    if (!data.volume || !data.issue || !data.year) throw "Invalid request"
    const path = `${config.archivesDir}/${data.year}/vol${data.volume}issue${data.issue}`

    if (!fs.existsSync(path))
      fs.mkdirSync(path, { recursive: true })

    await Archive.create(data)
    return res.status(200).json({
      message: "Created new archive!"
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({ error: err })
  }
}

const searchArchives = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) return res.status(200).json([])

    const articles = await Archive.findAll({
      where: {
        [Op.or]: [
          { refnumber: { [Op.like]: `%${query}%` } },
          { title: { [Op.like]: `%${query}%` } },
          { authorname: { [Op.like]: `%${query}%` } },
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
    console.error(err)
    return res.status(400).json({ error: err })
  }
}

export default {
  updateArticle,
  addArticle,
  listPublicArchives,
  listAdminArchives,
  listIssue,
  archivesByRef,
  archivesById,
  searchArchives,
  createNewIssue
}
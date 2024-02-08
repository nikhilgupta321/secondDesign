const fs = require('fs');
import { Sequelize } from 'sequelize';
require('dotenv').config()

const cwd = __dirname.split("/")
const rootDir = cwd.slice(0, cwd.length - 1).join("/")

const assetsDir = process.env.ASSETS_DIR
const port = process.env.PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const jwtSecret = process.env.JWT_SECRET;
const textlocalApi = process.env.TEXT_LOCAL_API;

const archivesDir = assetsDir + '/archives'
const imagesDir = assetsDir + '/images'
const editorsDir = assetsDir + '/editors'

const config = {
  port: port,
  jwtSecret: jwtSecret,
  textlocalApi: textlocalApi,
  rootDir: rootDir,
  assetsDir: assetsDir,
  archivesDir: archivesDir,
  imagesDir: imagesDir,
  editorsDir: editorsDir
}

const sequelize = new Sequelize({
  database: dbName,
  username: dbUser,
  host: 'localhost',
  password: dbPass,
  dialect: 'mysql',
  dialectOptions: {
    socketPath: "/var/run/mysqld/mysqld.sock",
  },
  timezone: '+05:30'
});

const webdatadb = new Sequelize({
  database: 'webdata',
  username: 'admin',
  host: 'localhost',
  password: 'J]w7fx69MR!}', 
  dialect: 'mysql',
  timezone:"+05:30",

});



const transactiondb = new Sequelize({
  database: 'academicpublicationsnet',
  username: 'pbtdhkbkmzn0',
  host: '107.180.51.85',
  password: 'r2M1Q1#7OmTA',
  dialect: 'mysql',
});

export { transactiondb, sequelize, config, webdatadb  }
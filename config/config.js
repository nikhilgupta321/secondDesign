const fs = require('fs');
import { Sequelize } from 'sequelize';

const cwd = __dirname.split("/")
const rootDir = cwd.slice(0, cwd.length-1).join("/")

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
    socketPath: "/var/run/mysqld/mysqld.sock"
  },
  timezone: '+05:30'
});

export { sequelize, config }
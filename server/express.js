import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import MainRouter from "../client/MainRouter";
import editorRoutes from './routes/editor.routes';
import archiveRoutes from './routes/archive.routes'
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import indexingRoutes from './routes/indexing.routes';
import helperRoutes from './routes/helper.routes';
import settingRoutes from './routes/setting.routes';
import pdfRoutes from './routes/pdf.routes';

import { config } from "../config/config";
import fileUpload from "express-fileupload";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
}));

app.use("/dist", express.static(path.join(config.rootDir, "dist")));
app.use(`/assets`, express.static(config.assetsDir));
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', settingRoutes)
app.use('/', indexingRoutes)
app.use('/', editorRoutes)
app.use('/', archiveRoutes)
app.use('/', helperRoutes)
app.use('/', pdfRoutes)

app.get("*", (req, res) => {
  const context = {};
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <MainRouter />
    </StaticRouter>
  );

  if (context.url) {
    return res.redirect(303, context.url);
  }

  res.status(200).send(
    Template(markup)
  );
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.error(err);
  }
});

export default app;
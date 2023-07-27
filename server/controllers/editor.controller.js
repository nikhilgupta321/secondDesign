import Editor from "../models/editor.model.js";
import Setting from "../models/setting.model.js";
import { config } from "../../config/config.js";
const fs = require("fs");

const listEditors = async (req, res) => {
  try {
    let editors = await Editor.findAll({ raw: true });

    let result = editors.map((editor) => {
      if (
        editor.picture &&
        fs.existsSync(config.editorsDir + "/" + editor.picture)
      ) {
        return { ...editor };
      } else {
        return { ...editor, picture: "" };
      }
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err });
  }
};

const addEditor = async (req, res) => {
  try {
    let imgFile;
    let uploadPath;
    let data = req.body;

    if (!req.files || !req.files.imgFile) data.picture = "avatar.png";
    else {
      imgFile = req.files.imgFile;
      let fileName = new Date().valueOf() + "." + imgFile.name.split(".").pop();

      uploadPath = config.editorsDir + "/" + fileName;

      await imgFile.mv(uploadPath);
      data.picture = fileName;
      console.error(fileName);
    }

    await Editor.create(data);

    res.status(200).json({
      message: "Success!",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: "Error!",
    });
  }
};

const editorById = async (req, res) => {
  try {
    const editor = await Editor.findOne({ where: { id: req.params.id } });

    if (!editor) throw "Editor not found";

    return res.status(200).json(editor);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err });
  }
};

const updateEditor = async (req, res) => {
  try {
    let imgFile;
    let uploadPath;
    let data = req.body;

    if (req.files && req.files.imgFile) {
      imgFile = req.files.imgFile;
      let fileName = new Date().valueOf() + "." + imgFile.name.split(".").pop();

      uploadPath = config.editorsDir + "/" + fileName;

      await imgFile.mv(uploadPath);
      data.picture = fileName;
    }

    data = {
      ...data,
      updated_at: new Date(),
    };

    await Editor.update(data, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      message: "Success!",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: "Error!",
    });
  }
};

export default { listEditors, addEditor, updateEditor, editorById };

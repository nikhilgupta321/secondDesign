import { sequelize } from "../../config/config";
import { DataTypes } from "sequelize";

const Archive = sequelize.define('archives', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  doi: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  doistatus: {
    type: DataTypes.ENUM('enabled','disabled'),
    allowNull: false,
    defaultValue: 'enabled',
  },
  month: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  year: {
    type: DataTypes.STRING(4),
    allowNull: false,
  },
  publishdate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  refnumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  ptype: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  txnid: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  volume: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  issue: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  titlefont: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  authorname: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  authornamefont: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  abstract: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  abstractfont: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  keywords: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  file: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  supplementaryfile: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  country: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  pagenumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  status: {
    type: DataTypes.ENUM('enabled','disabled'),
    allowNull: false,
    defaultValue: 'enabled',
  },
  comment: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  mobile: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  editLimit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  mailstatus: {
    type: DataTypes.ENUM('send','not send','failed'),
    allowNull: false,
    defaultValue: 'not send',
  },
  certificatemailstatus: {
    type: DataTypes.ENUM('send','not send','failed'),
    allowNull: false,
    defaultValue: 'not send',
  },
  modifiedby: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  modification: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  createdby: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  creation: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  downloads: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  specialissue: {
    type: DataTypes.ENUM('Y','N'),
    allowNull: false,
    defaultValue: 'N',
  },
  conference: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
}, {
  sequelize,
  tableName: 'archives',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ]
});

export default Archive;

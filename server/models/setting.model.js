import { sequelize } from "../../config/config";
import { DataTypes } from "sequelize";

const Setting = sequelize.define(
  "settings",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    websitename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    websiteemail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    impactfactor: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    issn: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    whatsup_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    domain: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },
    allowed_ip: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    home_content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fee_rupee: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fee_dollar: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    short_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publication: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    formated_journal_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "settings",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
    ],
  }
);

export default Setting;

import { sequelize } from "../../config/config";
import { DataTypes } from "sequelize";

const Archive = sequelize.define(
  "Archive",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    year: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    published_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    reference_num: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    payment_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    txnid: {
      type: DataTypes.STRING(100),
      allowNull: true,
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
      allowNull: true,
    },
    author_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    abstract: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    file: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    page_num: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("enabled", "disabled"),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    edit_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    modified_by: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    }
   },
  {
    sequelize,
    tableName: "archives",
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

export default Archive;

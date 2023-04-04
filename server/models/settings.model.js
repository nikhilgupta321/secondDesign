import { sequelize } from "../../config/config";
import { DataTypes } from "sequelize";

const Settings = sequelize.define(
  "Settings",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    journal_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    journal_email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    impact_factor: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    rjif_link: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    issn: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    whatsapp_num: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    domain: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
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

export default Settings;
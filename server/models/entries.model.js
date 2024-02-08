const { DataTypes } = require("sequelize");
const { webdatadb } = require("../../config/config");

try {
  const Entries = webdatadb.define("entries", {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    urgent_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    urgentcolor: {
      type: DataTypes.ENUM("true", "false"),
      allowNull: true,
    },
    urgent2color: {
      type: DataTypes.ENUM("true", "false"),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status_color: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdby: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    trash: {
      type: DataTypes.ENUM("true", "false"),
      allowNull: true,
    },
  }, {
    webdatadb,
    tableName: "entries",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ],
      },
    ],
  });

  module.exports = Entries;
} catch (error) {
  console.error('Error defining Sequelize model:', error);
}



import { sequelize } from "../../config/config";
import { DataTypes } from "sequelize";

const Editor = sequelize.define('editors', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  subcategory: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  degree: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  post: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  phone: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  country: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  picture: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  status: {
    type: DataTypes.ENUM('enabled','disabled'),
    allowNull: false,
    defaultValue: 'enabled',
  },
  creation: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'editors',
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

export default Editor;
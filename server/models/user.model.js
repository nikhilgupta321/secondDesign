import { sequelize } from '../../config/config';
import { DataTypes } from 'sequelize';

const User = sequelize.define('users', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  status: {
    type: "SET('ENABLED','DISABLED','PENDING')",
    allowNull: false,
    defaultValue: 'ENABLED',
  },
  creation: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'users',
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

export default User
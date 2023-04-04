import { sequelize } from '../../config/config';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  otp: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  otp_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ip_lock: {
    type: DataTypes.ENUM('enabled', 'disabled'),
    allowNull: false
  },
  ip: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('enabled', 'disabled'),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: false
});

export default User
import { sequelize } from "../../config/config";
import { DataTypes } from "sequelize";

const Setting = sequelize.define('settings', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    websitename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    websiteemail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    fromname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    fromemail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    replyname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    replyemail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    impactfactor: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    issn: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    ugcnumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    ugcnumberstatus: {
      type: DataTypes.ENUM('enabled','disabled'),
      allowNull: false,
      defaultValue: 'disabled',
    },
    version: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    whatsup_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    whatsup_message: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    adsone: {
      type: DataTypes.ENUM('enabled','disabled'),
      allowNull: false,
      defaultValue: "enabled"
    },
    adstwo: {
      type: DataTypes.ENUM('enabled','disabled'),
      allowNull: false,
      defaultValue: 'enabled',
    },
    mailer: {
      type: DataTypes.ENUM('amazon','phpmailer'),
      allowNull: false,
      defaultValue: 'amazon',
    },
    extensions: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    signature: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    editorspicture: {
      type: DataTypes.ENUM('enabled','disabled'),
      allowNull: false,
      defaultValue: 'enabled',
    },
    publisher: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    boardphoto: {
      type: DataTypes.ENUM('enabled','disabled'),
      allowNull: false,
      defaultValue: 'enabled',
    },
    boardresume: {
      type: DataTypes.ENUM('enabled','disabled'),
      allowNull: false,
      defaultValue: 'enabled',
    },
    domain: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    allowed_ip: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'settings',
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

export default Setting;
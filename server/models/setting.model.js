import { sequelize } from "../../config/config";
import { DataTypes } from "sequelize";

const Setting = sequelize.define('settings', {
    settingsid: {
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
    certificateemail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
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
    phones: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    extensions: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    signaturestatus: {
      type: DataTypes.ENUM('EBABLED','DISABLED'),
      allowNull: false,
      defaultValue: 'ENABLED',
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
    frequency: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    monthly: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    domain: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
    },
    rjif_link: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
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
          { name: "settingsid" },
        ]
      },
    ]
  });

export default Setting;
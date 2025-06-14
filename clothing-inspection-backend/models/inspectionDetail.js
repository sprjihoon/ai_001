const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Inspection = require('./inspection');
const { ProductVariant } = require('./product');

const InspectionDetail = sequelize.define('InspectionDetail', {
  inspectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Inspection,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  productVariantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductVariant,
      key: 'id'
    }
  },
  totalQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  normalQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  defectQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  result: {
    type: DataTypes.ENUM('pass', 'fail'),
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'inspection_details'
});

Inspection.hasMany(InspectionDetail, { foreignKey: 'inspectionId' });
InspectionDetail.belongsTo(Inspection, { foreignKey: 'inspectionId' });

ProductVariant.hasMany(InspectionDetail, { foreignKey: 'productVariantId' });
InspectionDetail.belongsTo(ProductVariant, { foreignKey: 'productVariantId' });

module.exports = InspectionDetail; 
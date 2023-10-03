module.exports = (sequelize, DataTypes, Model) => {
    class Images extends Model {}
  
    Images.init(
      {
        image_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        property_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'property_listings',
            key: 'property_id',
          },
          allowNull: true,
        },
        image_url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        mimetype: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        originalname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        size: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "images",
        modelName: "images",
      }
    );

    Images.belongsTo(sequelize.models.property_listings , {
      foreignKey: "property_id",
      as: "property_listings",
    });
  
    return Images;
  };
  
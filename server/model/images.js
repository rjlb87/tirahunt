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
  
    return Images;
  };
  
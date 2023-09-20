module.exports = (sequelize, DataTypes, Model) => {
    class PropertyListing extends Model {}
  
    PropertyListing.init(
      {
        property_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          location: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
          },
          bedrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          bathrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          living_rooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
              min: 1,
              max: 5,
            },
          },
          property_type: {
            type: DataTypes.ENUM('House', 'Apartment', 'Bed Space'),
            allowNull: false,
          },
          image_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'images',
              key: 'image_id',
            },
            allowNull: false,
          },
        },
      {
        sequelize,
        tableName: "property_listings",
        modelName: "property_listings",
      }
    );
  
    PropertyListing.belongsTo(sequelize.models.images, {
        foreignKey: "image_id",
        as: "images",
      });
      PropertyListing.belongsTo(sequelize.models.users, {
        foreignKey: "user_id",
        as: "users",
      });
    
    return PropertyListing;
  };
  
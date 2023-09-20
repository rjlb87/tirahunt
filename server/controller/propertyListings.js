const { connect } = require("../config/db");

class PropertyListing {
  db = {};
  constructor() {
    this.db = connect();
  }

  async getAllProperty() {
    try {
      const user = await this.db.property.findAll(
        {
        order: [["property_id", "ASC"]],
        include: [
          {
            model: this.db.users,
            as: 'users',
            attributes: ['username']
          },
          {
            model: this.db.images,
            as: 'images',
            attributes: ['image_url']
          },
        ],
        }
      );
      return user;
    } catch (error) {
      console.log("Error", error);
    }
  }

  async createProperty(property) {

    try {
        const newProperty = await this.db.property.create(property);
        return newProperty;
      } catch (error) {
        throw error;
      }
    }

  async updateProperty(property) {
    let data = {}
    try {
      data = await this.db.property.update(
        {...property},
        {
          where: {
            property_id : property.property_id
          }
        }
      )
       return data
    } catch (error) {
      console.log('Error', error)
    }
  }
  async deleteProperty(property_id) {
    try {
      const deleteUser = await this.db.property.destroy(
        {
          where: { property_id }
        }
      )
    } catch (error) {
      console.log('Error', error)
    }
  }
}
module.exports = new PropertyListing();
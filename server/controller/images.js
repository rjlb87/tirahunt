const { connect } = require("../config/db");

class ImagesRepository {
  db = {};
  constructor() {
    this.db = connect();
  }

  async getImages() {
    try {
      const images = await this.db.images.findAll({
        order: [["image_id", "ASC"]],
      });
      return images;
    } catch (error) {
      console.error("Error", error);
    }
  }


  async getImagesByUser(image_id) {
    try {
      const images = await this.db.images.findAll({
        where : {
          image_id : image_id
        }
      })
      return images
    } catch (error) {
      console.error("Error", error);
    }
  }

  async upload(body, files) {
    try {
      const insertPromises = files.map(async (file, index) => {
        const { filename, mimetype, originalname, size } = file;
  
        // Create the image record
        const imageUploaded = await this.db.images.create({
          image_url: filename,
          mimetype,
          originalname,
          size,
        });
  
        if (body.propertyId) {
          // Assuming you have a function to find the property listing by ID
          const propertyListing = await this.db.property.findByPk(body.propertyId);
  
          if (propertyListing) {
            // Set the image_id in the property listing to associate it with the image
            await propertyListing.update({ image_id: imageUploaded.image_id });
          }
        }
  
        console.log(`Done ${index + 1}`);
        return imageUploaded;
      });
  
      const insertedImages = await Promise.all(insertPromises);
  
      // Respond once all images are inserted
      return "Successfully inserted";
    } catch (error) {
      console.error(error.message);
      throw error; // Rethrow the error to propagate it
    }
  }
  

}

module.exports = new ImagesRepository();

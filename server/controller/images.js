const { connect } = require("../config/db");

class ImagesRepository {
  db = {};
  constructor() {
    this.db = connect();
  }

  async images() {
    try {
        const images = await this.db.images.findAll({
          order: [['image_id', 'ASC']],
        });
        return images;
      } catch (error) {
        console.error('Error', error);
        throw error;
      }
  }

  async upload(body, files) {
    try {      
      const insertPromises = files.map(async (file, index) => {
        const {filename, mimetype, originalname, size } = file
        const fileData = { image_url: filename, mimetype, originalname, size, post_id: body.id} 

          const imageUploaded = await this.db.images.create(fileData)
          console.log(`Done ${index + 1}`);
          return imageUploaded;
      });

      const insertedImages = await Promise.all(insertPromises);

      // Respond once all images are inserted
      return "Successfully inserted"
  } catch (error) {
      console.error(error.message);
  }
}

}

module.exports = new ImagesRepository();

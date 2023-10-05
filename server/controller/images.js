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
        include: [
          {
            model: this.db.property,
            as: "property_listings",
            attributes: [
              "description",
              "location",
              "price",
              "bedrooms",
              "bathrooms",
              "living_rooms",
              "property_type",
            ],
            include: [
              {
                model: this.db.users,
                as: "users",
                attributes: ["username"],
              },
            ],
          },
        ],
      });
      return images;
    } catch (error) {
      console.error("Error", error);
    }
  }


  // async getImagesByUser(image_id) {
  //   try {
  //     const images = await this.db.images.findAll({
  //       where : {
  //         image_id : image_id
  //       }
  //     })
  //     return images
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // }

  async upload(body, files) {
    try {
      if (!files || !Array.isArray(files)) {
        // Handle the case where files is undefined or not an array
        throw new Error("Invalid files parameter");
      }
  
      const insertPromises = files.map(async (file, index) => {
        const { filename, mimetype, originalname, size } = file;
        const fileData = {
          image_url: filename,
          mimetype,
          originalname,
          size,
          property_id: body.property_id,
        };
  
        const imageUploaded = await this.db.images.create(fileData);
        console.log(`Done ${index + 1}`);
        return imageUploaded;
      });
  
      const insertedImages = await Promise.all(insertPromises);
  
      return "Successfully inserted";
    } catch (error) {
      console.error(error.message);
      // You may want to throw the error again to propagate it to the caller
      throw error;
    }
  }

  async updateImages(image_id) {
    let data = {}
    try {
      data = await this.db.images.update(
        {...image_id},
        {
          where: {
            image_id : image_id.image_id
          }
        }
      )
       return data
    } catch (error) {
      console.log('Error', error)
    }
  }
  async deleteImages(image_id) {
    try {
      const deleteImage = await this.db.images.destroy(
        {
          where: { image_id }
        }
      )
    } catch (error) {
      console.log('Error', error)
    }
  }
  
}

module.exports = new ImagesRepository();

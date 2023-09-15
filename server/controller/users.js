const { connect } = require("../config/db");
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../config/jwt')



class UserController {
  db = {};
  constructor() {
    this.db = connect();
  }

  async getAllusers() {
    try {
      const user = await this.db.users.findAll(
        {
        order: [["id", "ASC"]],
        // include: [
        //   {
        //     model: this.db.branch,
        //     as: 'branch',
        //     attributes: ['branch_code','branch_name']
        //   },
        // ],
        }
      );
      return user;
    } catch (error) {
      console.log("Error", error);
    }
  }

  async createUsers(users) {
    let userData = {}

    try {
      const password = users.password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      userData = {...users, password: hash}
      const createUser = await this.db.users.create(userData)
      return createUser;
    } catch (error) {
      console.log('Error', error)
    }
  }

  async updateUsers(users) {
    let data = {}
    try {
      data = await this.db.users.update(
        {...users},
        {
          where: {
            id : users.id
          }
        }
      )
       return data
    } catch (error) {
      console.log('Error', error)
    }
  }
  async deleteUsers(id) {
    try {
      const deleteUser = await this.db.users.destroy(
        {
          where: { id }
        }
      )
    } catch (error) {
      console.log('Error', error)
    }
  }

  async userlogin(users) {    
    try {
        const password = users.password

        const user = await this.db.users.findOne({
            where: {
                email: users.email,
            },
        })

        if (!user) {
            throw new Error('The user does not exist')
        } else {
            try {
                const passwordMatch = await bcrypt.compare(
                    password,
                    user.password
                )

                if (passwordMatch) {
                    const generatedToken = generateAccessToken({
                        email: users.email,
                    })
                    if (generatedToken) {
                        const verifiedUserData =
                            await this.db.users.findOne({
                                where: { id: user.id },
                            })

                        const generatedTokenObject = {
                            jwt: generatedToken,
                            // userRole: verifiedUserData.role_id,
                        }
                        const updatedData = [
                            generatedTokenObject,
                            // verifiedUserData,
                        ]

                        return updatedData
                    }
                } else {
                    throw new Error('The user password is incorrect')
                }
            } catch (error) {
                console.log('Error: ', error)
            }
        }
    } catch (error) {
        console.log('Error: ', error)
    }
}

}
module.exports = new UserController();
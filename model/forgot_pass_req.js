const mongoose = require("mongoose")

const Schema = mongoose.Schema

const forgetPassSchema = new Schema({
	userEmail: {
		type: String,
	},
	isactive: {
		type: Boolean		
	},
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("ForgotPassReq", forgetPassSchema)

// const ForgotPassReq = sequelize.define('forgot_pass_req', {

//     id: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         uniqe: true,
//         primaryKey: true
//     },

//     userEmail: Sequelize.STRING,

//     isactive: Sequelize.BOOLEAN
// })

// module.exports = ForgotPassReq

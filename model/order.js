
const mongoose = require("mongoose")


const Schema = mongoose.Schema

const orderSchema = new Schema({
	paymentId: {
		type: String,		
	},
    orderId: {
		type: String,	
		required: true	
	},
    status: {
		type: String,	
		required: true	
	},
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

})


module.exports = mongoose.model("Order", orderSchema)



// const Order = sequelize.define("order", {

// 	id: {
// 		type: Sequelize.INTEGER,
// 		allowNull: false,
// 		primaryKey: true,
// 		autoIncrement: true
// 	},

// 	paymentId: Sequelize.STRING,

// 	orderId: Sequelize.STRING,
	
// 	status: Sequelize.STRING
		


// });

// module.exports = Order;
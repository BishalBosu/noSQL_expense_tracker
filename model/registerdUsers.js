const mongoose = require("mongoose")


const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	totalAmount: {
		type: Number,
		required: true,
	},
	is_premium: {
		type: Boolean,
	},
	expenses: [
		{
			amount: {
				type: Number,
				required: true,
			},
			desc: {
				type: String,
				required: true,
			},
			type: {
				type: String,
				required: true,
			},
		},
	],
})

userSchema.methods.addItem = function (obj) {
	this.expenses.push(obj)
	return this.save()
}

userSchema.methods.deleteExpenseById = function (id) {
	const updatedExpenses = this.expenses.filter((expense) => {
		if(expense._id.toString() !== id.toString()){
			return true;
		}else{
			this.totalAmount -= expense.amount;
			return false;
		}

	})




	this.expenses = updatedExpenses;

	return this.save()
}

module.exports = mongoose.model("User", userSchema)

// const User = sequelize.define("user", {
// 	email: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 		primaryKey: true,
// 		unique: true,
// 	},
// 	name: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	},

// 	password: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 	},

// 	totalAmount: Sequelize.INTEGER,

// 	is_premium: Sequelize.BOOLEAN
// });

// module.exports = User

const User = require("../model/registerdUsers")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.postRegUsers = async (req, res, next) => {
	const email = req.body.email
	const name = req.body.name
	const password = req.body.password

	try {
		bcrypt.hash(password, 10, async (err, hash) => {
			if (err) console.log(err)
			const user = new User({
				email: email,
				name: name,
				password: hash,
				is_premium: false,
				totalAmount: 0,
				expenses: [],
			})
			const result = await user.save()
			//console.log(result);
			res.json(result)
		})
	} catch (err) {
		//indicating internal error
		res.status(500).json(err)
	}
}

exports.postLogIn = (req, res, next) => {
	let email = req.body.email
	const password = req.body.password

	User.findOne({ email: email })
		.then((user) => {
			//console.log(user.password);
			const hashed_password = user.password
			const name = user.name
			const is_premium = user.is_premium
			const _id = user._id

			bcrypt.compare(password, hashed_password, async (err, result) => {
				if (err) {
					email = "something went wrong"

					obj = {
						email,
					}
					return res.status(500).json(obj)
				}

				if (result) {
					const token = generateAcessToken(_id, email, name, is_premium)
					obj = {
						email,
						token,
					}
					return res.json(obj)
				} else {
					email = "password not matched"
					obj = {
						email,
					}
					return res.status(401).json(obj)
				}
			})
		})
		.catch((err) => {
			email = "not found"
			obj = {
				email,
			}
			return res.status(404).json(obj)
		})
}
//adding expenses
exports.postAddItem = async (req, res, next) => {
	const token = req.body.token

	const amount = req.body.amount
	const desc = req.body.desc
	const type = req.body.type

	try {
		const item = await req.user.addItem({
			amount: amount,
			desc: desc,
			type: type,
		})

		//returning last emlement pushed
		const len = item.expenses.length;
		res.json(item.expenses[len-1]);

		const newAmount = req.user.totalAmount + +amount
		req.user.totalAmount = newAmount

		req.user.save()
	} catch (err) {
		res.status(422).json({
			message:
				"Input length is not valid or some other internal error at adding expense",
			success: false,
		})
		console.log(err)
	}
}

exports.getAllItems = async (req, res, next) => {
	try {
		const expenses = await req.user.find().select("expenses")

		res.json(expenses)
	} catch (err) {
		console.log(err)
	}
}

exports.deleteItem = async (req, res, next) => {

	const id = req.params.itemId

	try {

		req.user.deleteExpenseById(id);
		
		return res.json({})
	} catch (err) {		
		console.log("LOWWWDLETE", err)
	}
}

function generateAcessToken(_id, email, name, is_premium) {
	return jwt.sign(
		{ _id: _id, userEmail: email, name: name, is_premium: is_premium },
		process.env.TOKEN_PRIVATE_KEY
	)
}

exports.getexpenselength = async (req, res, next) => {
	try {
		const userEmail = req.user.email
		const length = req.user.expenses.length;
		res.json(length)
	} catch (err) {
		console.log(err)
	}
}

exports.getPageDataOnly = async (req, res, next) => {
	const pageno = req.query.pageno;
	const pagelen = req.query.pagelen;
	try {
		const items = req.user.expenses;

		const start_index = (pageno - 1) * pagelen

		const item_sliced = items.slice(start_index, start_index + +pagelen)

		//console.log(item_sliced, pagelen);
		// let i = 1;

		res.json(item_sliced)
	} catch (err) {
		console.log(err)
	}
}

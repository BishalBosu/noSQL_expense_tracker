const Razorpay = require("razorpay")
const Order = require("../model/order")
const User = require("../model/registerdUsers")
const jwt = require("jsonwebtoken")


exports.buyPremium = async (req, res, next) => {
	try {
		var rzp = new Razorpay({
			key_id: process.env.RZP_KEY_ID,
			key_secret: process.env.RZP_KEY_SECRET,
		})
		const amount = 2500;

		rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
			if (err) {
				throw new Error(JSON.stringify(err))
			}
			try {
				const order101 = new Order({ orderId: order.id, status: "PENDING", userId: req.user })
				order101.save().then(result => {
					//console.log(result);
					//console.log('Created Order');
				  })
				  .catch(err => {
					console.log(err);
				  });;

				return res.status(201).json({ order, key_id: rzp.key_id })
			} catch (err) {
				console.log(err);
				//throw new Error(JSON.stringify(err))
			}
		})
	} catch (err) {
		console.log(err)
		res.status(403).json({ message: "Something broken", error: err })
	}
}

exports.updateTransaction = async (req, res, next) => {
	try {
		const { payment_id, order_id, name, email } = req.body
		//console.log("uptrans contr", req.body)

		const currOrder = await Order.findOneAndUpdate({ orderId: order_id }, { paymentId: payment_id, status: "SUCESSFUL" });

		await User.findByIdAndUpdate(req.user._id, { is_premium: true})

		// const values = await Promise.all([
		// 	Order.findOne({ orderId: order_id }),
		// 	req.user.update({ is_premium: true }),
		// ])

		// await values[0].update(
		// 	{ paymentId: payment_id, status: "SUCESSFUL" },
		// 	{ transaction: t }
		// )

		// await t.commit()

		return res.status(202).json({
			sucess: true,
			message: "Transaction Sucessfull!",
			token: generateAcessToken(req.user._id, email, name, true),
		})
	} catch (err) {
		console.log(err)
		res
			.status(403)
			.json({ message: "Something broken in updateTransaction", error: err })
	}

	
}

function generateAcessToken(_id, email, name, is_premium) {
	return jwt.sign(
		{ _id: _id, userEmail: email, name: name, is_premium: is_premium },
		process.env.TOKEN_PRIVATE_KEY
	)
}

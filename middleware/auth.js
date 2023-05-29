const jwt = require("jsonwebtoken")
const User = require("../model/registerdUsers")
require("dotenv").config()

exports.authenticate = async(req, res, next) => {
	try {
		const token = req.header("Authorization")
		//console.log("token: ",token);
		const user = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
		const userInstance = await User.findById(user._id);

		req.user = userInstance;
		//console.log(userInstance)
		next();
	} catch (err) {
		console.log(err)
		return res.status(401).json({ succ: false })
	}
}

exports.premiumAuthenticate = async(req, res, next) => {
	try {
		const token = req.header("Authorization")
		console.log(token);
		const user = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
		const userInstance = await User.findById(user._id);

        if(userInstance.is_premium){
            req.user = userInstance;
            //console.log(userInstance)
            next();
        }
        else{            
            return res.status(401).json({ message: "not a premium memmber", succ: false })
        }
		
	} catch (err) {
		console.log(err)
		return res.status(401).json({  message: "not authorized", succ: false })
	}
}


const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const DowUrlSchema = new Schema({
    fileurl: {
        type: String
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
    

})

module.exports = mongoose.model("DowUrl", DowUrlSchema)

// const DownloadUrl = sequelize.define('downloadurl', {
//     id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         autoIncrement:true,
//         uniqe: true,
//         primaryKey: true
//     },
//     fileurl: Sequelize.STRING
// })

// module.exports = DownloadUrl;
import mongoose from 'mongoose'

const votedSchema = mongoose.Schema({

    id: {
        type: String,
        required: [true, "Please enter an id"],
    }, ip_address: {
        type: String,
        required: [true, "please enter an ip_address"],
    },


})
const voted = mongoose.model("voted", votedSchema, "voted")
export default voted;
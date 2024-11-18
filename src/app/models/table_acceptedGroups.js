import mongoose,{model, models, Schema} from "mongoose";

const ActivitySchema = new Schema({
    name: String,
})

const AcceptedGroupSchema = new Schema({
    image: {type: String},
    name: {type: String},
    description: {type: String},
    category: {type: mongoose.Types.ObjectId},
    activity: {type:[ActivitySchema]},
    accepted: {type: Boolean, default: true},
    Accepted: {type: Boolean, default: false},
    email: { type: String, required: true},
}, {timestamps: true});

export const  AcceptedGroup = models?.AcceptedGroup ||  model("AcceptedGroup", AcceptedGroupSchema);
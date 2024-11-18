import mongoose,{model, models, Schema} from "mongoose";

const ActivitySchema = new Schema({
    name: String,
})

const RejectedGroupSchema = new Schema({
    image: {type: String},
    name: {type: String},
    description: {type: String},
    category: {type: mongoose.Types.ObjectId},
    activity: {type:[ActivitySchema]},
    accepted: {type: Boolean, default: false},
    rejected: {type: Boolean, default: true},
    email: { type: String, required: true},
}, {timestamps: true});

export const  RejectedGroup = models?.RejectedGroup ||  model("RejectedGroup", RejectedGroupSchema);
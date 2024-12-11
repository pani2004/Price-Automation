import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
 Make: { type: String, required: true },
 Model: { type: String, required: true },
 AvailableVariants: { type: String, required: true },
 Price: { type: String, required: true },
 WebsiteLink: { type: String, required: true }
},{timestamps:true});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
export default Vehicle;
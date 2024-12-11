import express from "express"
import { getVehicleData,feedVehicleData } from "../controllers/vehicleController.js"

const router = express.Router()

router.post("/feedVehicleData",feedVehicleData)
router.get("/getVehicleData",getVehicleData)

export default router
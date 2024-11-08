import express from "express"
import {signup,signout, signin} from "../controllers/authController.js"

const router = express.Router()
router.post('/signup',signup)
router.post('/signin',signin)
router.get('/signout',signout)

export default router
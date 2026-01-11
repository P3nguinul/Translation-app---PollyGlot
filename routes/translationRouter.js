import express from 'express'
import { translate } from '../controllers/translationController.js'

export const router = express.Router()

router.post('/', translate)
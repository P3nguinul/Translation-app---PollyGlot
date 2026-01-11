import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { router } from './routes/translationRouter.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/translate', router)

app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT)
}).on('error', (err) => {
  console.error('Failed to start server:', err)
}) 
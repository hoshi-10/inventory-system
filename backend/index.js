import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import express from 'express'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '.env') })

console.log('BILIBILI_COOKIE 是否加载:', !!process.env.BILIBILI_COOKIE)
import productsRouter from './routes/products.js'
import productsHistoryRouter from './routes/productsHistory.js'
import userProductsRouter from './routes/userProducts.js'
import usersRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import marketRouter from './routes/market.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/products', productsHistoryRouter)
app.use('/api/user-products', userProductsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/market', marketRouter)
app.listen(3000, () => {
  console.log('服务器启动：http://localhost:3000')
})
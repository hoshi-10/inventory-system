import express from 'express'
import { getProductHistory } from '../services/historyService.js'

const router = express.Router()

router.get('/:productId/history', async (req, res) => {
    try {
        const productId = req.params.productId

        const history = await getProductHistory(productId)

        res.json(history)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: '获取商品历史记录失败'
        })
    }
})

export default router
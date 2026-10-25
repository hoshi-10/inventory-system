import express from 'express'
import { getMarketProducts } from '../services/marketService.js'
import { upsertProduct, getProductByGoodsId } from '../services/productService.js'
import { createProductHistory } from '../services/historyService.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const data = await getMarketProducts()

        res.json(data)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: '获取魔力市场数据失败',
            biliStatus: error.response?.status,
            biliData: error.response?.data,
            errMsg: error.message
        })
    }
})

router.post('/sync', async (req, res) => {
    try {
        const data = await getMarketProducts()
        const list = data?.data?.list || []

        let created = 0
        let updated = 0
        let priceChanged = 0

        for (const product of list) {
            const oldProduct = await getProductByGoodsId(product.goods_id)
            const oldPrice = oldProduct ? oldProduct.current_price : null

            const result = await upsertProduct({
                ip: product.ip,
                goods_id: product.goods_id,
                name: product.name,
                image: product.image,
                link: product.link,
                current_price: product.current_price,
                active_count: product.active_count
            })

            if (result.created) {
                created++
            } else {
                updated++
            }

            if (oldPrice !== null && oldPrice !== product.current_price) {
                await createProductHistory(result.id, product.current_price, product.active_count)
                priceChanged++
            }
        }

        res.json({
            message: '同步完成',
            total: list.length,
            created,
            updated,
            priceChanged
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: '同步失败',
            errMsg: error.message
        })
    }
})

export default router
import { authMiddleware } from '../middleware/auth.js'
import express from 'express'
import {
    getUserProducts,
    createUserProduct,
    deleteUserProduct
} from '../services/userProductService.js'

const router = express.Router()

// GET /api/user-products?user_id=1
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user_id

        const products = await getUserProducts(userId)

        res.json(products)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: '获取关注商品失败'
        })
    }
})

// POST /api/user-products
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { product_id } = req.body
        const user_id = req.user.id
        const result = await createUserProduct(
            user_id,
            product_id
        )

        res.status(201).json({
            message: '关注商品成功',
            id: result.insertId
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: '关注商品失败'
        })
    }
})

// DELETE /api/user-products/:id
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.id
        const result = await deleteUserProduct(id, userId)

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: '关注记录不存在'
            })
        }

        res.json({
            message: '取消关注成功'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: '取消关注失败'
        })
    }
})

export default router
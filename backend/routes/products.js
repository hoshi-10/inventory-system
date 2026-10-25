import { authMiddleware } from '../middleware/auth.js'
import { adminMiddleware } from '../middleware/admin.js'
import express from 'express'
import { getProducts,createProduct, getProductById,updateProduct,deleteProduct} from '../services/productService.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
    const products = await getProducts()

    res.json(products)
    } catch (error) {
    console.error(error)

    res.status(500).json({
        message: '获取商品失败'
    })
    }
})

router.post('/', async (req, res) => {
    try {
        const product = await createProduct(req.body)

        res.status(200).json({
            message: '商品创建成功',
            product
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: '创建商品失败'
        })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const product = await getProductById(req.params.id)

        if (!product) {
            return res.status(404).json({
                message: '商品不存在'
            })
        }

        res.json(product)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: '获取商品失败'
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const result = await updateProduct(id, req.body)

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: '商品不存在'
            })
        }

        res.json({
            message: '商品修改成功'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: '修改商品失败'
        })
    }
})

router.delete('/:id',  
    authMiddleware,
    adminMiddleware,async (req, res) => {
    try {
        const id = req.params.id

        const result = await deleteProduct(id)

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: '商品不存在'
            })
        }

        res.json({
            message: '商品删除成功'
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: '删除商品失败'
        })
    }
})
export default router
import express from 'express'
import { authMiddleware } from '../middleware/auth.js'

import {
    getUsers,
    getUserById,
    createUser
} from '../services/userService.js'

const router = express.Router()

// GET /api/users
router.get('/', async (req, res) => {
    try {
        const users = await getUsers()

        res.json(users)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: '获取用户失败'
        })
    }
})

router.get('/me', authMiddleware, (req, res) => {
    res.json({
        message: 'Token验证成功',
        user: req.user
    })
})
// GET /api/users/:id
router.get('/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id)

        if (!user) {
            return res.status(404).json({
                message: '用户不存在'
            })
        }

        res.json(user)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: '获取用户失败'
        })
    }
})

// POST /api/users
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body

        const result = await createUser(username, password)

        res.status(201).json({
            message: '用户创建成功',
            id: result.insertId
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: '创建用户失败'
        })
    }
})

export default router
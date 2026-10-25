import express from 'express'
import { loginUser } from '../services/authService.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        const result = await loginUser(username, password)

        if (!result) {
            return res.status(401).json({
                message: '用户名或密码错误'
            })
        }

        res.json({
            message: '登录成功',
            token: result.token,
            user: result.user
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: '登录失败'
        })
    }
})

// 获取当前登录用户信息（前端启动时调用，恢复登录态）
router.get('/me', authMiddleware, (req, res) => {
    res.json({
        user: req.user
    })
})

export default router
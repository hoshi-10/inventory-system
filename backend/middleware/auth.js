import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
    try {
        // 获取 Authorization 请求头
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({
                message: '未登录'
            })
        }

        // Authorization: Bearer token
        const token = authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                message: 'Token不存在'
            })
        }

        // 验证 Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        // 把用户信息放进 req
        req.user = decoded

        // 继续执行后面的接口
        next()

    } catch (error) {
        console.error(error)

        return res.status(401).json({
            message: 'Token无效或已过期'
        })
    }
}
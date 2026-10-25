export function adminMiddleware(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            message: '没有管理员权限'
        })
    }

    next()
}
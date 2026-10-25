import pool from '../db/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// 用户登录
export async function loginUser(username, password) {

    const [rows] = await pool.query(
        `SELECT id, username, password, role
         FROM users
         WHERE username = ?`,
        [username]
    )

    if (rows.length === 0) {
        return null
    }

    const user = rows[0]

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    )

    if (!isPasswordCorrect) {
        return null
    }

    // 生成 JWT
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    )

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            role: user.role
        }
    }
}
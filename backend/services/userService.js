import pool from '../db/index.js'
import bcrypt from 'bcrypt'

// 获取所有用户
export async function getUsers() {
    const [rows] = await pool.query(
        'SELECT id, username, role, created_at FROM users'
    )

    return rows
}

// 获取单个用户
export async function getUserById(id) {
    const [rows] = await pool.query(
        'SELECT id, username, role, created_at FROM users WHERE id = ?',
        [id]
    )

    return rows[0]
}

// 创建用户
export async function createUser(username, password, role = 'user') {

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await pool.query(
        `INSERT INTO users
        (username, password, role)
        VALUES (?, ?, ?)`,
        [username, hashedPassword, role]
    )

    return result
}
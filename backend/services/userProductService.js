import pool from '../db/index.js'

// 获取用户关注的商品
export async function getUserProducts(userId) {
    const [rows] = await pool.query(
        `SELECT *
         FROM users_product
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
    )

    return rows
}

// 关注商品
export async function createUserProduct(userId, productId) {
    const [result] = await pool.query(
        `INSERT INTO users_product
        (user_id, product_id)
        VALUES (?, ?)`,
        [userId, productId]
    )

    return result
}

// 取消关注
export async function deleteUserProduct(id, userId) {
    const [result] = await pool.query(
        `DELETE FROM users_product
            WHERE id = ?
            AND user_id = ?`,
        [id, userId]
    )

    return result
}
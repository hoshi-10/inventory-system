import pool from '../db/index.js'

export async function getProductHistory(productId) {
    const [rows] = await pool.query(
        `SELECT *
         FROM products_history
         WHERE product_id = ?
         ORDER BY recorded_at ASC`,
        [productId]
    )

    return rows
}

export async function createProductHistory(productId, price, activeCount) {
    const [result] = await pool.query(
        `INSERT INTO products_history
        (product_id, price, active_count, recorded_at)
        VALUES (?, ?, ?, NOW())`,
        [productId, price, activeCount]
    )
    return result
}
import pool from '../db/index.js'

export async function getProducts() {
    const [rows] = await pool.query(
    'SELECT * FROM products'
    )

    return rows
}

export async function getProductByGoodsId(goods_id) {
    const [rows] = await pool.query(
        'SELECT * FROM products WHERE goods_id = ?',
        [goods_id]
    )
    return rows[0]
}

export async function upsertProduct(product) {
    const {
        ip,
        goods_id,
        name,
        image,
        link,
        current_price,
        active_count
    } = product

    const existing = await getProductByGoodsId(goods_id)

    if (existing) {
        await pool.query(
            `UPDATE products
            SET ip = ?,
                name = ?,
                image = ?,
                link = ?,
                current_price = ?,
                active_count = ?
            WHERE goods_id = ?`,
            [ip, name, image, link, current_price, active_count, goods_id]
        )
        return { created: false, id: existing.id }
    } else {
        const [result] = await pool.query(
            `INSERT INTO products
            (ip, goods_id, name, image, link, current_price, active_count)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [ip, goods_id, name, image, link, current_price, active_count]
        )
        return { created: true, id: result.insertId }
    }
}
export async function createProduct(product) {
    const {
        ip,
        goods_id,
        name,
        image,
        link,
        current_price,
        active_count
    } = product

    const [result] = await pool.query(
        `INSERT INTO products
        (ip, goods_id, name, image, link, current_price, active_count)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            ip,
            goods_id,
            name,
            image,
            link,
            current_price,
            active_count
        ]
    )
    return result
}
export async function getProductById(id) {
    const [rows] = await pool.query(
        'SELECT * FROM products WHERE id = ?',
        [id]
    )

    return rows[0]
}

export async function updateProduct(id, product) {
    const {
        ip,
        goods_id,
        name,
        image,
        link,
        current_price,
        active_count
    } = product

    const [result] = await pool.query(
        `UPDATE products
        SET ip = ?,
            goods_id = ?,
            name = ?,
            image = ?,
            link = ?,
            current_price = ?,
            active_count = ?
        WHERE id = ?`,
        [
            ip,
            goods_id,
            name,
            image,
            link,
            current_price,
            active_count,
            id
        ]
    )

    return result
}
export async function deleteProduct(id) {
    // 1. 先删除这个商品的历史记录
    await pool.query(
        'DELETE FROM products_history WHERE product_id = ?',
        [id]
    )

    // 2. 再删除商品
    const [result] = await pool.query(
        'DELETE FROM products WHERE id = ?',
        [id]
    )

    return result
}//暂时这么改，因为这个删除历史记录其实不好，因为历史记录是不能删除的，只能更新状态为删除，不然监控不起作用
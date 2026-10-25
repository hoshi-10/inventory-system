
const IP_NAMES = ['原神', '初音未来', '星穹铁道', '明日方舟', 'EVA', 'FGO', '宝可梦', '葬送的芙莉莲']
const SUFFIXES = ['手办', '徽章', '色纸', '亚克力立牌', '抱枕', '挂件', '海报', '设定集']

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

const productPool = []

function initProductPool() {
    for (let i = 1; i <= 20; i++) {
        const ip = IP_NAMES[(i - 1) % IP_NAMES.length]
        const suffix = SUFFIXES[(i - 1) % SUFFIXES.length]
        productPool.push({
            goods_id:i,
            name: ip + ' ' + suffix + ' #' + i,
            ip: ip,
            image: 'https://picsum.photos/seed/' + i + '/300/300',
            link: 'https://mall.bilibili.com/detail.html#' + i,
            base_price: randomInt(100, 2000) * 100,
            seller_name: '魔法师' + i + '号',
            seller_avatar: 'https://i.pravatar.cc/150?img=' + (i % 70)
        })
    }
}

function generateProduct(id) {
    if (productPool.length === 0) {
        initProductPool()
    }
    const base = productPool[id - 1]
    const fluctuation = randomInt(-5, 5)
    const price = Math.max(1000, base.base_price + Math.floor(base.base_price * fluctuation / 100))
    return {
        goods_id: base.goods_id,
        name: base.name,
        ip: base.ip,
        image: base.image,
        link: base.link,
        current_price: price,
        original_price: Math.floor(price * 1.2),
        active_count: randomInt(1, 50),
        seller_name: base.seller_name,
        seller_avatar: base.seller_avatar,
        status: randomItem(['on_sale', 'on_sale', 'on_sale', 'sold_out']),
        create_time: new Date(Date.now() - randomInt(1, 30) * 86400000).toISOString(),
        update_time: new Date().toISOString()
    }
}

export function mockMarketProducts() {
    const count = 20
    const list = Array.from({ length: count }, (_, i) => generateProduct(i + 1))

    return {
        success: true,
        code: 0,
        message: '',
        header: null,
        data: {
            list,
            total: count,
            has_more: false,
            next_id: ''
        }
    }
}
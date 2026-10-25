import { mockMarketProducts } from '../mock/marketMock.js'

export async function getMarketProducts() {
    console.log('返回 mock 数据')
    return mockMarketProducts()
}

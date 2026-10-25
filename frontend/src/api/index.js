import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000
})

export function getProducts() {
    return http.get('/products')
}

export function syncMarket() {
    return http.post('/market/sync')
}

export function getProductById(id) {
    return http.get(`/products/${id}`)
}

export function getProductHistory(productId) {
    return http.get(`/products/${productId}/history`)
}

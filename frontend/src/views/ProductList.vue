<template>
  <div class="product-list-page">
    <div class="page-header">
      <a-input-search
        v-model:value="keyword"
        placeholder="输入商品名或 IP"
        class="search-input"
        size="large"
        enter-button
        allow-clear
        @search="onSearch"
      />
    </div>

    <a-spin :spinning="loading">
      <a-row :gutter="[16, 16]">
        <a-col
          v-for="item in pagedList"
          :key="item.id"
          :xs="12"
          :sm="8"
          :md="6"
        >
          <a-card
            hoverable
            class="product-card"
            @click="goDetail(item.id)"
          >
            <template #cover>
              <img
                :src="item.image"
                :alt="item.name"
                class="product-image"
              />
            </template>
            <a-card-meta :title="item.name">
              <template #description>
                <div class="card-desc">
                  <span class="ip-tag">{{ item.ip }}</span>
                  <div class="price-row">
                    <span class="price">{{ item.current_price }} 魔力</span>
                    <span class="count">在售 {{ item.active_count }}</span>
                  </div>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>

      <div v-if="!loading && filteredList.length === 0" class="empty-box">
        <a-empty description="暂无商品" />
      </div>

      <div class="pagination-box" v-if="filteredList.length > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="filteredList.length"
          show-size-changer
          :page-size-options="['8', '12', '20']"
        />
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import axios from 'axios'

const router = useRouter()

const products = ref([])
const loading = ref(false)
const syncing = ref(false)
const keyword = ref('')
const currentPage = ref(1)
const pageSize = ref(8)

const searchOptions = computed(() => {
  if (!keyword.value) return []
  const kw = keyword.value.toLowerCase()
  const matched = products.value.filter(p =>
    (p.name && p.name.toLowerCase().includes(kw)) ||
    (p.ip && p.ip.toLowerCase().includes(kw))
  )
  return matched.slice(0, 8).map(p => ({
    value: p.name,
    label: `${p.name}  [${p.ip}]  ${p.current_price}魔力`
  }))
})

const filteredList = computed(() => {
  if (!keyword.value) return products.value
  const kw = keyword.value.toLowerCase()
  return products.value.filter(p =>
    (p.name && p.name.toLowerCase().includes(kw)) ||
    (p.ip && p.ip.toLowerCase().includes(kw))
  )
})

function onSelectKeyword(value) {
  keyword.value = value
  currentPage.value = 1
}

function onSearch() {
  currentPage.value = 1
}

const pagedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredList.value.slice(start, start + pageSize.value)
})

async function loadProducts() {
  loading.value = true
  try {
    const res = await axios.get('http://localhost:3000/api/products')
    products.value = res.data || []
  } catch (e) {
    message.error('获取商品失败')
  } finally {
    loading.value = false
  }
}

async function handleSync() {
  syncing.value = true
  try {
    const res = await axios.post('http://localhost:3000/api/market/sync')
    message.success(`同步完成:新增 ${res.data.created} 条,更新 ${res.data.updated} 条`)
    await loadProducts()
  } catch (e) {
    message.error('同步失败')
  } finally {
    syncing.value = false
  }
}

function goDetail(id) {
  router.push(`/detail/${id}`)
}

onMounted(loadProducts)
</script>

<style scoped>
.product-list-page {
  padding: 16px 24px;
}
.page-header {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}
.search-input {
  width: 560px;
  max-width: 92%;
}
.search-input :deep(.ant-input) {
  border-color: #e96958;
  box-shadow: none;
}
.search-input :deep(.ant-input:hover),
.search-input :deep(.ant-input:focus) {
  border-color: #d4584a;
}
.search-input :deep(.ant-input-search-button) {
  height: 40px;
}
.product-card {
  cursor: pointer;
  transition: all 0.3s;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(233, 105, 88, 0.2);
}
.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.card-desc {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ip-tag {
  display: inline-block;
  font-size: 12px;
  color: #e96958;
  background: #fff3ee;
  padding: 2px 8px;
  border-radius: 10px;
  width: fit-content;
}
.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price {
  color: #e96958;
  font-weight: bold;
  font-size: 16px;
}
.count {
  color: #999;
  font-size: 12px;
}
.empty-box, .pagination-box {
  text-align: center;
  margin-top: 32px;
}
:deep(.ant-btn-primary) {
  background: #e96958;
  border-color: #e96958;
}
</style>


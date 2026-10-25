<template>
  <div class="detail-page">
    <a-button class="back-btn" @click="router.back()">← 返回</a-button>

    <a-spin :spinning="loading">
      <a-row :gutter="[24, 24]" v-if="product">
        <a-col :xs="24" :md="10" class="left-col">
          <a-card hoverable class="image-card">
            <img :src="product.image" :alt="product.name" class="big-image" />
          </a-card>
        </a-col>

        <a-col :xs="24" :md="14">
          <a-card class="info-card">
            <h2 class="product-name">{{ product.name }}</h2>
            <a-tag color="#fff3ee" class="ip-tag">{{ product.ip }}</a-tag>
            <div class="price-big">{{ product.current_price }} <span class="unit">魔力</span></div>
            <div class="meta-row">
              <span>在售数量:{{ product.active_count }}</span>
              <span>商品 ID:{{ product.goods_id }}</span>
            </div>
            <a-button type="primary" :href="product.link" target="_blank" class="origin-btn">
              查看原商品
            </a-button>
          </a-card>

          <a-card title="价格走势" class="chart-card">
            <div v-show="hasHistory" ref="chartRef" class="chart-box"></div>
            <a-empty v-if="!hasHistory && !loading" description="暂无历史数据,同步市场后再来查看" />
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import axios from 'axios'
import * as echarts from 'echarts'

const route = useRoute()
const router = useRouter()

const product = ref(null)
const history = ref([])
const loading = ref(false)
const chartRef = ref(null)
let chart = null

const hasHistory = computed(() => history.value.length > 0)

async function loadDetail() {
  loading.value = true
  try {
    const [pRes, hRes] = await Promise.all([
      axios.get(`http://localhost:3000/api/products/${route.params.id}`),
      axios.get(`http://localhost:3000/api/products/${route.params.id}/history`)
    ])
    product.value = pRes.data
    history.value = (hRes.data || []).slice().reverse()
    await nextTick()
    renderChart()
  } catch (e) {
    message.error('加载商品详情失败')
  } finally {
    loading.value = false
  }
}

function renderChart() {
  if (!chartRef.value || history.value.length === 0) return
  if (!chart) chart = echarts.init(chartRef.value)
  chart.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: 60, right: 20, top: 30, bottom: 40 },
    xAxis: {
      type: 'category',
      data: history.value.map(h => h.recorded_at),
      axisLabel: { fontSize: 11 }
    },
    yAxis: { type: 'value', name: '魔力' },
    series: [{
      name: '价格',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 7,
      data: history.value.map(h => h.price),
      lineStyle: { color: '#e96958', width: 3 },
      itemStyle: { color: '#e96958' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(233,105,88,0.35)' },
          { offset: 1, color: 'rgba(233,105,88,0.02)' }
        ])
      }
    }]
  })
}

function handleResize() {
  chart && chart.resize()
}

onMounted(() => {
  loadDetail()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chart && chart.dispose()
})
</script>

<style scoped>
.detail-page {
  padding: 16px 24px;
}
.back-btn {
  margin-bottom: 16px;
}
.left-col {
  display: flex;
  flex-direction: column;
}
.image-card {
  flex: 1;
}
.image-card :deep(.ant-card-body) {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
}
.big-image {
  width: 100%;
  height: 100%;
  min-height: 320px;
  object-fit: cover;
  border-radius: 8px;
}
.info-card {
  margin-bottom: 16px;
}
.product-name {
  margin: 0 0 8px;
  font-size: 22px;
}
.ip-tag {
  color: #e96958;
  font-size: 13px;
  padding: 2px 10px;
  border: 1px solid #e96958;
  border-radius: 10px;
}
.price-big {
  margin: 14px 0 10px;
  font-size: 34px;
  font-weight: bold;
  color: #e96958;
}
.unit {
  font-size: 14px;
  font-weight: normal;
}
.meta-row {
  display: flex;
  gap: 24px;
  color: #888;
  font-size: 13px;
  margin-bottom: 16px;
}
.origin-btn {
  background: #e96958;
  border-color: #e96958;
}


.chart-box {
  width: 100%;
  height: 300px;
}
</style>

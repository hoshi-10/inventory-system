<script setup>
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
const router = useRouter()
// 点击“开始搜索”
function goToList() {
  router.push({ name: 'list' })
}
</script>

<template>
  <div class="home-page">
    <!-- 左边大卡片 -->
    <section class="hero-card">
      <div class="hero-content">
        
        <h1>
          智能商品监控系统
        </h1>
        <h2>
          搜索、分析与监控你关注的商品价格
        </h2>
        <p>
          查询商品当前价格、库存状态与历史价格变化，
          帮助你更方便地了解商品近期情况。
        </p>

        <div class="hero-buttons">
          <a-button
            type="primary"
            size="large"
            @click="goToList"
          >
            搜索商品
          </a-button>

          <a-button
            size="large"
            @click="goToList"
          >
            浏览商品列表
          </a-button>
        </div>
      </div>
      <!-- 左下角装饰 -->
      <div class="hero-decoration">
        <div class="decoration-circle"></div>
        <div class="decoration-box"></div>
        <div class="decoration-box small"></div>
      </div>
    </section>
    <!-- 右边 -->
    <section class="right-section">
      <!-- 商品搜索 -->
      <div class="info-card search-card">
        <div class="card-icon">
  <Icon icon="solar:magnifer-linear" />
</div>
        <div class="card-content">
          <h3>商品搜索</h3>
          <p>
            快速搜索商品名称、商品 ID，
            查看商品当前价格和库存状态。
          </p>
          <a-button
            type="link"
            @click="goToList"
          >
            前往商品列表 →
          </a-button>
        </div>
      </div>
      <!-- 使用说明 -->
      <div class="info-card">
        <div class="card-icon">
  <Icon icon="solar:document-text-linear" />
</div>
        <div class="card-content">
          <h3>使用说明</h3>
          <p>
            本系统旨在搜索商品，分析商品价格趋势，
            并提供商品关注功能。登录以享受更多个性化服务。
          </p>
        </div>
      </div>
      <!-- 登录后功能 -->
      <div class="info-card">
        <div class="card-icon">
  <Icon icon="solar:star-linear" />
</div>
        <div class="card-content">
          <h3>我的监控</h3>
          <p>
            登录后可以收藏商品，
            将感兴趣的商品加入监控列表。
          </p>
        </div>
      </div>
      <!-- 反馈通道 -->
      <div class="info-card">
       <div class="card-icon">
  <Icon icon="solar:chat-round-line-linear" />
</div>
        <div class="card-content">
          <h3>反馈</h3>
          <p>
            遇到问题或者想加入我们？联系hoshi！
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* =========================================================
   整个首页
   ========================================================= */
.home-page {
  width: 100%;
  min-height: calc(100vh - 64px);

  padding: 32px;

  box-sizing: border-box;

  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 32px;
 /* 粉橙渐变背景 */
  background: linear-gradient(135deg, #faf6f4 0%, #fddfd1e0 50%, #f7beaf 100%);
  /* 让左右两列高度一致 */
  align-items: stretch;
}

/* =========================================================
   左边大卡片
   ========================================================= */

.hero-card {
  position: relative;

  min-height: 650px;

  padding: 64px 56px;

  box-sizing: border-box;

  overflow: hidden;

  border: 1px solid #f4d8ce;
  border-radius: 32px;

  background: #ffffff;

  box-shadow:
    0 15px 40px rgba(190, 100, 80, 0.08);
}


/* =========================================================
   左边文字区域
   ========================================================= */

.hero-content {
  position: relative;
  z-index: 2;
}


/* 小标题
   如果你以后重新加回来可以直接使用 */
.small-title {
  display: inline-block;

  margin-bottom: 24px;

  padding: 8px 16px;

  border-radius: 20px;

  background: #fff1ed;

  color: #e96958;

  font-size: 14px;
  font-weight: 600;
}


/* 主标题 */

.hero-card h1 {
  margin: 0;

  color: #e96958;

  font-size: 52px;
  font-weight: 700;

  line-height: 1.2;

  letter-spacing: -1px;
}


/* 副标题 */

.hero-card h2 {
  margin: 12px 0 28px;

  color: #332b2a;

  font-size: 30px;
  font-weight: 700;

  line-height: 1.4;
}


/* 描述文字 */

.hero-card p {
  max-width: 520px;

  margin: 0;

  color: #817472;

  font-size: 17px;

  line-height: 2;
}


/* =========================================================
   左边按钮
   ========================================================= */

.hero-buttons {
  display: flex;

  gap: 14px;

  margin-top: 36px;
}


/* 所有首页按钮 */

.hero-buttons .ant-btn {
  height: 48px;

  padding: 0 28px;

  border-radius: 12px;

  font-size: 16px;

  box-shadow: none;
}


/* Ant Design 主按钮
   把默认蓝色改成粉橙色 */

:deep(.ant-btn-primary) {
  background: #e96958;
  border-color: #e96958;
}


/* 主按钮鼠标移入 */

:deep(.ant-btn-primary:hover) {
  background: #f17d6d !important;
  border-color: #f17d6d !important;
}


/* 主按钮点击 */

:deep(.ant-btn-primary:active) {
  background: #d95b4b !important;
  border-color: #d95b4b !important;
}


/* 普通按钮 */

.hero-buttons .ant-btn-default {
  color: #6f5d59;

  border-color: #e8cfc7;

  background: #ffffff;
}


/* 普通按钮鼠标移入 */

.hero-buttons .ant-btn-default:hover {
  color: #e96958;

  border-color: #e96958;

  background: #fff8f5;
}


/* =========================================================
   左下角装饰
   ========================================================= */

.hero-decoration {
  position: absolute;

  right: -80px;
  bottom: -80px;

  width: 330px;
  height: 330px;

  opacity: 0.9;

  pointer-events: none;
}


/* 大圆 */

.decoration-circle {
  position: absolute;

  width: 280px;
  height: 280px;

  border-radius: 50%;

  background: #fff0eb;
}


/* 第一个方块 */

.decoration-box {
  position: absolute;

  right: 50px;
  bottom: 20px;

  width: 150px;
  height: 100px;

  border-radius: 20px;

  background: #ffdcd2;

  transform: rotate(-8deg);
}


/* 第二个方块 */

.decoration-box.small {
  right: 90px;
  bottom: 80px;

  width: 100px;
  height: 70px;

  background: #ef735f;

  opacity: 0.85;

  transform: rotate(8deg);
}


/* =========================================================
   右边区域
   ========================================================= */

.right-section {
  display: flex;

  flex-direction: column;

  gap: 20px;
}


/* =========================================================
   右边每个卡片
   ========================================================= */

.info-card {
  flex: 1;

  display: flex;

  align-items: flex-start;

  gap: 24px;

  padding: 30px;

  box-sizing: border-box;

  border: 1px solid #f4d8ce;

  border-radius: 24px;

  background: #ffffff;

  box-shadow:
    0 10px 30px rgba(190, 100, 80, 0.06);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}


/* 卡片鼠标移入 */

.info-card:hover {
  transform: translateY(-3px);

  border-color: #efc6b9;

  box-shadow:
    0 14px 35px rgba(190, 100, 80, 0.10);
}


/* =========================================================
   卡片图标
   ========================================================= */

.card-icon {
  flex-shrink: 0;

  width: 64px;
  height: 64px;

  display: flex;

  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  border: 1px solid #f3cfc2;

  border-radius: 18px;

  background: #fff3ee;

  color: #e96958;

  font-size: 28px;
}


/* 如果你使用 Icon 组件 */

.card-icon :deep(svg) {
  width: 30px;
  height: 30px;
}


/* =========================================================
   卡片文字
   ========================================================= */

.card-content {
  flex: 1;

  min-width: 0;
}


/* 卡片标题 */

.card-content h3 {
  margin: 2px 0 10px;

  color: #332b2a;

  font-size: 23px;
  font-weight: 600;

  line-height: 1.4;
}


/* 卡片描述 */

.card-content p {
  margin: 0;

  color: #817472;

  font-size: 15px;

  line-height: 1.8;
}


/* =========================================================
   卡片里的链接按钮
   ========================================================= */

.card-content .ant-btn {
  padding-left: 0;

  color: #e96958;

  font-weight: 600;
}


/* 链接鼠标移入 */

.card-content .ant-btn:hover {
  color: #f17d6d;
}


/* =========================================================
   搜索卡片
   ========================================================= */

.search-card {
  min-height: 160px;
}


/* =========================================================
   右侧卡片中的普通 Ant Design 按钮
   ========================================================= */

:deep(.ant-btn-link) {
  color: #e96958;
}


:deep(.ant-btn-link:hover) {
  color: #f17d6d !important;
}


/* =========================================================
   Ant Design 输入框 / 选择框
   后面商品搜索页面也可以沿用这个颜色
   ========================================================= */

:deep(.ant-input:hover),
:deep(.ant-input:focus) {
  border-color: #e96958;
}


:deep(.ant-input:focus) {
  box-shadow: 0 0 0 2px rgba(233, 105, 88, 0.12);
}


/* =========================================================
   屏幕较小时
   ========================================================= */

@media (max-width: 1100px) {

  .home-page {
    grid-template-columns: 1fr 1fr;

    gap: 24px;

    padding: 24px;
  }

  .hero-card {
    padding: 48px 40px;
  }

  .hero-card h1 {
    font-size: 44px;
  }

  .hero-card h2 {
    font-size: 26px;
  }

  .info-card {
    padding: 24px;

    gap: 18px;
  }

}


/* =========================================================
   手机 / 小屏幕
   ========================================================= */

@media (max-width: 900px) {

  .home-page {
    grid-template-columns: 1fr;

    padding: 20px;
  }

  .hero-card {
    min-height: 500px;

    padding: 48px 36px;
  }

  .hero-card h1 {
    font-size: 42px;
  }

  .hero-card h2 {
    font-size: 25px;
  }

}


/* =========================================================
   更小的手机屏幕
   ========================================================= */

@media (max-width: 600px) {

  .home-page {
    padding: 14px;

    gap: 16px;
  }

  .hero-card {
    min-height: 460px;

    padding: 36px 24px;

    border-radius: 24px;
  }

  .hero-card h1 {
    font-size: 36px;
  }

  .hero-card h2 {
    font-size: 22px;

    margin-bottom: 20px;
  }

  .hero-card p {
    font-size: 15px;

    line-height: 1.8;
  }


  .hero-buttons {
    flex-direction: column;

    align-items: stretch;

    margin-top: 28px;
  }


  .hero-buttons .ant-btn {
    width: 100%;
  }


  .info-card {
    padding: 22px;

    gap: 16px;

    border-radius: 20px;
  }


  .card-icon {
    width: 52px;
    height: 52px;

    border-radius: 15px;
  }


  .card-icon :deep(svg) {
    width: 25px;
    height: 25px;
  }


  .card-content h3 {
    font-size: 20px;
  }


  .card-content p {
    font-size: 14px;
  }

}
</style>
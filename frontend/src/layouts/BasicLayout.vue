<template>
<div id="basicLayout">
  <a-layout style="min-height: 100vh">
    <a-layout-header class="header">
      <GlobalHeader />
    </a-layout-header>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
    <a-layout-footer class="footer" style="text-align: center">
      商品监控 by hoshi
    </a-layout-footer>
  </a-layout>
  </div>
</template>

<script setup>
import GlobalHeader from "@/components/GlobalHeader.vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
#basicLayout .footer {
background-color: #fff;
height: 48px; 
padding: 12px 20px;
font-size: 13px; 
text-align: center; 

}
#basicLayout .content {
background: linear-gradient(180deg, #F5F5F5 0%, #E5E5E5 100%);
}
#basicLayout .header {
padding-inline: 20px;

background-color: #fff;
}
</style>
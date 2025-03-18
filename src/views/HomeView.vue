<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute();

// 判斷當前是否在 /docs
const isDocs = computed(() => route.path === '/docs');

// 設定按鈕的目標路由
const buttonText = computed(() => (isDocs.value ? '🏠 回首頁' : '📄 文本'));
const buttonLink = computed(() => (isDocs.value ? '/' : '/docs'));
</script>

<template>
  <div class="container">
    <div class="timeline">
      <nav>
        <!-- 單一按鈕，根據當前頁面變更內容 -->
        <RouterLink :to="buttonLink" class="toggle-button">
          {{ buttonText }}
        </RouterLink>
      </nav>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.toggle-button {
  display: inline-block;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

.toggle-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}
</style>

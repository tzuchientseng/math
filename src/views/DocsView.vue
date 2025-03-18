<template>
  <div class="docs-container">
    <!-- 懸浮「回首頁」按鈕 -->
    <RouterLink to="/" class="floating-home-button">
      🏠
    </RouterLink>

    <!-- 內容區塊：嵌入 iframe -->
    <iframe class="fullscreen" src="/docs/index.html"></iframe>
  </div>
</template>

<style scoped>
.docs-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

/* 讓 iframe 填滿整個畫面 */
.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  border: none;
}

/* 懸浮「回首頁」按鈕 */
.floating-home-button {
  position: fixed;
  top: 20px;
  left: 20px;
  background: #ffcc00;
  color: black;
  padding: 10px 15px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* 確保按鈕在最上層 */
}

.floating-home-button:hover {
  background: #ffaa00;
}
</style>

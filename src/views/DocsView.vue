<template>
  <div class="docs-container">
    <iframe class="fullscreen" src="/docs/index.html"></iframe>
  </div>
</template>

<style scoped>
.docs-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  border: none;
}
</style>

<script setup lang="ts">
const openDocs = () => {
  window.open('/docs', '_blank');
};
</script>

<template>
  <div class="container">
      <nav class="button-container">
        <button @click="openDocs" class="docs-button">
          📄 教學筆記
        </button>
        <button class="topic-button">
          🎯 題目整理
        </button>
      </nav>
      <RouterView />
  </div>
</template>

<style scoped>
.container {
  margin-top: 20%;
}

.docs-button,
.topic-button {
  display: inline-block;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.docs-button {
  background-color: #007bff;
  color: white;
}

.docs-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.topic-button {
  background-color: #28a745;
  color: white;
}

.topic-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.button-container {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 1024px) {
  .button-container {
    justify-content: center;
  }

  .docs-button,
  .topic-button {
    width: 45%;
    min-width: 140px;
    text-align: center;
  }
}

@media (max-width: 600px) {
  .button-container {
    flex-direction: column;
    align-items: center;
  }

  .docs-button,
  .topic-button {
    width: 100%;
    text-align: center;
  }
}
</style>

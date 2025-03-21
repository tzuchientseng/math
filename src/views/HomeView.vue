<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();
const showLoginPrompt = ref(false);

const handleDocsClick = () => {
  if (authStore.isAuthenticated) {
    window.open('/docs', '_blank');
  } else {
    showLoginPrompt.value = true;
  }
};

const handleTopicClick = () => {
  if (authStore.isAuthenticated) {
    router.push('/topics');
  } else {
    showLoginPrompt.value = true;
  }
};

const goToLogin = () => {
  showLoginPrompt.value = false;
  router.push('/login');
};
</script>


<template>
  <div class="container">
      <nav class="button-container">
        <button @click="handleDocsClick" class="docs-button">
          📄 教學筆記
        </button>
        <button @click="handleTopicClick" class="topic-button">
          🎯 題目整理
        </button>
      </nav>
      <RouterView />
  </div>

  <div v-if="showLoginPrompt" class="modal">
    <div class="modal-content">
        <p>請先登入才能使用此功能</p>
        <button @click="goToLogin">前往登入</button>
        <button @click="showLoginPrompt = false">關閉</button>
    </div>
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

/* Modal 樣式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.modal-content p { 
  color: black;
}

.modal-content button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.modal-content button:first-of-type {
  background-color: #007bff;
  color: white;
}

.modal-content button:last-of-type {
  background-color: #ccc;
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

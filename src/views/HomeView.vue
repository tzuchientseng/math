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

const handleVideoClick = () => {
  if (authStore.isAuthenticated) {
    window.open('/video', '_blank');
  } else {
    showLoginPrompt.value = true;
  }
}

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
        <button @click="handleVideoClick" class="video-button">
          🎥 教學錄影
        </button>
      </nav>
      <RouterView />
  </div>

  <!-- Modal 彈窗 -->
  <div v-if="showLoginPrompt" class="modal" @click.self="showLoginPrompt = false">
    <div class="modal-content">
      <button class="close-btn" @click="showLoginPrompt = false">&times;</button>
      <p>請先登入才能開啟</p>
      <div class="modal-buttons">
        <button @click="goToLogin" class="confirm-btn">👉 前往登入</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Noto Sans TC", "Poppins", sans-serif;
  letter-spacing: 0.5px;
}

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

.video-button {
  border: none;
  padding: 1px 4px;
  border-radius: 10px;
}

.video-button:hover {
  background-color: gray;
  transform: scale(1.05);
}

.button-container {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

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
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  width: 220px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-in-out;
}

.modal-content p {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 4px;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  color: #777;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #333;
}

.modal-buttons {
  display: flex;
  justify-content: center;
}

.confirm-btn {
  background-color: #d39308;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s ease-in-out;
}

.confirm-btn:hover {
  background-color: #b94e06;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
}
</style>

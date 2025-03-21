<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const account = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true

  const result = await authStore.login(account.value, password.value);
  if (!result.success) {
    errorMessage.value = result.message ?? '登入失敗';
  }

  isLoading.value = false
};

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<template>
  <div class="auth-container">
    <!-- Login Page -->
    <template v-if="authStore.isAuthenticated">
      <div class="user-info">
        <img :src="authStore.user?.avatar" alt="Avatar" class="avatar" />
        <span>{{ authStore.getUserName }}</span>
        <button @click="handleLogout">登出</button>
      </div>
    </template>

    <!-- Logout Page -->
    <template v-else>
      <div class="login-box">
        <form @submit.prevent="handleLogin">
          <input v-model="account" type="text" placeholder="帳號" autocomplete="username" required />
          <input v-model="password" type="password" placeholder="密碼" autocomplete="current-password" required />
          <button type="submit">
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>登入</span>
          </button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  color: #ffcc00;
}

.login-box {
  background: #1e1e1e;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
}

.user-info {
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1e1e1e;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background: #2a2a2a;
  color: white;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background: #ffcc00;
  color: black;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
}

button:hover {
  background: #ffdd44;
}

.error-message {
  color: white;
  margin-top: 10px;
}

.spinner {
  display: inline-block;
  width: 17px;
  height: 17px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-height: 1000px) {
.auth-container {
  height: 50vh;
}
}
</style>

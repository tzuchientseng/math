<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { computed } from 'vue'
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
const route = useRoute();
// const showHeader = computed(() => route.path !== '/video');
const showHeader = computed(() => route.path !== '/docs' && route.path !== '/video');
</script>

<template>
  <header v-if="showHeader">
    <img alt="Math logo" class="logo" src="@/assets/logo.png" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="數學筆記" />
      <nav>
        <RouterLink to="/">主頁</RouterLink>
        <RouterLink to="/about">關於</RouterLink>
        <!-- <RouterLink to="/login">
          <span v-if="authStore.isAuthenticated">登出</span>
          <span v-else>登入</span>
        </RouterLink> -->
        <RouterLink
        :to="authStore.isAuthenticated ? '/' : '/login'"
        @click="authStore.isAuthenticated ? authStore.logout() : null"
        :class="authStore.isAuthenticated ? 'logout-button' : 'login-button'"
        >
        {{ authStore.isAuthenticated ? '登出' : '登入' }}
      </RouterLink>
    </nav>

    <div v-if="authStore.isAuthenticated" class="user-info">
      <span>Hi~ {{ authStore.getUserName }}!</span>
      <img :src="authStore.user?.avatar" alt="User Avatar" class="user-avatar">
    </div>
  </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none;
  color: var(--color-text);
  transition: color 0.3s ease;
}

/* nav a.router-link-exact-active {} */
nav a.router-link-exact-active:not(.logout-button):not(.login-button) {
  color: gold;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
  color: gold;
}

nav a:first-of-type {
  border: 0;
}

.logout-button {
  color: white;
  background-color: #dc3545;
  padding: 4px 12px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #c82333;
}

.login-button {
  color: white;
  background-color: #007bff;
  padding: 4px 12px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.user-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

</style>

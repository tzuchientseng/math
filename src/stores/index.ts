import { defineStore } from 'pinia'

// const API_URL = 'https://home.sunnytseng.com/api/math-api/token/'
const API_URL = 'api/math-api/token/';

interface User {
  name: string;
  account: string;
  avatar: string;
  token: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUserName: (state) => state.user?.name ?? 'Guest',
  },

  actions: {
    async login(account: string, password: string) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ account, password }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();

        // { token: "abcd1234", name: "John Doe", account: "john123", avatar: "avatar.png" }

        const user: User = {
          name: data.name,
          account: data.account,
          avatar: data.avatar,
          token: data.token,
        };

        this.setUser(user);
        return { success: true };
      } catch (error) {
        if (error instanceof Error) {
          console.error('Login error:', error.message);
          return { success: false, message: error.message };
        } else {
          console.error('Unknown error:', error);
          return { success: false, message: 'An unknown error occurred' };
        }
      }
    },

    setUser(user: User) {
      this.user = user;
      this.token = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token || '');
    },

    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});


// <script setup lang="ts">
// import { useAuthStore } from '@/stores/auth';

// const authStore = useAuthStore();

// // Set user data
// authStore.setUser({ name: 'John Doe', account: 'john123', avatar: 'avatar.png', token: 'abcd1234' });

// // Log out user
// authStore.logout();
// </script>

// <template>
//   <div>
//     <h2>Welcome, {{ authStore.getUserName }}</h2>
//     <p v-if="authStore.isAuthenticated">You are logged in.</p>
//     <p v-else>Please log in.</p>
//   </div>
// </template>

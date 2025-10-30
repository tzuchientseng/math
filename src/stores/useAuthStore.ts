import { defineStore } from 'pinia'

// const API_URL = 'https://sunnytseng.com/api/math-api/token/' // `npm run deploy`
const API_URL = 'api/math-api/token/';

interface User {
  name: string
  account: string
  avatar: string
  token: string | null
}

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: JSON.parse(sessionStorage.getItem('user') || 'null'),
    token: sessionStorage.getItem('token') || null,
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
          body: JSON.stringify({
            username: account,
            password: password,
          }),
        })

        if (!response.ok) {
          throw new Error('Login failed')
        }

        const data = await response.json()

        const user: User = {
          name: data.name,
          account: data.account,
          avatar: data.avatar,
          token: data.access,
        }

        this.setUser(user)
        return { success: true }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Login error:', error.message)
          return { success: false, message: error.message }
        } else {
          console.error('Unknown error:', error)
          return { success: false, message: 'An unknown error occurred' }
        }
      }
    },

    setUser(user: User) {
      this.user = user
      this.token = user.token
      sessionStorage.setItem('user', JSON.stringify(user))
      sessionStorage.setItem('token', user.token || '')
    },

    setToken(token: string) {
      this.token = token
      sessionStorage.setItem('token', token)
    },

    logout() {
      this.user = null
      this.token = null
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
    },
  },
})

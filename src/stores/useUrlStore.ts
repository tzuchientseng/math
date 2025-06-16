import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './useAuthStore'

// const API_URL = 'https://home.sunnytseng.com/api/math-api/fetchUrl/' // `npm run deploy`
const API_URL = 'api/math-api/fetchUrl/';


export const useUrlStore = defineStore('url', () => {
  const urls = ref<string[]>([]);

  const fetchUrl = async () => {

    const authStore = useAuthStore()

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) throw new Error('Fetch Failed')

      const data = await response.json()
      urls.value = Array.isArray(data.url) ? data.url : []

    } catch (error) {
      console.error('Error fetching URL:', error)
    }
  }


  return {
    urls,
    fetchUrl,
  }
})

/*
// stores/useUrlStore.ts
import { defineStore } from 'pinia'

export const useUrlStore = defineStore('url', {
  state: () => ({
    url: '' as string
  }),

  getters: {
    getUrl: (state) => state.url
  },

  actions: {
    async fetchUrl() {
      try {
        const response = await fetch('https://api.example.com/your-endpoint')
        const data = await response.json()
        this.url = data.url // 依據你的 API 結構調整
      } catch (error) {
        console.error('Failed to fetch URL:', error)
      }
    }
  }
})
*/


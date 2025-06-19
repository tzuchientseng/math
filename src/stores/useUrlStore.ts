import { defineStore } from 'pinia'
import { useAuthStore } from './useAuthStore'

// const API_URL = 'https://home.sunnytseng.com/api/math-api/fetchUrl/' // `npm run deploy`
const API_URL = 'api/math-api/fetchUrl/'

export const useUrlStore = defineStore('url', {
  state: () => ({
    urls: [] as string[],
    loading: false,
  }),

  /* Using Closure
    state: () => {
      const urls: string[] = [];
      return {
        urls,
      };
    }
  */

  getters: {
    hasUrls: (state) => state.urls.length > 0,
  },

  actions: {
    async fetchUrl(grade: number) {
      const authStore = useAuthStore()
      this.loading = true

      try {
        const response = await fetch(`${API_URL}?grade=${grade}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authStore.token ?? ''}`,
            'Content-Type': 'application/json',
          }
        })

        if (!response.ok) throw new Error('Fetch Failed')

        const data = await response.json()
        this.urls = Array.isArray(data.url) ? data.url : []
      } catch (error) {
        console.error('Error fetching URL:', error)
        this.urls = []
      } finally {
        this.loading = false
      }
    }
  }
})

/*
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './useAuthStore'

// const API_URL = 'https://home.sunnytseng.com/api/math-api/fetchUrl/' // `npm run deploy`
const API_URL = 'api/math-api/fetchUrl/';

export const useUrlStore = defineStore('url', () => {
  const urls = ref<string[]>([])
  const loading = ref(false)

  const fetchUrl = async (grade: number) => {
    const authStore = useAuthStore()
    loading.value = true

    try {
      const response = await fetch(`${API_URL}?grade=${grade}`, {
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
      urls.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    urls,
    loading,
    fetchUrl,
  }
})
*/


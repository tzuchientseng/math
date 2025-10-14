import { defineStore } from 'pinia'
import { useAuthStore } from './useAuthStore'

// const API_URL = 'https://sunnytseng.com/api/math-api/fetchUrl/' // `npm run deploy`
const API_URL = 'api/math-api/fetchUrl/'

interface Video {
  title: string
  url: string
  grade: number
}

export const useUrlStore = defineStore('url', {

  state: () => ({
    videos: [] as Video[],
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
    hasVideos: (state) => state.videos.length > 0,
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
        this.videos = Array.isArray(data.videos) ? data.videos : []
      } catch (error) {
        console.error('Error fetching URL:', error)
        this.videos = []
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

interface Video {
  title: string
  url: string
  grade: number
}

export const useUrlStore = defineStore('url', () => {
  const videos = ref<Video[]>([])
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
      videos.value = Array.isArray(data.videos) ? data.videos : []
    } catch (error) {
      console.error('Error fetching videos:', error)
      videos.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    videos,
    loading,
    fetchUrl,
  }
})
*/


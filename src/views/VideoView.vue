<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useUrlStore } from '@/stores/useUrlStore'

const urlStore = useUrlStore()
const selectedGrade = ref<number | null>(null)

watch(selectedGrade, (newGrade) => {
  if (newGrade !== null) {
    urlStore.fetchUrl(newGrade)
  }
})

onMounted(() => {
  if (selectedGrade.value !== null) {
    urlStore.fetchUrl(selectedGrade.value)
  }
})

function getEmbedUrl(youtubeUrl: string): string {
  const videoIdMatch = youtubeUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  const videoId = videoIdMatch ? videoIdMatch[1] : ''
  return `https://www.youtube.com/embed/${videoId}`
}
</script>

<template>
  <div class="container">
    <div class="video-selector">
      <h1>🎬 各年級影片</h1>

      <label for="gradeSelect" class="form-label">🎓 選擇年級</label>
      <select id="gradeSelect" class="form-select" v-model="selectedGrade">
        <option disabled value="">請選擇年級</option>
        <option value="0">培訓試教</option>
        <!-- <option value="3">三年級</option> -->
        <!-- <option value="4">四年級</option> -->
        <!-- <option value="5">五年級</option> -->
        <option value="6">六年級</option>
      </select>
    </div>

    <div v-if="selectedGrade === null" class="text-center mt-3">
      未選擇年級 ~
    </div>

    <div v-else-if="urlStore.loading" class="text-info text-center mt-3">
      ...正在載入
      <span v-if="selectedGrade == 0">試教</span>
      <span v-else>{{ selectedGrade }}</span>
      年級的影片資料...
    </div>

    <transition name="fade">
      <div v-if="!urlStore.loading && selectedGrade !== null" class="video-grid-container">
        <div v-if="urlStore.hasVideos" class="video-grid">
          <div v-for="video in urlStore.videos" :key="video.url" class="video-card">
            <div class="text-end">
              <span v-if="video.grade !== 0" class="badge bg-primary rounded-pill">
                {{ video.grade }} 年級
              </span>
            </div>
            <div class="video-content">
              <div class="fw-bold text-center mt-2">{{ video.title }}</div>
              <div class="video-preview">
                <iframe
                  :src="getEmbedUrl(video.url)"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
              <div class="text-center">
                <a :href="video.url" target="_blank">👉 Click to watch on YouTube</a>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-danger text-center mt-3">
          ❗ 查無 {{ selectedGrade }} 年級的影片資料。
        </div>

        <div v-if="urlStore.errorMessage" class="text-danger text-center mt-3">
          {{ urlStore.errorMessage }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.container {
  color: black;
  max-width: 1200px; /* 提升容器寬度 */
  margin: 0 auto;
  padding: 1rem;
  padding-top: 7rem; /* 預留fixed selector空間 */
}

/* Fixed selector */
.video-selector {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  background: #fff;
  border-radius: 12px;
  z-index: 1000;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Video Grid */
.video-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 992px) {
  .video-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.video-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-card:hover {
  /* transform: translateY(-5px); */
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Badge */
.badge {
  font-size: 1rem;
  padding: 0.5em 0.8em;
}

/* Video Content */
.video-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-preview {
  position: relative;
  width: 120%;
  padding-top: 100%;
  margin: 1rem 0;
}

.video-preview iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  border: 0;
}

/* Link Styling */
.video-card a {
  word-break: break-word;
  text-decoration: none;
  color: #007bff;
}

.video-card a:hover {
  text-decoration: underline;
}
</style>

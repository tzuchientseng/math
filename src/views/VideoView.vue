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
  <div>
    <div>
      <div class="video-selector container-fluid">
        <h1>🎬 各年級影片</h1>

        <div>
          <label for="gradeSelect" class="form-label">🎓 選擇年級</label>
          <select id="gradeSelect" class="form-select" v-model="selectedGrade">
            <option disabled value="">請選擇年級</option>
            <!-- <option value="3">三年級</option> -->
            <!-- <option value="4">四年級</option> -->
            <!-- <option value="5">五年級</option> -->
            <option value="6">六年級</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="selectedGrade === null" class="">
      未選擇年級 ~
    </div>

    <div v-else-if="urlStore.loading" class="text-info">
      ...正在載入 {{ selectedGrade }} 年級的影片資料...
    </div>

    <transition name="fade">
      <div v-if="!urlStore.loading && selectedGrade !== null">
        <ol v-if="urlStore.hasVideos" class="list-group list-group-numbered">
        <li
          v-for="video in urlStore.videos"
          :key="video.url"
          class="list-group-item"
        >
        <div class="text-end">
          <span class="badge bg-primary rounded-pill">
            {{ video.grade }} 年級
          </span>
        </div>
        <div class="video-content">
          <div class="fw-bold text-center">{{ video.title }}</div>
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
          <hr class="w-75 mx-auto my-4 border border-dark border-2 opacity-50">
          </div>
        </li>
        </ol>

        <div v-else class="text-danger">
          ❗ 查無 {{ selectedGrade }} 年級的影片資料。
        </div>

        <div v-if="urlStore.errorMessage" class="text-danger mt-3">
          {{ urlStore.errorMessage }}
        </div>
      </div>
    </transition>

  </div>

</template>

<style scoped>
.video-selector {
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (min-width: 992px) {
  .video-selector {
    position: fixed;
    top: 4%;
    left: 10%;
    width: 80%;
    z-index: 1000;
  }

  .video-placeholder {
    height: 250px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 超連結樣式 */
.list-group-item a {
  word-break: break-word;
  text-decoration: none;
}

.list-group-item a:hover {
  text-decoration: underline;
}

/* 標籤 badge 樣式 */
.badge {
  font-size: 0.9rem;
  padding: 0.5em 0.75em;
}

/* 限制列表最大高度，出現滾動條 */
.list-group-numbered {
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
}

/* WebKit 滾軸樣式 */
.list-group-numbered::-webkit-scrollbar {
  width: 8px;
}

.list-group-numbered::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}

.list-group-numbered::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 4px;
  border: 2px solid #f0f0f0;
}

.list-group-numbered::-webkit-scrollbar-thumb:hover {
  background-color: #666;
}

/* Firefox 滾軸樣式 */
@supports (scrollbar-color: auto) {
  .list-group-numbered {
    scrollbar-width: thin;
    scrollbar-color: #999 #f0f0f0;
  }
}

.video-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-preview {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
}

.video-preview iframe {
  width: 100%;
  max-width: 480px;
  height: 270px;
  border-radius: 12px;
}

</style>


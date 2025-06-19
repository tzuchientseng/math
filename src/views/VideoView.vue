<script setup>
import { ref, watch, onMounted } from 'vue'
import { useUrlStore } from '@/stores/useUrlStore'

const urlStore = useUrlStore()
const selectedGrade = ref(null)

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
</script>

<template>
  <div>
    <!-- 固定頂部的容器 -->
    <div class="video-selector container-fluid mt-4">
      <h2>📺 各年級影片列表</h2>

      <div class="mb-3">
        <label for="gradeSelect" class="form-label">🎓 選擇年級</label>
        <select id="gradeSelect" class="form-select" v-model="selectedGrade">
          <option disabled value="">請選擇年級</option>
          <option :value="3">三年級</option>
          <option :value="4">四年級</option>
          <option :value="5">五年級</option>
          <option :value="6">六年級</option>
        </select>
      </div>

      <div v-if="selectedGrade === null" class="text-muted">
        請從上方選擇一個年級來顯示影片。
      </div>

      <div v-else-if="urlStore.loading" class="text-info">
        🔄 正在載入 {{ selectedGrade }} 年級的影片資料...
      </div>

      <transition name="fade">
        <template v-if="!urlStore.loading && selectedGrade !== null">
          <ol
            v-if="urlStore.hasUrls"
            class="list-group list-group-numbered"
          >
            <li
              v-for="url in urlStore.urls"
              :key="url"
              class="list-group-item d-flex justify-content-between align-items-start"
            >
              <div class="ms-2 me-auto">
                <div class="fw-bold">影片連結</div>
                <a :href="url" target="_blank">{{ url }}</a>
              </div>
              <span class="badge bg-primary rounded-pill">
                {{ selectedGrade }}年級
              </span>
            </li>
          </ol>

          <div v-else class="text-danger mt-3">
            ❗ 查無 {{ selectedGrade }} 年級的影片資料。
          </div>
        </template>
      </transition>
    </div>

    <!-- 頂部固定後的占位高度，只在 lg 以上出現 -->
    <div class="video-placeholder d-none d-lg-block"></div>
  </div>
</template>


<style scoped>
.video-selector {
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 大螢幕固定於畫面上方 */
@media (min-width: 992px) {
  .video-selector {
    position: fixed;
    top: 5%;
    left: 10%;
    width: 80%;
    z-index: 1000;
  }

  .video-placeholder {
    height: 250px; /* 根據實際需要調整 */
  }
}

/* 過渡動畫修正 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 標題 */
h2 {
  font-weight: bold;
  margin-bottom: 1.5rem;
}

/* 表單標籤 */
label[for="gradeSelect"] {
  font-weight: 600;
}

/* 下拉選單最大寬度 */
#gradeSelect {
  max-width: 300px;
}

/* 說明文字 */
.text-muted {
  font-style: italic;
}

.text-info {
  font-weight: 500;
}

.text-danger {
  font-weight: 500;
  font-size: 1.1rem;
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
</style>


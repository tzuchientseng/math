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
    <div class="container-fluid container-md mt-4">
    <h2>📺 年級影片列表</h2>

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
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

h2 {
  font-weight: bold;
  margin-bottom: 1.5rem;
}

label[for="gradeSelect"] {
  font-weight: 600;
}

#gradeSelect {
  max-width: 300px;
}

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

.list-group-item a {
  word-break: break-all;
  text-decoration: none;
}

.list-group-item a:hover {
  text-decoration: underline;
}

.badge {
  font-size: 0.9rem;
  padding: 0.5em 0.75em;
}
</style>


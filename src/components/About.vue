<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>文本</template>
    解題筆記與教學筆記
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>數學工具</template>
    <a href="https://blog.sunnytseng.com/math.html" target="_blank" rel="noopener">鏈結:</a>
    不定期更新數學線上工具，(隨機數產生器具、統計工具、向量工具、排列組合、聯立式...)
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Leetcode 題目整理</template>
    <a href="https://home.sunnytseng.com/" target="_blank" rel="noopener">鏈結:</a>
    各個演算法整理
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>聯絡我</template>
    <a href="https://blog.sunnytseng.com/about.html" target="_blank" rel="noopener">鏈結:</a>
    點選 CONTACT ME -> INFO 有聯絡我方式
    <a href="https://blog.sunnytseng.com/about.html" target="_blank" rel="noopener"></a>
  </WelcomeItem>

  <!-- Others -->
  <!-- <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>
    (our official Discord server), or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener"
      >StackOverflow</a
    >. You should also follow the official
    <a href="https://bsky.app/profile/vuejs.org" target="_blank" rel="noopener">@vuejs.org</a>
    Bluesky account or the
    <a href="https://x.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    X account for latest news in the Vue world.
  </WelcomeItem> -->
</template>

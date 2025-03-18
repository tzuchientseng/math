// 確保 .vue 模組能夠被 TypeScript 正確識別。
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

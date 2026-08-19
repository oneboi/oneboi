# vue插件

## vue-office

1. **安装**

```
npm install @vue-office/docx @vue-office/excel @vue-office/pdf
```

1. **引入注册**（Vue3示例）

```
import { createApp } from 'vue'
import App from './App.vue'
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'

const app=createApp(App)
app.use(VueOfficeDocx)
app.mount('#app')
```

1. **页面使用**

```
<template>
  <vue-office-docx src="/demo.docx" />
</template>
```

### **四、总结**

**Vue-Office**就是前端文档预览的“终极方案”：**纯前端、零依赖、高还原、高性能**，开源免费可商用，接入成本极低。 下次再做文档预览，别再苦哈哈搞后端了，用**Vue-Office**，省下的时间摸鱼不香吗？

> 文档：https://501351981.github.io/vue-office/examples/docs/guide/
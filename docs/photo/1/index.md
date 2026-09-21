---
layout: doc
title: 照片墙
---

<script setup lang="ts">
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'
import img4 from './4.jpg'
import img5 from './5.jpg'
import img6 from './6.jpg'
import img7 from './7.jpg'
import img8 from './8.jpg'
import img9 from './9.jpg'
import img10 from './10.jpg'
import img11 from './11.jpg'
import img12 from './12.png'
import img13 from './13.jpg'
import img14 from './14.jpg'
import img15 from './15.jpg'
import img16 from './16.jpg'
import { ref } from 'vue'

const images = [
  { src: img1, name: '1.jpg' },
  { src: img2, name: '2.jpg' },
  { src: img3, name: '3.jpg' },
  { src: img4, name: '4.jpg' },
  { src: img5, name: '5.jpg' },
  { src: img6, name: '6.jpg' },
  { src: img7, name: '7.jpg' },
  { src: img8, name: '8.jpg' },
  { src: img9, name: '9.jpg' },
  { src: img10, name: '10.jpg' },
  { src: img11, name: '11.jpg' },
  { src: img12, name: '12.png' },
  { src: img13, name: '13.jpg' },
  { src: img14, name: '14.jpg' },
  { src: img15, name: '15.jpg' },
  { src: img16, name: '16.jpg' },
]

const lightbox = ref<string | null>(null)
</script>

# 照片墙

<div class="waterfall">
  <figure
    v-for="(img, i) in images"
    :key="i"
    class="waterfall-item"
    @click="lightbox = img.src"
  >
    <img :src="img.src" :alt="img.name" loading="lazy" />
    <figcaption>{{ img.name }}</figcaption>
  </figure>
</div>

<transition name="fade">
  <div v-if="lightbox" class="lightbox" @click="lightbox = null">
    <img :src="lightbox" alt="preview" />
    <span class="lightbox-close">×</span>
  </div>
</transition>

<style scoped>
.waterfall {
  column-count: 3;
  column-gap: 16px;
}

.waterfall-item {
  break-inside: avoid;
  margin: 0 0 16px;
  padding: 0;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: zoom-in;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.waterfall-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}

.waterfall-item img {
  width: 100%;
  height: auto;
  display: block;
}

.waterfall-item figcaption {
  position: absolute;
  inset: auto 0 0 0;
  padding: 20px 10px 8px;
  font-size: 13px;
  color: #fff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.waterfall-item:hover figcaption {
  opacity: 1;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  cursor: zoom-out;
}

.lightbox img {
  max-width: 92vw;
  max-height: 92vh;
  border-radius: 4px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
  position: absolute;
  top: 16px;
  right: 24px;
  font-size: 36px;
  line-height: 1;
  color: #fff;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .waterfall {
    column-count: 2;
  }
}

@media (max-width: 600px) {
  .waterfall {
    column-count: 1;
  }
}
</style>
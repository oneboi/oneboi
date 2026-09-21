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
import img16 from './17.jpg'
import img16 from './18.jpg'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

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
  { src: img16, name: '17.jpg' },
  { src: img16, name: '18.jpg' },
]

const cards = images.map((img, index) => ({
  ...img,
  index,
  ratio: 1,
  loaded: false,
}))

const layout = ref<number[][]>([])
const ready = ref(false)
const current = ref(-1)

let preloadTimer: number | undefined

function colCount() {
  const w = window.innerWidth
  if (w >= 1280) return 4
  if (w >= 900) return 3
  if (w >= 560) return 2
  return 1
}

function computeLayout(animate = false) {
  const n = colCount()
  const heights = new Array(n).fill(0)
  const cols: number[][] = Array.from({ length: n }, () => [])
  for (const card of cards) {
    const target = heights.indexOf(Math.min(...heights))
    cols[target].push(card.index)
    heights[target] += card.ratio + 0.06
  }
  layout.value = cols
}

function preloadDims() {
  let done = 0
  cards.forEach((card) => {
    const im = new Image()
    im.onload = () => {
      card.ratio = im.naturalHeight / Math.max(im.naturalWidth, 1)
      card.loaded = true
      done++
      if (done === cards.length) {
        ready.value = true
        computeLayout()
      }
    }
    im.src = card.src
  })
}

function onResize() {
  clearTimeout(preloadTimer)
  preloadTimer = window.setTimeout(() => computeLayout(), 120)
}

const layer = ref<HTMLDivElement | null>(null)

function open(index: number) {
  current.value = index
  nextTick(() => {
    if (layer.value && layer.value.parentElement !== document.body) {
      document.body.appendChild(layer.value)
    }
  })
}

function close() {
  current.value = -1
}

function prev() {
  current.value = (current.value - 1 + cards.length) % cards.length
}

function next() {
  current.value = (current.value + 1) % cards.length
}

function onKeydown(e: KeyboardEvent) {
  if (current.value < 0) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}

onMounted(() => {
  preloadDims()
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKeydown)
  if (layer.value) layer.value.remove()
})

</script>

<div class="gallery">
  <header class="hero">
    <h1>照片墙</h1>
    <p class="sub">共 {{ cards.length }} 张照片 · 点击任意照片查看大图</p>
  </header>

  <div v-if="ready" class="waterfall">
    <div v-for="(col, ci) in layout" :key="ci" class="w-col">
      <figure
        v-for="idx in col"
        :key="cards[idx].name"
        class="card"
        :style="{ '--i': cards[idx].index }"
        @click="open(idx)"
      >
        <img :src="cards[idx].src" :alt="cards[idx].name" loading="lazy" />
        <figcaption>
          <span class="num">{{ String(cards[idx].index + 1).padStart(2, '0') }}</span>
          <span class="name">{{ cards[idx].name }}</span>
        </figcaption>
        <span class="zoom">⤢</span>
      </figure>
    </div>
  </div>

  <div v-else class="loading">照片加载中…</div>
</div>

<div
  ref="layer"
  class="lightbox"
  :class="{ 'is-open': current >= 0 }"
  @click.self="close"
>
  <img
    class="lightbox-img"
    :src="current >= 0 ? cards[current].src : ''"
    :alt="current >= 0 ? cards[current].name : ''"
  />

  <button class="lb-btn close" @click="close">×</button>

  <button v-if="cards.length > 1" class="lb-btn prev" @click.stop="prev">‹</button>
  <button v-if="cards.length > 1" class="lb-btn next" @click.stop="next">›</button>

  <div v-if="current >= 0" class="lb-bar">
    <span class="lb-info">{{ String(current + 1).padStart(2, '0') }} / {{ cards.length }}</span>
    <span class="lb-name">{{ cards[current].name }}</span>
  </div>
</div>

<style scoped>
.gallery {
  padding: 8px 0 24px;
}

.hero {
  text-align: center;
  padding: 8px 0 28px;
}

.hero h1 {
  margin: 0;
  font-size: 42px;
  font-weight: 800;
  letter-spacing: 1px;
  background: linear-gradient(120deg, #7c3aed, #ec4899 55%, #f59e0b);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.hero .sub {
  margin: 10px 0 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.waterfall {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.w-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.card {
  margin: 0;
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  cursor: zoom-in;
  background: #16161a;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease;
  animation: rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(var(--i) * 55ms);
}

.card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
}

.card img {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.4s ease;
}

.card:hover img {
  transform: scale(1.06);
  filter: brightness(1.05);
}

.card figcaption {
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 26px 12px 10px;
  font-size: 13px;
  color: #fff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.card:hover figcaption {
  opacity: 1;
  transform: translateY(0);
}

.card .num {
  flex: none;
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(4px);
}

.card .zoom {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
  opacity: 0;
  transform: scale(0.7) rotate(-12deg);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.card:hover .zoom {
  opacity: 1;
  transform: scale(1) rotate(0);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(22px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.loading {
  text-align: center;
  padding: 60px 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  letter-spacing: 2px;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  background: rgba(12, 12, 16, 0.92);
  backdrop-filter: blur(6px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

.lightbox.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.lightbox-img {
  max-width: 88vw;
  max-height: 84vh;
  margin: 0;
  border-radius: 8px;
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.6);
}

.lightbox.is-open .lightbox-img {
  animation: zoomIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.94);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.lb-btn {
  position: absolute;
  border: none;
  cursor: pointer;
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(4px);
  transition: background 0.2s ease, transform 0.2s ease;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  -webkit-user-select: none;
  user-select: none;
}

.lb-btn:hover {
  background: rgba(255, 255, 255, 0.26);
}

.lb-btn.close {
  top: 18px;
  right: 22px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  line-height: 1;
}

.lb-btn.close:hover {
  transform: rotate(90deg);
}

.lb-btn.prev,
.lb-btn.next {
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 26px;
  line-height: 1;
}

.lb-btn.prev {
  left: 22px;
}

.lb-btn.next {
  right: 22px;
}

.lb-btn.prev:hover,
.lb-btn.next:hover {
  transform: translateY(-50%) scale(1.1);
}

.lb-bar {
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  color: #fff;
  font-size: 13px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.45), transparent);
}

.lb-info {
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 560px) {
  .hero h1 {
    font-size: 32px;
  }

  .waterfall {
    gap: 10px;
  }

  .w-col {
    gap: 10px;
  }
}
</style>
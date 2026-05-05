<template>
  <div class="teacher__bg">
    <div class="container">
      <div class="teacher">
        <h2 class="main-title">Эксперт в Английском для детей</h2>
        <div class="teacher__description">Открываем мир английского с увлечением и радостью</div>

        <div class="teacher__wrapper">
          <img src="/images/teacher.png" alt="Ирина Коваленко" class="teacher__photo" />
          <div class="teacher__info">
            <div class="teacher__info-name">Ирина Коваленко</div>
            <div class="teacher__info-description">
              Основатель и руководитель смарт-клуба BeClever (г. Гомель, Беларусь), педагог VYL&YL,
              автор программы обучения малышей английскому языку.
            </div>

            <div class="teacher__info-certificates">
              <div class="embla" ref="emblaRef">
                <div class="embla__container">
                  <div
                    v-for="(src, i) in certificates"
                    :key="src"
                    class="embla__slide"
                    :aria-label="`Слайд ${i + 1}`"
                  >
                    <img class="cert-thumb" :src="src" alt="Сертификат" @click="openModal(i)" />
                  </div>
                </div>
              </div>
              <div class="embla__controls">
                <button
                  class="embla__button"
                  type="button"
                  @click="scrollPrev"
                  aria-label="Предыдущий"
                >
                  ‹
                </button>
                <button
                  class="embla__button"
                  type="button"
                  @click="scrollNext"
                  aria-label="Следующий"
                >
                  ›
                </button>
              </div>
            </div>

            <div class="teacher__info-approach">
              <div
                v-for="item in approachItems"
                :key="item.title"
                class="teacher__info-approach-item"
              >
                <div class="header">
                  <img :src="`/icons/${item.icon}.svg`" alt="approach-icon" />
                  <span>{{ item.title }}</span>
                </div>
                <div class="description">
                  <span>{{ item.description }}</span>
                  <ul v-if="item.descriptionItems">
                    <li v-for="(description, i) in item.descriptionItems" :key="i">
                      {{ description }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AppButton class="teacher__button" text="Запись на консультацию" type="orange-outline" />

        <!-- Certificates Modal -->
        <div
          v-if="lightboxIndex !== null"
          class="lightbox"
          @click.self="closeModal"
          role="dialog"
          aria-modal="true"
        >
          <button class="lightbox__close" @click="closeModal" aria-label="Закрыть">✕</button>
          <button
            class="lightbox__nav lightbox__nav--prev"
            @click.stop="prevLightbox"
            aria-label="Предыдущий"
          >
            ‹
          </button>
          <img :src="certificates[lightboxIndex]" alt="Сертификат" class="lightbox__image" />
          <button
            class="lightbox__nav lightbox__nav--next"
            @click.stop="nextLightbox"
            aria-label="Следующий"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppButton from '@/components/AppButton.vue'
import useEmblaCarousel from 'embla-carousel-vue'

const approachItems = [
  {
    title: 'Подход к обучению',
    description: 'Разработала комплексную систему обучения, объединяющую',
    descriptionItems: [
      'игровые форматы для снижения стресса у детей,',
      'мультисенсорный подход,',
      'CLIL,',
      'развитие эмоционального интеллекта и креативности.',
    ],
    icon: 'approach',
  },
  {
    title: 'Философия',
    description:
      '"Английский – не просто урок, а радостная среда для раскрытия потенциала ребенка".',
    icon: 'philosophy',
  },
  {
    title: 'Методика нового поколения',
    description:
      'Идеально для педагогов, которые хотят учить без стресса, развивая в детях креативность и любовь к языку!',
    icon: 'methodology',
  },
]

const certificates = ref([
  '/images/certificates/certificate_1.webp',
  '/images/certificates/certificate_2.webp',
  '/images/certificates/certificate_3.webp',
  '/images/certificates/certificate_4.webp',
  '/images/certificates/certificate_5.webp',
  '/images/certificates/certificate_6.webp',
])

const [emblaRef, emblaApi] = useEmblaCarousel({
  align: 'start',
  slidesToScroll: 1,
  loop: true,
  dragFree: false,
})

const scrollPrev = () => emblaApi.value && emblaApi.value.scrollPrev()
const scrollNext = () => emblaApi.value && emblaApi.value.scrollNext()

const lightboxIndex = ref(null)
function openModal(i) {
  lightboxIndex.value = i
  document.body.style.overflow = 'hidden'
}
function closeModal() {
  lightboxIndex.value = null
  document.body.style.overflow = ''
}
function nextLightbox() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value + 1) % certificates.value.length
}
function prevLightbox() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value =
    (lightboxIndex.value - 1 + certificates.value.length) % certificates.value.length
}

function handleKey(e) {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowRight') nextLightbox()
  if (e.key === 'ArrowLeft') prevLightbox()
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
})
</script>

<style scoped lang="scss">
.teacher {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  &__bg {
    padding: 80px 0;
    background-color: var(--hint-of-green);

    @media (max-width: 1200px) {
      padding: 40px 0;
    }
  }

  &__description {
    text-align: center;
    color: var(--dark-gray);
    font-size: 18px;

    @media (max-width: 900px) {
      font-size: 16px;
    }
  }

  &__wrapper {
    display: flex;
    align-items: flex-start;
    color: var(--dark-gray);
    gap: 80px;
    margin-top: 74px;

    @media (max-width: 1200px) {
      gap: 20px;
      margin-top: 44px;
    }

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__info {
    @media (max-width: 900px) {
      max-width: 600px;
    }
  }

  &__info-name {
    color: var(--dark-gray);
    font-size: 26px;
    font-weight: 800;

    @media (max-width: 660px) {
      font-size: 22px;
    }
  }

  &__photo {
    width: 300px;

    @media (max-width: 1200px) {
      width: 200px;
    }

    @media (max-width: 900px) {
      width: 240px;
    }
  }

  &__info-description {
    margin-top: 28px;
    color: var(--dark-gray);
    font-size: 16px;
  }

  &__info-certificates {
    display: block;
    margin-top: 36px;

    @media (max-width: 900px) {
      display: block;
    }
  }

  &__info-approach {
    margin-top: 36px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  &__info-approach-item {
    .header {
      display: flex;
      align-items: center;
      gap: 20px;

      img {
        width: 28px;
      }

      span {
        color: var(--dark-gray);
        font-size: 18px;
        font-weight: 800;
      }

      @media (max-width: 900px) {
        gap: 12px;

        img {
          width: 22px;
        }

        span {
          font-size: 16px;
        }
      }
    }
    .description {
      margin-top: 10px;
      font-size: 16px;
      color: var(--dark-gray);
    }
  }

  &__button {
    margin-top: 56px;

    @media (max-width: 900px) {
      margin-top: 26px;
    }
  }
}

/* Embla slider */
.embla {
  position: relative;
  overflow: hidden;
}
.embla__container {
  display: flex;
}
.embla__slide {
  flex: 0 0 calc((100% - 40px) / 3);
  padding-right: 19px;
  min-width: 0;
}
@media (max-width: 900px) {
  .embla__slide {
    flex: 0 0 calc((100% - 19px) / 2);
  }
}
@media (max-width: 560px) {
  .embla__slide {
    flex: 0 0 100%;
  }
}
.cert-thumb {
  width: 100%;
  height: 180px;
  object-fit: cover;
  object-position: top;
  border: 1px solid var(--mercury);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  cursor: pointer;
  background: #fff;
}
@media (max-width: 900px) {
  .cert-thumb {
    height: 260px;
  }
}

.embla__controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 14px 0 24px;
}
.embla__button {
  width: 36px;
  height: 36px;
  border: 1px solid var(--dove-gray);
  background: var(--hint-of-green);
  color: var(--dove-gray);
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 22px;
  line-height: 1;
  padding: 0;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: var(--la-palma-light);
    border: 1px solid var(--la-palma-light);
  }
}

/* Lightbox modal */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  display: grid;
  place-items: center;
  z-index: 1000;
}
.lightbox__image {
  max-width: min(96vw, 1100px);
  max-height: 86vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}
.lightbox__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: #fff;
  color: #333;
  cursor: pointer;
  font-size: 18px;
  display: grid;
  place-items: center;
}
.lightbox__nav {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: #fff;
  color: #333;
  cursor: pointer;
  font-size: 28px;
  display: grid;
  place-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.lightbox__nav--prev {
  left: 20px;
}
.lightbox__nav--next {
  right: 20px;
}
</style>

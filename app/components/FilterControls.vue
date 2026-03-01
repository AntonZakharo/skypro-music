<template>
  <div class="centerblock__filter filter">
    <div class="filter__title">Искать по:</div>
    <div
      class="filter__item"
      :style="{
        pointerEvents: loading ? 'none' : 'all',
      }"
    >
      <div
        class="filter__button button-author _btn-text"
        :class="{
          filter__button_active: filtersStore.currentAuthors.length !== 0,
        }"
        @click="showPopUp('authors')"
      >
        исполнителю
      </div>
      <div v-if="currentPopUp == 'authors'" class="filter__list">
        <div class="filter__list-items">
          <div
            v-for="author in authorList"
            :key="author"
            @click="filtersStore.setAuthor(author)"
            class="filter__list-item"
            :class="{
              _chosen: filtersStore.currentAuthors.includes(author),
            }"
          >
            {{ author }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="filter__item"
      :style="{
        pointerEvents: loading ? 'none' : 'all',
      }"
    >
      <div
        class="filter__button button-year _btn-text"
        :class="{
          filter__button_active: filtersStore.currentYears.length !== 0,
        }"
        @click="showPopUp('year')"
      >
        году выпуска
      </div>
      <div v-if="currentPopUp == 'year'" class="filter__list">
        <div class="filter__list-items">
          <div
            v-for="year in yearList"
            :key="year"
            @click="filtersStore.setYear(year)"
            class="filter__list-item"
            :class="{
              _chosen: filtersStore.currentYears.includes(year),
            }"
          >
            {{ year }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="filter__item"
      :style="{
        pointerEvents: loading ? 'none' : 'all',
      }"
    >
      <div
        class="filter__button button-genre _btn-text"
        :class="{
          filter__button_active: filtersStore.currentGenres.length !== 0,
        }"
        @click="showPopUp('genre')"
      >
        жанру
      </div>
      <div v-if="currentPopUp == 'genre'" class="filter__list">
        <div class="filter__list-items">
          <div
            v-for="genre in genreList"
            :key="genre"
            @click="filtersStore.setGenre(genre)"
            class="filter__list-item"
            :class="{
              _chosen: filtersStore.currentGenres.includes(genre),
            }"
          >
            {{ genre }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  tracks: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})
const currentPopUp = ref('')
const filtersStore = useFiltersStore()
filtersStore.currentAuthors = []
filtersStore.currentGenres = []
filtersStore.currentYears = []
const showPopUp = (popup) => {
  currentPopUp.value = popup == currentPopUp.value ? '' : popup
}

// eslint-disable-next-line no-undef
const authorList = computed(() => {
  const items = new Set()
  props.tracks.forEach((track) => {
    if (track.author == '-') {
      return
    }
    if (track.author) {
      items.add(track.author)
    }
  })
  return Array.from(items).sort((a, b) => {
    return a > b ? 1 : -1
  })
})
// eslint-disable-next-line no-undef
const yearList = computed(() => {
  const items = new Set()
  props.tracks.forEach((track) => {
    if (track.release_date) {
      const date = new Date(track.release_date)
      items.add(date.getFullYear())
    }
  })
  return Array.from(items).sort((a, b) => {
    return a > b ? 1 : -1
  })
})
// eslint-disable-next-line no-undef
const genreList = computed(() => {
  const items = new Set()
  props.tracks.forEach((track) => {
    if (track.genre) {
      track.genre.forEach((g) => {
        items.add(g)
      })
    }
  })
  return Array.from(items).sort((a, b) => {
    return a > b ? 1 : -1
  })
})
</script>
<style scoped>
._btn-text:hover {
  border-color: #d9b6ff;
  color: #d9b6ff;
  cursor: pointer;
}

._btn-icon:hover svg {
  fill: transparent;
  stroke: #acacac;
  cursor: pointer;
}

._btn-text:active {
  border-color: #ad61ff;
  color: #ad61ff;
  cursor: pointer;
}

._btn-icon:active svg {
  fill: transparent;
  stroke: #ffffff;
  cursor: pointer;
}

._btn-icon:active .track-play__like-svg,
._btn-icon:active .track-play__dislike-svg {
  fill: #696969;
  stroke: #ffffff;
  cursor: pointer;
}
.centerblock__filter {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 51px;
}

.filter__title {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-right: 15px;
}

.filter__button {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;
  transition: 0.3s;
}
.filter__button_active {
  border: 1px solid #9a48f1;
  color: #b672ff;
}
.filter__list {
  position: absolute;
  top: 50px;
  left: 0;
  padding: 34px;
  background-color: #313131;
  width: 248px;
  height: 305px;
  border-radius: 12px;
}
.filter__list-items {
  overflow-y: scroll;
  height: 237px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.filter__list-item {
  cursor: pointer;
  user-select: none;
}
.filter__item {
  position: relative;
}
.filter__item:not(:last-child) {
  margin-right: 10px;
}
._chosen {
  text-decoration: underline;
  color: #b672ff;
}
</style>

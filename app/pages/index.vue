<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NuxtLayout name="default">
    <div class="centerblock__search search">
      <svg class="search__svg">
        <use xlink:href="@/assets/icons/sprite.svg#icon-search" />
      </svg>
      <input class="search__text" type="search" placeholder="Поиск" name="search" />
    </div>
    <h2 class="centerblock__h2">Треки</h2>
    <FilterControls :tracks="tracks" :loading="loading" />
    <BasePlaylist v-if="!loading" :tracks="tracks" />
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading" class="loading">Загрузка треков...</div>
  </NuxtLayout>
</template>
<script setup>
// eslint-disable-next-line no-undef
const { tracks, loading, error, fetchAllTracks } = useTracks()
fetchAllTracks()
</script>
<style scoped lang="scss">
.centerblock__search {
  width: 100%;
  border-bottom: 1px solid #4e4e4e;
  margin-bottom: 51px;
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
}
.search__svg {
  width: 17px;
  height: 17px;
  margin-right: 5px;
  stroke: #ffffff;
  fill: transparent;
}

.search__text {
  -webkit-box-flex: 100;
  -ms-flex-positive: 100;
  flex-grow: 100;
  background-color: transparent;
  border: none;
  padding: 13px 10px 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  outline: none;
}

.search__text::-webkit-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text:-ms-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text::-ms-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text::placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.centerblock__h2 {
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -0.8px;
  margin-bottom: 45px;
}
.error {
  display: flex;
  width: 100%;
  justify-content: center;
}
.loading {
  @extend .error;
}
</style>

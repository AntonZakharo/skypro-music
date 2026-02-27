<template>
  <div class="centerblock__content playlist-content" v-if="!loading">
    <div class="content__title playlist-title">
      <div class="playlist-title__col col01">Трек</div>
      <div class="playlist-title__col col02">Исполнитель</div>
      <div class="playlist-title__col col03">Альбом</div>
      <div class="playlist-title__col col04">
        <svg class="playlist-title__svg">
          <use xlink:href="@/assets/icons/sprite.svg#icon-watch" />
        </svg>
      </div>
    </div>
    <div class="content__playlist playlist">
      <BaseTrack
        v-for="track in tracks"
        :key="track._id"
        :title="track.name"
        :author="track.author"
        :album="track.album"
        :duration="track.duration_in_seconds"
        :isLiked="track.isLiked"
        :track="track"
      />
    </div>
  </div>
  <div v-if="loading" class="loading">Загрузка треков...</div>
</template>
<script setup>
const props = defineProps({
  tracks: {
    type: Object,
    required: true,
  },
})

const { loading, categoryTrackList, fetchFavoriteTracks } = useTracks()

onMounted(async () => {
  if (localStorage.getItem('refresh'))
    await fetchFavoriteTracks(localStorage.getItem('access')).then(() => {
      props.tracks.forEach((track) => {
        track.isLiked = false
        categoryTrackList.value.forEach((categoryTrack) => {
          if (track._id == categoryTrack._id) {
            track.isLiked = true
          }
        })
      })
    })
})
</script>
<style scoped>
.content__title {
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
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 24px;
}
.centerblock__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.content__playlist {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow-y: auto;
  height: 673px;
  padding-bottom: 200px;
  scrollbar-width: none;
}
.content__playlist::-webkit-scrollbar {
  width: 0px;
}

.playlist-title__col {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 2px;
  color: #696969;
  text-transform: uppercase;
}

.playlist-title__svg {
  width: 12px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
}

.col01 {
  width: 447px;
}

.col02 {
  width: 321px;
}

.col03 {
  width: 245px;
}

.col04 {
  width: 60px;
  text-align: end;
}
.loading {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>

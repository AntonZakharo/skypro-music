<template>
  <div class="playlist__item">
    <div class="playlist__track track">
      <div class="track__title" @click="playTrack(props.track)">
        <div class="track__title-image">
          <svg class="track__title-svg">
            <use xlink:href="@/assets/icons/sprite.svg#icon-note"></use>
          </svg>
        </div>
        <div class="track__title-text">
          <div class="track__title-link">{{ title }}</div>
        </div>
      </div>
      <div class="track__author">
        <div class="track__author-link">{{ author }}</div>
      </div>
      <div class="track__album">
        <div class="track__album-link">{{ album }}</div>
      </div>
      <div class="track__time">
        <svg class="track__time-svg" @click="likeTrack" v-if="!isLiked">
          <use xlink:href="@/assets/icons/sprite.svg#icon-like"></use>
        </svg>
        <svg class="track__time-svg_active" @click="dislikeTrack" v-if="isLiked">
          <use xlink:href="@/assets/icons/sprite.svg#icon-dislike"></use>
        </svg>
        <span class="track__time-text">{{ formatDuration(duration) }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: String,
  author: String,
  album: String,
  duration: Number,
  isLiked: Boolean,
  track: Object,
})
import { usePlayerStore } from '~/stores/usePlayerStore'
import { useAudioPlayer } from '~/composables/useAudioPlayer'

const playerStore = usePlayerStore()
// eslint-disable-next-line no-undef
const { formatDuration } = useTracks()
const { playTrack } = useAudioPlayer()

function likeTrack() {
  like(props.track._id)
  props.track.isLiked = true
}
function dislikeTrack() {
  deleteLike(props.track._id)
  props.track.isLiked = false
}
</script>
<style scoped>
.playlist__item {
  width: 100%;
  display: block;
  margin-bottom: 12px;
}

.playlist__track {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.track__title {
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
  width: 447px;
}

.track__title-image {
  width: 51px;
  height: 51px;
  padding: 16px;
  background: #313131;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: 17px;
}

.track__title-svg {
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
}

.track__title-link {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
}

.track__title-span {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4e4e4e;
}

.track__author {
  width: 321px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}

.track__author-link {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-align: left;
}

.track__album {
  width: 245px;
}

.track__album-link {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #696969;
}

.track__time-svg {
  width: 14px;
  height: 12px;
  margin-right: 17px;
  fill: transparent;
  stroke: #696969;
  cursor: pointer;
}
.track__time-svg_active {
  width: 14px;
  height: 12px;
  margin-right: 17px;
  fill: #b672ff;
  cursor: pointer;
}
.track__time-text {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #696969;
}
</style>

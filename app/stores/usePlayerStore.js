import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    // Текущий трек
    currentTrack: null,
    // Список треков
    playlist: [],
    // Индекс текущего трека
    currentIndex: -1,
    // Играет ли сейчас
    isPlaying: false,
    // Прогресс воспроизведения (0-100)
    progress: 0,
    // Громкость (0-100)
    volume: 50,
    // Ссылка на аудиотег
    audioRef: null,
    // Перемешивание
    shuffle: false,
    // Перемешанные треки
    shuffledPlaylist: [],
    // Повтор
    repeat: false,
  }),

  actions: {
    // Установить текущий трек

    setCurrentTrack(track) {
      this.currentTrack = track
      console.log(this.playlist)
      this.currentIndex = this.playlist.findIndex((t) => t._id === track._id)
    },

    // Установить плейлист
    setPlaylist(tracks) {
      this.playlist = tracks
    },

    // Установить прогресс
    setProgress(progress) {
      this.progress = progress
    },

    // Установить громкость
    setVolume(volume) {
      this.volume = volume
    },

    // Установить состояние воспроизведения
    setPlaying(isPlaying) {
      this.isPlaying = isPlaying
    },

    // Установить ссылку на аудиоэлемент
    setAudioRef(element) {
      this.audioRef = element
      if (this.audioRef) {
        this.audioRef.volume = this.volume / 100
      }
    },
    next(isAuto = false) {
      // isAuto обозначает самостоятельно ли пользователь переключил трек
      if (!this.playlist.length) return

      const list = this.shuffle ? this.shuffledPlaylist : this.playlist

      if (this.currentIndex < list.length - 1) {
        if (!this.repeat || !isAuto) {
          this.currentIndex++
        }
      } else {
        this.currentIndex = 0 // зацикливание
      }

      this.currentTrack = list[this.currentIndex]

      if (this.audioRef) {
        this.audioRef.src = this.currentTrack.track_file
        this.audioRef.play()
      }

      this.isPlaying = true
    },
    prev() {
      if (!this.playlist.length) return

      const list = this.shuffle ? this.shuffledPlaylist : this.playlist

      if (this.currentIndex > 0) {
        this.currentIndex--
      } else {
        this.audioRef.currentTime = 0
      }

      this.currentTrack = list[this.currentIndex]

      if (this.audioRef) {
        this.audioRef.src = this.currentTrack.track_file
        this.audioRef.play()
      }

      this.isPlaying = true
    },
    shufflePlaylist() {
      const array = [...this.playlist]

      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }

      this.shuffledPlaylist = array
    },
    toggleShuffle() {
      this.shuffle = !this.shuffle

      if (this.shuffle) {
        this.shufflePlaylist()
        this.currentIndex = this.shuffledPlaylist.findIndex((t) => t._id === this.currentTrack._id)
      } else {
        this.currentIndex = this.playlist.findIndex((t) => t._id === this.currentTrack._id)
      }
    },
    toggleRepeat() {
      this.repeat = !this.repeat
    },
  },
})

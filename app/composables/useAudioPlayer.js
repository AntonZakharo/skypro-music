import { usePlayerStore } from '~/stores/usePlayerStore'

export function useAudioPlayer() {
  const playerStore = usePlayerStore()

  const initPlayer = (element) => {
    if (!element) {
      console.error('Плеера нет :(')
      return
    }

    playerStore.setAudioRef(element)
    const localAudioInfo = JSON.parse(sessionStorage.getItem('audioInfo'))
    if (localAudioInfo?.currentTrack) {
      playerStore.setCurrentTrack(localAudioInfo.currentTrack)
      playerStore.audioRef.src = localAudioInfo.currentTrack.track_file
      playerStore.audioRef.currentTime = localAudioInfo.currentTime
    }
    console.log(playerStore.audioRef)
  }

  // Воспроизводим трек
  const playTrack = async (track) => {
    if (!playerStore.audioRef) {
      console.error('Плеер не инициализирован')
      return
    }

    try {
      playerStore.setCurrentTrack(track)
      playerStore.audioRef.src = track.track_file
      sessionStorage.setItem('audioInfo', {
        currentTrack: track,
        currentTime: 0,
      })

      await playerStore.audioRef.play()
      playerStore.setPlaying(true)
    } catch (error) {
      console.error('Ошибка воспроизведения:', error)
      playerStore.setPlaying(false)
    }
  }

  // Обновляем прогресс трека
  const handleTimeUpdate = () => {
    if (!playerStore.audioRef) return
    const currentTime = playerStore.audioRef.currentTime
    const duration = playerStore.audioRef.duration
    if (duration) {
      const progress = (currentTime / duration) * 100
      playerStore.setProgress(progress)
      sessionStorage.setItem(
        'audioInfo',
        JSON.stringify({
          currentTrack: playerStore.currentTrack,
          currentTime: currentTime,
        }),
      )
    }
  }
  // Перематываем
  const seekTo = (percentage) => {
    if (!playerStore.audioRef || !playerStore.currentTrack) return
    const newTime = (percentage / 100) * playerStore.audioRef.duration
    playerStore.audioRef.currentTime = newTime
    playerStore.setProgress(percentage)
  }

  // Меняем громкость
  const updateVolume = () => {
    if (!playerStore.audioRef) return
    playerStore.audioRef.volume = playerStore.volume / 100
  }
  watchEffect(() => {
    if (playerStore.progress >= 100 && playerStore.isPlaying) {
      playerStore.audioRef.currentTime = 0
      playerStore.setProgress(0)
      playerStore.setPlaying(false)
    }
  })

  return {
    initPlayer,
    playTrack,
    handleTimeUpdate,
    seekTo,
    updateVolume,
  }
}

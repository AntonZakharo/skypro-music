import { ref } from 'vue'

const API_URL = 'https://webdev-music-003b5b991590.herokuapp.com'

export const useTracks = () => {
  const tracks = ref([])
  const loading = ref(false)
  const error = ref(null)
  const categoryName = ref('')
  const categoryTrackList = ref([])

  const fetchTracks = async (route, token = undefined) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(API_URL + route, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Не удалось получить треки')
      }
      const data = await response.json()
      tracks.value = data.data

      return data.data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка при загрузке треков :('
    } finally {
      loading.value = false
    }
  }

  const fetchAllTracks = async () => {
    return await fetchTracks('/catalog/track/all/')
  }
  const fetchFavoriteTracks = async (token) => {
    await fetchTracks('/catalog/track/favorite/all/', token)
    categoryTrackList.value = tracks.value || []
    return tracks.value
  }
  const fetchCategory = async (id) => {
    await fetchAllTracks()
    const allTracks = tracks.value
    await fetchTracks(`/catalog/selection/${id}`)
    const categoryTracks = tracks.value.items
    categoryName.value = tracks.value.name

    allTracks.forEach((track) => {
      if (categoryTracks.includes(track._id)) {
        categoryTrackList.value.push(track)
      }
    })
    return tracks.value
  }

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return {
    tracks,
    loading,
    error,
    categoryName,
    categoryTrackList,
    fetchAllTracks,
    fetchFavoriteTracks,
    fetchCategory,
    formatDuration,
  }
}

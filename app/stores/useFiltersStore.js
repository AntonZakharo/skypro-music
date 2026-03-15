import { defineStore } from 'pinia'
import { useTracks } from '@/composables/useTracks'

const { tracks, fetchAllTracks } = useTracks()

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    currentAuthors: [],
    currentYears: [],
    currentGenres: [],
  }),
  actions: {
    setAuthor(author) {
      if (!this.currentAuthors.includes(author)) {
        this.currentAuthors.push(author)
      } else {
        this.currentAuthors.splice(this.currentAuthors.indexOf(author), 1)
      }
    },
    setYear(year) {
      if (!this.currentYears.includes(year)) {
        this.currentYears.push(year)
      } else {
        this.currentYears.splice(this.currentYears.indexOf(year), 1)
      }
    },
    setGenre(genre) {
      if (!this.currentGenres.includes(genre)) {
        this.currentGenres.push(genre)
      } else {
        this.currentGenres.splice(this.currentGenres.indexOf(genre), 1)
      }
    },
  },
})

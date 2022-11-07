import { defineStore } from 'pinia'
import axios from 'axios'

export const useSongStore = defineStore('song', {
  state: () => ({
    songs: null
  }),
  actions: {
    async fetchSongsByUserId(userId) {
        let res = await axios.get('user/' + userId + '/songs')
        this.$state.songs = res.data.songs
    },

    clearSongs() {
      this.$state.songs = null
    },
  },
  persist: true,
})

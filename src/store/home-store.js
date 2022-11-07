import { defineStore } from 'pinia'
import axios from 'axios'

export const useHomeStore = defineStore('home', {
  state: () => ({
    id: null,
    name: null,
    contact: null,
    address: null,
    image: null,
    description: null
  }),
  actions: {
    async fetchHome() {
      console.log(this.$state.id)

        let res = await axios.get('home/' + this.$state.id);

        this.$state.id = res.data.home.id
        this.$state.name = res.data.home.name
        this.$state.contact = res.data.home.contact
        this.$state.address = res.data.home.address
        this.$state.description = res.data.home.description
       
        if (res.data.user.image) {
          this.$state.image = process.env.VUE_APP_API_URL + 'images/users/' + res.data.user.image
        } else {
          this.$state.image = process.env.VUE_APP_URL + 'DefaultUserAvatar.png'
        }
    },

    clearProfile() {
      this.$state.id = null
      this.$state.name = null
      this.$state.contact = null
      this.$state.address = null
      this.$state.description = null
      this.$state.image = null
    },
  },
  persist: true,
})

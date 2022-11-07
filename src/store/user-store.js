import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    token: null,
    firstName: null,
    lastName: null,
    email: null,
    location: null,
    image: null,
    description: null
  }),
  actions: {
    async setUserDetails(res) {
        this.$state.id = res.data.user.id
        this.$state.token = res.data.token
        this.$state.firstName = res.data.user.firstName
        this.$state.lastName = res.data.user.lastName
        this.$state.email = res.data.user.email
        this.$state.location = res.data.user.location
        this.$state.description = res.data.user.description

        if (res.data.user.image) {
          this.$state.image = process.env.VUE_APP_API_URL + 'images/users/' + res.data.user.image
        } else {
          this.$state.image = process.env.VUE_APP_URL + 'DefaultUserAvatar.png'
        }
    },

    async fetchUser() {
      console.log(this.$state.id)
        let res = await axios.get('users/' + this.$state.id);

        this.$state.id = res.data.user.id
        this.$state.firstName = res.data.user.first_name
        this.$state.lastName = res.data.user.last_name
        this.$state.location = res.data.user.location
        this.$state.description = res.data.user.description
        if (res.data.user.image) {
          this.$state.image = process.env.VUE_APP_API_URL + 'images/users/' + res.data.user.image
        } else {
          this.$state.image = process.env.VUE_APP_URL + 'DefaultUserAvatar.png'
        }
    },

    clearUser() {
        this.$state.id = null
        this.$state.token = null
        this.$state.firstName = null
        this.$state.lastName = null
        this.$state.email = null
        this.$state.location = null
        this.$state.description = null
        this.$state.image = null
    },
  },
  persist: true,
})

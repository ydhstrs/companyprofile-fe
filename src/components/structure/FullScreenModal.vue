<template>
    <section>

        <button
            @click="open = !open"
            class="bg-transparent hover:bg-green-400 text-white font-semibold hover:text-white py-1 px-2
                hover:border-transparent rounded">
            <i class="fa-solid fa-bars fa-xl"></i>
        </button>

        <div v-show="open"
             class="animated slideInDown faster fixed w-full h-full top-0 left-0 flex justify-center backdrop-blur-sm">
            <div class="bg-black absolute w-full h-full opacity-75"></div>
            <div class="my-auto fixed border-white w-80 pt-16">
                <p class="text-2xl text-center text-white font-bold">Menu</p>
                <div class="flex pt-2" v-if="!userStore.id">
                    <router-link
                        class="text-center bg-transparent hover:bg-green-500 text-white py-2 px-4 border
                        border-green-500 hover:border-transparent font-bold py-2 px-4 rounded w-full"
                        to="login">
                        Login
                    </router-link>
                </div>
                <div class="flex pt-2" v-if="!userStore.id">
                    <router-link
                        class="text-center bg-transparent hover:bg-green-500 text-white py-2 px-4 border
                        border-green-500 hover:border-transparent font-bold py-2 px-4 rounded w-full"
                        to="register">
                        Register
                    </router-link>
                </div>
                <div class="flex pt-2" v-if="userStore.id" @click="open = !open">
                    <router-link
                        class="text-center bg-transparent hover:bg-green-500 text-white py-2 px-4 border
                        border-green-500 hover:border-transparent font-bold py-2 px-4 rounded w-full"
                        to="/account/posts">
                        Posts
                    </router-link>
                </div>
                <div class="flex pt-2" v-if="userStore.id" @click="open = !open">
                    <router-link
                        class="text-center bg-transparent hover:bg-green-500 text-white py-2 px-4 border
                        border-green-500 hover:border-transparent font-bold py-2 px-4 rounded w-full"
                        :to="'/account/profile/' + userStore.id">
                        Profile
                    </router-link>
                </div>
                <div class="flex pt-2" v-if="userStore.id">
                    <button
                        @click="logout"
                        class="text-center bg-transparent hover:bg-green-500 text-white py-2 px-4 border
                        border-green-500 hover:border-transparent font-bold py-2 px-4 rounded w-full">
                        Logout
                    </button>
                </div>
                <div class="flex pt-10">
                    <button
                        class="text-center bg-transparent hover:bg-red-500 text-white py-2 px-4 border
                        border-red-500 hover:border-transparent font-bold py-2 px-4 rounded w-full"
                        @click="open = !open">Close
                    </button>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    import { useUserStore } from '../../store/user-store'
    import { useProfileStore } from '../../store/profile-store'
    import { useSongStore } from '../../store/song-store'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const userStore = useUserStore()
    const profileStore = useProfileStore()
    const songStore = useSongStore()

    let open = ref(false)

    const logout = async () => {
        try {
            let res = await axios.post('logout', { user_id: userStore.id })
            console.log(res.data)

            userStore.clearUser()
            profileStore.clearProfile()
            songStore.clearSongs()

            router.push('/')
        } catch (err) {
            console.log(err);
        }
    }
</script>

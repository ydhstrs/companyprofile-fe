<template>
    <div id="Login">

        <TopNavigation />

        <div class="w-full p-6 flex justify-center items-center custom-height">
            <div class="w-full max-w-xs">
                <div class="bg-black p-8 shadow rounded w-full mb-6">
                    <h1 class="mb-6 text-lg text-gray-100 font-thin">
                        Login to your account
                    </h1>

                    <div class="mb-4">
                        <TextInput
                            label="Email"
                            :labelColor="false"
                            placeholder="john.doe@email.com"
                            v-model:input="email"
                            inputType="text"
                            :error="errors.email ? errors.email[0] : ''"
                        />
                    </div>
                    <div class="mb-4">
                        <TextInput
                            label="Password"
                            :labelColor="false"
                            placeholder="password123?"
                            v-model:input="password"
                            inputType="password"
                            :error="errors.password ? errors.password[0] : ''"
                        />
                    </div>

                    <button class="
                        block 
                        w-full 
                        bg-green-500 
                        text-gray-100 
                        font-bold 
                        rounded-sm 
                        py-3 
                        text-sm 
                        tracking-wide"
                        type="submit"
                        @click="login"
                    >
                        Login
                    </button>

                </div>

                <p class="text-center text-md text-gray-900">
                    Don't have an account yet?
                    <router-link
                        class="text-blue-500 no-underline hover:underline"
                        to="register">
                        Register
                    </router-link>
                </p>
                
            </div>
        </div>
    </div>
</template>

<script setup>

    import axios from 'axios'
    import { ref } from 'vue'
    import { useUserStore } from '../store/user-store'
    import TextInput from '@/components/global/TextInput.vue';
    const userStore = useUserStore()

    let errors = ref([])
    let email = ref(null)
    let password = ref(null)

    const login = async () => {

        errors.value = []

        try {
            let res = await axios.post('login', {
                email: email.value,
                password: password.value
            })

            userStore.setUserDetails(res)

            setTimeout(() => { location.href = '/home/1/'}, 500)
        } catch (err) {
            errors.value = err.response.data.errors;
        }
    }
</script>

<style lang="scss">
    #Login {
        .custom-height {
            height: calc(100vh - 65px);
        }
    }
</style>

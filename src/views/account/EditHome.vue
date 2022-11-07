<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import { useRouter,useRoute } from 'vue-router';
    import { useHomeStore } from '@/store/home-store';
    import Swal from '../../sweetalert2.js'
    import CropperModal from '../../components/global/CropperModal.vue'
    import TextInput from '@/components/global/TextInput.vue';
    import DisplyCropperButton from '@/components/global/DisplyCropperButton.vue'
    import CroppedImage from '../../components/global/CroppedImage.vue'
    import TextArea from '@/components/global/TextArea.vue';
    import SubmitFormButton from '../../components/global/SubmitFormButton.vue';

    const router = useRouter()
    const route = useRoute()
    const homeStore = useHomeStore()
    
    let showModal = ref(false);
    let name = ref(null)
    let address = ref(null)
    let contact = ref(null)
    let image = ref(null)
    let imageData = null
    let description = ref(null)
    let instagram = ref(null)
    let linkedin = ref(null)
    let youtube = ref(null)
    let errors = ref([])

        onMounted(async () => { 
        await homeStore.fetchHome()

        name.value = homeStore.name || null
        contact.value = homeStore.contact || null
        address.value = homeStore.address || null
        description.value = homeStore.description || null
        image.value = homeStore.image || null

        window.scroll({ top: 0,  left: 0,  behavior: 'smooth' });
    })
    const setCroppedImageData = (data) => {
        imageData = data
        image.value = data.imageUrl
    }



    // const getHomeById = async () => {
    //     try {
    //         let res = await axios.get('home/' + route.params.id)

    //         name.value = res.data.name
    //         address.value = res.data.address
    //         contact.value = res.data.contact
    //         image.value = process.env.VUE_APP_API_URL + 'images/home/'  + res.data.image
    //         description.value = res.data.description

    //     } catch (err) {
    //         errors.value = err.response.data.errors;
    //     }
    // }

    const updateHome = async () => {
        errors.value = []

        let data = new FormData();

        data.append('name', name.value || '')
        data.append('address', address.value || '')
        data.append('contact', contact.value || '')
        data.append('linkedin', linkedin.value || '')
        data.append('youtube', youtube.value || '')
        data.append('instagram', instagram.value || '')
        data.append('description', description.value || '')
        
        if (imageData) {
            data.append('id', homeStore.id || '');
            data.append('image', imageData.file || '');
            data.append('height', imageData.height || '');
            data.append('width', imageData.width || '');
            data.append('left', imageData.left || '');
            data.append('top', imageData.top || '');
        }
        
        try {
            await axios.post('home/' + route.params.id + '?_method=PUT', data);

            Swal.fire(
                'Updated post!',
                'The post you updated was "' + name.value + '"',
                'success'
            );

            router.push('/home')
        } catch (err) {
            console.log()
            errors.value = err.response.data.errors;
        }
    };
</script>

<style scoped>
    #EditProfile {
        min-height: 70vh;
    }
</style>
<template>
    <div id="EditProfile" class="container mx-auto w-full max-w-4xl pt-20 pb-20 px-6">

        <h2 class="text-gray-900 text-xl">Edit Home Profile</h2>
        <div class="bg-green-500 w-full h-1"></div>

        <CropperModal 
            v-if="showModal"
            :minAspectRatioProp="{width: 16, height: 9}"
            :maxAspectRatioProp="{width: 16, height: 9}"
            @croppedImageData="setCroppedImageData"
            @showModal="showModal = false"
        />

        <div class="flex flex-wrap mx-3 mt-4 mb-6">
            <div class="w-full md:w-1/2 px-3 mt-4 mb-6 md:mb-0">
                <TextInput
                    label="Name"
                    placeholder="Company Name"
                    v-model:input="name"
                    inputType="text"
                    :error="errors['name'] ? errors['name'][0] : ''"
                />
            </div>
                        <div class="w-full md:w-1/2 px-3 mt-4 mb-6 md:mb-0">
                <TextInput
                    label="Contact"
                    placeholder="08123456789"
                    v-model:input="contact"
                    inputType="text"
                    :error="errors['contact'] ? errors['contact'][0] : ''"
                />
            </div>
            <div class="w-full md:w-1/2 px-3 mt-4 mb-6 md:mb-0">
                <TextInput
                    label="Location"
                    placeholder="Jl. Soekarno-Hatta No.19, Jakarta Barat"
                    v-model:input="address"
                    inputType="text"
                    :error="errors['address'] ? errors['address'][0] : ''"
                />
            </div>
                        <div class="w-full md:w-1/2 px-3 mt-4 mb-6 md:mb-0">
                <TextInput
                    label="Instagram Link"
                    placeholder="Without https://"
                    v-model:input="instagram"
                    inputType="text"
                    :error="errors['instagram'] ? errors['instagram'][0] : ''"
                />
            </div>
            <div class="w-full md:w-1/2 px-3 mt-4 mb-6 md:mb-0">
                <TextInput
                    label="Link Linkedin"
                    placeholder="Without https://"
                    v-model:input="linkedin"
                    inputType="text"
                    :error="errors['linkedin'] ? errors['linkedin'][0] : ''"
                />
            </div>
            <div class="w-full md:w-1/2 px-3 mt-4 mb-6 md:mb-0">
                <TextInput
                    label="Link Youtube"
                    placeholder="Without https://"
                    v-model:input="youtube"
                    inputType="text"
                    :error="errors['youtube'] ? errors['youtube'][0] : ''"
                />
            </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <DisplyCropperButton 
                    label="Company Image"
                    btnText="Add Company Image"
                    @showModal="showModal = true"
                />
            </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
                <CroppedImage 
                    label="Cropped Image"
                    :image="image"
                />
            </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <TextArea 
                    label="Description"
                    placeholder="Please enter some information here!!!"
                    v-model:description="description"
                    inputType="text"
                    :error="errors['description'] ? errors['description'][0] : ''"
                />
            </div>
        </div>
        <div class="flex flex-wrap mt-8 -mx-3 mb-6">
            <div class="w-full px-3">
                <SubmitFormButton 
                    btnText="Update Home"
                    @submit="updateHome"
                />
            </div>
        </div>
    </div>
</template>



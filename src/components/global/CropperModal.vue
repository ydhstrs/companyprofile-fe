<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 overflow-y-auto mt-6">
            <div class="flex min-h-full items-end justify-center p-4 items-center py-2">

            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 mt-10 max-w-4xl">
                <div class="bg-white px-4 pt-5 pb-4 p-6">
                    <div class="flex items-center">
                        <div class="mt-3 text-left">
                            <h3 class="text-2xl font-medium leading-6 text-gray-900" id="modal-title">Crop Image</h3>

                            <div class="flex flex-wrap my-4">
                                <div class="w-full">
                                    
                                    <label 
                                    class="
                                        block 
                                        uppercase 
                                        tracking-wide 
                                        text-gray-700 
                                        text-xs 
                                        font-bold 
                                        mb-2"
                                    >
                                        Select Image
                                    </label>

                                    <div class="flex">
                                        <div class="mb-3 w-full">
                                            <input class="
                                                form-control
                                                block
                                                w-full
                                                px-3
                                                py-1.5
                                                text-base
                                                font-normal
                                                text-gray-700
                                                bg-white 
                                                bg-clip-padding
                                                border 
                                                border-solid 
                                                border-gray-400
                                                rounded
                                                transition
                                                ease-in-out
                                                m-0
                                                focus:text-gray-700 
                                                focus:bg-white 
                                                focus:border-blue-600 
                                                focus:outline-none" 
                                                type="file" 
                                                id="image" 
                                                ref="fileInput"
                                                v-on:change="getUploadedImage"
                                            >
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="bg-gray-50 pb-3 flex flex-row-reverse px-4">

                        <button 
                            v-if="uploadedImage"
                            @click="crop" 
                            type="button" 
                            class="
                                inline-flex 
                                w-full 
                                justify-center 
                                rounded-md 
                                border 
                                border-transparent 
                                bg-blue-600 
                                px-4 
                                py-2 
                                text-base 
                                font-medium 
                                text-white 
                                shadow-sm 
                                hover:bg-blue-700 
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-blue-500 
                                focus:ring-offset-2 
                                ml-3 
                                w-auto 
                                text-sm"
                        >
                            Submit
                        </button>
                        
                        <button 
                            @click="$emit('showModal', false)" 
                            type="button" 
                            class="
                                inline-flex 
                                w-full 
                                justify-center 
                                rounded-md 
                                border 
                                border-transparent 
                                bg-red-600 
                                px-4 
                                py-2 
                                text-base 
                                font-medium 
                                text-white 
                                shadow-sm 
                                hover:bg-red-700 
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-red-500 
                                focus:ring-offset-2 
                                ml-3 
                                w-auto 
                                text-sm"
                        >
                            Cancel
                        </button>

                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup>
    import { ref, defineEmits } from 'vue';
    import 'vue-advanced-cropper/dist/style.css';

    const emit = defineEmits(['croppedImageData', 'showModal'])



    let fileInput = ref(null)
    let uploadedImage = ref(null)
    let croppedImageData = { file: null, imageUrl: null, height: null, width: null, left: null, top: null, }

    const getUploadedImage = (e) => {
        const file = e.target.files[0];
        uploadedImage.value = URL.createObjectURL(file);
    }

    const crop = () => {
        
        croppedImageData.file = fileInput.value.files[0]

        emit('croppedImageData', croppedImageData)
        emit('showModal', false)

    }
</script>

<style lang="scss">
    .dynamic-img {
        max-width: 100%;
    height: auto;
    width: auto\9; /* ie8 */
    }
</style>
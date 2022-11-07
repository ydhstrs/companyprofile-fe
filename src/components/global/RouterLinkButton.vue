<template>
    <router-link 
        class="
            float-right 
            bg-transparent 
            text-gray-900 
            font-semibold 
            hover:text-white
            py-2 
            px-4 
            border  
            hover:border-transparent 
            rounded"
        :to="url"
        :class="[color ? 'hover:bg-' + color + '-500 border-' + color + '-500 border-' + color + '-500' : '']"
    >
        {{ btnText }}
    </router-link>
</template>

<script setup>
    import { defineProps, toRefs } from 'vue'

    // PROPS
    const props = defineProps({ btnText: String, color: String, url: String })
    const { btnText, color } = toRefs(props)
    // PROPS END

</script>
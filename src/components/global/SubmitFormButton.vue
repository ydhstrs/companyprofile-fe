<template>
    <div>
        <button class="
            float-right
            mt-2 
            inline-block 
            bg-green-500 
            hover:bg-green-700 
            font-bold 
            text-white 
            no-underline 
            px-4
            py-3 
            shadow-lg"
            @click="$emit('submit', true)"
        >
           {{ btnText }}
        </button>
    </div>
</template>

<script setup>
    import { defineProps, toRefs } from 'vue'

    // PROPS
    const props = defineProps({ btnText: String })
    const { btnText } = toRefs(props)
    // PROPS END

</script>
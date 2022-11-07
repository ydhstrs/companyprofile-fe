<template>
    <div>
        <label class="
            block 
            uppercase 
            tracking-wide 
            text-gray-900 
            text-xs 
            font-bold"
        >
            {{ label }}
        </label>
        <button class="
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
            @click="$emit('showModal', true)"
        >
           {{ btnText }}
        </button>
    </div>
</template>

<script setup>
    import { defineProps, toRefs } from 'vue'

    // PROPS
    const props = defineProps({ label: String, btnText: String })
    const { label, btnText } = toRefs(props)
    // PROPS END

</script>
<template>
    <div class="fixed top-0 left-0 mt-12 ml-4 bg-green-700 text-white p-2 rounded-xl opacity-95 animate-bounce">
        <h3>{{ props.alertText }}</h3>
    </div>
</template>

<script setup>
    const props = defineProps({
        alertText: String
    })
</script>
<template>
    <div class="flex gap-4 flex-wrap">
        <div v-for="aventos in aventosList[0]" class="border" v-if="aventosList[0]">
            <RouterLink :to="`item/${aventos.name}`" >
                <h3>{{ aventos.name }}</h3> 
                <img :src="aventos.img" :alt="aventos.name" width="200">
            </RouterLink>
        </div>
        <div v-else>
            loading...
        </div>
    </div>
</template>

<script setup>
    import { useStore } from '@/stores/useStore';
    import { onBeforeMount, ref } from 'vue';
    import { RouterLink } from 'vue-router';

    const aventosStore = useStore()
    const aventosList = ref()

    onBeforeMount(() =>{
        useStore().getFurnitures()
        aventosList.value = aventosStore.aventos
    })
    
</script>
<template>
    <div v-for="item in aventosList[0]">
        <div class=" m-8"  v-if="item.name === $route.params.name">
            <div class="bg-green-900 w-fit px-2 my-2 text-white">
                <RouterLink to="/">
                   <  назад
                </RouterLink>
            </div>
            <div class="flex gap-12 items-center">
                <img :src="item.img" :alt="item.name" width="400">
                <div>
                    <h3 class="mb-4 text-2xl font-semibold">{{ item.name }}</h3>
                    <h3 class="text-xl">{{ item.description }}</h3>
                </div>
            </div>
           <div id="detailing">
                <calcAventos :color="item.color" :aventos="$route.params.name" :type="item.type" :img="item.img" />
           </div>
        </div>
    </div>
</template>

<script setup>
    import { useStore } from '@/stores/useStore';
    import calcAventos from '@/utils/calcAventos.vue';
    import { onBeforeMount, ref } from 'vue';

    const aventosStore = useStore()
    const aventosList = ref()

    onBeforeMount(() =>{
        useStore().getFurnitures()
        aventosList.value = aventosStore.aventos
    })
</script>
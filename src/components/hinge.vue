<template>
    <div class="flex gap-4 flex-wrap">
        <div v-for="hinge in hingeList[0]" class="border" v-if="hingeList[0]">
            <button @click="openHingeModal(hinge)">
                <h3>{{ hinge.name }}</h3> 
                <img :src="hinge.img" :alt="hinge.name" width="200">
            </button>
        </div>
    </div>
    <hingeModule :chosen-hinge="chosenHinge" :is-modal-open="isModalOpen">
        <button class="absolute top-0 right-0 bg-green-900 m-2 text-white px-2 rounded-lg" @click="isModalOpen = false">закрыть</button>
    </hingeModule>
</template>

<script setup>
    import { useStore } from '@/stores/useStore';
    import { onBeforeMount, ref } from 'vue';
    import hingeModule from '@/components/hingeModule.vue'

    const hingeStore = useStore()
    const hingeList = ref()
    const chosenHinge = ref()
    const isModalOpen = ref(false)

    onBeforeMount(() =>{
        hingeList.value = hingeStore.hinge
    })

    function openHingeModal(hinge){
        chosenHinge.value = hinge
        isModalOpen.value = true
    }

</script>
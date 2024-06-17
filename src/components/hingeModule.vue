<template>
    <div class="fixed top-0 bottom-0 left-0 right-0" v-if="isModalOpen">
        <div class="bg-[rgba(0,0,0,0.8)] w-full h-full flex justify-center items-center z-20">
            <div class="bg-white px-12 py-6 rounded-xl relative flex flex-col gap-6 justify-center items-center">
            <slot />
                <h3 class="text-center">{{ $props.chosenHinge.name }}</h3>
                <div class="flex flex-col items-center justify-center gap-4">
                    <h3>выберите конструкцию</h3>
                    <div class="flex gap-14">
                        <div v-for="constructionImg in $props.chosenHinge.construction[0].img" >
                            <img :src="constructionImg" alt="" width="100">
                        </div>
                    </div>
                    <div class="flex gap-12">
                        <div v-for="construction in $props.chosenHinge.construction[0].name">
                            <button :class="chosenConstruction === construction ? 'bg-green-900 text-white' : '' "
                                    class="border px-2 py-1"
                                    @click="chosenConstruction = construction">
                                {{ construction }}</button>
                        </div>
                    </div>
                </div>
                
                <h3 class="text-center">выберите тип петли</h3>

                <div class="flex gap-4">
                    <button :class="chosenType === type ? 'bg-green-900 text-white' : '' "
                            @click="chosenType = type"
                            class="border px-2 py-1" v-for="type in $props.chosenHinge.type">
                            {{ type }}
                    </button>
                </div>
                <div>
                    <label for="count">количество:</label>
                    <input type="number" id="count" class="ml-4 border border-black" v-model="hingeCount">    
                </div>

                <button class="bg-green-900 w-fit m-auto text-white px-2 py-1 mt-4"
                        @click="addToCard()"
                >добавить в корзину
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '@/stores/useStore';
import { ref } from 'vue';

    const chosenType = ref("без пружинка")
    const chosenConstruction = ref("накладная")
    const hingeCount = ref(1)
    const sendToCart = ref()
    sendToCart.value = useStore().pickedFurniture

    const props = defineProps({
        chosenHinge: Object,
        isModalOpen: Boolean
    })


    function addToCard(){

        const result = ref({
            name: props.chosenHinge.name,
            type: chosenType.value,
            chosenConstruction: chosenConstruction.value,
            count: hingeCount.value,
            img: props.chosenHinge.img
        })

        const existingItem = sendToCart.value.find(item => (item.name === result.value.name) && (item.type === result.value.type) && (item.chosenConstruction === result.value.chosenConstruction))

        if(existingItem){
            console.log(existingItem.count)
            existingItem.count++
        }else{
            sendToCart.value.push(result.value)
        }

        localStorage.setItem('item', JSON.stringify(sendToCart.value))

    }

</script>
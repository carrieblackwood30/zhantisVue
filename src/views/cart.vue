<template>
    <added v-if="alertCustom" :alert-text="`отправлено`" />
    <div class="w-full h-full">
        <div class="flex gap-4 items-center m-auto" v-for="item in itemsStore">
        <div class="w-[140px]">
            <img :src="item.img" :alt="item.name" width="100">
            <h3>{{ item.name }}</h3>
        </div>
        <div class="w-[220px]">
            <h3>{{ item.power }}</h3>
            <h3 v-if="item.color">цвет: {{ item.color }} </h3>
            <h3 v-if="item.lever">{{ item.lever }}</h3>
            <h3>{{ item.type }}</h3>
            <h3 v-if="item.chosenConstruction">{{ item.chosenConstruction }}</h3>
        </div>
        <div class="flex gap-3 w-[320px]">
            <h3>количество:</h3>
            <button class="bg-green-900 w-4 h-4 rounded-full text-white" @click="increaseDecreaseBtn(item, +1)">+</button>
            <h3>{{ item.count }}</h3>
            <button class="bg-green-900 w-4 h-4 rounded-full text-white" @click="increaseDecreaseBtn(item, -1)">-</button>
        </div>

        <div class="w-10 h-10 bg-red-500 rounded-full cursor-pointer" @click="delItem(item)">
            <img src="@/assets/icons/trash-icon.svg" alt="trash icon" width="50">
        </div>

        </div>
    </div>
    <button @click="sendMessage()">отправить</button>
</template>

<script setup>
    import { useStore } from '@/stores/useStore';
    import { onBeforeMount, ref } from 'vue';
    import axios from 'axios';
    import added from '@/components/UI/added.vue';

    const itemsStore = useStore().pickedFurniture
    const furnitureList = ref(null)
    const aventosStore = useStore()
    const alertCustom = ref()
    const telegram_bot_token = "6661322145:AAHUebxQakqaR1ARyIBti_bDqvhJ2VpKXTw"
    const chat_id = "-1002206364591"

    onBeforeMount(() =>{
        useStore().getFurnitures()
        furnitureList.value = aventosStore.aventos
    })

    function increaseDecreaseBtn(itemCart, calc){
        const findItem = itemsStore.find(item => itemCart === item)

        if(calc === -1){
            if(findItem.count > 1){
                findItem.count--
            }else{
                delItem(findItem)
            }
        }else if(calc === +1){
            findItem.count++
        }

        localStorage.setItem("item", JSON.stringify(itemsStore))
    }

    function delItem(itemCart){
        const deletingItem = itemsStore.find(item => itemCart === item)

        if(itemsStore.length > 1){
            itemsStore.splice(itemsStore.indexOf(deletingItem), 1)
        }

        localStorage.setItem("item", JSON.stringify(itemsStore))
    }

    function sendMessage(){

        const bodySend = ref([])

        for (let i = 0; i < itemsStore.length; i++) {
            bodySend.value.push(
            `${itemsStore[i].name} %0A
            ${itemsStore[i].count}шт %0A
            `)
            if(itemsStore[i].power){
                bodySend.value.push(`${itemsStore[i].power} %0A`)
            }
            if(itemsStore[i].lever){
                bodySend.value.push(`${itemsStore[i].lever} %0A `)
            }
            if(itemsStore[i].type){
                bodySend.value.push(`${itemsStore[i].type}%0A`)
            }
            if(itemsStore[i].chosenConstruction){
                bodySend.value.push(`${itemsStore[i].chosenConstruction} %0A %0A`)
            }
            if(itemsStore[i].color){
                bodySend.value.push(`цвет ${itemsStore[i].color} %0A %0A `)
            }
        }

        axios.post(`https://api.telegram.org/bot${telegram_bot_token}/sendMessage?chat_id=${chat_id}&text=${
            bodySend.value
        }`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

        alertCustom.value = true

        setTimeout(() => {
            alertCustom.value = false
            location.reload()
        }, 2000);

        localStorage.clear("item")
    }

    




</script>
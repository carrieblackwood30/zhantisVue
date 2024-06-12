<template>
    <div class="w-full h-full">
        <div class="flex gap-4 items-center m-auto" v-for="item in items">
        <div class="w-[140px]">
            <img :src="item.img" :alt="item.name" width="100">
            <h3>{{ item.name }}</h3>
        </div>
        <div class="w-[220px]">
            <h3>{{ item.power }}</h3>
            <h3 v-if="item.color">цвет: {{ item.color }} </h3>
            <h3 v-if="item.lever">{{ item.lever }}</h3>
            <h3>{{ item.type }}</h3>
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

    const items = ref(JSON.parse(localStorage.getItem("item")))
    const furnitureList = ref(null)
    const aventosStore = useStore()
    const telegram_bot_token = "6661322145:AAHUebxQakqaR1ARyIBti_bDqvhJ2VpKXTw"
    const chat_id = "-1002206364591"

    onBeforeMount(() =>{
        useStore().getFurnitures()
        furnitureList.value = aventosStore.aventos
    })

    function increaseDecreaseBtn(itemCart, calc){
        const findItem = items.value.find(item => itemCart === item)

        if(calc === -1){
            if(findItem.count > 1){
                findItem.count--
            }else{
                items.value.splice(findItem, 1)
            }
        }else if(calc === +1){
            findItem.count++
        }

        localStorage.setItem("item", JSON.stringify(items.value))
    }

    function delItem(itemCart){
        const deletingItem = items.value.find(item => item === itemCart)

        if(deletingItem){
            items.value.splice(deletingItem, 1)
        }

        localStorage.setItem("item", JSON.stringify(items.value))
    }

    function sendMessage(){
        axios.post(`https://api.telegram.org/bot${telegram_bot_token}/sendMessage?chat_id=${chat_id}&text=${
            JSON.stringify(items.value)
        }`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

</script>
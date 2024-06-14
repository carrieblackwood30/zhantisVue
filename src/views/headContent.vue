<template>
    <div class="flex justify-between px-12 py-4 items-center">
        
        <RouterLink to="/">
            <h1 class="bg-green-600 w-[200px] text-xl text-white text-center p-2">Logo</h1>
        </RouterLink>

        <div class="relative">
            <input type="text" 
            class="border border-black w-[400px] rounded-xl h-10 pl-2" 
            placeholder="поиск..."
            v-model="modelForSearch" 
            @input="searchItems()"
            >
            <div class="w-[400px] absolute bg-white">
                <div v-for="item in sortedItems" class="flex">
                    <img :src="item.img" :alt="item.name" width="50">
                    <h3>{{ item.name }}</h3>
                </div>
            </div>
        </div>



            <div class="flex items-center gap-4">
            <div>
                <p>пн - пт: с 8.00 до 17.00</p>
                <img src="../assets/icons/phone.svg" alt="phone" width="20" class="inline">
                <a href="https://api.whatsapp.com/send?phone=77078029059">+7-707-802-90-59</a>
            </div>
                <RouterLink to="/cart">
                    <div class="relative">
                        <img src="@/assets/icons/shopping-cart.svg" alt="shopping cart" width="40">
                        <div class="">
                            <p class="absolute top-4 w-4 text-center bg-green-500 rounded-full">{{  itemsCount.length }}</p>
                        </div>
                    </div>
                </RouterLink>
            </div>


    </div>

</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useStore } from '@/stores/useStore';
import { ref } from 'vue';

const items = useStore().aventos
const sortedItems = ref(null)
const modelForSearch = ref()
const itemsCount = ref(JSON.parse(localStorage.getItem('item')) || '')


function searchItems(){
    sortedItems.value = items[0].filter(item => item.name === modelForSearch.value)
}

</script>
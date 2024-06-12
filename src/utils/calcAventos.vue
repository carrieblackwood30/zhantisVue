<template>
    <added v-if="alert" />
    <form class="flex flex-col m-10 w-[400px]" @submit.prevent="calcPowerAndLever()">
        <h3>Высчитать силовик и рычаг</h3>
        <label for="height">Высота фасада:</label>
        <input type="number" id="height" class="w-[180px]" v-model="height">
        <label for="width">Ширина фасада:</label>
        <input type="number" id="width" class="w-[180px]" v-model="width">
        <div>
            <h3>толщина фасада:</h3>
            <div class="flex gap-4">
                <button type="button"
                class="w-10 h-6 rounded-xl"
                :class="thickness === 16 ? 'bg-green-900 text-white' : '' "
                @click="thickness = 16"
                >16</button>
                <button type="button"
                class="w-10 h-6 rounded-xl"
                :class="thickness === 18 ? 'bg-green-900 text-white' : '' " 
                @click="thickness = 18"
                >18</button>
            </div>
        </div>
        <div v-if="$props.type">
            <h3>тип открывания:</h3>
            <div class="flex gap-4">
                <button v-for="openType in $props.type"
                    type="button"
                    class="rounded-xl px-2 py-1"
                    :class="chosenType === openType ? 'bg-green-900 text-white' : '' "
                    @click="chosenType = openType"
                    >
                    {{ openType }}
                </button>
            </div>
        </div>
        <div>
            <div v-if="$props.color">
                <h3>цвет заглушки:</h3>
                <div class="flex gap-4">
                    <button v-for="color in $props.color"
                        type="button"
                        class="rounded-xl px-2 py-1"
                        :class="chosenColor === color ? 'bg-green-900 text-white' : ''"
                        @click="chosenColor = color"
                    > {{ color }} </button>
                </div>
            </div>
            <button class="my-4 bg-green-950 rounded-xl p-1 text-white">добавить</button>
        </div>

    </form>

</template>

<script setup>
import { ref } from 'vue';
import added from "@/components/UI/added.vue"

const props = defineProps({
    aventos: String,
    color: Array,
    type: Array,
    img: String
})

const chosenColor = ref('white')
const chosenType = ref('BLUMOTION')

console.log(chosenType.value)

const alert = ref(false)

const height = ref(null)
const width = ref(null)
const sendToCart = ref()
const thickness = ref(16)
sendToCart.value = JSON.parse(localStorage.getItem('item')) || []

function calcPowerAndLever(){

    const resultOfMass = ref(null)
    const power = ref(null)
    const lever = ref(null)

    if(props.aventos === "AVENTOS HF"){

        if(height.value > 1040){
            alert('не доступная высота')
        }

        if(thickness.value === 18){
            resultOfMass.value = height.value * width.value * .113 / 10000
        }
        if(thickness.value === 16){
            resultOfMass.value = height.value * width.value * .1305  / 10000
        }

        const coefficient = height.value * resultOfMass.value

        if(coefficient >= 2600 && coefficient <= 5500){
            power.value = 'силовик 22'
        }else if(coefficient >= 5350 && coefficient <= 10150){
            power.value = 'силовик 25'
        }else if(coefficient >= 9000 && coefficient <= 17250){
            power.value = 'силовик 28'
        }

        if(height.value >= 480 && height.value <= 570){
            lever.value = 'рычаг 32'
        }else if(height.value >= 560 && height.value <= 710){
            lever.value = 'рычаг 35'
        }else if(height.value >= 700 && height.value <= 900){
            lever.value = 'рычаг 38'
        }
        else if(height.value >= 760 && height.value <= 1040){
            lever.value = 'рычаг 39'
        }

        const result = ref({
            name: props.aventos,
            img: props.img,
            power: power.value,
            lever: lever.value,
            color: chosenColor.value,
            count: 1
        })

        const existingItem = sendToCart.value.find(item => (item.name === result.value.name) && (item.power === result.value.power) && (item.lever === result.value.lever) && (item.color === result.value.color))
        if(existingItem){
            console.log(existingItem.count)
            existingItem.count++
        }else{
            sendToCart.value.push(result.value)
        }

        localStorage.setItem('item', JSON.stringify(sendToCart.value))

        alert.value = true

        setTimeout(() => {
            alert.value = false
        }, 2000);


    }else if(props.aventos === "AVENTOS HS"){

        if(height.value > 800){
            alert('не доступная высота')
        }

        if(thickness.value === 18){
            resultOfMass.value = height.value * width.value * .113 / 10000
        }
        if(thickness.value === 16){
            resultOfMass.value = height.value * width.value * .1305  / 10000
        }

        if(height.value >= 350 && height.value <= 525){

            if(resultOfMass.value >= 2 && resultOfMass.value <= 5){
                power.value = 'силовик A'
            }else if(resultOfMass.value >= 5 && resultOfMass.value <= 9){
                power.value = 'силовик B'
            }else if(resultOfMass.value >= 9 && resultOfMass.value <= 10){
                power.value = 'силовик C'
            }

        }else if(height.value >= 526 && height.value <= 675){
            if(resultOfMass.value >= 3 && resultOfMass.value <= 6){
                power.value = 'силовик D'
            }else if(resultOfMass.value >= 7 && resultOfMass.value <= 13){
                power.value = 'силовик E'
            }else if(resultOfMass.value >= 13 && resultOfMass.value <= 16){
                power.value = 'силовик F'
            }
        }else if(height.value >= 676 && height.value <= 800){
            if(resultOfMass.value >= 4 && resultOfMass.value <= 8){
                power.value = 'силовик G'
            }else if(resultOfMass.value >= 8 && resultOfMass.value <= 13){
                power.value = 'силовик H'
            }else if(resultOfMass.value >= 13 && resultOfMass.value <= 21){
                power.value = 'силовик I'
            }
        }

        const result = ref({
            name: props.aventos,
            img: props.img,
            power: power.value,
            color: chosenColor.value,
            count: 1
        })

        const existingItem = sendToCart.value.find(item => (item.name === result.value.name) && (item.power === result.value.power) && (item.color === result.value.color))
        if(existingItem){
            console.log(existingItem.count)
            existingItem.count++
        }else{
            sendToCart.value.push(result.value)
        }

        localStorage.setItem('item', JSON.stringify(sendToCart.value))

        alert.value = true

        setTimeout(() => {
            alert.value = false
        }, 2000);

    } else if(props.aventos === "AVENTOS HL"){
        if(height.value > 580){
            alert('не доступная высота')
        }

        if(thickness.value === 18){
            resultOfMass.value = height.value * width.value * .113 / 10000
        }
        if(thickness.value === 16){
            resultOfMass.value = height.value * width.value * .1305  / 10000
        }

        if(height.value >= 300 && height.value <= 349){
            lever.value = 'рычаг 32'
            if(resultOfMass.value >= 2 && resultOfMass.value <= 4){
                power.value = 'силовик 21'
            }else if(resultOfMass.value >= 4 && resultOfMass.value <= 7){
                power.value = 'силовик 23'
            }else if(resultOfMass.value >= 7 && resultOfMass.value <= 12){
                power.value = 'силовик 25'
            }else if(resultOfMass.value >= 11 && resultOfMass.value <= 20){
                power.value = 'силовик 27'
            }
        }

        if(height.value >= 350 && height.value <= 399){
            lever.value = 'рычаг 35'
            if(resultOfMass.value >= 2 && resultOfMass.value <= 3){
                power.value = 'силовик 21'
            }else if(resultOfMass.value >= 3 && resultOfMass.value <= 5){
                power.value = 'силовик 23'
            }else if(resultOfMass.value >= 5 && resultOfMass.value <= 9){
                power.value = 'силовик 25'
            }else if(resultOfMass.value >= 8 && resultOfMass.value <= 14){
                power.value = 'силовик 27'
            }else if(resultOfMass.value >= 13 && resultOfMass.value <= 20){
                power.value = 'силовик 29'
            }
        }

        if(height.value >= 400 && height.value <= 550){
            lever.value = 'рычаг 38'
            if(resultOfMass.value >= 2 && resultOfMass.value <= 3){
                power.value = 'силовик 23'
            }else if(resultOfMass.value >= 3 && resultOfMass.value <= 6){
                power.value = 'силовик 25'
            }else if(resultOfMass.value >= 6 && resultOfMass.value <= 11){
                power.value = 'силовик 27'
            }else if(resultOfMass.value >= 10 && resultOfMass.value <= 20){
                power.value = 'силовик 29'
            }
        }

        if(height.value >= 450 && height.value <= 580){
            lever.value = 'рычаг 39'
            if(resultOfMass.value >= 2 && resultOfMass.value <= 5){
                power.value = 'силовик 25'
            }else if(resultOfMass.value >= 5 && resultOfMass.value <= 9){
                power.value = 'силовик 27'
            }else if(resultOfMass.value >= 9 && resultOfMass.value <= 16){
                power.value = 'силовик 29'
            }
        }

        const result = ref({
            name: props.aventos,
            img: props.img,
            power: power.value,
            lever: lever.value,
            color: chosenColor.value,
            count: 1
        })

        const existingItem = sendToCart.value.find(item => (item.name === result.value.name) && (item.power === result.value.power) &&(item.lever === result.value.lever) && (item.color === result.value.color))
        if(existingItem){
            console.log(existingItem.count)
            existingItem.count++
        }else{
            sendToCart.value.push(result.value)
        }

        localStorage.setItem('item', JSON.stringify(sendToCart.value))

        alert.value = true

        setTimeout(() => {
            alert.value = false
        }, 2000);

    }else if(props.aventos === 'AVENTOS HK-TOP'){
        if(height.value > 600){
            alert('не доступная высота')
        }

        if(thickness.value === 18){
            resultOfMass.value = height.value * width.value * .113 / 10000
        }
        if(thickness.value === 16){
            resultOfMass.value = height.value * width.value * .1305  / 10000
        }

        const coefficient = height.value * resultOfMass.value

        if(coefficient >= 480 && coefficient <= 1500){
            power.value = 'силовик 23'
        }else if(coefficient >= 750 && coefficient <= 2500){
            power.value = 'силовик 25'
        }else if(coefficient >= 1500 && coefficient <= 4900){
            power.value = 'силовик 27'
        }else if(coefficient >= 3200 && coefficient <= 9000){
            power.value = 'силовик 29'
        }

        const result = ref({
            name: props.aventos,
            img: props.img,
            power: power.value,
            type: chosenType.value,
            color: chosenColor.value,
            count: 1
        })

        const existingItem = sendToCart.value.find(item => (item.name === result.value.name) && (item.power === result.value.power) && (item.color === result.value.color))
        if(existingItem){
            console.log(existingItem.count)
            existingItem.count++
        }else{
            sendToCart.value.push(result.value)
        }

        localStorage.setItem('item', JSON.stringify(sendToCart.value))

        alert.value = true

        setTimeout(() => {
            alert.value = false
        }, 2000);

    } else if(props.aventos === 'AVENTOS HK-S'){
        if(height.value > 600){
            alert('не доступная высота')
        }

        if(thickness.value === 18){
            resultOfMass.value = height.value * width.value * .113 / 10000
        }
        if(thickness.value === 16){
            resultOfMass.value = height.value * width.value * .1305  / 10000
        }

        const coefficient = height.value * resultOfMass.value

        if(coefficient >= 220 && coefficient <= 500){
            power.value = 'силовик B'
        }else if(coefficient >= 400 && coefficient <= 1000){
            power.value = 'силовик C'
        }else if(coefficient >= 960 && coefficient <= 2200){
            power.value = 'силовик E'
        }

        const result = ref({
            name: props.aventos,
            img: props.img,
            power: power.value,
            type: chosenType.value,
            color: chosenColor.value,
            count: 1
        })

        const existingItem = sendToCart.value.find(item => (item.name === result.value.name) && (item.power === result.value.power) && (item.color === result.value.color))
        if(existingItem){
            console.log(existingItem.count)
            existingItem.count++
        }else{
            sendToCart.value.push(result.value)
        }

        localStorage.setItem('item', JSON.stringify(sendToCart.value))

        alert.value = true

        setTimeout(() => {
            alert.value = false
        }, 2000);

    }else if(props.aventos === 'AVENTOS HK-XS'){
        if(height.value > 600){
            alert('не допустимая высота')
        }

        if(thickness.value === 18){
            resultOfMass.value = height.value * width.value * .113 / 10000
        }
        if(thickness.value === 16){
            resultOfMass.value = height.value * width.value * .1305  / 10000
        }

        const coefficient = height.value * resultOfMass.value

        if(chosenType.value === "BLUMOTION"){
            if(coefficient >= 200 && coefficient <= 1000){
                power.value = 'силовик 11'
            }else if(coefficient >= 500 && coefficient <= 1500){
                power.value = 'силовик 13'
            }else if(coefficient >= 800 && coefficient <= 1800){
                power.value = 'силовик 15'
            }else if(coefficient >= 1800 && coefficient <= 3600){
                power.value = 'силовик 15 - x2'
            }
        }

        if(chosenType.value === "tip-on"){
            if(coefficient >= 180 && coefficient <= 800){
                power.value = 'силовик 11'
            }else if(coefficient >= 500 && coefficient <= 1200){
                power.value = 'силовик 13'
            }else if(coefficient >= 800 && coefficient <= 1600){
                power.value = 'силовик 15'
            }else if(coefficient >= 1600 && coefficient <= 3200){
                power.value = 'силовик 15 - x2'
            }
        }

        const result = ref({
            name: props.aventos,
            img: props.img,
            power: power.value,
            type: chosenType.value,
            count: 1
        })

        const existingItem = sendToCart.value.find(item => (item.name === result.value.name) && (item.power === result.value.power))
        if(existingItem){
            console.log(existingItem.count)
            existingItem.count++
        }else{
            sendToCart.value.push(result.value)
        }

        localStorage.setItem('item', JSON.stringify(sendToCart.value))

        alert.value = true

        setTimeout(() => {
            alert.value = false
        }, 2000);
    }

    width.value = ''
    height.value = ''
}


</script>
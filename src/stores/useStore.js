import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";

export const useStore = defineStore('store', () => {
    const aventos = ref([])
    const hinge = ref([])

    const pickedFurniture = ref([]) 

    function getFurnitures(){
        axios.get(`https://665d5c77e88051d604063ff1.mockapi.io/api/v1/aventos`)
        .then((response) => {
            aventos.value.push(response.data[0].aventos)
            hinge.value.push(response.data[0].hinge)
        })
    }

    pickedFurniture.value = JSON.parse(localStorage.getItem("item")) || []

    const totalFurnitureCount = computed(() =>{
        return pickedFurniture.value.reduce((a, b) => a+= b.count, 0 )
    })

    return { getFurnitures, aventos, hinge, pickedFurniture, totalFurnitureCount }
})
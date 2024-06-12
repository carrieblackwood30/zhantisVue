import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useStore = defineStore('store', () => {
    const aventos = ref([])

    function getFurnitures(){
        axios.get(`https://665d5c77e88051d604063ff1.mockapi.io/api/v1/aventos`)
        .then((response) => {
            aventos.value.push(response.data[0].aventos)
        })
    }

    return { getFurnitures, aventos }
})
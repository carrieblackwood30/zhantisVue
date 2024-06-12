<template>
    <div class="mx-10 flex gap-4">
        <div class="flex flex-col gap-3 w-[200px]">
            <div v-for="item in items" :key="item" class="cursor-pointer">
                <h3 @click="chosenItem = item; console.log(chosenItem)">{{ item }}</h3>
            </div>
        </div>
        <div>
            <aventos v-if="chosenItem === `подъемники AVENTOS`" />
            <petli v-if="chosenItem === `система петель`" />
            <runners v-if="chosenItem === `направляющие`" />
            <boxSystems v-if="chosenItem === `боксовые системы`" />
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    import aventos from '@/components/aventos.vue'
    import petli from '@/components/petli.vue'
    import runners from '@/components/runners.vue';
    import boxSystems from '@/components/boxSystems.vue';
    
    const items = ['подъемники AVENTOS', 'система петель', 'направляющие', 'боксовые системы']
    const chosenItem = ref('подъемники AVENTOS' )

</script>
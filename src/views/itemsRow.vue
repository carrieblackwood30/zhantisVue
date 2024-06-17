<template>
    <div class="mx-10 flex gap-4">
        <div class="flex flex-col gap-3 w-[200px]" v-if="route.path !== '/cart' " >
            <div v-for="item in items" :key="item" class="cursor-pointer">
                <RouterLink :to="`/${item.path}`">
                    <h3 @click="chosenItem = item; console.log(chosenItem)">{{ item.name }}</h3>
                </RouterLink>
            </div>
        </div>
        <div>
            <RouterView />
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    
    const items = [
        {
            name: "подъемники AVENTOS",
            path: "aventos"
        },
        {
            name: "система петель",
            path: "hinge"
        },
        {
            name: "направляющие",
            path: "runnerSystems"
        },
        {
            name: "боксовые системы",
            path: "boxSystems"
        }
    ]
    const chosenItem = ref('подъемники AVENTOS' )
    const route = useRoute()

</script>
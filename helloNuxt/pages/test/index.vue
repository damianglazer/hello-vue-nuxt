<script setup>
    // const dataList = ref([]);
    const { data } = await useFetch('https://picsum.photos/v2/list');
    // dataList.value = data.value;
    
</script>

<template>
    <div class="TestModule">
        Test Page
        <Button>
            <b>test</b>
        </Button>
        <div v-for="image in data" :key="image.id">
            <!-- <div>{{image.author}}</div> -->
            <nuxt-link :to="`/test/${image.id}`">{{image.author}}</nuxt-link>
        </div>
    </div>
</template>
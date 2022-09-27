<script setup>
import { useRoute } from "vue-router";
import {ref, onBeforeMount} from 'vue';
import axios from 'axios';

const router = useRoute();
const imageDetails = ref({})

const getData = async () => {
    const { data } = await axios(`https://picsum.photos/id/${router.params.id}/info`);

    imageDetails.value = data;
}

onBeforeMount(() => {
    getData();
});
</script>

<template>
    <div>
        Details
        {{ router.params.id }}
        <pre>{{imageDetails}}</pre>
    </div>
</template>
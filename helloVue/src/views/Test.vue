<script setup>
  import {ref, onBeforeMount} from 'vue';
  import axios from 'axios';
  import { RouterLink } from 'vue-router'

  const blur = ref(1);
  const width = ref(200);
  const height = ref(200);
  const page = ref(1);
  const imagesList = ref([]);

  const check = () => {
    blur.value
  }

  const getData = async (pageNumber = 1) => {
    if(pageNumber <= 0) {
      return;
    }

    const { data } = await axios(`https://picsum.photos/v2/list?page=${pageNumber}`);

    imagesList.value = data;
    page.value = pageNumber

    return data;
  }

  onBeforeMount(() => {
    getData();
  });
</script>

<template>
  <div>
    Test {{blur}}
    <button @click="blur++">Dodaj</button>
    <button @click="blur--">Odejmij</button>
    <img alt="Vue logo" class="logo" :src="`https://picsum.photos/id/40/${width}/${height}${blur > 0 ? '?blur='+blur : ''}`" />
  
  {{`https://picsum.photos/id/40/${width}/${height}${blur > 0 ? '?blur='+blur : ''}`}}
  <div>
    <label>
      <span>Wysokość</span>
      <input type="number" v-model="width"/>
    </label>
    <hr />
    <label>
      <span>Szerokość</span>
      <input type="number" v-model="height"/>
    </label>
  </div>
  <button @click="check">Sprawdź</button>

  <div class="list">
      <div v-for="image in imagesList" class="img-container" :key="image.id">
        <RouterLink :to="`/test/${image.id}`">
          {{image.author}}
          <img :src="`https://picsum.photos/id/${image.id}/${width}/${height}`" />
        </RouterLink>
      </div>
  </div>

  <div>
    <button @click="getData(page - 1)">Poprzednia</button>
    {{page}}
    <button @click="getData(page + 1)">Następna</button>
  </div>
  <!-- <div>
    <pre>{{imagesList}}</pre>
  </div> -->
  </div>
</template>

<style scoped>
  .list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .img-container {
    max-width: 20%;
  }
  img {
    width: 100%;
  }
</style>

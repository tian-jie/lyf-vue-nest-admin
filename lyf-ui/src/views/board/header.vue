<template>
  <header>
    <h1>{{title}}</h1>
    <!-- <button>Export</button>
    <button>+ New Column</button> -->
  </header>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps({
  title: String
});



</script>
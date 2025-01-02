<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="card" v-html="content"></div>
</template>

<script setup>
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})
</script>

<style>
.card {
  background-color: whitesmoke;
  border-radius: 6px;
  border: 1px solid black;
  margin-top: 10px;
  padding: 8px;
  white-space: pre-line;
}
</style>

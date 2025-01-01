<template>
  <header>
    <div class="header-content">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  description: String,
});
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}

.header-content {
  width: 100%;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}
</style>
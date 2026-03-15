<template>
  <div class="error-page">
    <div>{{ error.statusCode }}</div>
    <p>{{ error.message }}</p>
    <NuxtLink to="/">Вернуться на главную</NuxtLink>
  </div>
</template>
<script setup>
defineProps({
  error: {
    type: Object,
    required: true,
  },
})
</script>

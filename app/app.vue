<template>
  <NuxtPage />
  <PlayerBar />
</template>
<script setup>
onMounted(() => {
  const refresh = localStorage.getItem('refresh')
  if (refresh) {
    const intervalId = setInterval(async () => {
      const newTimer = localStorage.getItem('timer')
      if (Number(newTimer) >= 200 || !newTimer) {
        const response = await refreshToken(localStorage.getItem('refresh'))
        localStorage.setItem('access', response.access)
        localStorage.setItem('timer', 0)
      } else {
        const newTime = Number(newTimer) + 1
        localStorage.setItem('timer', newTime)
      }
    }, 1000)
    localStorage.setItem('intervalId', intervalId)
  }
})
</script>

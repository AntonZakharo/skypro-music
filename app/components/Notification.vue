<template>
  <Teleport to="body">
    <Transition name="notification">
      <div v-if="show" class="notification" :class="type">
        {{ message }}
      </div>
    </Transition>
  </Teleport>
</template>
<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'error',
    validator: (value) => ['error', 'success', 'info'].includes(value),
  },
})
</script>
<style scoped>
.notification {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 22px 64px;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 18px;
}

.notification.error {
  background-color: #ff4d4f;
}

.notification.success {
  background-color: #52c41a;
}

.notification.info {
  background-color: #1890ff;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 1s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translate(-50%, -100px);
}
</style>

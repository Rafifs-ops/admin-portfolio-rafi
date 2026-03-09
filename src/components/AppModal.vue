<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  show: Boolean,
  title: String,
  width: {
    type: String,
    default: '500px'
  }
})

const emit = defineEmits(['close'])

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.show) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-container glass-panel" :style="{ maxWidth: width }">

        <header class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-btn" @click="$emit('close')">×</button>
        </header>

        <section class="modal-body">
          <slot></slot>
        </section>

        <footer class="modal-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </footer>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  width: 90%;
  margin: 0 auto;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  background: rgba(15, 15, 20, 0.85);
  border: 1px solid var(--neon-blue);
  box-shadow: 0 10px 40px rgba(0, 240, 255, 0.2), inset 0 0 20px rgba(0, 240, 255, 0.05);
  overflow: hidden;
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--neon-blue);
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.close-btn:hover {
  color: var(--danger);
  background: rgba(255, 0, 60, 0.1);
  box-shadow: 0 0 10px rgba(255, 0, 60, 0.3);
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-body::-webkit-scrollbar {
  width: 6px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: var(--neon-blue);
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--glass-border);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-leave-active .modal-container {
  transition: all 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}
</style>

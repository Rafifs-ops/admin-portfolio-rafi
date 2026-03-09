<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary' // 'primary', 'secondary', 'danger', 'outline'
  },
  type: {
    type: String,
    default: 'button'
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button 
    :type="type" 
    class="app-btn"
    :class="[`btn-${variant}`, { 'btn-loading': loading }]"
    :disabled="loading"
  >
    <span class="btn-content" :class="{ 'hidden': loading }">
      <slot></slot>
    </span>
    <span v-if="loading" class="loader"></span>
  </button>
</template>

<style scoped>
.app-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
  border: none;
  overflow: hidden;
  z-index: 1;
}

.app-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.app-btn:hover::before {
  opacity: 0.1;
}

.app-btn:active {
  transform: scale(0.97);
}

.btn-primary {
  background: linear-gradient(135deg, #00f0ff 0%, #0080ff 100%);
  color: #000;
  box-shadow: 0 4px 15px rgba(0, 240, 255, 0.3);
}

.btn-primary:hover {
  box-shadow: 0 6px 20px rgba(0, 240, 255, 0.5);
}

.btn-secondary {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  backdrop-filter: blur(4px);
}

.btn-secondary:hover {
  border-color: var(--glass-highlight);
  background: rgba(255, 255, 255, 0.1);
}

.btn-danger {
  background: rgba(255, 0, 60, 0.1);
  border: 1px solid var(--danger);
  color: var(--danger);
}

.btn-danger:hover {
  background: var(--danger);
  color: #fff;
  box-shadow: 0 4px 15px rgba(255, 0, 60, 0.4);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--neon-blue);
  color: var(--neon-blue);
}

.btn-outline:hover {
  background: rgba(0, 240, 255, 0.1);
  box-shadow: inset 0 0 10px rgba(0, 240, 255, 0.2);
}

.hidden {
  opacity: 0;
}

/* Loader styling */
.loader {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: currentColor;
  animation: spin 1s ease-in-out infinite;
}

.btn-primary .loader {
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-top-color: #000;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

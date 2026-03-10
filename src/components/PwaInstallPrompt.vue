<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const deferredPrompt = ref(null);
const showPrompt = ref(false);

const handleInstallPrompt = (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt.value = e;
  // Update UI notify the user they can install the PWA
  showPrompt.value = true;
};

const installPWA = async () => {
  if (!deferredPrompt.value) return;
  
  // Show the install prompt
  deferredPrompt.value.prompt();
  
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.value.userChoice;
  console.log(`User response to the install prompt: ${outcome}`);
  
  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt.value = null;
  showPrompt.value = false;
};

const dismissPrompt = () => {
  showPrompt.value = false;
};

onMounted(() => {
  window.addEventListener('beforeinstallprompt', handleInstallPrompt);
});

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
});
</script>

<template>
  <Transition name="slide-up">
    <div v-if="showPrompt" class="pwa-prompt-container">
      <div class="pwa-prompt-card">
        <div class="pwa-info">
          <div class="pwa-icon">
            <img src="/pwa-192x192.png" alt="App Icon" />
          </div>
          <div class="pwa-text">
            <h4>Install Admin Portfolio</h4>
            <p>Install this app on your device for quick and easy access!</p>
          </div>
        </div>
        <div class="pwa-actions">
          <button class="btn-dismiss" @click="dismissPrompt">Later</button>
          <button class="btn-install" @click="installPWA">Install App</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.pwa-prompt-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
  pointer-events: none; /* Let clicks pass through container */
}

.pwa-prompt-card {
  background-color: #1a1a1f;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 20px;
  width: 380px;
  max-width: calc(100vw - 48px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
  pointer-events: auto; /* Re-enable clicks for the card */
  backdrop-filter: blur(10px);
}

.pwa-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pwa-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: #2a2a30;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.pwa-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pwa-text h4 {
  margin: 0 0 4px 0;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.pwa-text p {
  margin: 0;
  color: #a0a0b0;
  font-size: 0.85rem;
  line-height: 1.4;
  font-family: 'Inter', sans-serif;
}

.pwa-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

button {
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
}

.btn-dismiss {
  background-color: transparent;
  color: #a0a0b0;
}

.btn-dismiss:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.btn-install {
  background: linear-gradient(135deg, #007bff, #00d2ff);
  color: #fff;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.btn-install:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
}

.btn-install:active {
  transform: translateY(0);
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media (max-width: 480px) {
  .pwa-prompt-container {
    bottom: 80px; /* Above mobile bottom nav */
    right: 0;
    left: 0;
    justify-content: center;
    padding: 0 20px;
  }
  
  .pwa-prompt-card {
    width: 100%;
  }
}
</style>

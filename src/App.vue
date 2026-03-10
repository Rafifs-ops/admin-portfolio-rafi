<script setup>
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import PwaInstallPrompt from './components/PwaInstallPrompt.vue'
</script>

<template>
  <div class="app-layout">
    <Sidebar />
    <main class="main-content">
      <RouterView />
    </main>
    <PwaInstallPrompt />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  flex-grow: 1;
  padding: 32px;
  margin-left: 280px; /* Space for fixed sidebar */
  overflow-y: auto;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 16px;
    padding-bottom: 80px; /* Space for bottom nav on mobile */
  }
}
</style>

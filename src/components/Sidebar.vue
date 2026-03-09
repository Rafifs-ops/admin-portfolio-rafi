<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  { name: 'Dashboard', path: '/', icon: '◱' },
  { name: 'Skills', path: '/skills', icon: '⚡' },
  { name: 'Projects', path: '/projects', icon: '🚀' },
  { name: 'Certifications', path: '/certifications', icon: '🏆' },
  { name: 'Messages', path: '/messages', icon: '✉️' }
]
</script>

<template>
  <aside class="sidebar glass-panel">
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-icon">▲</span>
        <h2>AdminPort</h2>
      </div>
    </div>
    
    <nav class="sidebar-nav">
      <router-link 
        v-for="item in menuItems" 
        :key="item.name" 
        :to="item.path"
        class="nav-item"
        :class="{ active: route.path === item.path }"
      >
        <span class="icon">{{ item.icon }}</span>
        <span class="text">{{ item.name }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <div class="user-status">
        <div class="status-dot"></div>
        <span>System Online</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 16px;
  bottom: 16px;
  left: 16px;
  width: 248px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
}

.sidebar-header {
  padding: 32px 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 24px;
  color: var(--neon-blue);
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.8);
}

.logo h2 {
  font-size: 1.5rem;
  letter-spacing: 1px;
  background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.sidebar-nav {
  flex-grow: 1;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  border-radius: 12px;
  color: var(--text-secondary);
  font-weight: 500;
  transition: var(--transition);
  border: 1px solid transparent;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.nav-item.active {
  background: linear-gradient(90deg, rgba(0, 240, 255, 0.1), transparent);
  border-left: 3px solid var(--neon-blue);
  color: var(--neon-blue);
  box-shadow: inset 0 0 20px rgba(0, 240, 255, 0.05);
}

.nav-item.active .icon {
  color: var(--neon-blue);
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.8);
}

.icon {
  font-size: 1.2rem;
  transition: var(--transition);
}

.sidebar-footer {
  padding: 24px;
  border-top: 1px solid var(--glass-border);
}

.user-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: var(--success);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--success);
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    flex-direction: row;
    border-radius: 20px 20px 0 0;
    border-bottom: none;
    z-index: 100;
  }

  .sidebar-header, .sidebar-footer {
    display: none;
  }

  .sidebar-nav {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0;
    width: 100%;
  }

  .nav-item {
    flex-direction: column;
    padding: 8px;
    gap: 4px;
    border-radius: 8px;
    border-left: none;
  }

  .nav-item.active {
    border-left: none;
    border-bottom: 3px solid var(--neon-blue);
    background: radial-gradient(circle at bottom, rgba(0, 240, 255, 0.2), transparent 70%);
  }

  .nav-item .text {
    font-size: 0.7rem;
  }
}
</style>

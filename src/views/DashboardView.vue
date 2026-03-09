<script setup>
</script>

<template>
  <div class="dashboard fade-in">
    <header class="page-header">
      <div>
        <h1 class="page-title">Dashboard Overview</h1>
        <p class="page-subtitle">Welcome to the Admin Control Panel.</p>
      </div>
    </header>

    <div class="stats-grid">
      <div class="stat-card glass-panel glass-panel-hover" @click="$router.push('/skills')">
        <div class="stat-icon neon-blue">⚡</div>
        <div class="stat-info">
          <h3>Manage Skills</h3>
          <p>Add and edit technical skills.</p>
        </div>
      </div>
      
      <div class="stat-card glass-panel glass-panel-hover" @click="$router.push('/projects')">
        <div class="stat-icon neon-purple">🚀</div>
        <div class="stat-info">
          <h3>Manage Projects</h3>
          <p>Update your portfolio works.</p>
        </div>
      </div>
      
      <div class="stat-card glass-panel glass-panel-hover" @click="$router.push('/certifications')">
        <div class="stat-icon neon-green">🏆</div>
        <div class="stat-info">
          <h3>Certifications</h3>
          <p>Showcase your achievements.</p>
        </div>
      </div>
    </div>
    
    <div class="system-status glass-panel">
      <h2>System Status</h2>
      <div class="status-indicator">
        <div class="pulse-dot"></div>
        <span class="status-text">API Connection Active</span>
      </div>
      <p class="status-desc">Connected to <strong>https://rafi-portofolio.onrender.com</strong></p>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 8px;
  background: linear-gradient(90deg, #fff, var(--neon-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
}

.stat-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.neon-blue {
  color: var(--neon-blue);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
  border: 1px solid rgba(0, 240, 255, 0.3);
}

.neon-purple {
  color: var(--neon-purple);
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.2);
  border: 1px solid rgba(138, 43, 226, 0.3);
}

.neon-green {
  color: var(--success);
  box-shadow: 0 0 15px rgba(0, 255, 102, 0.2);
  border: 1px solid rgba(0, 255, 102, 0.3);
}

.stat-info h3 {
  margin-bottom: 4px;
  font-size: 1.2rem;
}

.stat-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.system-status {
  padding: 32px;
}

.system-status h2 {
  margin-bottom: 16px;
  font-size: 1.5rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.pulse-dot {
  width: 12px;
  height: 12px;
  background-color: var(--success);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(0, 255, 102, 0.7);
  animation: pulse 2s infinite;
}

.status-text {
  font-weight: 500;
  color: var(--success);
  letter-spacing: 1px;
}

.status-desc {
  color: var(--text-secondary);
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 255, 102, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 255, 102, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 255, 102, 0); }
}
</style>

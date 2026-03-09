<script setup>
import AppButton from './AppButton.vue'

const props = defineProps({
  columns: {
    type: Array, // Array of { key: 'name', label: 'Name' }
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="table-wrapper glass-panel">
    <table v-if="!loading && data.length > 0" class="data-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index" class="table-row">
          <td v-for="col in columns" :key="col.key">
            <template v-if="col.type === 'image'">
              <img :src="row[col.key]" class="cell-image" alt="Thumbnail" />
            </template>
            <template v-else-if="col.type === 'array'">
              <div class="tags-container">
                <span v-for="item in row[col.key]" :key="item" class="tag">{{ item }}</span>
              </div>
            </template>
            <template v-else-if="col.type === 'link'">
              <a :href="row[col.key]" target="_blank" rel="noopener noreferrer">View Link</a>
            </template>
            <template v-else>
              {{ row[col.key] }}
            </template>
          </td>
          <td>
            <div class="action-buttons">
              <AppButton variant="outline" type="button" @click="$emit('edit', row)">Edit</AppButton>
              <AppButton variant="danger" type="button" @click="$emit('delete', row)">Delete</AppButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else-if="loading" class="empty-state">
      <div class="loader-spinner"></div>
      <p>Loading Data...</p>
    </div>

    <div v-else class="empty-state">
      <p>No records found. Click "Add New" to get started.</p>
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  margin-top: 24px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th {
  padding: 16px 20px;
  background: rgba(0, 240, 255, 0.05);
  font-size: 0.85rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--neon-blue);
  border-bottom: 1px solid var(--glass-border);
}

.data-table td {
  padding: 16px 20px;
  border-bottom: 1px solid var(--glass-border);
  vertical-align: middle;
}

.table-row {
  transition: var(--transition);
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

.cell-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid var(--glass-border);
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  background: rgba(138, 43, 226, 0.15);
  color: var(--neon-purple);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  border: 1px solid rgba(138, 43, 226, 0.3);
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.empty-state {
  padding: 60px 0;
  text-align: center;
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.loader-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 240, 255, 0.1);
  border-top-color: var(--neon-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>

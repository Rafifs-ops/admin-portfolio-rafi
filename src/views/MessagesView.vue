<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import DataTable from '../components/DataTable.vue'

const messages = ref([])
const loading = ref(true)

const columns = [
  { key: 'sender', label: 'Sender', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
  { key: 'subject', label: 'Subject', type: 'text' },
  { key: 'messages', label: 'Message Text', type: 'text' }
]

const fetchMessages = async () => {
  loading.value = true
  try {
    const response = await api.getMessages()
    messages.value = response.data || []
  } catch (err) {
    console.error('Failed to fetch messages:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMessages()
})
</script>

<template>
  <div class="messages-view fade-in">
    <header class="page-header">
      <div>
        <h1 class="page-title">Inbox Messages</h1>
        <p class="page-subtitle">View your incoming contact requests.</p>
      </div>
    </header>

    <DataTable 
      :columns="columns" 
      :data="messages" 
      :loading="loading" 
      @edit="() => {}"
      @delete="() => {}"
    />
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 4px;
}

.page-subtitle {
  color: var(--text-secondary);
}
</style>

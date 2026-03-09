<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import AppButton from '../components/AppButton.vue'
import AppModal from '../components/AppModal.vue'
import DataTable from '../components/DataTable.vue'

const certifications = ref([])
const loading = ref(true)
const showModal = ref(false)
const saving = ref(false)

const formData = ref({
  title: '',
  img: null
})

const editingId = ref(null)

const previewUrl = ref(null)

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    formData.value.img = file
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = URL.createObjectURL(file)
  }
}

const columns = [
  { key: 'img', label: 'Certificate Image', type: 'image' },
  { key: 'title', label: 'Title', type: 'text' }
]

const fetchCertifications = async () => {
  loading.value = true
  try {
    const response = await api.getCertifications()
    certifications.value = response.data || []
  } catch (err) {
    console.error('Failed to fetch certifications:', err)
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  editingId.value = null
  formData.value = { title: '', img: null }
  previewUrl.value = null
  showModal.value = true
}

const handleEdit = (row) => {
  editingId.value = row._id
  formData.value = { title: row.title, img: null }
  previewUrl.value = row.img
  showModal.value = true
}

const handleDelete = async (row) => {
  if (confirm(`Are you sure you want to delete ${row.title}?`)) {
    try {
      await api.deleteCertification(row._id)
      await fetchCertifications()
    } catch (err) {
      console.error('Failed to delete certification:', err)
      alert('Failed to delete certification')
    }
  }
}

const handleSave = async () => {
  if (!formData.value.title) return
  if (!editingId.value && !formData.value.img) return
  
  saving.value = true
  try {
    const fd = new FormData()
    fd.append('title', formData.value.title)
    if (formData.value.img) {
      fd.append('img', formData.value.img)
    }

    if (editingId.value) {
      await api.editCertification(editingId.value, fd)
    } else {
      await api.addCertification(fd)
    }
    showModal.value = false
    await fetchCertifications()
  } catch (err) {
    console.error('Failed to save certification:', err)
    alert('Failed to save certification')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchCertifications()
})
</script>

<template>
  <div class="certifications-view fade-in">
    <header class="page-header">
      <div>
        <h1 class="page-title">Certifications Manager</h1>
        <p class="page-subtitle">Track your official certifications and badges.</p>
      </div>
      <AppButton variant="primary" @click="openAddModal">
        <span style="font-size: 1.2rem; margin-right: 8px;">+</span> Add Certification
      </AppButton>
    </header>

    <DataTable 
      :columns="columns" 
      :data="certifications" 
      :loading="loading" 
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <AppModal 
      :show="showModal" 
      :title="editingId ? 'Edit Certification' : 'Add New Certification'" 
      @close="showModal = false"
    >
      <form id="certForm" @submit.prevent="handleSave" class="form-container">
        <div class="form-group">
          <label>Certification Title</label>
          <input 
            v-model="formData.title" 
            type="text" 
            class="glass-input" 
            placeholder="e.g. AWS Certified Solutions Architect" 
            required 
          />
        </div>
        
        <div class="form-group">
          <label>Certification Image File</label>
          <input 
            type="file" 
            accept="image/*"
            class="glass-input file-input" 
            @change="handleFileChange"
            :required="!editingId" 
          />
        </div>

        <div v-if="previewUrl" class="preview-box glass-panel">
           <p class="preview-label">Preview</p>
           <img :src="previewUrl" class="img-preview" alt="Certification preview" />
        </div>
      </form>

      <template #footer>
        <AppButton variant="secondary" @click="showModal = false">Cancel</AppButton>
        <AppButton type="submit" form="certForm" variant="primary" :loading="saving">Save Certification</AppButton>
      </template>
    </AppModal>
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

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.preview-box {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: rgba(0,0,0,0.2);
}

.preview-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.img-preview {
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
}
</style>

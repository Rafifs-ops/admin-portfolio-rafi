<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import AppButton from '../components/AppButton.vue'
import AppModal from '../components/AppModal.vue'
import DataTable from '../components/DataTable.vue'

const skills = ref([])
const loading = ref(true)
const showModal = ref(false)
const saving = ref(false)

const formData = ref({
  name: '',
  logo: null
})

const editingId = ref(null)

const previewUrl = ref(null)

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    formData.value.logo = file
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = URL.createObjectURL(file)
  }
}

const columns = [
  { key: 'logo', label: 'Logo', type: 'image' },
  { key: 'name', label: 'Name', type: 'text' }
]

const fetchSkills = async () => {
  loading.value = true
  try {
    const response = await api.getSkills()
    skills.value = response.data || []
  } catch (err) {
    console.error('Failed to fetch skills:', err)
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  editingId.value = null
  formData.value = { name: '', logo: null }
  previewUrl.value = null
  showModal.value = true
}

const handleEdit = (row) => {
  editingId.value = row._id
  formData.value = { name: row.name, logo: null }
  previewUrl.value = row.logo
  showModal.value = true
}

const handleDelete = async (row) => {
  if (confirm(`Are you sure you want to delete ${row.name}?`)) {
    try {
      await api.deleteSkill(row._id)
      await fetchSkills()
    } catch (err) {
      console.error('Failed to delete skill:', err)
      alert('Failed to delete skill')
    }
  }
}

const handleSave = async () => {
  if (!formData.value.name) return
  if (!editingId.value && !formData.value.logo) return
  
  saving.value = true
  try {
    const fd = new FormData()
    fd.append('name', formData.value.name)
    if (formData.value.logo) {
      fd.append('logo', formData.value.logo)
    }

    if (editingId.value) {
      await api.editSkill(editingId.value, fd)
    } else {
      await api.addSkill(fd)
    }
    showModal.value = false
    await fetchSkills()
  } catch (err) {
    console.error('Failed to save skill:', err)
    alert('Failed to save skill')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchSkills()
})
</script>

<template>
  <div class="skills-view fade-in">
    <header class="page-header">
      <div>
        <h1 class="page-title">Skills Manager</h1>
        <p class="page-subtitle">Manage your technical skills and logos.</p>
      </div>
      <AppButton variant="primary" @click="openAddModal">
        <span style="font-size: 1.2rem; margin-right: 8px;">+</span> Add Skill
      </AppButton>
    </header>

    <DataTable 
      :columns="columns" 
      :data="skills" 
      :loading="loading" 
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <AppModal 
      :show="showModal" 
      :title="editingId ? 'Edit Skill' : 'Add New Skill'" 
      @close="showModal = false"
    >
      <form id="skillForm" @submit.prevent="handleSave" class="form-container">
        <div class="form-group">
          <label>Skill Name</label>
          <input 
            v-model="formData.name" 
            type="text" 
            class="glass-input" 
            placeholder="e.g. Vue.js" 
            required 
          />
        </div>
        
        <div class="form-group">
          <label>Logo File</label>
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
           <img :src="previewUrl" class="img-preview" alt="Logo preview" />
        </div>
      </form>

      <template #footer>
        <AppButton variant="secondary" @click="showModal = false">Cancel</AppButton>
        <AppButton type="submit" form="skillForm" variant="primary" :loading="saving">Save Skill</AppButton>
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

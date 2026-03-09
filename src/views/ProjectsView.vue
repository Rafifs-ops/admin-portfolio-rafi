<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import AppButton from '../components/AppButton.vue'
import AppModal from '../components/AppModal.vue'
import DataTable from '../components/DataTable.vue'
import ArrayInput from '../components/ArrayInput.vue'

const projects = ref([])
const loading = ref(true)
const showModal = ref(false)
const saving = ref(false)

const formData = ref({
  title: '',
  thumb_img: null,
  caption: '',
  description: '',
  link_web: '',
  tech_stack: []
})

const editingId = ref(null)

const previewUrl = ref(null)

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    formData.value.thumb_img = file
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = URL.createObjectURL(file)
  }
}

const columns = [
  { key: 'thumb_img', label: 'Thumbnail', type: 'image' },
  { key: 'title', label: 'Title' },
  { key: 'caption', label: 'Caption' },
  { key: 'link_web', label: 'Web Link', type: 'link' },
  { key: 'tech_stack', label: 'Tech Stack', type: 'array' },
]

const fetchProjects = async () => {
  loading.value = true
  try {
    const response = await api.getProjects()
    projects.value = response.data || []
  } catch (err) {
    console.error('Failed to fetch projects:', err)
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  editingId.value = null
  formData.value = {
    title: '',
    thumb_img: null,
    caption: '',
    description: '',
    link_web: '',
    tech_stack: []
  }
  previewUrl.value = null
  showModal.value = true
}

const handleEdit = (row) => {
  editingId.value = row._id
  formData.value = {
    title: row.title,
    thumb_img: null,
    caption: row.caption,
    description: row.description,
    link_web: row.link_web,
    tech_stack: [...row.tech_stack]
  }
  previewUrl.value = row.thumb_img
  showModal.value = true
}

const handleDelete = async (row) => {
  if (confirm(`Are you sure you want to delete ${row.title}?`)) {
    try {
      await api.deleteProject(row._id)
      await fetchProjects()
    } catch (err) {
      console.error('Failed to delete project:', err)
      alert('Failed to delete project')
    }
  }
}

const handleSave = async () => {
  if (!formData.value.title) return
  if (!editingId.value && !formData.value.thumb_img) return
  
  saving.value = true
  try {
    const fd = new FormData()
    fd.append('title', formData.value.title)
    if (formData.value.thumb_img) {
      fd.append('thumb_img', formData.value.thumb_img)
    }
    fd.append('caption', formData.value.caption)
    fd.append('description', formData.value.description)
    fd.append('link_web', formData.value.link_web)
    formData.value.tech_stack.forEach(tech => {
      fd.append('tech_stack[]', tech) // Appending array items
    })

    if (editingId.value) {
      await api.editProject(editingId.value, fd)
    } else {
      await api.addProject(fd)
    }
    showModal.value = false
    await fetchProjects()
  } catch (err) {
    console.error('Failed to save project:', err)
    alert('Failed to save project')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchProjects()
})
</script>

<template>
  <div class="projects-view fade-in">
    <header class="page-header">
      <div>
        <h1 class="page-title">Projects Manager</h1>
        <p class="page-subtitle">Showcase your best portfolio projects.</p>
      </div>
      <AppButton variant="primary" @click="openAddModal">
        <span style="font-size: 1.2rem; margin-right: 8px;">+</span> Add Project
      </AppButton>
    </header>

    <DataTable 
      :columns="columns" 
      :data="projects" 
      :loading="loading" 
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <AppModal 
      :show="showModal" 
      :title="editingId ? 'Edit Project' : 'Add New Project'" 
      width="700px"
      @close="showModal = false"
    >
      <form id="projectForm" @submit.prevent="handleSave" class="form-container">
        <div class="form-row">
          <div class="form-group half-width">
            <label>Project Title</label>
            <input v-model="formData.title" type="text" class="glass-input" required />
          </div>
          <div class="form-group half-width">
            <label>Caption (Short Description)</label>
            <input v-model="formData.caption" type="text" class="glass-input" required />
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group half-width">
            <label>Thumbnail Image File</label>
            <input 
              type="file" 
              accept="image/*"
              class="glass-input file-input" 
              @change="handleFileChange"
              :required="!editingId" 
            />
            <div v-if="previewUrl" class="preview-box glass-panel mt-2">
               <img :src="previewUrl" class="img-preview" alt="Thumbnail preview" />
            </div>
          </div>
          <div class="form-group half-width">
            <label>Website Link URL</label>
            <input v-model="formData.link_web" type="url" class="glass-input" required />
          </div>
        </div>

        <div class="form-group">
          <label>Full Description</label>
          <textarea 
            v-model="formData.description" 
            class="glass-input textarea" 
            rows="4" 
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label>Tech Stack</label>
          <ArrayInput v-model="formData.tech_stack" placeholder="Type a tech (e.g., Vue) and press Enter" />
        </div>
      </form>

      <template #footer>
        <AppButton variant="secondary" @click="showModal = false">Cancel</AppButton>
        <AppButton type="submit" form="projectForm" variant="primary" :loading="saving">Save Project</AppButton>
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

.form-row {
  display: flex;
  gap: 20px;
}

.half-width {
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.textarea {
  resize: vertical;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 20px;
  }
}
</style>

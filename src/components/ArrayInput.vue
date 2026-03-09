<script setup>
import { ref } from 'vue'
import AppButton from './AppButton.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Add an item and press enter'
  }
})

const emit = defineEmits(['update:modelValue'])
const inputValue = ref('')

const addItem = () => {
  const val = inputValue.value.trim()
  if (val && !props.modelValue.includes(val)) {
    emit('update:modelValue', [...props.modelValue, val])
    inputValue.value = ''
  }
}

const removeItem = (index) => {
  const newArr = [...props.modelValue]
  newArr.splice(index, 1)
  emit('update:modelValue', newArr)
}
</script>

<template>
  <div class="array-input-container">
    <div class="input-group">
      <input 
        v-model="inputValue" 
        @keydown.enter.prevent="addItem"
        type="text" 
        class="glass-input" 
        :placeholder="placeholder"
      />
      <AppButton type="button" variant="primary" @click="addItem">Add</AppButton>
    </div>
    
    <div class="tags-list" v-if="modelValue.length > 0">
      <div v-for="(item, index) in modelValue" :key="index" class="tag-item glass-panel">
        <span>{{ item }}</span>
        <button type="button" class="remove-btn" @click="removeItem(index)">×</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.array-input-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-group {
  display: flex;
  gap: 8px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  background: rgba(0,0,0,0.1);
  border-radius: 8px;
  min-height: 48px;
}

.tag-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  background: rgba(0, 240, 255, 0.1);
  border-color: rgba(0, 240, 255, 0.2);
  color: var(--neon-blue);
  font-size: 0.9rem;
}

.remove-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.remove-btn:hover {
  color: var(--danger);
  transform: scale(1.1);
}
</style>

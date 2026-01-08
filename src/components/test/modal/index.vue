<template>
  <div>
    <button id="show-modal" @click="showModal = true">Show Modal</button>
  
    <!-- 使用这个 modal 组件，传入 prop -->
    <Modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Custom Header</h3>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from './modal.vue'

export default {
  data() {
    return {
      showModal: false
    }
  },
  components: {
    Modal
  }
}

</script>
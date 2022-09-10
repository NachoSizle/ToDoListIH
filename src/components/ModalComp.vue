<template>
  <div class="modal">
    <div class="modal--content">
      <div class="modal--header">
        <h2>{{ title }}</h2>
        <button @click="handleCloseModal">X</button>
      </div>
      <div class="modal--body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalComp',
  props: {
    title: {
      type: String,
      default: 'Modal',
    },
    content: {
      type: String,
      default: 'Modal Content',
    },
  },
  methods: {
    handleCloseModal() {
      this.$emit('close');
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal--content {
  width: 80%;
  height: 50%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.modal--header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal--body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

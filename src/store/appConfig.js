import { defineStore } from 'pinia';

export default defineStore('appConfig', {
  state: () => ({
    modal: {
      isOpen: false,
      props: {
        title: '',
        action: '',
        details: {},
      },
    },
  }),
  actions: {
    showModal(modalProps) {
      this.modal.isOpen = true;
      this.modal.props = modalProps;
    },
    closeModal() {
      this.modal.isOpen = false;
    },
  },
});

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
      this.modal.props.details = modalProps.details || {};
    },
  },
});

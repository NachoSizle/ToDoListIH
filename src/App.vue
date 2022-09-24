<template>
  <NavBar />
  <router-view/>
  <Modal v-show="modal.isOpen" :title="modal.props && modal.props.title ? modal.props.title : ''">
    <NewTaskView v-if="modal.props && modal.props.action === 'new-task'" />
    <EditTaskView v-else-if="modal.props && modal.props.action === 'edit-task'"
      :details="modal.props && modal.props.details ? modal.props.details : {}" />
    <template v-else-if="modal.props && modal.props.action && modal.props.action === 'delete-task'">
      <h1>{{ modal.props && modal.props.title ? modal.props.title : ''}}</h1>
    </template>
    <h1 v-else>El usuario que se ha introducido no existe</h1>
  </Modal>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import appConfigStore from '@/store/appConfig';
import NavBar from '@/components/NavBar.vue';
import Modal from '@/components/ModalComp.vue';

import EditTaskView from '@/views/Task/EditTask.vue';
import NewTaskView from '@/views/Task/NewTask.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Modal,
    NewTaskView,
    EditTaskView,
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(appConfigStore, ['modal']),
  },
  methods: {
    ...mapActions(userStore, ['fetchUser']),
  },
  async created() {
    try {
      await this.fetchUser();
    } catch (e) {
      console.error(e);
    }
  },
  watch: {
    user() {
      if (this.user) {
        this.$router.push({ path: '/' });
      } else {
        this.$router.push({ path: '/auth/sign-in' });
      }
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

button {
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #42b983;
}

button.primary {
  background-color: #42b983;
}

button.primary:hover {
  background-color: #2c3e50;
}

button.danger {
  background-color: #e74c3c;
}

button.danger:hover {
  background-color: #c0392b;
}
</style>

<template>
  <div class="new-task--container">
    <form class="needs-validation">
      <label for="titleTask">
        Add title to new task:
        <input type="text" v-model="titleTask" required/>
        <div class="valid-feedback">
          Looks good!
        </div>
        <div class="invalid-feedback">
          Please provide a title of task.
        </div>
      </label>
      <button @click.prevent="handleAddTask">Add new task</button>
    </form>
  </div>
</template>

<script>

import { mapActions } from 'pinia';
import taskStore from '@/store/task';
import appConfigStore from '@/store/appConfig';

export default {
  name: 'NewTaskView',
  data() {
    return {
      titleTask: '',
    };
  },
  methods: {
    ...mapActions(taskStore, ['addNewTask']),
    ...mapActions(appConfigStore, ['closeModal']),
    async handleAddTask() {
      const form = document.querySelector('.needs-validation');
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      if (this.titleTask !== '') {
        const task = {
          title: this.titleTask,
        };

        try {
          await this.addNewTask(task);
          const isInModal = this.checkIfIsInModal();
          if (isInModal) {
            this.closeModal();
          } else {
            this.$router.push({ path: '/' });
          }
          this.$el.parentNode.removeChild(this.$el);
        } catch (error) {
          console.log(error);
        }
      }
    },
    checkIfIsInModal() {
      return this.$route.name === 'home';
    },
  },
};
</script>

<style>
.new-task--container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
}

label {
  text-align: start;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 0;
}
</style>

<template>
  <div class="edit-task--container" v-if="task">
    <form class="needs-validation">
      <label for="titleTask">
        Update title to new task:
        <input type="text" v-model="titleTask" :placeholder="task.title" required/>
        <div class="valid-feedback">
          Looks good!
        </div>
        <div class="invalid-feedback">
          Please provide a new title of task.
        </div>
      </label>
      <button @click.prevent="handleUpdateTask">Update task</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import taskStore from '@/store/task';
import appConfigStore from '@/store/appConfig';

export default {
  name: 'EditTaskView',
  data() {
    return {
      task: null,
      titleTask: '',
    };
  },
  props: {
    details: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    ...mapActions(taskStore, ['getTaskById', 'updateTaskTitle']),
    ...mapActions(appConfigStore, ['closeModal']),
    async handleUpdateTask() {
      const form = document.querySelector('.needs-validation');
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      if (this.titleTask !== '') {
        const task = {
          title: this.titleTask,
          taskId: this.task.id,
        };

        try {
          await this.updateTaskTitle(task);
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
  watch: {
    // eslint-disable-next-line object-shorthand
    'details.taskId'() {
      this.task = this.getTaskById(this.details.taskId);
    },
  },
  created() {
    const id = this.checkIfIsInModal() ? this.details.taskId : this.$route.params.id;
    this.task = this.getTaskById(id);
  },
};
</script>

<style>
.edit-task--container {
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
  margin-bottom: 1rem;
}
</style>

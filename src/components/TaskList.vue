<template>
  <table class="table" v-if="tasksByInsertedDate.length">
    <thead>
      <tr>
        <th scope="col" v-for="column in tableColumns" :key="column.key">{{ column.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task, index) in tasksByInsertedDate" :key="task.id">
        <th scope="row">{{ index }}</th>
        <td class="text-start">{{ task.title }}</td>
        <td>{{ task.inserted_at }}</td>
        <td>
          <label for="taskState">
            {{ task.is_complete ? "👌" : "❌"  }}
            <input @click="updateTaskCompleteState(task.id, !task.is_complete)" type="checkbox"
              name="taskState" v-model="task.is_complete" />
          </label>
        </td>
        <td>
          <div class="action--buttons">
            <button v-for="action in actions" :key="action.id"
              :class="action.class"
              @click="action.handleFunction(task.id)">
              {{ action.icon }}
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import taskStore from '@/store/task';
import userStore from '@/store/user';
import appConfigStore from '@/store/appConfig';

export default {
  name: 'TaskList',
  data() {
    return {
      tableColumns: [
        {
          title: '#',
          key: '#',
        },
        {
          title: 'Title',
          key: 'title',
        },
        {
          title: 'Date',
          key: 'date',
        },
        {
          title: 'Status',
          key: 'status',
        },
        {
          title: 'Action',
          key: 'action',
        },
      ],
      actions: [
        {
          id: 0,
          title: 'Edit',
          icon: '🖌️',
          class: 'primary',
          handleFunction: this.handleEdit,
        },
        {
          id: 1,
          title: 'Delete',
          icon: '💣',
          class: 'danger',
          handleFunction: this.handleDelete,
        },
      ],
    };
  },
  computed: {
    ...mapState(taskStore, ['tasksByInsertedDate']),
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'removeTask', 'updateTaskCompleteState', 'addNewTask']),
    ...mapActions(appConfigStore, ['showModal']),
    handleEdit(taskId) {
      this.showModal({
        title: 'Edit Task',
        action: 'edit-task',
        details: {
          taskId,
        },
      });
    },
    async handleDelete(taskId) {
      try {
        await this.removeTask(taskId);
        console.log('Task removed');
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
table {
  width: 100%;
  max-width: 80%;
}

table > thead > tr > th:nth-child(2) {
  text-align: start;
}

table > tr:nth-child(even) {
  padding-bottom: 1rem;
}

table > tbody > tr > td,
table > tbody > tr > th {
  vertical-align: middle;
}

label {
  text-align: center;
}

.action--buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>

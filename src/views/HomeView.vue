<template>
  <div class="home">
    <h1>Welcome to ToDO List App</h1>
    <table v-if="tasksByInsertedDate.length">
      <tr>
        <th v-for="column in tableColumns" :key="column.key">{{ column.title }}</th>
      </tr>
      <tr v-for="task in tasksByInsertedDate" :key="task.id">
        <td>{{ task.title }}</td>
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
              @click="action.handleFunction(task.id)">
              {{ action.icon }}
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import taskStore from '@/store/task';

export default {
  name: 'HomeView',
  data() {
    return {
      tableColumns: [
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
          handleFunction: this.handleEdit,
        },
        {
          id: 1,
          title: 'Delete',
          icon: '💣',
          handleFunction: this.handleDelete,
        },
      ],
    };
  },
  computed: {
    ...mapState(taskStore, ['tasksByInsertedDate']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'removeTask', 'updateTaskTitle', 'updateTaskCompleteState']),
    handleEdit(taskId) {
      console.log('Edit');
      console.log(taskId);
    },
    async handleDelete(taskId) {
      const result = await this.removeTask(taskId);
      if (result) {
        console.log('Task removed');
      } else {
        console.log('Task not removed');
      }
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
}
</style>

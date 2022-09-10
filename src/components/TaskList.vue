<template>
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
            :class="action.class"
            @click="action.handleFunction(task.id)">
            {{ action.icon }}
          </button>
        </div>
      </td>
    </tr>
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
    ...mapActions(taskStore, ['fetchTasks', 'removeTask', 'updateTaskTitle', 'updateTaskCompleteState', 'addNewTask']),
    ...mapActions(appConfigStore, ['showModal']),
    handleEdit(taskId) {
      console.log('Edit');
      console.log(taskId);
      this.showModal({
        title: 'Edit Task',
        action: 'edit-task',
        details: {
          taskId,
        },
      });
    },
    async handleDelete(taskId) {
      const result = await this.removeTask(taskId);
      if (result) {
        console.log('Task removed');
      } else {
        console.log('Task not removed');
      }
    },
    handleAddNewTask() {
      this.addNewTask({
        title: 'New task',
        user_id: this.user.id,
      });
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
</style>

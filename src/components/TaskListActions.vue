<template>
  <div class="task-list--actions">
    <button class="primary" @click="handleAddNewTask">Add Task</button>
    <button class="primary" @click="fetchTasks">Refresh</button>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import taskStore from '@/store/task';
import appConfigStore from '@/store/appConfig';

export default {
  name: 'TaskListActions',
  methods: {
    ...mapActions(taskStore, ['fetchTasks']),
    ...mapActions(appConfigStore, ['showModal']),
    handleAddNewTask() {
      this.showModal({
        title: 'New Task',
        action: 'new-task',
      });
    },
  },
};
</script>

<style scoped>
.task-list--actions {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding: 1rem;
}
</style>

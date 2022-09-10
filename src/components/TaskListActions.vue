<template>
  <div class="task-list--actions">
    <button class="primary" @click="handleAddNewTask">Add Task</button>
    <button class="primary" @click="fetchTasks">Refresh</button>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import taskStore from '@/store/task';

export default {
  name: 'TaskListActions',
  methods: {
    ...mapActions(taskStore, ['fetchTasks']),
    handleAddNewTask() {
      this.$router.push({ path: '/task' });
    },
  },
};
</script>

<style>
.task-list--actions {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;

  padding: 1rem;
}
</style>

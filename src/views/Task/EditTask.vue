<template>
  <div class="edit-task--container">
    <p>{{ task.title }}</p>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import taskStore from '@/store/task';

export default {
  name: 'EditTaskView',
  data() {
    return {
      task: {},
    };
  },
  props: {
    details: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    ...mapActions(taskStore, ['getTaskById']),
  },
  created() {
    this.task = this.getTaskById(this.details.taskId);
    console.log(this.task);
  },
};
</script>

<style>
.edit-task--container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}
</style>

<template>
  <div class="home">
    <h1>Welcome to ToDO List App</h1>
    <TaskListActions />
    <TaskList />
  </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue';
import TaskListActions from '@/components/TaskListActions.vue';

export default {
  name: 'HomeView',
  components: {
    TaskList,
    TaskListActions,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100vh - 78px);
}

h1 {
  padding: 1rem 0;
}
</style>

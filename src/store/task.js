import { defineStore } from 'pinia';
import supabase from '../supabase/index';

const TASK_DB_NAME = 'tasks';

export default defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),
  getters: {
    tasksByInsertedDate() {
      return this.tasks.sort((a, b) => (a.inserted_at > b.inserted_at ? -1 : 1));
    },
  },
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from(TASK_DB_NAME)
        .select('*')
        .order('id', { ascending: false });
      console.log(tasks);
      this.tasks = tasks.map((task) => ({
        ...task,
        inserted_at: new Date(task.inserted_at).toLocaleDateString(),
      }));
      console.log(this.tasks);
    },
    async addNewTask(task) {
      const { data, error } = await supabase.from(TASK_DB_NAME).insert(task);
      if (error) throw error;
      if (data) {
        console.log(data);
        this.tasks.push(data);
      }
    },
    async removeTask(taskId) {
      try {
        const { data, error } = await supabase.from(TASK_DB_NAME).delete().match({ id: taskId });
        if (error) throw error;
        if (data && data.length) {
          console.log(data);
          const taskToRemoveIndex = this.tasks.findIndex((task) => task.id === taskId);
          this.tasks = this.tasks.splice(taskToRemoveIndex, 1);
        } else {
          throw new Error('Task not found');
        }
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async updateTaskTitle(taskId, taskTitle) {
      const { data, error } = await supabase.from(TASK_DB_NAME)
        .update({ title: taskTitle }).match({ id: taskId });
      if (error) throw error;
      if (data) {
        console.log(data);
        const taskToUpdate = this.tasks.filter((task) => task.id === taskId);
        taskToUpdate.title = data;
      }
    },
    async updateTaskCompleteState(taskId, state) {
      const { error } = await supabase.from(TASK_DB_NAME)
        .update({ is_complete: state }).match({ id: taskId });
      if (error) throw error;
    },
  },
});

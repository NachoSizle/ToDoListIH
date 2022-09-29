import { defineStore } from 'pinia';
import supabase from '../supabase/index';
import useUserStore from './user';

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
      this.tasks = tasks.map((task) => ({
        ...task,
        inserted_at: new Date(task.inserted_at).toLocaleDateString(),
      }));
    },
    async addNewTask(task) {
      const userStore = useUserStore();
      debugger;

      const { data, error } = await supabase.from(TASK_DB_NAME).insert({
        ...task,
        user_id: userStore.user.id,
      });
      if (error) throw error;
      if (data.length) {
        this.tasks.push({
          ...data[0],
          inserted_at: new Date(data[0].inserted_at).toLocaleDateString(),
        });
      }
    },
    async removeTask(taskId) {
      const { data, error } = await supabase.from(TASK_DB_NAME).delete().match({ id: taskId });
      if (error) throw error;
      if (data && data.length) {
        const taskToRemoveIndex = this.tasks.findIndex((task) => task.id === taskId);
        this.tasks.splice(taskToRemoveIndex, 1);
      } else {
        throw new Error('Task not found');
      }
    },
    async updateTaskTitle({ taskId, title }) {
      const { data, error } = await supabase.from(TASK_DB_NAME)
        .update({ title }).match({ id: taskId });
      if (error) throw error;
      if (data) {
        const taskToUpdateIndex = this.tasks.findIndex((task) => task.id === taskId);
        const taskToUpdate = this.tasks[taskToUpdateIndex];
        taskToUpdate.title = data[0].title;
        if (taskToUpdate.is_complete) {
          await this.updateTaskCompleteState(taskId);
        }
      }
    },
    async updateTaskCompleteState(taskId, state = false) {
      const { data, error } = await supabase.from(TASK_DB_NAME)
        .update({ is_complete: state }).match({ id: taskId });
      if (error) throw error;
      if (data) {
        const taskToUpdateIndex = this.tasks.findIndex((task) => task.id === taskId);
        const taskToUpdate = this.tasks[taskToUpdateIndex];
        taskToUpdate.is_complete = data[0].is_complete;
      }
    },
    getTaskById(taskId) {
      return this.tasks.find((task) => task.id === taskId);
    },
  },
});

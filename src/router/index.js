import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/Auth/AuthView.vue';
import NewTask from '../views/Task/NewTask.vue';
import EditTask from '../views/Task/EditTask.vue';
import SignIn from '../views/Auth/SignIn.vue';
import SignUp from '../views/Auth/SignUp.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/task',
    children: [
      {
        path: 'new',
        name: 'new-task',
        component: NewTask,
      },
      {
        path: 'edit/:id',
        name: 'edit-task',
        component: EditTask,
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    children: [
      {
        path: 'sign-in',
        name: 'sign-in',
        component: SignIn,
      },
      {
        path: 'sign-up',
        name: 'sign-up',
        component: SignUp,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

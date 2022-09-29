<template>
  <h1>Esta es la vista de SignUp</h1>
  <button @click="handleSignUp">SignUp</button>
  <router-link to="/auth/sign-in">SignIn</router-link>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'AuthView',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    handleSignUp() {
      const userData = {
        email: 'nacho.martinez@ironhack.com',
        password: 'pruebasignup',
      };
      this.signUp(userData.email, userData.password);
    },
  },
};
</script>

<style scoped>
h1 {
  padding: 2rem;
}
</style>

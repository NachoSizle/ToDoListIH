<template>
  <h1>Esta es la vista de SignIn</h1>
  <button @click="handleSignIn">SignIn</button>
  <router-link to="/auth/sign-up">SignUp</router-link>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'SignIn',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signIn']),
    handleSignIn() {
      const userData = {
        email: 'nacho.martinez@ironhack.com',
        password: 'pruebasignup',
      };
      this.signIn(userData.email, userData.password);
    },
  },
};
</script>

<style scoped>
h1 {
  padding: 2rem;
}
</style>

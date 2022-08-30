<template>
  <h1>Esta es la vista de SignUp/In</h1>
  <button @click="handleSignUp">SignUp</button>
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
  watch: {
    user() {
      if (this.user) {
        console.log(this.user);
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>

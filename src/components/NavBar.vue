<template>
  <nav v-if="user !== null">
    <router-link to="/">Home</router-link> |
    <router-link @click.prevent="handleSignOut" to="/auth">Sign out</router-link> |
  </nav>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'NavBar',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signOut']),
    async handleSignOut() {
      await this.signOut();
    },
  },
};
</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

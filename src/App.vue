<template>
  <div id="nav dark:bg-gray-800 bg-white">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <div class="account-number text-right px-8"><p class="bg-red text-white rounded-lg text-lg">{{main.accountAddress}}</p></div>
    <button class="text-left" @click="toggleMode()"> toggle Theme </button>
  </div>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-700">
    <router-view/>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTokenStore } from '@/store/useTokens';

export default {
  setup() {
    const main = useTokenStore();
    const { accountAddress, fetchAccountAddress } = storeToRefs(main);
    main.fetchAccountAddress();

    const toggleMode = () => {
      if (localStorage.theme === undefined) {
        localStorage.theme = 'dark';
      }
      // eslint-disable-next-line no-unused-expressions
      localStorage.theme === 'light' ? localStorage.theme = 'dark' : localStorage.theme = 'light';
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    onMounted(() => main.fetchAccountAddress());

    return {
      main,
      toggleMode,
      accountAddress,
      fetchAccountAddress,
    };
  },

};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

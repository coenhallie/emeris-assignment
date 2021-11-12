<template>
  <div class="flex justify-between px-8 py-4 dark:bg-gray-700 bg-gray-100 border-b border-gray-300 dark:border-gray-500">
    <button v-if="!main.darkMode" class="bg-red-500 rounded-lg p-2 text-white font-medium" @click="toggleMode()"> toggle Dark </button>
    <button v-if="main.darkMode" class="bg-blue-500 rounded-lg p-2 text-white font-medium" @click="toggleMode()"> toggle Light </button>
    <button class="text-left bg-red-500 rounded-lg p-2 text-white font-medium">{{main.accountAddress}}</button>
  </div>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-700">
    <router-view/>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useTokenStore } from '@/store/useTokens';

export default {
  setup() {
    const main = useTokenStore();
    const { accountAddress, fetchAccountAddress, darkMode } = storeToRefs(main);
    main.fetchAccountAddress();

    const toggleMode = () => {
      if (localStorage.theme === undefined) {
        localStorage.theme = 'dark';
      }
      // eslint-disable-next-line no-unused-expressions
      localStorage.theme === 'light' ? localStorage.theme = 'dark' : localStorage.theme = 'light';
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        main.darkMode = true;
      } else {
        document.documentElement.classList.remove('dark');
        main.darkMode = false;
      }
    };

    return {
      main,
      darkMode,
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
